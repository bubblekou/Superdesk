window.livedesk.loadGizmo=function(l){var t=this;(function(e){function v(a,d){var c=(a&65535)+(d&65535);return(a>>16)+(d>>16)+(c>>16)<<16|c&65535}function n(a,d,c,b,e,m){a=v(v(d,a),v(b,m));return v(a<<e|a>>>32-e,c)}function r(a,d,c,b,e,m,h){return n(d&c|~d&b,a,d,e,m,h)}function q(a,d,c,b,e,m,h){return n(d&b|c&~b,a,d,e,m,h)}function b(a,d,c,b,e,m,h){return n(c^(d|~b),a,d,e,m,h)}function m(a,d){a[d>>5]|=128<<d%32;a[(d+64>>>9<<4)+14]=d;var c,e,m,h,l,g=1732584193,f=-271733879,j=-1732584194,k=271733878;
for(c=0;c<a.length;c+=16)e=g,m=f,h=j,l=k,g=r(g,f,j,k,a[c],7,-680876936),k=r(k,g,f,j,a[c+1],12,-389564586),j=r(j,k,g,f,a[c+2],17,606105819),f=r(f,j,k,g,a[c+3],22,-1044525330),g=r(g,f,j,k,a[c+4],7,-176418897),k=r(k,g,f,j,a[c+5],12,1200080426),j=r(j,k,g,f,a[c+6],17,-1473231341),f=r(f,j,k,g,a[c+7],22,-45705983),g=r(g,f,j,k,a[c+8],7,1770035416),k=r(k,g,f,j,a[c+9],12,-1958414417),j=r(j,k,g,f,a[c+10],17,-42063),f=r(f,j,k,g,a[c+11],22,-1990404162),g=r(g,f,j,k,a[c+12],7,1804603682),k=r(k,g,f,j,a[c+13],12,
-40341101),j=r(j,k,g,f,a[c+14],17,-1502002290),f=r(f,j,k,g,a[c+15],22,1236535329),g=q(g,f,j,k,a[c+1],5,-165796510),k=q(k,g,f,j,a[c+6],9,-1069501632),j=q(j,k,g,f,a[c+11],14,643717713),f=q(f,j,k,g,a[c],20,-373897302),g=q(g,f,j,k,a[c+5],5,-701558691),k=q(k,g,f,j,a[c+10],9,38016083),j=q(j,k,g,f,a[c+15],14,-660478335),f=q(f,j,k,g,a[c+4],20,-405537848),g=q(g,f,j,k,a[c+9],5,568446438),k=q(k,g,f,j,a[c+14],9,-1019803690),j=q(j,k,g,f,a[c+3],14,-187363961),f=q(f,j,k,g,a[c+8],20,1163531501),g=q(g,f,j,k,a[c+13],
5,-1444681467),k=q(k,g,f,j,a[c+2],9,-51403784),j=q(j,k,g,f,a[c+7],14,1735328473),f=q(f,j,k,g,a[c+12],20,-1926607734),g=n(f^j^k,g,f,a[c+5],4,-378558),k=n(g^f^j,k,g,a[c+8],11,-2022574463),j=n(k^g^f,j,k,a[c+11],16,1839030562),f=n(j^k^g,f,j,a[c+14],23,-35309556),g=n(f^j^k,g,f,a[c+1],4,-1530992060),k=n(g^f^j,k,g,a[c+4],11,1272893353),j=n(k^g^f,j,k,a[c+7],16,-155497632),f=n(j^k^g,f,j,a[c+10],23,-1094730640),g=n(f^j^k,g,f,a[c+13],4,681279174),k=n(g^f^j,k,g,a[c],11,-358537222),j=n(k^g^f,j,k,a[c+3],16,-722521979),
f=n(j^k^g,f,j,a[c+6],23,76029189),g=n(f^j^k,g,f,a[c+9],4,-640364487),k=n(g^f^j,k,g,a[c+12],11,-421815835),j=n(k^g^f,j,k,a[c+15],16,530742520),f=n(j^k^g,f,j,a[c+2],23,-995338651),g=b(g,f,j,k,a[c],6,-198630844),k=b(k,g,f,j,a[c+7],10,1126891415),j=b(j,k,g,f,a[c+14],15,-1416354905),f=b(f,j,k,g,a[c+5],21,-57434055),g=b(g,f,j,k,a[c+12],6,1700485571),k=b(k,g,f,j,a[c+3],10,-1894986606),j=b(j,k,g,f,a[c+10],15,-1051523),f=b(f,j,k,g,a[c+1],21,-2054922799),g=b(g,f,j,k,a[c+8],6,1873313359),k=b(k,g,f,j,a[c+15],
10,-30611744),j=b(j,k,g,f,a[c+6],15,-1560198380),f=b(f,j,k,g,a[c+13],21,1309151649),g=b(g,f,j,k,a[c+4],6,-145523070),k=b(k,g,f,j,a[c+11],10,-1120210379),j=b(j,k,g,f,a[c+2],15,718787259),f=b(f,j,k,g,a[c+9],21,-343485551),g=v(g,e),f=v(f,m),j=v(j,h),k=v(k,l);return[g,f,j,k]}function A(a){var d,c="";for(d=0;d<32*a.length;d+=8)c+=String.fromCharCode(a[d>>5]>>>d%32&255);return c}function E(a){var d,c=[];c[(a.length>>2)-1]=void 0;for(d=0;d<c.length;d+=1)c[d]=0;for(d=0;d<8*a.length;d+=8)c[d>>5]|=(a.charCodeAt(d/
8)&255)<<d%32;return c}function h(a,d){var c,b=E(a),e=[],h=[];e[15]=h[15]=void 0;16<b.length&&(b=m(b,8*a.length));for(c=0;16>c;c+=1)e[c]=b[c]^909522486,h[c]=b[c]^1549556828;c=m(e.concat(E(d)),512+8*d.length);return A(m(h.concat(c),640))}function p(a){var d="",c,b;for(b=0;b<a.length;b+=1)c=a.charCodeAt(b),d+="0123456789abcdef".charAt(c>>>4&15)+"0123456789abcdef".charAt(c&15);return d}function s(a){a=unescape(encodeURIComponent(a));return A(m(E(a),8*a.length))}function J(a,d){var c;if("undefined"==
typeof a||"undefined"==typeof d)return!0;for(c in d)if("undefined"==typeof a[c])return!0;for(c in a)if("undefined"==typeof d[c])return!0;for(c in d)if(d[c])switch(typeof d[c]){case "object":if(J(d[c],a[c]))return!0;break;case "function":if("undefined"==typeof a[c]||d[c].toString()!=a[c].toString())return!0;break;default:if(d[c]!=a[c])return!0}else if(a[c])return!0;return!1}str=function(a){this.init(a)};str.format=function(a){var d=arguments,c=1;2==d.length&&"object"==typeof d[1]&&(d=d[1]);return a.replace(/%?%(?:\(([^\)]+)\))?([disr])/g,
function(a,b,e){if(a[0]==a[1])return a.substring(1);b=d[b||c++];return"undefined"===typeof b?a:"i"==e||"d"==e?+b:b})};str.prototype={init:function(a){this.str=a},format:function(){return str.format(this.str)},toString:function(){return this.str}};e.md5=function(a,d,c){return!d?c?s(a):p(s(a)):c?h(unescape(encodeURIComponent(d)),unescape(encodeURIComponent(a))):p(h(unescape(encodeURIComponent(d)),unescape(encodeURIComponent(a))))};var F={url:"//gravatar.com/avatar/%(md5)s?r=%(rate)s&s=%(size)s&d=%(default)s&%(forcedefault)s",
defaults:{rate:"pg",size:48,"default":encodeURIComponent("images/avatar_default_collaborator.png"),forcedefault:"",key:"Avatar",needle:"Person.EMail"},parse:function(a,d){if(a){d||(d=this.defaults.needle);var c=this,b=d.split("."),m=b[0],h=b[1];e.each(a,function(a,b){a===m&&(void 0!==h&&e.isDefined(b[h]))&&(this[c.defaults.key]=c.get(b[h]));(e.isObject(b)||e.isArray(b))&&c.parse(b,d)});return a}},get:function(a){return"string"!==e.type(a)?a:str.format(this.url,e.extend({},this.defaults,{md5:e.md5(e.trim(a.toLowerCase()))}))}};
e.avatar=F;var w,Q=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,R=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,S=/[^-+\dA-Z]/g,y=function(a,d){a=String(a);for(d=d||2;a.length<d;)a="0"+a;return a};w=function(a,d,c){1==arguments.length&&("[object String]"==Object.prototype.toString.call(a)&&!/\d/.test(a))&&(d=a,a=void 0);a=a?new Date(a):new Date;if(isNaN(a))throw SyntaxError("invalid date");
d=String(w.masks[d]||d||w.masks["default"]);"UTC:"==d.slice(0,4)&&(d=d.slice(4),c=!0);var b=c?"getUTC":"get",e=a[b+"Date"](),m=a[b+"Day"](),h=a[b+"Month"](),g=a[b+"FullYear"](),f=a[b+"Hours"](),j=a[b+"Minutes"](),k=a[b+"Seconds"](),b=a[b+"Milliseconds"](),l=c?0:a.getTimezoneOffset(),A={d:e,dd:y(e),ddd:w.i18n.dayNames[m],dddd:w.i18n.dayNames[m+7],m:h+1,mm:y(h+1),mmm:w.i18n.monthNames[h],mmmm:w.i18n.monthNames[h+12],yy:String(g).slice(2),yyyy:g,h:f%12||12,hh:y(f%12||12),H:f,HH:y(f),M:j,MM:y(j),s:k,
ss:y(k),l:y(b,3),L:y(99<b?Math.round(b/10):b),t:12>f?"a":"p",tt:12>f?"am":"pm",T:12>f?"A":"P",TT:12>f?"AM":"PM",Z:c?"UTC":(String(a).match(R)||[""]).pop().replace(S,""),o:(0<l?"-":"+")+y(100*Math.floor(Math.abs(l)/60)+Math.abs(l)%60,4),S:["th","st","nd","rd"][3<e%10?0:(10!=e%100-e%10)*e%10]};return d.replace(Q,function(a){return a in A?A[a]:a.slice(1,a.length-1)})};w.masks={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",
shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"};w.i18n={dayNames:"Sun Mon Tue Wed Thu Fri Sat Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),monthNames:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec January February March April May June July August September October November December".split(" ")};Date.prototype.format=function(a,d){return w(this,
a,d)};Array.isArray||(Array.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)});Function.prototype.bind||(Function.prototype.bind=function(a){if("function"!==typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var d=Array.prototype.slice.call(arguments,1),c=this,b=function(){},e=function(){return c.apply(this instanceof b?this:a,d.concat(Array.prototype.slice.call(arguments)))};b.prototype=this.prototype;e.prototype=
new b;return e});String.prototype.trim||(String.prototype.trim=function(){for(var a=this.replace(/^\s\s*/,""),d=/\s/,c=a.length;d.test(a.charAt(--c)););return a.slice(0,c+1)});var G=!1;this.Class=function(){};Class.extend=function(a,d){function c(){if(!G&&(this._constructor||this._construct))try{return(this._construct||this._constructor).apply(this,arguments)}catch(a){}}G=!0;var b=new this;G=!1;for(var e in a)b[e]=a[e];c.prototype=b;c.prototype.constructor=c;c.extend=arguments.callee;return c};var K=
function(){},u=function(){},L=function(){this.items={}},x=function(){},M=Class.extend({_construct:function(a){this.data=!this.data?{root:""}:this.data;switch(e.type(a)){case "string":this.data.url=a;break;case "array":this.data.url=a[0];void 0!==a[1]&&(this.data.xfilter=url[0]);break;case "object":this.data.url=a.url,void 0!==a.xfilter&&(this.data.xfilter=a.xfilter)}return this},xfilter:function(){this.data.xfilter=1<arguments.length?e.makeArray(arguments).join(","):e.isArray(arguments[0])?arguments[0].join(","):
arguments[0];return this},root:function(a){this.data.root=a;return this},get:function(){return this.data.root+this.data.url},order:function(a,d){this.data.order=d+"="+a;return this},filter:function(a,d){this.data.filter=a+"="+d;return this},decorate:function(a){this.data.url=a.replace(/(%s)/g,this.data.url)},options:function(){var a={};this.data.xfilter&&(a.headers={"X-Filter":this.data.xfilter});return a}}),z={request:function(a){var d=this,c=function(c,b,h){e.support.cors=!0;a instanceof M?(b=e.extend(!0,
{},b,d.options,h,{data:c},a.options()),c=e.ajax(d.href(a.get()),b)):(b=e.extend(!0,{},b,d.options,h,{data:c}),c=e.ajax(d.href(a),b));d.reset();b.fail&&c.fail(b.fail);b.done&&c.done(b.done);b.always&&c.always(b.always);return c};return{read:function(a){return c({},d.readOptions,a)},update:function(a,b){return c(a,d.updateOptions,b)},insert:function(a,b){return c(a,d.insertOptions,b)},remove:function(a){return c({},d.removeOptions,a)}}},href:function(a){return a},reset:e.noop,options:{},readOptions:{dataType:"json",
type:"get",headers:{Accept:"text/json"}},updateOptions:{type:"post",headers:{"X-HTTP-Method-Override":"PUT"}},insertOptions:{dataType:"json",type:"post"},removeOptions:{type:"get",headers:{"X-HTTP-Method-Override":"DELETE"}}},T=0;u.prototype={_changed:!1,_new:!1,defaults:{},data:{},_construct:function(a,d){this._clientId=T++;this.data={};this.parseHash(a);this._new=!0;var c=this.pushUnique?this.pushUnique():this;c._forDelete=!1;c.clearChangeset();c._clientHash=null;d&&"object"==typeof d&&e.extend(c,
d);"object"==typeof a&&c.parse(a);e.isEmptyObject(c.changeset)||c.triggerHandler("update",c.changeset).clearChangeset();return c},syncAdapter:z,feed:function(a,d,c){var a={},c=c?c:this.data,b;for(b in c)a[b]=c[b]instanceof u?d?c[b].feed(d):c[b].relationHash()||c[b].hash():c[b];return a},sync:function(a,d){var c=this,b=e.Deferred(),h=function(){return c.syncAdapter.request.apply(c.syncAdapter,arguments)};this.hash();c.triggerHandler("sync");if(this._forDelete)return h(a||this.href).remove().done(function(){c._remove()});
if(this._clientHash)return h(a||this.href).insert(this.feed()).done(function(a){c._changed=!1;c.parse(a);c._uniq&&c._uniq.replace(c._clientHash,c.hash(),c);c._clientHash=null;c.triggerHandler("insert").Class.triggerHandler("insert",c)});this._changed?e.isEmptyObject(this.changeset)||(b=this.href&&h(this.href).update(d?this.feed():this.feed("json",!1,this.changeset)).done(function(){c.triggerHandler("update",c.changeset).clearChangeset()})):b=this.href&&h(this.href).read(a).done(function(a){c.parse(a);
c.isDeleted()?c._remove():e.isEmptyObject(c.changeset)?c.clearChangeset().triggerHandler("read"):c.triggerHandler("update",c.changeset).clearChangeset()});return b},_remove:function(){this.triggerHandler("delete");this._uniq&&this._uniq.remove(this.hash())},remove:function(){this._forDelete=!0;return this},isDeleted:function(){return this._forDelete},modelDataBuild:function(a){return a},parse:function(a){a instanceof u&&(a=a.data);if(!a._parsed){for(var d in a){if(this.defaults[d])switch(!0){case "function"===
typeof this.defaults[d]&&void 0===this.data[d]:var c=this.modelDataBuild(new this.defaults[d](a[d]));!this._new&&(c!=this.data[d]&&!(c instanceof x))&&(this.changeset[d]=c);this.data[d]=c;!a[d].href&&this.data[d].relationHash&&this.data[d].relationHash(a[d]);continue;case e.isArray(this.defaults[d]):this.data[d]=this.modelDataBuild(new x(this.defaults[d][0],a[d].href));delete this.data[d];continue;case this.defaults[d]instanceof x:case this.defaults[d]instanceof u:this.data[d]=this.defaults[d];continue}else this._new||
("object"===e.type(a[d])?J(this.data[d],a[d])&&(this.changeset[d]=a[d]):this.data[d]!=a[d]&&(this.changeset[d]=a[d]));"object"===e.type(a[d])&&"object"===e.type(this.data[d])?e.extend(!0,this.data[d],a[d]):this.data[d]=a[d]}this._new=!1;a._parsed=!0}},parseHash:function(a){"string"==typeof a?this.href=a:a&&void 0!==a.href?this.href=a.href:a&&(void 0!==a.id&&void 0!==this.url)&&(this.href=this.url+a.id);return this},clearChangeset:function(){this._changed=!1;this.changeset={};return this},get:function(a){return this.data[a]},
set:function(a,d,c){var b={};"string"===e.type(a)?b[a]=d:(b=a,c=d);c=e.extend({},{silent:!1},c);this.clearChangeset().parse(b);this._changed=!0;e.isEmptyObject(this.changeset)||c.silent||this.triggerHandler("set",this.changeset);return this},_getClientHash:function(){this._clientHash||(this._clientHash="mcid-"+String(this._clientId));return this._clientHash},hash:function(){!this.href&&this.data.href&&(this.href=this.data.href);return this.data.href||this.href||this._getClientHash()},relationHash:function(a){a&&
(this.data.Id=a);return this.data.Id},off:function(a,d){e(this).off(a,d);return this},on:function(a,d,c){if(void 0===c)e(this).on(a,d);else e(this).on(a,function(){d.apply(c,arguments)});return this},trigger:function(a,d){e(this).trigger(a,d);return this},triggerHandler:function(a,d){e(this).triggerHandler(a,d);return this}};L.prototype={items:{},garbageTime:1500,refresh:function(a){a._exTime||(a._exTime=new Date);a._exTime.setTime(a._exTime.getTime()+this.garbageTime)},set:function(a,d){var c=this;
e(d).on("sync get get-prop set-prop",function(){c.refresh(this)});c.refresh(d);this.items[a]||(this.items[a]=d);return this.items[a]},replace:function(a,d,c){delete this.items[a];return this.set(d,c)},garbage:function(){for(var a in this.items)this.items[a]._exTime&&this.items[a]._exTime<new Date&&(e(this.items[a]).triggerHandler("garbage"),delete this.items[a])},remove:function(a){delete this.items[a]}};var B=u.options={},N,O;u.extend=N=function(a,d){var c;c=Class.extend.call(this,a);c.extend=N;
c.prototype.Class=c;c.on=function(a,d,b){e(c).on(a,function(){d.apply(b,arguments)});return c};c.off=function(a,d){e(c).off(a,d);return c};c.triggerHandler=function(a,d){e(c).triggerHandler(a,d)};d&&d.register&&(K[d.register]=c,delete d.register);c.prototype.options=e.extend({},d);return c};x.prototype={_list:[],getList:function(){return this._list},count:function(){return this._list.length},_construct:function(){this.model||(this.model=u);this._list=[];this.desynced=!0;var a=buildOptions=function(){void 0},
d;for(d in arguments)switch(e.type(arguments[d])){case "function":this.model=arguments[d];break;case "string":this.href=arguments[d];break;case "array":a=function(a){return function(){this._list=this.parse(a)}}(arguments[d]);break;case "object":buildOptions=function(a){return function(){this.options=a;a.href&&(this.href=a.href)}}(arguments[d])}buildOptions.call(this);a.call(this);B=e.extend({},{init:!0},this.options);B.init&&this.init.apply(this,arguments)},init:function(){},get:function(a){var d=
e.Deferred(),c=this;searchKey=function(){for(var b=0;b<c._list.length;b++)if(a==c._list[b].hash()||a==c._list[b].relationHash())return d.resolve(c._list[b]);d.reject()};this.desynced&&this.sync().done(function(){d.resolve(searchKey())})?d:searchKey();return d},remove:function(a){for(var d in this._list)if(a==this._list[d].hash()||a==this._list[d].relationHash()){Array.prototype.splice.call(this._list,d,1);break}return this},syncAdapter:z,setHref:function(a){this.href=a;return this},each:function(a){e.each(this._list,
a)},forwardEach:function(a,d){this._list.forEach(a,d)},reverseEach:function(a,d){for(var c=this._list.length;0<c;++c)a.call(d||this,this[c],c,this)},feed:function(a,d){var c=[],b;for(b in this._list)c[b]=this._list[b].feed(a,d);return c},sync:function(a){var d=this;return this.href&&this.syncAdapter.request.call(this.syncAdapter,this.href).read(a).done(function(a){for(var a=d.parse(a),b=[],h=d._list.length,m=0;m<a.list.length;m++){for(var l=!1,g=0;g<h;g++)if(a.list[m].hash()==d._list[g].hash()){l=
a.list[m];break}if(l)if(l.isDeleted())l._remove();else l.on("delete",function(){d.remove(this.hash())}).on("garbage",function(){this.desynced=!0});else d._list.push(a.list[m]),b.push(a.list[m])}d.desynced=!1;0===h?d.triggerHandler("read"):e(d).triggerHandler("update",[b])})},modelDataBuild:function(a){return a},parse:function(a){if(a.parsed)return a.parsed;var b;b=a;if(!Array.isArray(a))for(c in a)if(e.isArray(a[c])){b=a[c];break}list=[];for(var c in b)list.push(this.modelDataBuild(new this.model(b[c])));
a.parsed={list:list,total:a.total};return a.parsed},insert:function(a){this.desynced=!1;a instanceof u||(a=new this.model(a));this._list.push(a);a.hash();return a.sync(this.href)},off:function(a,b){e(this).off(a,b);return this},on:function(a,b,c){if(void 0===c)e(this).on(a,b);else e(this).on(a,function(){b.apply(c,arguments)});return this},trigger:function(a,b){e(this).trigger(a,b);return this},triggerHandler:function(a,b){e(this).triggerHandler(a,b);return this}};x.extend=O=function(a){a=Class.extend.call(this,
a);a.extend=O;B&&B.register&&(x[B.register]=a);return a};var F=Class.extend({getProperty:function(a){return!this[a]?null:"function"===typeof this[a]?this[a]():this[a]}}).extend({tagName:"div",attributes:{className:"",id:""},namespace:"view",_constructor:function(a,b){e.extend(this,a);b=e.extend({},{init:!0,events:!0,ensure:!0},b);b.ensure&&this._ensureElement();b.init&&this.init.apply(this,arguments);b.events&&this.delegateEvents()},_ensureElement:function(){var a=this.attributes.className,b=this.attributes.id,
c="";e(this.el).length?this.el=e(this.el):("string"===e.type(this.el)&&("."==this.el[0]&&(a+=this.el.substr(0,1)),"#"==this.el[0]&&(b=this.el.substr(0,1))),c="<"+this.tagName,""!==a&&(c=c+' class="'+a+'"'),""!==b&&(c=c+' id="'+b+'"'),c=c+"></"+this.tagName+">",this.el=e(c))},init:function(){return this},resetEvents:function(){this.undelegateEvents();this.delegateEvents()},delegateEvents:function(a){if(a||(a=this.getProperty("events")))for(var b in a){var c=a[b],h;for(h in c){var m=c[h];if("string"===
typeof m&&e.isFunction(this[m]))e(this.el).on(this.getEvent(h),b,this[m].bind(this))}}},getEvent:function(a){return a+this.getNamespace()},getNamespace:function(){return"."+this.getProperty("namespace")},undelegateEvents:function(){e(this.el).off(this.getProperty("namespace"))},render:function(){this.delegateEvents();return this},remove:function(){e(this.el).remove();this.destroy();return this},destroy:function(){this.model&&this.model.trigger("destroy");this.collection&&this.collection.trigger("destroy");
return this},checkElement:function(){return void 0===this.el?!1:void 0!==this.el.selector&&""!=this.el.selector?1===e(this.el.selector).length:1===e(this.el).length},setElement:function(a){this.undelegateEvents();var a=e(a),b=this.el.data();this.el.replaceWith(a);this.el=a;this.el.data(b);this.delegateEvents();return this},resetElement:function(a){this.el=e(a);this._ensureElement();this.delegateEvents()}}),P=u,H=x,z=e.extend({},z,{reset:function(){try{delete this.options.headers["X-Filter"],delete this.options.data["startEx.CId"]}catch(a){}}}),
I=e.extend({},z,{options:{headers:{Authorization:localStorage.getItem("superdesk.login.session")}},href:function(a){return-1===a.indexOf("my/")?a.replace("resources/","resources/my/"):a}}),C=function(){this.syncAdapter.options.headers||(this.syncAdapter.options.headers={});this.syncAdapter.options.headers["X-Filter"]=1<arguments.length?e.makeArray(arguments).join(","):e.isArray(arguments[0])?arguments[0].join(","):arguments[0];return this},D=function(a){e.extend(this.options,{data:{"startEx.CId":a}})},
u=P.extend({isDeleted:function(){return this._forDelete||this.data.DeletedOn},syncAdapter:z,xfilter:C,since:D}),U=u.extend({syncAdapter:I,xfilter:C,since:D}),x=H.extend({xfilter:C,since:D,syncAdapter:z}),H=x.extend({xfilter:C,since:D,syncAdapter:I});u.extend=function(){var a=P.extend.apply(this,arguments),b=new L;e.extend(a.prototype,{_uniq:b,pushUnique:function(){return b.set(this.hash(),this)}},arguments[0]);return a};e.gizmo={Model:u,AuthModel:U,Collection:x,AuthCollection:H,Sync:z,AuthSync:I,
View:F,Url:M,Register:K};t.preLoad(l)})(jQuery)};function isOnly(l,t){var e=0;for(i in l)if(e++,1<e)return!1;return void 0!==l&&void 0!==l[t]&&1==e}
window.livedesk.init=function(){var l=this,t=!1,e=!1;contentPath=void 0===l.contentPath?"":l.contentPath;"undefined"==typeof jQuery?t=!0:1.7>parseFloat($().jquery)&&(e=t=!0);t?l.loadScript("//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js",function(){"undefined"==typeof $.gizmo?l.loadGizmo(e):l.preLoad(e)}):"undefined"==typeof $.gizmo?l.loadGizmo(e):l.preLoad(e)};
window.livedesk.loadScript=function(l,t){var e=document.createElement("script");e.type="text/javascript";e.readyState?e.onreadystatechange=function(){if("loaded"==e.readyState||"complete"==e.readyState)e.onreadystatechange=null,t()}:e.onload=function(){t()};e.src=l;document.getElementsByTagName("head")[0].appendChild(e)};window.livedesk.preLoad=function(l){l?(l=$.noConflict(!0),this.startLoading(l)):this.startLoading(jQuery)};
window.livedesk.startLoading=function(l){var t=l.gizmo.Model.extend({}),t=l.gizmo.Model.extend({defaults:{Creator:t},services:{flickr:!0,google:!0,twitter:!0,facebook:!0,youtube:!0},getClass:function(){switch(this.get("Type").Key){case "wrapup":return"wrapup";case "quote":return"quotation";case "advertisement":return"advertisement";default:return this.isService()?"service":"tw"}},isService:function(){return this.get("AuthorName")in this.services},isQuote:function(){return"quotation"==this.getClass()},
twitter:{link:{anchor:function(b){return b.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/g,function(b){b=b.link(b);return b=b.replace('href="','target="_blank" href="')})},user:function(b){return b.replace(/[@]+[A-Za-z0-9-_]+/g,function(b){var e=b.replace("@",""),b=b.link("http://twitter.com/"+e);return b=b.replace('href="','target="_blank" onclick="loadProfile(\''+e+'\');return(false);"  href="')})},tag:function(b){return b.replace(/[#]+[A-Za-z0-9-_]+/g,function(b){var e=b.replace(" #",
" %23"),b=b.link("http://summize.com/search?q="+e);return b=b.replace('href="','target="_blank" href="')})},all:function(b){b=this.anchor(b);b=this.user(b);return b=this.tag(b)}}}});Posts=l.gizmo.Collection.extend({timeInterval:1E4,idInterval:0,_latestCId:0,setIdInterval:function(b){this.idInterval=setInterval(b,this.timeInterval);return this},getMaximumCid:function(b){e=0;for(count=b.list.length;e<count;e++){var m=parseInt(b.list[e].get("CId"));!isNaN(m)&&this._latestCId<m&&(this._latestCId=m)}},
auto:function(){var b=this,e={data:{"cId.since":this._latestCId},headers:{"X-Filter":"CId"}};0===this._latestCId&&delete e.data;this.triggerHandler("beforeUpdate");l.gizmo.Collection.prototype.sync.call(this,e).done(function(e){b.getMaximumCid(b.parse(e))});return this},pause:function(){clearInterval(this.idInterval);return this},sync:function(){var b=this;this.auto().pause().setIdInterval(function(){b.auto()})}}).extend({model:t});Blog=l.gizmo.Model.extend({defaults:{PostPublished:Posts}});var e=
0,v=l.gizmo.View.extend({init:function(){var b=this;b.xfilter="DeletedOn, Order, Id, CId, Content, CreatedOn, Type, AuthorName, Author.Source.Name, Author.Source.Id, IsModified, AuthorPerson.EMail, AuthorPerson.FirstName, AuthorPerson.LastName, AuthorPerson.Id";b.model.on("read",b.render,b).on("update",function(e,l){isOnly(l,"CId")?b.model.xfilter(b.xfilter).sync():b.render(e,l)}).on("delete",b.remove,b).xfilter(b.xfilter).sync()},remove:function(){this.tightkNots();this.el.remove();return this},
tightkNots:function(){void 0!==this.next&&(this.next.prev=this.prev);void 0!==this.prev&&(this.prev.next=this.next)},itemTemplate:function(b,e,l,n){var h="",p=b.getClass();b.get("AuthorName");var s="",r="";if(b.data.hasOwnProperty("Meta")){var q=b.data.Meta;"string"==typeof q&&(q=JSON.parse(q));q.hasOwnProperty("annotation")&&("string"===typeof q.annotation?r='<div class="editable annotation">'+q.annotation+"</div>":(s='<div class="editable annotation">'+q.annotation[0]+"</div>",r='<div class="editable annotation">'+
q.annotation[1]+"</div>"))}avatarString="";0<n.length&&(avatarString='<figure><img src="'+n+'" ></figure>');switch(p){case "tw":case "service":h=h+s+avatarString;h+='<div class="result-content">';h+='<div class="result-text">'+e+"</div>";h+='<p class="attributes"><i class="source-icon"></i> by '+b.get("AuthorName");h+="<time>"+l+"</time>";h+="</p>";h+="</div>";h+=r;break;case "quotation":h+=avatarString;h+='<div class="result-content">';h+='<div class="result-text">'+e+"</div>";h+='<p class="attributes">by '+
b.get("AuthorName");h+="<time>"+l+"</time>";h+="</p>";h+="</div>";break;case "wrapup":h+='<span class="big-toggle"></span>';h+="<h3>"+e+"</h3>";break;case "advertisement":h+=e}return h},toggleWrap:function(b){this._toggleWrap(l(b).closest("li").first())},_toggleWrap:function(b){if(b.hasClass("open")){var e=!0,q=window.location.hash;0<q.length&&b.nextUntil(".wrapup").each(function(){"#"+l(this).find("a").attr("name")==q&&(e=!1)});e&&(b.removeClass("open").addClass("closed"),b.nextUntil(".wrapup").hide())}else b.removeClass("closed").addClass("open"),
b.nextUntil(".wrapup").show()},render:function(){q++;var b=this,e=parseFloat(b.model.get("Order")),n="";this.model.get("AuthorPerson")&&this.model.get("AuthorPerson").EMail&&(n=l.avatar.get(b.model.get("AuthorPerson").EMail));if(!isNaN(b.order)&&e!=b.order){for(var r={prev:1,next:-1},h={prev:"next",next:"prev"},p=0<b.order-e?"next":"prev",s=b[p];void 0!==s[p]&&s[p].order*r[p]<e*r[p];s=s[p]);r=s[p];void 0!==r&&(r[h[p]]=b);s[p]=b;b.tightkNots();b[p]=r;b[h[p]]=s;b.el[{prev:"insertBefore",next:"insertAfter"}[p]](s.el)}b.order=
e;h=b.model.get("Content");e="";"wrapup"==b.model.getClass()&&(e+="open ");b.model.isService()&&(e+=b.model.get("AuthorName"),p=JSON.parse(b.model.get("Meta")),s=b.model.get("PublishedOn"),s=new Date(s),s=s.format("ddd mmm dd yyyy HH:MM:ss TT"),"flickr"==b.model.get("AuthorName")?(h=l("<span>"+h+"</span>"),h.find("img").attr("src",h.find("a").attr("href")),h=h.html()):"twitter"==b.model.get("AuthorName")?(n=p.profile_image_url,h=b.model.twitter.link.all(h)):"google"==b.model.get("AuthorName")&&p.tbUrl&&
(h+='<p><a href="'+p.url+'"><img src="'+p.tbUrl+'" height="'+p.tbHeight+'" width="'+p.tbWidth+'"></a></p>'));s=b.model.get("PublishedOn");s=new Date(s);s=s.format("ddd mmm dd yyyy HH:MM:ss TT");b.model.get("AuthorName");h=b.itemTemplate(b.model,h,s,n);n=b.model.get("Id");p=b._parent.model.get("Title");p=p.replace(/ /g,"-");p=n+"-"+encodeURI(p);p=n;n=b.model.getClass();b.setElement('<li class="'+e+n+'"><a name="'+p+'"></a>'+h+"&nbsp;"+('<a rel="bookmark" href="#'+p+'">#</a>')+"</li>");b.model.triggerHandler("rendered");
l(b.el).off("click.view").on("click.view",".big-toggle",function(){b.toggleWrap(this)})}}),n=0,r=0,q=0,t=l.gizmo.View.extend({el:"#livedesk-root",timeInterval:1E4,idInterval:0,_latestCId:0,setIdInterval:function(b){this.idInterval=setInterval(b,this.timeInterval);return this},pause:function(){clearInterval(this.idInterval);return this},sync:function(){var b=this;this.auto().pause().setIdInterval(function(){b.auto()})},auto:function(){this.model.sync();return this},ensureStatus:function(){if(this.model.get("ClosedOn")){var b=
new Date(this.model.get("ClosedOn"));this.model.get("PostPublished").pause();this.el.find("#liveblog-status").html("The liveblog coverage was stopped "+b.format("mm/dd/yyyy HH:MM:ss"))}},gotoHash:function(){if(0<location.hash.length){var b=location.hash;location.hash="";location.hash=b}},init:function(){var b=this;b.rendered=!1;"string"===l.type(b.url)&&(b.model=new Blog(b.url.replace("my/","")));b.model.on("read",function(){b.rendered||b.model.get("PostPublished").on("read",b.render,b).on("update",
b.addAll,b).on("beforeUpdate",b.updateingStatus,b).xfilter("CId").sync();b.rendered=!0}).on("update",function(){b.ensureStatus();b.renderBlog()});b.sync()},addOne:function(b){current=new v({model:b,_parent:this});this.el.find("#liveblog-post-list").prepend(current.el);current.next=this._latest;void 0!==this._latest&&(this._latest.prev=current);return this._latest=current},addAll:function(b,e){for(var l=e.length;l--;)this.addOne(e[l]);this.updateStatus()},updateingStatus:function(){this.el.find("#liveblog-status").html("updating...")},
updateStatus:function(){var b=new Date;this.el.find("#liveblog-status").fadeOut(function(){l(this).text("updated on "+b.format("HH:MM:ss")).fadeIn()})},renderBlog:function(){l(this.el).find("article").find("p").text(this.model.get("Description"))},loadTrace:function(){q>=n&&(this.gotoHash(),clearInterval(r))},render:function(){this.el.html('<article><h2></h2><p></p></article><div class="live-blog"><p class="update-time" id="liveblog-status"></p><div id="liveblog-posts"><ol id="liveblog-post-list" class="liveblog-post-list"></ol></div><div>');
this.renderBlog();this.ensureStatus();data=this.model.get("PostPublished")._list;var b=data.length;n=data.length;var e=this,l;r=setInterval(function(){e.loadTrace()},900);this.views=[];for(this.renderedTotal=b;b--;)l=this.addOne(data[b]),l.model.on("rendered",this.renderedOn,this),this.views.push(l)},renderedOn:function(){this.renderedTotal--;this.renderedTotal||this.closeAllButFirstWrapup()},closeAllButFirstWrapup:function(b){b=this.views;b.reverse();for(var e=0;e<b.length;e++)l(b[e].el).hasClass("wrapup")&&
b[e]._toggleWrap(l(b[e].el))}});window.livedesk.TimelineView=t;window.livedesk.callback()};window.livedesk.init();
