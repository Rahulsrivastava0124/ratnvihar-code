"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8119],{98119:(e,s,t)=>{t.r(s),t.d(s,{default:()=>M});var a=t(63696),r=t(52821),i=t(45271),c=t(36213),o=t(68259),n=t(88441),l=t(66098),u=t(50977),p=t(97268),d=t(51449),h=t(60438),m=t(45892),g=t(62540);class P extends a.Component{constructor(e){super(e),this.state={actionCalled:this.props.actionCalled,editSuccess:this.props.editSuccess,successMessage:this.props.successMessage,errorMessage:this.props.errorMessage,materialPrice:this.props.materialPrice,id:this.props.params.id,auth:this.props.auth}}componentDidMount(){this.props.actions.materialPriceView(this.state.id)}static getDerivedStateFromProps(e,s){let t={};return e.actionCalled!==s.actionCalled&&(t.actionCalled=e.actionCalled),e.editSuccess!==s.editSuccess&&(t.editSuccess=e.editSuccess),e.successMessage!==s.successMessage&&(t.successMessage=e.successMessage),e.errorMessage!==s.errorMessage&&(t.errorMessage=e.errorMessage),e.materialPrice!==s.materialPrice&&(t.materialPrice=e.materialPrice),e.auth!==s.auth&&(t.auth=e.auth),t}componentDidUpdate(){this.state.actionCalled&&(this.state.editSuccess?(this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),this.props.dispatch({type:h.KV}),this.props.navigate((0,m.zr)((0,m.mA)(this.state.auth))+"/material-prices")):this.props.enqueueSnackbar(this.state.errorMessage,{variant:"error"}))}render(){return console.log("this.state.materialPrice",this.state.materialPrice),(0,g.jsx)(l.A,{title:"Price Edit",children:(0,g.jsx)("div",{children:this.state.materialPrice?(0,g.jsx)(o.A,{formData:this.state.materialPrice}):(0,g.jsx)(i.Ay,{container:!0,justifyContent:"center",children:(0,g.jsx)(c.A,{})})})})}}const M=(0,d.Gh)((0,u.A)((0,r.connect)((e=>({actionCalled:e.superadmin.materialPrice.actionCalled,editSuccess:e.superadmin.materialPrice.editSuccess,successMessage:e.superadmin.materialPrice.successMessage,errorMessage:e.superadmin.materialPrice.errorMessage,materialPrice:e.superadmin.materialPrice.materialPrice,auth:e.auth})),(e=>({dispatch:e,actions:(0,n.bindActionCreators)({materialPriceView:p.qi},e)})))(P)))}}]);