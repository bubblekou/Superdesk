'''
Created on Jun 22, 2012

@package: ally core http
@copyright: 2011 Sourcefabric o.p.s.
@license: http://www.gnu.org/licenses/gpl-3.0.txt
@author: Gabriel Nistor

Provides the meta creation for encoding the response.
'''

from ally.api.operator.container import Model
from ally.api.operator.type import TypeModel, TypeModelProperty
from ally.container.ioc import injected
from ally.core.http.spec.codes import INVALID_HEADER_VALUE
from ally.core.http.spec.encdec.encode import DataModel, EncodeModel, \
    NO_MODEL_PATH
from ally.core.http.spec.server import IEncoderPath, IDecoderHeader
from ally.core.impl.processor import encoder
from ally.core.impl.processor.encoder import CreateEncoderHandler
from ally.core.spec.encdec.encode import EncodeCollection
from ally.core.spec.resources import Path, Normalizer
from ally.design.context import requires, defines
from ally.support.core.util_resources import pathLongName
from ally.support.util import lastCheck, firstOf
from collections import deque, OrderedDict

# --------------------------------------------------------------------

class Request(encoder.Request):
    '''
    The request context.
    '''
    # ---------------------------------------------------------------- Required
    path = requires(Path)

class Response(encoder.Response):
    '''
    The response context.
    '''
    # ---------------------------------------------------------------- Required
    encoderPath = requires(IEncoderPath)
    # ---------------------------------------------------------------- Defined
    errorMessage = defines(str)
    encoderDataModel = defines(DataModel, doc='''
    @rtype: DataModel
    The data model associated with the encoder.
    ''')

# --------------------------------------------------------------------

@injected
class CreateEncoderPathHandler(CreateEncoderHandler):
    '''
    Extends the model encoder with paths also.
    '''

    nameRef = 'href'
    # The reference attribute name.
    nameXFilter = 'X-Filter'
    # The header name for the filter.
    nameAll = '*'
    # The name used for marking all the properties in filtering.
    separatorNames = '.'
    # Separator used for filter names.

    def __init__(self):
        '''
        Construct the encoder.
        '''
        assert isinstance(self.nameRef, str), 'Invalid reference name %s' % self.nameRef
        assert isinstance(self.nameXFilter, str), 'Invalid filter header name %s' % self.nameXFilter
        assert isinstance(self.nameAll, str), 'Invalid filter name all %s' % self.nameAll
        assert isinstance(self.separatorNames, str), 'Invalid names separator %s' % self.separatorNames
        super().__init__()

    def process(self, request:Request, response:Response, **keyargs):
        '''
        @see: CreateEncoderHandler.process
        '''
        assert isinstance(request, Request), 'Invalid request %s' % request
        assert isinstance(response, Response), 'Invalid response %s' % response

        super().process(request, response)
        exploit = response.encoder
        if response.encoder is None: return

        encodeModel, isFirst = None, True
        if isinstance(exploit, EncodeModel): encodeModel = exploit
        elif isinstance(exploit, EncodeCollection):
            assert isinstance(exploit, EncodeCollection)

            exploit = exploit.exploitItem
            if isinstance(exploit, EncodeModel): encodeModel, isFirst = exploit, False

        if encodeModel is None: return

        response.encoderDataModel = data = self.createDataModel(encodeModel, request.path)
        response.encoderData.update(dataModel=data, encoderPath=response.encoderPath)
        assert isinstance(data, DataModel)
        assert isinstance(request.decoderHeader, IDecoderHeader), 'Invalid decoder header %s' % request.decoderHeader
        if isFirst: data.flag |= NO_MODEL_PATH

        value = request.decoderHeader.decode(self.nameXFilter)
        if value is not None: value = deque(val for val, _attr in value)

        error = self.processFilter(encodeModel, data, value, response.normalizer)
        if error:
            response.text, response.errorMessage = error
            response.code = INVALID_HEADER_VALUE
            return
        self.processFilterDefault(data, isFirst)

    def createDataModel(self, encode, path):
        '''
        Create the data model for the provided encode model.
        '''
        assert isinstance(encode, EncodeModel), 'Invalid encode model %s' % encode

        data = DataModel()
        if path: path = self.processPaths(encode, data, path)

        for nameProp, encodeProp in encode.properties.items():
            if isinstance(encodeProp, EncodeModel):
                if data.datas is None: data.datas = {}
                data.datas[nameProp] = self.createDataModel(encodeProp, path)

        return data

    def processPaths(self, encode, data, path):
        '''
        Process the paths for the provided encoded model and data model.
        '''
        assert isinstance(encode, EncodeModel), 'Invalid encode model %s' % encode
        assert isinstance(data, DataModel), 'Invalid data model %s' % data
        assert isinstance(path, Path), 'Invalid request path %s' % path

        data.path = path.findGetModel(encode.modelType)

        if data.path:
            assert isinstance(data.path, Path)

            accessible = data.path.findGetAllAccessible()
            if accessible:
                accessible = [(pathLongName(acc), acc) for acc in accessible]
                accessible.sort(key=firstOf)
                data.accessible = OrderedDict(accessible)

        return data.path

    def processFilter(self, encode, data, value, normalizer):
        '''
        Process the filtering for the encoded models.
        
        @return: tuple(text, errorMessage)
            In case of error.
        '''
        if encode is None:
            if value: return 'No filter available', 'Unknown filter properties %r' % ', '.join(value)
            return

        assert isinstance(encode, EncodeModel), 'Invalid encode model %s' % encode
        assert isinstance(data, DataModel), 'Invalid data model %s' % data
        assert isinstance(normalizer, Normalizer), 'Invalid normalizer %s' % normalizer
        assert isinstance(encode.modelType, TypeModel), 'Invalid encode model type %s' % encode.modelType

        exploits = self.exploitsFor(encode, data, normalizer)
        if value is not None:
            assert isinstance(value, deque), 'Invalid value %s' % value

            cache = {}
            while value:
                fvalue = value.pop()
                if not fvalue.strip(): continue
                fencode, fdata, fexploits, reference, fcache = None, data, exploits, encode.modelType.clazz, cache

                for isLast, name in lastCheck(fvalue.split(self.separatorNames)):
                    if name == self.nameAll and fdata:
                        if fencode is None: fencode = encode
                        else:
                            if fdata.fetchData is None: self.processFetch(fencode, fdata, reference, normalizer, cache)
                            fdata, fencode = fdata.fetchData, fdata.fetchEncode

                        if fdata.filter is None: fdata.filter = set()
                        fdata.filter.update(fencode.properties)
                        if fdata.accessible: fdata.filter.update(fdata.accessible)
                        fdata = None
                        continue

                    if not fdata:
                        return 'Unexpected filter entry', 'Property \'%s\' not expected in filter \'%s\'' % (name, fvalue)
                    assert isinstance(fdata, DataModel)

                    entry = fexploits.get(name)
                    if not entry and fencode:
                        # We check if the property is not located in the full encoded model.
                        fdata, fexploits = self.processFetch(fencode, fdata, reference, normalizer, cache)
                        entry = fexploits.get(name)

                    if not entry:
                        return 'Unknown filter entry', 'Invalid property \'%s\' in filter \'%s\'' % (name, fvalue)

                    fname, fencode = entry
                    if fdata.filter is None: fdata.filter = set()
                    fdata.filter.add(fname)
                    if fdata.fetchData:
                        assert isinstance(fdata.fetchData, DataModel)
                        fdata.fetchData.filter.add(fname)

                    if not isLast and isinstance(fencode, EncodeModel):
                        assert isinstance(fencode, EncodeModel)
                        entry = fcache.get(fname)
                        if entry is None: entry = fcache[fname] = (self.exploitsFor(fencode, fdata, normalizer), {})

                        fexploits, fcache = entry
                        if fdata.datas: fdata = fdata.datas.get(fname)
                        else: fdata = None
                        reference = getattr(reference, name)
                    else: fdata = None

    def processFilterDefault(self, data, isFirst):
        '''
        Process the default properties to be presented if none specified by filtering. 
        '''
        assert isinstance(data, DataModel), 'Invalid data model %s' % data

        if not isFirst and data.filter is None: data.filter = ()

    def processFetch(self, encode, data, reference, normalizer, cache):
        '''
        Process the fetch.
        '''
        assert isinstance(encode, EncodeModel), 'Invalid encode model %s' % encode
        assert isinstance(data, DataModel), 'Invalid data model %s' % data
        assert isinstance(normalizer, Normalizer), 'Invalid normalizer %s' % normalizer
        assert isinstance(cache, dict), 'Invalid cache %s' % cache

        # We check if the property is not located in the full encoded model.
        exploits = cache.get(reference)
        if exploits is None:
            data.fetchReference = reference
            data.fetchEncode = mencode = self.encoderFor(encode.modelType)
            data.fetchData = mdata = self.createDataModel(mencode, data.path)
            assert isinstance(mdata, DataModel)
            mdata.flag |= NO_MODEL_PATH
            exploits = cache[reference] = self.exploitsFor(mencode, mdata, normalizer)
            data = mdata
        else: data = data.fetchData

        return data, exploits

    def exploitsFor(self, encode, data, normalizer):
        '''
        Create the exploits.
        '''
        assert isinstance(encode, EncodeModel), 'Invalid encode model %s' % encode
        assert isinstance(data, DataModel), 'Invalid data model %s' % data
        assert isinstance(normalizer, Normalizer), 'Invalid normalizer %s' % normalizer

        exploits = {normalizer.normalize(name): (name, encodeProp) for name, encodeProp in encode.properties.items()}
        if data.accessible:
            for name in data.accessible: exploits[normalizer.normalize(name)] = (name, None)
        return exploits

    # ----------------------------------------------------------------

    def encoderItem(self, ofType):
        '''
        @see: EncoderHandler.encoderItem
        '''
        if isinstance(ofType, TypeModel):
            assert isinstance(ofType, TypeModel)
            assert isinstance(ofType.container, Model)

            return ofType.container.name, self.encoderModel(ofType, exploit=EncodeModel(ofType, self.nameRef))
        return super().encoderItem(ofType)

    def encoderProperty(self, ofType, getter, exploit=None):
        '''
        @see: EncoderHandler.encoderProperty
        '''
        assert isinstance(ofType, TypeModelProperty), 'Invalid type model property %s' % ofType

        exploit = exploit or EncodeModel(ofType.parent, self.nameRef, getter, ofType)
        return super().encoderProperty(ofType, getter, exploit)

    def encoderModel(self, ofType, getter=None, exploit=None, **keyargs):
        '''
        @see: EncoderHandler.encoderModel
        '''
        return super().encoderModel(ofType, getter, exploit or EncodeModel(ofType, self.nameRef, getter))
