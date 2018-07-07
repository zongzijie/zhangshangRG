!function prepare(){
  window.yzsBridge = window.yzsBridge || {android:{},ios:{}};
  __platform = {
    android:/Android/i.test(navigator.userAgent),
    ios: /iPhone|iPad|iPod/i.test(navigator.userAgent)
  };
  yzs = {};
  var yzsVersion="";
  var result = navigator.userAgent.match('yzs_version/(.*?) ');
  if(result && result.length > 1){
    yzsVersion = result[1];
  }
  if(__platform.android){
    isYzsAndroid();
    yzsBridge.android.yzsVersion = yzsVersion;
    yzs = yzsBridge.android;
  }else if(__platform.ios){
    isYzsIos();
    yzsBridge.ios.yzsVersion = yzsVersion;
    yzs = yzsBridge.ios;
  }else{
    console.log("不支持的平台类型,请在明源云助手中打开");
  }

function isYzsAndroid(){
  !function(){var PLATFORM_VERSION_BUILD_LABEL="4.0.2",require,define;!function(){function e(e){var n=e.factory,o=function(n){var o=n;return"."===n.charAt(0)&&(o=e.id.slice(0,e.id.lastIndexOf(t))+t+n.slice(2)),require(o)};return e.exports={},delete e.factory,n(o,e.exports,e),e.exports}var n={},o=[],r={},t=".";require=function(t){if(!n[t])throw"module "+t+" not found";if(t in r){var i=o.slice(r[t]).join("->")+"->"+t;throw"Cycle in require graph: "+i}if(n[t].factory)try{return r[t]=o.length,o.push(t),e(n[t])}finally{delete r[t],o.pop()}return n[t].exports},define=function(e,o){if(n[e])throw"module "+e+" already defined";n[e]={id:e,factory:o}},define.remove=function(e){delete n[e]},define.moduleMap=n}(),"object"==typeof module&&"function"==typeof require&&(module.exports.require=require,module.exports.define=define),define("cordova",function(e,n,o){function r(e,n){var o=document.createEvent("Events");if(o.initEvent(e,!1,!1),n)for(var r in n)n.hasOwnProperty(r)&&(o[r]=n[r]);return o}if(window.cordova)throw new Error("cordova already defined");var t=e("cordova/channel"),i=e("cordova/platform"),a=document.addEventListener,c=document.removeEventListener,d=window.addEventListener,s=window.removeEventListener,u={},l={};document.addEventListener=function(e,n,o){var r=e.toLowerCase();"undefined"!=typeof u[r]?u[r].subscribe(n):a.call(document,e,n,o)},window.addEventListener=function(e,n,o){var r=e.toLowerCase();"undefined"!=typeof l[r]?l[r].subscribe(n):d.call(window,e,n,o)},document.removeEventListener=function(e,n,o){var r=e.toLowerCase();"undefined"!=typeof u[r]?u[r].unsubscribe(n):c.call(document,e,n,o)},window.removeEventListener=function(e,n,o){var r=e.toLowerCase();"undefined"!=typeof l[r]?l[r].unsubscribe(n):s.call(window,e,n,o)};var f={define:define,require:e,version:PLATFORM_VERSION_BUILD_LABEL,platformVersion:PLATFORM_VERSION_BUILD_LABEL,platformId:i.id,addWindowEventHandler:function(e){return l[e]=t.create(e)},addStickyDocumentEventHandler:function(e){return u[e]=t.createSticky(e)},addDocumentEventHandler:function(e){return u[e]=t.create(e)},removeWindowEventHandler:function(e){delete l[e]},removeDocumentEventHandler:function(e){delete u[e]},getOriginalHandlers:function(){return{document:{addEventListener:a,removeEventListener:c},window:{addEventListener:d,removeEventListener:s}}},fireDocumentEvent:function(e,n,o){var t=r(e,n);"undefined"!=typeof u[e]?o?u[e].fire(t):setTimeout(function(){"deviceready"==e&&document.dispatchEvent(t),u[e].fire(t)},0):document.dispatchEvent(t)},fireWindowEvent:function(e,n){var o=r(e,n);"undefined"!=typeof l[e]?setTimeout(function(){l[e].fire(o)},0):window.dispatchEvent(o)},callbackId:Math.floor(2e9*Math.random()),callbacks:{},callbackStatus:{NO_RESULT:0,OK:1,CLASS_NOT_FOUND_EXCEPTION:2,ILLEGAL_ACCESS_EXCEPTION:3,INSTANTIATION_EXCEPTION:4,MALFORMED_URL_EXCEPTION:5,IO_EXCEPTION:6,INVALID_ACTION:7,JSON_EXCEPTION:8,ERROR:9},callbackSuccess:function(e,n){f.callbackFromNative(e,!0,n.status,[n.message],n.keepCallback)},callbackError:function(e,n){f.callbackFromNative(e,!1,n.status,[n.message],n.keepCallback)},callbackFromNative:function(e,n,o,r,t){try{var i=f.callbacks[e];i&&(n&&o==f.callbackStatus.OK?i.success&&i.success.apply(null,r):n||i.fail&&i.fail.apply(null,r),t||delete f.callbacks[e])}catch(a){var c="Error in "+(n?"Success":"Error")+" callbackId: "+e+" : "+a;throw console&&console.log&&console.log(c),f.fireWindowEvent("cordovacallbackerror",{message:c}),a}},addConstructor:function(e){t.onCordovaReady.subscribe(function(){try{e()}catch(n){console.log("Failed to run constructor: "+n)}})}};o.exports=f}),define("cordova/android/nativeapiprovider",function(e,n,o){var r=this._cordovaNative||e("cordova/android/promptbasednativeapi"),t=r;o.exports={get:function(){return t},setPreferPrompt:function(n){t=n?e("cordova/android/promptbasednativeapi"):r},set:function(e){t=e}}}),define("cordova/android/promptbasednativeapi",function(e,n,o){o.exports={exec:function(e,n,o,r,t){return prompt(t,"gap:"+JSON.stringify([e,n,o,r]))},setNativeToJsBridgeMode:function(e,n){prompt(n,"gap_bridge_mode:"+e)},retrieveJsMessages:function(e,n){return prompt(+n,"gap_poll:"+e)}}}),define("cordova/argscheck",function(e,n,o){function r(e,n){return/.*?\((.*?)\)/.exec(e)[1].split(", ")[n]}function t(e,n,o,t){if(c.enableChecks){for(var i,s=null,u=0;u<e.length;++u){var l=e.charAt(u),f=l.toUpperCase(),v=o[u];if("*"!=l&&(i=a.typeName(v),(null!==v&&void 0!==v||l!=f)&&i!=d[f])){s="Expected "+d[f];break}}if(s)throw s+=", but got "+i+".",s='Wrong type for parameter "'+r(t||o.callee,u)+'" of '+n+": "+s,"undefined"==typeof jasmine&&console.error(s),TypeError(s)}}function i(e,n){return void 0===e?n:e}var a=(e("cordova/exec"),e("cordova/utils")),c=o.exports,d={A:"Array",D:"Date",N:"Number",S:"String",F:"Function",O:"Object"};c.checkArgs=t,c.getValue=i,c.enableChecks=!0}),define("cordova/base64",function(e,n,o){function r(e){for(var n,o=e.byteLength,r="",t=c(),i=0;o-2>i;i+=3)n=(e[i]<<16)+(e[i+1]<<8)+e[i+2],r+=t[n>>12],r+=t[4095&n];return o-i==2?(n=(e[i]<<16)+(e[i+1]<<8),r+=t[n>>12],r+=a[(4095&n)>>6],r+="="):o-i==1&&(n=e[i]<<16,r+=t[n>>12],r+="=="),r}var t=n;t.fromArrayBuffer=function(e){var n=new Uint8Array(e);return r(n)},t.toArrayBuffer=function(e){for(var n="undefined"!=typeof atob?atob(e):new Buffer(e,"base64").toString("binary"),o=new ArrayBuffer(n.length),r=new Uint8Array(o),t=0,i=n.length;i>t;t++)r[t]=n.charCodeAt(t);return o};var i,a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",c=function(){i=[];for(var e=0;64>e;e++)for(var n=0;64>n;n++)i[64*e+n]=a[e]+a[n];return c=function(){return i},i}}),define("cordova/builder",function(e,n,o){function r(e,n,o){for(var r in e)e.hasOwnProperty(r)&&n.apply(o,[e[r],r])}function t(e,o,r){n.replaceHookForTesting(e,o);var t=!1;try{e[o]=r}catch(i){t=!0}(t||e[o]!==r)&&d.defineGetter(e,o,function(){return r})}function i(e,n,o,r){r?d.defineGetter(e,n,function(){return console.log(r),delete e[n],t(e,n,o),o}):t(e,n,o)}function a(n,o,t,s){r(o,function(o,r){try{var u=o.path?e(o.path):{};t?("undefined"==typeof n[r]?i(n,r,u,o.deprecated):"undefined"!=typeof o.path&&(s?c(n[r],u):i(n,r,u,o.deprecated)),u=n[r]):"undefined"==typeof n[r]?i(n,r,u,o.deprecated):u=n[r],o.children&&a(u,o.children,t,s)}catch(l){d.alert("Exception building Cordova JS globals: "+l+' for key "'+r+'"')}})}function c(e,n){for(var o in n)n.hasOwnProperty(o)&&(e.prototype&&e.prototype.constructor===e?t(e.prototype,o,n[o]):"object"==typeof n[o]&&"object"==typeof e[o]?c(e[o],n[o]):t(e,o,n[o]))}var d=e("cordova/utils");n.buildIntoButDoNotClobber=function(e,n){a(n,e,!1,!1)},n.buildIntoAndClobber=function(e,n){a(n,e,!0,!1)},n.buildIntoAndMerge=function(e,n){a(n,e,!0,!0)},n.recursiveMerge=c,n.assignOrWrapInDeprecateGetter=i,n.replaceHookForTesting=function(){}}),define("cordova/channel",function(e,n,o){function r(e){if("function"!=typeof e)throw"Function required as first argument!"}var t=e("cordova/utils"),i=1,a=function(e,n){this.type=e,this.handlers={},this.state=n?1:0,this.fireArgs=null,this.numHandlers=0,this.onHasSubscribersChange=null},c={join:function(e,n){for(var o=n.length,r=o,t=function(){--r||e()},i=0;o>i;i++){if(0===n[i].state)throw Error("Can only use join with sticky channels.");n[i].subscribe(t)}o||e()},create:function(e){return c[e]=new a(e,!1)},createSticky:function(e){return c[e]=new a(e,!0)},deviceReadyChannelsArray:[],deviceReadyChannelsMap:{},waitForInitialization:function(e){if(e){var n=c[e]||this.createSticky(e);this.deviceReadyChannelsMap[e]=n,this.deviceReadyChannelsArray.push(n)}},initializationComplete:function(e){var n=this.deviceReadyChannelsMap[e];n&&n.fire()}};a.prototype.subscribe=function(e,n){if(r(e),2==this.state)return void e.apply(n||this,this.fireArgs);var o=e,a=e.observer_guid;"object"==typeof n&&(o=t.close(n,e)),a||(a=""+i++),o.observer_guid=a,e.observer_guid=a,this.handlers[a]||(this.handlers[a]=o,this.numHandlers++,1==this.numHandlers&&this.onHasSubscribersChange&&this.onHasSubscribersChange())},a.prototype.unsubscribe=function(e){r(e);var n=e.observer_guid,o=this.handlers[n];o&&(delete this.handlers[n],this.numHandlers--,0===this.numHandlers&&this.onHasSubscribersChange&&this.onHasSubscribersChange())},a.prototype.fire=function(e){var n=Array.prototype.slice.call(arguments);if(1==this.state&&(this.state=2,this.fireArgs=n),this.numHandlers){var o=[];for(var r in this.handlers)o.push(this.handlers[r]);for(var t=0;t<o.length;++t)o[t].apply(this,n);2==this.state&&this.numHandlers&&(this.numHandlers=0,this.handlers={},this.onHasSubscribersChange&&this.onHasSubscribersChange())}},c.createSticky("onDOMContentLoaded"),c.createSticky("onNativeReady"),c.createSticky("onCordovaReady"),c.createSticky("onPluginsReady"),c.createSticky("onDeviceReady"),c.create("onResume"),c.create("onPause"),c.waitForInitialization("onCordovaReady"),c.waitForInitialization("onDOMContentLoaded"),o.exports=c}),define("cordova/exec",function(require,exports,module){function androidExec(e,n,o,r,t){if(0>bridgeSecret)throw new Error("exec() called without bridgeSecret");void 0===jsToNativeBridgeMode&&androidExec.setJsToNativeBridgeMode(jsToNativeModes.JS_OBJECT);for(var i=0;i<t.length;i++)"ArrayBuffer"==utils.typeName(t[i])&&(t[i]=base64.fromArrayBuffer(t[i]));var a=o+cordova.callbackId++,c=JSON.stringify(t);(e||n)&&(cordova.callbacks[a]={success:e,fail:n});var d=nativeApiProvider.get().exec(bridgeSecret,o,r,a,c);jsToNativeBridgeMode==jsToNativeModes.JS_OBJECT&&"@Null arguments."===d?(androidExec.setJsToNativeBridgeMode(jsToNativeModes.PROMPT),androidExec(e,n,o,r,t),androidExec.setJsToNativeBridgeMode(jsToNativeModes.JS_OBJECT)):d&&(messagesFromNative.push(d),nextTick(processMessages))}function pollOnceFromOnlineEvent(){pollOnce(!0)}function pollOnce(e){if(!(0>bridgeSecret)){var n=nativeApiProvider.get().retrieveJsMessages(bridgeSecret,!!e);n&&(messagesFromNative.push(n),processMessages())}}function pollingTimerFunc(){pollEnabled&&(pollOnce(),setTimeout(pollingTimerFunc,50))}function hookOnlineApis(){function e(e){cordova.fireWindowEvent(e.type)}window.addEventListener("online",pollOnceFromOnlineEvent,!1),window.addEventListener("offline",pollOnceFromOnlineEvent,!1),cordova.addWindowEventHandler("online"),cordova.addWindowEventHandler("offline"),document.addEventListener("online",e,!1),document.addEventListener("offline",e,!1)}function buildPayload(e,n){var o=n.charAt(0);if("s"==o)e.push(n.slice(1));else if("t"==o)e.push(!0);else if("f"==o)e.push(!1);else if("N"==o)e.push(null);else if("n"==o)e.push(+n.slice(1));else if("A"==o){var r=n.slice(1);e.push(base64.toArrayBuffer(r))}else if("S"==o)e.push(window.atob(n.slice(1)));else if("M"==o)for(var t=n.slice(1);""!==t;){var i=t.indexOf(" "),a=+t.slice(0,i),c=t.substr(i+1,a);t=t.slice(i+a+1),buildPayload(e,c)}else e.push(JSON.parse(n))}function processMessage(message){var firstChar=message.charAt(0);if("J"==firstChar)eval(message.slice(1));else if("S"==firstChar||"F"==firstChar){var success="S"==firstChar,keepCallback="1"==message.charAt(1),spaceIdx=message.indexOf(" ",2),status=+message.slice(2,spaceIdx),nextSpaceIdx=message.indexOf(" ",spaceIdx+1),callbackId=message.slice(spaceIdx+1,nextSpaceIdx),payloadMessage=message.slice(nextSpaceIdx+1),payload=[];buildPayload(payload,payloadMessage),cordova.callbackFromNative(callbackId,success,status,payload,keepCallback)}else console.log("processMessage failed: invalid message: "+JSON.stringify(message))}function processMessages(){if(!isProcessing&&0!==messagesFromNative.length){isProcessing=!0;try{var e=popMessageFromQueue();if("*"==e&&0===messagesFromNative.length)return void nextTick(pollOnce);processMessage(e)}finally{isProcessing=!1,messagesFromNative.length>0&&nextTick(processMessages)}}}function popMessageFromQueue(){var e=messagesFromNative.shift();if("*"==e)return"*";var n=e.indexOf(" "),o=+e.slice(0,n),r=e.substr(n+1,o);return e=e.slice(n+o+1),e&&messagesFromNative.unshift(e),r}var cordova=require("cordova"),nativeApiProvider=require("cordova/android/nativeapiprovider"),utils=require("cordova/utils"),base64=require("cordova/base64"),channel=require("cordova/channel"),jsToNativeModes={PROMPT:0,JS_OBJECT:1},nativeToJsModes={POLLING:0,LOAD_URL:1,ONLINE_EVENT:2,PRIVATE_API:3},jsToNativeBridgeMode,nativeToJsBridgeMode=nativeToJsModes.ONLINE_EVENT,pollEnabled=!1,bridgeSecret=-1,messagesFromNative=[],isProcessing=!1,resolvedPromise="undefined"==typeof Promise?null:Promise.resolve(),nextTick=resolvedPromise?function(e){resolvedPromise.then(e)}:function(e){setTimeout(e)};androidExec.init=function(){bridgeSecret=+prompt("","gap_init:"+nativeToJsBridgeMode),channel.onNativeReady.fire()},hookOnlineApis(),androidExec.jsToNativeModes=jsToNativeModes,androidExec.nativeToJsModes=nativeToJsModes,androidExec.setJsToNativeBridgeMode=function(e){e!=jsToNativeModes.JS_OBJECT||window._cordovaNative||(e=jsToNativeModes.PROMPT),nativeApiProvider.setPreferPrompt(e==jsToNativeModes.PROMPT),jsToNativeBridgeMode=e},androidExec.setNativeToJsBridgeMode=function(e){e!=nativeToJsBridgeMode&&(nativeToJsBridgeMode==nativeToJsModes.POLLING&&(pollEnabled=!1),nativeToJsBridgeMode=e,bridgeSecret>=0&&nativeApiProvider.get().setNativeToJsBridgeMode(bridgeSecret,e),e==nativeToJsModes.POLLING&&(pollEnabled=!0,setTimeout(pollingTimerFunc,1)))},module.exports=androidExec}),define("cordova/exec/proxy",function(e,n,o){var r={};o.exports={add:function(e,n){return console.log("adding proxy for "+e),r[e]=n,n},remove:function(e){var n=r[e];return delete r[e],r[e]=null,n},get:function(e,n){return r[e]?r[e][n]:null}}}),define("cordova/init",function(e,n,o){function r(e){for(var n=0;n<e.length;++n)2!=e[n].state&&console.log("Channel not fired: "+e[n].type)}function t(e){var n=function(){};n.prototype=e;var o=new n;if(n.bind)for(var r in e)"function"==typeof e[r]?o[r]=e[r].bind(e):!function(n){u.defineGetterSetter(o,r,function(){return e[n]})}(r);return o}var i=e("cordova/channel"),a=e("cordova"),c=e("cordova/modulemapper"),d=e("cordova/platform"),s=e("cordova/pluginloader"),u=e("cordova/utils"),l=[i.onNativeReady,i.onPluginsReady];window.setTimeout(function(){2!=i.onDeviceReady.state&&(console.log("deviceready has not fired after 5 seconds."),r(l),r(i.deviceReadyChannelsArray))},5e3),window.navigator&&(window.navigator=t(window.navigator)),window.console||(window.console={log:function(){}}),window.console.warn||(window.console.warn=function(e){this.log("warn: "+e)}),i.onPause=a.addDocumentEventHandler("pause"),i.onResume=a.addDocumentEventHandler("resume"),i.onDeviceReady=a.addStickyDocumentEventHandler("deviceready"),"complete"==document.readyState||"interactive"==document.readyState?i.onDOMContentLoaded.fire():document.addEventListener("DOMContentLoaded",function(){i.onDOMContentLoaded.fire()},!1),window._nativeReady&&i.onNativeReady.fire(),c.clobbers("cordova","cordova"),c.clobbers("cordova/exec","cordova.exec"),c.clobbers("cordova/exec","Cordova.exec"),d.bootstrap&&d.bootstrap(),setTimeout(function(){s.load(function(){i.onPluginsReady.fire()})},0),i.join(function(){c.mapModules(window),d.initialize&&d.initialize(),i.onCordovaReady.fire(),i.join(function(){e("cordova").fireDocumentEvent("deviceready")},i.deviceReadyChannelsArray)},l)}),define("cordova/init_b",function(e,n,o){function r(e){for(var n=0;n<e.length;++n)2!=e[n].state&&console.log("Channel not fired: "+e[n].type)}function t(e){var n=function(){};n.prototype=e;var o=new n;if(n.bind)for(var r in e)"function"==typeof e[r]?o[r]=e[r].bind(e):!function(n){d.defineGetterSetter(o,r,function(){return e[n]})}(r);return o}var i=e("cordova/channel"),a=e("cordova"),c=e("cordova/platform"),d=e("cordova/utils"),s=[i.onDOMContentLoaded,i.onNativeReady];a.exec=e("cordova/exec"),window.setTimeout(function(){2!=i.onDeviceReady.state&&(console.log("deviceready has not fired after 5 seconds."),r(s),r(i.deviceReadyChannelsArray))},5e3),window.navigator&&(window.navigator=t(window.navigator)),window.console||(window.console={log:function(){}}),window.console.warn||(window.console.warn=function(e){this.log("warn: "+e)}),i.onPause=a.addDocumentEventHandler("pause"),i.onResume=a.addDocumentEventHandler("resume"),i.onDeviceReady=a.addStickyDocumentEventHandler("deviceready"),"complete"==document.readyState||"interactive"==document.readyState?i.onDOMContentLoaded.fire():document.addEventListener("DOMContentLoaded",function(){i.onDOMContentLoaded.fire()},!1),window._nativeReady&&i.onNativeReady.fire(),c.bootstrap&&c.bootstrap(),i.join(function(){c.initialize&&c.initialize(),i.onCordovaReady.fire(),i.join(function(){e("cordova").fireDocumentEvent("deviceready")},i.deviceReadyChannelsArray)},s)}),define("cordova/modulemapper",function(e,n,o){function r(e,n,o,r){if(!(n in d))throw new Error("Module "+n+" does not exist.");i.push(e,n,o),r&&(a[o]=r)}function t(e,n){if(!e)return n;for(var o,r=e.split("."),t=n,i=0;o=r[i];++i)t=t[o]=t[o]||{};return t}var i,a,c=e("cordova/builder"),d=define.moduleMap;n.reset=function(){i=[],a={}},n.clobbers=function(e,n,o){r("c",e,n,o)},n.merges=function(e,n,o){r("m",e,n,o)},n.defaults=function(e,n,o){r("d",e,n,o)},n.runs=function(e){r("r",e,null)},n.mapModules=function(n){var o={};n.CDV_origSymbols=o;for(var r=0,d=i.length;d>r;r+=3){var s=i[r],u=i[r+1],l=e(u);if("r"!=s){var f=i[r+2],v=f.lastIndexOf("."),p=f.substr(0,v),m=f.substr(v+1),g=f in a?"Access made to deprecated symbol: "+f+". "+g:null,h=t(p,n),b=h[m];"m"==s&&b?c.recursiveMerge(b,l):("d"==s&&!b||"d"!=s)&&(f in o||(o[f]=b),c.assignOrWrapInDeprecateGetter(h,m,l,g))}}},n.getOriginalSymbol=function(e,n){var o=e.CDV_origSymbols;if(o&&n in o)return o[n];for(var r=n.split("."),t=e,i=0;i<r.length;++i)t=t&&t[r[i]];return t},n.reset()}),define("cordova/platform",function(e,n,o){function r(n){var o=e("cordova"),r=n.action;switch(r){case"backbutton":case"menubutton":case"searchbutton":case"pause":case"resume":case"volumedownbutton":case"volumeupbutton":o.fireDocumentEvent(r);break;default:throw new Error("Unknown event action "+r)}}o.exports={id:"android",bootstrap:function(){function n(e){var n=t.addDocumentEventHandler(e+"button");n.onHasSubscribersChange=function(){i(null,null,c,"overrideButton",[e,1==this.numHandlers])}}var o=e("cordova/channel"),t=e("cordova"),i=e("cordova/exec"),a=e("cordova/modulemapper");i.init(),a.clobbers("cordova/plugin/android/app","navigator.app");var c=Number(t.platformVersion.split(".")[0])>=4?"CoreAndroid":"App",d=t.addDocumentEventHandler("backbutton");d.onHasSubscribersChange=function(){i(null,null,c,"overrideBackbutton",[1==this.numHandlers])},t.addDocumentEventHandler("menubutton"),t.addDocumentEventHandler("searchbutton"),n("volumeup"),n("volumedown"),o.onCordovaReady.subscribe(function(){i(r,null,c,"messageChannel",[]),i(null,null,c,"show",[])})}}}),define("cordova/plugin/android/app",function(e,n,o){var r=e("cordova/exec"),t=Number(e("cordova").platformVersion.split(".")[0])>=4?"CoreAndroid":"App";o.exports={clearCache:function(){r(null,null,t,"clearCache",[])},loadUrl:function(e,n){r(null,null,t,"loadUrl",[e,n])},cancelLoadUrl:function(){r(null,null,t,"cancelLoadUrl",[])},clearHistory:function(){r(null,null,t,"clearHistory",[])},backHistory:function(){r(null,null,t,"backHistory",[])},overrideBackbutton:function(e){r(null,null,t,"overrideBackbutton",[e])},overrideButton:function(e,n){r(null,null,t,"overrideButton",[e,n])},exitApp:function(){return r(null,null,t,"exitApp",[])}}}),define("cordova/pluginloader",function(e,n,o){function r(e,o,r,t){t=t||r,e in define.moduleMap?r():n.injectScript(o,function(){e in define.moduleMap?r():t()},t)}function t(e,n){for(var o,r=0;o=e[r];r++){if(o.clobbers&&o.clobbers.length)for(var t=0;t<o.clobbers.length;t++)c.clobbers(o.id,o.clobbers[t]);if(o.merges&&o.merges.length)for(var i=0;i<o.merges.length;i++)c.merges(o.id,o.merges[i]);o.runs&&c.runs(o.id)}n()}function i(e,n,o){function i(){--a||t(n,o)}var a=n.length;if(!a)return void o();for(var c=0;c<n.length;c++)r(n[c].id,e+n[c].file,i)}function a(){for(var e=null,n=document.getElementsByTagName("script"),o="/cordova.js",r=n.length-1;r>-1;r--){var t=n[r].src.replace(/\?.*$/,"");if(t.indexOf(o)==t.length-o.length){e=t.substring(0,t.length-o.length)+"/";break}}return e}var c=e("cordova/modulemapper");e("cordova/urlutil");n.injectScript=function(e,n,o){var r=document.createElement("script");r.onload=n,r.onerror=o,r.src=e,document.head.appendChild(r)},n.load=function(n){var o=a();null===o&&(o=""),r("cordova/plugin_list",o+"cordova_plugins.js",function(){var r=e("cordova/plugin_list");i(o,r,n)},n)}}),define("cordova/urlutil",function(e,n,o){n.makeAbsolute=function(e){var n=document.createElement("a");return n.href=e,n.href}}),define("cordova/utils",function(e,n,o){function r(e){for(var n="",o=0;e>o;o++){var r=parseInt(256*Math.random(),10).toString(16);1==r.length&&(r="0"+r),n+=r}return n}var t=n;t.defineGetterSetter=function(e,n,o,r){if(Object.defineProperty){var t={get:o,configurable:!0};r&&(t.set=r),Object.defineProperty(e,n,t)}else e.__defineGetter__(n,o),r&&e.__defineSetter__(n,r)},t.defineGetter=t.defineGetterSetter,t.arrayIndexOf=function(e,n){if(e.indexOf)return e.indexOf(n);for(var o=e.length,r=0;o>r;++r)if(e[r]==n)return r;return-1},t.arrayRemove=function(e,n){var o=t.arrayIndexOf(e,n);return-1!=o&&e.splice(o,1),-1!=o},t.typeName=function(e){return Object.prototype.toString.call(e).slice(8,-1)},t.isArray=function(e){return"Array"==t.typeName(e)},t.isDate=function(e){return"Date"==t.typeName(e)},t.clone=function(e){if(!e||"function"==typeof e||t.isDate(e)||"object"!=typeof e)return e;var n,o;if(t.isArray(e)){for(n=[],o=0;o<e.length;++o)n.push(t.clone(e[o]));return n}n={};for(o in e)o in n&&n[o]==e[o]||(n[o]=t.clone(e[o]));return n},t.close=function(e,n,o){return"undefined"==typeof o?function(){return n.apply(e,arguments)}:function(){return n.apply(e,o)}},t.createUUID=function(){return r(4)+"-"+r(2)+"-"+r(2)+"-"+r(2)+"-"+r(6)},t.extend=function(){var e=function(){};return function(n,o){e.prototype=o.prototype,n.prototype=new e,n.__super__=o.prototype,n.prototype.constructor=n}}(),t.alert=function(e){window.alert?window.alert(e):console&&console.log&&console.log(e)}}),window.cordova=require("cordova"),require("cordova/init")}();
    /****cordova-plugins.js****/
    cordova.define("cordova/plugin_list",function(o,n,r){r.exports=[{file:"plugins/org.apache.cordova.network-information/www/network.js",id:"org.apache.cordova.network-information.network",clobbers:["navigator.connection","navigator.network.connection"]},{file:"plugins/org.apache.cordova.network-information/www/Connection.js",id:"org.apache.cordova.network-information.Connection",clobbers:["Connection"]},{"file":"plugins/cordova-sqlite-storage/www/SQLitePlugin.js","id":"cordova-sqlite-storage.SQLitePlugin","pluginId":"cordova-sqlite-storage","clobbers":["SQLitePlugin"]}],r.exports.metadata={"org.apache.cordova.network-information":"0.2.15"}});
   /**org.apache.cordova.network-information.network**/
    cordova.define("org.apache.cordova.network-information.network",function(a,b,c){function h(){this.type="unknown"}var i,j,k,d=a("cordova/exec"),e=a("cordova"),f=a("cordova/channel"),g=a("cordova/utils");"undefined"!=typeof navigator&&g.defineGetter(navigator,"onLine",function(){return"none"!=this.connection.type}),h.prototype.getInfo=function(a,b){d(a,b,"NetworkStatus","getConnectionInfo",[])},i=new h,j=null,k=500,f.createSticky("onCordovaConnectionReady"),f.waitForInitialization("onCordovaConnectionReady"),f.onCordovaReady.subscribe(function(){i.getInfo(function(a){i.type=a,"none"===a?j=setTimeout(function(){e.fireDocumentEvent("offline"),j=null},k):(null!==j&&(clearTimeout(j),j=null),e.fireDocumentEvent("online")),2!==f.onCordovaConnectionReady.state&&f.onCordovaConnectionReady.fire()},function(a){2!==f.onCordovaConnectionReady.state&&f.onCordovaConnectionReady.fire(),console.log("Error initializing Network Connection: "+a)})}),c.exports=i});
    /**org.apache.cordova.network-information.Connection**/
    cordova.define("org.apache.cordova.network-information.Connection",function(a,b,c){c.exports={UNKNOWN:"unknown",ETHERNET:"ethernet",WIFI:"wifi",CELL_2G:"2g",CELL_3G:"3g",CELL_4G:"4g",CELL:"cellular",NONE:"none"}});
    /**cordova-sqlite-storage.SQLitePlugin**/
    cordova.define("cordova-sqlite-storage.SQLitePlugin",function(require,exports,module){(function(){var DB_STATE_INIT,DB_STATE_OPEN,READ_ONLY_REGEX,SQLiteFactory,SQLitePlugin,SQLitePluginTransaction,SelfTest,argsArray,dblocations,iosLocationMap,newSQLError,nextTick,root,txLocks;root=this;READ_ONLY_REGEX=/^(\s|;)*(?:alter|create|delete|drop|insert|reindex|replace|update)/i;DB_STATE_INIT="INIT";DB_STATE_OPEN="OPEN";txLocks={};newSQLError=function(error,code){var sqlError;sqlError=error;if(!code){code=0}if(!sqlError){sqlError=new Error("a plugin had an error but provided no response");sqlError.code=code}if(typeof sqlError==="string"){sqlError=new Error(error);sqlError.code=code}if(!sqlError.code&&sqlError.message){sqlError.code=code}if(!sqlError.code&&!sqlError.message){sqlError=new Error("an unknown error was returned: "+JSON.stringify(sqlError));sqlError.code=code}return sqlError};nextTick=window.setImmediate||function(fun){window.setTimeout(fun,0)};argsArray=function(fun){return function(){var args,i,len;len=arguments.length;if(len){args=[];i=-1;while(++i<len){args[i]=arguments[i]}return fun.call(this,args)}else{return fun.call(this,[])}}};SQLitePlugin=function(openargs,openSuccess,openError){var dbname;if(!(openargs&&openargs["name"])){throw newSQLError("Cannot create a SQLitePlugin db instance without a db name")}dbname=openargs.name;if(typeof dbname!=="string"){throw newSQLError("sqlite plugin database name must be a string")}this.openargs=openargs;this.dbname=dbname;this.openSuccess=openSuccess;this.openError=openError;this.openSuccess||(this.openSuccess=function(){console.log("DB opened: "+dbname)});this.openError||(this.openError=function(e){console.log(e.message)});this.open(this.openSuccess,this.openError)};SQLitePlugin.prototype.databaseFeatures={isSQLitePluginDatabase:true};SQLitePlugin.prototype.openDBs={};SQLitePlugin.prototype.addTransaction=function(t){if(!txLocks[this.dbname]){txLocks[this.dbname]={queue:[],inProgress:false}}txLocks[this.dbname].queue.push(t);if(this.dbname in this.openDBs&&this.openDBs[this.dbname]!==DB_STATE_INIT){this.startNextTransaction()}else{if(this.dbname in this.openDBs){console.log("new transaction is waiting for open operation")}else{console.log("database is closed, new transaction is [stuck] waiting until db is opened again!")}}};SQLitePlugin.prototype.transaction=function(fn,error,success){if(!this.openDBs[this.dbname]){error(newSQLError("database not open"));return}this.addTransaction(new SQLitePluginTransaction(this,fn,error,success,true,false))};SQLitePlugin.prototype.readTransaction=function(fn,error,success){if(!this.openDBs[this.dbname]){error(newSQLError("database not open"));return}this.addTransaction(new SQLitePluginTransaction(this,fn,error,success,false,true))};SQLitePlugin.prototype.startNextTransaction=function(){var self;self=this;nextTick((function(_this){return function(){var txLock;if(!(_this.dbname in _this.openDBs)||_this.openDBs[_this.dbname]!==DB_STATE_OPEN){console.log("cannot start next transaction: database not open");return}txLock=txLocks[self.dbname];if(!txLock){console.log("cannot start next transaction: database connection is lost");return}else{if(txLock.queue.length>0&&!txLock.inProgress){txLock.inProgress=true;txLock.queue.shift().start()}}}})(this))};SQLitePlugin.prototype.abortAllPendingTransactions=function(){var j,len1,ref,tx,txLock;txLock=txLocks[this.dbname];if(!!txLock&&txLock.queue.length>0){ref=txLock.queue;for(j=0,len1=ref.length;j<len1;j++){tx=ref[j];tx.abortFromQ(newSQLError("Invalid database handle"))}txLock.queue=[];txLock.inProgress=false}};SQLitePlugin.prototype.open=function(success,error){var myfn,openerrorcb,opensuccesscb;if(this.dbname in this.openDBs){console.log("database already open: "+this.dbname);nextTick((function(_this){return function(){success(_this)}})(this))}else{console.log("OPEN database: "+this.dbname);opensuccesscb=(function(_this){return function(){var txLock;console.log("OPEN database: "+_this.dbname+" - OK");if(!_this.openDBs[_this.dbname]){console.log("database was closed during open operation")}if(_this.dbname in _this.openDBs){_this.openDBs[_this.dbname]=DB_STATE_OPEN}if(!!success){success(_this)}txLock=txLocks[_this.dbname];if(!!txLock&&txLock.queue.length>0&&!txLock.inProgress){_this.startNextTransaction()}}})(this);openerrorcb=(function(_this){return function(){console.log("OPEN database: "+_this.dbname+" FAILED, aborting any pending transactions");if(!!error){error(newSQLError("Could not open database"))}delete _this.openDBs[_this.dbname];_this.abortAllPendingTransactions()}})(this);this.openDBs[this.dbname]=DB_STATE_INIT;if(!txLocks[this.dbname]){myfn=function(tx){tx.addStatement("ROLLBACK")};this.addTransaction(new SQLitePluginTransaction(this,myfn,null,null,false,false))}cordova.exec(opensuccesscb,openerrorcb,"SQLitePlugin","open",[this.openargs])}};SQLitePlugin.prototype.close=function(success,error){if(this.dbname in this.openDBs){if(txLocks[this.dbname]&&txLocks[this.dbname].inProgress){console.log("cannot close: transaction is in progress");error(newSQLError("database cannot be closed while a transaction is in progress"));return}console.log("CLOSE database: "+this.dbname);delete this.openDBs[this.dbname];if(txLocks[this.dbname]){console.log("closing db with transaction queue length: "+txLocks[this.dbname].queue.length)}else{console.log("closing db with no transaction lock state")}cordova.exec(success,error,"SQLitePlugin","close",[{path:this.dbname}])}else{console.log("cannot close: database is not open");if(error){nextTick(function(){return error()})}}};SQLitePlugin.prototype.executeSql=function(statement,params,success,error){var myerror,myfn,mysuccess;mysuccess=function(t,r){if(!!success){return success(r)}};myerror=function(t,e){if(!!error){return error(e)}};myfn=function(tx){tx.addStatement(statement,params,mysuccess,myerror)};this.addTransaction(new SQLitePluginTransaction(this,myfn,null,null,false,false))};SQLitePlugin.prototype.sqlBatch=function(sqlStatements,success,error){var batchList,j,len1,myfn,st;if(!sqlStatements||sqlStatements.constructor!==Array){throw newSQLError("sqlBatch expects an array")}batchList=[];for(j=0,len1=sqlStatements.length;j<len1;j++){st=sqlStatements[j];if(st.constructor===Array){if(st.length===0){throw newSQLError("sqlBatch array element of zero (0) length")}batchList.push({sql:st[0],params:st.length===0?[]:st[1]})}else{batchList.push({sql:st,params:[]})}}myfn=function(tx){var elem,k,len2,results;results=[];for(k=0,len2=batchList.length;k<len2;k++){elem=batchList[k];results.push(tx.addStatement(elem.sql,elem.params,null,null))}return results};this.addTransaction(new SQLitePluginTransaction(this,myfn,error,success,true,false))};SQLitePluginTransaction=function(db,fn,error,success,txlock,readOnly){if(typeof fn!=="function"){throw newSQLError("transaction expected a function")}this.db=db;this.fn=fn;this.error=error;this.success=success;this.txlock=txlock;this.readOnly=readOnly;this.executes=[];if(txlock){this.addStatement("BEGIN",[],null,function(tx,err){throw newSQLError("unable to begin transaction: "+err.message,err.code)})}else{this.addStatement("SELECT 1",[],null,null)}};SQLitePluginTransaction.prototype.start=function(){var err;try{this.fn(this);this.run()}catch(error1){err=error1;txLocks[this.db.dbname].inProgress=false;this.db.startNextTransaction();if(this.error){this.error(newSQLError(err))}}};SQLitePluginTransaction.prototype.executeSql=function(sql,values,success,error){if(this.finalized){throw {message:"InvalidStateError: DOM Exception 11: This transaction is already finalized. Transactions are committed after its success or failure handlers are called. If you are using a Promise to handle callbacks, be aware that implementations following the A+ standard adhere to run-to-completion semantics and so Promise resolution occurs on a subsequent tick and therefore after the transaction commits.",code:11};return}if(this.readOnly&&READ_ONLY_REGEX.test(sql)){this.handleStatementFailure(error,{message:"invalid sql for a read-only transaction"});return}this.addStatement(sql,values,success,error)};SQLitePluginTransaction.prototype.addStatement=function(sql,values,success,error){var j,len1,params,sqlStatement,t,v;sqlStatement=typeof sql==="string"?sql:sql.toString();params=[];if(!!values&&values.constructor===Array){for(j=0,len1=values.length;j<len1;j++){v=values[j];t=typeof v;params.push((v===null||v===void 0?null:t==="number"||t==="string"?v:v.toString()))}}this.executes.push({success:success,error:error,sql:sqlStatement,params:params})};SQLitePluginTransaction.prototype.handleStatementSuccess=function(handler,response){var payload,rows;if(!handler){return}rows=response.rows||[];payload={rows:{item:function(i){return rows[i]},length:rows.length},rowsAffected:response.rowsAffected||0,insertId:response.insertId||void 0};handler(this,payload)};SQLitePluginTransaction.prototype.handleStatementFailure=function(handler,response){if(!handler){throw newSQLError("a statement with no error handler failed: "+response.message,response.code)}if(handler(this,response)!==false){throw newSQLError("a statement error callback did not return false: "+response.message,response.code)}};SQLitePluginTransaction.prototype.run=function(){var batchExecutes,handlerFor,i,mycb,mycbmap,request,tropts,tx,txFailure,waiting;txFailure=null;tropts=[];batchExecutes=this.executes;waiting=batchExecutes.length;this.executes=[];tx=this;handlerFor=function(index,didSucceed){return function(response){var err;if(!txFailure){try{if(didSucceed){tx.handleStatementSuccess(batchExecutes[index].success,response)}else{tx.handleStatementFailure(batchExecutes[index].error,newSQLError(response))}}catch(error1){err=error1;txFailure=newSQLError(err)}}if(--waiting===0){if(txFailure){tx.executes=[];tx.abort(txFailure)}else{if(tx.executes.length>0){tx.run()}else{tx.finish()}}}}};mycbmap={};i=0;while(i<batchExecutes.length){request=batchExecutes[i];mycbmap[i]={success:handlerFor(i,true),error:handlerFor(i,false)};tropts.push({qid:null,sql:request.sql,params:request.params});i++}mycb=function(result){var j,q,r,ref,res,resultIndex,type;for(resultIndex=j=0,ref=result.length-1;0<=ref?j<=ref:j>=ref;resultIndex=0<=ref?++j:--j){r=result[resultIndex];type=r.type;res=r.result;q=mycbmap[resultIndex];if(q){if(q[type]){q[type](res)}}}};cordova.exec(mycb,null,"SQLitePlugin","backgroundExecuteSqlBatch",[{dbargs:{dbname:this.db.dbname},executes:tropts}])};SQLitePluginTransaction.prototype.abort=function(txFailure){var failed,succeeded,tx;if(this.finalized){return}tx=this;succeeded=function(tx){txLocks[tx.db.dbname].inProgress=false;tx.db.startNextTransaction();if(tx.error&&typeof tx.error==="function"){tx.error(txFailure)}};failed=function(tx,err){txLocks[tx.db.dbname].inProgress=false;tx.db.startNextTransaction();if(tx.error&&typeof tx.error==="function"){tx.error(newSQLError("error while trying to roll back: "+err.message,err.code))}};this.finalized=true;if(this.txlock){this.addStatement("ROLLBACK",[],succeeded,failed);this.run()}else{succeeded(tx)}};SQLitePluginTransaction.prototype.finish=function(){var failed,succeeded,tx;if(this.finalized){return}tx=this;succeeded=function(tx){txLocks[tx.db.dbname].inProgress=false;tx.db.startNextTransaction();if(tx.success&&typeof tx.success==="function"){tx.success()}};failed=function(tx,err){txLocks[tx.db.dbname].inProgress=false;tx.db.startNextTransaction();if(tx.error&&typeof tx.error==="function"){tx.error(newSQLError("error while trying to commit: "+err.message,err.code))}};this.finalized=true;if(this.txlock){this.addStatement("COMMIT",[],succeeded,failed);this.run()}else{succeeded(tx)}};SQLitePluginTransaction.prototype.abortFromQ=function(sqlerror){if(this.error){this.error(sqlerror)}};dblocations=["docs","libs","nosync"];iosLocationMap={"default":"nosync","Documents":"docs","Library":"libs"};SQLiteFactory={openDatabase:argsArray(function(args){var dblocation,errorcb,okcb,openargs;if(args.length<1||!args[0]){throw newSQLError("Sorry missing mandatory open arguments object in openDatabase call")}if(args[0].constructor===String){throw newSQLError("Sorry first openDatabase argument must be an object")}openargs=args[0];if(!openargs.name){throw newSQLError("Database name value is missing in openDatabase call")}if(!openargs.iosDatabaseLocation&&!openargs.location&&openargs.location!==0){throw newSQLError("Database location or iosDatabaseLocation setting is now mandatory in openDatabase call.")}if(!!openargs.location&&!!openargs.iosDatabaseLocation){throw newSQLError("AMBIGUOUS: both location and iosDatabaseLocation settings are present in openDatabase call. Please use either setting, not both.")}dblocation=!!openargs.location&&openargs.location==="default"?iosLocationMap["default"]:!!openargs.iosDatabaseLocation?iosLocationMap[openargs.iosDatabaseLocation]:dblocations[openargs.location];if(!dblocation){throw newSQLError("Valid iOS database location could not be determined in openDatabase call")}openargs.dblocation=dblocation;if(!!openargs.createFromLocation&&openargs.createFromLocation===1){openargs.createFromResource="1"}if(!!openargs.androidDatabaseImplementation&&openargs.androidDatabaseImplementation===2){openargs.androidOldDatabaseImplementation=1}if(!!openargs.androidLockWorkaround&&openargs.androidLockWorkaround===1){openargs.androidBugWorkaround=1}okcb=null;errorcb=null;if(args.length>=2){okcb=args[1];if(args.length>2){errorcb=args[2]}}return new SQLitePlugin(openargs,okcb,errorcb)}),deleteDatabase:function(first,success,error){var args,dblocation,dbname;args={};if(first.constructor===String){throw newSQLError("Sorry first deleteDatabase argument must be an object")}else{if(!(first&&first["name"])){throw new Error("Please specify db name")}dbname=first.name;if(typeof dbname!=="string"){throw newSQLError("delete database name must be a string")}args.path=dbname}if(!first.iosDatabaseLocation&&!first.location&&first.location!==0){throw newSQLError("Database location or iosDatabaseLocation setting is now mandatory in deleteDatabase call.")}if(!!first.location&&!!first.iosDatabaseLocation){throw newSQLError("AMBIGUOUS: both location and iosDatabaseLocation settings are present in deleteDatabase call. Please use either setting value, not both.")}dblocation=!!first.location&&first.location==="default"?iosLocationMap["default"]:!!first.iosDatabaseLocation?iosLocationMap[first.iosDatabaseLocation]:dblocations[first.location];if(!dblocation){throw newSQLError("Valid iOS database location could not be determined in deleteDatabase call")}args.dblocation=dblocation;delete SQLitePlugin.prototype.openDBs[args.path];return cordova.exec(success,error,"SQLitePlugin","delete",[args])}};SelfTest={DBNAME:"___$$$___litehelpers___$$$___test___$$$___.db",start:function(successcb,errorcb){SQLiteFactory.deleteDatabase({name:SelfTest.DBNAME,location:"default"},(function(){return SelfTest.step1(successcb,errorcb)}),(function(){return SelfTest.step1(successcb,errorcb)}))},step1:function(successcb,errorcb){SQLiteFactory.openDatabase({name:SelfTest.DBNAME,location:"default"},function(db){var check1;check1=false;db.transaction(function(tx){tx.executeSql('SELECT UPPER("Test") AS upperText',[],function(ignored,resutSet){if(!resutSet.rows){return SelfTest.finishWithError(errorcb,"Missing resutSet.rows")}if(!resutSet.rows.length){return SelfTest.finishWithError(errorcb,"Missing resutSet.rows.length")}if(resutSet.rows.length!==1){return SelfTest.finishWithError(errorcb,"Incorrect resutSet.rows.length value: "+resutSet.rows.length+" (expected: 1)")}if(!resutSet.rows.item(0).upperText){return SelfTest.finishWithError(errorcb,"Missing resutSet.rows.item(0).upperText")}if(resutSet.rows.item(0).upperText!=="TEST"){return SelfTest.finishWithError(errorcb,"Incorrect resutSet.rows.item(0).upperText value: "+(resutSet.rows.item(0).upperText)+" (expected: 'TEST')")}check1=true},function(ignored,tx_sql_err){return SelfTest.finishWithError(errorcb,"TX SQL error: "+tx_sql_err)})},function(tx_err){return SelfTest.finishWithError(errorcb,"TRANSACTION error: "+tx_err)},function(){if(!check1){return SelfTest.finishWithError(errorcb,"Did not get expected upperText result data")}db.executeSql("BEGIN",null,function(ignored){return nextTick(function(){delete db.openDBs[SelfTest.DBNAME];delete txLocks[SelfTest.DBNAME];nextTick(function(){db.transaction(function(tx2){tx2.executeSql("SELECT 1")},function(tx_err){if(!tx_err){return SelfTest.finishWithError(errorcb,"Missing error object")}SelfTest.step2(successcb,errorcb)},function(){return SelfTest.finishWithError(errorcb,"Missing error object")})})})})})},function(open_err){return SelfTest.finishWithError(errorcb,"Open database error: "+open_err)})},step2:function(successcb,errorcb){SQLiteFactory.openDatabase({name:SelfTest.DBNAME,location:"default"},function(db){db.transaction(function(tx){tx.executeSql("SELECT ? AS myResult",[null],function(ignored,resutSet){if(!resutSet.rows){return SelfTest.finishWithError(errorcb,"Missing resutSet.rows")}if(!resutSet.rows.length){return SelfTest.finishWithError(errorcb,"Missing resutSet.rows.length")}if(resutSet.rows.length!==1){return SelfTest.finishWithError(errorcb,"Incorrect resutSet.rows.length value: "+resutSet.rows.length+" (expected: 1)")}SelfTest.step3(successcb,errorcb)})},function(txError){return SelfTest.finishWithError(errorcb,"UNEXPECTED TRANSACTION ERROR: "+txError)})},function(open_err){return SelfTest.finishWithError(errorcb,"Open database error: "+open_err)})},step3:function(successcb,errorcb){SQLiteFactory.openDatabase({name:SelfTest.DBNAME,location:"default"},function(db){return db.sqlBatch(["CREATE TABLE TestTable(id integer primary key autoincrement unique, data);",["INSERT INTO TestTable (data) VALUES (?);",["test-value"]]],function(){var firstid;firstid=-1;return db.executeSql("SELECT id, data FROM TestTable",[],function(resutSet){if(!resutSet.rows){SelfTest.finishWithError(errorcb,"Missing resutSet.rows");return}if(!resutSet.rows.length){SelfTest.finishWithError(errorcb,"Missing resutSet.rows.length");return}if(resutSet.rows.length!==1){SelfTest.finishWithError(errorcb,"Incorrect resutSet.rows.length value: "+resutSet.rows.length+" (expected: 1)");return}if(resutSet.rows.item(0).id===void 0){SelfTest.finishWithError(errorcb,"Missing resutSet.rows.item(0).id");return}firstid=resutSet.rows.item(0).id;if(!resutSet.rows.item(0).data){SelfTest.finishWithError(errorcb,"Missing resutSet.rows.item(0).data");return}if(resutSet.rows.item(0).data!=="test-value"){SelfTest.finishWithError(errorcb,"Incorrect resutSet.rows.item(0).data value: "+(resutSet.rows.item(0).data)+" (expected: 'test-value')");return}return db.transaction(function(tx){return tx.executeSql("UPDATE TestTable SET data = ?",["new-value"])},function(tx_err){return SelfTest.finishWithError(errorcb,"UPDATE transaction error: "+tx_err)},function(){var readTransactionFinished;readTransactionFinished=false;return db.readTransaction(function(tx2){return tx2.executeSql("SELECT id, data FROM TestTable",[],function(ignored,resutSet2){if(!resutSet2.rows){throw newSQLError("Missing resutSet2.rows")}if(!resutSet2.rows.length){throw newSQLError("Missing resutSet2.rows.length")}if(resutSet2.rows.length!==1){throw newSQLError("Incorrect resutSet2.rows.length value: "+resutSet2.rows.length+" (expected: 1)")}if(!resutSet2.rows.item(0).id){throw newSQLError("Missing resutSet2.rows.item(0).id")}if(resutSet2.rows.item(0).id!==firstid){throw newSQLError("resutSet2.rows.item(0).id value "+(resutSet2.rows.item(0).id)+" does not match previous primary key id value ("+firstid+")")}if(!resutSet2.rows.item(0).data){throw newSQLError("Missing resutSet2.rows.item(0).data")}if(resutSet2.rows.item(0).data!=="new-value"){throw newSQLError("Incorrect resutSet2.rows.item(0).data value: "+(resutSet2.rows.item(0).data)+" (expected: 'test-value')")}return readTransactionFinished=true})},function(tx2_err){return SelfTest.finishWithError(errorcb,"readTransaction error: "+tx2_err)},function(){if(!readTransactionFinished){SelfTest.finishWithError(errorcb,"readTransaction did not finish");return}return db.transaction(function(tx3){tx3.executeSql("DELETE FROM TestTable");return tx3.executeSql("INSERT INTO TestTable (data) VALUES(?)",[123])},function(tx3_err){return SelfTest.finishWithError(errorcb,"DELETE transaction error: "+tx3_err)},function(){var secondReadTransactionFinished;secondReadTransactionFinished=false;return db.readTransaction(function(tx4){return tx4.executeSql("SELECT id, data FROM TestTable",[],function(ignored,resutSet3){if(!resutSet3.rows){throw newSQLError("Missing resutSet3.rows")}if(!resutSet3.rows.length){throw newSQLError("Missing resutSet3.rows.length")}if(resutSet3.rows.length!==1){throw newSQLError("Incorrect resutSet3.rows.length value: "+resutSet3.rows.length+" (expected: 1)")}if(!resutSet3.rows.item(0).id){throw newSQLError("Missing resutSet3.rows.item(0).id")}if(resutSet3.rows.item(0).id===firstid){throw newSQLError("resutSet3.rows.item(0).id value "+(resutSet3.rows.item(0).id)+" incorrectly matches previous unique key id value value ("+firstid+")")}if(!resutSet3.rows.item(0).data){throw newSQLError("Missing resutSet3.rows.item(0).data")}if(resutSet3.rows.item(0).data!==123){throw newSQLError("Incorrect resutSet3.rows.item(0).data value: "+(resutSet3.rows.item(0).data)+" (expected 123)")}return secondReadTransactionFinished=true})},function(tx4_err){return SelfTest.finishWithError(errorcb,"second readTransaction error: "+tx4_err)},function(){if(!secondReadTransactionFinished){SelfTest.finishWithError(errorcb,"second readTransaction did not finish");return}return db.close(function(){return SQLiteFactory.deleteDatabase({name:SelfTest.DBNAME,location:"default"},successcb,function(cleanup_err){if(/Windows /.test(navigator.userAgent)||/IEMobile/.test(navigator.userAgent)){console.log("IGNORE CLEANUP (DELETE) ERROR: "+(JSON.stringify(cleanup_err))+" (Windows/WP8)");successcb();return}return SelfTest.finishWithError(errorcb,"Cleanup error: "+cleanup_err)})},function(close_err){if(/Windows /.test(navigator.userAgent)||/IEMobile/.test(navigator.userAgent)){console.log("IGNORE close ERROR: "+(JSON.stringify(close_err))+" (Windows/WP8)");SQLiteFactory.deleteDatabase({name:SelfTest.DBNAME,location:"default"},successcb,successcb);return}return SelfTest.finishWithError(errorcb,"close error: "+close_err)})})})})})},function(select_err){return SelfTest.finishWithError(errorcb,"SELECT error: "+select_err)})},function(batch_err){return SelfTest.finishWithError(errorcb,"sql batch error: "+batch_err)})},function(open_err){return SelfTest.finishWithError(errorcb,"Open database error: "+open_err)})},finishWithError:function(errorcb,message){console.log("selfTest ERROR with message: "+message);SQLiteFactory.deleteDatabase({name:SelfTest.DBNAME,location:"default"},function(){return errorcb(newSQLError(message))},function(err2){return errorcb(newSQLError("Cleanup error: "+err2+" for error: "+message))})}};root.sqlitePlugin={sqliteFeatures:{isSQLitePlugin:true},echoTest:function(okcb,errorcb){var error,ok;ok=function(s){if(s==="test-string"){return okcb()}else{return errorcb("Mismatch: got: '"+s+"' expected 'test-string'")}};error=function(e){return errorcb(e)};return cordova.exec(ok,error,"SQLitePlugin","echoStringValue",[{value:"test-string"}])},selfTest:SelfTest.start,openDatabase:SQLiteFactory.openDatabase,deleteDatabase:SQLiteFactory.deleteDatabase}}).call(this)});
     /**自定义变量**/
    yzsBridge.android.chooseImage = function(obj){
        var option= objExtend({
            count:9,
            width:200,
            height:200,
            crop:false,
            success: function (data) {},
            error:function(data){}
        },obj);
        cordova.exec(function(data){
            var resobj ={
                "sourceType":"album",
                "errMsg":"chooseImage:ok",
                "images":[]
            };
            for(var i=0;i<data.length;i++){
                resobj.images[i]={};
                resobj.images[i].image=data[i].data;
                resobj.images[i].localId=data[i].localResourceId;
                //3.4.0及之前的版本不会返回isOriginal字段
                var isOriginal = data[i].isOriginal;
                if(typeof(isOriginal) == 'undefined'){
                  resobj.images[i].isOriginal = false;
                }else{
                  resobj.images[i].isOriginal = isOriginal;
                }
                //3.5.2之前的版本不会返回exif字段
                var exif = data[i].exif;
                if(typeof(exif) == 'undefined'){
                  resobj.images[i].exif = {};
                }else{
                  resobj.images[i].exif = exif;
                }
            };
            option.success(resobj)
        }, option.error, 'Camera', 'takePicture', [option.count,option.width,option.height,option.crop]);
    };

    yzsBridge.android.previewImage = function(obj){
        var option= objExtend({
            current: '',
            urls: [],
            success: function (data) {},
            error:function(data){}
        },obj);
        cordova.exec(option.success,option.error, 'Camera', 'previewPicture', [option.current,option.urls]);
    };

    yzsBridge.android.uploadImage = function(obj){
        var option= objExtend({
            localIds: [],
            appCode:'3000',
            sync: false,
            maxSize:300,
            isOriginal:false,
            success: function (res) {},
            error:function(res){},
            progress:function(index,total){},
            params:100
        },obj);
        if(window.tplData && tplData.APP_CODE){
            option.appCode=tplData.APP_CODE;
        }
        if(option.localIds.length<1){
            var errObj={
                "code":-1,
                "message":"参数错误"
            };
            option.error(errObj);
            return;
        }
        upload(0,option.localIds[0]);
        var resobj={
            "errMsg":"uploadImage:ok",
            "images":[]
        };
        function upload(num,curStr){
            cordova.exec(function(data){
                option.progress(num+1,option.localIds.length);
                resobj.images.push({
                    localId:data[0].localResourceId,
                    url:data[0].serverUrl,
          thumb:data[0].thumb?data[0].thumb:data[0].serverUrl+"?x-oss-process=image/resize,m_fixed,h_100,w_100",
                })
                if(num < option.localIds.length-1){
                    upload(num+1,option.localIds[num+1]);
                }else{
                    option.success(resobj);
                }
            }, option.error, 'Camera', 'uploadPicture', [option.appCode,option.maxSize,option.sync,option.params,[option.localIds[num]],option.isOriginal]);
        }
    }

    yzsBridge.android.uploadImageV2 = function(obj){
        var option= objExtend({
            localId: "",
            appCode:'0001',
            sync: false,
            maxSize:300,
            isOriginal:false,
            interval:1000,
            success: function (res) {},
            error:function(res){},
            progress:function(res){}
        },obj);
        if(window.tplData && tplData.APP_CODE){
            option.appCode=tplData.APP_CODE;
        }
        if(yzsVersion < "3.5.1"){
            option.error({"code":-1,message:"请升级到最新版本的云助手"});
            return;
        }
        if(option.localId.length<1){
            var errObj={
                "code":-1,
                "message":"参数错误"
            };
            option.error(errObj);
            return;
        }
        upload();
        function upload(){
            cordova.exec(function(data){
                 var resObj = {};
                 resObj.localId = data.localResourceId;
                 resObj.url = data.serverUrl;
                 if(resObj.url){
                     resObj.thumb = resObj.url+"?x-oss-process=image/resize,m_fixed,h_100,w_100";
                 }else{
                     resObj.thumb = "";
                 }
                if(option.sync){
                    resObj.progress = data.progress;
                    if(data.code == 0){
                        option.progress(resObj);
                     }else{
                        option.success(resObj);
                     }
                 }else{
                    option.success(resObj);
                 }
                
            }, option.error, 'Camera', 'uploadPictureV2', [{
                   "appCode":option.appCode,
                   "maxSize":option.maxSize,
                   "sync":option.sync,
                   "isOriginal":option.isOriginal,
                   "localId":option.localId,
                   "interval":option.interval,
                 }]);
        }
    }

    yzsBridge.android.getPictureById = function(obj){
        var option = objExtend({
            ids: [],
            maxSize: 300,
            success: function (res) {},
            error:function(res){}
        },obj);
        cordova.exec(option.success,option.error, 'Camera', 'getPictureById', [option.maxSize,option.ids]);
    };

    yzsBridge.android.closeWindow = function(obj){
       var option = objExtend({
             success: function (res) {},
             error:function(res){}
        },obj);
        cordova.exec(option.success,option.error, 'UIControl', 'closeWindow', []);
    };

    yzsBridge.android.enableLandscape = function(bool){
        setTimeout(function(){
          cordova.exec(null,null, 'UIControl', 'enableLandscape', [bool]);
        },1)
    };

    yzsBridge.android.onBusinessStatusChanged = function(obj){
      var option = objExtend({
             success: function (res) {},
             error:function(res){}
        },obj);
       cordova.exec(option.success,option.error, 'AppControl', 'onBusinessStatusChanged', []);
    };

    yzsBridge.android.onBusinessProcessRemoved = function(obj){
      var option = objExtend({
             success: function (res) {},
             error:function(res){}
        },obj);
       cordova.exec(option.success,option.error, 'AppControl', 'onBusinessProcessRemoved', []);
    };

    yzsBridge.android.onBadgeChanged = function(obj){
      var option = objExtend({
             success: function (res) {},
             error:function(res){}
        },obj);
       cordova.exec(option.success,option.error, 'AppControl', 'onBadgeChanged', []);
    };

    yzsBridge.android.goBack = function(obj){
      var option = objExtend({
            success: function (res) {},
            error:function(res){}
        },obj);
       cordova.exec(option.success,option.error, 'UIControl', 'goBack', []);
    };

    yzsBridge.android.showTitleBar = function(bool){
       cordova.exec(null,null, 'UIControl', 'showTitleBar', [bool]);
    };

    yzsBridge.android.setTitle = function(str){
       cordova.exec(null,null, 'UIControl', 'setTitle', [str]);
    };

    yzsBridge.android.getDeviceInfo = function(obj){
        var option = objExtend({
            success:function(res){},
            error:function(res){}
        },obj);
       cordova.exec(option.success,option.error, 'DeviceInfo', 'getDeviceInfo', []);
    };

    yzsBridge.android.getNetworkType = function(obj){
        var option= objExtend({
            current: '',
            urls: [],
            success:function(){},
            error:function(){}
        },obj);

        var resobj = {
            "networkType":''
        };

        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'wifi';
        states[Connection.CELL_2G]  = '2g';
        states[Connection.CELL_3G]  = '3g';
        states[Connection.CELL_4G]  = '4g';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';
        resobj.networkType =states[networkState];
        option.success(resobj);
    };

    yzsBridge.android.getDeviceLocation = function(obj){
        var option = objExtend({
          targetAccuracy:2,
          success:function(res){},
          error:function(res){}
        },obj);
       cordova.exec(option.success,option.error, 'DeviceInfo', 'getDeviceLocation', [{targetAccuracy:option.targetAccuracy}]);
    };

    yzsBridge.android.setHeadViewRight = function(obj){
        var option = objExtend({
          isShow:true,
          text:'',
          success:function(res){},
          error:function(res){}
        },obj);
        cordova.exec(option.success,option.error, 'UIControl', 'setHeadViewRight', [{isShow:option.isShow,text:option.text}]);
    };

    yzsBridge.android.share = function(obj){
        var option = objExtend({
          type:0,
          url:'',
          title:'',
          content:'',
          image:'',
          success:function(res){},
          error:function(res){}
        },obj);
        cordova.exec(option.success,option.error, 'AppControl', 'share', [{type:option.type,url:option.url,title:option.title,content:option.content,image:option.image}]);
    };

    yzsBridge.android.openWindow = function(obj){
        var option = objExtend({
          url:'',
          openWay:0,
          success:function(res){},
          error:function(res){}
        },obj);
        cordova.exec(option.success,option.error, 'AppControl', 'openWindow', [{url:option.url,openWay:option.openWay}]);
    };

    yzsBridge.android.checkInstalledApps = function(obj){
      var option = objExtend({
           apps:[],
           success:function(res){},
           error:function(res){}
      },obj);
        cordova.exec(option.success,option.error, 'DeviceInfo', 'checkInstalledApps', [{apps:option.apps}]);
    };

     yzsBridge.android.getAppsInfo = function(obj){
      var option = objExtend({
           apps:[],
           success:function(res){},
           error:function(res){}
      },obj);
        cordova.exec(option.success,option.error, 'DeviceInfo', 'getAppsInfo', [{apps:option.apps}]);
    };

    yzsBridge.android.launchApp = function(obj){
      var option = objExtend({
          app:'',
          activity:'',
          success:function(res){},
          error:function(res){}
      },obj);
        cordova.exec(option.success,option.error, 'AppControl', 'launchApp', [{app:option.app,activity:option.activity}]);
    };

    yzsBridge.android.setProgressBarColor = function(obj){
      var option = objExtend({
          color:'',
          success:function(res){},
          error:function(res){}
      },obj);
        cordova.exec(option.success,option.error, 'UIControl', 'setProgressBarColor', [{color:option.color}]);
    };

    yzsBridge.android.modal = function(obj){
      var option = objExtend({
          entity:[],
          buttonLabels:[],
          success:function(res){},
          error:function(res){}
      },obj);
        cordova.exec(option.success,option.error, 'UIControl', 'modal', [{entity:option.entity,buttonLabels:option.buttonLabels}]);
    };

    yzsBridge.android.scan = function(obj){
      var option = objExtend({
          scanMode:0,
          success:function(res){},
          error:function(res){}
      },obj);
        cordova.exec(option.success,option.error, 'MQRcode', 'scan', [{scanMode:option.scanMode}]);
    };

    yzsBridge.android.isImEnable = function(obj){
      var option = objExtend({
          success:function(res){},
          error:function(res){}
      },obj);
        if(yzsVersion>="3.4.0"){
            cordova.exec(option.success,option.error, 'MIm', 'isImEnable', []);
        }else{
            option.success({"code":0,enable:false,message:""});
        }

    };

    yzsBridge.android.createDiscussionGroup = function(obj){
          var option = objExtend({
            name:"",
            topic:{
            },
            optionalMember:[],
            businessId:"",
            memberFrom:"",
            extra:"",
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MIm','createDiscussionGroup', [{name:option.name,topic:option.topic, optionalMember:option.optionalMember, businessId:option.businessId, memberFrom:option.memberFrom, extra:option.extra,appCode:option.appCode}]);
  };

  yzsBridge.android.openDiscussionGroup = function(obj){
          var option = objExtend({
            discussionGroupId:"",
            discussionGroupName:"",
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MIm','openDiscussionGroup', [{discussionGroupId:option.discussionGroupId,discussionGroupName:option.discussionGroupName}]);
  };

  yzsBridge.android.createConversation = function(obj){
          var option = objExtend({
            topic:{},
            talkTo:{},
            imageLocalResourceId:"",
            mode:"share",
            extra:"",
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MIm','createConversation', [{topic:option.topic,talkTo:option.talkTo,imageLocalResourceId:option.imageLocalResourceId,mode:option.mode, extra:option.extra}]);
  };

  yzsBridge.android.screenShot = function(obj){
          var option = objExtend({
            watermark:false,
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MScreenShot','screenShot', [{watermark:option.watermark}]);
  };

  yzsBridge.android.openContactDetail = function(obj){
          var option = objExtend({
            topic:{},
            userId:"123",
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MContact','openContactDetail', [{topic:option.topic,userId:option.userId}]);
  };

  yzsBridge.android.chooseContact = function(obj){
          var option = objExtend({
            max:-1,
            limitTips:"人数超过最大限制",
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MContact','chooseContact', [{max:option.max,limitTips:option.limitTips}]);
  };

  yzsBridge.android.alert = function(obj){
          var option = objExtend({
            message:"",
            title:"",
            buttonName:"",
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'UIControl','alert', [{message:option.message,title:option.title,buttonName:option.buttonName}]);
  };

  yzsBridge.android.confirm = function(obj){
          var option = objExtend({
            message:"",
            title:"",
            buttonLabels:[],
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'UIControl','confirm', [{message:option.message,title:option.title,buttonLabels:option.buttonLabels}]);
  };

  yzsBridge.android.prompt = function(obj){
          var option = objExtend({
            message:"",
            title:"",
            buttonLabels:[],
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'UIControl','prompt', [{message:option.message,title:option.title,buttonLabels:option.buttonLabels}]);
  };

  yzsBridge.android.toast = function(obj){
          var option = objExtend({
            text:"",
            duration:2000,
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'UIControl','toast', [{text:option.text,duration:option.duration}]);
  };

  yzsBridge.android.actionSheet = function(obj){
          var option = objExtend({
            title:"",
            cancelButton:"",
            otherButtons:[],
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'UIControl','actionSheet', [{title:option.title,cancelButton:option.cancelButton,otherButtons:option.otherButtons}]);
  };

  yzsBridge.android.buryingPoint = function(obj){
          var option = objExtend({
            eventId:0,
            eventType:0,
            value:{},
            startTime:-1,
            endTime:0,
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MStatistics','buryingPoint', [{eventId:option.eventId,eventType:option.eventType,value:option.value,startTime:option.startTime,endTime:option.endTime}]);
  };

  yzsBridge.android.graffiti = function(obj){
          var option = objExtend({
            url:"",
            rightBtn:"完成",
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MScreenShot','graffiti', [{url:option.url,rightBtn:option.rightBtn}]);
  };

  yzsBridge.android.watchShake = function(obj){
          var option = objExtend({
            callbackDelay:3000,
            vibrating:true,
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MShake','watchShake', [{callbackDelay:option.callbackDelay,vibrating:option.vibrating}]);
  };

  yzsBridge.android.clearShake = function(obj){
          var option = objExtend({
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MShake','clearShake', []);
  };

  yzsBridge.android.openDatabase = function(arg,success,error){
      if(yzsVersion>="3.5.2"){
            return window.sqlitePlugin.openDatabase(arg,success,error);
        }else{
           if(error){
              error("请升级到最新版本云助手")
           }
        }
    };

   yzsBridge.android.deleteDatabase = function(arg,success,error){
      if(yzsVersion>="3.5.2"){
            return window.sqlitePlugin.deleteDatabase(arg,success,error);
        }else{
           if(error){
              error("请升级到最新版本云助手")
           }
        }
    };

    yzsBridge.android.startRecord = function(obj){
          var option = objExtend({
            success:function(res){},
            error:function(res){}
          },obj);

         if(yzsVersion>="3.5.5"){
             cordova.exec(option.success,option.error, 'MAudio','startRecord', []);
         }else{
           option.error({"code":-1,message:"请升级到最新版本的云助手"});
        }
    };

    yzsBridge.android.stopRecord = function(obj){
          var option = objExtend({
            success:function(res){},
            error:function(res){}
          },obj);

         if(yzsVersion>="3.5.5"){
             cordova.exec(option.success,option.error, 'MAudio','stopRecord', []);
         }else{
           option.error({"code":-1,message:"请升级到最新版本的云助手"});
        }
    };

    yzsBridge.android.playVoice = function(obj){
          var option = objExtend({
            localId:"",
            success:function(res){},
            error:function(res){}
          },obj);

         if(yzsVersion>="3.5.5"){
             cordova.exec(option.success,option.error, 'MAudio','playVoice', [{localId:option.localId}]);
         }else{
           option.error({"code":-1,message:"请升级到最新版本的云助手"});
        }
    };

    yzsBridge.android.onVoicePlayEnd = function(obj){
          var option = objExtend({
            success:function(res){},
            error:function(res){}
          },obj);

         if(yzsVersion>="3.5.5"){
             cordova.exec(option.success,option.error, 'MAudio','onVoicePlayEnd', []);
         }else{
           option.error({"code":-1,message:"请升级到最新版本的云助手"});
        }
    };

    yzsBridge.android.pauseVoice = function(obj){
          var option = objExtend({
            localId:"",
            success:function(res){},
            error:function(res){}
          },obj);

         if(yzsVersion>="3.5.5"){
             cordova.exec(option.success,option.error, 'MAudio','pauseVoice', [{localId:option.localId}]);
         }else{
           option.error({"code":-1,message:"请升级到最新版本的云助手"});
        }
    };

    yzsBridge.android.stopVoice = function(obj){
          var option = objExtend({
            localId:"",
            success:function(res){},
            error:function(res){}
          },obj);

         if(yzsVersion>="3.5.5"){
             cordova.exec(option.success,option.error, 'MAudio','stopVoice', [{localId:option.localId}]);
         }else{
           option.error({"code":-1,message:"请升级到最新版本的云助手"});
        }
    };

    yzsBridge.android.uploadVoice = function(obj){
          var option = objExtend({
            localId:"",
            success:function(res){},
            error:function(res){}
          },obj);

         if(yzsVersion>="3.5.5"){
             cordova.exec(option.success,option.error, 'MAudio','uploadVoice', [{localId:option.localId}]);
         }else{
           option.error({"code":-1,message:"请升级到最新版本的云助手"});
        }
    };

    yzsBridge.android.translateVoice = function(obj){
          var option = objExtend({
            localId:"",
            success:function(res){},
            error:function(res){}
          },obj);

         if(yzsVersion>="3.5.5"){
             cordova.exec(option.success,option.error, 'MAudio','translateVoice', [{localId:option.localId}]);
         }else{
           option.error({"code":-1,message:"请升级到最新版本的云助手"});
        }
    };

    yzsBridge.android.topic = function(obj){
          var option = objExtend({
            businessId:"",
            topic:{},
            success:function(res){},
            error:function(res){}
          },obj);

         if(yzsVersion>="3.6.2"){
             cordova.exec(option.success,option.error, 'MIm','topic', [{businessId:option.businessId,topic:option.topic,appCode:option.appCode}]);
         }else{
           option.error({"code":-1,message:"请升级到最新版本的云助手"});
        }
    };
};
function uiWebView(){
    /**cordova.js**/
    (function(){var b="3.8.0";var c,a;(function(){var f={},g=[],e={},h=".";function d(k){var i=k.factory,j=function(l){var m=l;if(l.charAt(0)==="."){m=k.id.slice(0,k.id.lastIndexOf(h))+h+l.slice(2)}return c(m)};k.exports={};delete k.factory;i(j,k.exports,k);return k.exports}c=function(j){if(!f[j]){throw"module "+j+" not found"}else{if(j in e){var i=g.slice(e[j]).join("->")+"->"+j;throw"Cycle in require graph: "+i}}if(f[j].factory){try{e[j]=g.length;g.push(j);return d(f[j])}finally{delete e[j];g.pop()}}return f[j].exports};a=function(j,i){if(f[j]){throw"module "+j+" already defined"}f[j]={id:j,factory:i}};a.remove=function(i){delete f[i]};a.moduleMap=f})();if(typeof module==="object"&&typeof c==="function"){module.exports.require=c;module.exports.define=a}a("cordova",function(o,h,m){var d=o("cordova/channel");var n=o("cordova/platform");var i=document.addEventListener;var j=document.removeEventListener;var k=window.addEventListener;var l=window.removeEventListener;var g={},p={};document.addEventListener=function(s,t,q){var r=s.toLowerCase();if(typeof g[r]!="undefined"){g[r].subscribe(t)}else{i.call(document,s,t,q)}};window.addEventListener=function(s,t,q){var r=s.toLowerCase();if(typeof p[r]!="undefined"){p[r].subscribe(t)}else{k.call(window,s,t,q)}};document.removeEventListener=function(s,t,q){var r=s.toLowerCase();if(typeof g[r]!="undefined"){g[r].unsubscribe(t)}else{j.call(document,s,t,q)}};window.removeEventListener=function(s,t,q){var r=s.toLowerCase();if(typeof p[r]!="undefined"){p[r].unsubscribe(t)}else{l.call(window,s,t,q)}};function f(t,q){var r=document.createEvent("Events");r.initEvent(t,false,false);if(q){for(var s in q){if(q.hasOwnProperty(s)){r[s]=q[s]}}}return r}var e={define:a,require:o,version:b,platformVersion:b,platformId:n.id,addWindowEventHandler:function(q){return(p[q]=d.create(q))},addStickyDocumentEventHandler:function(q){return(g[q]=d.createSticky(q))},addDocumentEventHandler:function(q){return(g[q]=d.create(q))},removeWindowEventHandler:function(q){delete p[q]},removeDocumentEventHandler:function(q){delete g[q]},getOriginalHandlers:function(){return{document:{addEventListener:i,removeEventListener:j},window:{addEventListener:k,removeEventListener:l}}},fireDocumentEvent:function(t,r,q){var s=f(t,r);if(typeof g[t]!="undefined"){if(q){g[t].fire(s)}else{setTimeout(function(){if(t=="deviceready"){document.dispatchEvent(s)}g[t].fire(s)},0)}}else{document.dispatchEvent(s)}},fireWindowEvent:function(s,q){var r=f(s,q);if(typeof p[s]!="undefined"){setTimeout(function(){p[s].fire(r)},0)}else{window.dispatchEvent(r)}},callbackId:Math.floor(Math.random()*2000000000),callbacks:{},callbackStatus:{NO_RESULT:0,OK:1,CLASS_NOT_FOUND_EXCEPTION:2,ILLEGAL_ACCESS_EXCEPTION:3,INSTANTIATION_EXCEPTION:4,MALFORMED_URL_EXCEPTION:5,IO_EXCEPTION:6,INVALID_ACTION:7,JSON_EXCEPTION:8,ERROR:9},callbackSuccess:function(r,q){e.callbackFromNative(r,true,q.status,[q.message],q.keepCallback)},callbackError:function(r,q){e.callbackFromNative(r,false,q.status,[q.message],q.keepCallback)},callbackFromNative:function(s,u,x,q,v){try{var r=e.callbacks[s];if(r){if(u&&x==e.callbackStatus.OK){r.success&&r.success.apply(null,q)}else{if(!u){r.fail&&r.fail.apply(null,q)}}if(!v){delete e.callbacks[s]}}}catch(t){var w="Error in "+(u?"Success":"Error")+" callbackId: "+s+" : "+t;console&&console.log&&console.log(w);e.fireWindowEvent("cordovacallbackerror",{message:w});throw t}},addConstructor:function(q){d.onCordovaReady.subscribe(function(){try{q()}catch(r){console.log("Failed to run constructor: "+r)}})}};m.exports=e});a("cordova/argscheck",function(k,f,i){var e=k("cordova/exec");var m=k("cordova/utils");var j=i.exports;var l={A:"Array",D:"Date",N:"Number",S:"String",F:"Function",O:"Object"};function g(o,n){return(/.*?\((.*?)\)/).exec(o)[1].split(", ")[n]}function d(v,s,o,u){if(!j.enableChecks){return}var r=null;var w;for(var t=0;t<v.length;++t){var p=v.charAt(t),q=p.toUpperCase(),n=o[t];if(p=="*"){continue}w=m.typeName(n);if((n===null||n===undefined)&&p==q){continue}if(w!=l[q]){r="Expected "+l[q];break}}if(r){r+=", but got "+w+".";r='Wrong type for parameter "'+g(u||o.callee,t)+'" of '+s+": "+r;if(typeof jasmine=="undefined"){console.error(r)}throw TypeError(r)}}function h(o,n){return o===undefined?n:o}j.checkArgs=d;j.getValue=h;j.enableChecks=true});a("cordova/base64",function(j,h,i){var g=h;g.fromArrayBuffer=function(m){var l=new Uint8Array(m);return k(l)};g.toArrayBuffer=function(q){var n=typeof atob!="undefined"?atob(q):new Buffer(q,"base64").toString("binary");var m=new ArrayBuffer(n.length);var l=new Uint8Array(m);for(var o=0,p=n.length;o<p;o++){l[o]=n.charCodeAt(o)}return m};var f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var d;var e=function(){d=[];for(var l=0;l<64;l++){for(var m=0;m<64;m++){d[l*64+m]=f[l]+f[m]}}e=function(){return d};return d};function k(o){var m=o.byteLength;var n="";var p;var q=e();for(var l=0;l<m-2;l+=3){p=(o[l]<<16)+(o[l+1]<<8)+o[l+2];n+=q[p>>12];n+=q[p&4095]}if(m-l==2){p=(o[l]<<16)+(o[l+1]<<8);n+=q[p>>12];n+=f[(p&4095)>>6];n+="="}else{if(m-l==1){p=(o[l]<<16);n+=q[p>>12];n+="=="}}return n}});a("cordova/builder",function(k,g,i){var l=k("cordova/utils");function f(o,n,m){for(var p in o){if(o.hasOwnProperty(p)){n.apply(m,[o[p],p])}}}function e(p,n,q){g.replaceHookForTesting(p,n);var o=false;try{p[n]=q}catch(m){o=true}if(o||p[n]!==q){l.defineGetter(p,n,function(){return q})}}function d(o,m,p,n){if(n){l.defineGetter(o,m,function(){console.log(n);delete o[m];e(o,m,p);return p})}else{e(o,m,p)}}function h(p,o,m,n){f(o,function(s,r){try{var t=s.path?k(s.path):{};if(m){if(typeof p[r]==="undefined"){d(p,r,t,s.deprecated)}else{if(typeof s.path!=="undefined"){if(n){j(p[r],t)}else{d(p,r,t,s.deprecated)}}}t=p[r]}else{if(typeof p[r]=="undefined"){d(p,r,t,s.deprecated)}else{t=p[r]}}if(s.children){h(t,s.children,m,n)}}catch(q){l.alert("Exception building Cordova JS globals: "+q+' for key "'+r+'"')}})}function j(o,n){for(var m in n){if(n.hasOwnProperty(m)){if(o.prototype&&o.prototype.constructor===o){e(o.prototype,m,n[m])}else{if(typeof n[m]==="object"&&typeof o[m]==="object"){j(o[m],n[m])}else{e(o,m,n[m])}}}}}g.buildIntoButDoNotClobber=function(m,n){h(n,m,false,false)};g.buildIntoAndClobber=function(m,n){h(n,m,true,false)};g.buildIntoAndMerge=function(m,n){h(n,m,true,true)};g.recursiveMerge=j;g.assignOrWrapInDeprecateGetter=d;g.replaceHookForTesting=function(){}});a("cordova/channel",function(j,f,h){var k=j("cordova/utils"),i=1;var e=function(m,l){this.type=m;this.handlers={};this.state=l?1:0;this.fireArgs=null;this.numHandlers=0;this.onHasSubscribersChange=null},d={join:function(n,l){var q=l.length,o=q,m=function(){if(!(--o)){n()}};for(var p=0;p<q;p++){if(l[p].state===0){throw Error("Can only use join with sticky channels.")}l[p].subscribe(m)}if(!q){n()}},create:function(l){return d[l]=new e(l,false)},createSticky:function(l){return d[l]=new e(l,true)},deviceReadyChannelsArray:[],deviceReadyChannelsMap:{},waitForInitialization:function(m){if(m){var l=d[m]||this.createSticky(m);this.deviceReadyChannelsMap[m]=l;this.deviceReadyChannelsArray.push(l)}},initializationComplete:function(m){var l=this.deviceReadyChannelsMap[m];if(l){l.fire()}}};function g(l){if(typeof l!="function"){throw"Function required as first argument!"}}e.prototype.subscribe=function(m,l){g(m);if(this.state==2){m.apply(l||this,this.fireArgs);return}var n=m,o=m.observer_guid;if(typeof l=="object"){n=k.close(l,m)}if(!o){o=""+i++}n.observer_guid=o;m.observer_guid=o;if(!this.handlers[o]){this.handlers[o]=n;this.numHandlers++;if(this.numHandlers==1){this.onHasSubscribersChange&&this.onHasSubscribersChange()}}};e.prototype.unsubscribe=function(l){g(l);var m=l.observer_guid,n=this.handlers[m];if(n){delete this.handlers[m];this.numHandlers--;if(this.numHandlers===0){this.onHasSubscribersChange&&this.onHasSubscribersChange()}}};e.prototype.fire=function(l){var m=false,n=Array.prototype.slice.call(arguments);if(this.state==1){this.state=2;this.fireArgs=n}if(this.numHandlers){var q=[];for(var p in this.handlers){q.push(this.handlers[p])}for(var o=0;o<q.length;++o){q[o].apply(this,n)}if(this.state==2&&this.numHandlers){this.numHandlers=0;this.handlers={};this.onHasSubscribersChange&&this.onHasSubscribersChange()}}};d.createSticky("onDOMContentLoaded");d.createSticky("onNativeReady");d.createSticky("onCordovaReady");d.createSticky("onPluginsReady");d.createSticky("onDeviceReady");d.create("onResume");d.create("onPause");d.waitForInitialization("onCordovaReady");d.waitForInitialization("onDOMContentLoaded");h.exports=d});a("cordova/exec",function(z,m,u){var i=z("cordova"),f=z("cordova/channel"),B=z("cordova/utils"),d=z("cordova/base64"),r={IFRAME_NAV:0,XHR_NO_PAYLOAD:1,XHR_WITH_PAYLOAD:2,XHR_OPTIONAL_PAYLOAD:3,IFRAME_HASH_NO_PAYLOAD:4,IFRAME_HASH_WITH_PAYLOAD:5,WK_WEBVIEW_BINDING:6},e,k,j,o=1,l,y=0,C=null,g=[],q=0,n=0;function A(){if(e===r.XHR_WITH_PAYLOAD){return true}if(e===r.XHR_OPTIONAL_PAYLOAD){var E=0;for(var D=0;D<g.length;++D){E+=g[D].length}return E<4500}return false}function s(D){if(!D||B.typeName(D)!="Array"){return D}var E=[];D.forEach(function(F,G){if(B.typeName(F)=="ArrayBuffer"){E.push({CDVType:"ArrayBuffer",data:d.fromArrayBuffer(F)})}else{E.push(F)}});return E}function t(E){if(E.CDVType=="ArrayBuffer"){var F=function(I){var H=new Uint8Array(I.length);for(var G=0;G<I.length;G++){H[G]=I.charCodeAt(G)}return H.buffer};var D=function(G){return F(atob(G))};E=D(E.data)}return E}function h(E){var D=[];if(!E||!E.hasOwnProperty("CDVType")){D.push(E)}else{if(E.CDVType=="MultiPart"){E.messages.forEach(function(F){D.push(t(F))})}else{D.push(t(E))}}return D}function p(){if(e===undefined){e=r.IFRAME_NAV}if(window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.cordova&&window.webkit.messageHandlers.cordova.postMessage){e=r.WK_WEBVIEW_BINDING}var L,I,J,D,E,K;var F=null;if(typeof arguments[0]!=="string"){L=arguments[0];I=arguments[1];J=arguments[2];D=arguments[3];E=arguments[4];F="INVALID"}else{try{K=arguments[0].split(".");D=K.pop();J=K.join(".");E=Array.prototype.splice.call(arguments,1);console.log('The old format of this exec call has been removed (deprecated since 2.1). Change to: cordova.exec(null, null, "'+J+'", "'+D+'",'+JSON.stringify(E)+");");return}catch(H){}}E=E||[];if(L||I){F=J+i.callbackId++;i.callbacks[F]={success:L,fail:I}}E=s(E);var G=[F,J,D,E];g.push(JSON.stringify(G));if(e===r.WK_WEBVIEW_BINDING){window.webkit.messageHandlers.cordova.postMessage(G)}else{if(!q&&g.length==1){v()}}}function v(){switch(e){case r.XHR_NO_PAYLOAD:case r.XHR_WITH_PAYLOAD:case r.XHR_OPTIONAL_PAYLOAD:x();break;default:w()}}function x(){if(l&&l.readyState!=4){l=null}l=l||new XMLHttpRequest();l.open("HEAD","/!gap_exec?"+(+new Date()),true);if(!C){C=/.*\((.*)\)$/.exec(navigator.userAgent)[1]}l.setRequestHeader("vc",C);l.setRequestHeader("rc",++y);if(A()){l.setRequestHeader("cmds",p.nativeFetchMessages())}l.send(null)}function w(){if(!document.body){setTimeout(w);return}if(e===r.IFRAME_HASH_NO_PAYLOAD||e===r.IFRAME_HASH_WITH_PAYLOAD){if(!j){j=document.createElement("iframe");j.style.display="none";document.body.appendChild(j);j.contentWindow.history.replaceState(null,null,"file:///#")}o=o^3;var D="%0"+o;if(e===r.IFRAME_HASH_WITH_PAYLOAD){D+=p.nativeFetchMessages()}j.contentWindow.location.hash=D}else{if(k&&k.contentWindow){k.contentWindow.location="gap://ready"}else{k=document.createElement("iframe");k.style.display="none";k.src="gap://ready";document.body.appendChild(k)}n=setTimeout(function(){if(g.length){v()}},50)}}p.jsToNativeModes=r;p.setJsToNativeBridgeMode=function(D){if(k){if(k.parentNode){k.parentNode.removeChild(k)}k=null}e=D};p.nativeFetchMessages=function(){if(n){clearTimeout(n);n=0}if(!g.length){return""}var D="["+g.join(",")+"]";g.length=0;return D};p.nativeCallback=function(D,G,F,E){return p.nativeEvalAndFetch(function(){var I=G===0||G===1;var H=h(F);i.callbackFromNative(D,I,G,H,E)})};p.nativeEvalAndFetch=function(D){q++;try{D();return p.nativeFetchMessages()}finally{q--}};u.exports=p});a("cordova/exec/proxy",function(g,e,f){var d={};f.exports={add:function(h,i){console.log("adding proxy for "+h);d[h]=i;return i},remove:function(h){var i=d[h];delete d[h];d[h]=null;return i},get:function(i,h){return(d[i]?d[i][h]:null)}}});a("cordova/init",function(n,f,h){var d=n("cordova/channel");var e=n("cordova");var i=n("cordova/modulemapper");var j=n("cordova/platform");var l=n("cordova/pluginloader");var o=n("cordova/utils");var k=[d.onNativeReady,d.onPluginsReady];function g(p){for(var q=0;q<p.length;++q){if(p[q].state!=2){console.log("Channel not fired: "+p[q].type)}}}window.setTimeout(function(){if(d.onDeviceReady.state!=2){console.log("deviceready has not fired after 5 seconds.");g(k);g(d.deviceReadyChannelsArray)}},5000);function m(s){var p=function(){};p.prototype=s;var r=new p();if(p.bind){for(var q in s){if(typeof s[q]=="function"){r[q]=s[q].bind(s)}else{(function(t){o.defineGetterSetter(r,q,function(){return s[t]})})(q)}}}return r}if(window.navigator){window.navigator=m(window.navigator)}if(!window.console){window.console={log:function(){}}}if(!window.console.warn){window.console.warn=function(p){this.log("warn: "+p)}}d.onPause=e.addDocumentEventHandler("pause");d.onResume=e.addDocumentEventHandler("resume");d.onDeviceReady=e.addStickyDocumentEventHandler("deviceready");if(document.readyState=="complete"||document.readyState=="interactive"){d.onDOMContentLoaded.fire()}else{document.addEventListener("DOMContentLoaded",function(){d.onDOMContentLoaded.fire()},false)}if(window._nativeReady){d.onNativeReady.fire()}i.clobbers("cordova","cordova");i.clobbers("cordova/exec","cordova.exec");i.clobbers("cordova/exec","Cordova.exec");j.bootstrap&&j.bootstrap();setTimeout(function(){l.load(function(){d.onPluginsReady.fire()})},0);d.join(function(){i.mapModules(window);j.initialize&&j.initialize();d.onCordovaReady.fire();d.join(function(){n("cordova").fireDocumentEvent("deviceready")},d.deviceReadyChannelsArray)},k)});a("cordova/init_b",function(l,f,h){var d=l("cordova/channel");var e=l("cordova");var i=l("cordova/platform");var m=l("cordova/utils");var j=[d.onDOMContentLoaded,d.onNativeReady];e.exec=l("cordova/exec");function g(n){for(var o=0;o<n.length;++o){if(n[o].state!=2){console.log("Channel not fired: "+n[o].type)}}}window.setTimeout(function(){if(d.onDeviceReady.state!=2){console.log("deviceready has not fired after 5 seconds.");g(j);g(d.deviceReadyChannelsArray)}},5000);function k(q){var n=function(){};n.prototype=q;var p=new n();if(n.bind){for(var o in q){if(typeof q[o]=="function"){p[o]=q[o].bind(q)}else{(function(r){m.defineGetterSetter(p,o,function(){return q[r]})})(o)}}}return p}if(window.navigator){window.navigator=k(window.navigator)}if(!window.console){window.console={log:function(){}}}if(!window.console.warn){window.console.warn=function(n){this.log("warn: "+n)}}d.onPause=e.addDocumentEventHandler("pause");d.onResume=e.addDocumentEventHandler("resume");d.onDeviceReady=e.addStickyDocumentEventHandler("deviceready");if(document.readyState=="complete"||document.readyState=="interactive"){d.onDOMContentLoaded.fire()}else{document.addEventListener("DOMContentLoaded",function(){d.onDOMContentLoaded.fire()},false)}if(window._nativeReady){d.onNativeReady.fire()}i.bootstrap&&i.bootstrap();d.join(function(){i.initialize&&i.initialize();d.onCordovaReady.fire();d.join(function(){l("cordova").fireDocumentEvent("deviceready")},d.deviceReadyChannelsArray)},j)});a("cordova/modulemapper",function(k,g,h){var e=k("cordova/builder"),i=a.moduleMap,l,f;g.reset=function(){l=[];f={}};function d(o,m,p,n){if(!(m in i)){throw new Error("Module "+m+" does not exist.")}l.push(o,m,p);if(n){f[p]=n}}g.clobbers=function(m,o,n){d("c",m,o,n)};g.merges=function(m,o,n){d("m",m,o,n)};g.defaults=function(m,o,n){d("d",m,o,n)};g.runs=function(m){d("r",m,null)};function j(r,m){if(!r){return m}var q=r.split(".");var n=m;for(var o=0,p;p=q[o];++o){n=n[p]=n[p]||{}}return n}g.mapModules=function(m){var v={};m.CDV_origSymbols=v;for(var o=0,r=l.length;o<r;o+=3){var x=l[o];var t=l[o+1];var s=k(t);if(x=="r"){continue}var y=l[o+2];var p=y.lastIndexOf(".");var u=y.substr(0,p);var q=y.substr(p+1);var n=y in f?"Access made to deprecated symbol: "+y+". "+n:null;var w=j(u,m);var z=w[q];if(x=="m"&&z){e.recursiveMerge(z,s)}else{if((x=="d"&&!z)||(x!="d")){if(!(y in v)){v[y]=z}e.assignOrWrapInDeprecateGetter(w,q,s,n)}}}};g.getOriginalSymbol=function(m,r){var p=m.CDV_origSymbols;if(p&&(r in p)){return p[r]}var q=r.split(".");var o=m;for(var n=0;n<q.length;++n){o=o&&o[q[n]]}return o};g.reset()});a("cordova/platform",function(f,d,e){e.exports={id:"ios",bootstrap:function(){f("cordova/channel").onNativeReady.fire()}}});a("cordova/pluginloader",function(k,d,h){var i=k("cordova/modulemapper");var l=k("cordova/urlutil");d.injectScript=function(p,n,m){var o=document.createElement("script");o.onload=n;o.onerror=m;o.src=p;document.head.appendChild(o)};function g(m,p,o,n){n=n||o;if(m in a.moduleMap){o()}else{d.injectScript(p,function(){if(m in a.moduleMap){o()}else{n()}},n)}}function j(r,m){for(var n=0,q;q=r[n];n++){if(q.clobbers&&q.clobbers.length){for(var o=0;o<q.clobbers.length;o++){i.clobbers(q.id,q.clobbers[o])}}if(q.merges&&q.merges.length){for(var p=0;p<q.merges.length;p++){i.merges(q.id,q.merges[p])}}if(q.runs){i.runs(q.id)}}m()}function f(p,o,m){var q=o.length;if(!q){m();return}function r(){if(!--q){j(o,m)}}for(var n=0;n<o.length;n++){g(o[n].id,p+o[n].file,r)}}function e(){var o=null;var p=document.getElementsByTagName("script");var r="/cordova.js";for(var m=p.length-1;m>-1;m--){var q=p[m].src.replace(/\?.*$/,"");if(q.indexOf(r)==(q.length-r.length)){o=q.substring(0,q.length-r.length)+"/";break}}return o}d.load=function(m){var n=e();if(n===null){n=""}g("cordova/plugin_list",n+"cordova_plugins.js",function(){var o=k("cordova/plugin_list");f(n,o,m)},m)}});a("cordova/urlutil",function(g,d,f){d.makeAbsolute=function e(i){var h=document.createElement("a");h.href=i;return h.href}});a("cordova/utils",function(f,d,e){var g=d;g.defineGetterSetter=function(l,k,j,m){if(Object.defineProperty){var i={get:j,configurable:true};if(m){i.set=m}Object.defineProperty(l,k,i)}else{l.__defineGetter__(k,j);if(m){l.__defineSetter__(k,m)}}};g.defineGetter=g.defineGetterSetter;g.arrayIndexOf=function(j,l){if(j.indexOf){return j.indexOf(l)}var m=j.length;for(var k=0;k<m;++k){if(j[k]==l){return k}}return -1};g.arrayRemove=function(i,k){var j=g.arrayIndexOf(i,k);if(j!=-1){i.splice(j,1)}return j!=-1};g.typeName=function(i){return Object.prototype.toString.call(i).slice(8,-1)};g.isArray=function(i){return g.typeName(i)=="Array"};g.isDate=function(i){return g.typeName(i)=="Date"};g.clone=function(k){if(!k||typeof k=="function"||g.isDate(k)||typeof k!="object"){return k}var l,j;if(g.isArray(k)){l=[];for(j=0;j<k.length;++j){l.push(g.clone(k[j]))}return l}l={};for(j in k){if(!(j in l)||l[j]!=k[j]){l[j]=g.clone(k[j])}}return l};g.close=function(i,j,k){if(typeof k=="undefined"){return function(){return j.apply(i,arguments)}}else{return function(){return j.apply(i,k)}}};g.createUUID=function(){return h(4)+"-"+h(2)+"-"+h(2)+"-"+h(2)+"-"+h(6)};g.extend=(function(){var i=function(){};return function(j,k){i.prototype=k.prototype;j.prototype=new i();j.__super__=k.prototype;j.prototype.constructor=j}}());g.alert=function(i){if(window.alert){window.alert(i)}else{if(console&&console.log){console.log(i)}}};function h(k){var m="";for(var j=0;j<k;j++){var l=parseInt((Math.random()*256),10).toString(16);if(l.length==1){l="0"+l}m+=l}return m}});window.cordova=c("cordova");c("cordova/init")})();
    /**cordova_plugins.js**/
    cordova.define("cordova/plugin_list",function(c,a,b){b.exports=[{file:"plugins/org.apache.cordova.network-information/www/network.js",id:"org.apache.cordova.network-information.network",clobbers:["navigator.connection","navigator.network.connection"]},{file:"plugins/org.apache.cordova.network-information/www/Connection.js",id:"org.apache.cordova.network-information.Connection",clobbers:["Connection"]},{"file":"plugins/cordova-sqlite-storage/www/SQLitePlugin.js","id":"cordova-sqlite-storage.SQLitePlugin","pluginId":"cordova-sqlite-storage","clobbers":["SQLitePlugin"]}];b.exports.metadata={"cordova-plugin-whitelist":"1.0.0","org.apache.cordova.network-information":"0.2.15","com.vitorventurin.gps":"0.1.1"}});
    /**plugins/org.apache.cordova.network-information/www/network.js**/
    cordova.define("org.apache.cordova.network-information.network",function(a,b,c){function h(){this.type="unknown"}var i,j,k,d=a("cordova/exec"),e=a("cordova"),f=a("cordova/channel"),g=a("cordova/utils");"undefined"!=typeof navigator&&g.defineGetter(navigator,"onLine",function(){return"none"!=this.connection.type}),h.prototype.getInfo=function(a,b){d(a,b,"NetworkStatus","getConnectionInfo",[])},i=new h,j=null,k=500,f.createSticky("onCordovaConnectionReady"),f.waitForInitialization("onCordovaConnectionReady"),f.onCordovaReady.subscribe(function(){i.getInfo(function(a){i.type=a,"none"===a?j=setTimeout(function(){e.fireDocumentEvent("offline"),j=null},k):(null!==j&&(clearTimeout(j),j=null),e.fireDocumentEvent("online")),2!==f.onCordovaConnectionReady.state&&f.onCordovaConnectionReady.fire()},function(a){2!==f.onCordovaConnectionReady.state&&f.onCordovaConnectionReady.fire(),console.log("Error initializing Network Connection: "+a)})}),c.exports=i});
    /**plugins/org.apache.cordova.network-information/www/Connection.js**/
    cordova.define("org.apache.cordova.network-information.Connection",function(a,b,c){c.exports={UNKNOWN:"unknown",ETHERNET:"ethernet",WIFI:"wifi",CELL_2G:"2g",CELL_3G:"3g",CELL_4G:"4g",CELL:"cellular",NONE:"none"}});
     /**cordova-sqlite-storage.SQLitePlugin**/
    cordova.define("cordova-sqlite-storage.SQLitePlugin",function(require,exports,module){(function(){var DB_STATE_INIT,DB_STATE_OPEN,READ_ONLY_REGEX,SQLiteFactory,SQLitePlugin,SQLitePluginTransaction,SelfTest,argsArray,dblocations,iosLocationMap,newSQLError,nextTick,root,txLocks;root=this;READ_ONLY_REGEX=/^(\s|;)*(?:alter|create|delete|drop|insert|reindex|replace|update)/i;DB_STATE_INIT="INIT";DB_STATE_OPEN="OPEN";txLocks={};newSQLError=function(error,code){var sqlError;sqlError=error;if(!code){code=0}if(!sqlError){sqlError=new Error("a plugin had an error but provided no response");sqlError.code=code}if(typeof sqlError==="string"){sqlError=new Error(error);sqlError.code=code}if(!sqlError.code&&sqlError.message){sqlError.code=code}if(!sqlError.code&&!sqlError.message){sqlError=new Error("an unknown error was returned: "+JSON.stringify(sqlError));sqlError.code=code}return sqlError};nextTick=window.setImmediate||function(fun){window.setTimeout(fun,0)};argsArray=function(fun){return function(){var args,i,len;len=arguments.length;if(len){args=[];i=-1;while(++i<len){args[i]=arguments[i]}return fun.call(this,args)}else{return fun.call(this,[])}}};SQLitePlugin=function(openargs,openSuccess,openError){var dbname;if(!(openargs&&openargs["name"])){throw newSQLError("Cannot create a SQLitePlugin db instance without a db name")}dbname=openargs.name;if(typeof dbname!=="string"){throw newSQLError("sqlite plugin database name must be a string")}this.openargs=openargs;this.dbname=dbname;this.openSuccess=openSuccess;this.openError=openError;this.openSuccess||(this.openSuccess=function(){console.log("DB opened: "+dbname)});this.openError||(this.openError=function(e){console.log(e.message)});this.open(this.openSuccess,this.openError)};SQLitePlugin.prototype.databaseFeatures={isSQLitePluginDatabase:true};SQLitePlugin.prototype.openDBs={};SQLitePlugin.prototype.addTransaction=function(t){if(!txLocks[this.dbname]){txLocks[this.dbname]={queue:[],inProgress:false}}txLocks[this.dbname].queue.push(t);if(this.dbname in this.openDBs&&this.openDBs[this.dbname]!==DB_STATE_INIT){this.startNextTransaction()}else{if(this.dbname in this.openDBs){console.log("new transaction is waiting for open operation")}else{console.log("database is closed, new transaction is [stuck] waiting until db is opened again!")}}};SQLitePlugin.prototype.transaction=function(fn,error,success){if(!this.openDBs[this.dbname]){error(newSQLError("database not open"));return}this.addTransaction(new SQLitePluginTransaction(this,fn,error,success,true,false))};SQLitePlugin.prototype.readTransaction=function(fn,error,success){if(!this.openDBs[this.dbname]){error(newSQLError("database not open"));return}this.addTransaction(new SQLitePluginTransaction(this,fn,error,success,false,true))};SQLitePlugin.prototype.startNextTransaction=function(){var self;self=this;nextTick((function(_this){return function(){var txLock;if(!(_this.dbname in _this.openDBs)||_this.openDBs[_this.dbname]!==DB_STATE_OPEN){console.log("cannot start next transaction: database not open");return}txLock=txLocks[self.dbname];if(!txLock){console.log("cannot start next transaction: database connection is lost");return}else{if(txLock.queue.length>0&&!txLock.inProgress){txLock.inProgress=true;txLock.queue.shift().start()}}}})(this))};SQLitePlugin.prototype.abortAllPendingTransactions=function(){var j,len1,ref,tx,txLock;txLock=txLocks[this.dbname];if(!!txLock&&txLock.queue.length>0){ref=txLock.queue;for(j=0,len1=ref.length;j<len1;j++){tx=ref[j];tx.abortFromQ(newSQLError("Invalid database handle"))}txLock.queue=[];txLock.inProgress=false}};SQLitePlugin.prototype.open=function(success,error){var myfn,openerrorcb,opensuccesscb;if(this.dbname in this.openDBs){console.log("database already open: "+this.dbname);nextTick((function(_this){return function(){success(_this)}})(this))}else{console.log("OPEN database: "+this.dbname);opensuccesscb=(function(_this){return function(){var txLock;console.log("OPEN database: "+_this.dbname+" - OK");if(!_this.openDBs[_this.dbname]){console.log("database was closed during open operation")}if(_this.dbname in _this.openDBs){_this.openDBs[_this.dbname]=DB_STATE_OPEN}if(!!success){success(_this)}txLock=txLocks[_this.dbname];if(!!txLock&&txLock.queue.length>0&&!txLock.inProgress){_this.startNextTransaction()}}})(this);openerrorcb=(function(_this){return function(){console.log("OPEN database: "+_this.dbname+" FAILED, aborting any pending transactions");if(!!error){error(newSQLError("Could not open database"))}delete _this.openDBs[_this.dbname];_this.abortAllPendingTransactions()}})(this);this.openDBs[this.dbname]=DB_STATE_INIT;if(!txLocks[this.dbname]){myfn=function(tx){tx.addStatement("ROLLBACK")};this.addTransaction(new SQLitePluginTransaction(this,myfn,null,null,false,false))}cordova.exec(opensuccesscb,openerrorcb,"SQLitePlugin","open",[this.openargs])}};SQLitePlugin.prototype.close=function(success,error){if(this.dbname in this.openDBs){if(txLocks[this.dbname]&&txLocks[this.dbname].inProgress){console.log("cannot close: transaction is in progress");error(newSQLError("database cannot be closed while a transaction is in progress"));return}console.log("CLOSE database: "+this.dbname);delete this.openDBs[this.dbname];if(txLocks[this.dbname]){console.log("closing db with transaction queue length: "+txLocks[this.dbname].queue.length)}else{console.log("closing db with no transaction lock state")}cordova.exec(success,error,"SQLitePlugin","close",[{path:this.dbname}])}else{console.log("cannot close: database is not open");if(error){nextTick(function(){return error()})}}};SQLitePlugin.prototype.executeSql=function(statement,params,success,error){var myerror,myfn,mysuccess;mysuccess=function(t,r){if(!!success){return success(r)}};myerror=function(t,e){if(!!error){return error(e)}};myfn=function(tx){tx.addStatement(statement,params,mysuccess,myerror)};this.addTransaction(new SQLitePluginTransaction(this,myfn,null,null,false,false))};SQLitePlugin.prototype.sqlBatch=function(sqlStatements,success,error){var batchList,j,len1,myfn,st;if(!sqlStatements||sqlStatements.constructor!==Array){throw newSQLError("sqlBatch expects an array")}batchList=[];for(j=0,len1=sqlStatements.length;j<len1;j++){st=sqlStatements[j];if(st.constructor===Array){if(st.length===0){throw newSQLError("sqlBatch array element of zero (0) length")}batchList.push({sql:st[0],params:st.length===0?[]:st[1]})}else{batchList.push({sql:st,params:[]})}}myfn=function(tx){var elem,k,len2,results;results=[];for(k=0,len2=batchList.length;k<len2;k++){elem=batchList[k];results.push(tx.addStatement(elem.sql,elem.params,null,null))}return results};this.addTransaction(new SQLitePluginTransaction(this,myfn,error,success,true,false))};SQLitePluginTransaction=function(db,fn,error,success,txlock,readOnly){if(typeof fn!=="function"){throw newSQLError("transaction expected a function")}this.db=db;this.fn=fn;this.error=error;this.success=success;this.txlock=txlock;this.readOnly=readOnly;this.executes=[];if(txlock){this.addStatement("BEGIN",[],null,function(tx,err){throw newSQLError("unable to begin transaction: "+err.message,err.code)})}else{this.addStatement("SELECT 1",[],null,null)}};SQLitePluginTransaction.prototype.start=function(){var err;try{this.fn(this);this.run()}catch(error1){err=error1;txLocks[this.db.dbname].inProgress=false;this.db.startNextTransaction();if(this.error){this.error(newSQLError(err))}}};SQLitePluginTransaction.prototype.executeSql=function(sql,values,success,error){if(this.finalized){throw {message:"InvalidStateError: DOM Exception 11: This transaction is already finalized. Transactions are committed after its success or failure handlers are called. If you are using a Promise to handle callbacks, be aware that implementations following the A+ standard adhere to run-to-completion semantics and so Promise resolution occurs on a subsequent tick and therefore after the transaction commits.",code:11};return}if(this.readOnly&&READ_ONLY_REGEX.test(sql)){this.handleStatementFailure(error,{message:"invalid sql for a read-only transaction"});return}this.addStatement(sql,values,success,error)};SQLitePluginTransaction.prototype.addStatement=function(sql,values,success,error){var j,len1,params,sqlStatement,t,v;sqlStatement=typeof sql==="string"?sql:sql.toString();params=[];if(!!values&&values.constructor===Array){for(j=0,len1=values.length;j<len1;j++){v=values[j];t=typeof v;params.push((v===null||v===void 0?null:t==="number"||t==="string"?v:v.toString()))}}this.executes.push({success:success,error:error,sql:sqlStatement,params:params})};SQLitePluginTransaction.prototype.handleStatementSuccess=function(handler,response){var payload,rows;if(!handler){return}rows=response.rows||[];payload={rows:{item:function(i){return rows[i]},length:rows.length},rowsAffected:response.rowsAffected||0,insertId:response.insertId||void 0};handler(this,payload)};SQLitePluginTransaction.prototype.handleStatementFailure=function(handler,response){if(!handler){throw newSQLError("a statement with no error handler failed: "+response.message,response.code)}if(handler(this,response)!==false){throw newSQLError("a statement error callback did not return false: "+response.message,response.code)}};SQLitePluginTransaction.prototype.run=function(){var batchExecutes,handlerFor,i,mycb,mycbmap,request,tropts,tx,txFailure,waiting;txFailure=null;tropts=[];batchExecutes=this.executes;waiting=batchExecutes.length;this.executes=[];tx=this;handlerFor=function(index,didSucceed){return function(response){var err;if(!txFailure){try{if(didSucceed){tx.handleStatementSuccess(batchExecutes[index].success,response)}else{tx.handleStatementFailure(batchExecutes[index].error,newSQLError(response))}}catch(error1){err=error1;txFailure=newSQLError(err)}}if(--waiting===0){if(txFailure){tx.executes=[];tx.abort(txFailure)}else{if(tx.executes.length>0){tx.run()}else{tx.finish()}}}}};mycbmap={};i=0;while(i<batchExecutes.length){request=batchExecutes[i];mycbmap[i]={success:handlerFor(i,true),error:handlerFor(i,false)};tropts.push({qid:null,sql:request.sql,params:request.params});i++}mycb=function(result){var j,q,r,ref,res,resultIndex,type;for(resultIndex=j=0,ref=result.length-1;0<=ref?j<=ref:j>=ref;resultIndex=0<=ref?++j:--j){r=result[resultIndex];type=r.type;res=r.result;q=mycbmap[resultIndex];if(q){if(q[type]){q[type](res)}}}};cordova.exec(mycb,null,"SQLitePlugin","backgroundExecuteSqlBatch",[{dbargs:{dbname:this.db.dbname},executes:tropts}])};SQLitePluginTransaction.prototype.abort=function(txFailure){var failed,succeeded,tx;if(this.finalized){return}tx=this;succeeded=function(tx){txLocks[tx.db.dbname].inProgress=false;tx.db.startNextTransaction();if(tx.error&&typeof tx.error==="function"){tx.error(txFailure)}};failed=function(tx,err){txLocks[tx.db.dbname].inProgress=false;tx.db.startNextTransaction();if(tx.error&&typeof tx.error==="function"){tx.error(newSQLError("error while trying to roll back: "+err.message,err.code))}};this.finalized=true;if(this.txlock){this.addStatement("ROLLBACK",[],succeeded,failed);this.run()}else{succeeded(tx)}};SQLitePluginTransaction.prototype.finish=function(){var failed,succeeded,tx;if(this.finalized){return}tx=this;succeeded=function(tx){txLocks[tx.db.dbname].inProgress=false;tx.db.startNextTransaction();if(tx.success&&typeof tx.success==="function"){tx.success()}};failed=function(tx,err){txLocks[tx.db.dbname].inProgress=false;tx.db.startNextTransaction();if(tx.error&&typeof tx.error==="function"){tx.error(newSQLError("error while trying to commit: "+err.message,err.code))}};this.finalized=true;if(this.txlock){this.addStatement("COMMIT",[],succeeded,failed);this.run()}else{succeeded(tx)}};SQLitePluginTransaction.prototype.abortFromQ=function(sqlerror){if(this.error){this.error(sqlerror)}};dblocations=["docs","libs","nosync"];iosLocationMap={"default":"nosync","Documents":"docs","Library":"libs"};SQLiteFactory={openDatabase:argsArray(function(args){var dblocation,errorcb,okcb,openargs;if(args.length<1||!args[0]){throw newSQLError("Sorry missing mandatory open arguments object in openDatabase call")}if(args[0].constructor===String){throw newSQLError("Sorry first openDatabase argument must be an object")}openargs=args[0];if(!openargs.name){throw newSQLError("Database name value is missing in openDatabase call")}if(!openargs.iosDatabaseLocation&&!openargs.location&&openargs.location!==0){throw newSQLError("Database location or iosDatabaseLocation setting is now mandatory in openDatabase call.")}if(!!openargs.location&&!!openargs.iosDatabaseLocation){throw newSQLError("AMBIGUOUS: both location and iosDatabaseLocation settings are present in openDatabase call. Please use either setting, not both.")}dblocation=!!openargs.location&&openargs.location==="default"?iosLocationMap["default"]:!!openargs.iosDatabaseLocation?iosLocationMap[openargs.iosDatabaseLocation]:dblocations[openargs.location];if(!dblocation){throw newSQLError("Valid iOS database location could not be determined in openDatabase call")}openargs.dblocation=dblocation;if(!!openargs.createFromLocation&&openargs.createFromLocation===1){openargs.createFromResource="1"}if(!!openargs.androidDatabaseImplementation&&openargs.androidDatabaseImplementation===2){openargs.androidOldDatabaseImplementation=1}if(!!openargs.androidLockWorkaround&&openargs.androidLockWorkaround===1){openargs.androidBugWorkaround=1}okcb=null;errorcb=null;if(args.length>=2){okcb=args[1];if(args.length>2){errorcb=args[2]}}return new SQLitePlugin(openargs,okcb,errorcb)}),deleteDatabase:function(first,success,error){var args,dblocation,dbname;args={};if(first.constructor===String){throw newSQLError("Sorry first deleteDatabase argument must be an object")}else{if(!(first&&first["name"])){throw new Error("Please specify db name")}dbname=first.name;if(typeof dbname!=="string"){throw newSQLError("delete database name must be a string")}args.path=dbname}if(!first.iosDatabaseLocation&&!first.location&&first.location!==0){throw newSQLError("Database location or iosDatabaseLocation setting is now mandatory in deleteDatabase call.")}if(!!first.location&&!!first.iosDatabaseLocation){throw newSQLError("AMBIGUOUS: both location and iosDatabaseLocation settings are present in deleteDatabase call. Please use either setting value, not both.")}dblocation=!!first.location&&first.location==="default"?iosLocationMap["default"]:!!first.iosDatabaseLocation?iosLocationMap[first.iosDatabaseLocation]:dblocations[first.location];if(!dblocation){throw newSQLError("Valid iOS database location could not be determined in deleteDatabase call")}args.dblocation=dblocation;delete SQLitePlugin.prototype.openDBs[args.path];return cordova.exec(success,error,"SQLitePlugin","delete",[args])}};SelfTest={DBNAME:"___$$$___litehelpers___$$$___test___$$$___.db",start:function(successcb,errorcb){SQLiteFactory.deleteDatabase({name:SelfTest.DBNAME,location:"default"},(function(){return SelfTest.step1(successcb,errorcb)}),(function(){return SelfTest.step1(successcb,errorcb)}))},step1:function(successcb,errorcb){SQLiteFactory.openDatabase({name:SelfTest.DBNAME,location:"default"},function(db){var check1;check1=false;db.transaction(function(tx){tx.executeSql('SELECT UPPER("Test") AS upperText',[],function(ignored,resutSet){if(!resutSet.rows){return SelfTest.finishWithError(errorcb,"Missing resutSet.rows")}if(!resutSet.rows.length){return SelfTest.finishWithError(errorcb,"Missing resutSet.rows.length")}if(resutSet.rows.length!==1){return SelfTest.finishWithError(errorcb,"Incorrect resutSet.rows.length value: "+resutSet.rows.length+" (expected: 1)")}if(!resutSet.rows.item(0).upperText){return SelfTest.finishWithError(errorcb,"Missing resutSet.rows.item(0).upperText")}if(resutSet.rows.item(0).upperText!=="TEST"){return SelfTest.finishWithError(errorcb,"Incorrect resutSet.rows.item(0).upperText value: "+(resutSet.rows.item(0).upperText)+" (expected: 'TEST')")}check1=true},function(ignored,tx_sql_err){return SelfTest.finishWithError(errorcb,"TX SQL error: "+tx_sql_err)})},function(tx_err){return SelfTest.finishWithError(errorcb,"TRANSACTION error: "+tx_err)},function(){if(!check1){return SelfTest.finishWithError(errorcb,"Did not get expected upperText result data")}db.executeSql("BEGIN",null,function(ignored){return nextTick(function(){delete db.openDBs[SelfTest.DBNAME];delete txLocks[SelfTest.DBNAME];nextTick(function(){db.transaction(function(tx2){tx2.executeSql("SELECT 1")},function(tx_err){if(!tx_err){return SelfTest.finishWithError(errorcb,"Missing error object")}SelfTest.step2(successcb,errorcb)},function(){return SelfTest.finishWithError(errorcb,"Missing error object")})})})})})},function(open_err){return SelfTest.finishWithError(errorcb,"Open database error: "+open_err)})},step2:function(successcb,errorcb){SQLiteFactory.openDatabase({name:SelfTest.DBNAME,location:"default"},function(db){db.transaction(function(tx){tx.executeSql("SELECT ? AS myResult",[null],function(ignored,resutSet){if(!resutSet.rows){return SelfTest.finishWithError(errorcb,"Missing resutSet.rows")}if(!resutSet.rows.length){return SelfTest.finishWithError(errorcb,"Missing resutSet.rows.length")}if(resutSet.rows.length!==1){return SelfTest.finishWithError(errorcb,"Incorrect resutSet.rows.length value: "+resutSet.rows.length+" (expected: 1)")}SelfTest.step3(successcb,errorcb)})},function(txError){return SelfTest.finishWithError(errorcb,"UNEXPECTED TRANSACTION ERROR: "+txError)})},function(open_err){return SelfTest.finishWithError(errorcb,"Open database error: "+open_err)})},step3:function(successcb,errorcb){SQLiteFactory.openDatabase({name:SelfTest.DBNAME,location:"default"},function(db){return db.sqlBatch(["CREATE TABLE TestTable(id integer primary key autoincrement unique, data);",["INSERT INTO TestTable (data) VALUES (?);",["test-value"]]],function(){var firstid;firstid=-1;return db.executeSql("SELECT id, data FROM TestTable",[],function(resutSet){if(!resutSet.rows){SelfTest.finishWithError(errorcb,"Missing resutSet.rows");return}if(!resutSet.rows.length){SelfTest.finishWithError(errorcb,"Missing resutSet.rows.length");return}if(resutSet.rows.length!==1){SelfTest.finishWithError(errorcb,"Incorrect resutSet.rows.length value: "+resutSet.rows.length+" (expected: 1)");return}if(resutSet.rows.item(0).id===void 0){SelfTest.finishWithError(errorcb,"Missing resutSet.rows.item(0).id");return}firstid=resutSet.rows.item(0).id;if(!resutSet.rows.item(0).data){SelfTest.finishWithError(errorcb,"Missing resutSet.rows.item(0).data");return}if(resutSet.rows.item(0).data!=="test-value"){SelfTest.finishWithError(errorcb,"Incorrect resutSet.rows.item(0).data value: "+(resutSet.rows.item(0).data)+" (expected: 'test-value')");return}return db.transaction(function(tx){return tx.executeSql("UPDATE TestTable SET data = ?",["new-value"])},function(tx_err){return SelfTest.finishWithError(errorcb,"UPDATE transaction error: "+tx_err)},function(){var readTransactionFinished;readTransactionFinished=false;return db.readTransaction(function(tx2){return tx2.executeSql("SELECT id, data FROM TestTable",[],function(ignored,resutSet2){if(!resutSet2.rows){throw newSQLError("Missing resutSet2.rows")}if(!resutSet2.rows.length){throw newSQLError("Missing resutSet2.rows.length")}if(resutSet2.rows.length!==1){throw newSQLError("Incorrect resutSet2.rows.length value: "+resutSet2.rows.length+" (expected: 1)")}if(!resutSet2.rows.item(0).id){throw newSQLError("Missing resutSet2.rows.item(0).id")}if(resutSet2.rows.item(0).id!==firstid){throw newSQLError("resutSet2.rows.item(0).id value "+(resutSet2.rows.item(0).id)+" does not match previous primary key id value ("+firstid+")")}if(!resutSet2.rows.item(0).data){throw newSQLError("Missing resutSet2.rows.item(0).data")}if(resutSet2.rows.item(0).data!=="new-value"){throw newSQLError("Incorrect resutSet2.rows.item(0).data value: "+(resutSet2.rows.item(0).data)+" (expected: 'test-value')")}return readTransactionFinished=true})},function(tx2_err){return SelfTest.finishWithError(errorcb,"readTransaction error: "+tx2_err)},function(){if(!readTransactionFinished){SelfTest.finishWithError(errorcb,"readTransaction did not finish");return}return db.transaction(function(tx3){tx3.executeSql("DELETE FROM TestTable");return tx3.executeSql("INSERT INTO TestTable (data) VALUES(?)",[123])},function(tx3_err){return SelfTest.finishWithError(errorcb,"DELETE transaction error: "+tx3_err)},function(){var secondReadTransactionFinished;secondReadTransactionFinished=false;return db.readTransaction(function(tx4){return tx4.executeSql("SELECT id, data FROM TestTable",[],function(ignored,resutSet3){if(!resutSet3.rows){throw newSQLError("Missing resutSet3.rows")}if(!resutSet3.rows.length){throw newSQLError("Missing resutSet3.rows.length")}if(resutSet3.rows.length!==1){throw newSQLError("Incorrect resutSet3.rows.length value: "+resutSet3.rows.length+" (expected: 1)")}if(!resutSet3.rows.item(0).id){throw newSQLError("Missing resutSet3.rows.item(0).id")}if(resutSet3.rows.item(0).id===firstid){throw newSQLError("resutSet3.rows.item(0).id value "+(resutSet3.rows.item(0).id)+" incorrectly matches previous unique key id value value ("+firstid+")")}if(!resutSet3.rows.item(0).data){throw newSQLError("Missing resutSet3.rows.item(0).data")}if(resutSet3.rows.item(0).data!==123){throw newSQLError("Incorrect resutSet3.rows.item(0).data value: "+(resutSet3.rows.item(0).data)+" (expected 123)")}return secondReadTransactionFinished=true})},function(tx4_err){return SelfTest.finishWithError(errorcb,"second readTransaction error: "+tx4_err)},function(){if(!secondReadTransactionFinished){SelfTest.finishWithError(errorcb,"second readTransaction did not finish");return}return db.close(function(){return SQLiteFactory.deleteDatabase({name:SelfTest.DBNAME,location:"default"},successcb,function(cleanup_err){if(/Windows /.test(navigator.userAgent)||/IEMobile/.test(navigator.userAgent)){console.log("IGNORE CLEANUP (DELETE) ERROR: "+(JSON.stringify(cleanup_err))+" (Windows/WP8)");successcb();return}return SelfTest.finishWithError(errorcb,"Cleanup error: "+cleanup_err)})},function(close_err){if(/Windows /.test(navigator.userAgent)||/IEMobile/.test(navigator.userAgent)){console.log("IGNORE close ERROR: "+(JSON.stringify(close_err))+" (Windows/WP8)");SQLiteFactory.deleteDatabase({name:SelfTest.DBNAME,location:"default"},successcb,successcb);return}return SelfTest.finishWithError(errorcb,"close error: "+close_err)})})})})})},function(select_err){return SelfTest.finishWithError(errorcb,"SELECT error: "+select_err)})},function(batch_err){return SelfTest.finishWithError(errorcb,"sql batch error: "+batch_err)})},function(open_err){return SelfTest.finishWithError(errorcb,"Open database error: "+open_err)})},finishWithError:function(errorcb,message){console.log("selfTest ERROR with message: "+message);SQLiteFactory.deleteDatabase({name:SelfTest.DBNAME,location:"default"},function(){return errorcb(newSQLError(message))},function(err2){return errorcb(newSQLError("Cleanup error: "+err2+" for error: "+message))})}};root.sqlitePlugin={sqliteFeatures:{isSQLitePlugin:true},echoTest:function(okcb,errorcb){var error,ok;ok=function(s){if(s==="test-string"){return okcb()}else{return errorcb("Mismatch: got: '"+s+"' expected 'test-string'")}};error=function(e){return errorcb(e)};return cordova.exec(ok,error,"SQLitePlugin","echoStringValue",[{value:"test-string"}])},selfTest:SelfTest.start,openDatabase:SQLiteFactory.openDatabase,deleteDatabase:SQLiteFactory.deleteDatabase}}).call(this)});
     
};

function wkWebView(){
    /**cordova.js**/
    (function(){var PLATFORM_VERSION_BUILD_LABEL="4.5.4";var require;var define;(function(){var modules={};var requireStack=[];var inProgressModules={};var SEPARATOR=".";function build(module){var factory=module.factory;var localRequire=function(id){var resultantId=id;if(id.charAt(0)==="."){resultantId=module.id.slice(0,module.id.lastIndexOf(SEPARATOR))+SEPARATOR+id.slice(2)}return require(resultantId)};module.exports={};delete module.factory;factory(localRequire,module.exports,module);return module.exports}require=function(id){if(!modules[id]){throw"module "+id+" not found"}else{if(id in inProgressModules){var cycle=requireStack.slice(inProgressModules[id]).join("->")+"->"+id;throw"Cycle in require graph: "+cycle}}if(modules[id].factory){try{inProgressModules[id]=requireStack.length;requireStack.push(id);return build(modules[id])}finally{delete inProgressModules[id];requireStack.pop()}}return modules[id].exports};define=function(id,factory){if(modules[id]){throw"module "+id+" already defined"}modules[id]={id:id,factory:factory}};define.remove=function(id){delete modules[id]};define.moduleMap=modules})();if(typeof module==="object"&&typeof require==="function"){module.exports.require=require;module.exports.define=define}define("cordova",function(require,exports,module){if(window.cordova&&!(window.cordova instanceof HTMLElement)){throw new Error("cordova already defined")}var channel=require("cordova/channel");var platform=require("cordova/platform");var m_document_addEventListener=document.addEventListener;var m_document_removeEventListener=document.removeEventListener;var m_window_addEventListener=window.addEventListener;var m_window_removeEventListener=window.removeEventListener;var documentEventHandlers={};var windowEventHandlers={};document.addEventListener=function(evt,handler,capture){var e=evt.toLowerCase();if(typeof documentEventHandlers[e]!=="undefined"){documentEventHandlers[e].subscribe(handler)}else{m_document_addEventListener.call(document,evt,handler,capture)}};window.addEventListener=function(evt,handler,capture){var e=evt.toLowerCase();if(typeof windowEventHandlers[e]!=="undefined"){windowEventHandlers[e].subscribe(handler)}else{m_window_addEventListener.call(window,evt,handler,capture)}};document.removeEventListener=function(evt,handler,capture){var e=evt.toLowerCase();if(typeof documentEventHandlers[e]!=="undefined"){documentEventHandlers[e].unsubscribe(handler)}else{m_document_removeEventListener.call(document,evt,handler,capture)}};window.removeEventListener=function(evt,handler,capture){var e=evt.toLowerCase();if(typeof windowEventHandlers[e]!=="undefined"){windowEventHandlers[e].unsubscribe(handler)}else{m_window_removeEventListener.call(window,evt,handler,capture)}};function createEvent(type,data){var event=document.createEvent("Events");event.initEvent(type,false,false);if(data){for(var i in data){if(data.hasOwnProperty(i)){event[i]=data[i]}}}return event}var cordova={define:define,require:require,version:PLATFORM_VERSION_BUILD_LABEL,platformVersion:PLATFORM_VERSION_BUILD_LABEL,platformId:platform.id,addWindowEventHandler:function(event){return(windowEventHandlers[event]=channel.create(event))},addStickyDocumentEventHandler:function(event){return(documentEventHandlers[event]=channel.createSticky(event))},addDocumentEventHandler:function(event){return(documentEventHandlers[event]=channel.create(event))},removeWindowEventHandler:function(event){delete windowEventHandlers[event]},removeDocumentEventHandler:function(event){delete documentEventHandlers[event]},getOriginalHandlers:function(){return{"document":{"addEventListener":m_document_addEventListener,"removeEventListener":m_document_removeEventListener},"window":{"addEventListener":m_window_addEventListener,"removeEventListener":m_window_removeEventListener}}},fireDocumentEvent:function(type,data,bNoDetach){var evt=createEvent(type,data);if(typeof documentEventHandlers[type]!=="undefined"){if(bNoDetach){documentEventHandlers[type].fire(evt)}else{setTimeout(function(){if(type==="deviceready"){document.dispatchEvent(evt)}documentEventHandlers[type].fire(evt)},0)}}else{document.dispatchEvent(evt)}},fireWindowEvent:function(type,data){var evt=createEvent(type,data);if(typeof windowEventHandlers[type]!=="undefined"){setTimeout(function(){windowEventHandlers[type].fire(evt)},0)}else{window.dispatchEvent(evt)}},callbackId:Math.floor(Math.random()*2000000000),callbacks:{},callbackStatus:{NO_RESULT:0,OK:1,CLASS_NOT_FOUND_EXCEPTION:2,ILLEGAL_ACCESS_EXCEPTION:3,INSTANTIATION_EXCEPTION:4,MALFORMED_URL_EXCEPTION:5,IO_EXCEPTION:6,INVALID_ACTION:7,JSON_EXCEPTION:8,ERROR:9},callbackSuccess:function(callbackId,args){cordova.callbackFromNative(callbackId,true,args.status,[args.message],args.keepCallback)},callbackError:function(callbackId,args){cordova.callbackFromNative(callbackId,false,args.status,[args.message],args.keepCallback)},callbackFromNative:function(callbackId,isSuccess,status,args,keepCallback){try{var callback=cordova.callbacks[callbackId];if(callback){if(isSuccess&&status===cordova.callbackStatus.OK){callback.success&&callback.success.apply(null,args)}else{if(!isSuccess){callback.fail&&callback.fail.apply(null,args)}}if(!keepCallback){delete cordova.callbacks[callbackId]}}}catch(err){var msg="Error in "+(isSuccess?"Success":"Error")+" callbackId: "+callbackId+" : "+err;console&&console.log&&console.log(msg);cordova.fireWindowEvent("cordovacallbackerror",{"message":msg});throw err}},addConstructor:function(func){channel.onCordovaReady.subscribe(function(){try{func()}catch(e){console.log("Failed to run constructor: "+e)}})}};module.exports=cordova});define("cordova/argscheck",function(require,exports,module){var utils=require("cordova/utils");var moduleExports=module.exports;var typeMap={"A":"Array","D":"Date","N":"Number","S":"String","F":"Function","O":"Object"};function extractParamName(callee,argIndex){return(/.*?\((.*?)\)/).exec(callee)[1].split(", ")[argIndex]}function checkArgs(spec,functionName,args,opt_callee){if(!moduleExports.enableChecks){return}var errMsg=null;var typeName;for(var i=0;i<spec.length;++i){var c=spec.charAt(i);var cUpper=c.toUpperCase();var arg=args[i];if(c==="*"){continue}typeName=utils.typeName(arg);if((arg===null||arg===undefined)&&c===cUpper){continue}if(typeName!==typeMap[cUpper]){errMsg="Expected "+typeMap[cUpper];break}}if(errMsg){errMsg+=", but got "+typeName+".";errMsg='Wrong type for parameter "'+extractParamName(opt_callee||args.callee,i)+'" of '+functionName+": "+errMsg;if(typeof jasmine==="undefined"){console.error(errMsg)}throw TypeError(errMsg)}}function getValue(value,defaultValue){return value===undefined?defaultValue:value}moduleExports.checkArgs=checkArgs;moduleExports.getValue=getValue;moduleExports.enableChecks=true});define("cordova/base64",function(require,exports,module){var base64=exports;base64.fromArrayBuffer=function(arrayBuffer){var array=new Uint8Array(arrayBuffer);return uint8ToBase64(array)};base64.toArrayBuffer=function(str){var decodedStr=typeof atob!=="undefined"?atob(str):Buffer.from(str,"base64").toString("binary");var arrayBuffer=new ArrayBuffer(decodedStr.length);var array=new Uint8Array(arrayBuffer);for(var i=0,len=decodedStr.length;i<len;i++){array[i]=decodedStr.charCodeAt(i)}return arrayBuffer};var b64_6bit="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var b64_12bit;var b64_12bitTable=function(){b64_12bit=[];for(var i=0;i<64;i++){for(var j=0;j<64;j++){b64_12bit[i*64+j]=b64_6bit[i]+b64_6bit[j]}}b64_12bitTable=function(){return b64_12bit};return b64_12bit};function uint8ToBase64(rawData){var numBytes=rawData.byteLength;var output="";var segment;var table=b64_12bitTable();for(var i=0;i<numBytes-2;i+=3){segment=(rawData[i]<<16)+(rawData[i+1]<<8)+rawData[i+2];output+=table[segment>>12];output+=table[segment&4095]}if(numBytes-i===2){segment=(rawData[i]<<16)+(rawData[i+1]<<8);output+=table[segment>>12];output+=b64_6bit[(segment&4095)>>6];output+="="}else{if(numBytes-i===1){segment=(rawData[i]<<16);output+=table[segment>>12];output+="=="}}return output}});define("cordova/builder",function(require,exports,module){var utils=require("cordova/utils");function each(objects,func,context){for(var prop in objects){if(objects.hasOwnProperty(prop)){func.apply(context,[objects[prop],prop])}}}function clobber(obj,key,value){exports.replaceHookForTesting(obj,key);var needsProperty=false;try{obj[key]=value}catch(e){needsProperty=true}if(needsProperty||obj[key]!==value){utils.defineGetter(obj,key,function(){return value})}}function assignOrWrapInDeprecateGetter(obj,key,value,message){if(message){utils.defineGetter(obj,key,function(){console.log(message);delete obj[key];clobber(obj,key,value);return value})}else{clobber(obj,key,value)}}function include(parent,objects,clobber,merge){each(objects,function(obj,key){try{var result=obj.path?require(obj.path):{};if(clobber){if(typeof parent[key]==="undefined"){assignOrWrapInDeprecateGetter(parent,key,result,obj.deprecated)}else{if(typeof obj.path!=="undefined"){if(merge){recursiveMerge(parent[key],result)}else{assignOrWrapInDeprecateGetter(parent,key,result,obj.deprecated)}}}result=parent[key]}else{if(typeof parent[key]==="undefined"){assignOrWrapInDeprecateGetter(parent,key,result,obj.deprecated)}else{result=parent[key]}}if(obj.children){include(result,obj.children,clobber,merge)}}catch(e){utils.alert("Exception building Cordova JS globals: "+e+' for key "'+key+'"')}})}function recursiveMerge(target,src){for(var prop in src){if(src.hasOwnProperty(prop)){if(target.prototype&&target.prototype.constructor===target){clobber(target.prototype,prop,src[prop])}else{if(typeof src[prop]==="object"&&typeof target[prop]==="object"){recursiveMerge(target[prop],src[prop])}else{clobber(target,prop,src[prop])}}}}}exports.buildIntoButDoNotClobber=function(objects,target){include(target,objects,false,false)};exports.buildIntoAndClobber=function(objects,target){include(target,objects,true,false)};exports.buildIntoAndMerge=function(objects,target){include(target,objects,true,true)};exports.recursiveMerge=recursiveMerge;exports.assignOrWrapInDeprecateGetter=assignOrWrapInDeprecateGetter;exports.replaceHookForTesting=function(){}});define("cordova/channel",function(require,exports,module){var utils=require("cordova/utils");var nextGuid=1;var Channel=function(type,sticky){this.type=type;this.handlers={};this.state=sticky?1:0;this.fireArgs=null;this.numHandlers=0;this.onHasSubscribersChange=null};var channel={join:function(h,c){var len=c.length;var i=len;var f=function(){if(!(--i)){h()}};for(var j=0;j<len;j++){if(c[j].state===0){throw Error("Can only use join with sticky channels.")}c[j].subscribe(f)}if(!len){h()}},create:function(type){return channel[type]=new Channel(type,false)},createSticky:function(type){return channel[type]=new Channel(type,true)},deviceReadyChannelsArray:[],deviceReadyChannelsMap:{},waitForInitialization:function(feature){if(feature){var c=channel[feature]||this.createSticky(feature);this.deviceReadyChannelsMap[feature]=c;this.deviceReadyChannelsArray.push(c)}},initializationComplete:function(feature){var c=this.deviceReadyChannelsMap[feature];if(c){c.fire()}}};function checkSubscriptionArgument(argument){if(typeof argument!=="function"&&typeof argument.handleEvent!=="function"){throw new Error("Must provide a function or an EventListener object "+"implementing the handleEvent interface.")}}Channel.prototype.subscribe=function(eventListenerOrFunction,eventListener){checkSubscriptionArgument(eventListenerOrFunction);var handleEvent,guid;if(eventListenerOrFunction&&typeof eventListenerOrFunction==="object"){handleEvent=eventListenerOrFunction.handleEvent;eventListener=eventListenerOrFunction}else{handleEvent=eventListenerOrFunction}if(this.state===2){handleEvent.apply(eventListener||this,this.fireArgs);return}guid=eventListenerOrFunction.observer_guid;if(typeof eventListener==="object"){handleEvent=utils.close(eventListener,handleEvent)}if(!guid){guid=""+nextGuid++}handleEvent.observer_guid=guid;eventListenerOrFunction.observer_guid=guid;if(!this.handlers[guid]){this.handlers[guid]=handleEvent;this.numHandlers++;if(this.numHandlers===1){this.onHasSubscribersChange&&this.onHasSubscribersChange()}}};Channel.prototype.unsubscribe=function(eventListenerOrFunction){checkSubscriptionArgument(eventListenerOrFunction);var handleEvent,guid,handler;if(eventListenerOrFunction&&typeof eventListenerOrFunction==="object"){handleEvent=eventListenerOrFunction.handleEvent}else{handleEvent=eventListenerOrFunction}guid=handleEvent.observer_guid;handler=this.handlers[guid];if(handler){delete this.handlers[guid];this.numHandlers--;if(this.numHandlers===0){this.onHasSubscribersChange&&this.onHasSubscribersChange()}}};Channel.prototype.fire=function(e){var fail=false;var fireArgs=Array.prototype.slice.call(arguments);if(this.state===1){this.state=2;this.fireArgs=fireArgs}if(this.numHandlers){var toCall=[];for(var item in this.handlers){toCall.push(this.handlers[item])}for(var i=0;i<toCall.length;++i){toCall[i].apply(this,fireArgs)}if(this.state===2&&this.numHandlers){this.numHandlers=0;this.handlers={};this.onHasSubscribersChange&&this.onHasSubscribersChange()}}};channel.createSticky("onDOMContentLoaded");channel.createSticky("onNativeReady");channel.createSticky("onCordovaReady");channel.createSticky("onPluginsReady");channel.createSticky("onDeviceReady");channel.create("onResume");channel.create("onPause");channel.waitForInitialization("onCordovaReady");channel.waitForInitialization("onDOMContentLoaded");module.exports=channel});define("cordova/exec",function(require,exports,module){var cordova=require("cordova"),utils=require("cordova/utils"),base64=require("cordova/base64"),execIframe,commandQueue=[],isInContextOfEvalJs=0,failSafeTimerId=0;function massageArgsJsToNative(args){if(!args||utils.typeName(args)!="Array"){return args}var ret=[];args.forEach(function(arg,i){if(utils.typeName(arg)=="ArrayBuffer"){ret.push({"CDVType":"ArrayBuffer","data":base64.fromArrayBuffer(arg)})}else{ret.push(arg)}});return ret}function massageMessageNativeToJs(message){if(message.CDVType=="ArrayBuffer"){var stringToArrayBuffer=function(str){var ret=new Uint8Array(str.length);for(var i=0;i<str.length;i++){ret[i]=str.charCodeAt(i)}return ret.buffer};var base64ToArrayBuffer=function(b64){return stringToArrayBuffer(atob(b64))};message=base64ToArrayBuffer(message.data)}return message}function convertMessageToArgsNativeToJs(message){var args=[];if(!message||!message.hasOwnProperty("CDVType")){args.push(message)}else{if(message.CDVType=="MultiPart"){message.messages.forEach(function(e){args.push(massageMessageNativeToJs(e))})}else{args.push(massageMessageNativeToJs(message))}}return args}function iOSExec(){var successCallback,failCallback,service,action,actionArgs;var callbackId=null;if(typeof arguments[0]!=="string"){successCallback=arguments[0];failCallback=arguments[1];service=arguments[2];action=arguments[3];actionArgs=arguments[4];callbackId="INVALID"}else{throw new Error("The old format of this exec call has been removed (deprecated since 2.1). Change to: "+"cordova.exec(null, null, 'Service', 'action', [ arg1, arg2 ]);")}actionArgs=actionArgs||[];if(successCallback||failCallback){callbackId=service+cordova.callbackId++;cordova.callbacks[callbackId]={success:successCallback,fail:failCallback}}actionArgs=massageArgsJsToNative(actionArgs);var command=[callbackId,service,action,actionArgs];commandQueue.push(JSON.stringify(command));if(!isInContextOfEvalJs&&commandQueue.length==1){pokeNative()}}function proxyChanged(){var cexec=cordovaExec();return(execProxy!==cexec&&iOSExec!==cexec)}function handleBridgeChange(){if(proxyChanged()){var commandString=commandQueue.shift();while(commandString){var command=JSON.parse(commandString);var callbackId=command[0];var service=command[1];var action=command[2];var actionArgs=command[3];var callbacks=cordova.callbacks[callbackId]||{};execProxy(callbacks.success,callbacks.fail,service,action,actionArgs);commandString=commandQueue.shift()}return true}return false}function pokeNative(){if(!document.body){setTimeout(pokeNative);return}if(execIframe&&execIframe.contentWindow){execIframe.contentWindow.location="gap://ready"}else{execIframe=document.createElement("iframe");execIframe.style.display="none";execIframe.src="gap://ready";document.body.appendChild(execIframe)}failSafeTimerId=setTimeout(function(){if(commandQueue.length){if(!handleBridgeChange()){pokeNative()}}},50)}iOSExec.nativeFetchMessages=function(){if(failSafeTimerId){clearTimeout(failSafeTimerId);failSafeTimerId=0}if(!commandQueue.length){return""}var json="["+commandQueue.join(",")+"]";commandQueue.length=0;return json};iOSExec.nativeCallback=function(callbackId,status,message,keepCallback,debug){return iOSExec.nativeEvalAndFetch(function(){var success=status===0||status===1;var args=convertMessageToArgsNativeToJs(message);function nc2(){cordova.callbackFromNative(callbackId,success,status,args,keepCallback)}setTimeout(nc2,0)})};iOSExec.nativeEvalAndFetch=function(func){isInContextOfEvalJs++;try{func();return iOSExec.nativeFetchMessages()}finally{isInContextOfEvalJs--}};function cordovaExec(){var cexec=require("cordova/exec");var cexec_valid=(typeof cexec.nativeFetchMessages==="function")&&(typeof cexec.nativeEvalAndFetch==="function")&&(typeof cexec.nativeCallback==="function");return(cexec_valid&&execProxy!==cexec)?cexec:iOSExec}function execProxy(){cordovaExec().apply(null,arguments)}execProxy.nativeFetchMessages=function(){return cordovaExec().nativeFetchMessages.apply(null,arguments)};execProxy.nativeEvalAndFetch=function(){return cordovaExec().nativeEvalAndFetch.apply(null,arguments)};execProxy.nativeCallback=function(){return cordovaExec().nativeCallback.apply(null,arguments)};module.exports=execProxy});define("cordova/exec/proxy",function(require,exports,module){var CommandProxyMap={};module.exports={add:function(id,proxyObj){console.log("adding proxy for "+id);CommandProxyMap[id]=proxyObj;return proxyObj},remove:function(id){var proxy=CommandProxyMap[id];delete CommandProxyMap[id];CommandProxyMap[id]=null;return proxy},get:function(service,action){return(CommandProxyMap[service]?CommandProxyMap[service][action]:null)}}});define("cordova/init",function(require,exports,module){var channel=require("cordova/channel");var cordova=require("cordova");var modulemapper=require("cordova/modulemapper");var platform=require("cordova/platform");var pluginloader=require("cordova/pluginloader");var utils=require("cordova/utils");var platformInitChannelsArray=[channel.onNativeReady,channel.onPluginsReady];function logUnfiredChannels(arr){for(var i=0;i<arr.length;++i){if(arr[i].state!==2){console.log("Channel not fired: "+arr[i].type)}}}window.setTimeout(function(){if(channel.onDeviceReady.state!==2){console.log("deviceready has not fired after 5 seconds.");logUnfiredChannels(platformInitChannelsArray);logUnfiredChannels(channel.deviceReadyChannelsArray)}},5000);function replaceNavigator(origNavigator){var CordovaNavigator=function(){};CordovaNavigator.prototype=origNavigator;var newNavigator=new CordovaNavigator();if(CordovaNavigator.bind){for(var key in origNavigator){if(typeof origNavigator[key]==="function"){newNavigator[key]=origNavigator[key].bind(origNavigator)}else{(function(k){utils.defineGetterSetter(newNavigator,key,function(){return origNavigator[k]})})(key)}}}return newNavigator}if(window.navigator){window.navigator=replaceNavigator(window.navigator)}if(!window.console){window.console={log:function(){}}}if(!window.console.warn){window.console.warn=function(msg){this.log("warn: "+msg)}}channel.onPause=cordova.addDocumentEventHandler("pause");channel.onResume=cordova.addDocumentEventHandler("resume");channel.onActivated=cordova.addDocumentEventHandler("activated");channel.onDeviceReady=cordova.addStickyDocumentEventHandler("deviceready");if(document.readyState==="complete"||document.readyState==="interactive"){channel.onDOMContentLoaded.fire()}else{document.addEventListener("DOMContentLoaded",function(){channel.onDOMContentLoaded.fire()},false)}if(window._nativeReady){channel.onNativeReady.fire()}modulemapper.clobbers("cordova","cordova");modulemapper.clobbers("cordova/exec","cordova.exec");modulemapper.clobbers("cordova/exec","Cordova.exec");platform.bootstrap&&platform.bootstrap();setTimeout(function(){pluginloader.load(function(){channel.onPluginsReady.fire()})},0);channel.join(function(){modulemapper.mapModules(window);platform.initialize&&platform.initialize();channel.onCordovaReady.fire();channel.join(function(){require("cordova").fireDocumentEvent("deviceready")},channel.deviceReadyChannelsArray)},platformInitChannelsArray)});define("cordova/init_b",function(require,exports,module){var channel=require("cordova/channel");var cordova=require("cordova");var modulemapper=require("cordova/modulemapper");var platform=require("cordova/platform");var pluginloader=require("cordova/pluginloader");var utils=require("cordova/utils");var platformInitChannelsArray=[channel.onDOMContentLoaded,channel.onNativeReady,channel.onPluginsReady];cordova.exec=require("cordova/exec");function logUnfiredChannels(arr){for(var i=0;i<arr.length;++i){if(arr[i].state!==2){console.log("Channel not fired: "+arr[i].type)}}}window.setTimeout(function(){if(channel.onDeviceReady.state!==2){console.log("deviceready has not fired after 5 seconds.");logUnfiredChannels(platformInitChannelsArray);logUnfiredChannels(channel.deviceReadyChannelsArray)}},5000);function replaceNavigator(origNavigator){var CordovaNavigator=function(){};CordovaNavigator.prototype=origNavigator;var newNavigator=new CordovaNavigator();if(CordovaNavigator.bind){for(var key in origNavigator){if(typeof origNavigator[key]==="function"){newNavigator[key]=origNavigator[key].bind(origNavigator)}else{(function(k){utils.defineGetterSetter(newNavigator,key,function(){return origNavigator[k]})})(key)}}}return newNavigator}if(window.navigator){window.navigator=replaceNavigator(window.navigator)}if(!window.console){window.console={log:function(){}}}if(!window.console.warn){window.console.warn=function(msg){this.log("warn: "+msg)}}channel.onPause=cordova.addDocumentEventHandler("pause");channel.onResume=cordova.addDocumentEventHandler("resume");channel.onActivated=cordova.addDocumentEventHandler("activated");channel.onDeviceReady=cordova.addStickyDocumentEventHandler("deviceready");if(document.readyState==="complete"||document.readyState==="interactive"){channel.onDOMContentLoaded.fire()}else{document.addEventListener("DOMContentLoaded",function(){channel.onDOMContentLoaded.fire()},false)}if(window._nativeReady){channel.onNativeReady.fire()}platform.bootstrap&&platform.bootstrap();setTimeout(function(){pluginloader.load(function(){channel.onPluginsReady.fire()})},0);channel.join(function(){modulemapper.mapModules(window);platform.initialize&&platform.initialize();channel.onCordovaReady.fire();channel.join(function(){require("cordova").fireDocumentEvent("deviceready")},channel.deviceReadyChannelsArray)},platformInitChannelsArray)});define("cordova/modulemapper",function(require,exports,module){var builder=require("cordova/builder");var moduleMap=define.moduleMap;var symbolList;var deprecationMap;exports.reset=function(){symbolList=[];deprecationMap={}};function addEntry(strategy,moduleName,symbolPath,opt_deprecationMessage){if(!(moduleName in moduleMap)){throw new Error("Module "+moduleName+" does not exist.")}symbolList.push(strategy,moduleName,symbolPath);if(opt_deprecationMessage){deprecationMap[symbolPath]=opt_deprecationMessage}}exports.clobbers=function(moduleName,symbolPath,opt_deprecationMessage){addEntry("c",moduleName,symbolPath,opt_deprecationMessage)};exports.merges=function(moduleName,symbolPath,opt_deprecationMessage){addEntry("m",moduleName,symbolPath,opt_deprecationMessage)};exports.defaults=function(moduleName,symbolPath,opt_deprecationMessage){addEntry("d",moduleName,symbolPath,opt_deprecationMessage)};exports.runs=function(moduleName){addEntry("r",moduleName,null)};function prepareNamespace(symbolPath,context){if(!symbolPath){return context}var parts=symbolPath.split(".");var cur=context;for(var i=0,part;part=parts[i];++i){cur=cur[part]=cur[part]||{}}return cur}exports.mapModules=function(context){var origSymbols={};context.CDV_origSymbols=origSymbols;for(var i=0,len=symbolList.length;i<len;i+=3){var strategy=symbolList[i];var moduleName=symbolList[i+1];var module=require(moduleName);if(strategy==="r"){continue}var symbolPath=symbolList[i+2];var lastDot=symbolPath.lastIndexOf(".");var namespace=symbolPath.substr(0,lastDot);var lastName=symbolPath.substr(lastDot+1);var deprecationMsg=symbolPath in deprecationMap?"Access made to deprecated symbol: "+symbolPath+". "+deprecationMsg:null;var parentObj=prepareNamespace(namespace,context);var target=parentObj[lastName];if(strategy==="m"&&target){builder.recursiveMerge(target,module)}else{if((strategy==="d"&&!target)||(strategy!=="d")){if(!(symbolPath in origSymbols)){origSymbols[symbolPath]=target}builder.assignOrWrapInDeprecateGetter(parentObj,lastName,module,deprecationMsg)}}}};exports.getOriginalSymbol=function(context,symbolPath){var origSymbols=context.CDV_origSymbols;if(origSymbols&&(symbolPath in origSymbols)){return origSymbols[symbolPath]}var parts=symbolPath.split(".");var obj=context;for(var i=0;i<parts.length;++i){obj=obj&&obj[parts[i]]}return obj};exports.reset()});define("cordova/modulemapper_b",function(require,exports,module){var builder=require("cordova/builder");var symbolList=[];var deprecationMap;exports.reset=function(){symbolList=[];deprecationMap={}};function addEntry(strategy,moduleName,symbolPath,opt_deprecationMessage){symbolList.push(strategy,moduleName,symbolPath);if(opt_deprecationMessage){deprecationMap[symbolPath]=opt_deprecationMessage}}exports.clobbers=function(moduleName,symbolPath,opt_deprecationMessage){addEntry("c",moduleName,symbolPath,opt_deprecationMessage)};exports.merges=function(moduleName,symbolPath,opt_deprecationMessage){addEntry("m",moduleName,symbolPath,opt_deprecationMessage)};exports.defaults=function(moduleName,symbolPath,opt_deprecationMessage){addEntry("d",moduleName,symbolPath,opt_deprecationMessage)};exports.runs=function(moduleName){addEntry("r",moduleName,null)};function prepareNamespace(symbolPath,context){if(!symbolPath){return context}var parts=symbolPath.split(".");var cur=context;for(var i=0,part;part=parts[i];++i){cur=cur[part]=cur[part]||{}}return cur}exports.mapModules=function(context){var origSymbols={};context.CDV_origSymbols=origSymbols;for(var i=0,len=symbolList.length;i<len;i+=3){var strategy=symbolList[i];var moduleName=symbolList[i+1];var module=require(moduleName);if(strategy==="r"){continue}var symbolPath=symbolList[i+2];var lastDot=symbolPath.lastIndexOf(".");var namespace=symbolPath.substr(0,lastDot);var lastName=symbolPath.substr(lastDot+1);var deprecationMsg=symbolPath in deprecationMap?"Access made to deprecated symbol: "+symbolPath+". "+deprecationMsg:null;var parentObj=prepareNamespace(namespace,context);var target=parentObj[lastName];if(strategy==="m"&&target){builder.recursiveMerge(target,module)}else{if((strategy==="d"&&!target)||(strategy!=="d")){if(!(symbolPath in origSymbols)){origSymbols[symbolPath]=target}builder.assignOrWrapInDeprecateGetter(parentObj,lastName,module,deprecationMsg)}}}};exports.getOriginalSymbol=function(context,symbolPath){var origSymbols=context.CDV_origSymbols;if(origSymbols&&(symbolPath in origSymbols)){return origSymbols[symbolPath]}var parts=symbolPath.split(".");var obj=context;for(var i=0;i<parts.length;++i){obj=obj&&obj[parts[i]]}return obj};exports.reset()});define("cordova/platform",function(require,exports,module){module.exports={id:"ios",bootstrap:function(){require("cordova/modulemapper").clobbers("cordova/plugin/ios/console","window.console");require("cordova/channel").onNativeReady.fire()}}});define("cordova/plugin/ios/console",function(require,exports,module){var logger=require("cordova/plugin/ios/logger");var console=module.exports;var WinConsole=window.console;var UseLogger=false;var Timers={};function noop(){}console.useLogger=function(value){if(arguments.length){UseLogger=!!value}if(UseLogger){if(logger.useConsole()){throw new Error("console and logger are too intertwingly")}}return UseLogger};console.log=function(){if(logger.useConsole()){return}logger.log.apply(logger,[].slice.call(arguments))};console.error=function(){if(logger.useConsole()){return}logger.error.apply(logger,[].slice.call(arguments))};console.warn=function(){if(logger.useConsole()){return}logger.warn.apply(logger,[].slice.call(arguments))};console.info=function(){if(logger.useConsole()){return}logger.info.apply(logger,[].slice.call(arguments))};console.debug=function(){if(logger.useConsole()){return}logger.debug.apply(logger,[].slice.call(arguments))};console.assert=function(expression){if(expression){return}var message=logger.format.apply(logger.format,[].slice.call(arguments,1));console.log("ASSERT: "+message)};console.clear=function(){};console.dir=function(object){console.log("%o",object)};console.dirxml=function(node){console.log(node.innerHTML)};console.trace=noop;console.group=console.log;console.groupCollapsed=console.log;console.groupEnd=noop;console.time=function(name){Timers[name]=new Date().valueOf()};console.timeEnd=function(name){var timeStart=Timers[name];if(!timeStart){console.warn("unknown timer: "+name);return}var timeElapsed=new Date().valueOf()-timeStart;console.log(name+": "+timeElapsed+"ms")};console.timeStamp=noop;console.profile=noop;console.profileEnd=noop;console.count=noop;console.exception=console.log;console.table=function(data,columns){console.log("%o",data)};function wrappedOrigCall(orgFunc,newFunc){return function(){var args=[].slice.call(arguments);try{orgFunc.apply(WinConsole,args)}catch(e){}try{newFunc.apply(console,args)}catch(e){}}}for(var key in console){if(typeof WinConsole[key]=="function"){console[key]=wrappedOrigCall(WinConsole[key],console[key])}}});define("cordova/plugin/ios/logger",function(require,exports,module){var logger=exports;var exec=require("cordova/exec");var UseConsole=false;var UseLogger=true;var Queued=[];var DeviceReady=false;var CurrentLevel;var originalConsole=console;var Levels=["LOG","ERROR","WARN","INFO","DEBUG"];var LevelsMap={};for(var i=0;i<Levels.length;i++){var level=Levels[i];LevelsMap[level]=i;logger[level]=level}CurrentLevel=LevelsMap.WARN;logger.level=function(value){if(arguments.length){if(LevelsMap[value]===null){throw new Error("invalid logging level: "+value)}CurrentLevel=LevelsMap[value]}return Levels[CurrentLevel]};logger.useConsole=function(value){if(arguments.length){UseConsole=!!value}if(UseConsole){if(typeof console=="undefined"){throw new Error("global console object is not defined")}if(typeof console.log!="function"){throw new Error("global console object does not have a log function")}if(typeof console.useLogger=="function"){if(console.useLogger()){throw new Error("console and logger are too intertwingly")}}}return UseConsole};logger.useLogger=function(value){if(arguments.length){UseLogger=!!value}return UseLogger};logger.log=function(message){logWithArgs("LOG",arguments)};logger.error=function(message){logWithArgs("ERROR",arguments)};logger.warn=function(message){logWithArgs("WARN",arguments)};logger.info=function(message){logWithArgs("INFO",arguments)};logger.debug=function(message){logWithArgs("DEBUG",arguments)};function logWithArgs(level,args){args=[level].concat([].slice.call(args));logger.logLevel.apply(logger,args)}function formatStringForMessage(message){return(typeof message==="string")?"":"%o"}logger.logLevel=function(level){var formatArgs=[].slice.call(arguments,1);var fmtString=formatStringForMessage(formatArgs[0]);if(fmtString.length>0){formatArgs.unshift(fmtString)}var message=logger.format.apply(logger.format,formatArgs);if(LevelsMap[level]===null){throw new Error("invalid logging level: "+level)}if(LevelsMap[level]>CurrentLevel){return}if(!DeviceReady&&!UseConsole){Queued.push([level,message]);return}if(UseLogger){exec(null,null,"Console","logLevel",[level,message])}if(UseConsole){if(console.useLogger()){throw new Error("console and logger are too intertwingly")}switch(level){case logger.LOG:originalConsole.log(message);break;case logger.ERROR:originalConsole.log("ERROR: "+message);break;case logger.WARN:originalConsole.log("WARN: "+message);break;case logger.INFO:originalConsole.log("INFO: "+message);break;case logger.DEBUG:originalConsole.log("DEBUG: "+message);break}}};logger.format=function(formatString,args){return __format(arguments[0],[].slice.call(arguments,1)).join(" ")};function __format(formatString,args){if(formatString===null||formatString===undefined){return[""]}if(arguments.length==1){return[formatString.toString()]}if(typeof formatString!="string"){formatString=formatString.toString()}var pattern=/(.*?)%(.)(.*)/;var rest=formatString;var result=[];while(args.length){var match=pattern.exec(rest);if(!match){break}var arg=args.shift();rest=match[3];result.push(match[1]);if(match[2]=="%"){result.push("%");args.unshift(arg);continue}result.push(__formatted(arg,match[2]))}result.push(rest);var remainingArgs=[].slice.call(args);remainingArgs.unshift(result.join(""));return remainingArgs}function __formatted(object,formatChar){try{switch(formatChar){case"j":case"o":return JSON.stringify(object);case"c":return""}}catch(e){return"error JSON.stringify()ing argument: "+e}if((object===null)||(object===undefined)){return Object.prototype.toString.call(object)}return object.toString()}logger.__onDeviceReady=function(){if(DeviceReady){return}DeviceReady=true;for(var i=0;i<Queued.length;i++){var messageArgs=Queued[i];logger.logLevel(messageArgs[0],messageArgs[1])}Queued=null};document.addEventListener("deviceready",logger.__onDeviceReady,false)});define("cordova/pluginloader",function(require,exports,module){var modulemapper=require("cordova/modulemapper");exports.injectScript=function(url,onload,onerror){var script=document.createElement("script");script.onload=onload;script.onerror=onerror;script.src=url;document.head.appendChild(script)};function injectIfNecessary(id,url,onload,onerror){onerror=onerror||onload;if(id in define.moduleMap){onload()}else{exports.injectScript(url,function(){if(id in define.moduleMap){onload()}else{onerror()}},onerror)}}function onScriptLoadingComplete(moduleList,finishPluginLoading){for(var i=0,module;module=moduleList[i];i++){if(module.clobbers&&module.clobbers.length){for(var j=0;j<module.clobbers.length;j++){modulemapper.clobbers(module.id,module.clobbers[j])}}if(module.merges&&module.merges.length){for(var k=0;k<module.merges.length;k++){modulemapper.merges(module.id,module.merges[k])}}if(module.runs){modulemapper.runs(module.id)}}finishPluginLoading()}function handlePluginsObject(path,moduleList,finishPluginLoading){var scriptCounter=moduleList.length;if(!scriptCounter){finishPluginLoading();return}function scriptLoadedCallback(){if(!--scriptCounter){onScriptLoadingComplete(moduleList,finishPluginLoading)}}for(var i=0;i<moduleList.length;i++){injectIfNecessary(moduleList[i].id,path+moduleList[i].file,scriptLoadedCallback)}}function findCordovaPath(){var path=null;var scripts=document.getElementsByTagName("script");var term="/cordova.js";for(var n=scripts.length-1;n>-1;n--){var src=scripts[n].src.replace(/\?.*$/,"");if(src.indexOf(term)===(src.length-term.length)){path=src.substring(0,src.length-term.length)+"/";break}}return path}exports.load=function(callback){var pathPrefix=findCordovaPath();if(pathPrefix===null){console.log("Could not find cordova.js script tag. Plugin loading may fail.");pathPrefix=""}injectIfNecessary("cordova/plugin_list",pathPrefix+"cordova_plugins.js",function(){var moduleList=require("cordova/plugin_list");handlePluginsObject(pathPrefix,moduleList,callback)},callback)}});define("cordova/pluginloader_b",function(require,exports,module){var modulemapper=require("cordova/modulemapper");function handlePluginsObject(moduleList){if(!moduleList||!moduleList.length){return}for(var i=0,module;module=moduleList[i];i++){if(module.clobbers&&module.clobbers.length){for(var j=0;j<module.clobbers.length;j++){modulemapper.clobbers(module.id,module.clobbers[j])}}if(module.merges&&module.merges.length){for(var k=0;k<module.merges.length;k++){modulemapper.merges(module.id,module.merges[k])}}if(module.runs){modulemapper.runs(module.id)}}}exports.load=function(callback){var moduleList=require("cordova/plugin_list");handlePluginsObject(moduleList);callback()}});define("cordova/urlutil",function(require,exports,module){exports.makeAbsolute=function makeAbsolute(url){var anchorEl=document.createElement("a");anchorEl.href=url;return anchorEl.href}});define("cordova/utils",function(require,exports,module){var utils=exports;utils.defineGetterSetter=function(obj,key,getFunc,opt_setFunc){if(Object.defineProperty){var desc={get:getFunc,configurable:true};if(opt_setFunc){desc.set=opt_setFunc}Object.defineProperty(obj,key,desc)}else{obj.__defineGetter__(key,getFunc);if(opt_setFunc){obj.__defineSetter__(key,opt_setFunc)}}};utils.defineGetter=utils.defineGetterSetter;utils.arrayIndexOf=function(a,item){if(a.indexOf){return a.indexOf(item)}var len=a.length;for(var i=0;i<len;++i){if(a[i]===item){return i}}return -1};utils.arrayRemove=function(a,item){var index=utils.arrayIndexOf(a,item);if(index!==-1){a.splice(index,1)}return index!==-1};utils.typeName=function(val){return Object.prototype.toString.call(val).slice(8,-1)};utils.isArray=Array.isArray||function(a){return utils.typeName(a)==="Array"};utils.isDate=function(d){return(d instanceof Date)};utils.clone=function(obj){if(!obj||typeof obj==="function"||utils.isDate(obj)||typeof obj!=="object"){return obj}var retVal,i;if(utils.isArray(obj)){retVal=[];for(i=0;i<obj.length;++i){retVal.push(utils.clone(obj[i]))}return retVal}retVal={};for(i in obj){if((!(i in retVal)||retVal[i]!==obj[i])&&typeof obj[i]!=="undefined"&&typeof obj[i]!=="unknown"){retVal[i]=utils.clone(obj[i])}}return retVal};utils.close=function(context,func,params){return function(){var args=params||arguments;return func.apply(context,args)}};function UUIDcreatePart(length){var uuidpart="";for(var i=0;i<length;i++){var uuidchar=parseInt((Math.random()*256),10).toString(16);if(uuidchar.length===1){uuidchar="0"+uuidchar}uuidpart+=uuidchar}return uuidpart}utils.createUUID=function(){return UUIDcreatePart(4)+"-"+UUIDcreatePart(2)+"-"+UUIDcreatePart(2)+"-"+UUIDcreatePart(2)+"-"+UUIDcreatePart(6)};utils.extend=(function(){var F=function(){};return function(Child,Parent){F.prototype=Parent.prototype;Child.prototype=new F();Child.__super__=Parent.prototype;Child.prototype.constructor=Child}}());utils.alert=function(msg){if(window.alert){window.alert(msg)}else{if(console&&console.log){console.log(msg)}}}});window.cordova=require("cordova");require("cordova/init")})();
   /**cordova_plugins.js**/
    cordova.define("cordova/plugin_list",function(c,a,b){b.exports=[{file:"plugins/org.apache.cordova.network-information/www/network.js",id:"org.apache.cordova.network-information.network",clobbers:["navigator.connection","navigator.network.connection"]},{file:"plugins/org.apache.cordova.network-information/www/Connection.js",id:"org.apache.cordova.network-information.Connection",clobbers:["Connection"]},{"file":"plugins/cordova-sqlite-storage/www/SQLitePlugin.js","id":"cordova-sqlite-storage.SQLitePlugin","pluginId":"cordova-sqlite-storage","clobbers":["SQLitePlugin"]},{"id":"cordova-plugin-wkwebview-engine.ios-wkwebview-exec","file":"plugins/cordova-plugin-wkwebview-engine/src/www/ios/ios-wkwebview-exec.js","pluginId":"cordova-plugin-wkwebview-engine","clobbers":["cordova.exec"]}];b.exports.metadata={"org.apache.cordova.network-information":"0.2.15"}});
    /**plugins/org.apache.cordova.network-information/www/network.js**/
    cordova.define("org.apache.cordova.network-information.network",function(a,b,c){function h(){this.type="unknown"}var i,j,k,d=a("cordova/exec"),e=a("cordova"),f=a("cordova/channel"),g=a("cordova/utils");"undefined"!=typeof navigator&&g.defineGetter(navigator,"onLine",function(){return"none"!=this.connection.type}),h.prototype.getInfo=function(a,b){d(a,b,"NetworkStatus","getConnectionInfo",[])},i=new h,j=null,k=500,f.createSticky("onCordovaConnectionReady"),f.waitForInitialization("onCordovaConnectionReady"),f.onCordovaReady.subscribe(function(){i.getInfo(function(a){i.type=a,"none"===a?j=setTimeout(function(){e.fireDocumentEvent("offline"),j=null},k):(null!==j&&(clearTimeout(j),j=null),e.fireDocumentEvent("online")),2!==f.onCordovaConnectionReady.state&&f.onCordovaConnectionReady.fire()},function(a){2!==f.onCordovaConnectionReady.state&&f.onCordovaConnectionReady.fire(),console.log("Error initializing Network Connection: "+a)})}),c.exports=i});
    /**plugins/org.apache.cordova.network-information/www/Connection.js**/
    cordova.define("org.apache.cordova.network-information.Connection",function(a,b,c){c.exports={UNKNOWN:"unknown",ETHERNET:"ethernet",WIFI:"wifi",CELL_2G:"2g",CELL_3G:"3g",CELL_4G:"4g",CELL:"cellular",NONE:"none"}});
     /**cordova-sqlite-storage.SQLitePlugin**/
    cordova.define("cordova-sqlite-storage.SQLitePlugin",function(require,exports,module){(function(){var DB_STATE_INIT,DB_STATE_OPEN,READ_ONLY_REGEX,SQLiteFactory,SQLitePlugin,SQLitePluginTransaction,SelfTest,argsArray,dblocations,iosLocationMap,newSQLError,nextTick,root,txLocks;root=this;READ_ONLY_REGEX=/^(\s|;)*(?:alter|create|delete|drop|insert|reindex|replace|update)/i;DB_STATE_INIT="INIT";DB_STATE_OPEN="OPEN";txLocks={};newSQLError=function(error,code){var sqlError;sqlError=error;if(!code){code=0}if(!sqlError){sqlError=new Error("a plugin had an error but provided no response");sqlError.code=code}if(typeof sqlError==="string"){sqlError=new Error(error);sqlError.code=code}if(!sqlError.code&&sqlError.message){sqlError.code=code}if(!sqlError.code&&!sqlError.message){sqlError=new Error("an unknown error was returned: "+JSON.stringify(sqlError));sqlError.code=code}return sqlError};nextTick=window.setImmediate||function(fun){window.setTimeout(fun,0)};argsArray=function(fun){return function(){var args,i,len;len=arguments.length;if(len){args=[];i=-1;while(++i<len){args[i]=arguments[i]}return fun.call(this,args)}else{return fun.call(this,[])}}};SQLitePlugin=function(openargs,openSuccess,openError){var dbname;if(!(openargs&&openargs["name"])){throw newSQLError("Cannot create a SQLitePlugin db instance without a db name")}dbname=openargs.name;if(typeof dbname!=="string"){throw newSQLError("sqlite plugin database name must be a string")}this.openargs=openargs;this.dbname=dbname;this.openSuccess=openSuccess;this.openError=openError;this.openSuccess||(this.openSuccess=function(){console.log("DB opened: "+dbname)});this.openError||(this.openError=function(e){console.log(e.message)});this.open(this.openSuccess,this.openError)};SQLitePlugin.prototype.databaseFeatures={isSQLitePluginDatabase:true};SQLitePlugin.prototype.openDBs={};SQLitePlugin.prototype.addTransaction=function(t){if(!txLocks[this.dbname]){txLocks[this.dbname]={queue:[],inProgress:false}}txLocks[this.dbname].queue.push(t);if(this.dbname in this.openDBs&&this.openDBs[this.dbname]!==DB_STATE_INIT){this.startNextTransaction()}else{if(this.dbname in this.openDBs){console.log("new transaction is waiting for open operation")}else{console.log("database is closed, new transaction is [stuck] waiting until db is opened again!")}}};SQLitePlugin.prototype.transaction=function(fn,error,success){if(!this.openDBs[this.dbname]){error(newSQLError("database not open"));return}this.addTransaction(new SQLitePluginTransaction(this,fn,error,success,true,false))};SQLitePlugin.prototype.readTransaction=function(fn,error,success){if(!this.openDBs[this.dbname]){error(newSQLError("database not open"));return}this.addTransaction(new SQLitePluginTransaction(this,fn,error,success,false,true))};SQLitePlugin.prototype.startNextTransaction=function(){var self;self=this;nextTick((function(_this){return function(){var txLock;if(!(_this.dbname in _this.openDBs)||_this.openDBs[_this.dbname]!==DB_STATE_OPEN){console.log("cannot start next transaction: database not open");return}txLock=txLocks[self.dbname];if(!txLock){console.log("cannot start next transaction: database connection is lost");return}else{if(txLock.queue.length>0&&!txLock.inProgress){txLock.inProgress=true;txLock.queue.shift().start()}}}})(this))};SQLitePlugin.prototype.abortAllPendingTransactions=function(){var j,len1,ref,tx,txLock;txLock=txLocks[this.dbname];if(!!txLock&&txLock.queue.length>0){ref=txLock.queue;for(j=0,len1=ref.length;j<len1;j++){tx=ref[j];tx.abortFromQ(newSQLError("Invalid database handle"))}txLock.queue=[];txLock.inProgress=false}};SQLitePlugin.prototype.open=function(success,error){var myfn,openerrorcb,opensuccesscb;if(this.dbname in this.openDBs){console.log("database already open: "+this.dbname);nextTick((function(_this){return function(){success(_this)}})(this))}else{console.log("OPEN database: "+this.dbname);opensuccesscb=(function(_this){return function(){var txLock;console.log("OPEN database: "+_this.dbname+" - OK");if(!_this.openDBs[_this.dbname]){console.log("database was closed during open operation")}if(_this.dbname in _this.openDBs){_this.openDBs[_this.dbname]=DB_STATE_OPEN}if(!!success){success(_this)}txLock=txLocks[_this.dbname];if(!!txLock&&txLock.queue.length>0&&!txLock.inProgress){_this.startNextTransaction()}}})(this);openerrorcb=(function(_this){return function(){console.log("OPEN database: "+_this.dbname+" FAILED, aborting any pending transactions");if(!!error){error(newSQLError("Could not open database"))}delete _this.openDBs[_this.dbname];_this.abortAllPendingTransactions()}})(this);this.openDBs[this.dbname]=DB_STATE_INIT;if(!txLocks[this.dbname]){myfn=function(tx){tx.addStatement("ROLLBACK")};this.addTransaction(new SQLitePluginTransaction(this,myfn,null,null,false,false))}cordova.exec(opensuccesscb,openerrorcb,"SQLitePlugin","open",[this.openargs])}};SQLitePlugin.prototype.close=function(success,error){if(this.dbname in this.openDBs){if(txLocks[this.dbname]&&txLocks[this.dbname].inProgress){console.log("cannot close: transaction is in progress");error(newSQLError("database cannot be closed while a transaction is in progress"));return}console.log("CLOSE database: "+this.dbname);delete this.openDBs[this.dbname];if(txLocks[this.dbname]){console.log("closing db with transaction queue length: "+txLocks[this.dbname].queue.length)}else{console.log("closing db with no transaction lock state")}cordova.exec(success,error,"SQLitePlugin","close",[{path:this.dbname}])}else{console.log("cannot close: database is not open");if(error){nextTick(function(){return error()})}}};SQLitePlugin.prototype.executeSql=function(statement,params,success,error){var myerror,myfn,mysuccess;mysuccess=function(t,r){if(!!success){return success(r)}};myerror=function(t,e){if(!!error){return error(e)}};myfn=function(tx){tx.addStatement(statement,params,mysuccess,myerror)};this.addTransaction(new SQLitePluginTransaction(this,myfn,null,null,false,false))};SQLitePlugin.prototype.sqlBatch=function(sqlStatements,success,error){var batchList,j,len1,myfn,st;if(!sqlStatements||sqlStatements.constructor!==Array){throw newSQLError("sqlBatch expects an array")}batchList=[];for(j=0,len1=sqlStatements.length;j<len1;j++){st=sqlStatements[j];if(st.constructor===Array){if(st.length===0){throw newSQLError("sqlBatch array element of zero (0) length")}batchList.push({sql:st[0],params:st.length===0?[]:st[1]})}else{batchList.push({sql:st,params:[]})}}myfn=function(tx){var elem,k,len2,results;results=[];for(k=0,len2=batchList.length;k<len2;k++){elem=batchList[k];results.push(tx.addStatement(elem.sql,elem.params,null,null))}return results};this.addTransaction(new SQLitePluginTransaction(this,myfn,error,success,true,false))};SQLitePluginTransaction=function(db,fn,error,success,txlock,readOnly){if(typeof fn!=="function"){throw newSQLError("transaction expected a function")}this.db=db;this.fn=fn;this.error=error;this.success=success;this.txlock=txlock;this.readOnly=readOnly;this.executes=[];if(txlock){this.addStatement("BEGIN",[],null,function(tx,err){throw newSQLError("unable to begin transaction: "+err.message,err.code)})}else{this.addStatement("SELECT 1",[],null,null)}};SQLitePluginTransaction.prototype.start=function(){var err;try{this.fn(this);this.run()}catch(error1){err=error1;txLocks[this.db.dbname].inProgress=false;this.db.startNextTransaction();if(this.error){this.error(newSQLError(err))}}};SQLitePluginTransaction.prototype.executeSql=function(sql,values,success,error){if(this.finalized){throw {message:"InvalidStateError: DOM Exception 11: This transaction is already finalized. Transactions are committed after its success or failure handlers are called. If you are using a Promise to handle callbacks, be aware that implementations following the A+ standard adhere to run-to-completion semantics and so Promise resolution occurs on a subsequent tick and therefore after the transaction commits.",code:11};return}if(this.readOnly&&READ_ONLY_REGEX.test(sql)){this.handleStatementFailure(error,{message:"invalid sql for a read-only transaction"});return}this.addStatement(sql,values,success,error)};SQLitePluginTransaction.prototype.addStatement=function(sql,values,success,error){var j,len1,params,sqlStatement,t,v;sqlStatement=typeof sql==="string"?sql:sql.toString();params=[];if(!!values&&values.constructor===Array){for(j=0,len1=values.length;j<len1;j++){v=values[j];t=typeof v;params.push((v===null||v===void 0?null:t==="number"||t==="string"?v:v.toString()))}}this.executes.push({success:success,error:error,sql:sqlStatement,params:params})};SQLitePluginTransaction.prototype.handleStatementSuccess=function(handler,response){var payload,rows;if(!handler){return}rows=response.rows||[];payload={rows:{item:function(i){return rows[i]},length:rows.length},rowsAffected:response.rowsAffected||0,insertId:response.insertId||void 0};handler(this,payload)};SQLitePluginTransaction.prototype.handleStatementFailure=function(handler,response){if(!handler){throw newSQLError("a statement with no error handler failed: "+response.message,response.code)}if(handler(this,response)!==false){throw newSQLError("a statement error callback did not return false: "+response.message,response.code)}};SQLitePluginTransaction.prototype.run=function(){var batchExecutes,handlerFor,i,mycb,mycbmap,request,tropts,tx,txFailure,waiting;txFailure=null;tropts=[];batchExecutes=this.executes;waiting=batchExecutes.length;this.executes=[];tx=this;handlerFor=function(index,didSucceed){return function(response){var err;if(!txFailure){try{if(didSucceed){tx.handleStatementSuccess(batchExecutes[index].success,response)}else{tx.handleStatementFailure(batchExecutes[index].error,newSQLError(response))}}catch(error1){err=error1;txFailure=newSQLError(err)}}if(--waiting===0){if(txFailure){tx.executes=[];tx.abort(txFailure)}else{if(tx.executes.length>0){tx.run()}else{tx.finish()}}}}};mycbmap={};i=0;while(i<batchExecutes.length){request=batchExecutes[i];mycbmap[i]={success:handlerFor(i,true),error:handlerFor(i,false)};tropts.push({qid:null,sql:request.sql,params:request.params});i++}mycb=function(result){var j,q,r,ref,res,resultIndex,type;for(resultIndex=j=0,ref=result.length-1;0<=ref?j<=ref:j>=ref;resultIndex=0<=ref?++j:--j){r=result[resultIndex];type=r.type;res=r.result;q=mycbmap[resultIndex];if(q){if(q[type]){q[type](res)}}}};cordova.exec(mycb,null,"SQLitePlugin","backgroundExecuteSqlBatch",[{dbargs:{dbname:this.db.dbname},executes:tropts}])};SQLitePluginTransaction.prototype.abort=function(txFailure){var failed,succeeded,tx;if(this.finalized){return}tx=this;succeeded=function(tx){txLocks[tx.db.dbname].inProgress=false;tx.db.startNextTransaction();if(tx.error&&typeof tx.error==="function"){tx.error(txFailure)}};failed=function(tx,err){txLocks[tx.db.dbname].inProgress=false;tx.db.startNextTransaction();if(tx.error&&typeof tx.error==="function"){tx.error(newSQLError("error while trying to roll back: "+err.message,err.code))}};this.finalized=true;if(this.txlock){this.addStatement("ROLLBACK",[],succeeded,failed);this.run()}else{succeeded(tx)}};SQLitePluginTransaction.prototype.finish=function(){var failed,succeeded,tx;if(this.finalized){return}tx=this;succeeded=function(tx){txLocks[tx.db.dbname].inProgress=false;tx.db.startNextTransaction();if(tx.success&&typeof tx.success==="function"){tx.success()}};failed=function(tx,err){txLocks[tx.db.dbname].inProgress=false;tx.db.startNextTransaction();if(tx.error&&typeof tx.error==="function"){tx.error(newSQLError("error while trying to commit: "+err.message,err.code))}};this.finalized=true;if(this.txlock){this.addStatement("COMMIT",[],succeeded,failed);this.run()}else{succeeded(tx)}};SQLitePluginTransaction.prototype.abortFromQ=function(sqlerror){if(this.error){this.error(sqlerror)}};dblocations=["docs","libs","nosync"];iosLocationMap={"default":"nosync","Documents":"docs","Library":"libs"};SQLiteFactory={openDatabase:argsArray(function(args){var dblocation,errorcb,okcb,openargs;if(args.length<1||!args[0]){throw newSQLError("Sorry missing mandatory open arguments object in openDatabase call")}if(args[0].constructor===String){throw newSQLError("Sorry first openDatabase argument must be an object")}openargs=args[0];if(!openargs.name){throw newSQLError("Database name value is missing in openDatabase call")}if(!openargs.iosDatabaseLocation&&!openargs.location&&openargs.location!==0){throw newSQLError("Database location or iosDatabaseLocation setting is now mandatory in openDatabase call.")}if(!!openargs.location&&!!openargs.iosDatabaseLocation){throw newSQLError("AMBIGUOUS: both location and iosDatabaseLocation settings are present in openDatabase call. Please use either setting, not both.")}dblocation=!!openargs.location&&openargs.location==="default"?iosLocationMap["default"]:!!openargs.iosDatabaseLocation?iosLocationMap[openargs.iosDatabaseLocation]:dblocations[openargs.location];if(!dblocation){throw newSQLError("Valid iOS database location could not be determined in openDatabase call")}openargs.dblocation=dblocation;if(!!openargs.createFromLocation&&openargs.createFromLocation===1){openargs.createFromResource="1"}if(!!openargs.androidDatabaseImplementation&&openargs.androidDatabaseImplementation===2){openargs.androidOldDatabaseImplementation=1}if(!!openargs.androidLockWorkaround&&openargs.androidLockWorkaround===1){openargs.androidBugWorkaround=1}okcb=null;errorcb=null;if(args.length>=2){okcb=args[1];if(args.length>2){errorcb=args[2]}}return new SQLitePlugin(openargs,okcb,errorcb)}),deleteDatabase:function(first,success,error){var args,dblocation,dbname;args={};if(first.constructor===String){throw newSQLError("Sorry first deleteDatabase argument must be an object")}else{if(!(first&&first["name"])){throw new Error("Please specify db name")}dbname=first.name;if(typeof dbname!=="string"){throw newSQLError("delete database name must be a string")}args.path=dbname}if(!first.iosDatabaseLocation&&!first.location&&first.location!==0){throw newSQLError("Database location or iosDatabaseLocation setting is now mandatory in deleteDatabase call.")}if(!!first.location&&!!first.iosDatabaseLocation){throw newSQLError("AMBIGUOUS: both location and iosDatabaseLocation settings are present in deleteDatabase call. Please use either setting value, not both.")}dblocation=!!first.location&&first.location==="default"?iosLocationMap["default"]:!!first.iosDatabaseLocation?iosLocationMap[first.iosDatabaseLocation]:dblocations[first.location];if(!dblocation){throw newSQLError("Valid iOS database location could not be determined in deleteDatabase call")}args.dblocation=dblocation;delete SQLitePlugin.prototype.openDBs[args.path];return cordova.exec(success,error,"SQLitePlugin","delete",[args])}};SelfTest={DBNAME:"___$$$___litehelpers___$$$___test___$$$___.db",start:function(successcb,errorcb){SQLiteFactory.deleteDatabase({name:SelfTest.DBNAME,location:"default"},(function(){return SelfTest.step1(successcb,errorcb)}),(function(){return SelfTest.step1(successcb,errorcb)}))},step1:function(successcb,errorcb){SQLiteFactory.openDatabase({name:SelfTest.DBNAME,location:"default"},function(db){var check1;check1=false;db.transaction(function(tx){tx.executeSql('SELECT UPPER("Test") AS upperText',[],function(ignored,resutSet){if(!resutSet.rows){return SelfTest.finishWithError(errorcb,"Missing resutSet.rows")}if(!resutSet.rows.length){return SelfTest.finishWithError(errorcb,"Missing resutSet.rows.length")}if(resutSet.rows.length!==1){return SelfTest.finishWithError(errorcb,"Incorrect resutSet.rows.length value: "+resutSet.rows.length+" (expected: 1)")}if(!resutSet.rows.item(0).upperText){return SelfTest.finishWithError(errorcb,"Missing resutSet.rows.item(0).upperText")}if(resutSet.rows.item(0).upperText!=="TEST"){return SelfTest.finishWithError(errorcb,"Incorrect resutSet.rows.item(0).upperText value: "+(resutSet.rows.item(0).upperText)+" (expected: 'TEST')")}check1=true},function(ignored,tx_sql_err){return SelfTest.finishWithError(errorcb,"TX SQL error: "+tx_sql_err)})},function(tx_err){return SelfTest.finishWithError(errorcb,"TRANSACTION error: "+tx_err)},function(){if(!check1){return SelfTest.finishWithError(errorcb,"Did not get expected upperText result data")}db.executeSql("BEGIN",null,function(ignored){return nextTick(function(){delete db.openDBs[SelfTest.DBNAME];delete txLocks[SelfTest.DBNAME];nextTick(function(){db.transaction(function(tx2){tx2.executeSql("SELECT 1")},function(tx_err){if(!tx_err){return SelfTest.finishWithError(errorcb,"Missing error object")}SelfTest.step2(successcb,errorcb)},function(){return SelfTest.finishWithError(errorcb,"Missing error object")})})})})})},function(open_err){return SelfTest.finishWithError(errorcb,"Open database error: "+open_err)})},step2:function(successcb,errorcb){SQLiteFactory.openDatabase({name:SelfTest.DBNAME,location:"default"},function(db){db.transaction(function(tx){tx.executeSql("SELECT ? AS myResult",[null],function(ignored,resutSet){if(!resutSet.rows){return SelfTest.finishWithError(errorcb,"Missing resutSet.rows")}if(!resutSet.rows.length){return SelfTest.finishWithError(errorcb,"Missing resutSet.rows.length")}if(resutSet.rows.length!==1){return SelfTest.finishWithError(errorcb,"Incorrect resutSet.rows.length value: "+resutSet.rows.length+" (expected: 1)")}SelfTest.step3(successcb,errorcb)})},function(txError){return SelfTest.finishWithError(errorcb,"UNEXPECTED TRANSACTION ERROR: "+txError)})},function(open_err){return SelfTest.finishWithError(errorcb,"Open database error: "+open_err)})},step3:function(successcb,errorcb){SQLiteFactory.openDatabase({name:SelfTest.DBNAME,location:"default"},function(db){return db.sqlBatch(["CREATE TABLE TestTable(id integer primary key autoincrement unique, data);",["INSERT INTO TestTable (data) VALUES (?);",["test-value"]]],function(){var firstid;firstid=-1;return db.executeSql("SELECT id, data FROM TestTable",[],function(resutSet){if(!resutSet.rows){SelfTest.finishWithError(errorcb,"Missing resutSet.rows");return}if(!resutSet.rows.length){SelfTest.finishWithError(errorcb,"Missing resutSet.rows.length");return}if(resutSet.rows.length!==1){SelfTest.finishWithError(errorcb,"Incorrect resutSet.rows.length value: "+resutSet.rows.length+" (expected: 1)");return}if(resutSet.rows.item(0).id===void 0){SelfTest.finishWithError(errorcb,"Missing resutSet.rows.item(0).id");return}firstid=resutSet.rows.item(0).id;if(!resutSet.rows.item(0).data){SelfTest.finishWithError(errorcb,"Missing resutSet.rows.item(0).data");return}if(resutSet.rows.item(0).data!=="test-value"){SelfTest.finishWithError(errorcb,"Incorrect resutSet.rows.item(0).data value: "+(resutSet.rows.item(0).data)+" (expected: 'test-value')");return}return db.transaction(function(tx){return tx.executeSql("UPDATE TestTable SET data = ?",["new-value"])},function(tx_err){return SelfTest.finishWithError(errorcb,"UPDATE transaction error: "+tx_err)},function(){var readTransactionFinished;readTransactionFinished=false;return db.readTransaction(function(tx2){return tx2.executeSql("SELECT id, data FROM TestTable",[],function(ignored,resutSet2){if(!resutSet2.rows){throw newSQLError("Missing resutSet2.rows")}if(!resutSet2.rows.length){throw newSQLError("Missing resutSet2.rows.length")}if(resutSet2.rows.length!==1){throw newSQLError("Incorrect resutSet2.rows.length value: "+resutSet2.rows.length+" (expected: 1)")}if(!resutSet2.rows.item(0).id){throw newSQLError("Missing resutSet2.rows.item(0).id")}if(resutSet2.rows.item(0).id!==firstid){throw newSQLError("resutSet2.rows.item(0).id value "+(resutSet2.rows.item(0).id)+" does not match previous primary key id value ("+firstid+")")}if(!resutSet2.rows.item(0).data){throw newSQLError("Missing resutSet2.rows.item(0).data")}if(resutSet2.rows.item(0).data!=="new-value"){throw newSQLError("Incorrect resutSet2.rows.item(0).data value: "+(resutSet2.rows.item(0).data)+" (expected: 'test-value')")}return readTransactionFinished=true})},function(tx2_err){return SelfTest.finishWithError(errorcb,"readTransaction error: "+tx2_err)},function(){if(!readTransactionFinished){SelfTest.finishWithError(errorcb,"readTransaction did not finish");return}return db.transaction(function(tx3){tx3.executeSql("DELETE FROM TestTable");return tx3.executeSql("INSERT INTO TestTable (data) VALUES(?)",[123])},function(tx3_err){return SelfTest.finishWithError(errorcb,"DELETE transaction error: "+tx3_err)},function(){var secondReadTransactionFinished;secondReadTransactionFinished=false;return db.readTransaction(function(tx4){return tx4.executeSql("SELECT id, data FROM TestTable",[],function(ignored,resutSet3){if(!resutSet3.rows){throw newSQLError("Missing resutSet3.rows")}if(!resutSet3.rows.length){throw newSQLError("Missing resutSet3.rows.length")}if(resutSet3.rows.length!==1){throw newSQLError("Incorrect resutSet3.rows.length value: "+resutSet3.rows.length+" (expected: 1)")}if(!resutSet3.rows.item(0).id){throw newSQLError("Missing resutSet3.rows.item(0).id")}if(resutSet3.rows.item(0).id===firstid){throw newSQLError("resutSet3.rows.item(0).id value "+(resutSet3.rows.item(0).id)+" incorrectly matches previous unique key id value value ("+firstid+")")}if(!resutSet3.rows.item(0).data){throw newSQLError("Missing resutSet3.rows.item(0).data")}if(resutSet3.rows.item(0).data!==123){throw newSQLError("Incorrect resutSet3.rows.item(0).data value: "+(resutSet3.rows.item(0).data)+" (expected 123)")}return secondReadTransactionFinished=true})},function(tx4_err){return SelfTest.finishWithError(errorcb,"second readTransaction error: "+tx4_err)},function(){if(!secondReadTransactionFinished){SelfTest.finishWithError(errorcb,"second readTransaction did not finish");return}return db.close(function(){return SQLiteFactory.deleteDatabase({name:SelfTest.DBNAME,location:"default"},successcb,function(cleanup_err){if(/Windows /.test(navigator.userAgent)||/IEMobile/.test(navigator.userAgent)){console.log("IGNORE CLEANUP (DELETE) ERROR: "+(JSON.stringify(cleanup_err))+" (Windows/WP8)");successcb();return}return SelfTest.finishWithError(errorcb,"Cleanup error: "+cleanup_err)})},function(close_err){if(/Windows /.test(navigator.userAgent)||/IEMobile/.test(navigator.userAgent)){console.log("IGNORE close ERROR: "+(JSON.stringify(close_err))+" (Windows/WP8)");SQLiteFactory.deleteDatabase({name:SelfTest.DBNAME,location:"default"},successcb,successcb);return}return SelfTest.finishWithError(errorcb,"close error: "+close_err)})})})})})},function(select_err){return SelfTest.finishWithError(errorcb,"SELECT error: "+select_err)})},function(batch_err){return SelfTest.finishWithError(errorcb,"sql batch error: "+batch_err)})},function(open_err){return SelfTest.finishWithError(errorcb,"Open database error: "+open_err)})},finishWithError:function(errorcb,message){console.log("selfTest ERROR with message: "+message);SQLiteFactory.deleteDatabase({name:SelfTest.DBNAME,location:"default"},function(){return errorcb(newSQLError(message))},function(err2){return errorcb(newSQLError("Cleanup error: "+err2+" for error: "+message))})}};root.sqlitePlugin={sqliteFeatures:{isSQLitePlugin:true},echoTest:function(okcb,errorcb){var error,ok;ok=function(s){if(s==="test-string"){return okcb()}else{return errorcb("Mismatch: got: '"+s+"' expected 'test-string'")}};error=function(e){return errorcb(e)};return cordova.exec(ok,error,"SQLitePlugin","echoStringValue",[{value:"test-string"}])},selfTest:SelfTest.start,openDatabase:SQLiteFactory.openDatabase,deleteDatabase:SQLiteFactory.deleteDatabase}}).call(this)});
     /*ios-wkwebview-exec.js*/
    cordova.define("cordova-plugin-wkwebview-engine.ios-wkwebview-exec",function(require,exports,module){var cordova=require("cordova");var utils=require("cordova/utils");var base64=require("cordova/base64");function massageArgsJsToNative(args){if(!args||utils.typeName(args)!=="Array"){return args}var ret=[];args.forEach(function(arg,i){if(utils.typeName(arg)==="ArrayBuffer"){ret.push({"CDVType":"ArrayBuffer","data":base64.fromArrayBuffer(arg)})}else{ret.push(arg)}});return ret}function massageMessageNativeToJs(message){if(message.CDVType==="ArrayBuffer"){var stringToArrayBuffer=function(str){var ret=new Uint8Array(str.length);for(var i=0;i<str.length;i++){ret[i]=str.charCodeAt(i)}return ret.buffer};var base64ToArrayBuffer=function(b64){return stringToArrayBuffer(atob(b64))};message=base64ToArrayBuffer(message.data)}return message}function convertMessageToArgsNativeToJs(message){var args=[];if(!message||!message.hasOwnProperty("CDVType")){args.push(message)}else{if(message.CDVType==="MultiPart"){message.messages.forEach(function(e){args.push(massageMessageNativeToJs(e))})}else{args.push(massageMessageNativeToJs(message))}}return args}var iOSExec=function(){var successCallback,failCallback,service,action,actionArgs;var callbackId=null;if(typeof arguments[0]!=="string"){successCallback=arguments[0];failCallback=arguments[1];service=arguments[2];action=arguments[3];actionArgs=arguments[4];callbackId="INVALID"}else{throw new Error("The old format of this exec call has been removed (deprecated since 2.1). Change to: "+"cordova.exec(null, null, 'Service', 'action', [ arg1, arg2 ]);")}actionArgs=actionArgs||[];if(successCallback||failCallback){callbackId=service+cordova.callbackId++;cordova.callbacks[callbackId]={success:successCallback,fail:failCallback}}actionArgs=massageArgsJsToNative(actionArgs);var command=[callbackId,service,action,JSON.parse(JSON.stringify(actionArgs))];window.webkit.messageHandlers.cordova.postMessage(command)};iOSExec.nativeCallback=function(callbackId,status,message,keepCallback,debug){var success=status===0||status===1;var args=convertMessageToArgsNativeToJs(message);setTimeout(function(){cordova.callbackFromNative(callbackId,success,status,args,keepCallback)},0)};iOSExec.nativeEvalAndFetch=function(func){try{func()}catch(e){console.log(e)}};function cordovaExec(){var cexec=require("cordova/exec");var cexec_valid=(typeof cexec.nativeFetchMessages==="function")&&(typeof cexec.nativeEvalAndFetch==="function")&&(typeof cexec.nativeCallback==="function");return(cexec_valid&&execProxy!==cexec)?cexec:iOSExec}function execProxy(){cordovaExec().apply(null,arguments)}execProxy.nativeFetchMessages=function(){return cordovaExec().nativeFetchMessages.apply(null,arguments)};execProxy.nativeEvalAndFetch=function(){return cordovaExec().nativeEvalAndFetch.apply(null,arguments)};execProxy.nativeCallback=function(){return cordovaExec().nativeCallback.apply(null,arguments)};module.exports=execProxy;if(window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.cordova&&window.webkit.messageHandlers.cordova.postMessage){cordova.define.remove("cordova/exec");cordova.define("cordova/exec",function(require,exports,module){module.exports=execProxy})}});
};

function isYzsIos(){
     if(yzsVersion < "3.6.5"){
         uiWebView();
     }else{
         wkWebView();
     }
     yzsBridge.ios.chooseImage=function (obj){
            var option= objExtend({
                count:9,
                width:200,
                height:200,
                crop:false,
                success: function (data) {},
                error:function(data){}
            },obj);
            cordova.exec(function(data){
            for(var i=0;i<data.images.length;i++){
                //3.4.0及之前的版本不会返回isOriginal字段
                var isOriginal = data.images[i].isOriginal;
                if(typeof(isOriginal) == 'undefined'){
                  data.images[i].isOriginal = false;
                }

                 //3.5.2之前的版本不会返回exif字段
                var exif = data.images[i].exif;
                if(typeof(exif) == 'undefined'){
                  data.images[i].exif = {};
                }
            };
            option.success(data)
        }, option.error, "MysoftPlugin", "chooseImage",[{maxCount:option.count,width:option.width,height:option.height,crop:option.crop}]);
        };

        yzsBridge.ios.previewImage=function(obj){
            var option= objExtend({
                current: '',
                urls: [],
                success:function(){},
                error:function(){}
            },obj);
            cordova.exec(option.success, option.error, "MysoftPlugin", "previewImage",[{
                current: option.current,
                urls:option.urls
            }]);
        };

        yzsBridge.ios.uploadImage = function (obj){
            var option= objExtend({
                localIds: [],
                appCode:'3000',
                sync:false,
                maxSize:300,
                isOriginal:false,
                success: function (res) {},
                error:function(res){},
                progress:function(index,total){},
                params: 100
            },obj);
            if(window.tplData && tplData.APP_CODE){
                option.appCode=tplData.APP_CODE;
            }
            if(option.localIds.length<1){
               var errObj={
                   "code":-1,
                   "message":"参数错误"
                };
                option.error(errObj);
                return;
            }
            upload(0,option.localIds[0]);
            var resobj={
                "errMsg":"uploadImage:ok",
                "images":[]
            };
            function upload(num,curStr){
                cordova.exec(function(data){
                    option.progress(num+1, option.localIds.length);
                    resobj.images.push({
                        localId:data[0].local_id,
                        url:data[0].server_url,
            thumb:data[0].thumb?data[0].thumb:data[0].server_url+"?x-oss-process=image/resize,m_fixed,h_100,w_100",
                    })
                    if(num < option.localIds.length-1){
                        upload(num+1,option.localIds[num+1]);
                    }else{
                        option.success(resobj);
                    }
                }, option.error, "MysoftPlugin", "uploadImage",[{
                    appCode:option.appCode,
                    maxSize:option.maxSize,
                    sync: option.sync,
                    percent:option.params,
                    isOriginal:option.isOriginal,
                    urls:[option.localIds[num]]
                }]);
            }
        };

        yzsBridge.ios.uploadImageV2 = function(obj){
        var option= objExtend({
            localId: "",
            appCode:'0001',
            sync: false,
            maxSize:300,
            isOriginal:false,
            interval:1000,
            success: function (res) {},
            error:function(res){},
            progress:function(res){}
        },obj);
        if(window.tplData && tplData.APP_CODE){
            option.appCode=tplData.APP_CODE;
        }
        if(yzsVersion < "3.5.1"){
            option.error({"code":-1,message:"请升级到最新版本的云助手"});
            return;
        }
        if(option.localId.length<1){
            var errObj={
                "code":-1,
                "message":"参数错误"
            };
            option.error(errObj);
            return;
        }
        upload();
        function upload(){
            cordova.exec(function(data){
                var resObj = {};
                 resObj.localId = data.localResourceId;
                 resObj.url = data.serverUrl;
                 if(resObj.url){
                     resObj.thumb = resObj.url+"?x-oss-process=image/resize,m_fixed,h_100,w_100";
                 }else{
                     resObj.thumb = "";
                 }
                if(option.sync){
                    resObj.progress = data.progress;
                    if(data.code == 0){
                        option.progress(resObj);
                     }else{
                        option.success(resObj);
                     }
                 }else{
                    option.success(resObj);
                 }
            }, option.error, 'MysoftPlugin', 'uploadImageV2', [{
                   "appCode":option.appCode,
                   "maxSize":option.maxSize,
                   "sync":option.sync,
                   "isOriginal":option.isOriginal,
                   "localId":option.localId,
                   "interval":option.interval,
                 }]);
            }
         }

        yzsBridge.ios.getPictureById = function(obj) {
            var option = objExtend({
                ids: [],
                maxSize: 300,
                success: function(res) {},
                error: function(res) {}
            }, obj);
            cordova.exec(function(data){
                var res = [];
                for(var i=0; i<data.length; i++){
                    res.push({'localResourceId':data[i].localId,'data':data[i].base64});
                }
                option.success(res);
            }, option.error, "MysoftPlugin", "getImageByLocalid", [{
                maxSize: option.maxSize,
                localIds: option.ids
            }]);
        };

        yzsBridge.ios.closeWindow = function(obj){
          var option = objExtend({
                 success: function (res) {},
                 error: function (res) {}
            },obj);
            cordova.exec(option.success, option.error, "MysoftPlugin", "close", []);
        };

        yzsBridge.ios.enableLandscape = function(bool) {
            setTimeout(function() {
                cordova.exec(null, null, "MysoftPlugin", "enableLandscape", [bool]);
            },1)
        };

        yzsBridge.ios.onBusinessStatusChanged = function(obj) {
          var option = objExtend({
              success: function (res) {},
              error:function(res){}
            },obj);
            cordova.exec(option.success,option.error, "MysoftPlugin", "onBusinessStatusChanged", []);
        };

        yzsBridge.ios.onBusinessProcessRemoved = function(obj) {
          var option = objExtend({
              success: function (res) {},
              error:function(res){}
            },obj);
            cordova.exec(option.success,option.error, "MysoftPlugin", "onBusinessProcessRemoved", []);
        };

        yzsBridge.ios.onBadgeChanged = function(obj){
          var option = objExtend({
              success: function (res) {},
              error:function(res){}
            },obj);
            cordova.exec(option.success,option.error, "MysoftPlugin", "onBadgeChanged", []);
        };

        yzsBridge.ios.goBack = function(obj){
          var option = objExtend({
                success: function (res) {},
                error: function (res) {}
            },obj);
          cordova.exec(option.success,option.error, 'MysoftPlugin','goBack', []);
      };

      yzsBridge.ios.showTitleBar = function(bool){
         cordova.exec(null,null, 'MysoftPlugin','hideNavigateionBar', [!bool]);
      };

      yzsBridge.ios.setTitle = function(str){
         cordova.exec(null,null, 'MysoftPlugin', 'SetNavigateionTitle', [str]);
      };

      yzsBridge.ios.getDeviceInfo = function(obj){
          var option = objExtend({
              success:function(res){},
              error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MysoftPlugin','getDeviceInfo', []);
      };

      yzsBridge.ios.getNetworkType = function(obj){
          var networkState = navigator.connection.type;
          var states = {};
          var option= objExtend({
              success:function(){},
              error:function(){}
          },obj);
          var resobj={
              "networkType":''
          };

          states[Connection.UNKNOWN]  = 'Unknown connection';
          states[Connection.ETHERNET] = 'Ethernet connection';
          states[Connection.WIFI]     = 'wifi';
          states[Connection.CELL_2G]  = '2g';
          states[Connection.CELL_3G]  = '3g';
          states[Connection.CELL_4G]  = '4g';
          states[Connection.CELL]     = 'Cell generic connection';
          states[Connection.NONE]     = 'No network connection';

          resobj.networkType =states[networkState];
          option.success(resobj);
          //return states[networkState];
      };

      yzsBridge.ios.getDeviceLocation = function(obj){
          var option = objExtend({
            targetAccuracy:2,
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MysoftPlugin','getDeviceLocation', [{targetAccuracy:option.targetAccuracy}]);
      };

      yzsBridge.ios.setHeadViewRight = function(obj){
          var option = objExtend({
            isShow:true,
            text:'',
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MysoftPlugin','setHeadViewRight', [{isShow:option.isShow,text:option.text}]);
      };

      yzsBridge.ios.share = function(obj){
          var option = objExtend({
            type:0,
            url:'',
            title:'',
            content:'',
            image:'',
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MysoftPlugin','share', [{type:option.type,url:option.url, title:option.title, content:option.content, image:option.image}]);
      };

      yzsBridge.ios.openWindow = function(obj){
          var option = objExtend({
            url:'',
            openWay:0,
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MysoftPlugin', 'openWindow', [{url:option.url,openWay:option.openWay}]);
      };

      yzsBridge.ios.checkInstalledApps = function(obj){
          var option = objExtend({
            apps:[],
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success, option.error, 'MysoftPlugin', 'checkInstalledApps', [{apps:option.apps}]);
      };

      yzsBridge.ios.getAppsInfo = function(obj){
      var option = objExtend({
           apps:[],
           success:function(res){},
           error:function(res){}
      },obj);
      option.error({code:-1,message:"暂不支持此方法"});
    };

      yzsBridge.ios.launchApp = function(obj){
          var option = objExtend({
            app:'',
              success:function(res){},
              error:function(res){}
          },obj);
          cordova.exec(option.success, option.error, 'MysoftPlugin', 'launchApp', [{app:option.app}]);
      };

      yzsBridge.ios.setProgressBarColor = function(obj){
          var option = objExtend({
            color:'',
              success:function(res){},
              error:function(res){}
          },obj);
          cordova.exec(option.success, option.error, 'MysoftPlugin', 'setProgressBarColor', [{color:option.color}]);
      };

      yzsBridge.ios.modal = function(obj){
          var option = objExtend({
            entity:[],
            buttonLabels:[],
              success:function(res){},
              error:function(res){}
          },obj);
          cordova.exec(option.success, option.error, 'MysoftPlugin', 'modal', [{entity:option.entity,buttonLabels:option.buttonLabels}]);
      };

       yzsBridge.ios.scan = function(obj){
         var option = objExtend({
          scanMode:0,
          success:function(res){},
          error:function(res){}
          },obj);
           cordova.exec(option.success,option.error, 'MysoftPlugin', 'scan', [{scanMode:option.scanMode}]);
      };

      yzsBridge.ios.isImEnable = function(obj){
         var option = objExtend({
          success:function(res){},
          error:function(res){}
          },obj);
          if(yzsVersion>="3.4.0"){
              cordova.exec(option.success,option.error, 'MysoftPlugin', 'isImEnable', []);
          }else{
              option.success({"code":0,enable:false,message:""});
          }
      };

      yzsBridge.ios.createDiscussionGroup = function(obj){
          var option = objExtend({
            name:"",
            topic:{
            },
            optionalMember:[],
            businessId:"",
            memberFrom:"",
            extra:"",
            appCode:"20000",
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MysoftPlugin','createDiscussionGroup', [{name:option.name,topic:option.topic, optionalMember:option.optionalMember, businessId:option.businessId, memberFrom:option.memberFrom, extra:option.extra,appCode:option.appCode}]);
      };

      yzsBridge.ios.openDiscussionGroup = function(obj){
          var option = objExtend({
            discussionGroupId:"",
            discussionGroupName:"",
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MysoftPlugin','openDiscussionGroup', [{discussionGroupId:option.discussionGroupId,discussionGroupName:option.discussionGroupName}]);
      };
        
        yzsBridge.ios.createConversation = function(obj){
          var option = objExtend({
            topic:{},
            talkTo:{},
            imageLocalResourceId:"",
            mode:"share",
            extra:"",
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MysoftPlugin','createConversation', [{topic:option.topic,talkTo:option.talkTo,imageLocalResourceId:option.imageLocalResourceId,mode:option.mode, extra:option.extra}]);
      };

      yzsBridge.ios.screenShot = function(obj){
          var option = objExtend({
            watermark:false,
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MysoftPlugin','screenShot', [{watermark:option.watermark}]);
      };

      yzsBridge.ios.openContactDetail = function(obj){
          var option = objExtend({
            topic:{},
            userId:"123",
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MysoftPlugin','openContactDetail', [{topic:option.topic,userId:option.userId}]);
      };

     yzsBridge.ios.chooseContact = function(obj){
          var option = objExtend({
            max:-1,
            limitTips:"人数超过最大限制",
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MysoftPlugin','chooseContact', [{max:option.max,limitTips:option.limitTips}]);
     };

      yzsBridge.ios.alert = function(obj){
          var option = objExtend({
            message:"",
            title:"",
            buttonName:"",
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MysoftPlugin','alert', [{message:option.message,title:option.title,buttonName:option.buttonName}]);
     };

     yzsBridge.ios.confirm = function(obj){
          var option = objExtend({
            message:"",
            title:"",
            buttonLabels:[],
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MysoftPlugin','confirm', [{message:option.message,title:option.title,buttonLabels:option.buttonLabels}]);
     };

     yzsBridge.ios.prompt = function(obj){
          var option = objExtend({
            message:"",
            title:"",
            buttonLabels:[],
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MysoftPlugin','prompt', [{message:option.message,title:option.title,buttonLabels:option.buttonLabels}]);
     };

     yzsBridge.ios.toast = function(obj){
          var option = objExtend({
            text:"",
            duration:2000,
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MysoftPlugin','toast', [{text:option.text,duration:option.duration}]);
     };

     yzsBridge.ios.actionSheet = function(obj){
          var option = objExtend({
            title:"",
            cancelButton:"",
            otherButtons:[],
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MysoftPlugin','actionSheet', [{title:option.title,cancelButton:option.cancelButton,otherButtons:option.otherButtons}]);
     };

     yzsBridge.ios.buryingPoint = function(obj){
          var option = objExtend({
            eventId:0,
            eventType:0,
            value:{},
            startTime:-1,
            endTime:0,
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MysoftPlugin','buryingPoint', [{eventId:option.eventId,eventType:option.eventType,value:option.value,startTime:option.startTime,endTime:option.endTime}]);
     };

    yzsBridge.ios.graffiti = function(obj){
          var option = objExtend({
            url:"",
            rightBtn:"完成",
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MysoftPlugin','graffiti', [{url:option.url,rightBtn:option.rightBtn}]);
     };

     yzsBridge.ios.watchShake = function(obj){
          var option = objExtend({
            callbackDelay:3000,
            vibrating:true,
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MysoftPlugin','watchShake', [{callbackDelay:option.callbackDelay,vibrating:option.vibrating}]);
     };

     yzsBridge.ios.clearShake = function(obj){
          var option = objExtend({
            success:function(res){},
            error:function(res){}
          },obj);
          cordova.exec(option.success,option.error, 'MysoftPlugin','clearShake', []);
     };

    yzsBridge.ios.openDatabase = function(arg,success,error){
      if(yzsVersion>="3.5.2"){
            return window.sqlitePlugin.openDatabase(arg,success,error);
        }else{
           if(error){
              error("请升级到最新版本云助手")
           }
        }
    };

    yzsBridge.ios.deleteDatabase = function(arg,success,error){
      if(yzsVersion>="3.5.2"){
            return window.sqlitePlugin.deleteDatabase(arg,success,error);
        }else{
           if(error){
              error("请升级到最新版本云助手")
           }
        }
    };

     yzsBridge.ios.startRecord = function(obj){
          var option = objExtend({
            success:function(res){},
            error:function(res){}
          },obj);

         if(yzsVersion>="3.5.5"){
             cordova.exec(option.success,option.error, 'MysoftPlugin','startRecord', []);
         }else{
           option.error({"code":-1,message:"请升级到最新版本的云助手"});
        }
    };

    yzsBridge.ios.stopRecord = function(obj){
          var option = objExtend({
            success:function(res){},
            error:function(res){}
          },obj);

         if(yzsVersion>="3.5.5"){
             cordova.exec(option.success,option.error, 'MysoftPlugin','stopRecord', []);
         }else{
           option.error({"code":-1,message:"请升级到最新版本的云助手"});
        }
    };

    yzsBridge.ios.playVoice = function(obj){
          var option = objExtend({
            localId:"",
            success:function(res){},
            error:function(res){}
          },obj);

         if(yzsVersion>="3.5.5"){
             cordova.exec(option.success,option.error, 'MysoftPlugin','playVoice', [{localId:option.localId}]);
         }else{
           option.error({"code":-1,message:"请升级到最新版本的云助手"});
        }
    };

    yzsBridge.ios.onVoicePlayEnd = function(obj){
          var option = objExtend({
            success:function(res){},
            error:function(res){}
          },obj);

         if(yzsVersion>="3.5.5"){
             cordova.exec(option.success,option.error, 'MysoftPlugin','onVoicePlayEnd', []);
         }else{
           option.error({"code":-1,message:"请升级到最新版本的云助手"});
        }
    };

    yzsBridge.ios.pauseVoice = function(obj){
          var option = objExtend({
            localId:"",
            success:function(res){},
            error:function(res){}
          },obj);

         if(yzsVersion>="3.5.5"){
             cordova.exec(option.success,option.error, 'MysoftPlugin','pauseVoice', [{localId:option.localId}]);
         }else{
           option.error({"code":-1,message:"请升级到最新版本的云助手"});
        }
    };

    yzsBridge.ios.stopVoice = function(obj){
          var option = objExtend({
            localId:"",
            success:function(res){},
            error:function(res){}
          },obj);

         if(yzsVersion>="3.5.5"){
             cordova.exec(option.success,option.error, 'MysoftPlugin','stopVoice', [{localId:option.localId}]);
         }else{
           option.error({"code":-1,message:"请升级到最新版本的云助手"});
        }
    };

    yzsBridge.ios.uploadVoice = function(obj){
          var option = objExtend({
            localId:"",
            success:function(res){},
            error:function(res){}
          },obj);

         if(yzsVersion>="3.5.5"){
             cordova.exec(option.success,option.error, 'MysoftPlugin','uploadVoice', [{localId:option.localId}]);
         }else{
           option.error({"code":-1,message:"请升级到最新版本的云助手"});
        }
    };

    yzsBridge.ios.translateVoice = function(obj){
          var option = objExtend({
            localId:"",
            success:function(res){},
            error:function(res){}
          },obj);

         if(yzsVersion>="3.5.5"){
             cordova.exec(option.success,option.error, 'MysoftPlugin','translateVoice', [{localId:option.localId}]);
         }else{
           option.error({"code":-1,message:"请升级到最新版本的云助手"});
        }
    };

    yzsBridge.ios.topic = function(obj){
          var option = objExtend({
            businessId:"",
            topic:{},
            success:function(res){},
            error:function(res){}
          },obj);

         if(yzsVersion>="3.6.2"){
             cordova.exec(option.success,option.error, 'MysoftPlugin','topic', [{businessId:option.businessId,topic:option.topic,appCode:option.appCode}]);
         }else{
           option.error({"code":-1,message:"请升级到最新版本的云助手"});
        }
    };

    yzsBridge.ios.pay = function(obj){
          var option = objExtend({
            money:0,
            success:function(res){},
            error:function(res){}
          },obj);

        cordova.exec(option.success,option.error, 'MysoftPlugin','pay', [{money:option.money}]);
    };
};

//所有插件增加appCode字段，如果没有则用tplData.APP_CODE,否则用20000
function objExtend(obj1,obj2){
  for(var key in obj2){
    obj1[key]= obj2[key];
  }
  //
  if(!obj1.appCode){
      obj1.appCode = (typeof tplData!="undefined" && tplData.APP_CODE)?tplData.APP_CODE:"20000";
  }
  console.log("appCode:"+obj1.appCode);
  return obj1;
}
}();