!function i(r,s,c){function l(t,e){if(!s[t]){if(!r[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(u)return u(t,!0);var a=new Error("Cannot find module '"+t+"'");throw a.code="MODULE_NOT_FOUND",a}var o=s[t]={exports:{}};r[t][0].call(o.exports,function(e){return l(r[t][1][e]||e)},o,o.exports,i,r,s,c)}return s[t].exports}for(var u="function"==typeof require&&require,e=0;e<c.length;e++)l(c[e]);return l}({1:[function(e,t,n){"use strict";function o(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._listeners={}}var t,n,a;return t=e,(n=[{key:"on",value:function(e,t){(this._listeners[e]=this._listeners[e]||[]).push(t)}},{key:"trigger",value:function(e,t){(this._listeners[e]||[]).forEach(function(e){return e(t)})}},{key:"off",value:function(e){delete this._listeners[e]}}])&&o(t.prototype,n),a&&o(t,a),e}();n.default=a},{}],2:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a,o=(a=e("./store"))&&a.__esModule?a:{default:a};function i(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var r=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.cookies={}}var t,n,a;return t=e,(n=[{key:"httpSend",value:function(e,t,n){var a=e.url,o=e.options;fetch(a,o).then(function(e){e.ok?e.json().then(function(e){t(e)}):n(e)}).catch(function(e){n(e)})}},{key:"getConfigData",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null;return o.default.getConfigData(e)}},{key:"objectToQueryString",value:function(t){return Object.keys(t).map(function(e){return"".concat(encodeURIComponent(e),"=").concat(encodeURIComponent(t[e]))}).join("&")}},{key:"sendToBackground",value:function(e,t,n){chrome.runtime.sendMessage({method:e,data:t},n)}},{key:"showToast",value:function(e,t){window.postMessage({type:"showToast",data:{message:e,type:t}},location.origin)}},{key:"getHashParameter",value:function(e){var t=window.location.hash.substr(1);return new URLSearchParams(t).get(e)}},{key:"formatCookies",value:function(){var e=[];for(var t in this.cookies)e.push("".concat(t,"=").concat(this.cookies[t]));return e.join("; ")}},{key:"getHeader",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"RPC",t=[];t.push("User-Agent: ".concat(this.getConfigData("userAgent"))),t.push("Referer: ".concat(this.getConfigData("referer"))),0<Object.keys(this.cookies).length&&t.push("Cookie: ".concat(this.formatCookies()));var n=this.getConfigData("headers");return n&&n.split("\n").forEach(function(e){t.push(e)}),"RPC"===e?t:"aria2Cmd"===e?t.map(function(e){return"--header ".concat(JSON.stringify(e))}).join(" "):"aria2c"===e?t.map(function(e){return" header=".concat(e)}).join("\n"):"idm"===e?t.map(function(e){var t=e.split(": ");return"".concat(t[0].toLowerCase(),": ").concat(t[1])}).join("\r\n"):void 0}},{key:"parseURL",value:function(e){var t=new URL(e),n=t.username?"".concat(t.username,":").concat(decodeURI(t.password)):null;n&&(n.includes("token:")||(n="Basic ".concat(btoa(n))));var a=t.hash.substr(1),o={},i=new URLSearchParams(a),r=!0,s=!1,c=void 0;try{for(var l,u=i[Symbol.iterator]();!(r=(l=u.next()).done);r=!0){var d=l.value;o[d[0]]=2===d.length?d[1]:"enabled"}}catch(e){s=!0,c=e}finally{try{r||null==u.return||u.return()}finally{if(s)throw c}}return{authStr:n,path:t.origin+t.pathname,options:o}}},{key:"generateParameter",value:function(e,t,n){e&&e.startsWith("token")&&n.params.unshift(e);var a={url:t,options:{method:"POST",headers:{"Content-type":"application/x-www-form-urlencoded; charset=UTF-8"},body:JSON.stringify(n)}};return e&&e.startsWith("Basic")&&(a.options.headers.Authorization=e),a}},{key:"getVersion",value:function(e,t){var n=this.parseURL(e),a=n.authStr,o=n.path;this.sendToBackground("rpcVersion",this.generateParameter(a,o,{jsonrpc:"2.0",method:"aria2.getVersion",id:1,params:[]}),function(e){t.innerText=e?"Aria2版本为: ".concat(e):"错误,请查看是否开启Aria2"})}},{key:"copyText",value:function(e){var t=document.createElement("textarea");document.body.appendChild(t),t.value=e,t.focus(),t.select();var n=document.execCommand("copy");t.remove(),n?this.showToast("拷贝成功~","success"):this.showToast("拷贝失败 QAQ","failure")}},{key:"requestCookies",value:function(e){var t=this;this.sendToBackground("getCookies",e,function(e){t.cookies=e})}},{key:"aria2RPCMode",value:function(e,t){var r=this,n=this.parseURL(e),s=n.authStr,c=n.path,l=n.options;t.forEach(function(e){var t={jsonrpc:"2.0",method:"aria2.addUri",id:(new Date).getTime(),params:[[e.link],{out:e.name,header:r.getHeader()}]},n=r.getConfigData("md5Check"),a=t.params[1],o=r.getConfigData("downloadPath");if(o&&(a.dir=o),n&&(a.checksum="md5=".concat(e.md5)),l)for(var i in l)a[i]=l[i];r.sendToBackground("rpcData",r.generateParameter(s,c,t),function(e){e?r.showToast("下载成功!赶紧去看看吧~","success"):r.showToast("下载失败!是不是没有开启Aria2?","failure")})})}},{key:"aria2TXTMode",value:function(e){var o=this,i=[],r=[],s=[],c=[],t="data:text/plain;charset=utf-8,";e.forEach(function(e){var t="aria2c -c -s10 -k1M -x16 --enable-rpc=false -o ".concat(JSON.stringify(e.name)," ").concat(o.getHeader("aria2Cmd")," ").concat(JSON.stringify(e.link)),n=[e.link,o.getHeader("aria2c")," out=".concat(e.name)].join("\n");o.getConfigData("md5Check")&&(t+=" --checksum=md5=".concat(e.md5),n+="\n checksum=md5=".concat(e.md5)),i.push(t),r.push(n);var a=["<",e.link,o.getHeader("idm"),">"].join("\r\n");s.push(a),c.push(e.link)}),document.querySelector("#aria2CmdTxt").value="".concat(i.join("\n")),document.querySelector("#aria2Txt").href="".concat(t).concat(encodeURIComponent(r.join("\n"))),document.querySelector("#idmTxt").href="".concat(t).concat(encodeURIComponent(s.join("\r\n")+"\r\n")),document.querySelector("#downloadLinkTxt").href="".concat(t).concat(encodeURIComponent(c.join("\n"))),document.querySelector("#copyDownloadLinkTxt").dataset.link=c.join("\n")}}])&&i(t.prototype,n),a&&i(t,a),e}());n.default=r},{"./store":4}],3:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a,o=(a=e("./core"))&&a.__esModule?a:{default:a};function i(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var r=function(){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.listParameter=e,this.fileDownloadInfo=[],this.currentTaskId=0,this.completedCount=0,this.folders=[],this.files={}}var e,n,a;return e=t,(n=[{key:"start",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:300,t=1<arguments.length?arguments[1]:void 0;this.interval=e,this.done=t,this.currentTaskId=(new Date).getTime(),this.getNextFile(this.currentTaskId)}},{key:"reset",value:function(){this.fileDownloadInfo=[],this.currentTaskId=0,this.folders=[],this.files={},this.completedCount=0}},{key:"addFolder",value:function(e){this.folders.push(e)}},{key:"addFile",value:function(e){this.files[e.fs_id]=e}},{key:"getNextFile",value:function(t){var n=this;if(t===this.currentTaskId)if(0!==this.folders.length){this.completedCount++,o.default.showToast("正在获取文件列表... ".concat(this.completedCount,"/").concat(this.completedCount+this.folders.length-1),"success");var e=this.folders.pop();this.listParameter.search.dir=e,fetch("".concat(window.location.origin).concat(this.listParameter.url).concat(o.default.objectToQueryString(this.listParameter.search)),this.listParameter.options).then(function(e){e.ok?e.json().then(function(e){if(setTimeout(function(){return n.getNextFile(t)},n.interval),0!==e.errno)return o.default.showToast("未知错误","failure"),void console.log(e);e.list.forEach(function(e){e.isdir?n.folders.push(e.path):n.files[e.fs_id]=e})}):console.log(e)}).catch(function(e){o.default.showToast("网络请求失败","failure"),console.log(e),setTimeout(function(){return n.getNextFile(t)},n.interval)})}else 0!==this.files.length?(o.default.showToast("正在获取下载地址...","success"),this.getFiles(this.files).then(function(){n.done(n.fileDownloadInfo)})):(o.default.showToast("一个文件都没有哦...","caution"),this.reset())}},{key:"getFiles",value:function(e){throw new Error("subclass should implement this method!")}}])&&i(e.prototype,n),a&&i(e,a),t}();n.default=r},{"./core":2}],4:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a,i=(a=e("./EventEmitter"))&&a.__esModule?a:{default:a};function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var o=new(function(e){function a(){var e,t,n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),t=this,(e=!(n=l(a).call(this))||"object"!==r(n)&&"function"!=typeof n?d(t):n).defaultRPC=[{name:"ARIA2 RPC",url:"http://localhost:6800/jsonrpc"}],e.defaultUserAgent="netdisk;6.0.0.12;PC;PC-Windows;10.0.16299;WindowsBaiduYunGuanJia",e.defaultReferer="https://pan.baidu.com/disk/home",e.defaultConfigData={rpcList:e.defaultRPC,configSync:!1,md5Check:!1,fold:0,interval:300,downloadPath:"",userAgent:e.defaultUserAgent,referer:e.defaultReferer,headers:""},e.configData={},e.on("initConfigData",e.init.bind(d(d(e)))),e.on("setConfigData",e.set.bind(d(d(e)))),e.on("clearConfigData",e.clear.bind(d(d(e)))),e}var t,n,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&u(e,t)}(a,i.default),t=a,(n=[{key:"init",value:function(){var t=this;chrome.storage.sync.get(null,function(t){var e=function(e){chrome.storage.local.set({key:t[e]},function(){console.log("chrome first local set: %s, %s",e,t[e])})};for(var n in t)e(n)}),chrome.storage.local.get(null,function(e){t.configData=Object.assign({},t.defaultConfigData,e),t.trigger("updateView",t.configData)})}},{key:"getConfigData",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null;return e?this.configData[e]:this.configData}},{key:"set",value:function(e){this.configData=e,this.save(e),this.trigger("updateView",e)}},{key:"save",value:function(t){var e=function(e){chrome.storage.local.set(s({},e,t[e]),function(){console.log("chrome local set: %s, %s",e,t[e])}),!0===t.configSync&&chrome.storage.sync.set(s({},e,t[e]),function(){console.log("chrome sync set: %s, %s",e,t[e])})};for(var n in t)e(n)}},{key:"clear",value:function(){chrome.storage.sync.clear(),chrome.storage.local.clear(),this.configData=this.defaultConfigData,this.trigger("updateView",this.configData)}}])&&c(t.prototype,n),o&&c(t,o),a}());n.default=o},{"./EventEmitter":1}],5:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=a(e("./core")),s=a(e("./store"));function a(e){return e&&e.__esModule?e:{default:e}}function o(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var i=new(function(){function e(){var t=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.version="1.0.2",this.updateDate="2017/12/30",s.default.on("updateView",function(e){t.updateSetting(e),t.updateMenu(e)})}var t,n,a;return t=e,(n=[{key:"init",value:function(){this.addSettingUI(),this.addTextExport(),s.default.trigger("initConfigData")}},{key:"addMenu",value:function(e,t){e.insertAdjacentHTML(t,'\n      <div id="exportMenu" class="g-dropdown-button">\n        <a class="g-button">\n          <span class="g-button-right">\n            <em class="icon icon-download"></em>\n            <span class="text">导出下载</span>\n          </span>\n        </a>\n        <div id="aria2List" class="menu" style="z-index:50;">\n          <a class="g-button-menu" id="aria2Text" href="javascript:void(0);">文本导出</a>\n          <a class="g-button-menu" id="settingButton" href="javascript:void(0);">设置</a>\n        </div>\n      </div>');var n=document.querySelector("#exportMenu");n.addEventListener("mouseenter",function(){n.classList.add("button-open")}),n.addEventListener("mouseleave",function(){n.classList.remove("button-open")});var a=document.querySelector("#settingButton"),o=document.querySelector("#settingMenu");a.addEventListener("click",function(){o.classList.add("open-o")})}},{key:"resetMenu",value:function(){Array.from(document.querySelectorAll(".rpc-button")).forEach(function(e){e.remove()})}},{key:"updateMenu",value:function(e){this.resetMenu();var t=e.rpcList,n="";t.forEach(function(e){var t='<a class="g-button-menu rpc-button" href="javascript:void(0);" data-url='.concat(e.url,">").concat(e.name,"</a>");n+=t}),document.querySelector("#aria2List").insertAdjacentHTML("afterbegin",n)}},{key:"addTextExport",value:function(){var e=this;document.body.insertAdjacentHTML("beforeend",'\n      <div id="textMenu" class="modal export-menu">\n        <div class="modal-inner">\n          <div class="modal-header">\n            <div class="modal-title">文本导出</div>\n            <div class="modal-close">×</div>\n          </div>\n          <div class="modal-body">\n            <div class="export-menu-row">\n              <a class="export-menu-button" href="javascript:void(0);" id="aria2Txt" download="aria2c.down">存为Aria2文件</a>\n              <a class="export-menu-button" href="javascript:void(0);" id="idmTxt" download="idm.ef2">存为IDM文件</a>\n              <a class="export-menu-button" href="javascript:void(0);" id="downloadLinkTxt" download="link.txt">保存下载链接</a>\n              <a class="export-menu-button" href="javascript:void(0);" id="copyDownloadLinkTxt">拷贝下载链接</a>\n            </div>\n            <div class="export-menu-row">\n              <textarea class="export-menu-textarea" type="textarea" wrap="off" spellcheck="false" id="aria2CmdTxt"></textarea>\n            </div>\n          </div>\n        </div>\n      </div>');var t=document.querySelector("#textMenu"),n=t.querySelector(".modal-close"),a=t.querySelector("#copyDownloadLinkTxt");a.addEventListener("click",function(){r.default.copyText(a.dataset.link)}),n.addEventListener("click",function(){t.classList.remove("open-o"),e.resetTextExport()})}},{key:"resetTextExport",value:function(){var e=document.querySelector("#textMenu");e.querySelector("#aria2Txt").href="",e.querySelector("#idmTxt").href="",e.querySelector("#downloadLinkTxt").href="",e.querySelector("#aria2CmdTxt").value="",e.querySelector("#copyDownloadLinkTxt").dataset.link=""}},{key:"addSettingUI",value:function(){var e=this,t='\n      <div id="settingMenu" class="modal setting-menu">\n        <div class="modal-inner">\n          <div class="modal-header">\n            <div class="modal-title">导出设置</div>\n            <div class="modal-close">×</div>\n          </div>\n          <div class="modal-body">\n            <div class="setting-menu-message">\n              <label class="setting-menu-label orange-o" id="message"></label>\n            </div>\n            <div class="setting-menu-row rpc-s">\n              <div class="setting-menu-name">\n                <input class="setting-menu-input name-s" spellcheck="false">\n              </div>\n              <div class="setting-menu-value">\n                <input class="setting-menu-input url-s" spellcheck="false">\n                <a class="setting-menu-button" id="addRPC" href="javascript:void(0);">添加RPC地址</a>\n              </div>\n            </div>\x3c!-- /.setting-menu-row --\x3e\n            <div class="setting-menu-row">\n              <div class="setting-menu-name">\n                <label class="setting-menu-label">配置同步</label>\n              </div>\n              <div class="setting-menu-value">\n                <input type="checkbox" class="setting-menu-checkbox configSync-s">\n              </div>\n            </div>\x3c!-- /.setting-menu-row --\x3e\n            <div class="setting-menu-row">\n              <div class="setting-menu-name">\n                <label class="setting-menu-label">MD5校验</label>\n              </div>\n              <div class="setting-menu-value">\n                <input type="checkbox" class="setting-menu-checkbox md5Check-s">\n              </div>\n            </div>\x3c!-- /.setting-menu-row --\x3e\n            <div class="setting-menu-row">\n               <div class="setting-menu-name">\n                 <label class="setting-menu-label">文件夹层数</label>\n               </div>\n               <div class="setting-menu-value">\n                 <input class="setting-menu-input small-o fold-s" type="number" spellcheck="false">\n                 <label class="setting-menu-label">(默认0表示不保留,-1表示保留完整路径)</label>\n               </div>\n            </div>\x3c!-- /.setting-menu-row --\x3e\n            <div class="setting-menu-row">\n              <div class="setting-menu-name">\n                <label class="setting-menu-label">递归下载间隔</label>\n              </div>\n              <div class="setting-menu-value">\n                <input class="setting-menu-input small-o interval-s" type="number" spellcheck="false">\n                <label class="setting-menu-label">(单位:毫秒)</label>\n                <a class="setting-menu-button version-s" id="testAria2" href="javascript:void(0);">测试连接，成功显示版本号</a>\n              </div>\n            </div>\x3c!-- /.setting-menu-row --\x3e\n            <div class="setting-menu-row">\n              <div class="setting-menu-name">\n                <label class="setting-menu-label">下载路径</label>\n              </div>\n              <div class="setting-menu-value">\n                <input class="setting-menu-input downloadPath-s" placeholder="只能设置为绝对路径" spellcheck="false">\n              </div>\n            </div>\x3c!-- /.setting-menu-row --\x3e\n            <div class="setting-menu-row">\n              <div class="setting-menu-name">\n                <label class="setting-menu-label">User-Agent</label>\n              </div>\n              <div class="setting-menu-value">\n                <input class="setting-menu-input userAgent-s" spellcheck="false">\n              </div>\n            </div>\x3c!-- /.setting-menu-row --\x3e\n            <div class="setting-menu-row">\n              <div class="setting-menu-name">\n                <label class="setting-menu-label">Referer</label>\n              </div>\n              <div class="setting-menu-value">\n                <input class="setting-menu-input referer-s" spellcheck="false">\n              </div>\n            </div>\x3c!-- /.setting-menu-row --\x3e\n            <div class="setting-menu-row">\n              <div class="setting-menu-name">\n                <label class="setting-menu-label">Headers</label>\n              </div>\n              <div class="setting-menu-value">\n                <textarea class="setting-menu-input textarea-o headers-s" type="textarea" spellcheck="false"></textarea>\n              </div>\n            </div>\x3c!-- /.setting-menu-row --\x3e\n          </div>\x3c!-- /.setting-menu-body --\x3e\n          <div class="modal-footer">\n            <div class="setting-menu-copyright">\n              <div class="setting-menu-item">\n                <label class="setting-menu-label">&copy; Copyright</label>\n                <a class="setting-menu-link" href="https://github.com/acgotaku/BaiduExporter" target="_blank">雪月秋水</a>\n              </div>\n              <div class="setting-menu-item">\n                <label class="setting-menu-label">Version: '.concat(this.version,'</label>\n                <label class="setting-menu-label">Update date: ').concat(this.updateDate,'</label>\n              </div>\n            </div>\x3c!-- /.setting-menu-copyright --\x3e\n            <div class="setting-menu-operate">\n              <a class="setting-menu-button large-o blue-o" id="apply" href="javascript:void(0);">应用</a>\n              <a class="setting-menu-button large-o" id="reset" href="javascript:void(0);">重置</a>\n            </div>\n          </div>\n        </div>\n      </div>');document.body.insertAdjacentHTML("beforeend",t);var n=document.querySelector("#settingMenu");n.querySelector(".modal-close").addEventListener("click",function(){n.classList.remove("open-o"),e.resetSetting()}),document.querySelector("#addRPC").addEventListener("click",function(){var e=document.querySelectorAll(".rpc-s");Array.from(e).pop().insertAdjacentHTML("afterend",'\n        <div class="setting-menu-row rpc-s">\n          <div class="setting-menu-name">\n            <input class="setting-menu-input name-s" spellcheck="false">\n          </div>\n          <div class="setting-menu-value">\n            <input class="setting-menu-input url-s" spellcheck="false">\n          </div>\n        </div>\x3c!-- /.setting-menu-row --\x3e')});var a=document.querySelector("#apply"),o=document.querySelector("#message");a.addEventListener("click",function(){e.saveSetting(),o.innerText="设置已保存"}),document.querySelector("#reset").addEventListener("click",function(){s.default.trigger("clearConfigData"),o.innerText="设置已重置"});var i=document.querySelector("#testAria2");i.addEventListener("click",function(){r.default.getVersion(s.default.getConfigData("rpcList")[0].url,i)})}},{key:"resetSetting",value:function(){document.querySelector("#message").innerText="",document.querySelector("#testAria2").innerText="测试连接，成功显示版本号"}},{key:"updateSetting",value:function(e){var t=e.rpcList,n=e.configSync,a=e.md5Check,o=e.fold,i=e.interval,r=e.downloadPath,s=e.userAgent,c=e.referer,l=e.headers;Array.from(document.querySelectorAll(".rpc-s")).forEach(function(e,t){0!==t&&e.remove()}),t.forEach(function(e,t){var n=document.querySelectorAll(".rpc-s");if(0===t)n[t].querySelector(".name-s").value=e.name,n[t].querySelector(".url-s").value=e.url;else{var a='\n          <div class="setting-menu-row rpc-s">\n            <div class="setting-menu-name">\n              <input class="setting-menu-input name-s" value="'.concat(e.name,'" spellcheck="false">\n            </div>\n            <div class="setting-menu-value">\n              <input class="setting-menu-input url-s" value="').concat(e.url,'" spellcheck="false">\n            </div>\n          </div>\x3c!-- /.setting-menu-row --\x3e');Array.from(n).pop().insertAdjacentHTML("afterend",a)}}),document.querySelector(".configSync-s").checked=n,document.querySelector(".md5Check-s").checked=a,document.querySelector(".fold-s").value=o,document.querySelector(".interval-s").value=i,document.querySelector(".downloadPath-s").value=r,document.querySelector(".userAgent-s").value=s,document.querySelector(".referer-s").value=c,document.querySelector(".headers-s").value=l}},{key:"saveSetting",value:function(){var e=document.querySelectorAll(".rpc-s"),t={rpcList:Array.from(e).map(function(e){var t=e.querySelector(".name-s").value,n=e.querySelector(".url-s").value;if(t&&n)return{name:t,url:n}}).filter(function(e){return e}),configSync:document.querySelector(".configSync-s").checked,md5Check:document.querySelector(".md5Check-s").checked,fold:Number.parseInt(document.querySelector(".fold-s").value),interval:document.querySelector(".interval-s").value,downloadPath:document.querySelector(".downloadPath-s").value,userAgent:document.querySelector(".userAgent-s").value,referer:document.querySelector(".referer-s").value,headers:document.querySelector(".headers-s").value};s.default.trigger("setConfigData",t)}}])&&o(t.prototype,n),a&&o(t,a),e}());n.default=i},{"./core":2,"./store":4}],6:[function(e,t,n){"use strict";var c=a(e("./lib/core")),i=a(e("./lib/ui")),r=a(e("./lib/downloader"));function a(e){return e&&e.__esModule?e:{default:e}}function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function l(e,t){return!t||"object"!==o(t)&&"function"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}(new(function(e){function n(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n);var t={search:{dir:"",bdstoken:window.yunData.MYBDSTOKEN,uk:window.yunData.SHARE_UK,shareid:window.yunData.SHARE_ID,channel:"chunlei",clienttype:0,web:1},url:"/share/list?",options:{credentials:"include",method:"GET"}};return e=l(this,u(n).call(this,t)),i.default.init(),i.default.addMenu(document.querySelector('a[data-button-id="b1"]'),"beforebegin"),c.default.requestCookies([{url:"https://pan.baidu.com/",name:"BDUSS"},{url:"https://pcs.baidu.com/",name:"pcsett"}]),document.querySelector(".bar").style.position="absolute",c.default.showToast("初始化成功!","success"),e.mode="RPC",e.rpcURL="http://localhost:6800/jsonrpc",e.cookies=null,e.files={},e.requestCookies(),e}var t,a,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(n,r.default),t=n,(a=[{key:"startDownload",value:function(){var t=this;this.start(c.default.getConfigData("interval"),function(e){console.log(e),"RPC"===t.mode&&c.default.aria2RPCMode(t.rpcURL,e),"TXT"===t.mode&&(c.default.aria2TXTMode(e),document.querySelector("#textMenu").classList.add("open-o"))})}},{key:"requestCookies",value:function(){var t=this;c.default.sendToBackground("getCookies",[{url:"http://pan.baidu.com/",name:"BDCLND"}],function(e){t.cookies=decodeURIComponent(e.BDCLND)})}},{key:"startListen",value:function(){var n=this;window.addEventListener("message",function(e){if(e.source===window&&e.data.type&&"selected"===e.data.type){n.reset();var t=e.data.data;if(console.log(t),0===t.length)return void c.default.showToast("请选择一下你要保存的文件哦","failure");t.forEach(function(e){e.isdir?n.addFolder(e.path):n.addFile(e)}),n.startDownload()}}),document.querySelector("#aria2List").addEventListener("click",function(e){var t=e.target.dataset.url;t&&(n.rpcURL=t,n.getSelected(),n.mode="RPC"),"aria2Text"===e.target.id&&(n.getSelected(),n.mode="TXT")})}},{key:"getSelected",value:function(){"single_file_page"===window.yunData.SHAREPAGETYPE?(this.reset(),this.addFile({fs_id:window.yunData.FS_ID}),this.startDownload()):window.postMessage({type:"getSelected"},location.origin)}},{key:"showCaptcha",value:function(e,t,n){var a=this,o='\n      <div id="captchaMenu" class="modal captcha-menu open-o">\n        <div class="modal-inner">\n          <div class="modal-header">\n            <div class="modal-title">提示</div>\n            <div class="modal-close">×</div>\n          </div>\n          <div class="modal-body">\n            <div class="captcha-menu-row">\n              <label class="captcha-menu-label">请输入验证码：</label>\n              <div class="captcha-menu-box">\n                <input class="captcha-menu-input" maxlength="4" id="vcodeValue">\n                <label class="captcha-menu-label warn-o">'.concat(!0===n?"验证码输入错误":"",'</label>\n              </div>\n              <img class="captcha-menu-img" maxlength="4" alt="验证码获取中" width="100" height="30" src=').concat(e.vcode_img,' id="vcode">\n              <a href="javascript:void(0);" class="captcha-menu-button" id="change">换一张</a>\n            </div>\n          </div>\n          <div class="modal-footer">\n          <div class="captcha-menu-operate">\n            <a class="captcha-menu-button blue-o" id="apply" href="javascript:void(0);">确定</a>\n            <a class="captcha-menu-button" id="reset" href="javascript:void(0);">取消</a>\n          </div>\n          </div>\n        </div>\n      </div>');document.body.insertAdjacentHTML("beforeend",o);var i=document.querySelector("#captchaMenu");i.querySelector(".modal-close").addEventListener("click",function(){i.remove()}),i.querySelector("#apply").addEventListener("click",function(){e.vcode_input=document.querySelector("#vcodeValue").value,a.getFiles(a.files,e).then(function(){t()}),i.remove()}),i.querySelector("#reset").addEventListener("click",function(){i.remove()}),i.querySelector("#change").addEventListener("click",function(){i.querySelector("#vcode").src="//pan.baidu.com/genimage?".concat(e.vcode_str,"&").concat((new Date).getTime())})}},{key:"getCaptcha",value:function(t,n){var a=this,e={search:{prod:"share",bdstoken:window.yunData.MYBDSTOKEN,app_id:250528,channel:"chunlei",clienttype:0,web:1},url:"/api/getcaptcha?",options:{credentials:"include",method:"GET"}};fetch("".concat(window.location.origin).concat(e.url).concat(c.default.objectToQueryString(e.search)),e.options).then(function(e){e.ok?e.json().then(function(e){if(0!==e.errno)return c.default.showToast("未知错误","failure"),void console.log(e);a.showCaptcha(e,t,n)}):console.log(e)}).catch(function(e){c.default.showToast("网络请求失败","failure"),console.log(e)})}},{key:"getPrefixLength",value:function(){var e=c.default.getHashParameter("list/path")||c.default.getHashParameter("path")||"",t=c.default.getHashParameter("parentPath"),n=decodeURIComponent(window.yunData.FILEINFO[window.yunData.FILEINFO.length-1].parent_path);return 1===window.yunData.FILEINFO.length?1:t?n.length+e.slice(t.length).length+1:e!==n?n.length+e.length:1===e.length?1:e.length+1}},{key:"getFiles",value:function(e,n){var a=this;this.files=e;var t=[];for(var o in e)t.push(e[o].fs_id);var i={encrypt:"0",product:"share",uk:window.yunData.SHARE_UK,primaryid:window.yunData.SHARE_ID,fid_list:JSON.stringify(t)};window.yunData.SHARE_PUBLIC||(i.extra=JSON.stringify({sekey:this.cookies})),n&&(i.vcode_input=n.vcode_input,i.vcode_str=n.vcode_str);var r={search:{timestamp:window.yunData.TIMESTAMP,sign:window.yunData.SIGN,bdstoken:window.yunData.MYBDSTOKEN,app_id:250528,channel:"chunlei",clienttype:0,web:1},url:"/api/sharedownload?",options:{body:c.default.objectToQueryString(i),credentials:"include",method:"POST",headers:{"Content-type":"application/x-www-form-urlencoded; charset=UTF-8"}}},s=this.getPrefixLength();return new Promise(function(t){fetch("".concat(window.location.origin).concat(r.url).concat(c.default.objectToQueryString(r.search)),r.options).then(function(e){e.ok?e.json().then(function(e){0===e.errno?("single_file_page"===window.yunData.SHAREPAGETYPE?a.fileDownloadInfo.push({name:e.list[0].server_filename,link:e.list[0].dlink,md5:e.list[0].md5}):e.list.forEach(function(e){a.fileDownloadInfo.push({name:e.path.substr(s),link:e.dlink,md5:e.md5})}),t()):-20===e.errno?(c.default.showToast("请输入验证码以继续下载","caution"),n?a.getCaptcha(t,!0):a.getCaptcha(t,!1)):c.default.showToast("出现未知错误，下载失败","failure")}):console.log(e)}).catch(function(e){c.default.showToast("网络请求失败","failure"),console.log(e)})})}}])&&s(t.prototype,a),o&&s(t,o),n}())).startListen()},{"./lib/core":2,"./lib/downloader":3,"./lib/ui":5}]},{},[6]);