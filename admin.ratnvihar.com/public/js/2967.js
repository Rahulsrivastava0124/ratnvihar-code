"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2967],{60789:function(e,t,n){n.d(t,{Z:function(){return w}});var r=n(30808),a=n(25773),o=n(27378),i=n(38944),c=n(82267),s=n(7818),u=n(67018),l=n(76112),d=n(54350),p=n(3870),f=n(36609),m=n(50128),b=n(67462),y=n(54202),h=n(86365),g=n(6749);function v(e){return(0,g.Z)("MuiMenuItem",e)}var x=(0,n(44124).Z)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),O=n(24246);const Z=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex"],j=(0,u.ZP)(p.Z,{shouldForwardProp:e=>(0,u.FO)(e)||"classes"===e,name:"MuiMenuItem",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.dense&&t.dense,n.divider&&t.divider,!n.disableGutters&&t.gutters]}})((({theme:e,ownerState:t})=>(0,a.Z)({},e.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${x.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,s.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${x.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:(0,s.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${x.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:(0,s.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,s.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${x.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${x.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`& + .${b.Z.root}`]:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},[`& + .${b.Z.inset}`]:{marginLeft:52},[`& .${h.Z.root}`]:{marginTop:0,marginBottom:0},[`& .${h.Z.inset}`]:{paddingLeft:36},[`& .${y.Z.root}`]:{minWidth:36}},!t.dense&&{[e.breakpoints.up("sm")]:{minHeight:"auto"}},t.dense&&(0,a.Z)({minHeight:32,paddingTop:4,paddingBottom:4},e.typography.body2,{[`& .${y.Z.root} svg`]:{fontSize:"1.25rem"}}))));var w=o.forwardRef((function(e,t){const n=(0,l.Z)({props:e,name:"MuiMenuItem"}),{autoFocus:s=!1,component:u="li",dense:p=!1,divider:b=!1,disableGutters:y=!1,focusVisibleClassName:h,role:g="menuitem",tabIndex:x}=n,w=(0,r.Z)(n,Z),P=o.useContext(d.Z),k={dense:p||P.dense||!1,disableGutters:y},C=o.useRef(null);(0,f.Z)((()=>{s&&C.current&&C.current.focus()}),[s]);const $=(0,a.Z)({},n,{dense:k.dense,divider:b,disableGutters:y}),S=(e=>{const{disabled:t,dense:n,divider:r,disableGutters:o,selected:i,classes:s}=e,u={root:["root",n&&"dense",t&&"disabled",!o&&"gutters",r&&"divider",i&&"selected"]},l=(0,c.Z)(u,v,s);return(0,a.Z)({},s,l)})(n),F=(0,m.Z)(C,t);let D;return n.disabled||(D=void 0!==x?x:-1),(0,O.jsx)(d.Z.Provider,{value:k,children:(0,O.jsx)(j,(0,a.Z)({ref:F,role:g,tabIndex:D,component:u,focusVisibleClassName:(0,i.Z)(S.focusVisible,h)},w,{ownerState:$,classes:S}))})}))},50151:function(e,t,n){n.d(t,{HU:function(){return i},Q5:function(){return c},cQ:function(){return l},eV:function(){return u},iY:function(){return s}});var r=n(69222),a=n(39899),o=n(57446),i=function(e){return e=(0,o.B7)(e,!0),function(t){r.Z.get("/superadmin/managers".concat(e)).then((function(e){e.data.success&&t({type:a.XU,payload:e.data.data})})).catch((function(e){}))}},c=function(e){return function(t){r.Z.post("/superadmin/managers/store",e).then((function(e){e.data.success&&t({type:a.bN,payload:e.data.data})})).catch((function(e){}))}},s=function(e){return function(t){r.Z.get("/superadmin/managers/fetch/".concat(e)).then((function(e){e.data.success&&t({type:a.dX,payload:e.data.data})})).catch((function(e){}))}},u=function(e,t){return function(n){r.Z.post("/superadmin/managers/update/".concat(e),t).then((function(e){e.data.success&&n({type:a.Bm,payload:e.data.data})})).catch((function(e){}))}},l=function(e,t){return function(n){r.Z.delete("/superadmin/managers/delete/".concat(e),t).then((function(e){e.data.success&&n({type:a.UN,payload:!0})})).catch((function(e){}))}}},56440:function(e,t,n){n.d(t,{$z:function(){return s},XQ:function(){return l},YZ:function(){return u},mx:function(){return i},xz:function(){return c}});var r=n(69222),a=n(18907),o=n(57446),i=function(e){return e=(0,o.B7)(e,!0),function(t){r.Z.get("/superadmin/workers".concat(e)).then((function(e){e.data.success&&t({type:a.QZ,payload:e.data.data})})).catch((function(e){}))}},c=function(e){return function(t){r.Z.post("/superadmin/workers/store",e).then((function(e){e.data.success&&t({type:a.ud,payload:e.data.data})})).catch((function(e){}))}},s=function(e){return function(t){r.Z.get("/superadmin/workers/fetch/".concat(e)).then((function(e){e.data.success&&t({type:a.tC,payload:e.data.data})})).catch((function(e){}))}},u=function(e,t){return function(n){r.Z.post("/superadmin/workers/update/".concat(e),t).then((function(e){e.data.success&&n({type:a.__,payload:e.data.data})})).catch((function(e){}))}},l=function(e,t){return function(n){r.Z.delete("/superadmin/workers/delete/".concat(e),t).then((function(e){e.data.success&&n({type:a.FC,payload:!0})})).catch((function(e){}))}}},91241:function(e,t,n){var r=n(27378),a=(n(23884),n(9647)),o=n(10418),i=n(56793),c=n(66816),s=n(48684),u=n(60789),l=n(43564),d=n(23434),p=n(78153),f=n(28730),m=n(13040),b=n(24246);function y(e){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y(e)}var h=["input","label","meta"],g=["input","label","meta"];function v(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function x(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?v(Object(n),!0).forEach((function(t){C(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function O(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function Z(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function j(e,t){return j=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},j(e,t)}function w(e,t){if(t&&("object"===y(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return P(e)}function P(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function k(e){return k=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},k(e)}function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var $=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&j(e,t)}($,e);var t,n,r,m,y,v=(m=$,y=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=k(m);if(y){var n=k(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return w(this,e)});function $(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,$),C(P(t=v.call(this,e)),"renderTextField",(function(e){var t=e.input,n=e.label,r=e.meta,a=r.touched,i=r.error,c=O(e,h);return(0,b.jsx)(o.Z,x(x({label:n,fullWidth:!0,error:!(!a||!i),helperText:a&&i?i:""},t),c))})),C(P(t),"renderManagerField",(function(e){var n=e.input,r=e.label,a=e.meta,o=a.touched,l=a.error,d=O(e,g);return(0,b.jsxs)(i.Z,{fullWidth:!0,error:!(!o||!l),children:[r?(0,b.jsx)(c.Z,{children:r}):null,(0,b.jsxs)(s.Z,x(x(x({label:r,fullWidth:!0},n),d),{},{children:[(0,b.jsx)(u.Z,{value:"",children:"select manager"}),t.state.managers.map((function(e,t){return(0,b.jsx)(u.Z,{value:e.id,children:e.name},t)}))]})),o&&l?(0,b.jsx)(FormHelperText,{children:l}):null]})})),t.state={formData:"formData"in t.props?t.props.formData:null,managers:t.props.managers},t}return t=$,r=[{key:"getDerivedStateFromProps",value:function(e,t){var n={};return e.managers!==t.managers&&(n.managers=e.managers),n}}],(n=[{key:"componentDidMount",value:function(){this.state.formData&&this.props.initialize(this.state.formData)}},{key:"render",value:function(){var e=this,t=this.props,n=t.handleSubmit;return t.pristine,t.submitting,(0,b.jsx)("form",{onSubmit:n,children:(0,b.jsxs)(l.Z,{sx:{flexGrow:1},children:[(0,b.jsxs)(d.ZP,{container:!0,spacing:2,children:[(0,b.jsx)(d.ZP,{item:!0,xs:6,children:(0,b.jsx)(a.gN,{name:"name",required:!0,component:this.renderTextField,label:"Name"})}),(0,b.jsx)(d.ZP,{item:!0,xs:6,children:(0,b.jsx)(a.gN,{name:"email",required:!0,component:this.renderTextField,label:"Email"})})]}),(0,b.jsxs)(d.ZP,{container:!0,spacing:2,mt:1,children:[(0,b.jsx)(d.ZP,{item:!0,xs:6,children:(0,b.jsx)(a.gN,{name:"mobile",required:!0,component:this.renderTextField,label:"Mobile",type:"number"})}),(0,b.jsx)(d.ZP,{item:!0,xs:6,children:(0,b.jsx)(a.gN,{name:"parent_id",component:this.renderManagerField,label:"Manager",type:"select"})})]}),(0,b.jsxs)(p.Z,{spacing:1,mt:2,direction:"row",children:[(0,b.jsx)(f.Z,{variant:"contained",type:"submit",children:"Submit"}),(0,b.jsx)(f.Z,{variant:"outlined",onClick:function(){return e.props.navigate("/super-admin/workers")},children:"Cancel"})]})]})})}}])&&Z(t.prototype,n),r&&Z(t,r),Object.defineProperty(t,"prototype",{writable:!1}),$}(r.Component);t.Z=(0,m.Z)((0,a.sx)({form:"WorkerForm",validate:function(e){var t={};return["name"].forEach((function(n){e[n]||(t[n]="Required")})),t}})($))}}]);