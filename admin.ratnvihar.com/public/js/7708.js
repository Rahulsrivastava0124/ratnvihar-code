"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7708],{37708:function(t,e,n){n.r(e);var r=n(27378),o=n(23884),i=n(23434),c=n(95287),u=n(47123),f=n(10755),a=n(8971),s=n(13040),p=n(84200),l=n(24246);function y(t){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y(t)}function b(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function m(t,e){return m=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},m(t,e)}function h(t,e){if(e&&("object"===y(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function d(t){return d=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},d(t)}var v=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&m(t,e)}(p,t);var e,n,r,o,f,s=(o=p,f=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=d(o);if(f){var n=d(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return h(this,t)});function p(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,p),(e=s.call(this,t)).state={item:e.props.item},e}return e=p,r=[{key:"getDerivedStateFromProps",value:function(t,e){var n={};return t.item!==e.item&&(n.item=t.item),n}}],(n=[{key:"componentDidMount",value:function(){this.props.actions.employeeFetch(this.props.params.id)}},{key:"render",value:function(){return(0,l.jsx)(a.Z,{title:"Employee Edit",children:(0,l.jsx)("div",{children:this.state.item?(0,l.jsx)(u.Z,{formData:this.state.item}):(0,l.jsx)(i.ZP,{container:!0,justifyContent:"center",children:(0,l.jsx)(c.Z,{})})})})}}])&&b(e.prototype,n),r&&b(e,r),Object.defineProperty(e,"prototype",{writable:!1}),p}(r.Component);e.default=(0,s.Z)((0,o.connect)((function(t){return{item:t.superadmin.employee.item||null}}),(function(t){return{dispatch:t,actions:(0,f.bindActionCreators)({employeeFetch:p.BQ},t)}}))(v))}}]);