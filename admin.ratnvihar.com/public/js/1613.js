/*! For license information please see 1613.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1613],{78178:function(e,t,r){r.d(t,{Fe:function(){return f},Uy:function(){return l},b6:function(){return c},kI:function(){return u},v9:function(){return o},vh:function(){return s}});var n=r(69222),a=r(54453),i=r(57446),l=function(e){return e=(0,i.B7)(e,!0),function(t){n.Z.get("/superadmin/roles".concat(e)).then((function(e){e.data.success&&t({type:a.Ud,payload:e.data.data})})).catch((function(e){}))}},o=function(e){return function(t){n.Z.post("/superadmin/roles/store",e).then((function(e){t({type:a.Cd,payload:e.data})})).catch((function(e){}))}},s=function(e,t){return function(r){n.Z.post("/superadmin/roles/update/".concat(e),t).then((function(e){r({type:a.hv,payload:e.data})})).catch((function(e){}))}},f=function(e,t){return function(r){n.Z.delete("/superadmin/roles/delete/".concat(e),t).then((function(e){r({type:a.cc,payload:e.data})})).catch((function(e){}))}},c=function(e){return n.Z.get("/superadmin/permissions?role_id=".concat(e))},u=function(e){return n.Z.post("/superadmin/permissions/update",e)}},51613:function(e,t,r){r.r(t),r.d(t,{default:function(){return U}});var n=r(27378),a=r(23884),i=r(12180),l=r(95287),o=r(43564),s=r(23434),f=r(19265),c=r(96616),u=r(97722),d=r(49444),p=r(68456),h=r(47265),m=r(92146),y=r(90813),v=r(22682),w=r(78178),b=r(57446),g=r(98784),x=r.n(g),j=r(24246);function O(e){return O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},O(e)}function S(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function _(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?S(Object(r),!0).forEach((function(t){Z(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):S(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function Z(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function P(){P=function(){return e};var e={},t=Object.prototype,r=t.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},a=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",l=n.toStringTag||"@@toStringTag";function o(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{o({},"")}catch(e){o=function(e,t,r){return e[t]=r}}function s(e,t,r,n){var a=t&&t.prototype instanceof u?t:u,i=Object.create(a.prototype),l=new S(n||[]);return i._invoke=function(e,t,r){var n="suspendedStart";return function(a,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===a)throw i;return{value:void 0,done:!0}}for(r.method=a,r.arg=i;;){var l=r.delegate;if(l){var o=g(l,r);if(o){if(o===c)continue;return o}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var s=f(e,t,r);if("normal"===s.type){if(n=r.done?"completed":"suspendedYield",s.arg===c)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n="completed",r.method="throw",r.arg=s.arg)}}}(e,r,l),i}function f(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=s;var c={};function u(){}function d(){}function p(){}var h={};o(h,a,(function(){return this}));var m=Object.getPrototypeOf,y=m&&m(m(_([])));y&&y!==t&&r.call(y,a)&&(h=y);var v=p.prototype=u.prototype=Object.create(h);function w(e){["next","throw","return"].forEach((function(t){o(e,t,(function(e){return this._invoke(t,e)}))}))}function b(e,t){function n(a,i,l,o){var s=f(e[a],e,i);if("throw"!==s.type){var c=s.arg,u=c.value;return u&&"object"==O(u)&&r.call(u,"__await")?t.resolve(u.__await).then((function(e){n("next",e,l,o)}),(function(e){n("throw",e,l,o)})):t.resolve(u).then((function(e){c.value=e,l(c)}),(function(e){return n("throw",e,l,o)}))}o(s.arg)}var a;this._invoke=function(e,r){function i(){return new t((function(t,a){n(e,r,t,a)}))}return a=a?a.then(i,i):i()}}function g(e,t){var r=e.iterator[t.method];if(void 0===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,g(e,t),"throw"===t.method))return c;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return c}var n=f(r,e.iterator,t.arg);if("throw"===n.type)return t.method="throw",t.arg=n.arg,t.delegate=null,c;var a=n.arg;return a?a.done?(t[e.resultName]=a.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,c):a:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,c)}function x(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function j(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function S(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(x,this),this.reset(!0)}function _(e){if(e){var t=e[a];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,i=function t(){for(;++n<e.length;)if(r.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=void 0,t.done=!0,t};return i.next=i}}return{next:Z}}function Z(){return{value:void 0,done:!0}}return d.prototype=p,o(v,"constructor",p),o(p,"constructor",d),d.displayName=o(p,l,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===d||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,p):(e.__proto__=p,o(e,l,"GeneratorFunction")),e.prototype=Object.create(v),e},e.awrap=function(e){return{__await:e}},w(b.prototype),o(b.prototype,i,(function(){return this})),e.AsyncIterator=b,e.async=function(t,r,n,a,i){void 0===i&&(i=Promise);var l=new b(s(t,r,n,a),i);return e.isGeneratorFunction(r)?l:l.next().then((function(e){return e.done?e.value:l.next()}))},w(v),o(v,l,"Generator"),o(v,a,(function(){return this})),o(v,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},e.values=_,S.prototype={constructor:S,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(j),!e)for(var t in this)"t"===t.charAt(0)&&r.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(r,n){return l.type="throw",l.arg=e,t.next=r,n&&(t.method="next",t.arg=void 0),!!n}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],l=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var o=r.call(i,"catchLoc"),s=r.call(i,"finallyLoc");if(o&&s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(o){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var i=a;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var l=i?i.completion:{};return l.type=e,l.arg=t,i?(this.method="next",this.next=i.finallyLoc,c):this.complete(l)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),c},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),j(r),c}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var a=n.arg;j(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:_(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),c}},e}function E(e,t,r,n,a,i,l){try{var o=e[i](l),s=o.value}catch(e){return void r(e)}o.done?t(s):Promise.resolve(s).then(n,a)}function k(e){return function(){var t=this,r=arguments;return new Promise((function(n,a){var i=e.apply(t,r);function l(e){E(i,n,a,l,o,"next",e)}function o(e){E(i,n,a,l,o,"throw",e)}l(void 0)}))}}function L(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,i=[],l=!0,o=!1;try{for(r=r.call(e);!(l=(n=r.next()).done)&&(i.push(n.value),!t||i.length!==t);l=!0);}catch(e){o=!0,a=e}finally{try{l||null==r.return||r.return()}finally{if(o)throw a}}return i}}(e,t)||A(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(e,t){if(e){if("string"==typeof e)return C(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?C(e,t):void 0}}function C(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var I=r(5070),R=function(e){var t=L((0,n.useState)([]),2),r=t[0],a=t[1],g=L((0,n.useState)(!0),2),O=g[0],S=g[1];(0,n.useEffect)((function(){E(e.role_id)}),[e.role_id]);var E=function(){var e=k(P().mark((function e(t){var r;return P().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,w.b6)(t);case 2:(r=e.sent).data.success&&a(r.data.data.items),S(!1);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),R=function(){var t=k(P().mark((function t(n,i,l){var o,s,f;return P().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return o=function(e){if(Array.isArray(e))return C(e)}(c=r)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(c)||A(c)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),s=x().findIndex(o,(function(e){return e.name==i})),f={},-1!==s?(o[s][l]=!!n.target.checked,f=o[s]):(f=Z({name:i,view:!1,add:!1,edit:!1,delete:!1},l,!!n.target.checked),o.push(f)),t.next=6,(0,w.kI)(_({role_id:e.role_id},f));case 6:t.sent.data.success?(a(o),S(!1)):S(!1);case 8:case"end":return t.stop()}var c}),t)})));return function(e,r,n){return t.apply(this,arguments)}}();return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(i.Z,{sx:{color:"#fff",zIndex:function(e){return e.zIndex.drawer+1}},open:O,children:(0,j.jsx)(l.Z,{color:"inherit"})}),(0,j.jsx)(o.Z,{sx:{flexGrow:1,m:.5},className:"ratn-dialog-inner",children:(0,j.jsx)(s.ZP,{container:!0,spacing:2,className:"tax-input loans_view p_view ",children:(0,j.jsx)(s.ZP,{item:!0,xs:12,children:(0,j.jsx)(f.Z,{sx:{width:"100%",overflow:"hidden"},children:(0,j.jsx)(c.Z,{sx:{maxHeight:600},children:(0,j.jsxs)(u.Z,{stickyHeader:!0,sx:{minWidth:650},"aria-label":"simple table",children:[(0,j.jsx)(d.Z,{className:"ratn-table-header",children:(0,j.jsxs)(p.Z,{children:[(0,j.jsx)(h.Z,{children:"Name"}),(0,j.jsx)(h.Z,{children:"List"}),(0,j.jsx)(h.Z,{children:"View"}),(0,j.jsx)(h.Z,{children:"Add"}),(0,j.jsx)(h.Z,{children:"Edit"}),(0,j.jsx)(h.Z,{children:"Delete"})]})}),(0,j.jsx)(m.Z,{children:I.map((function(e,t){return(0,j.jsxs)(n.Fragment,{children:[(0,j.jsx)(p.Z,{children:(0,j.jsx)(h.Z,{colSpan:6,children:(0,j.jsx)(y.Z,{variant:"h3",gutterBottom:!0,children:e.title})})}),e.permissions.map((function(e,t){return(0,j.jsxs)(p.Z,{children:[(0,j.jsx)(h.Z,{children:e.title}),(0,j.jsx)(h.Z,{children:(0,j.jsx)(v.Z,{checked:(0,b.Fs)(r,e.name,"list",!1),onChange:function(t){return R(t,e.name,"list")}})}),(0,j.jsx)(h.Z,{children:(0,j.jsx)(v.Z,{checked:(0,b.Fs)(r,e.name,"view",!1),onChange:function(t){return R(t,e.name,"view")}})}),(0,j.jsx)(h.Z,{children:(0,j.jsx)(v.Z,{checked:(0,b.Fs)(r,e.name,"add",!1),onChange:function(t){return R(t,e.name,"add")}})}),(0,j.jsx)(h.Z,{children:(0,j.jsx)(v.Z,{checked:(0,b.Fs)(r,e.name,"edit",!1),onChange:function(t){return R(t,e.name,"edit")}})}),(0,j.jsx)(h.Z,{children:(0,j.jsx)(v.Z,{checked:(0,b.Fs)(r,e.name,"delete",!1),onChange:function(t){return R(t,e.name,"delete")}})})]},t)}))]},t)}))})]})})})})})})]})},F=r(8971),N=r(13040);function M(e){return M="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},M(e)}function T(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function G(e,t){return G=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},G(e,t)}function D(e,t){if(t&&("object"===M(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function B(e){return B=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},B(e)}var H=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&G(e,t)}(l,e);var t,r,n,a,i=(n=l,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=B(n);if(a){var r=B(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return D(this,e)});function l(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),(t=i.call(this,e)).state={},t}return t=l,(r=[{key:"render",value:function(){return(0,j.jsx)(F.Z,{title:"Role Permissions",children:(0,j.jsx)("div",{children:(0,j.jsx)(R,{role_id:this.props.params.id})})})}}])&&T(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),l}(n.Component),U=(0,N.Z)((0,a.connect)((function(e){return{}}),(function(e){return{}}))(H))},5070:function(e){e.exports=JSON.parse('[{"title":"Product Master","permissions":[{"title":"Category","name":"category","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Sub Category","name":"sub_category","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Material","name":"material","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Price List","name":"price_list","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Products","name":"products","list":false,"view":false,"add":false,"edit":false,"delete":false}]},{"title":"Invoice","permissions":[{"title":"Purchase","name":"purchase","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Sales","name":"sales","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Sale On Approval","name":"sale_on_approval","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Purchase On Approval","name":"purchase_on_approval","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Return Purchase","name":"return_purchase","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Return Sale","name":"return_sale","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Transfer","name":"transfer","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Received","name":"received","list":false,"view":false,"add":false,"edit":false,"delete":false}]},{"title":"Order Management","permissions":[{"title":"Orders","name":"orders","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Return Orders","name":"return_orders","list":false,"view":false,"add":false,"edit":false,"delete":false}]},{"title":"User Management","permissions":[{"title":"Admin","name":"admin","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Distributor","name":"distributor","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Sales Excecutive","name":"sales_executive","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Retailer","name":"retailer","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Supplier","name":"supplier","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Customer","name":"customer","list":false,"view":false,"add":false,"edit":false,"delete":false}]},{"title":"Employee Management","permissions":[{"title":"Employees","name":"employees","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Roles","name":"roles","list":false,"view":false,"add":false,"edit":false,"delete":false}]},{"title":"Investor Management","permissions":[{"title":"Investors","name":"investors","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Loans","name":"loans","list":false,"view":false,"add":false,"edit":false,"delete":false}]},{"title":"HR Management","permissions":[{"title":"Leave Applications","name":"leave_applications","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Expense","name":"expense","list":false,"view":false,"add":false,"edit":false,"delete":false}]},{"title":"Stock Management","permissions":[{"title":"Stocks","name":"stock","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Material Stock","name":"material_stock","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Material Stock History","name":"material_stock_history","list":false,"view":false,"add":false,"edit":false,"delete":false}]},{"title":"Master","permissions":[{"title":"Unit","name":"unit","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Size","name":"size","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Purity","name":"purity","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Tax","name":"tax","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Certificates","name":"certificates","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Country","name":"country","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"State","name":"state","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"District","name":"district","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Return Policy","name":"return_policy","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Holidays","name":"holidays","list":false,"view":false,"add":false,"edit":false,"delete":false}]},{"title":"Settings","permissions":[{"title":"Banners","name":"banners","list":false,"view":false,"add":false,"edit":false,"delete":false},{"title":"Promocodes","name":"promocodes","list":false,"view":false,"add":false,"edit":false,"delete":false}]},{"title":"Subscriber","permissions":[{"title":"Subscribers","name":"subscribers","list":false,"view":false,"add":false,"edit":false,"delete":false}]}]')}}]);