/*! For license information please see 8864.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8864],{78178:function(e,t,r){r.d(t,{Fe:function(){return u},Uy:function(){return a},b6:function(){return l},kI:function(){return f},v9:function(){return s},vh:function(){return c}});var n=r(69222),o=r(54453),i=r(57446),a=function(e){return e=(0,i.B7)(e,!0),function(t){n.Z.get("/superadmin/roles".concat(e)).then((function(e){e.data.success&&t({type:o.Ud,payload:e.data.data})})).catch((function(e){}))}},s=function(e){return function(t){n.Z.post("/superadmin/roles/store",e).then((function(e){t({type:o.Cd,payload:e.data})})).catch((function(e){}))}},c=function(e,t){return function(r){n.Z.post("/superadmin/roles/update/".concat(e),t).then((function(e){r({type:o.hv,payload:e.data})})).catch((function(e){}))}},u=function(e,t){return function(r){n.Z.delete("/superadmin/roles/delete/".concat(e),t).then((function(e){r({type:o.cc,payload:e.data})})).catch((function(e){}))}},l=function(e){return n.Z.get("/superadmin/permissions?role_id=".concat(e))},f=function(e){return n.Z.post("/superadmin/permissions/update",e)}},48864:function(e,t,r){r.r(t),r.d(t,{default:function(){return H}});var n=r(27378),o=r(23884),i=r(28730),a=r(23434),s=r(10755),c=r(74154),u=r(8971),l=r(13040),f=r(78178),p=r(46265),h=r(74570),d=r(26803),y=r(69162),m=r(93033),v=r(9647),b=r(10418),g=r(43564),w=r(78153),O=r(24246);function j(e){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},j(e)}var S=["input","label","meta"];function P(){P=function(){return e};var e={},t=Object.prototype,r=t.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",a=n.toStringTag||"@@toStringTag";function s(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{s({},"")}catch(e){s=function(e,t,r){return e[t]=r}}function c(e,t,r,n){var o=t&&t.prototype instanceof f?t:f,i=Object.create(o.prototype),a=new x(n||[]);return i._invoke=function(e,t,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var s=w(a,r);if(s){if(s===l)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=u(e,t,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===l)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}(e,r,a),i}function u(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=c;var l={};function f(){}function p(){}function h(){}var d={};s(d,o,(function(){return this}));var y=Object.getPrototypeOf,m=y&&y(y(D([])));m&&m!==t&&r.call(m,o)&&(d=m);var v=h.prototype=f.prototype=Object.create(d);function b(e){["next","throw","return"].forEach((function(t){s(e,t,(function(e){return this._invoke(t,e)}))}))}function g(e,t){function n(o,i,a,s){var c=u(e[o],e,i);if("throw"!==c.type){var l=c.arg,f=l.value;return f&&"object"==j(f)&&r.call(f,"__await")?t.resolve(f.__await).then((function(e){n("next",e,a,s)}),(function(e){n("throw",e,a,s)})):t.resolve(f).then((function(e){l.value=e,a(l)}),(function(e){return n("throw",e,a,s)}))}s(c.arg)}var o;this._invoke=function(e,r){function i(){return new t((function(t,o){n(e,r,t,o)}))}return o=o?o.then(i,i):i()}}function w(e,t){var r=e.iterator[t.method];if(void 0===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,w(e,t),"throw"===t.method))return l;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var n=u(r,e.iterator,t.arg);if("throw"===n.type)return t.method="throw",t.arg=n.arg,t.delegate=null,l;var o=n.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,l):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,l)}function O(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function S(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function x(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(O,this),this.reset(!0)}function D(e){if(e){var t=e[o];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,i=function t(){for(;++n<e.length;)if(r.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=void 0,t.done=!0,t};return i.next=i}}return{next:C}}function C(){return{value:void 0,done:!0}}return p.prototype=h,s(v,"constructor",h),s(h,"constructor",p),p.displayName=s(h,a,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===p||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,h):(e.__proto__=h,s(e,a,"GeneratorFunction")),e.prototype=Object.create(v),e},e.awrap=function(e){return{__await:e}},b(g.prototype),s(g.prototype,i,(function(){return this})),e.AsyncIterator=g,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new g(c(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},b(v),s(v,a,"Generator"),s(v,o,(function(){return this})),s(v,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},e.values=D,x.prototype={constructor:x,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(S),!e)for(var t in this)"t"===t.charAt(0)&&r.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(r,n){return a.type="throw",a.arg=e,t.next=r,n&&(t.method="next",t.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var s=r.call(i,"catchLoc"),c=r.call(i,"finallyLoc");if(s&&c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,l):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),l},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),S(r),l}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;S(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:D(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),l}},e}function x(e,t,r,n,o,i,a){try{var s=e[i](a),c=s.value}catch(e){return void r(e)}s.done?t(c):Promise.resolve(c).then(n,o)}function D(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function C(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?D(Object(r),!0).forEach((function(t){M(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):D(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function k(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function E(e,t){return E=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},E(e,t)}function _(e,t){if(t&&("object"===j(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return L(e)}function L(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function R(e){return R=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},R(e)}function M(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var Z=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&E(e,t)}(u,e);var t,r,n,o,s,c=(o=u,s=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=R(o);if(s){var r=R(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return _(this,e)});function u(e){var t;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),M(L(t=c.call(this,e)),"getDefaultValues",(function(){return{name:"",status:1}})),M(L(t),"renderTextField",(function(e){var t=e.input,r=e.label,n=e.meta,o=n.touched,i=n.error,a=function(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}(e,S);return(0,O.jsx)(b.Z,C(C({label:r,fullWidth:!0,error:!(!o||!i),helperText:o&&i?i:""},t),a))})),M(L(t),"permissionChange",(function(e){var r=e.target,n=r.name,o=r.checked;t.setState({permissions:C(C({},t.state.permissions),{},M({},n,!!o))})})),M(L(t),"handleFormSubmit",function(){var e,r=(e=P().mark((function e(r,n){var o;return P().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=C({},r),!t.state.isCreateFrom){e.next=5;break}return e.abrupt("return",t.props.actions.roleCreate(o));case 5:return e.abrupt("return",t.props.actions.roleUpdate(t.state.formData.id,o));case 6:case"end":return e.stop()}}),e)})),function(){var t=this,r=arguments;return new Promise((function(n,o){var i=e.apply(t,r);function a(e){x(i,n,o,a,s,"next",e)}function s(e){x(i,n,o,a,s,"throw",e)}a(void 0)}))});return function(e,t){return r.apply(this,arguments)}}()),M(L(t),"isDisabled",(function(){return!(!t.state.formData||9!=t.state.formData.id&&10!=t.state.formData.id)}));var r="formData"in t.props?t.props.formData:null;return t.state={formData:r,isCreateFrom:!r,permissions:{master:!1,product_master:!1,user_management:!1,employee:!1,investor:!1,stock:!1,invoice:!1,orders:!1,hr_management:!1,settings:!1}},t}return t=u,n=[{key:"getDerivedStateFromProps",value:function(e,t){return{}}}],(r=[{key:"componentDidMount",value:function(){this.state.formData?this.props.initialize(this.state.formData):this.props.initialize(this.getDefaultValues())}},{key:"render",value:function(){var e=this,t=this.props,r=t.handleSubmit;return t.pristine,t.submitting,this.state.permissions,(0,O.jsx)("form",{onSubmit:r(this.handleFormSubmit),children:(0,O.jsxs)(g.Z,{sx:{flexGrow:1},children:[(0,O.jsx)(a.ZP,{container:!0,spacing:2,children:(0,O.jsx)(a.ZP,{item:!0,xs:12,className:"create-input",children:(0,O.jsx)(v.gN,{name:"name",component:this.renderTextField,label:"Role Name",disabled:this.isDisabled()})})}),(0,O.jsxs)(w.Z,{spacing:1,mt:2,direction:"row",className:"modal-button-area",children:[(0,O.jsx)(i.Z,{variant:"contained",type:"submit",children:"Submit"}),(0,O.jsx)(i.Z,{variant:"outlined",onClick:function(){return e.props.handleCancel()},children:"Cancel"})]})]})})}}])&&k(t.prototype,r),n&&k(t,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(n.Component),F=(0,l.Z)((0,o.connect)((function(e){return{}}),(function(e){return{dispatch:e,actions:(0,s.bindActionCreators)({roleCreate:f.v9,roleUpdate:f.vh},e)}}))((0,v.sx)({form:"RoleForm",validate:function(e){var t={};return["name"].forEach((function(r){e[r]||(t[r]="Required")})),t}})(Z))),T=r(72897),q=r(57446),N=r(54453);function G(e){return G="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},G(e)}function U(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function A(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?U(Object(r),!0).forEach((function(t){Y(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):U(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function B(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function I(e,t){return I=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},I(e,t)}function W(e,t){if(t&&("object"===G(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return z(e)}function z(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function V(e){return V=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},V(e)}function Y(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var Q=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&I(e,t)}(f,e);var t,r,n,o,s,l=(o=f,s=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=V(o);if(s){var r=V(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return W(this,e)});function f(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,f),Y(z(t=l.call(this,e)),"handlePagination",(function(e){t.setState({queryParams:A(A({},t.state.queryParams),{},{page:e})},(function(){t.loadListData()}))})),Y(z(t),"loadListData",(function(){t.props.actions.roleList(t.state.queryParams)})),Y(z(t),"handleEdit",(function(e){t.setState({editRow:e,openDialog:!0,dialogTitle:"Edit Role"})})),Y(z(t),"handlePermissions",(function(e){t.props.navigate("permissions/"+e.id)})),Y(z(t),"handleDelete",(function(e){t.props.actions.roleDelete(e.id)})),Y(z(t),"handleCreate",(function(){t.setState({openDialog:!0,dialogTitle:"Create Role",editRow:null})})),Y(z(t),"handleDialogClose",(function(e,r){r&&"backdropClick"==r||t.setState({openDialog:!1,editRow:null})})),Y(z(t),"submit",(function(e){t.state.editRow?t.props.actions.roleUpdate(t.state.editRow.id,e):t.props.actions.roleCreate(e)})),Y(z(t),"handleCancel",(function(){t.handleDialogClose()})),t.state=A(A({},t.props),{},{queryParams:{page:1,limit:50},openDialog:!1,isCreate:!0,editRow:null,createSuccess:!1,editSuccess:!1,deleteSuccess:!1,actionCalled:t.props.actionCalled,successMessage:t.props.successMessage,errorMessage:t.props.errorMessage}),t.columns=[{name:"name",display_name:"Role Name"}],t}return t=f,n=[{key:"getDerivedStateFromProps",value:function(e,t){var r={};return e.items!==t.items&&(r.items=e.items),e.total!==t.total&&(r.total=e.total),e.actionCalled!==t.actionCalled&&(r.actionCalled=e.actionCalled),e.successMessage!==t.successMessage&&(r.successMessage=e.successMessage),e.errorMessage!==t.errorMessage&&(r.errorMessage=e.errorMessage),"createSuccess"in e&&e.createSuccess!==t.createSuccess&&(r.createSuccess=e.createSuccess),"editSuccess"in e&&e.editSuccess!==t.editSuccess&&(r.editSuccess=e.editSuccess),"deleteSuccess"in e&&e.deleteSuccess!==t.deleteSuccess&&(r.deleteSuccess=e.deleteSuccess),e.permissions!==t.permissions&&(r.permissions=e.permissions),r}}],(r=[{key:"componentDidMount",value:function(){this.loadListData()}},{key:"componentDidUpdate",value:function(){var e=this;this.state.actionCalled&&(this.state.createSuccess?(this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),this.props.dispatch({type:N.Cd,payload:!1}),this.setState({queryParams:A(A({},this.state.queryParams),{},{page:1}),openDialog:!1,editRow:null},(function(){e.loadListData()}))):this.state.editSuccess?(this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),this.props.dispatch({type:N.hv,payload:!1}),this.setState({queryParams:A(A({},this.state.queryParams),{},{page:1}),openDialog:!1,editRow:null},(function(){e.loadListData()}))):this.state.deleteSuccess?(this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),this.props.dispatch({type:N.cc,payload:!1}),this.handlePagination(1)):null!=this.state.errorMessage&&this.props.enqueueSnackbar(this.state.errorMessage,{variant:"error"}),this.props.dispatch({type:N.fQ}))}},{key:"render",value:function(){return(0,O.jsxs)(u.Z,{title:"Roles",secondary:(0,q.Fs)(this.state.permissions,"roles","add")?(0,O.jsx)(i.Z,{variant:"contained",onClick:this.handleCreate,children:"Add"}):null,children:[(0,O.jsx)(a.ZP,{container:!0,spacing:c.dv,children:(0,O.jsx)(p.Z,{columns:this.columns,rows:this.state.items,page:this.state.queryParams.page,limit:this.state.queryParams.limit,total:this.state.total,handlePagination:this.handlePagination,actions:[{label:"Edit",onClick:this.handleEdit,color:"primary",show:(0,q.Fs)(this.state.permissions,"roles","edit")},{label:"Delete",onClick:this.handleDelete,isDelete:!0,color:"error",show:(0,q.Fs)(this.state.permissions,"roles","delete"),conditions:[{key:"can_delete",value:!0}]},{label:"Permissions",onClick:this.handlePermissions,color:"primary",show:(0,q.Fs)(this.state.permissions,"roles","edit")}]})}),(0,O.jsxs)(h.Z,{className:"ratn-dialog-wrapper",open:this.state.openDialog,onClose:this.handleDialogClose,fullWidth:!0,maxWidth:"sm",children:[(0,O.jsx)(m.Z,{children:this.state.dialogTitle}),(0,O.jsxs)(d.Z,{children:[(0,O.jsx)(y.Z,{}),(0,O.jsx)(F,{formData:this.state.editRow,handleCancel:this.handleCancel})]})]})]})}}])&&B(t.prototype,r),n&&B(t,n),Object.defineProperty(t,"prototype",{writable:!1}),f}(n.Component),H=(0,T.RM)((0,l.Z)((0,o.connect)((function(e){return{items:e.superadmin.role.items,total:e.superadmin.role.total,actionCalled:e.superadmin.role.actionCalled,createSuccess:e.superadmin.role.createSuccess,editSuccess:e.superadmin.role.editSuccess,deleteSuccess:e.superadmin.role.deleteSuccess,successMessage:e.superadmin.role.successMessage,errorMessage:e.superadmin.role.errorMessage,permissions:e.employee.permissions.permissions}}),(function(e){return{dispatch:e,actions:(0,s.bindActionCreators)({roleList:f.Uy,roleCreate:f.v9,roleUpdate:f.vh,roleDelete:f.Fe},e)}}))(Q)))}}]);