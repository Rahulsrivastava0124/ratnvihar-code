"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7929],{88756:(e,s,a)=>{a.d(s,{h:()=>i});var t=a(80325),r=a(56742);const i=()=>e=>{t.A.get("/retailer/checkout").then((s=>{var a;s.data.success&&e({type:r._,payload:null==s||null===(a=s.data)||void 0===a?void 0:a.data})})).catch((e=>{}))}},67929:(e,s,a)=>{a.r(s),a.d(s,{default:()=>N});var t=a(63696),r=a(81660),i=a(19211),l=a(99101),c=a(4295),n=a(8427),o=a(22187),d=(a(42490),a(86032)),h=a(8590),m=a(50977),u=a(80249),p=a(5908),x=a(73585),j=a(88756),g=a(27397),y=a(26692),v=(a(74450),a(73191)),b=a(62540);function f(e,s,a){return s in e?Object.defineProperty(e,s,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[s]=a,e}class A extends t.Component{constructor(e){super(e),f(this,"removeConfirm",(e=>{this.setState({removeDialog:!0,removingItem:e})})),f(this,"handleRemoveDialogClose",(()=>{this.setState({removeDialog:!1})})),f(this,"handleCartRemove",(()=>{this.props.actions.CartDelete(this.state.removingItem.id)})),f(this,"handlePlaceOrder",(()=>{this.props.navigate("/retailer/checkout")})),this.state={items:this.props.items,item_total_display:this.props.item_total_display,total_payable_display:this.props.total_payable_display,removeDialog:!1,removingItem:null,actionCalled:this.props.actionCalled,deleteSuccess:this.props.deleteSuccess,successMessage:this.props.successMessage,errorMessage:this.props.errorMessage}}static getDerivedStateFromProps(e,s){let a={};return e.items!==s.items&&(a.items=e.items),e.item_total_display!==s.item_total_display&&(a.item_total_display=e.item_total_display),e.total_payable_display!==s.total_payable_display&&(a.total_payable_display=e.total_payable_display),e.actionCalled!==s.actionCalled&&(a.actionCalled=e.actionCalled),e.deleteSuccess!==s.deleteSuccess&&(a.deleteSuccess=e.deleteSuccess),e.successMessage!==s.successMessage&&(a.successMessage=e.successMessage),e.errorMessage!==s.errorMessage&&(a.errorMessage=e.errorMessage),a}componentDidUpdate(e){this.state.actionCalled&&(this.state.deleteSuccess?(g.oR.success(this.state.successMessage),this.setState({removeDialog:!1}),this.props.dispatch({type:v.KJ}),this.props.actions.CartList()):(g.oR.error(this.state.errorMessage),this.props.dispatch({type:v.KJ})))}render(){const e=this.state.items;return(0,b.jsx)(b.Fragment,{children:(0,b.jsxs)("div",{children:[(0,b.jsxs)(y.A,{show:this.state.removeDialog,onHide:this.handleRemoveDialogClose,children:[(0,b.jsx)(y.A.Header,{closeButton:!0,children:(0,b.jsx)(y.A.Title,{children:"Remove From Cart"})}),(0,b.jsx)(y.A.Body,{children:"Are you want to remove this product from cart ?"}),(0,b.jsxs)(y.A.Footer,{children:[(0,b.jsx)(o.A,{variant:"secondary",onClick:this.handleRemoveDialogClose,children:"No"}),(0,b.jsx)(o.A,{variant:"danger",onClick:this.handleCartRemove,children:"Yes"})]})]}),(0,b.jsx)("div",{className:"cart-wrapper desktop-cart",children:(0,b.jsxs)(r.A,{children:[(0,b.jsxs)(c.A,{children:[(0,b.jsx)(c.A.Item,{href:"#",children:"Home"}),(0,b.jsx)(c.A.Item,{active:!0,children:"Cart"})]}),(0,b.jsx)("h3",{children:"My Shopping Cart"}),(0,b.jsxs)(i.A,{children:[(0,b.jsx)(l.A,{xs:12,md:8,children:e.length>0?e.map(((s,a)=>(0,b.jsx)(t.Fragment,{children:(0,b.jsx)("div",{children:(0,b.jsxs)("div",{className:"cart-inner-wrapper",children:[(0,b.jsxs)("div",{className:"cart-inner",children:[(0,b.jsx)("div",{className:"cart-image",children:(0,b.jsx)("img",{src:s.product_image,alt:""})}),(0,b.jsxs)("div",{className:"cart-image-content",children:[(0,b.jsxs)("div",{children:[(0,b.jsxs)("div",{className:"cart-image-title",children:[(0,b.jsx)("h2",{children:s.product_name}),(0,b.jsxs)("p",{children:["Product Code : ",(0,b.jsx)("span",{children:s.product_code})]})]}),(0,b.jsxs)("div",{className:"cart-select",children:[(0,b.jsxs)(n.A.Group,{children:[(0,b.jsx)(n.A.Label,{children:"Ring Size:"}),s.size_name]}),(0,b.jsxs)(n.A.Group,{children:[(0,b.jsx)(n.A.Label,{children:"Quantity:"}),s.quantity]})]}),s.cart_material.map(((e,s)=>(0,b.jsxs)("p",{className:"mb-1",children:[e.material,": ",(0,b.jsxs)("span",{children:[e.quantity>0?e.quantity+" "+e.material+", ":""," ",e.purity_name,", ",e.weight," ",e.unit_name]})]},s))),(0,b.jsx)("div",{className:"cart-icons mt-3",children:(0,b.jsxs)("h4",{onClick:()=>this.removeConfirm(s),children:[" ",(0,b.jsx)(d.pS_,{})," Remove"]})})]}),(0,b.jsx)("div",{children:(0,b.jsx)("div",{className:"price-wrapper",children:(0,b.jsx)("div",{className:"cart-discount-price",children:(0,b.jsx)("span",{className:"price",children:s.total_price_display})})})})]})]}),(0,b.jsx)("hr",{}),a==e.length-1?(0,b.jsx)("div",{className:"cart-notes mt-4",style:{width:"100%",bottom:"300px"},children:(0,b.jsxs)("ul",{children:[(0,b.jsxs)("li",{children:[(0,b.jsx)(h.OLr,{})," 30 Day Money Back"]}),(0,b.jsxs)("li",{children:[(0,b.jsx)(h.OLr,{})," Eligible for Lifetime exchange & Buy back"]}),(0,b.jsxs)("li",{children:[(0,b.jsx)(h.OLr,{})," FREE & Insured Delivery"]})]})}):null]},a)})},a))):(0,b.jsx)("div",{style:{display:"flex",justifyContent:"center"},children:(0,b.jsx)("h5",{children:"Cart is empty !"})})}),(0,b.jsx)(l.A,{xs:12,md:4,children:(0,b.jsxs)("div",{className:"cart-right-sidebar",children:[(0,b.jsx)("div",{className:"order-summary-header",children:(0,b.jsx)("h4",{children:"ORDER SUMMARY"})}),(0,b.jsxs)("div",{className:"summary-items",children:[(0,b.jsxs)("p",{children:["Total ( ",(0,b.jsxs)("span",{children:[e.length," "]})," Items )"]}),(0,b.jsx)("p",{children:this.state.item_total_display})]}),(0,b.jsxs)("div",{className:"summary-t-payable",children:[(0,b.jsx)("p",{children:(0,b.jsx)("strong",{children:"Total Payable "})}),(0,b.jsx)("p",{children:(0,b.jsx)("strong",{children:this.state.total_payable_display})})]}),e.length?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("div",{className:"place-order-button mt-5",children:[(0,b.jsx)(o.A,{variant:"primary",onClick:this.handlePlaceOrder,children:"PLACE ORDER"}),(0,b.jsx)("p",{className:"mt-3",children:"I have a voucher code/ gift card"})]}),(0,b.jsx)("div",{className:"gap-30"}),(0,b.jsxs)("p",{className:"queries",children:[(0,b.jsx)("span",{children:"Any Questions?"})," Please call us at 1800-419-0066 or Chat with us"]})]}):null]})})]})]})}),(0,b.jsx)("div",{className:"cart-wrapper mobile-cart",children:(0,b.jsxs)("div",{className:"mobile-cart-header mb-4",children:[(0,b.jsx)(h.rBg,{})," ",(0,b.jsx)("h3",{children:(0,b.jsx)("a",{href:"/",children:"Cart"})})]})})]})})}}const N=(0,m.A)((0,u.Ng)((e=>({auth:e.auth,items:e.retailer.cart.items,item_total_display:e.retailer.cart.item_total_display,total_payable_display:e.retailer.cart.total_payable_display,actionCalled:e.retailer.cart.actionCalled,deleteSuccess:e.retailer.cart.deleteSuccess,successMessage:e.retailer.cart.successMessage,errorMessage:e.retailer.cart.errorMessage})),(e=>({dispatch:e,actions:(0,p.zH)({CartList:x.Rh,CartDelete:x.aU,checkoutList:j.h},e)})))(A))},42490:(e,s,a)=>{a.d(s,{A:()=>t});const t=a.p+"assets/cartImage.png"},4295:(e,s,a)=>{a.d(s,{A:()=>m});var t=a(71633),r=a.n(t),i=a(63696),l=a(71971),c=a(35191),n=a(62540);const o=i.forwardRef((({bsPrefix:e,active:s,children:a,className:t,as:i="li",linkAs:o=c.A,linkProps:d,href:h,title:m,target:u,...p},x)=>{const j=(0,l.oU)(e,"breadcrumb-item");return(0,n.jsx)(i,{ref:x,...p,className:r()(j,t,{active:s}),"aria-current":s?"page":void 0,children:s?a:(0,n.jsx)(o,{...d,href:h,title:m,target:u,children:a})})}));o.displayName="BreadcrumbItem",o.defaultProps={active:!1,linkProps:{}};const d=o,h=i.forwardRef((({bsPrefix:e,className:s,listProps:a,children:t,label:i,as:c="nav",...o},d)=>{const h=(0,l.oU)(e,"breadcrumb");return(0,n.jsx)(c,{"aria-label":i,className:s,ref:d,...o,children:(0,n.jsx)("ol",{...a,className:r()(h,null==a?void 0:a.className),children:t})})}));h.displayName="Breadcrumb",h.defaultProps={label:"breadcrumb",listProps:{}};const m=Object.assign(h,{Item:d})},26692:(e,s,a)=>{a.d(s,{A:()=>T});var t,r=a(71633),i=a.n(r),l=a(89230),c=a(36016),n=a(9565),o=a(26991);function d(e){if((!t&&0!==t||e)&&c.A){var s=document.createElement("div");s.style.position="absolute",s.style.top="-9999px",s.style.width="50px",s.style.height="50px",s.style.overflow="scroll",document.body.appendChild(s),t=s.offsetWidth-s.clientWidth,document.body.removeChild(s)}return t}var h=a(32224),m=a(54803),u=a(76608),p=a(76445),x=a(40289),j=a(63696),g=a(21331),y=a(13769),v=a(14977),b=a(89161);const f=(0,b.A)("modal-body");var A=a(13359),N=a(71971),_=a(62540);const C=j.forwardRef((({bsPrefix:e,className:s,contentClassName:a,centered:t,size:r,fullscreen:l,children:c,scrollable:n,...o},d)=>{const h=`${e=(0,N.oU)(e,"modal")}-dialog`,m="string"==typeof l?`${e}-fullscreen-${l}`:`${e}-fullscreen`;return(0,_.jsx)("div",{...o,ref:d,className:i()(h,s,r&&`${e}-${r}`,t&&`${h}-centered`,n&&`${h}-scrollable`,l&&m),children:(0,_.jsx)("div",{className:i()(`${e}-content`,a),children:c})})}));C.displayName="ModalDialog";const w=C,R=(0,b.A)("modal-footer");var k=a(55617);const M=j.forwardRef((({bsPrefix:e,className:s,...a},t)=>(e=(0,N.oU)(e,"modal-header"),(0,_.jsx)(k.A,{ref:t,...a,className:i()(s,e)}))));M.displayName="ModalHeader",M.defaultProps={closeLabel:"Close",closeButton:!1};const D=M,S=(0,a(297).A)("h4"),P=(0,b.A)("modal-title",{Component:S}),E={show:!1,backdrop:!0,keyboard:!0,autoFocus:!0,enforceFocus:!0,restoreFocus:!0,animation:!0,dialogAs:w};function F(e){return(0,_.jsx)(v.A,{...e,timeout:null})}function I(e){return(0,_.jsx)(v.A,{...e,timeout:null})}const O=j.forwardRef((({bsPrefix:e,className:s,style:a,dialogClassName:t,contentClassName:r,children:v,dialogAs:b,"aria-labelledby":f,"aria-describedby":C,"aria-label":w,show:R,animation:k,backdrop:M,keyboard:D,onEscapeKeyDown:S,onShow:P,onHide:E,container:O,autoFocus:T,enforceFocus:L,restoreFocus:B,restoreFocusOptions:H,onEntered:U,onExit:$,onExiting:z,onEnter:K,onEntering:q,onExited:W,backdropClassName:G,manager:J,...Q},Y)=>{const[V,X]=(0,j.useState)({}),[Z,ee]=(0,j.useState)(!1),se=(0,j.useRef)(!1),ae=(0,j.useRef)(!1),te=(0,j.useRef)(null),[re,ie]=(0,h.A)(),le=(0,u.A)(Y,ie),ce=(0,m.A)(E),ne=(0,N.Wz)();e=(0,N.oU)(e,"modal");const oe=(0,j.useMemo)((()=>({onHide:ce})),[ce]);function de(){return J||(0,y.R)({isRTL:ne})}function he(e){if(!c.A)return;const s=de().getScrollbarWidth()>0,a=e.scrollHeight>(0,n.A)(e).documentElement.clientHeight;X({paddingRight:s&&!a?d():void 0,paddingLeft:!s&&a?d():void 0})}const me=(0,m.A)((()=>{re&&he(re.dialog)}));(0,p.A)((()=>{(0,o.A)(window,"resize",me),null==te.current||te.current()}));const ue=()=>{se.current=!0},pe=e=>{se.current&&re&&e.target===re.dialog&&(ae.current=!0),se.current=!1},xe=()=>{ee(!0),te.current=(0,x.A)(re.dialog,(()=>{ee(!1)}))},je=e=>{"static"!==M?ae.current||e.target!==e.currentTarget?ae.current=!1:null==E||E():(e=>{e.target===e.currentTarget&&xe()})(e)},ge=(0,j.useCallback)((s=>(0,_.jsx)("div",{...s,className:i()(`${e}-backdrop`,G,!k&&"show")})),[k,G,e]),ye={...a,...V};return ye.display="block",(0,_.jsx)(A.A.Provider,{value:oe,children:(0,_.jsx)(g.A,{show:R,ref:le,backdrop:M,container:O,keyboard:!0,autoFocus:T,enforceFocus:L,restoreFocus:B,restoreFocusOptions:H,onEscapeKeyDown:e=>{D||"static"!==M?D&&S&&S(e):(e.preventDefault(),xe())},onShow:P,onHide:E,onEnter:(e,s)=>{e&&he(e),null==K||K(e,s)},onEntering:(e,s)=>{null==q||q(e,s),(0,l.Ay)(window,"resize",me)},onEntered:U,onExit:e=>{null==te.current||te.current(),null==$||$(e)},onExiting:z,onExited:e=>{e&&(e.style.display=""),null==W||W(e),(0,o.A)(window,"resize",me)},manager:de(),transition:k?F:void 0,backdropTransition:k?I:void 0,renderBackdrop:ge,renderDialog:a=>(0,_.jsx)("div",{role:"dialog",...a,style:ye,className:i()(s,e,Z&&`${e}-static`),onClick:M?je:void 0,onMouseUp:pe,"aria-label":w,"aria-labelledby":f,"aria-describedby":C,children:(0,_.jsx)(b,{...Q,onMouseDown:ue,className:t,contentClassName:r,children:v})})})})}));O.displayName="Modal",O.defaultProps=E;const T=Object.assign(O,{Body:f,Header:D,Title:P,Footer:R,Dialog:w,TRANSITION_DURATION:300,BACKDROP_TRANSITION_DURATION:150})}}]);