"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7865],{77865:function(e,t,n){n.r(t);var r=n(27378),o=n(23884),i=n(28730),c=n(23434),a=(n(75790),n(10755)),s=n(74154),u=n(8971),l=n(13040),f=n(18166),p=n(94630),y=n(11047),d=n(24246);function b(e){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b(e)}function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function O(e,t){return O=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},O(e,t)}function v(e,t){if(t&&("object"===b(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return P(e)}function P(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function j(e){return j=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},j(e)}function g(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var w=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&O(e,t)}(f,e);var t,n,r,o,a,l=(o=f,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=j(o);if(a){var n=j(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return v(this,e)});function f(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,f),g(P(t=l.call(this,e)),"loadListData",(function(){t.props.certificateList(t.queryParams)})),g(P(t),"handlePagination",(function(e){t.queryParams.page=e,t.loadListData()})),g(P(t),"handleEdit",(function(e){t.props.navigate("edit/"+e.id)})),g(P(t),"handleDelete",(function(e){t.props.certificateDelete(e.id)})),t.state={items:t.props.items,total:t.props.total,deleteSuccess:t.props.deleteSuccess},t.queryParams={page:1,limit:20},t.columns=[{name:"name",display_name:"Certificate Name"},{name:"description",display_name:"Description"},{name:"status_display",display_name:"Status"}],t.tableActions=[{label:"Edit",onClick:t.handleEdit,color:"primary"},{label:"Delete",onClick:t.handleDelete,isDelete:!0,color:"error"}],t}return t=f,r=[{key:"getDerivedStateFromProps",value:function(e,t){var n={};return e.items!==t.items&&(n.items=e.items),e.total!==t.total&&(n.total=e.total),e.deleteSuccess!==t.deleteSuccess&&(n.deleteSuccess=e.deleteSuccess),n}}],(n=[{key:"componentDidMount",value:function(){this.loadListData()}},{key:"componentDidUpdate",value:function(e,t){this.state.deleteSuccess&&((0,this.props.dispatch)({type:y.SJ,payload:!1}),this.handlePagination(1))}},{key:"render",value:function(){var e=this;return(0,d.jsx)(u.Z,{title:"Certificates",secondary:(0,d.jsx)(i.Z,{variant:"contained",onClick:function(){return e.props.navigate("create")},children:"Create"}),children:(0,d.jsx)(c.ZP,{container:!0,spacing:s.dv,className:"abc",children:(0,d.jsx)(p.Z,{columns:this.columns,rows:this.state.items,page:this.queryParams.page,limit:this.queryParams.limit,total:this.state.total,handlePagination:this.handlePagination,actions:this.tableActions})})})}}])&&h(t.prototype,n),r&&h(t,r),Object.defineProperty(t,"prototype",{writable:!1}),f}(r.Component);t.default=(0,l.Z)((0,o.connect)((function(e){return{items:e.certificate.items,total:e.certificate.total,deleteSuccess:e.certificate.deleteSuccess}}),(function(e){return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(Object(n),!0).forEach((function(t){g(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({dispatch:e},(0,a.bindActionCreators)({certificateList:f.HT,certificateDelete:f.eg},e))}))(w))}}]);