"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9913],{78633:function(e,t,n){var o=n(73203);t.Z=void 0;var r=o(n(19124)),a=n(24246),i=(0,r.default)((0,a.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");t.Z=i},39834:function(e,t,n){var o=n(73203);t.Z=void 0;var r=o(n(19124)),a=n(24246),i=(0,r.default)((0,a.jsx)("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),"Cancel");t.Z=i},27668:function(e,t,n){var o=n(73203);t.Z=void 0;var r=o(n(19124)),a=n(24246),i=(0,r.default)((0,a.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckCircle");t.Z=i},71157:function(e,t,n){var o=n(73203);t.Z=void 0;var r=o(n(19124)),a=n(24246),i=(0,r.default)((0,a.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close");t.Z=i},16655:function(e,t,n){var o=n(73203);t.Z=void 0;var r=o(n(19124)),a=n(24246),i=(0,r.default)((0,a.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");t.Z=i},51807:function(e,t,n){var o=n(73203);t.Z=void 0;var r=o(n(19124)),a=n(24246),i=(0,r.default)((0,a.jsx)("path",{d:"M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"}),"Done");t.Z=i},28729:function(e,t,n){var o=n(73203);t.Z=void 0;var r=o(n(19124)),a=n(24246),i=(0,r.default)((0,a.jsx)("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit");t.Z=i},21589:function(e,t,n){var o=n(73203);t.Z=void 0;var r=o(n(19124)),a=n(24246),i=(0,r.default)((0,a.jsx)("path",{d:"M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"}),"Replay");t.Z=i},62792:function(e,t,n){n.d(t,{Z:function(){return b}});var o=n(25773),r=n(30808),a=n(27378),i=n(38944),c=n(82267),u=n(6851),s=n(76112),l=n(67018),p=n(6749);function f(e){return(0,p.Z)("MuiTableFooter",e)}(0,n(44124).Z)("MuiTableFooter",["root"]);var d=n(24246);const y=["className","component"],m=(0,l.ZP)("tfoot",{name:"MuiTableFooter",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"table-footer-group"}),h={variant:"footer"},v="tfoot";var b=a.forwardRef((function(e,t){const n=(0,s.Z)({props:e,name:"MuiTableFooter"}),{className:a,component:l=v}=n,p=(0,r.Z)(n,y),b=(0,o.Z)({},n,{component:l}),j=(e=>{const{classes:t}=e;return(0,c.Z)({root:["root"]},f,t)})(b);return(0,d.jsx)(u.Z.Provider,{value:h,children:(0,d.jsx)(m,(0,o.Z)({as:l,className:(0,i.Z)(j.root,a),ref:t,role:l===v?null:"rowgroup",ownerState:b},p))})}))},84200:function(e,t,n){n.d(t,{BQ:function(){return u},hV:function(){return c},kI:function(){return s},ll:function(){return i},vR:function(){return l}});var o=n(69222),r=n(53159),a=n(57446),i=function(e){return e=(0,a.B7)(e,!0),function(t){o.Z.get("/superadmin/employees".concat(e)).then((function(e){e.data.success&&t({type:r.qH,payload:e.data.data})})).catch((function(e){}))}},c=function(e){return function(t){o.Z.post("/superadmin/employees/store",e).then((function(e){t({type:r.I0,payload:e.data})})).catch((function(e){}))}},u=function(e){return function(t){o.Z.get("/superadmin/employees/fetch/".concat(e)).then((function(e){e.data.success&&t({type:r.Bv,payload:e.data.data})})).catch((function(e){}))}},s=function(e,t){return function(n){o.Z.post("/superadmin/employees/update/".concat(e),t).then((function(e){n({type:r.cU,payload:e.data})})).catch((function(e){}))}},l=function(e,t){return function(n){o.Z.delete("/superadmin/employees/delete/".concat(e),t).then((function(e){n({type:r.$6,payload:e.data})})).catch((function(e){}))}}},61671:function(e,t,n){n.r(t);var o=n(27378),r=n(23884),a=n(28730),i=n(23434),c=n(10755),u=n(74154),s=n(8971),l=n(13040),p=n(84200),f=n(46265),d=n(53159),y=n(24246);function m(e){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},m(e)}function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(Object(n),!0).forEach((function(t){P(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function j(e,t){return j=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},j(e,t)}function Z(e,t){if(t&&("object"===m(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return g(e)}function g(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function O(e){return O=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},O(e)}function P(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var w=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&j(e,t)}(p,e);var t,n,o,r,c,l=(r=p,c=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=O(r);if(c){var n=O(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return Z(this,e)});function p(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,p),P(g(t=l.call(this,e)),"loadListData",(function(){t.props.actions.employeeList(t.state.queryParams)})),P(g(t),"handlePagination",(function(e){t.state.queryParams.page=e,t.loadListData()})),P(g(t),"handleEdit",(function(e){t.props.navigate("edit/"+e.id)})),P(g(t),"handleDelete",(function(e){t.props.actions.employeeDelete(e.id)})),P(g(t),"handleView",(function(e){t.props.navigate("view/"+e.id)})),t.state=v(v({},t.props),{},{queryParams:{page:1,limit:50},deleteSuccess:t.props.deleteSuccess}),t.columns=[{name:"profile_image",display_name:"Image",isImage:!0},{name:"name",display_name:"Employee Name"},{name:"mobile",display_name:"Contact Number"},{name:"parents_name",display_name:"Work Under"},{name:"role_name",display_name:"Designation Role"},{name:"expense_balance",display_name:"Expense Balance"}],t.tableActions=[{label:"View",onClick:t.handleView,color:"primary"},{label:"Edit",onClick:t.handleEdit,color:"primary"},{label:"Delete",onClick:t.handleDelete,isDelete:!0,color:"error"}],t}return t=p,o=[{key:"getDerivedStateFromProps",value:function(e,t){var n={};return e.items!==t.items&&(n.items=e.items),e.total!==t.total&&(n.total=e.total),e.deleteSuccess!==t.deleteSuccess&&(n.deleteSuccess=e.deleteSuccess),n}}],(n=[{key:"componentDidMount",value:function(){this.loadListData()}},{key:"componentDidUpdate",value:function(e,t){this.state.deleteSuccess&&((0,this.props.dispatch)({type:d.sW}),this.handlePagination(1))}},{key:"render",value:function(){var e=this;return(0,y.jsx)(s.Z,{title:"Employees",secondary:(0,y.jsx)(a.Z,{variant:"contained",onClick:function(){return e.props.navigate("create")},children:"Add"}),children:(0,y.jsx)(i.ZP,{container:!0,spacing:u.dv,className:"abc",children:(0,y.jsx)(f.Z,{columns:this.columns,rows:this.state.items,page:this.state.queryParams.page,limit:this.state.queryParams.limit,total:this.state.total,handlePagination:this.handlePagination,actions:this.tableActions})})})}}])&&b(t.prototype,n),o&&b(t,o),Object.defineProperty(t,"prototype",{writable:!1}),p}(o.Component);t.default=(0,l.Z)((0,r.connect)((function(e){return{items:e.superadmin.employee.items,total:e.superadmin.employee.total,deleteSuccess:e.superadmin.employee.deleteSuccess}}),(function(e){return{dispatch:e,actions:(0,c.bindActionCreators)({employeeList:p.ll,employeeDelete:p.vR},e)}}))(w))}}]);