"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5207],{15207:(e,s,a)=>{a.r(s),a.d(s,{default:()=>d});var t=a(63696),r=a(52821),c=a(68259),i=a(66098),u=a(50977),o=a(51449),n=a(60438),p=a(45892),h=a(62540);class l extends t.Component{constructor(e){super(e),this.state={actionCalled:this.props.actionCalled,createSuccess:this.props.createSuccess,successMessage:this.props.successMessage,errorMessage:this.props.errorMessage,auth:this.props.auth}}static getDerivedStateFromProps(e,s){let a={};return e.actionCalled!==s.actionCalled&&(a.actionCalled=e.actionCalled),e.createSuccess!==s.createSuccess&&(a.createSuccess=e.createSuccess),e.successMessage!==s.successMessage&&(a.successMessage=e.successMessage),e.errorMessage!==s.errorMessage&&(a.errorMessage=e.errorMessage),e.auth!==s.auth&&(a.auth=e.auth),a}componentDidUpdate(){this.state.actionCalled&&(this.state.createSuccess?(this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),this.props.dispatch({type:n.KV}),this.props.navigate((0,p.zr)((0,p.mA)(this.state.auth))+"/material-prices")):this.props.enqueueSnackbar(this.state.errorMessage,{variant:"error"}))}render(){return(0,h.jsx)(i.A,{title:"Price Create",children:(0,h.jsx)("div",{children:(0,h.jsx)(c.A,{})})})}}const d=(0,o.Gh)((0,u.A)((0,r.connect)((e=>({actionCalled:e.superadmin.materialPrice.actionCalled,createSuccess:e.superadmin.materialPrice.createSuccess,successMessage:e.superadmin.materialPrice.successMessage,errorMessage:e.superadmin.materialPrice.errorMessage,auth:e.auth})),(e=>({dispatch:e})))(l)))}}]);