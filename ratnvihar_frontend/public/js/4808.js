/*! For license information please see 4808.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4808],{27839:(e,t,s)=>{s.d(t,{F9:()=>a,QR:()=>c,jE:()=>o,v7:()=>l,yz:()=>d});var r=s(80325),i=s(22912),n=s(45892);const o=e=>t=>{r.A.post("/sales-executive/place-order",e).then((e=>{t({type:i.VN,payload:e.data})})).catch((e=>{}))},a=e=>(e=(0,n.x0)(e,!0),t=>{r.A.get("".concat("http://localhost:8083","/api/sales-executive/orders").concat(e)).then((e=>{e.data.success&&t({type:i.YE,payload:e.data.data})})).catch((e=>{}))}),c=e=>t=>{r.A.post("".concat("http://localhost:8083","/api/sales-executive/cancel-order"),e).then((e=>{e.data.success&&t({type:i.jh,payload:e.data})})).catch((e=>{}))},l=e=>r.A.get("".concat("http://localhost:8083","/api/sales-executive/orders?order_id=").concat(e)),d=e=>r.A.post("".concat("http://localhost:8083","/api/sales-executive/orders/confirm-order"),e)},74808:(e,t,s)=>{s.r(t),s.d(t,{default:()=>y});var r=s(63696),i=s(81660),n=s(22187),o=s(54548),a=s(8590),c=s(50977),l=s(80249),d=s(69324),h=s(5908),u=s(27839),p=s(42839),f=s(67360),m=s(45892),x=s(27397),v=s(62540);function j(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}class g extends r.Component{constructor(e){super(e),j(this,"loadOrder",(async e=>{if((0,m.Im)(e))window.location.href="https://ratanvihar.com",console.log("okk");else{let t=await(0,u.v7)(e);if(t.data.success){let e=t.data.data.items;this.props.actions.CartList(),0==e.length?(x.oR.error("Order not found."),this.props.navigate("/sales-executive")):this.setState({order:e[0],loading:!1})}else x.oR.error("Order not found."),this.props.navigate("/sales-executive")}})),j(this,"handleOrderPage",(()=>{this.props.navigate("/sales-executive/orders")})),this.state={order:null,loading:!0}}componentDidMount(){let e=(new f.A).get("order_id");this.loadOrder(e)}render(){const{order:e}=this.state;return(0,v.jsx)(v.Fragment,{children:this.state.loading?(0,v.jsx)(d.A,{}):(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{className:"order-successful",children:(0,v.jsxs)(i.A,{children:[(0,v.jsx)("div",{className:"order-successful-image mt-5 mb-4 text-center",children:(0,v.jsx)("img",{src:o.A,alt:""})}),(0,v.jsxs)("div",{className:"order-successful-content",children:[(0,v.jsx)("h2",{className:"text-center",children:"Your Order has been succesfully placed."}),(0,v.jsx)("p",{className:"text-center",children:"Your order will be delivered by 4th of March 2021."})]}),(0,v.jsx)("hr",{}),(0,v.jsx)("div",{className:"order-successful-wrapper",children:(0,v.jsxs)("ul",{children:[(0,v.jsxs)("li",{children:[(0,v.jsx)("p",{children:"Order ID"}),(0,v.jsx)("p",{children:e.order_no})]}),(0,v.jsxs)("li",{children:[(0,v.jsx)("p",{children:"Order Date"}),(0,v.jsx)("p",{children:e.order_date})]}),(0,v.jsxs)("li",{children:[(0,v.jsx)("p",{children:"Payment"}),(0,v.jsx)("p",{children:e.payment_mode})]}),(0,v.jsxs)("li",{children:[(0,v.jsx)("p",{children:"Address"}),(0,v.jsx)("p",{children:e.delivery_address})]})]})}),(0,v.jsx)("hr",{}),(0,v.jsxs)("div",{className:"successful-wrapper-list",children:[(0,v.jsx)("ul",{children:(0,v.jsxs)("li",{children:[(0,v.jsx)("p",{children:"Sub Total"}),(0,v.jsx)("p",{children:e.sub_total})]})}),(0,v.jsx)("hr",{}),(0,v.jsxs)("div",{className:"successfull-total",children:[(0,v.jsx)("p",{children:"Total"}),(0,v.jsx)("p",{children:e.total_amount})]})]}),(0,v.jsx)("div",{className:"mobile-pay-noew",children:(0,v.jsx)(n.A,{variant:"secondary",onClick:this.handleOrderPage,children:"GO TO ORDER"})})]})}),(0,v.jsxs)("div",{className:"order-successful-mobile mt-4",children:[(0,v.jsxs)("div",{className:"mobile-checkout-header mb-4",children:[(0,v.jsx)(a.rBg,{})," ",(0,v.jsx)("h3",{children:"Order Success"})]}),(0,v.jsx)("div",{className:"order-successful-image mt-5 mb-4 text-center",children:(0,v.jsx)("img",{src:o.A,alt:""})}),(0,v.jsxs)("div",{className:"order-successful-content",children:[(0,v.jsx)("h2",{className:"text-center",children:"Your Order has been succesfully placed."}),(0,v.jsx)("p",{className:"text-center",children:"Your order will be delivered by 4th of March 2021."})]}),(0,v.jsx)("div",{className:"order-successful-btn",children:(0,v.jsx)(n.A,{variant:"primary",type:"submit",children:"VIEW MY ORDERS"})}),(0,v.jsx)("div",{className:"mobile-pay-now",children:(0,v.jsx)(n.A,{variant:"primary",children:"BACK TO HOME"})})]})]})})}}const y=(0,c.A)((0,l.Ng)((e=>({})),(e=>({actions:(0,h.zH)({CartList:p.Rh},e)})))(g))},54548:(e,t,s)=>{s.d(t,{A:()=>r});const r=s.p+"assets/checked.png"},67360:(e,t,s)=>{s.d(t,{A:()=>o});var r=s(84473);function i(e,t){void 0===t&&(t={});var s=function(e){return e&&"j"===e[0]&&":"===e[1]?e.substr(2):e}(e);if(function(e,t){return void 0===t&&(t=!e||"{"!==e[0]&&"["!==e[0]&&'"'!==e[0]),!t}(s,t.doNotParse))try{return JSON.parse(s)}catch(e){}return e}var n=function(){return n=Object.assign||function(e){for(var t,s=1,r=arguments.length;s<r;s++)for(var i in t=arguments[s])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},n.apply(this,arguments)};const o=function(){function e(e,t){var s=this;this.changeListeners=[],this.HAS_DOCUMENT_COOKIE=!1,this.cookies=function(e,t){return"string"==typeof e?r.q(e,t):"object"==typeof e&&null!==e?e:{}}(e,t),new Promise((function(){s.HAS_DOCUMENT_COOKIE="object"==typeof document&&"string"==typeof document.cookie})).catch((function(){}))}return e.prototype._updateBrowserValues=function(e){this.HAS_DOCUMENT_COOKIE&&(this.cookies=r.q(document.cookie,e))},e.prototype._emitChange=function(e){for(var t=0;t<this.changeListeners.length;++t)this.changeListeners[t](e)},e.prototype.get=function(e,t,s){return void 0===t&&(t={}),this._updateBrowserValues(s),i(this.cookies[e],t)},e.prototype.getAll=function(e,t){void 0===e&&(e={}),this._updateBrowserValues(t);var s={};for(var r in this.cookies)s[r]=i(this.cookies[r],e);return s},e.prototype.set=function(e,t,s){var i;"object"==typeof t&&(t=JSON.stringify(t)),this.cookies=n(n({},this.cookies),((i={})[e]=t,i)),this.HAS_DOCUMENT_COOKIE&&(document.cookie=r.l(e,t,s)),this._emitChange({name:e,value:t,options:s})},e.prototype.remove=function(e,t){var s=t=n(n({},t),{expires:new Date(1970,1,1,0,0,1),maxAge:0});this.cookies=n({},this.cookies),delete this.cookies[e],this.HAS_DOCUMENT_COOKIE&&(document.cookie=r.l(e,"",s)),this._emitChange({name:e,value:void 0,options:t})},e.prototype.addChangeListener=function(e){this.changeListeners.push(e)},e.prototype.removeChangeListener=function(e){var t=this.changeListeners.indexOf(e);t>=0&&this.changeListeners.splice(t,1)},e}()},84473:(e,t)=>{t.q=function(e,t){if("string"!=typeof e)throw new TypeError("argument str must be a string");for(var r={},i=t||{},o=e.split(";"),a=i.decode||s,c=0;c<o.length;c++){var l=o[c],d=l.indexOf("=");if(!(d<0)){var h=l.substring(0,d).trim();if(null==r[h]){var u=l.substring(d+1,l.length).trim();'"'===u[0]&&(u=u.slice(1,-1)),r[h]=n(u,a)}}}return r},t.l=function(e,t,s){var n=s||{},o=n.encode||r;if("function"!=typeof o)throw new TypeError("option encode is invalid");if(!i.test(e))throw new TypeError("argument name is invalid");var a=o(t);if(a&&!i.test(a))throw new TypeError("argument val is invalid");var c=e+"="+a;if(null!=n.maxAge){var l=n.maxAge-0;if(isNaN(l)||!isFinite(l))throw new TypeError("option maxAge is invalid");c+="; Max-Age="+Math.floor(l)}if(n.domain){if(!i.test(n.domain))throw new TypeError("option domain is invalid");c+="; Domain="+n.domain}if(n.path){if(!i.test(n.path))throw new TypeError("option path is invalid");c+="; Path="+n.path}if(n.expires){if("function"!=typeof n.expires.toUTCString)throw new TypeError("option expires is invalid");c+="; Expires="+n.expires.toUTCString()}if(n.httpOnly&&(c+="; HttpOnly"),n.secure&&(c+="; Secure"),n.sameSite)switch("string"==typeof n.sameSite?n.sameSite.toLowerCase():n.sameSite){case!0:c+="; SameSite=Strict";break;case"lax":c+="; SameSite=Lax";break;case"strict":c+="; SameSite=Strict";break;case"none":c+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}return c};var s=decodeURIComponent,r=encodeURIComponent,i=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function n(e,t){try{return t(e)}catch(t){return e}}}}]);