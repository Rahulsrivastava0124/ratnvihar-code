"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8751],{88751:(e,s,i)=>{i.r(s),i.d(s,{default:()=>h});var t=i(63696),a=i(52821),n=i(50977),o=i(45892),r=i(62540);class d extends t.Component{constructor(e){super(e),this.state={isLoggedIn:this.props.isLoggedIn,roleName:this.props.roleName,auth:this.props.auth}}componentDidMount(){this.state.isLoggedIn?setTimeout((()=>{this.props.navigate((0,o.zr)(this.state.roleName))}),100):setTimeout((()=>{let e=window.location.hostname;e.includes("super.")?this.props.navigate("/super-admin/login"):e.includes("admin.")?this.props.navigate("/admin/login"):this.props.navigate("/login")}),100)}static getDerivedStateFromProps(e,s){let i={};return e.auth!==s.auth&&(i.auth=e.auth),e.roleName!==s.roleName&&(i.roleName=e.roleName),e.isLoggedIn!==s.isLoggedIn&&(i.isLoggedIn=e.isLoggedIn),i}render(){return(0,r.jsx)(t.Fragment,{children:(0,r.jsxs)("div",{className:"ratn-admin-home",children:[(0,r.jsxs)("div",{className:"square-box",children:[(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{}),(0,r.jsx)("div",{})]}),(0,r.jsx)("h1",{children:" Ratan Vihar"})]})})}}const h=(0,n.A)((0,a.connect)((e=>({auth:e.auth,isLoggedIn:"isLoggedIn"in e.auth&&e.auth.isLoggedIn,roleName:"user"in e.auth&&e.auth.user&&"role_name"in e.auth.user?e.auth.user.role_name:""})),{})(d))}}]);