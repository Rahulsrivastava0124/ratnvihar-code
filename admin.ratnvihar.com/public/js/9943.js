"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9943],{66095:(e,a,s)=>{var t=s(96784);a.A=void 0;var r=t(s(17044)),n=s(62540),i=(0,r.default)((0,n.jsx)("path",{d:"M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"}),"KeyboardArrowDown");a.A=i},66282:(e,a,s)=>{var t=s(96784);a.A=void 0;var r=t(s(17044)),n=s(62540),i=(0,r.default)((0,n.jsx)("path",{d:"M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"}),"KeyboardArrowUp");a.A=i},36213:(e,a,s)=>{s.d(a,{A:()=>N});var t=s(49257),r=s(68102),n=s(63696),i=s(68017),o=s(81023),c=s(91785),l=s(28362),d=s(90013),p=s(2512),h=s(46733);function u(e){return(0,h.A)("MuiCircularProgress",e)}(0,s(29009).A)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var m=s(62540);const A=["className","color","disableShrink","size","style","thickness","value","variant"];let x,g,j,v,y=e=>e;const b=(0,c.i7)(x||(x=y`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),f=(0,c.i7)(g||(g=y`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),w=(0,p.Ay)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,a)=>{const{ownerState:s}=e;return[a.root,a[s.variant],a[`color${(0,l.A)(s.color)}`]]}})((({ownerState:e,theme:a})=>(0,r.A)({display:"inline-block"},"determinate"===e.variant&&{transition:a.transitions.create("transform")},"inherit"!==e.color&&{color:(a.vars||a).palette[e.color].main})),(({ownerState:e})=>"indeterminate"===e.variant&&(0,c.AH)(j||(j=y`
      animation: ${0} 1.4s linear infinite;
    `),b))),S=(0,p.Ay)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,a)=>a.svg})({display:"block"}),k=(0,p.Ay)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,a)=>{const{ownerState:s}=e;return[a.circle,a[`circle${(0,l.A)(s.variant)}`],s.disableShrink&&a.circleDisableShrink]}})((({ownerState:e,theme:a})=>(0,r.A)({stroke:"currentColor"},"determinate"===e.variant&&{transition:a.transitions.create("stroke-dashoffset")},"indeterminate"===e.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:e})=>"indeterminate"===e.variant&&!e.disableShrink&&(0,c.AH)(v||(v=y`
      animation: ${0} 1.4s ease-in-out infinite;
    `),f))),N=n.forwardRef((function(e,a){const s=(0,d.A)({props:e,name:"MuiCircularProgress"}),{className:n,color:c="primary",disableShrink:p=!1,size:h=40,style:x,thickness:g=3.6,value:j=0,variant:v="indeterminate"}=s,y=(0,t.A)(s,A),b=(0,r.A)({},s,{color:c,disableShrink:p,size:h,thickness:g,value:j,variant:v}),f=(e=>{const{classes:a,variant:s,color:t,disableShrink:r}=e,n={root:["root",s,`color${(0,l.A)(t)}`],svg:["svg"],circle:["circle",`circle${(0,l.A)(s)}`,r&&"circleDisableShrink"]};return(0,o.A)(n,u,a)})(b),N={},_={},M={};if("determinate"===v){const e=2*Math.PI*((44-g)/2);N.strokeDasharray=e.toFixed(3),M["aria-valuenow"]=Math.round(j),N.strokeDashoffset=`${((100-j)/100*e).toFixed(3)}px`,_.transform="rotate(-90deg)"}return(0,m.jsx)(w,(0,r.A)({className:(0,i.A)(f.root,n),style:(0,r.A)({width:h,height:h},_,x),ownerState:b,ref:a,role:"progressbar"},M,y,{children:(0,m.jsx)(S,{className:f.svg,ownerState:b,viewBox:"22 22 44 44",children:(0,m.jsx)(k,{className:f.circle,style:N,ownerState:b,cx:44,cy:44,r:(44-g)/2,fill:"none",strokeWidth:g})})}))}))},11505:(e,a,s)=>{s.d(a,{A:()=>v});var t=s(49257),r=s(68102),n=s(63696),i=s(68017),o=s(81023),c=s(39195),l=s(2512),d=s(90013),p=s(87034),h=s(28362),u=s(46733);function m(e){return(0,u.A)("MuiIconButton",e)}const A=(0,s(29009).A)("MuiIconButton",["root","disabled","colorInherit","colorPrimary","colorSecondary","edgeStart","edgeEnd","sizeSmall","sizeMedium","sizeLarge"]);var x=s(62540);const g=["edge","children","className","color","disabled","disableFocusRipple","size"],j=(0,l.Ay)(p.A,{name:"MuiIconButton",slot:"Root",overridesResolver:(e,a)=>{const{ownerState:s}=e;return[a.root,"default"!==s.color&&a[`color${(0,h.A)(s.color)}`],s.edge&&a[`edge${(0,h.A)(s.edge)}`],a[`size${(0,h.A)(s.size)}`]]}})((({theme:e,ownerState:a})=>(0,r.A)({textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:8,borderRadius:"50%",overflow:"visible",color:(e.vars||e).palette.action.active,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest})},!a.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,c.X4)(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"start"===a.edge&&{marginLeft:"small"===a.size?-3:-12},"end"===a.edge&&{marginRight:"small"===a.size?-3:-12})),(({theme:e,ownerState:a})=>(0,r.A)({},"inherit"===a.color&&{color:"inherit"},"inherit"!==a.color&&"default"!==a.color&&(0,r.A)({color:(e.vars||e).palette[a.color].main},!a.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette[a.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,c.X4)(e.palette[a.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}}),"small"===a.size&&{padding:5,fontSize:e.typography.pxToRem(18)},"large"===a.size&&{padding:12,fontSize:e.typography.pxToRem(28)},{[`&.${A.disabled}`]:{backgroundColor:"transparent",color:(e.vars||e).palette.action.disabled}}))),v=n.forwardRef((function(e,a){const s=(0,d.A)({props:e,name:"MuiIconButton"}),{edge:n=!1,children:c,className:l,color:p="default",disabled:u=!1,disableFocusRipple:A=!1,size:v="medium"}=s,y=(0,t.A)(s,g),b=(0,r.A)({},s,{edge:n,color:p,disabled:u,disableFocusRipple:A,size:v}),f=(e=>{const{classes:a,disabled:s,color:t,edge:r,size:n}=e,i={root:["root",s&&"disabled","default"!==t&&`color${(0,h.A)(t)}`,r&&`edge${(0,h.A)(r)}`,`size${(0,h.A)(n)}`]};return(0,o.A)(i,m,a)})(b);return(0,x.jsx)(j,(0,r.A)({className:(0,i.A)(f.root,l),centerRipple:!0,focusRipple:!A,disabled:u,ref:a,ownerState:b},y,{children:c}))}))},43303:(e,a,s)=>{s.d(a,{Bm:()=>c,TK:()=>p,VS:()=>i,Y$:()=>l,_N:()=>o,yz:()=>d});var t=s(80325),r=s(78342),n=s(45892);const i=e=>(e=(0,n.x0)(e,!0),a=>{t.A.get("/superadmin/payments".concat(e)).then((e=>{e.data.success&&a({type:r.$F,payload:e.data.data})})).catch((e=>{}))}),o=e=>a=>{t.A.post("/superadmin/payments/store",e).then((e=>{a({type:r.ci,payload:e.data})})).catch((e=>{}))},c=e=>a=>{t.A.get("/superadmin/payments/due-amount?user_id=".concat(e)).then((e=>{e.data.success&&a({type:r.X6,payload:e.data.data})})).catch((e=>{}))},l=e=>(e=(0,n.x0)(e,!0),a=>{t.A.get("/superadmin/wallet-history".concat(e)).then((e=>{e.data.success&&a({type:r.Qz,payload:e.data.data})})).catch((e=>{}))}),d=e=>t.A.get("/superadmin/payments/wallet-balance?payment_mode=".concat(e)),p=(e,a)=>t.A.post("/superadmin/payments/update-status/"+e,a)},26118:(e,a,s)=>{s.d(a,{Ox:()=>p,SI:()=>A,Uf:()=>h,Z$:()=>i,Zi:()=>l,_B:()=>g,il:()=>x,kA:()=>c,qn:()=>u,sd:()=>m,wp:()=>o,zK:()=>d});var t=s(80325),r=s(68212),n=s(45892);const i=e=>(e=(0,n.x0)(e,!0),a=>{t.A.get("/superadmin/sales".concat(e)).then((e=>{e.data.success&&a({type:r.go,payload:e.data.data})})).catch((e=>{}))}),o=e=>a=>{t.A.post("/superadmin/sales/store",e).then((e=>{a({type:r.x3,payload:e.data})})).catch((e=>{}))},c=e=>a=>{t.A.get("/superadmin/sales/view/".concat(e)).then((e=>{console.log(e.data.data),e.data.success&&a({type:r.gN,payload:e.data.data})})).catch((e=>{}))},l=(e,a)=>t.A.post("/superadmin/sales-on-approve/status/".concat(e),a),d=e=>a=>{t.A.get("/superadmin/sales/edit/".concat(e)).then((e=>{console.log(e.data.data),e.data.success&&a({type:r.gN,payload:e.data.data})})).catch((e=>{}))},p=(e,a)=>s=>{t.A.post("/superadmin/sales/update/".concat(e),a).then((e=>{s({type:r.hF,payload:e.data})})).catch((e=>{}))},h=(e,a)=>s=>{t.A.delete("/superadmin/sales/delete/".concat(e),a).then((e=>{s({type:r.VW,payload:e.data})})).catch((e=>{}))},u=e=>t.A.post("/superadmin/sales/download-invoice/".concat(e)),m=e=>t.A.get("/superadmin/sales/view/".concat(e)),A=(e,a)=>t.A.post("/superadmin/sales/return/".concat(e),a),x=e=>t.A.post("/superadmin/sales/return-stock-transfer",e),g=e=>(e=(0,n.x0)(e,!0),t.A.get("/superadmin/sales-products".concat(e)))},32324:(e,a,s)=>{s.r(a),s.d(a,{default:()=>z});var t=s(63696),r=s(52821),n=s(45271),i=s(36213),o=s(49746),c=s(11505),l=s(95624),d=s(61095),p=s(66593),h=s(61176),u=s(66098),m=s(50977),A=s(51449),x=s(26118),g=s(88441),j=s(98993),v=s(73947),y=s(10228),b=s(45166),f=s(2598),w=s(25606),S=s(24019),k=s(66095),N=s(66282),_=s(43303),M=s(62540);class C extends t.Component{constructor(e){var a,s;super(e),s=()=>{this.props.actions.salesView(this.props.params.id)},(a="loadViewData")in this?Object.defineProperty(this,a,{value:s,enumerable:!0,configurable:!0,writable:!0}):this[a]=s,this.state={sale:this.props.sale,openDialog:!1,actionCalled:this.props.actionCalled,createSuccess:this.props.createSuccess,successMessage:this.props.successMessage,errorMessage:this.props.errorMessage,processing:!1,items:this.props.items,total:this.props.total,queryParams:{page:1,limit:50,date_from:null,date_to:null,table_type:"sale",is_assigned:!0},auth:this.props.auth}}componentDidMount(){this.loadViewData()}static getDerivedStateFromProps(e,a){let s={};return e.sale!==a.sale&&(s.sale=e.sale),e.actionCalled!==a.actionCalled&&(s.actionCalled=e.actionCalled),e.createSuccess!==a.createSuccess&&(s.createSuccess=e.createSuccess),e.successMessage!==a.successMessage&&(s.successMessage=e.successMessage),e.errorMessage!==a.errorMessage&&(s.errorMessage=e.errorMessage),e.items!==a.items&&(s.items=e.items),e.total!==a.total&&(s.total=e.total),e.auth!==a.auth&&(s.auth=e.auth),s}componentDidUpdate(e){this.props.params.id!=e.params.id&&this.loadViewData()}render(){const{sale:e}=this.state;return(0,M.jsx)(u.A,{title:"Transfer Details",children:e?(0,M.jsxs)(M.Fragment,{children:[(0,M.jsxs)("div",{className:"return-wrapper",children:[(0,M.jsxs)("div",{className:"return-header",children:[(0,M.jsxs)("p",{children:["Transfer Date: ",e.invoice_date]}),e.notes?(0,M.jsxs)("p",{children:["Notes: ",e.notes]}):null]}),(0,M.jsx)("div",{className:"",children:(0,M.jsx)(o.A,{className:"add-button",variant:"contained",onClick:()=>this.props.navigate(-1),children:"Back"})})]}),(0,M.jsx)(n.Ay,{container:!0,spacing:h.iL,className:"details-header ratn-pur-wrapper loans_view",children:(0,M.jsx)(n.Ay,{item:!0,xs:12,children:(0,M.jsx)(f.A,{component:S.A,children:(0,M.jsx)("div",{className:"ratn-table-purchase-wrapper",children:(0,M.jsxs)(j.A,{"aria-label":"collapsible table",className:"invoice_product_list",children:[(0,M.jsx)(v.A,{className:"ratn-table-header",children:(0,M.jsxs)(w.A,{children:[(0,M.jsx)(b.A,{children:"Transfer Date"}),(0,M.jsx)(b.A,{children:"Transfer Number"}),(0,M.jsx)(b.A,{children:"Transfer To"}),(0,M.jsx)(b.A,{children:"No. of Products"}),(0,M.jsx)(b.A,{children:"Accept/Declined At"}),(0,M.jsx)(b.A,{children:"Status"})]})}),(0,M.jsx)(y.A,{className:"pur-details-table-body",children:(0,M.jsxs)(w.A,{children:[(0,M.jsx)(b.A,{component:"th",scope:"row",children:e.invoice_date}),(0,M.jsx)(b.A,{children:e.invoice_number}),(0,M.jsx)(b.A,{children:e.user_name}),(0,M.jsx)(b.A,{children:e.no_of_products}),(0,M.jsx)(b.A,{children:e.accept_declined_at}),(0,M.jsx)(b.A,{className:"sales-status",children:e.approve_status})]})})]})})})})}),(0,M.jsx)(n.Ay,{container:!0,spacing:h.iL,className:"details-header ratn-pur-wrapper loans_view",children:(0,M.jsx)(n.Ay,{item:!0,xs:12,children:(0,M.jsx)(f.A,{component:S.A,children:(0,M.jsx)("div",{className:"ratn-table-purchase-wrapper",children:(0,M.jsxs)(j.A,{"aria-label":"collapsible table",className:"invoice_product_list",children:[(0,M.jsx)(v.A,{className:"ratn-table-header",children:(0,M.jsxs)(w.A,{children:[(0,M.jsx)(b.A,{}),(0,M.jsx)(b.A,{children:"#"}),(0,M.jsx)(b.A,{children:"Product Name"}),(0,M.jsx)(b.A,{children:"Category Name"}),(0,M.jsx)(b.A,{children:"Certificate Number"}),(0,M.jsx)(b.A,{children:"Total Weight"}),(0,M.jsx)(b.A,{children:"Size"}),(0,M.jsx)(b.A,{children:"Sub Total"}),(0,M.jsx)(b.A,{children:"Making Charge"}),(0,M.jsx)(b.A,{children:"Total"})]})}),(0,M.jsx)(y.A,{children:e.products.map(((e,a)=>(0,M.jsx)(R,{row:e,index:a},a)))})]})})})})})]}):(0,M.jsx)(n.Ay,{container:!0,justifyContent:"center",children:(0,M.jsx)(i.A,{})})})}}const z=(0,A.Gh)((0,m.A)((0,r.connect)((e=>({sale:e.superadmin.sales.sale,actionCalled:e.superadmin.payment.actionCalled,createSuccess:e.superadmin.payment.createSuccess,successMessage:e.superadmin.payment.successMessage,errorMessage:e.superadmin.payment.errorMessage,items:e.superadmin.payment.items,total:e.superadmin.payment.total,auth:e.auth})),(e=>({dispatch:e,actions:(0,g.bindActionCreators)({salesView:x.kA,paymentStore:_._N,paymentList:_.VS},e)})))(C)));function R(e){const{row:a,index:s}=e,[r,n]=t.useState(!1),i=s+1,o=i%2==0?"even":"odd";return(0,M.jsxs)(t.Fragment,{children:[(0,M.jsxs)(w.A,{sx:{"& > *":{borderBottom:"unset"}},className:o,children:[(0,M.jsx)(b.A,{children:(0,M.jsx)(c.A,{"aria-label":"expand row",size:"small",onClick:()=>n(!r),className:"expand_icon",children:r?(0,M.jsx)(N.A,{}):(0,M.jsx)(k.A,{})})}),(0,M.jsx)(b.A,{component:"th",scope:"row",children:i<=9?"0"+i:i}),(0,M.jsx)(b.A,{component:"th",scope:"row",children:a.product_name}),(0,M.jsx)(b.A,{children:a.category_name}),(0,M.jsx)(b.A,{children:a.certificate_no}),(0,M.jsx)(b.A,{children:a.total_weight}),(0,M.jsx)(b.A,{children:a.size_name}),(0,M.jsx)(b.A,{children:a.sub_price}),(0,M.jsx)(b.A,{children:a.making_charge}),(0,M.jsx)(b.A,{children:a.total})]}),(0,M.jsx)(w.A,{className:"table-inner-row sub_table "+o,children:(0,M.jsx)(b.A,{style:{paddingBottom:0,paddingTop:0},colSpan:11,children:(0,M.jsx)(l.A,{in:r,timeout:"auto",unmountOnExit:!0,children:(0,M.jsxs)(d.A,{sx:{margin:1},children:[(0,M.jsx)(p.A,{variant:"h6",gutterBottom:!0,component:"span"}),(0,M.jsxs)(j.A,{size:"medium","aria-label":"sales",children:[(0,M.jsx)(v.A,{children:(0,M.jsxs)(w.A,{className:"pur-details-inner-table",children:[(0,M.jsx)(b.A,{children:"Material Name"}),(0,M.jsx)(b.A,{children:"Purity"}),(0,M.jsx)(b.A,{children:"Quantity"}),(0,M.jsx)(b.A,{children:"Weight"}),(0,M.jsx)(b.A,{children:"Unit"}),(0,M.jsx)(b.A,{children:"Rate"}),(0,M.jsx)(b.A,{children:"Amount"})]})}),(0,M.jsx)(y.A,{className:"pur-details-table-body",children:a.materials.map(((e,a)=>(0,M.jsxs)(w.A,{children:[(0,M.jsx)(b.A,{component:"th",scope:"row",children:e.material_name}),(0,M.jsx)(b.A,{children:e.purity_name}),(0,M.jsx)(b.A,{children:e.quantity}),(0,M.jsx)(b.A,{children:e.weight}),(0,M.jsx)(b.A,{children:e.unit_name}),(0,M.jsx)(b.A,{children:e.rate}),(0,M.jsx)(b.A,{children:e.amount})]},a)))})]})]})})})})]})}}}]);