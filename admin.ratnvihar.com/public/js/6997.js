"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6997],{66997:(t,e,s)=>{s.r(e),s.d(e,{default:()=>l});var i=s(63696),n=s(52821),r=s(45271),c=s(36213),a=s(27875),o=s(88441),u=s(66098),m=s(50977),p=s(55028),d=s(62540);class h extends i.Component{constructor(t){super(t),this.state={item:this.props.item}}componentDidMount(){this.props.actions.salesExecutiveFetch(this.props.params.id)}static getDerivedStateFromProps(t,e){let s={};return t.item!==e.item&&(s.item=t.item),s}render(){return(0,d.jsx)(u.A,{title:"Sales Executive Edit",children:(0,d.jsx)("div",{children:this.state.item?(0,d.jsx)(a.A,{formData:this.state.item}):(0,d.jsx)(r.Ay,{container:!0,justifyContent:"center",children:(0,d.jsx)(c.A,{})})})})}}const l=(0,m.A)((0,n.connect)((t=>({item:t.superadmin.salesExecutive.item||null})),(t=>({dispatch:t,actions:(0,o.bindActionCreators)({salesExecutiveFetch:p.FQ},t)})))(h))}}]);