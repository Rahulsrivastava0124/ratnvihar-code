"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6770],{11722:function(e,t,n){var r=n(73203);t.Z=void 0;var a=r(n(19124)),o=n(24246),i=(0,a.default)((0,o.jsx)("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}),"Visibility");t.Z=i},80622:function(e,t,n){var r=n(73203);t.Z=void 0;var a=r(n(19124)),o=n(24246),i=(0,a.default)((0,o.jsx)("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"}),"VisibilityOff");t.Z=i},48194:function(e,t,n){n.d(t,{Z:function(){return P}});var r=n(30808),a=n(25773),o=n(27378),i=n(38944),s=n(82267),c=n(89090),u=n(67018),l=n(76112),d=n(69641),p=n(50128),f=n(90813),m=n(6749);function h(e){return(0,m.Z)("MuiLink",e)}var y=(0,n(44124).Z)("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]),g=n(40685),b=n(7818);const v={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"};var j=({theme:e,ownerState:t})=>{const n=(e=>v[e]||e)(t.color),r=(0,g.D)(e,`palette.${n}`,!1)||t.color,a=(0,g.D)(e,`palette.${n}Channel`);return"vars"in e&&a?`rgba(${a} / 0.4)`:(0,b.Fq)(r,.4)},Z=n(24246);const x=["className","color","component","onBlur","onFocus","TypographyClasses","underline","variant","sx"],w=(0,u.ZP)(f.Z,{name:"MuiLink",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[`underline${(0,c.Z)(n.underline)}`],"button"===n.component&&t.button]}})((({theme:e,ownerState:t})=>(0,a.Z)({},"none"===t.underline&&{textDecoration:"none"},"hover"===t.underline&&{textDecoration:"none","&:hover":{textDecoration:"underline"}},"always"===t.underline&&(0,a.Z)({textDecoration:"underline"},"inherit"!==t.color&&{textDecorationColor:j({theme:e,ownerState:t})},{"&:hover":{textDecorationColor:"inherit"}}),"button"===t.component&&{position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"},[`&.${y.focusVisible}`]:{outline:"auto"}})));var P=o.forwardRef((function(e,t){const n=(0,l.Z)({props:e,name:"MuiLink"}),{className:u,color:f="primary",component:m="a",onBlur:y,onFocus:g,TypographyClasses:b,underline:j="always",variant:P="inherit",sx:O}=n,S=(0,r.Z)(n,x),{isFocusVisibleRef:C,onBlur:_,onFocus:M,ref:k}=(0,d.Z)(),[D,N]=o.useState(!1),q=(0,p.Z)(t,k),A=(0,a.Z)({},n,{color:f,component:m,focusVisible:D,underline:j,variant:P}),L=(e=>{const{classes:t,component:n,focusVisible:r,underline:a}=e,o={root:["root",`underline${(0,c.Z)(a)}`,"button"===n&&"button",r&&"focusVisible"]};return(0,s.Z)(o,h,t)})(A);return(0,Z.jsx)(w,(0,a.Z)({color:f,className:(0,i.Z)(L.root,u),classes:b,component:m,onBlur:e=>{_(e),!1===C.current&&N(!1),y&&y(e)},onFocus:e=>{M(e),!0===C.current&&N(!0),g&&g(e)},ref:q,ownerState:A,variant:P,sx:[...Object.keys(v).includes(f)?[]:[{color:f}],...Array.isArray(O)?O:[O]]},S))}))},40372:function(e,t,n){n.d(t,{ab:function(){return s},lI:function(){return u},wA:function(){return i},y1:function(){return c}});var r=n(69222),a=n(84917),o=n(57446),i=function(e){return e=(0,o.B7)(e,!0),function(t){r.Z.get("/superadmin/categories".concat(e)).then((function(e){e.data.success&&t({type:a.Ah,payload:e.data.data})})).catch((function(e){}))}},s=function(e){return function(t){r.Z.post("/superadmin/categories/store",e).then((function(e){t({type:a.hq,payload:e.data})})).catch((function(e){}))}},c=function(e,t){return function(n){r.Z.post("/superadmin/categories/update/".concat(e),t).then((function(e){n({type:a._o,payload:e.data})})).catch((function(e){}))}},u=function(e,t){return function(n){r.Z.delete("/superadmin/categories/delete/".concat(e),t).then((function(e){n({type:a.Dq,payload:e.data})})).catch((function(e){}))}}},59146:function(e,t,n){n.d(t,{K5:function(){return s},LX:function(){return c},Qh:function(){return u},_1:function(){return i}});var r=n(69222),a=n(72359),o=n(57446),i=function(e){return e=(0,o.B7)(e,!0),function(t){r.Z.get("/superadmin/materials".concat(e)).then((function(e){e.data.success&&t({type:a.vN,payload:e.data.data})})).catch((function(e){}))}},s=function(e){return function(t){r.Z.post("/superadmin/materials/store",e).then((function(e){t({type:a.uM,payload:e.data})})).catch((function(e){}))}},c=function(e,t){return function(n){r.Z.post("/superadmin/materials/update/".concat(e),t).then((function(e){n({type:a.vg,payload:e.data})})).catch((function(e){}))}},u=function(e,t){return function(n){r.Z.delete("/superadmin/materials/delete/".concat(e),t).then((function(e){n({type:a.e0,payload:e.data})})).catch((function(e){}))}}},4497:function(e,t,n){n.d(t,{BP:function(){return s},F6:function(){return d},G_:function(){return u},Ob:function(){return l},Uu:function(){return i},nh:function(){return c}});var r=n(69222),a=n(11134),o=n(57446),i=function(e){return e=(0,o.B7)(e,!0),function(t){r.Z.get("/superadmin/product".concat(e)).then((function(e){e.data.success&&t({type:a.f$,payload:e.data.data})})).catch((function(e){}))}},s=function(e){return e=(0,o.B7)(e,!0),function(e){r.Z.get("/superadmin/product/create").then((function(t){t.data.success&&e({type:a.l9,payload:t.data.data})})).catch((function(e){}))}},c=function(e){return function(t){r.Z.post("/superadmin/product/store",e).then((function(e){t({type:a.zN,payload:e.data})})).catch((function(e){}))}},u=function(e){return function(t){r.Z.get("/superadmin/product/view/".concat(e)).then((function(e){e.data.success&&t({type:a.N4,payload:e.data.data})})).catch((function(e){}))}},l=function(e,t){return function(n){r.Z.post("/superadmin/product/update/".concat(e),t).then((function(e){n({type:a.Q7,payload:e.data})})).catch((function(e){}))}},d=function(e,t){return function(n){r.Z.delete("/superadmin/product/delete/".concat(e),t).then((function(e){n({type:a.u7,payload:e.data})})).catch((function(e){}))}}},45747:function(e,t,n){n.d(t,{Jg:function(){return c},NM:function(){return i},k8:function(){return l},ks:function(){return s},qg:function(){return u}});var r=n(69222),a=n(84286),o=n(57446),i=function(e){return e=(0,o.B7)(e,!0),function(t){r.Z.get("/superadmin/sub-categories".concat(e)).then((function(e){e.data.success&&t({type:a.tx,payload:e.data.data})})).catch((function(e){}))}},s=function(e){return function(t){r.Z.post("/superadmin/sub-categories/store",e).then((function(e){t({type:a.p0,payload:e.data})})).catch((function(e){}))}},c=function(e,t){return function(n){r.Z.post("/superadmin/sub-categories/update/".concat(e),t).then((function(e){n({type:a.LG,payload:e.data})})).catch((function(e){}))}},u=function(e,t){return function(n){r.Z.delete("/superadmin/sub-categories/delete/".concat(e),t).then((function(e){n({type:a.fV,payload:e.data})})).catch((function(e){}))}},l=function(e){return e=(0,o.B7)(e,!0),r.Z.get("/superadmin/sub-categories".concat(e))}},75790:function(e,t,n){var r=n(27378),a=n(9647),o=n(10418),i=n(41485),s=n(43564),c=n(28730),u=n(23434),l=n(48194),d=n(11722),p=n(80622),f=n(24246),m=["input","label","meta","passwordShow","setPasswordShow"];function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(Object(n),!0).forEach((function(t){b(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var v=function(e){var t=e.input,n=e.label,r=e.meta,a=r.touched,s=r.error,c=e.passwordShow,u=e.setPasswordShow,l=function(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}(e,m);return(0,f.jsx)(o.Z,g(g(g({label:n,margin:"normal",fullWidth:!0,error:!(!a||!s),helperText:a&&s?s:""},t),l),{},{InputProps:{endAdornment:"password"==t.name?(0,f.jsx)(i.Z,{position:"end",children:c?(0,f.jsx)(d.Z,{onClick:function(){return u(!1)},className:"cursor-pointer"}):(0,f.jsx)(p.Z,{onClick:function(){return u(!0)},className:"cursor-pointer"})}):null}}))};t.Z=(0,a.sx)({form:"LoginForm",validate:function(e){var t={};return["mobile","password"].forEach((function(n){e[n]||(t[n]="Required")})),t}})((function(e){var t,n,o=e.handleSubmit,i=e.pristine,d=e.submitting,p=(t=r.useState(!1),n=2,function(e){if(Array.isArray(e))return e}(t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],i=!0,s=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);i=!0);}catch(e){s=!0,a=e}finally{try{i||null==n.return||n.return()}finally{if(s)throw a}}return o}}(t,n)||function(e,t){if(e){if("string"==typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?h(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),m=p[0],y=p[1];return(0,f.jsx)("form",{onSubmit:o,children:(0,f.jsxs)(s.Z,{sx:{mt:1},className:"myinput",children:[(0,f.jsx)(a.gN,{name:"mobile",component:v,label:"Mobile"}),(0,f.jsx)(a.gN,{name:"password",type:m?"text":"password",component:v,label:"Password",passwordShow:m,setPasswordShow:y}),(0,f.jsx)(c.Z,{className:"signin-btn",type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},disabled:i||d,children:"Sign In"}),(0,f.jsx)(u.ZP,{container:!0,children:(0,f.jsx)(u.ZP,{item:!0,xs:!0,children:(0,f.jsx)(l.Z,{href:"/super-admin/forgot-password",variant:"body2",className:"forget-text",children:"Forgot password?"})})})]})})}))},16770:function(e,t,n){n.r(t);var r=n(27378),a=n(23884),o=n(28730),i=n(43564),s=n(23434),c=n(56793),u=n(64212),l=n(55378),d=n(60789),p=n(10418),f=(n(75790),n(10755)),m=n(74154),h=n(8971),y=n(13040),g=n(4497),b=n(45747),v=n(46265),j=n(11134),Z=n(40372),x=n(59146),w=n(72897),P=n(57446),O=n(98784),S=n(24246);function C(e){return C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},C(e)}function _(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function M(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?_(Object(n),!0).forEach((function(t){L(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):_(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function k(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function D(e,t){return D=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},D(e,t)}function N(e,t){if(t&&("object"===C(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return q(e)}function q(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function A(e){return A=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},A(e)}function L(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var E=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&D(e,t)}(g,e);var t,n,r,a,f,y=(a=g,f=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=A(a);if(f){var n=A(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return N(this,e)});function g(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,g),L(q(t=y.call(this,e)),"loadListData",(function(){t.props.productList(t.state.queryParams)})),L(q(t),"handlePagination",(function(e,n){t.setState({queryParams:M(M({},t.state.queryParams),{},{page:e,all:n?1:0})},(function(){t.loadListData()}))})),L(q(t),"handleEdit",(function(e){t.props.navigate("edit/"+e.id)})),L(q(t),"handleDelete",(function(e){t.props.productDelete(e.id)})),L(q(t),"handleCategoryChange",(function(e){var n=e.target.value;t.props.subCategoryList({all:1,category_id:n}),n?t.props.materialList({all:1,category_id:n}):t.setState({materials:[],sub_categories:[]}),t.setState({queryParams:M(M({},t.state.queryParams),{},{category_id:n})})})),L(q(t),"handleSubCategoryChange",(function(e){t.setState({queryParams:M(M({},t.state.queryParams),{},{sub_category_id:e.target.value})})})),L(q(t),"handleMaterialChange",(function(e){t.setState({queryParams:M(M({},t.state.queryParams),{},{material_id:e.target.value})})})),L(q(t),"handleSearchChange",(function(e){t.setState({queryParams:M(M({},t.state.queryParams),{},{search:e.target.value})})})),L(q(t),"handleSearch",(function(){t.loadListData()})),t.state={items:t.props.items,total:t.props.total,actionCalled:t.props.actionCalled,deleteSuccess:t.props.deleteSuccess,successMessage:t.props.successMessage,errorMessage:t.props.errorMessage,categories:t.props.categories,materials:t.props.materialList,sub_categories:t.props.sub_categories,permissions:t.props.permissions,queryParams:{page:1,limit:50,category_id:"",sub_category_id:"",material_id:"",search:"",all:0}},t.columns=[{name:"default_image",display_name:"Image",isImage:!0},{name:"name",display_name:"Product Name"},{name:"materials",display_name:"Material",array_key:"name",raw:!0},{name:"total_weight_display",display_name:"Weight"},{name:"mrp_display",display_name:"Tag Price"}],t}return t=g,r=[{key:"getDerivedStateFromProps",value:function(e,t){var n={};return e.items!==t.items&&(n.items=e.items),e.total!==t.total&&(n.total=e.total),e.actionCalled!==t.actionCalled&&(n.actionCalled=e.actionCalled),e.deleteSuccess!==t.deleteSuccess&&(n.deleteSuccess=e.deleteSuccess),e.successMessage!==t.successMessage&&(n.successMessage=e.successMessage),e.errorMessage!==t.errorMessage&&(n.errorMessage=e.errorMessage),e.categories!==t.categories&&(n.categories=e.categories),e.materials!==t.materials&&(n.materials=e.materials),e.sub_categories!==t.sub_categories&&(n.sub_categories=e.sub_categories),e.permissions!==t.permissions&&(n.permissions=e.permissions),n}}],(n=[{key:"componentDidMount",value:function(){this.loadListData(),this.props.categoryList({all:1})}},{key:"componentDidUpdate",value:function(e,t){if(this.state.deleteSuccess){var n=this.props.dispatch;this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),n({type:j.Hh}),this.handlePagination(1)}else if(!(0,O.isEmpty)(this.state.errorMessage)){var r=this.props.dispatch;this.props.enqueueSnackbar(this.state.errorMessage,{variant:"error"}),r({type:j.Hh})}}},{key:"render",value:function(){var e=this;return(0,S.jsxs)(h.Z,{title:"Products",secondary:(0,P.Fs)(this.state.permissions,"products","add")?(0,S.jsx)(o.Z,{variant:"contained",onClick:function(){return e.props.navigate("create")},children:"Add"}):null,children:[(0,S.jsx)(i.Z,{sx:{flexGrow:1,m:.5},className:"ratn-dialog-inner",children:(0,S.jsxs)(s.ZP,{container:!0,spacing:2,className:"tax-input loans_view p_view",children:[(0,S.jsx)(s.ZP,{item:!0,xs:12,md:2,className:"create-input",children:(0,S.jsxs)(c.Z,{fullWidth:!0,children:[(0,S.jsx)(u.Z,{children:"Category"}),(0,S.jsxs)(l.Z,{value:this.state.queryParams.category_id,label:"Category",onChange:this.handleCategoryChange,className:"input-inner",defaultValue:"",children:[(0,S.jsx)(d.Z,{value:"",children:"All"}),this.state.categories.map((function(e,t){return(0,S.jsx)(d.Z,{value:e.id,children:e.name},t)}))]})]})}),(0,S.jsx)(s.ZP,{item:!0,xs:12,md:2,className:"create-input",children:(0,S.jsxs)(c.Z,{fullWidth:!0,children:[(0,S.jsx)(u.Z,{children:"Sub Category"}),(0,S.jsxs)(l.Z,{value:this.state.queryParams.sub_category_id,label:"Sub Category",onChange:this.handleSubCategoryChange,className:"input-inner",defaultValue:"",children:[(0,S.jsx)(d.Z,{value:"",children:"All"}),this.state.sub_categories.map((function(e,t){return(0,S.jsx)(d.Z,{value:e.id,children:e.name},t)}))]})]})}),(0,S.jsx)(s.ZP,{item:!0,xs:12,md:3,className:"create-input",children:(0,S.jsxs)(c.Z,{fullWidth:!0,children:[(0,S.jsx)(u.Z,{children:"Material"}),(0,S.jsxs)(l.Z,{value:this.state.queryParams.material_id,label:"Material",onChange:this.handleMaterialChange,className:"input-inner",defaultValue:"",children:[(0,S.jsx)(d.Z,{value:"",children:"All"}),this.state.materials.map((function(e,t){return(0,S.jsx)(d.Z,{value:e.id,children:e.name},t)}))]})]})}),(0,S.jsx)(s.ZP,{item:!0,xs:12,md:3,className:"create-input",children:(0,S.jsx)(c.Z,{fullWidth:!0,children:(0,S.jsx)(p.Z,{label:"Search",variant:"outlined",value:this.state.search,onChange:this.handleSearchChange})})}),(0,S.jsx)(s.ZP,{item:!0,xs:12,md:2,className:"create-input order-input button-right",children:(0,S.jsx)(o.Z,{variant:"contained",className:"search-btn",onClick:this.handleSearch,children:"Search"})})]})}),(0,S.jsx)(s.ZP,{container:!0,spacing:m.dv,children:(0,S.jsx)(v.Z,{columns:this.columns,rows:this.state.items,page:this.state.queryParams.page,limit:this.state.queryParams.limit,total:this.state.total,handlePagination:this.handlePagination,actions:[{label:"Edit",onClick:this.handleEdit,color:"primary",show:(0,P.Fs)(this.state.permissions,"products","edit")},{label:"Delete",onClick:this.handleDelete,isDelete:!0,color:"error",show:(0,P.Fs)(this.state.permissions,"products","delete")}],haveAllOption:!0,stickyHeader:!0})})]})}}])&&k(t.prototype,n),r&&k(t,r),Object.defineProperty(t,"prototype",{writable:!1}),g}(r.Component);t.default=(0,w.RM)((0,y.Z)((0,a.connect)((function(e){return{items:e.superadmin.product.items,total:e.superadmin.product.total,actionCalled:e.superadmin.product.actionCalled,deleteSuccess:e.superadmin.product.deleteSuccess,errorMessage:e.superadmin.product.errorMessage,successMessage:e.superadmin.product.successMessage,categories:e.superadmin.category.items,materials:e.superadmin.material.items,sub_categories:e.superadmin.subCategory.items,permissions:e.employee.permissions.permissions}}),(function(e){var t;return M({dispatch:e},(0,f.bindActionCreators)((L(t={productList:g.Uu,productCreate:g.BP,productStore:g.nh,productView:g.G_,productUpdate:g.Ob,productDelete:g.F6,subCategoryList:b.NM,categoryList:Z.wA},"subCategoryList",b.NM),L(t,"materialList",x._1),t),e))}))(E)))}}]);