/*! For license information please see 8853.js.LICENSE.txt */
(self.webpackChunk=self.webpackChunk||[]).push([[8853],{87215:function(e,t,n){"use strict";n.d(t,{GS:function(){return o},Iu:function(){return u},KP:function(){return l},Kj:function(){return s},Kz:function(){return i},VC:function(){return d},uE:function(){return c}});var r=n(69222),a=n(57446),s=function(e){return e=(0,a.B7)(e,!0),r.Z.get("/superadmin/salary".concat(e))},i=function(e){return r.Z.post("/superadmin/salary/store",e)},o=function(e){return r.Z.post("/superadmin/salary/advance-store",e)},l=function(e){return r.Z.get("/superadmin/salary/history/"+e)},c=function(e){return r.Z.post("/superadmin/salary/pay",e)},u=function(e){return r.Z.post("/superadmin/salary/download/"+e)},d=function(e){return e=(0,a.B7)(e,!0),r.Z.get("/superadmin/salary-employees".concat(e))}},1284:function(e,t,n){"use strict";n.r(t);var r=n(27378),a=n(23884),s=n(28730),i=n(43564),o=n(23434),l=n(56793),c=n(64212),u=n(55378),d=n(60789),h=n(96616),m=n(19265),p=n(97722),f=n(49444),j=n(68456),v=n(47265),y=n(92146),x=n(78153),g=n(10418),b=n(41485),Z=n(16569),_=n(76125),w=n(50243),P=n(38543),k=n(10755),S=n(74154),C=n(8971),O=n(13040),N=n(87215),E=(n(46265),n(74570)),A=n(26803),L=n(93033),D=(n(39805),n(72897)),F=n(57446),q=n(87264),z=n(61320),W=n.n(z),I=n(98784),R=n.n(I),T=n(24246);function G(e){return G="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},G(e)}function M(){M=function(){return e};var e={},t=Object.prototype,n=t.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},a=r.iterator||"@@iterator",s=r.asyncIterator||"@@asyncIterator",i=r.toStringTag||"@@toStringTag";function o(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{o({},"")}catch(e){o=function(e,t,n){return e[t]=n}}function l(e,t,n,r){var a=t&&t.prototype instanceof d?t:d,s=Object.create(a.prototype),i=new _(r||[]);return s._invoke=function(e,t,n){var r="suspendedStart";return function(a,s){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===a)throw s;return{value:void 0,done:!0}}for(n.method=a,n.arg=s;;){var i=n.delegate;if(i){var o=g(i,n);if(o){if(o===u)continue;return o}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var l=c(e,t,n);if("normal"===l.type){if(r=n.done?"completed":"suspendedYield",l.arg===u)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(r="completed",n.method="throw",n.arg=l.arg)}}}(e,n,i),s}function c(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(e){return{type:"throw",arg:e}}}e.wrap=l;var u={};function d(){}function h(){}function m(){}var p={};o(p,a,(function(){return this}));var f=Object.getPrototypeOf,j=f&&f(f(w([])));j&&j!==t&&n.call(j,a)&&(p=j);var v=m.prototype=d.prototype=Object.create(p);function y(e){["next","throw","return"].forEach((function(t){o(e,t,(function(e){return this._invoke(t,e)}))}))}function x(e,t){function r(a,s,i,o){var l=c(e[a],e,s);if("throw"!==l.type){var u=l.arg,d=u.value;return d&&"object"==G(d)&&n.call(d,"__await")?t.resolve(d.__await).then((function(e){r("next",e,i,o)}),(function(e){r("throw",e,i,o)})):t.resolve(d).then((function(e){u.value=e,i(u)}),(function(e){return r("throw",e,i,o)}))}o(l.arg)}var a;this._invoke=function(e,n){function s(){return new t((function(t,a){r(e,n,t,a)}))}return a=a?a.then(s,s):s()}}function g(e,t){var n=e.iterator[t.method];if(void 0===n){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,g(e,t),"throw"===t.method))return u;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return u}var r=c(n,e.iterator,t.arg);if("throw"===r.type)return t.method="throw",t.arg=r.arg,t.delegate=null,u;var a=r.arg;return a?a.done?(t[e.resultName]=a.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,u):a:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,u)}function b(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function Z(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function _(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(b,this),this.reset(!0)}function w(e){if(e){var t=e[a];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,s=function t(){for(;++r<e.length;)if(n.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=void 0,t.done=!0,t};return s.next=s}}return{next:P}}function P(){return{value:void 0,done:!0}}return h.prototype=m,o(v,"constructor",m),o(m,"constructor",h),h.displayName=o(m,i,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===h||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,m):(e.__proto__=m,o(e,i,"GeneratorFunction")),e.prototype=Object.create(v),e},e.awrap=function(e){return{__await:e}},y(x.prototype),o(x.prototype,s,(function(){return this})),e.AsyncIterator=x,e.async=function(t,n,r,a,s){void 0===s&&(s=Promise);var i=new x(l(t,n,r,a),s);return e.isGeneratorFunction(n)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},y(v),o(v,i,"Generator"),o(v,a,(function(){return this})),o(v,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},e.values=w,_.prototype={constructor:_,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(Z),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(n,r){return i.type="throw",i.arg=e,t.next=n,r&&(t.method="next",t.arg=void 0),!!r}for(var a=this.tryEntries.length-1;a>=0;--a){var s=this.tryEntries[a],i=s.completion;if("root"===s.tryLoc)return r("end");if(s.tryLoc<=this.prev){var o=n.call(s,"catchLoc"),l=n.call(s,"finallyLoc");if(o&&l){if(this.prev<s.catchLoc)return r(s.catchLoc,!0);if(this.prev<s.finallyLoc)return r(s.finallyLoc)}else if(o){if(this.prev<s.catchLoc)return r(s.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<s.finallyLoc)return r(s.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var s=a;break}}s&&("break"===e||"continue"===e)&&s.tryLoc<=t&&t<=s.finallyLoc&&(s=null);var i=s?s.completion:{};return i.type=e,i.arg=t,s?(this.method="next",this.next=s.finallyLoc,u):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),u},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),Z(n),u}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var a=r.arg;Z(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:w(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),u}},e}function Y(e,t,n,r,a,s,i){try{var o=e[s](i),l=o.value}catch(e){return void n(e)}o.done?t(l):Promise.resolve(l).then(r,a)}function V(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var s=e.apply(t,n);function i(e){Y(s,r,a,i,o,"next",e)}function o(e){Y(s,r,a,i,o,"throw",e)}i(void 0)}))}}function K(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function U(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?K(Object(n),!0).forEach((function(t){$(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):K(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function B(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function J(e,t){return J=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},J(e,t)}function H(e,t){if(t&&("object"===G(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return Q(e)}function Q(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function X(e){return X=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},X(e)}function $(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var ee=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&J(e,t)}(O,e);var t,n,r,a,k=(r=O,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=X(r);if(a){var n=X(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return H(this,e)});function O(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,O),$(Q(t=k.call(this,e)),"handlePagination",(function(e){t.setState({queryParams:U(U({},t.state.queryParams),{},{page:e})},(function(){t.loadListData()}))})),$(Q(t),"loadListData",V(M().mark((function e(){var n;return M().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,N.Kj)(t.state.queryParams);case 2:(n=e.sent).data.success&&t.setState({items:n.data.data.items,total:n.data.data.total});case 4:case"end":return e.stop()}}),e)})))),$(Q(t),"generateSalaries",V(M().mark((function e(){var n;return M().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,N.Kz)();case 2:(n=e.sent).data.success&&n.data.data.is_generated&&t.loadListData();case 4:case"end":return e.stop()}}),e)})))),$(Q(t),"loadEmployees",V(M().mark((function e(){var n;return M().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,N.VC)();case 2:(n=e.sent).data.success&&t.setState({employees:n.data.data});case 4:case"end":return e.stop()}}),e)})))),$(Q(t),"handleDownload",function(){var e=V(M().mark((function e(t){var n;return M().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,N.Iu)(t.id);case 2:(n=e.sent).data.success&&window.open(n.data.data.url,"_blank").focus();case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),$(Q(t),"handlePay",(function(e){t.setState({openDialog:!0,payRow:e})})),$(Q(t),"handleDialogClose",(function(){t.setState({openDialog:!1})})),$(Q(t),"handleAdvancePayConfirm",V(M().mark((function e(){var n;return M().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.advanceFormValodate()){e.next=2;break}return e.abrupt("return");case 2:return t.setState({processing:!0}),e.next=5,(0,N.GS)(t.state.advanceForm);case 5:(n=e.sent).data.success?(t.props.enqueueSnackbar(n.data.message,{variant:"success"}),t.setState({advanceDialoge:!1}),t.loadListData(),t.loadEmployees()):t.props.enqueueSnackbar(n.data.message,{variant:"error"}),t.setState({processing:!1});case 8:case"end":return e.stop()}}),e)})))),$(Q(t),"advanceFormValodate",(function(){var e=t.state.advanceForm,n=t.state.advanceFormErrors,r=!1;return(0,F.xb)(e.user_id)?(n.user_id=!0,r=!0):n.user_id=!1,(0,F.xb)(e.amount)?(n.amount=!0,r=!0):n.amount=!1,t.setState({advanceFormErrors:n}),r})),$(Q(t),"handlePayConfirm",V(M().mark((function e(){var n,r;return M().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=!1,(0,F.xb)(t.state.amount)?(t.setState({amount_err:!0}),n=!0):t.setState({amount_err:!1}),(0,F.xb)(t.state.payment_mode)?(t.setState({payment_mode_err:!0}),n=!0):t.setState({payment_mode_err:!1}),!n){e.next=5;break}return e.abrupt("return");case 5:return t.setState({processing:!0}),e.next=8,(0,N.uE)({id:t.state.payRow.id,amount:t.state.amount,payment_mode:t.state.payment_mode});case 8:(r=e.sent).data.success?(t.props.enqueueSnackbar(r.data.message,{variant:"success"}),t.setState({openDialog:!1,all_checked:!1}),t.loadListData()):t.props.enqueueSnackbar(r.data.message,{variant:"error"}),t.setState({processing:!1});case 11:case"end":return e.stop()}}),e)})))),$(Q(t),"handleSearchChange",(function(e,n){t.setState({queryParams:U(U({},t.state.queryParams),{},$({},n,e))})})),$(Q(t),"handleSearch",(function(){t.loadListData()})),$(Q(t),"getYears",(function(){for(var e=[],t=2022;t<=W()().format("YYYY");t++)e.push(t);return e})),$(Q(t),"handleAdvance",(function(){t.setState({advanceDialoge:!0,employe_advance:0,advanceForm:{user_id:"",amount:"",cheque_no:"",payment_mode:"cash",payment_type:"advance"}})})),$(Q(t),"handleAdvanceClose",(function(){t.setState({advanceDialoge:!1})})),$(Q(t),"handleAdvanceForm",(function(e){var n=e.target,r=n.name,a=n.value;t.setState({advanceForm:U(U({},t.state.advanceForm),{},$({},r,a))},(function(){if("user_id"==r){var e=0;a&&(e=R().filter(t.state.employees,{id:a})[0].advance_amount),t.setState({employe_advance:e})}}))})),t.state={items:[],total:0,queryParams:{page:1,limit:50,month:"",year:"",user_id:"",status:"",type:"salary"},all_checked:!1,total_amount:0,openDialog:!1,processing:!1,employees:[],payRow:null,advanceDialoge:!1,advanceForm:{user_id:"",amount:"",cheque_no:"",payment_mode:"cash",payment_type:"advance"},advanceFormErrors:{user_id:!1,amount:!1},employe_advance:0,amount:"",payment_mode:"cash",amount_err:!1,payment_mode_err:!1},t}return t=O,(n=[{key:"componentDidMount",value:function(){this.loadListData(),this.generateSalaries(),this.loadEmployees()}},{key:"render",value:function(){var e=this,t=this.state,n=t.items,r=(t.total,t.all_checked,t.total_amount,t.employees),a=t.payRow,k=t.advanceForm,O=t.advanceFormErrors,N=this.getYears(),D=[];return D="advance"==k.payment_type?[{value:"cash",label:"Cash"},{value:"cheque",label:"Cheque"},{value:"imps_neft",label:"NEFT/IMPS/UPI"},{value:"online",label:"Online"}]:[{value:"cash",label:"Cash"},{value:"imps_neft",label:"NEFT/IMPS/UPI"},{value:"online",label:"Online"}],(0,T.jsxs)(C.Z,{title:"Salaries",secondary:(0,T.jsx)(s.Z,{variant:"contained",onClick:this.handleAdvance,children:"Advance / Repayment"}),children:[(0,T.jsx)(i.Z,{sx:{flexGrow:1,m:.5},className:"ratn-dialog-inner",children:(0,T.jsxs)(o.ZP,{container:!0,spacing:2,columnSpacing:{xs:1,sm:2,md:2},className:"tax-input loans_view p_view",children:[(0,T.jsx)(o.ZP,{item:!0,xs:6,md:2,className:"create-input",children:(0,T.jsxs)(l.Z,{fullWidth:!0,children:[(0,T.jsx)(c.Z,{children:"Month"}),(0,T.jsxs)(u.Z,{value:this.state.queryParams.month,label:"Month",onChange:function(t){return e.handleSearchChange(t.target.value,"month")},className:"input-inner",defaultValue:"",children:[(0,T.jsx)(d.Z,{value:"",children:"All"}),(0,T.jsx)(d.Z,{value:"01",children:"Jan"}),(0,T.jsx)(d.Z,{value:"02",children:"Feb"}),(0,T.jsx)(d.Z,{value:"03",children:"Mar"}),(0,T.jsx)(d.Z,{value:"04",children:"Apr"}),(0,T.jsx)(d.Z,{value:"05",children:"May"}),(0,T.jsx)(d.Z,{value:"06",children:"Jun"}),(0,T.jsx)(d.Z,{value:"07",children:"Jul"}),(0,T.jsx)(d.Z,{value:"08",children:"Aug"}),(0,T.jsx)(d.Z,{value:"09",children:"Sep"}),(0,T.jsx)(d.Z,{value:"10",children:"Oct"}),(0,T.jsx)(d.Z,{value:"11",children:"Nov"}),(0,T.jsx)(d.Z,{value:"12",children:"Dec"})]})]})}),(0,T.jsx)(o.ZP,{item:!0,xs:6,md:2,className:"create-input",children:(0,T.jsxs)(l.Z,{fullWidth:!0,children:[(0,T.jsx)(c.Z,{children:"Year"}),(0,T.jsxs)(u.Z,{value:this.state.queryParams.year,label:"Year",onChange:function(t){return e.handleSearchChange(t.target.value,"year")},className:"input-inner",defaultValue:"",children:[(0,T.jsx)(d.Z,{value:"",children:"All"}),N.map((function(e,t){return(0,T.jsx)(d.Z,{value:e,children:e},t)}))]})]})}),(0,T.jsx)(o.ZP,{item:!0,xs:6,md:2,className:"create-input",children:(0,T.jsxs)(l.Z,{fullWidth:!0,children:[(0,T.jsx)(c.Z,{children:"Employee"}),(0,T.jsxs)(u.Z,{value:this.state.queryParams.user_id,label:"Employee",onChange:function(t){return e.handleSearchChange(t.target.value,"user_id")},className:"input-inner",defaultValue:"",children:[(0,T.jsx)(d.Z,{value:"",children:"All"}),r.map((function(e,t){return(0,T.jsx)(d.Z,{value:e.id,children:e.name},t)}))]})]})}),(0,T.jsx)(o.ZP,{item:!0,xs:6,md:2,className:"create-input",children:(0,T.jsxs)(l.Z,{fullWidth:!0,children:[(0,T.jsx)(c.Z,{children:"Status"}),(0,T.jsxs)(u.Z,{value:this.state.queryParams.status,label:"Status",onChange:function(t){return e.handleSearchChange(t.target.value,"status")},className:"input-inner",defaultValue:"",children:[(0,T.jsx)(d.Z,{value:"",children:"All"}),(0,T.jsx)(d.Z,{value:"pending",children:"Pending"}),(0,T.jsx)(d.Z,{value:"paid",children:"Paid"})]})]})}),(0,T.jsx)(o.ZP,{item:!0,xs:6,md:2,className:"create-input",children:(0,T.jsxs)(l.Z,{fullWidth:!0,children:[(0,T.jsx)(c.Z,{children:"Type"}),(0,T.jsxs)(u.Z,{value:this.state.queryParams.type,label:"Type",onChange:function(t){return e.handleSearchChange(t.target.value,"type")},className:"input-inner",defaultValue:"",children:[(0,T.jsx)(d.Z,{value:"salary",children:"Salary"}),(0,T.jsx)(d.Z,{value:"advance",children:"Advance"}),(0,T.jsx)(d.Z,{value:"repayment",children:"Repayment"})]})]})}),(0,T.jsx)(o.ZP,{item:!0,xs:6,md:2,className:"create-input order-input button-right",children:(0,T.jsx)(s.Z,{variant:"contained",className:"search-btn",onClick:this.handleSearch,children:"Search"})})]})}),(0,T.jsx)(o.ZP,{container:!0,spacing:S.dv,children:(0,T.jsx)(h.Z,{component:m.Z,className:"ratn-table-wrapper",children:(0,T.jsxs)(p.Z,{sx:{minWidth:500},children:[(0,T.jsx)(f.Z,{className:"ratn-table-header",children:(0,T.jsxs)(j.Z,{children:[(0,T.jsx)(v.Z,{children:"#"}),(0,T.jsx)(v.Z,{children:"Date"}),(0,T.jsx)(v.Z,{children:"Employee"}),(0,T.jsx)(v.Z,{children:"Designation"}),"salary"==this.state.queryParams.type?(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(v.Z,{children:"Absent"}),(0,T.jsx)(v.Z,{children:"Gross"}),(0,T.jsx)(v.Z,{children:"Ptax"}),(0,T.jsx)(v.Z,{children:"Absent Amt"})]}):null,(0,T.jsx)(v.Z,{children:"Total"}),"salary"==this.state.queryParams.type?(0,T.jsx)(v.Z,{children:"Actions"}):null]})}),(0,T.jsxs)(y.Z,{children:[n.map((function(t,n){return(0,T.jsxs)(j.Z,{children:[(0,T.jsx)(v.Z,{children:n+1}),(0,T.jsx)(v.Z,{children:t.display_date}),(0,T.jsx)(v.Z,{children:t.user_name}),(0,T.jsx)(v.Z,{children:t.role_name}),"salary"==e.state.queryParams.type?(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(v.Z,{children:t.absent}),(0,T.jsx)(v.Z,{children:t.gross}),(0,T.jsx)(v.Z,{children:t.ptax}),(0,T.jsx)(v.Z,{children:t.absent_amount})]}):null,(0,T.jsx)(v.Z,{children:t.net}),"salary"==e.state.queryParams.type?(0,T.jsx)(v.Z,{className:"action_btn",children:(0,T.jsx)(x.Z,{spacing:1,direction:"row",children:"salary"==t.type?(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(s.Z,{variant:"contained",color:"primary",onClick:function(){return e.handleDownload(t)},children:(0,T.jsx)(q.Z,{})}),"paid"!=t.status?(0,T.jsx)(s.Z,{variant:"contained",color:"primary",onClick:function(){return e.handlePay(t)},className:"label_btn",children:"Pay"}):null,(0,T.jsx)(s.Z,{variant:"contained",color:"primary",onClick:function(){return e.props.navigate("history/"+t.user_id)},className:"label_btn",children:"History"})]}):null})}):null]},n)})),0==n.length?(0,T.jsx)(j.Z,{children:(0,T.jsx)(v.Z,{align:"center",colSpan:"salary"==this.state.queryParams.type?10:5,children:"No data found."})}):null]})]})})}),(0,T.jsxs)(E.Z,{className:"ratn-dialog-wrapper",open:this.state.openDialog,onClose:this.handleDialogClose,fullWidth:!0,maxWidth:"sm",children:[(0,T.jsx)(L.Z,{children:"Pay Salary"}),(0,T.jsx)(A.Z,{children:a?(0,T.jsx)(i.Z,{sx:{flexGrow:1,m:.5},children:(0,T.jsxs)(o.ZP,{container:!0,spacing:2,columnSpacing:{xs:1,sm:2,md:2},children:[(0,T.jsx)(o.ZP,{item:!0,xs:12,md:4,children:(0,T.jsx)(g.Z,{label:"Name",variant:"outlined",fullWidth:!0,value:a.user_name,name:"Name",disabled:!0,inputProps:{className:"non_disable_text"}})}),(0,T.jsx)(o.ZP,{item:!0,xs:12,md:4,children:(0,T.jsx)(g.Z,{label:"Advance Amount",variant:"outlined",fullWidth:!0,value:a.advance_amount,name:"Advance Amount",disabled:!0,InputProps:{className:"non_disable_text",startAdornment:(0,T.jsx)(b.Z,{position:"start",children:"₹"})}})}),(0,T.jsx)(o.ZP,{item:!0,xs:12,md:4,children:(0,T.jsx)(g.Z,{label:"Due Amount",variant:"outlined",fullWidth:!0,value:a.due_amount,name:"Due Amount",disabled:!0,InputProps:{className:"non_disable_text",startAdornment:(0,T.jsx)(b.Z,{position:"start",children:"₹"})}})}),(0,T.jsx)(o.ZP,{item:!0,xs:12,md:4,children:(0,T.jsx)(g.Z,{label:"Incentive",variant:"outlined",fullWidth:!0,value:a.incentive,name:"Incentive",disabled:!0,InputProps:{className:"non_disable_text",startAdornment:(0,T.jsx)(b.Z,{position:"start",children:"₹"})}})}),(0,T.jsx)(o.ZP,{item:!0,xs:12,md:4,children:(0,T.jsx)(g.Z,{label:"Net",variant:"outlined",fullWidth:!0,value:a.net,name:"Net",disabled:!0,InputProps:{className:"non_disable_text",startAdornment:(0,T.jsx)(b.Z,{position:"start",children:"₹"})}})}),(0,T.jsx)(o.ZP,{item:!0,xs:12,md:4,children:(0,T.jsx)(g.Z,{label:"Paid Amount",variant:"outlined",fullWidth:!0,value:this.state.amount,name:"Paid Amount",onChange:function(t){return e.setState({amount:t.target.value})},InputProps:{startAdornment:(0,T.jsx)(b.Z,{position:"start",children:"₹"})},error:this.state.amount_err})}),(0,T.jsx)(o.ZP,{item:!0,xs:12,md:4,className:"create-input",children:(0,T.jsxs)(l.Z,{fullWidth:!0,error:this.state.payment_mode_err,children:[(0,T.jsx)(c.Z,{children:"Payment Mode"}),(0,T.jsxs)(u.Z,{className:"input-inner",value:this.state.payment_mode,fullWidth:!0,label:"Payment Mode",onChange:function(t){return e.setState({payment_mode:t.target.value})},children:[(0,T.jsx)(d.Z,{value:""}),(0,T.jsx)(d.Z,{value:"cash",children:"Cash"}),(0,T.jsx)(d.Z,{value:"imps_neft",children:"NEFT/IMPS/UPI"}),(0,T.jsx)(d.Z,{value:"online",children:"Online"})]})]})})]})}):null}),(0,T.jsx)(Z.Z,{children:(0,T.jsxs)(x.Z,{spacing:2,direction:"row",justifyContent:"flex-end",children:[(0,T.jsx)(s.Z,{variant:"outlined",onClick:this.handleDialogClose,children:"Cancel"}),(0,T.jsx)(s.Z,{variant:"contained",type:"button",onClick:this.handlePayConfirm,disabled:this.state.processing,children:this.state.processing?"Processing":"Yes, Confirm"})]})})]}),(0,T.jsxs)(E.Z,{className:"ratn-dialog-wrapper",open:this.state.advanceDialoge,onClose:this.handleAdvanceClose,fullWidth:!0,maxWidth:"xs",children:[(0,T.jsx)(L.Z,{children:"Advance / Repayment"}),(0,T.jsx)(A.Z,{children:(0,T.jsx)(i.Z,{sx:{flexGrow:1,m:.5},children:(0,T.jsxs)(o.ZP,{container:!0,spacing:2,columnSpacing:{xs:1,sm:2,md:2},children:[(0,T.jsx)(o.ZP,{item:!0,xs:12,md:8,children:(0,T.jsx)(l.Z,{children:(0,T.jsxs)(_.Z,{row:!0,value:k.payment_type,name:"payment_type",onChange:function(t){return e.handleAdvanceForm(t)},children:[(0,T.jsx)(w.Z,{value:"advance",control:(0,T.jsx)(P.Z,{}),label:"Advance"}),(0,T.jsx)(w.Z,{value:"repayment",control:(0,T.jsx)(P.Z,{}),label:"Repayment"})]})})}),(0,T.jsx)(o.ZP,{item:!0,xs:12,md:4,children:"repayment"==k.payment_type&&0!==this.state.employe_advance?(0,T.jsx)(T.Fragment,{children:(0,T.jsxs)("p",{children:["Advance: ",(0,T.jsx)("b",{children:this.state.employe_advance})]})}):null}),(0,T.jsx)(o.ZP,{item:!0,xs:12,md:6,children:(0,T.jsxs)(l.Z,{fullWidth:!0,error:O.user_id,children:[(0,T.jsx)(c.Z,{children:"Employee"}),(0,T.jsxs)(u.Z,{className:"input-inner",value:k.user_id,fullWidth:!0,label:"Employee",name:"user_id",onChange:function(t){return e.handleAdvanceForm(t)},children:[(0,T.jsx)(d.Z,{value:""}),r.map((function(e,t){return(0,T.jsx)(d.Z,{value:e.id,children:e.name},t)}))]})]})}),(0,T.jsx)(o.ZP,{item:!0,xs:12,md:6,children:(0,T.jsx)(g.Z,{fullWidth:!0,value:k.amount,InputProps:{startAdornment:(0,T.jsx)(b.Z,{position:"start",children:"₹"})},label:"Amount",variant:"outlined",name:"amount",onChange:function(t){return e.handleAdvanceForm(t)},error:O.amount})}),(0,T.jsx)(o.ZP,{item:!0,xs:12,md:6,children:(0,T.jsxs)(l.Z,{fullWidth:!0,children:[(0,T.jsx)(c.Z,{children:"Payment Mode"}),(0,T.jsx)(u.Z,{className:"input-inner",value:k.payment_mode,fullWidth:!0,label:"Payment Mode",name:"payment_mode",onChange:function(t){return e.handleAdvanceForm(t)},children:D.map((function(e,t){return(0,T.jsx)(d.Z,{value:e.value,children:e.label},t)}))})]})}),"cheque"==k.payment_mode?(0,T.jsx)(o.ZP,{item:!0,xs:12,md:6,children:(0,T.jsx)(g.Z,{label:"Cheque No",variant:"outlined",fullWidth:!0,value:k.cheque_no,name:"cheque_no",onChange:function(t){return e.handleAdvanceForm(t)}})}):null]})})}),(0,T.jsx)(Z.Z,{children:(0,T.jsxs)(x.Z,{spacing:2,direction:"row",justifyContent:"flex-end",children:[(0,T.jsx)(s.Z,{variant:"outlined",onClick:this.handleAdvanceClose,children:"Cancel"}),(0,T.jsx)(s.Z,{variant:"contained",type:"button",onClick:this.handleAdvancePayConfirm,disabled:this.state.processing,children:this.state.processing?"Processing":"Yes, Confirm"})]})})]})]})}}])&&B(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),O}(r.Component);t.default=(0,D.RM)((0,O.Z)((0,a.connect)((function(e){return{}}),(function(e){return{dispatch:e,actions:(0,k.bindActionCreators)({},e)}}))(ee)))},95126:function(e,t,n){var r={"./af":1009,"./af.js":1009,"./ar":88769,"./ar-dz":23739,"./ar-dz.js":23739,"./ar-kw":93745,"./ar-kw.js":93745,"./ar-ly":99576,"./ar-ly.js":99576,"./ar-ma":67408,"./ar-ma.js":67408,"./ar-sa":48781,"./ar-sa.js":48781,"./ar-tn":87856,"./ar-tn.js":87856,"./ar.js":88769,"./az":2030,"./az.js":2030,"./be":56476,"./be.js":56476,"./bg":25304,"./bg.js":25304,"./bm":48125,"./bm.js":48125,"./bn":34,"./bn-bd":29835,"./bn-bd.js":29835,"./bn.js":34,"./bo":64082,"./bo.js":64082,"./br":8317,"./br.js":8317,"./bs":93107,"./bs.js":93107,"./ca":68272,"./ca.js":68272,"./cs":98567,"./cs.js":98567,"./cv":61583,"./cv.js":61583,"./cy":10076,"./cy.js":10076,"./da":31760,"./da.js":31760,"./de":8973,"./de-at":63214,"./de-at.js":63214,"./de-ch":74728,"./de-ch.js":74728,"./de.js":8973,"./dv":54053,"./dv.js":54053,"./el":7499,"./el.js":7499,"./en-au":67876,"./en-au.js":67876,"./en-ca":47010,"./en-ca.js":47010,"./en-gb":34239,"./en-gb.js":34239,"./en-ie":99830,"./en-ie.js":99830,"./en-il":28438,"./en-il.js":28438,"./en-in":25322,"./en-in.js":25322,"./en-nz":43264,"./en-nz.js":43264,"./en-sg":55449,"./en-sg.js":55449,"./eo":39486,"./eo.js":39486,"./es":32430,"./es-do":16310,"./es-do.js":16310,"./es-mx":27038,"./es-mx.js":27038,"./es-us":73099,"./es-us.js":73099,"./es.js":32430,"./et":34975,"./et.js":34975,"./eu":87063,"./eu.js":87063,"./fa":68073,"./fa.js":68073,"./fi":50957,"./fi.js":50957,"./fil":8764,"./fil.js":8764,"./fo":81775,"./fo.js":81775,"./fr":74179,"./fr-ca":14306,"./fr-ca.js":14306,"./fr-ch":73791,"./fr-ch.js":73791,"./fr.js":74179,"./fy":47014,"./fy.js":47014,"./ga":46911,"./ga.js":46911,"./gd":62958,"./gd.js":62958,"./gl":87344,"./gl.js":87344,"./gom-deva":33161,"./gom-deva.js":33161,"./gom-latn":35798,"./gom-latn.js":35798,"./gu":68485,"./gu.js":68485,"./he":27917,"./he.js":27917,"./hi":52159,"./hi.js":52159,"./hr":95842,"./hr.js":95842,"./hu":30005,"./hu.js":30005,"./hy-am":51312,"./hy-am.js":51312,"./id":60781,"./id.js":60781,"./is":64101,"./is.js":64101,"./it":43467,"./it-ch":4759,"./it-ch.js":4759,"./it.js":43467,"./ja":44164,"./ja.js":44164,"./jv":70079,"./jv.js":70079,"./ka":57036,"./ka.js":57036,"./kk":92022,"./kk.js":92022,"./km":63418,"./km.js":63418,"./kn":43655,"./kn.js":43655,"./ko":30986,"./ko.js":30986,"./ku":91902,"./ku.js":91902,"./ky":4604,"./ky.js":4604,"./lb":99026,"./lb.js":99026,"./lo":20537,"./lo.js":20537,"./lt":22288,"./lt.js":22288,"./lv":1495,"./lv.js":1495,"./me":60690,"./me.js":60690,"./mi":2571,"./mi.js":2571,"./mk":93959,"./mk.js":93959,"./ml":97225,"./ml.js":97225,"./mn":88,"./mn.js":88,"./mr":46622,"./mr.js":46622,"./ms":11070,"./ms-my":48899,"./ms-my.js":48899,"./ms.js":11070,"./mt":63931,"./mt.js":63931,"./my":95393,"./my.js":95393,"./nb":4274,"./nb.js":4274,"./ne":8914,"./ne.js":8914,"./nl":33114,"./nl-be":68479,"./nl-be.js":68479,"./nl.js":33114,"./nn":4513,"./nn.js":4513,"./oc-lnc":46549,"./oc-lnc.js":46549,"./pa-in":28264,"./pa-in.js":28264,"./pl":32848,"./pl.js":32848,"./pt":90899,"./pt-br":55077,"./pt-br.js":55077,"./pt.js":90899,"./ro":92512,"./ro.js":92512,"./ru":21753,"./ru.js":21753,"./sd":16840,"./sd.js":16840,"./se":78362,"./se.js":78362,"./si":50464,"./si.js":50464,"./sk":66324,"./sk.js":66324,"./sl":41963,"./sl.js":41963,"./sq":53039,"./sq.js":53039,"./sr":93454,"./sr-cyrl":10466,"./sr-cyrl.js":10466,"./sr.js":93454,"./ss":36408,"./ss.js":36408,"./sv":28859,"./sv.js":28859,"./sw":57594,"./sw.js":57594,"./ta":26915,"./ta.js":26915,"./te":15677,"./te.js":15677,"./tet":92154,"./tet.js":92154,"./tg":74098,"./tg.js":74098,"./th":89071,"./th.js":89071,"./tk":49381,"./tk.js":49381,"./tl-ph":1869,"./tl-ph.js":1869,"./tlh":92346,"./tlh.js":92346,"./tr":71483,"./tr.js":71483,"./tzl":30266,"./tzl.js":30266,"./tzm":33138,"./tzm-latn":32960,"./tzm-latn.js":32960,"./tzm.js":33138,"./ug-cn":29456,"./ug-cn.js":29456,"./uk":50805,"./uk.js":50805,"./ur":61127,"./ur.js":61127,"./uz":29628,"./uz-latn":80840,"./uz-latn.js":80840,"./uz.js":29628,"./vi":56962,"./vi.js":56962,"./x-pseudo":49257,"./x-pseudo.js":49257,"./yo":62423,"./yo.js":62423,"./zh-cn":61002,"./zh-cn.js":61002,"./zh-hk":6046,"./zh-hk.js":6046,"./zh-mo":36903,"./zh-mo.js":36903,"./zh-tw":24710,"./zh-tw.js":24710};function a(e){var t=s(e);return n(t)}function s(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}a.keys=function(){return Object.keys(r)},a.resolve=s,e.exports=a,a.id=95126}}]);