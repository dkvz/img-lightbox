parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"q71P":[function(require,module,exports) {
module.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA2NCA2NCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPjxtZXRhZGF0YT48cmRmOlJERj48Y2M6V29yayByZGY6YWJvdXQ9IiI+PGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+PGRjOnR5cGUgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIvPjxkYzp0aXRsZS8+PC9jYzpXb3JrPjwvcmRmOlJERj48L21ldGFkYXRhPgo8Zz4KCQk8Y2lyY2xlIGNsYXNzPSJzdDAiIGN4PSIzMiIgY3k9IjMyIiByPSIzMiIvPgoJPC9nPjxnIGNsYXNzPSJzdDEiIG9wYWNpdHk9Ii4yIj4KCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJtNDYgNTBoLTJ2LTRjMC00LjUtMy03LjQtMy03LjRzLTMtMi44LTMuOS0zLjcgMC0xLjggMC0xLjggMS4zLTEuMyA0LjItNGMyLjgtMi43IDIuNy02LjcgMi43LTYuN3YtNS4xbC0xMi0xLTEyIDF2NS4xcy0wLjEgMy45IDIuNyA2LjdjMi44IDIuNyA0LjIgNCA0LjIgNHMwLjkgMC45IDAgMS44LTMuOSAzLjctMy45IDMuNy0zIDIuOC0zIDcuNHY0aC0yYy0xLjEgMC0yIDAuOS0yIDJzMC45IDIgMiAyaDI4YzEuMSAwIDItMC45IDItMnMtMC45LTItMi0yeiIgZmlsbD0iIzIzMWYyMCIvPgoJPC9nPgoJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Im00MSAzNi42cy0zLTIuOC0zLjktMy43IDAtMS44IDAtMS44IDEuMy0xLjMgNC4yLTRjMi44LTIuNyAyLjctNi43IDIuNy02Ljd2LTUuMWwtMTItMS0xMiAxdjUuMXMtMC4xIDMuOSAyLjcgNi43YzIuOCAyLjcgNC4yIDQgNC4yIDRzMC45IDAuOSAwIDEuOC0zLjkgMy43LTMuOSAzLjctMyAyLjgtMyA3LjR2NS4xaDI0di01LjFjMC00LjUtMy03LjQtMy03LjR6IiBmaWxsPSIjZmZmIi8+CgkKCQk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJtMzEgNDN2LTExYzAtMi4xLTEtMy40LTEuMy0zLjdsLTQuMi00Yy0xLjUtMS40LTEuNS0zLjctMS41LTMuN2gxNnMwIDIuMy0xLjUgMy43bC00LjIgNGMtMC40IDAuMy0xLjMgMS42LTEuMyAzLjd2MTF6Ii8+Cgk8ZyBjbGFzcz0ic3Q1IiBvcGFjaXR5PSIuMyI+CgkJPHBhdGggY2xhc3M9InN0MiIgZD0ibTQ4IDE2YzAgMS4xLTAuOSAyLTIgMmgtMjhjLTEuMSAwLTItMC45LTItMnMwLjktMiAyLTJoMjhjMS4xIDAgMiAwLjkgMiAyeiIgZmlsbD0iIzIzMWYyMCIvPgoJPC9nPjxnIGZpbGw9IiNmZmYiPgoJCTxwYXRoIGNsYXNzPSJzdDYiIGQ9Im00OCAxNGMwIDEuMS0wLjkgMi0yIDJoLTI4Yy0xLjEgMC0yLTAuOS0yLTJzMC45LTIgMi0yaDI4YzEuMSAwIDIgMC45IDIgMnoiIGZpbGw9IiNmZmYiLz4KCTwvZz48ZyBmaWxsPSIjZmZmIj4KCQk8cGF0aCBjbGFzcz0ic3Q2IiBkPSJtNDggNTBjMCAxLjEtMC45IDItMiAyaC0yOGMtMS4xIDAtMi0wLjktMi0yczAuOS0yIDItMmgyOGMxLjEgMCAyIDAuOSAyIDJ6IiBmaWxsPSIjZmZmIi8+Cgk8L2c+PGc+CgkJPHBvbHlnb24gY2xhc3M9InN0NCIgcG9pbnRzPSIyMyA0OCAyMyA0OCAzMiA0MCA0MSA0OCIvPgoJPC9nPgoKPC9zdmc+Cg==";
},{}],"wPYj":[function(require,module,exports) {
"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function o(t,e,o){return e&&n(t.prototype,e),o&&n(t,o),t}function r(e,n){return!n||"object"!==t(n)&&"function"!=typeof n?i(e):n}function i(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&f(t,e)}function l(t){var e="function"==typeof Map?new Map:void 0;return(l=function(t){if(null===t||!c(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,n)}function n(){return u(t,arguments,h(this).constructor)}return n.prototype=Object.create(t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),f(n,t)})(t)}function s(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}function u(t,e,n){return(u=s()?Reflect.construct:function(t,e,n){var o=[null];o.push.apply(o,e);var r=new(Function.bind.apply(t,o));return n&&f(r,n.prototype),r}).apply(null,arguments)}function c(t){return-1!==Function.toString.call(t).indexOf("[native code]")}function f(t,e){return(f=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function h(t){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var y=require("../../assets/hourglass.svg"),d=function(t){function n(){var t;return e(this,n),(t=r(this,h(n).call(this))).loading=!1,t.attachShadow({mode:"open"}),t}return a(n,l(HTMLElement)),o(n,[{key:"connectedCallback",value:function(){this.shadowRoot.innerHTML=this.template,this.overlay=this.shadowRoot.querySelector("#overlay"),this.loadingOverlay=this.shadowRoot.querySelector("#loader");var t=this.querySelector("a"),e=this.querySelector("img");t?(this.fullImage=t.getAttribute("href"),t.addEventListener("click",this.showLightbox.bind(this))):e&&(this.fullImage=e.getAttribute("src"),e.addEventListener("click",this.showLightbox.bind(this)))}},{key:"showLightbox",value:function(t){var e=this;t.preventDefault(),this.loading||(this.loading=!0,this._showOverlay(this.loadingOverlay),this.img?this.showImage():(this.img=document.createElement("img"),this.img.addEventListener("load",function(){return e.showImage()}),this.img.src=this.fullImage,this.img.tabIndex=1,["click","keydown"].forEach(function(t){return e.overlay.addEventListener(t,function(t){return e._hideOverlay(t.currentTarget)})}),this.overlay.appendChild(this.img)))}},{key:"showImage",value:function(){this.img.style.transform="scale(0.1)",this._hideOverlay(this.loadingOverlay),this._showOverlay(this.overlay),this.overlay.focus(),this.img.style.transform="scale(1)",this.loading=!1}},{key:"_showOverlay",value:function(t){t.style.display="flex"}},{key:"_hideOverlay",value:function(t){t.style.display=""}}]),n}();d.prototype.template='\n<style>\n  :host {\n    display: inline-block;\n    cursor: pointer;\n    position: relative;\n  }\n\n  #loader {\n    position: absolute;\n    z-index: 1;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0,0,0,.2);\n    display: none;\n    align-items: center;\n    justify-content: center;\n  }\n\n  #overlay {\n    position: fixed;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    overflow: hidden;\n    z-index: 999;\n    background-color: rgba(0,0,0,.5);\n    display: none;\n    align-items: center;\n    justify-content: center;\n  }\n\n  #loader img {\n    width: 50%;\n    opacity: 0.6;\n    animation: lightbox-loader 2s infinite;\n  }\n\n  #overlay img {\n    max-width: 100%;\n    max-height: 100%;\n    transition: transform 0.8s;\n  }\n\n  @keyframes lightbox-loader {\n    0% {transform: rotate(0deg);}\n    100% {transform: rotate(360deg);}\n  }\n</style>\n<slot></slot>\n<div id="overlay" tabindex="0"></div>\n<div id="loader">\n  <img src="'.concat(y,'">\n</div>\n');var p=d;exports.default=p;
},{"../../assets/hourglass.svg":"q71P"}]},{},["wPYj"], "ImgLightbox")
//# sourceMappingURL=img-lightbox.js.map