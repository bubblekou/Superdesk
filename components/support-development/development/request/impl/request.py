'''
Created on Jan 23, 2012

@package: introspection request
@copyright: 2011 Sourcefabric o.p.s.
@license: http://www.gnu.org/licenses/gpl-3.0.txt
@author: Nistor Gabriel

API specifications for the node presenter.
'''

from ..api.request import IRequestService, Request, Input, Method
from ally.api.config import GET, INSERT, UPDATE, DELETE
from ally.api.operator.type import TypeModelProperty
from ally.container.ioc import injected
from ally.core.impl.node import MatchProperty, NodeProperty
from ally.core.spec.resources import Node, Match, ConverterPath, Invoker, \
    InvokerInfo
from ally.exception import InputError, Ref, DevelError
from ally.internationalization import _
from ally.support.api.util_service import trimIter
from ally.support.core.util_resources import matchesForNode, toPaths
from collections import OrderedDict
from development.api.domain_devel import DOMAIN
from inspect import getdoc
import re
from ally.api.extension import IterPart

# --------------------------------------------------------------------

@injected
class RequestService(IRequestService):
    '''
    Provides the implementation for @see: IRequestIntrospectService.
    '''

    methodNames = {GET: 'GET', INSERT:'INSERT', UPDATE:'UPDATE', DELETE:'DELETE'}
    # The method values associated with names.
    root = Node
    # The root node to provide the requests for.
    converterPath = ConverterPath
    # The path converter to use in representing the requests.

    def __init__(self):
        '''
        Constructs the request introspect service.
        '''
        assert isinstance(self.methodNames, dict), 'Invalid method names %s' % self.methodNames
        assert isinstance(self.root, Node), 'Invalid root node %s' % self.root
        assert isinstance(self.converterPath, ConverterPath), 'Invalid converter path %s' % self.converterPath

        self._requestId = 1
        self._inputId = 1
        self._methodId = 1

        self._nodeRequests = {}
        self._requests = OrderedDict()
        self._patternInputs = {}
        self._inputs = OrderedDict()
        self._requestMethods = {}
        self._methods = OrderedDict()

    def getRequest(self, id):
        '''
        @see: IRequestService.getRequest
        '''
        self._refresh()
        if id not in self._requests: raise InputError(Ref(_('Invalid request id'), ref=Request.Id))
        return self._requests[id]

    def getMethod(self, id):
        '''
        @see: IRequestService.getMethod
        '''
        self._refresh()
        if id not in self._methods: raise InputError(Ref(_('Invalid method id'), ref=Method.Id))
        return self._methods[id]

    def getAllInputs(self, id):
        '''
        @see: IRequestService.getAllInputs
        '''
        self._refresh()
        if not id: return self._inputs.values()
        if id not in self._patternInputs: raise InputError(Ref(_('Invalid request id'), ref=Request.Id))
        return (self._inputs[inpId] for inpId in self._patternInputs[id])

    def getAllRequests(self, offset=None, limit=None):
        '''
        @see: IRequestService.getAllRequests
        '''
        self._refresh()
        return IterPart(trimIter(self._requests.values(), len(self._requests), offset, limit), len(self._requests),
                        offset, limit)

    # ----------------------------------------------------------------

    def _refresh(self):
        '''
        Refreshes the requests.
        '''
        self._process(self.root)

    def _process(self, node):
        '''
        Processes the node and sub nodes requests.
        '''
        assert isinstance(node, Node), 'Invalid root node %s' % node
        if node.get or node.delete or node.insert or node.update:
            idNode = id(node)
            if idNode not in self._nodeRequests:
                r = Request()
                r.Id = self._requestId

                patternInputs = set()

                index, inputs = 0, []
                matches = matchesForNode(node)
                for k, match in enumerate(matches):
                    assert isinstance(match, Match)
                    if not match.isValid():
                        index += 1
                        matches[k] = '{%s}' % index
                        inputs.append((match, matches[k]))

                r.Pattern = '/'.join(toPaths(matches, self.converterPath))
                if r.Pattern.startswith(DOMAIN): return

                for match, name in inputs:
                    inp = self._toPatternInput(match, r)
                    patternInputs.add(inp.Id)
                    inp.Name = name

                self._requests[r.Id] = r
                self._nodeRequests[idNode] = r.Id
                self._patternInputs[r.Id] = patternInputs
                requestMethods = self._requestMethods[r.Id] = set()

                self._requestId += 1

                if node.get:
                    m = self._toMethod(node.get, r); requestMethods.add(m.Id)
                    r.Get = m.Id
                if node.delete:
                    m = self._toMethod(node.delete, r); requestMethods.add(m.Id)
                    r.Delete = m.Id
                if node.insert:
                    m = self._toMethod(node.insert, r); requestMethods.add(m.Id)
                    r.Insert = m.Id
                if node.update:
                    m = self._toMethod(node.update, r); requestMethods.add(m.Id)
                    r.Update = m.Id

        for child in node.children: self._process(child)

    def _toPatternInput(self, match, req):
        '''
        Processes the match as a pattern input.
        '''
        assert isinstance(req, Request)
        inp = Input()
        inp.Id = self._inputId
        self._inputs[self._inputId] = inp

        self._inputId += 1

        inp.Mandatory = True
        inp.ForRequest = req.Id

        if isinstance(match, MatchProperty):
            assert isinstance(match, MatchProperty)
            assert isinstance(match.node, NodeProperty)
            typ = next(iter(match.node.typesProperties))
            assert isinstance(typ, TypeModelProperty)
            inp.Description = _('The %(type)s of %(model)s %(description)s') % \
                        dict(type=_(typ.property), model=_(typ.container.name),
                        description=re.sub('[\s]+', ' ', getdoc(typ.parent.clazz) or '...'))
        else:
            raise DevelError('Unknown match %s' % match)

        return inp

    def _toMethod(self, invoker, req):
        '''
        Processes the method based on the invoker.
        '''
        assert isinstance(invoker, Invoker)
        assert isinstance(req, Request)
        m = Method()
        m.Id = self._methodId
        self._methods[self._methodId] = m

        m.ForRequest = req.Id

        self._methodId += 1

        m.Name = invoker.name
        m.Type = self.methodNames.get(invoker.method, '<unknown>')

        info = invoker.infoIMPL
        assert isinstance(info, InvokerInfo)

        m.IMPLDoc = info.doc
        if info.clazz: m.IMPL = info.clazz.__module__ + '.' + info.clazz.__name__
        else: m.IMPL = '<unknown>'

        if info.clazzDefiner:
            m.IMPLDefiner = info.clazzDefiner.__module__ + '.' + info.clazzDefiner.__name__
        else: m.IMPLDefiner = m.IMPL

        if invoker.infoAPI:
            info = invoker.infoAPI
            assert isinstance(info, InvokerInfo)

            m.APIDoc = info.doc
            if info.clazz: m.APIClass = info.clazz.__module__ + '.' + info.clazz.__name__
            else: m.APIClass = '<unknown>'

            if info.clazzDefiner:
                m.APIClassDefiner = info.clazzDefiner.__module__ + '.' + info.clazzDefiner.__name__
            else: m.APIClassDefiner = m.APIClass

        return m
