"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4887],{56093:function(t,e,n){n.d(e,{IO:function(){return l},LR:function(){return u},d:function(){return c},rr:function(){return s},u:function(){return i}});var o=n(69222),r=n(71987),a=n(57446),i=function(t){return t=(0,a.B7)(t,!0),function(e){o.Z.get("/distributor/sales".concat(t)).then((function(t){t.data.success&&e({type:r.ao,payload:t.data.data})})).catch((function(t){}))}},s=function(t){return function(e){o.Z.post("/distributor/sales/store",t).then((function(t){e({type:r.Ho,payload:t.data})})).catch((function(t){}))}},c=function(t){return function(e){o.Z.get("/distributor/sales/view/".concat(t)).then((function(t){console.log(t.data.data),t.data.success&&e({type:r.zZ,payload:t.data.data})})).catch((function(t){}))}},u=function(t,e){return function(n){o.Z.post("/distributor/sales/update/".concat(t),e).then((function(t){n({type:r.Aq,payload:t.data})})).catch((function(t){}))}},l=function(t,e){return function(n){o.Z.delete("/distributor/sales/delete/".concat(t),e).then((function(t){n({type:r.y$,payload:t.data})})).catch((function(t){}))}}},84887:function(t,e,n){n.r(e);var o=n(27378),r=n(23884),a=n(28730),i=n(23434),s=n(10755),c=n(74154),u=n(8971),l=n(13040),f=n(56093),p=n(46265),d=n(71987),y=n(72897),b=n(24246);function h(t){return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},h(t)}function m(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function v(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?m(Object(n),!0).forEach((function(e){S(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function g(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function O(t,e){return O=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},O(t,e)}function P(t,e){if(e&&("object"===h(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return w(t)}function w(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function j(t){return j=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},j(t)}function S(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var D=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&O(t,e)}(f,t);var e,n,o,r,s,l=(r=f,s=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=j(r);if(s){var n=j(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return P(this,t)});function f(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,f),S(w(e=l.call(this,t)),"loadListData",(function(){e.props.salesList(e.state.queryParams)})),S(w(e),"handlePagination",(function(t){e.setState({queryParams:v(v({},e.state.queryParams),{},{page:t})},(function(){e.loadListData()}))})),S(w(e),"handleEdit",(function(t){e.props.navigate("edit/"+t.id)})),S(w(e),"handleView",(function(t){e.props.navigate("view/"+t.id)})),S(w(e),"handleDelete",(function(t){e.props.salesDelete(t.id)})),e.state={items:e.props.items,total:e.props.total,actionCalled:e.props.actionCalled,deleteSuccess:e.props.deleteSuccess,successMessage:e.props.successMessage,queryParams:{page:1,limit:15}},e.columns=[{name:"invoice_number",display_name:"Invoice Number"},{name:"invoice_date",display_name:"Invoice Date"},{name:"user_name",display_name:"Retailer Name"},{name:"total_amount",display_name:"Total Amount"}],e.tableActions=[{label:"View",onClick:e.handleView,color:"primary"},{label:"Delete",onClick:e.handleDelete,isDelete:!0,color:"error"}],e}return e=f,o=[{key:"getDerivedStateFromProps",value:function(t,e){var n={};return t.items!==e.items&&(n.items=t.items),t.total!==e.total&&(n.total=t.total),t.actionCalled!==e.actionCalled&&(n.actionCalled=t.actionCalled),t.deleteSuccess!==e.deleteSuccess&&(n.deleteSuccess=t.deleteSuccess),t.successMessage!==e.successMessage&&(n.successMessage=t.successMessage),n}}],(n=[{key:"componentDidMount",value:function(){this.loadListData()}},{key:"componentDidUpdate",value:function(t,e){if(this.state.deleteSuccess){var n=this.props.dispatch;this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),n({type:d.fw}),this.handlePagination(1)}}},{key:"render",value:function(){var t=this;return(0,b.jsx)(u.Z,{title:"Sales List",secondary:(0,b.jsx)(a.Z,{variant:"contained",onClick:function(){return t.props.navigate("create")},children:"Add"}),children:(0,b.jsx)(i.ZP,{container:!0,spacing:c.dv,children:(0,b.jsx)(p.Z,{columns:this.columns,rows:this.state.items,page:this.state.queryParams.page,limit:this.state.queryParams.limit,total:this.state.total,handlePagination:this.handlePagination,actions:this.tableActions})})})}}])&&g(e.prototype,n),o&&g(e,o),Object.defineProperty(e,"prototype",{writable:!1}),f}(o.Component);e.default=(0,y.RM)((0,l.Z)((0,r.connect)((function(t){return{items:t.distributor.sales.items,total:t.distributor.sales.total,actionCalled:t.distributor.sales.actionCalled,deleteSuccess:t.distributor.sales.deleteSuccess,successMessage:t.distributor.sales.successMessage}}),(function(t){return v({dispatch:t},(0,s.bindActionCreators)({salesList:f.u,salesDelete:f.IO},t))}))(D)))}}]);