'''
Created on Jun 28, 2011

@package: Newscoop
@copyright: 2011 Sourcefabric o.p.s.
@license: http://www.gnu.org/licenses/gpl-3.0.txt
@author: Mihai Balaceanu

Provides support for explaining the errors in the content of the request.
'''

from ally.container.ioc import injected
from ally.core.spec.server import Response, IProcessor, ProcessorsChain, \
    Processors
from ally.exception import InputError, Ref, DevelError
import logging
from ally.core.spec.codes import BAD_CONTENT, INTERNAL_ERROR, Code

# --------------------------------------------------------------------

log = logging.getLogger(__name__)

# --------------------------------------------------------------------

@injected
class ExplainErrorHandler(IProcessor):
    '''
    Implementation for a processor that provides on the response a form of the error that can be extracted from 
    the response code and error message, this processor uses the code status (success) in order to trigger the error
    response.
    '''

    encodings = Processors
    # The encoding processors used for presenting the error, if a processor is successful in the encoding 
    # process it has to stop the chain execution.

    def __init__(self):
        assert isinstance(self.encodings, Processors), 'Invalid encodings processors %s' % self.encodings

    def process(self, req, rsp, chain):
        '''
        @see: IProcessor.process
        '''
        assert isinstance(rsp, Response), 'Invalid response %s' % rsp
        assert isinstance(chain, ProcessorsChain), 'Invalid processors chain %s' % chain

        try: chain.process(req, rsp)
        except DevelError as e:
            rsp.setCode(BAD_CONTENT, e.message)
            log.info('Problems with the invoked content: %s', e.message, exc_info=True)
        except InputError as e:
            rsp.setCode(BAD_CONTENT, e, 'Invalid resource')
            assert log.debug('User input exception: %s', e, exc_info=True) or True
        except:
            rsp.setCode(INTERNAL_ERROR, 'Upps, it seems I am in a pickle, please consult the server logs')
            log.exception('An exception occurred while trying to process request %s and response %s', req, rsp)

        assert isinstance(rsp.code, Code), 'Invalid response code %s' % rsp.code

        if not rsp.code.isSuccess:
            rsp.obj = {'error':self.errorResponseObj(rsp)}
            encodingChain = self.encodings.newChain()
            assert isinstance(encodingChain, ProcessorsChain)
            encodingChain.process(req, rsp)

    def errorResponseObj(self, rsp):
        '''
        Creates the error response object.
        '''
        assert isinstance(rsp, Response), 'Invalid response %s' % rsp
        messages = []
        error = {'code':str(rsp.code.code)}
        if isinstance(rsp.codeMessage, str):
            messages.append(rsp.codeMessage)

        elif isinstance(rsp.codeMessage, InputError):
            iexc = rsp.codeMessage
            assert isinstance(iexc, InputError)
            for msg in iexc.message:
                assert isinstance(msg, Ref)
                messages.append(msg.message)

        if messages: error['message'] = '\n'.join(messages)

        return error

# --------------------------------------------------------------------

@injected
class ExplainDetailedErrorHandler(ExplainErrorHandler):
    '''
    Implementation for a processor that provides on the response a form of the error that can be extracted from 
    the response code and error message, this processor uses the code status (success) in order to trigger the error
    response.
    '''

    def errorResponseObj(self, rsp):
        '''
        @see: ExplainErrorHandler.errorResponseObj
        '''
        messages = []
        error = {'code':str(rsp.code.code)}
        if isinstance(rsp.codeMessage, str):
            messages.append(rsp.codeMessage)
        elif isinstance(rsp.codeMessage, InputError):
            iexc = rsp.codeMessage
            assert isinstance(iexc, InputError)
            for msg in iexc.message:
                assert isinstance(msg, Ref)
                if not msg.model:
                    messages.append(msg.message)
                elif not msg.property:
                    mmodel = _dict(error, msg.model)
                    _list(mmodel, 'message').append(msg.message)
                else:
                    mmodel = _dict(error, msg.model)
                    mmodel[msg.property] = msg.message

        if messages: error['message'] = messages

        return error

# --------------------------------------------------------------------

def _dict(d, key):
    v = d.get(key)
    if not v:
        v = {}
        d[key] = v
    return v

def _list(d, key):
    v = d.get(key)
    if not v:
        v = []
        d[key] = v
    return v
