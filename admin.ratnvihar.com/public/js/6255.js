"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6255],{47078:function(t,e,n){n.d(e,{Jm:function(){return s},XI:function(){return a},bS:function(){return u},k6:function(){return c}});var i=n(69222),o=n(72088),r=n(57446),s=function(t){return t=(0,r.B7)(t,!0),function(e){i.Z.get("/superadmin/countries".concat(t)).then((function(t){t.data.success&&e({type:o.o5,payload:t.data.data})})).catch((function(t){}))}},a=function(t){return function(e){i.Z.post("/superadmin/countries/store",t).then((function(t){t.data.success&&e({type:o.Gu,payload:t.data})})).catch((function(t){}))}},c=function(t,e){return function(n){i.Z.post("/superadmin/countries/update/".concat(t),e).then((function(t){t.data.success&&n({type:o.ne,payload:t.data})})).catch((function(t){}))}},u=function(t,e){return function(n){i.Z.delete("/superadmin/countries/delete/".concat(t),e).then((function(t){t.data.success&&n({type:o.m$,payload:t.data})})).catch((function(t){}))}}},666:function(t,e,n){n.d(e,{PT:function(){return u},SS:function(){return s},iI:function(){return a},kG:function(){return p},ll:function(){return c}});var i=n(69222),o=n(25913),r=n(57446),s=function(t){return t=(0,r.B7)(t,!0),function(e){i.Z.get("/superadmin/investors".concat(t)).then((function(t){t.data.success&&e({type:o.iz,payload:t.data.data})})).catch((function(t){}))}},a=function(t){return function(e){i.Z.post("/superadmin/investors/store",t).then((function(t){e({type:o.AR,payload:t.data})})).catch((function(t){}))}},c=function(t){return function(e){i.Z.get("/superadmin/investors/fetch/".concat(t)).then((function(t){t.data.success&&e({type:o.E$,payload:t.data.data})})).catch((function(t){}))}},u=function(t,e){return function(n){i.Z.post("/superadmin/investors/update/".concat(t),e).then((function(t){n({type:o.xz,payload:t.data})})).catch((function(t){}))}},p=function(t,e){return function(n){i.Z.delete("/superadmin/investors/delete/".concat(t),e).then((function(t){n({type:o.sz,payload:t.data})})).catch((function(t){}))}}},96255:function(t,e,n){n.r(e);var i=n(27378),o=n(23884),r=n(28730),s=n(23434),a=n(10755),c=n(74154),u=n(8971),p=n(13040),l=n(666),f=n(47078),d=n(72619),y=n(43014),m=n(46265),h=n(25913),b=n(57446),v=n(24246);function O(t){return O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},O(t)}function P(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function g(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?P(Object(n),!0).forEach((function(e){k(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function j(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function w(t,e){return w=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},w(t,e)}function S(t,e){if(e&&("object"===O(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return _(t)}function _(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function D(t){return D=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},D(t)}function k(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var Z=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&w(t,e)}(l,t);var e,n,i,o,a,p=(o=l,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=D(o);if(a){var n=D(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return S(this,t)});function l(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,l),k(_(e=p.call(this,t)),"loadListData",(function(){e.props.actions.investorList(e.state.queryParams)})),k(_(e),"handlePagination",(function(t){e.state.queryParams.page=t,e.loadListData()})),k(_(e),"handleEdit",(function(t){e.props.navigate("edit/"+t.id)})),k(_(e),"handleDelete",(function(t){e.props.actions.investorDelete(t.id)})),e.state=g(g({},e.props),{},{queryParams:{page:1,limit:50},deleteSuccess:e.props.deleteSuccess,countries:e.props.countries,states:e.props.states,districts:e.props.districts}),e.columns=[{name:"name",display_name:"Name"},{name:"mobile",display_name:"Mobile"},{name:"city",display_name:"City"},{name:"total_loan_amount_display",display_name:"Received Amt"},{name:"total_with_interest_display",display_name:"Tot With Interest"},{name:"total_paid_display",display_name:"Total Paid"}],e}return e=l,i=[{key:"getDerivedStateFromProps",value:function(t,e){var n={};return t.items!==e.items&&(n.items=t.items),t.total!==e.total&&(n.total=t.total),t.deleteSuccess!==e.deleteSuccess&&(n.deleteSuccess=t.deleteSuccess),t.countries!==e.countries&&(n.countries=t.countries),t.states!==e.states&&(n.states=t.states),t.districts!==e.districts&&(n.districts=t.districts),t.permissions!==e.permissions&&(n.permissions=t.permissions),n}}],(n=[{key:"componentDidMount",value:function(){this.loadListData(),this.props.actions.countryList({all:1}),this.props.actions.stateList({all:1}),this.props.actions.districtList({all:1})}},{key:"componentDidUpdate",value:function(t,e){this.state.deleteSuccess&&((0,this.props.dispatch)({type:h.fb}),this.handlePagination(1))}},{key:"render",value:function(){var t=this;return(0,v.jsx)(u.Z,{title:"Investors",secondary:(0,b.Fs)(this.state.permissions,"investors","add")?(0,v.jsx)(r.Z,{variant:"contained",onClick:function(){return t.props.navigate("create")},children:"Add"}):null,children:(0,v.jsx)(s.ZP,{container:!0,spacing:c.dv,className:"abc",children:(0,v.jsx)(m.Z,{columns:this.columns,rows:this.state.items,page:this.state.queryParams.page,limit:this.state.queryParams.limit,total:this.state.total,handlePagination:this.handlePagination,actions:[{label:"Edit",onClick:this.handleEdit,color:"primary",show:(0,b.Fs)(this.state.permissions,"investors","edit")},{label:"Delete",onClick:this.handleDelete,isDelete:!0,color:"error",show:(0,b.Fs)(this.state.permissions,"investors","delete")}]})})})}}])&&j(e.prototype,n),i&&j(e,i),Object.defineProperty(e,"prototype",{writable:!1}),l}(i.Component);e.default=(0,p.Z)((0,o.connect)((function(t){return{items:t.superadmin.investor.items,total:t.superadmin.investor.total,countries:t.superadmin.country.items||[],states:t.superadmin.countryState.items||[],districts:t.superadmin.district.items||[],deleteSuccess:t.superadmin.investor.deleteSuccess,permissions:t.employee.permissions.permissions}}),(function(t){return{dispatch:t,actions:(0,a.bindActionCreators)({investorList:l.SS,investorDelete:l.kG,countryList:f.Jm,stateList:d.aH,districtList:y._9},t)}}))(Z))}}]);