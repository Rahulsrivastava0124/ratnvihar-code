"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4013],{56093:function(t,e,n){n.d(e,{IO:function(){return f},LR:function(){return s},d:function(){return u},rr:function(){return c},u:function(){return a}});var r=n(69222),o=n(71987),i=n(57446),a=function(t){return t=(0,i.B7)(t,!0),function(e){r.Z.get("/distributor/sales".concat(t)).then((function(t){t.data.success&&e({type:o.ao,payload:t.data.data})})).catch((function(t){}))}},c=function(t){return function(e){r.Z.post("/distributor/sales/store",t).then((function(t){e({type:o.Ho,payload:t.data})})).catch((function(t){}))}},u=function(t){return function(e){r.Z.get("/distributor/sales/view/".concat(t)).then((function(t){console.log(t.data.data),t.data.success&&e({type:o.zZ,payload:t.data.data})})).catch((function(t){}))}},s=function(t,e){return function(n){r.Z.post("/distributor/sales/update/".concat(t),e).then((function(t){n({type:o.Aq,payload:t.data})})).catch((function(t){}))}},f=function(t,e){return function(n){r.Z.delete("/distributor/sales/delete/".concat(t),e).then((function(t){n({type:o.y$,payload:t.data})})).catch((function(t){}))}}},14013:function(t,e,n){n.r(e);var r=n(27378),o=n(23884),i=n(23434),a=n(10755),c=n(74154),u=n(8971),s=n(13040),f=n(56093),l=n(46265),p=n(72897),d=n(24246);function y(t){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y(t)}function b(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function h(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?b(Object(n),!0).forEach((function(e){j(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function m(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function O(t,e){return O=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},O(t,e)}function v(t,e){if(e&&("object"===y(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return P(t)}function P(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function g(t){return g=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},g(t)}function j(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var w=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&O(t,e)}(f,t);var e,n,r,o,a,s=(o=f,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=g(o);if(a){var n=g(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return v(this,t)});function f(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,f),j(P(e=s.call(this,t)),"loadListData",(function(){})),j(P(e),"handlePagination",(function(t){e.setState({queryParams:h(h({},e.state.queryParams),{},{page:t})},(function(){e.loadListData()}))})),j(P(e),"handleView",(function(t){e.props.navigate("view/"+t.id)})),e.state={items:e.props.items,total:e.props.total,queryParams:{page:1,limit:15}},e.columns=[{name:"order_no",display_name:"Order #"},{name:"status_display",display_name:"Status"},{name:"order_date",display_name:"Order Date"}],e.tableActions=[{label:"View",onClick:e.handleView,color:"primary"}],e}return e=f,r=[{key:"getDerivedStateFromProps",value:function(t,e){var n={};return t.items!==e.items&&(n.items=t.items),t.total!==e.total&&(n.total=t.total),n}}],(n=[{key:"componentDidMount",value:function(){this.loadListData()}},{key:"render",value:function(){return(0,d.jsx)(d.Fragment,{children:(0,d.jsx)(u.Z,{title:"Orders",children:(0,d.jsx)(i.ZP,{container:!0,spacing:c.dv,children:(0,d.jsx)(l.Z,{columns:this.columns,rows:this.state.items,page:this.state.queryParams.page,limit:this.state.queryParams.limit,total:this.state.total,handlePagination:this.handlePagination,actions:this.tableActions})})})})}}])&&m(e.prototype,n),r&&m(e,r),Object.defineProperty(e,"prototype",{writable:!1}),f}(r.Component);e.default=(0,p.RM)((0,s.Z)((0,o.connect)((function(t){return{items:t.distributor.orders.items,total:t.distributor.orders.total}}),(function(t){return h({dispatch:t},(0,a.bindActionCreators)({salesList:f.u},t))}))(w)))}}]);