"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8213],{27839:(e,s,r)=>{r.d(s,{F9:()=>t,QR:()=>c,jE:()=>n,v7:()=>l,yz:()=>h});var a=r(80325),i=r(22912),d=r(45892);const n=e=>s=>{a.A.post("/sales-executive/place-order",e).then((e=>{s({type:i.VN,payload:e.data})})).catch((e=>{}))},t=e=>(e=(0,d.x0)(e,!0),s=>{a.A.get("".concat("http://localhost:9083","/api/sales-executive/orders").concat(e)).then((e=>{e.data.success&&s({type:i.YE,payload:e.data.data})})).catch((e=>{}))}),c=e=>s=>{a.A.post("".concat("http://localhost:9083","/api/sales-executive/cancel-order"),e).then((e=>{e.data.success&&s({type:i.jh,payload:e.data})})).catch((e=>{}))},l=e=>a.A.get("".concat("http://localhost:9083","/api/sales-executive/orders?order_id=").concat(e)),h=e=>a.A.post("".concat("http://localhost:9083","/api/sales-executive/orders/confirm-order"),e)},8213:(e,s,r)=>{r.r(s),r.d(s,{default:()=>N});var a=r(63696),i=r(81660),d=r(19211),n=r(99101),t=r(22187),c=(r(60985),r(30139),r(8794),r(8590)),l=r(27839),h=r(69324),m=r(50977),o=r(80249),p=r(5908),x=r(14796),j=(r(27289),r(27397)),u=r(62540);function v(e,s,r){return s in e?Object.defineProperty(e,s,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[s]=r,e}class y extends a.Component{constructor(e){super(e),v(this,"loadOrder",(()=>{this.props.actions.OrderList({order_id:this.props.params.id})})),v(this,"confirmOrder",(async e=>{console.log(e),await(0,l.yz)({order_id:this.props.params.id})?(j.oR.success("Order Status Changed Successfully."),this.props.navigate("/sales-executive/orders")):(j.oR.error("Order not found."),this.props.navigate("/sales-executive/orders/"+this.props.params.id))})),this.state={items:this.props.items,loading:!0}}componentDidMount(){this.loadOrder()}static getDerivedStateFromProps(e,s){let r={};return e.items!==s.items&&(r.items=e.items,r.loading=!1),r}render(){let e=this.state.items.length?this.state.items[0]:null;return(0,u.jsx)(u.Fragment,{children:this.state.loading?(0,u.jsx)(h.A,{}):(0,u.jsx)(u.Fragment,{children:e?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("div",{className:"order-summary-wrapper desktop-summary-wrapper",children:(0,u.jsx)(i.A,{children:(0,u.jsxs)(d.A,{children:[(0,u.jsx)(n.A,{xs:12,md:8,children:(0,u.jsxs)("div",{className:"summary-content",children:[(0,u.jsxs)("h2",{className:"mb-5",children:["Order ID: #",e.order_no]}),(0,u.jsxs)("div",{className:"item-wrapper",children:[(0,u.jsxs)("div",{className:"header",children:[(0,u.jsx)("div",{className:"item-header",children:"Items"}),(0,u.jsx)("div",{className:"qty-header",children:"Quantity"}),(0,u.jsx)("div",{className:"price-header",children:"Price"})]}),(0,u.jsx)("div",{className:"underline-hr"}),e.orderProducts.map(((e,s)=>(0,u.jsxs)("div",{className:"list-header",children:[(0,u.jsx)("div",{className:"item-header",children:(0,u.jsxs)("div",{className:"header-item-img d-flex gap-3",children:[(0,u.jsx)("span",{children:(0,u.jsx)("img",{src:e.image,alt:""})}),(0,u.jsxs)("span",{children:[(0,u.jsx)("h3",{children:e.product_name}),e.materials.map(((e,s)=>(0,u.jsxs)("h4",{children:[e.material_name,": ",e.quantity>0?e.quantity+" "+e.material_name+", ":""," ",e.purity_name,", ",e.weight," ",e.unit_name]},s))),(0,u.jsxs)("h5",{children:["Size: ",e.size_name]})]})]})}),(0,u.jsx)("div",{className:"qty-header",children:e.quantity}),(0,u.jsx)("div",{className:"price-header",children:(0,u.jsx)("h3",{children:e.rate})})]},s))),(0,u.jsx)("div",{className:"underline-hr"}),(0,u.jsxs)("div",{className:"header-price",children:[(0,u.jsx)("ul",{children:(0,u.jsxs)("li",{children:[(0,u.jsx)("span",{children:"Sub Total"}),(0,u.jsx)("span",{children:e.sub_total})]})}),(0,u.jsx)("div",{className:"underline-hr"}),(0,u.jsx)("ul",{children:(0,u.jsxs)("li",{children:[(0,u.jsx)("span",{children:"Total"}),(0,u.jsx)("span",{children:e.total_amount})]})})]})]})]})}),(0,u.jsxs)(n.A,{xs:12,md:4,children:[(0,u.jsx)("div",{className:"summary-content-right mb-4",children:(0,u.jsxs)("ul",{children:[(0,u.jsxs)("li",{children:[(0,u.jsx)("span",{children:"Ship to"}),(0,u.jsx)("span",{children:e.delivery_address})]}),(0,u.jsxs)("li",{children:[(0,u.jsx)("span",{children:"Payment Mode"}),(0,u.jsx)("span",{children:e.payment_mode})]}),(0,u.jsxs)("li",{children:[(0,u.jsx)("span",{children:"Date Ordered"}),(0,u.jsx)("span",{children:e.order_date})]})]})}),"pending"==e.status?(0,u.jsx)(t.A,{variant:"success",className:"mb-4",onClick:()=>this.confirmOrder(e.id),children:"Confirm Order"}):""]})]})})}),(0,u.jsxs)("div",{className:"order-summary-wrapper mobile-summary-wrapper",children:[(0,u.jsxs)("div",{className:"mobile-checkout-header mb-4",children:[(0,u.jsx)(c.rBg,{})," ",(0,u.jsx)("h3",{children:"Order Summary"})]}),(0,u.jsx)(i.A,{children:(0,u.jsx)(d.A,{children:(0,u.jsx)(n.A,{xs:12,md:8,children:(0,u.jsxs)("div",{className:"summary-content",children:[(0,u.jsxs)("h2",{className:"mb-2",children:["Order ID: #",e.order_no]}),e.orderProducts.map(((e,s)=>e.materials.map(((e,s)=>(0,u.jsxs)("h3",{className:"s-sub-content",children:[e.material_name,": ",e.quantity>0?e.quantity+" "+e.material_name+", ":""," ",e.purity_name,", ",e.weight," ",e.unit_name]},s))))),(0,u.jsxs)("div",{className:"order-summary-statue mb-2",children:["Order Status: ",e.status]}),(0,u.jsx)("div",{className:"summary-order-image",children:(0,u.jsx)(t.A,{variant:"primary",className:"mb-4",children:"RATE ORDER"})}),(0,u.jsx)("div",{className:"summary-content-right mb-4",children:(0,u.jsxs)("ul",{children:[(0,u.jsxs)("li",{children:[(0,u.jsx)("span",{children:"Ship to"}),(0,u.jsx)("span",{children:e.delivery_address})]}),(0,u.jsxs)("li",{children:[(0,u.jsx)("span",{children:"Paid via"}),(0,u.jsx)("span",{children:e.payment_mode})]}),(0,u.jsxs)("li",{children:[(0,u.jsx)("span",{children:"Date Ordered"}),(0,u.jsx)("span",{children:e.order_date})]})]})}),(0,u.jsx)("div",{className:"underline-hr"}),(0,u.jsxs)("div",{className:"item-wrapper",children:[(0,u.jsx)("h3",{children:"ITEMS"}),e.orderProducts.map(((e,s)=>(0,u.jsxs)("div",{className:"header-item-img d-flex gap-3",children:[(0,u.jsx)("span",{children:(0,u.jsx)("img",{src:e.image,alt:""})}),(0,u.jsxs)("span",{children:[(0,u.jsxs)("h3",{children:[e.product_name," "]}),(0,u.jsxs)("h4",{children:["QTY:",e.quantity]}),(0,u.jsx)("h5",{children:e.rate})]})]},s)))]}),(0,u.jsxs)("div",{className:"item-wrapper",children:[(0,u.jsx)("div",{className:"underline-hr"}),(0,u.jsxs)("div",{className:"header-price",children:[(0,u.jsx)("ul",{children:(0,u.jsxs)("li",{children:[(0,u.jsx)("span",{children:"Sub Total"}),(0,u.jsx)("span",{children:e.sub_total})]})}),(0,u.jsx)("div",{className:"underline-hr"}),(0,u.jsx)("ul",{children:(0,u.jsxs)("li",{children:[(0,u.jsx)("span",{children:"Total"}),(0,u.jsx)("span",{children:e.total_amount})]})})]})]})]})})})})]})]}):(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)("div",{className:"no-product",children:[(0,u.jsx)("img",{src:x.A,alt:""}),(0,u.jsx)("h1",{className:"mb-0",children:"Order Not Found"})]})})})})}}const N=(0,m.A)((0,o.Ng)((e=>({items:e.sales.order.items})),(e=>({dispatch:e,actions:(0,p.zH)({OrderList:l.F9,OrderConfirmation:l.yz},e)})))(y))},60985:(e,s,r)=>{r.p},8794:(e,s,r)=>{r.p},14796:(e,s,r)=>{r.d(s,{A:()=>a});const a=r.p+"assets/no-product.png"},30139:(e,s,r)=>{r.d(s,{A:()=>a});const a=r.p+"assets/order-item.png"}}]);