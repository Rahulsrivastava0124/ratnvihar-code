"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5949],{98549:(s,e,t)=>{var r=t(96784);e.A=void 0;var a=r(t(17044)),i=t(62540),n=(0,a.default)((0,i.jsx)("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}),"Visibility");e.A=n},11740:(s,e,t)=>{var r=t(96784);e.A=void 0;var a=r(t(17044)),i=t(62540),n=(0,a.default)((0,i.jsx)("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"}),"VisibilityOff");e.A=n},95949:(s,e,t)=>{t.r(e),t.d(e,{default:()=>P});var r=t(63696),a=t(52821),i=t(53975),n=t(92671),o=t(61095),h=t(52545),d=t(66593),l=t(63472),p=t(36122),c=t(13007),m=t(49746),w=t(45271),u=t(76641),g=t(54176),_=t(49821),x=t(88441),f=t(50977),j=t(45892),v=t(51449),S=t(98549),A=t(11740),b=t(62540);function y(s,e,t){return e in s?Object.defineProperty(s,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):s[e]=t,s}class C extends r.Component{constructor(s){super(s),y(this,"handleChange",(s=>{const{name:e,value:t}=s.target;this.setState({[e]:t})})),y(this,"handleSubmit",(async s=>{if(s.preventDefault(),this.formValidate())if(this.setState({resErr:"",processing:!0}),this.state.sendOtp)if(this.state.verifyOtp){let s=await(0,_.BD)({new_password:this.state.new_password,confirm_new_password:this.state.confirm_new_password,user_name:this.state.user_name,otp:this.state.otp});s.data.success?(this.props.enqueueSnackbar(s.data.message,{variant:"success"}),this.setState({processing:!1},(()=>{this.props.navigate("/admin/login")}))):this.setState({processing:!1,resErr:s.data.message})}else{let s=await(0,_.f0)({otp:this.state.otp,user_name:this.state.user_name});s.data.success?this.setState({processing:!1,verifyOtp:!0}):this.setState({processing:!1,resErr:s.data.message})}else{let s=await(0,_._x)({user_name:this.state.user_name});s.data.success?(this.props.enqueueSnackbar(s.data.message,{variant:"success"}),this.setState({processing:!1,sendOtp:!0})):this.setState({processing:!1,resErr:s.data.message})}})),y(this,"formValidate",(()=>{let s=!1;return this.state.sendOtp?this.state.verifyOtp?(this.state.new_password?this.setState({new_password_err:""}):(this.setState({new_password_err:"Required."}),s=!0),this.state.confirm_new_password?this.setState({confirm_new_password_err:""}):(this.setState({confirm_new_password_err:"Required."}),s=!0)):this.state.otp?this.setState({otp_err:""}):(this.setState({otp_err:"Required."}),s=!0):this.state.user_name?this.setState({user_name_err:""}):(this.setState({user_name_err:"Required."}),s=!0),!s})),this.state={forgotPassError:this.props.forgotPassError,isLoggedIn:this.props.isLoggedIn,sendOtp:!1,verifyOtp:!1,resErr:"",user_name:"",new_password:"",confirm_new_password:"",otp:"",user_name_err:"",new_password_err:"",confirm_new_password_err:"",otp_err:"",processing:!1,passwordShow1:!1,passwordShow2:!1}}componentDidMount(){this.state.isLoggedIn&&setTimeout((()=>{this.props.navigate((0,j.zr)((0,j.mA)(this.state.auth)))}))}static getDerivedStateFromProps(s,e){let t={};return s.auth!==e.auth&&(t.auth=s.auth),s.isLoggedIn!==e.isLoggedIn&&(t.isLoggedIn=s.isLoggedIn),s.forgotPassError!==e.forgotPassError&&(t.forgotPassError=s.forgotPassError),t}render(){const{forgotPassError:s,resErr:e}=this.state;return(0,b.jsxs)("div",{className:"super-admin-login",children:[(0,b.jsxs)("div",{className:"square-box",children:[(0,b.jsx)("div",{}),(0,b.jsx)("div",{}),(0,b.jsx)("div",{}),(0,b.jsx)("div",{}),(0,b.jsx)("div",{}),(0,b.jsx)("div",{}),(0,b.jsx)("div",{}),(0,b.jsx)("div",{}),(0,b.jsx)("div",{}),(0,b.jsx)("div",{}),(0,b.jsx)("div",{}),(0,b.jsx)("div",{}),(0,b.jsx)("div",{}),(0,b.jsx)("div",{}),(0,b.jsx)("div",{})]}),(0,b.jsxs)(i.A,{component:"main",maxWidth:"md",children:[(0,b.jsx)(n.Ay,{}),(0,b.jsxs)("div",{className:"login-wrapper",children:[(0,b.jsxs)(o.A,{sx:{marginTop:8,display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,b.jsx)(h.A,{sx:{m:1,bgcolor:"secondary.main"},className:"login-icon",children:(0,b.jsx)(g.A,{})}),(0,b.jsx)(d.A,{component:"h1",variant:"h5",children:"Forgot Password"}),s?(0,b.jsx)(o.A,{sx:{width:1},children:(0,b.jsx)(l.A,{severity:"error",children:s})}):null,e?(0,b.jsx)(o.A,{sx:{width:1},children:(0,b.jsx)(l.A,{severity:"error",children:e})}):null,(0,b.jsx)("form",{onSubmit:this.handleSubmit,children:(0,b.jsxs)(o.A,{sx:{mt:1},className:"myinput",children:[this.state.sendOtp?(0,b.jsx)(b.Fragment,{children:this.state.verifyOtp?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(p.A,{label:"New Password",margin:"normal",name:"new_password",type:this.state.passwordShow1?"text":"password",value:this.state.new_password,fullWidth:!0,error:!!this.state.new_password_err,helperText:this.state.new_password_err?this.state.new_password_err:"",onChange:this.handleChange,InputProps:{endAdornment:(0,b.jsx)(c.A,{position:"end",children:this.state.passwordShow1?(0,b.jsx)(S.A,{onClick:()=>this.setState({passwordShow1:!1})}):(0,b.jsx)(A.A,{onClick:()=>this.setState({passwordShow1:!0})})})}}),(0,b.jsx)(p.A,{label:"Confirm New Password",margin:"normal",name:"confirm_new_password",type:this.state.passwordShow2?"text":"password",value:this.state.confirm_new_password,fullWidth:!0,error:!!this.state.confirm_new_password_err,helperText:this.state.confirm_new_password_err?this.state.confirm_new_password_err:"",onChange:this.handleChange,InputProps:{endAdornment:(0,b.jsx)(c.A,{position:"end",children:this.state.passwordShow2?(0,b.jsx)(S.A,{onClick:()=>this.setState({passwordShow2:!1})}):(0,b.jsx)(A.A,{onClick:()=>this.setState({passwordShow2:!0})})})}})]}):(0,b.jsx)(p.A,{label:"OTP",margin:"normal",name:"otp",type:"password",value:this.state.otp,fullWidth:!0,error:!!this.state.otp_err,helperText:this.state.otp_err?this.state.otp_err:"",onChange:this.handleChange})}):(0,b.jsx)(p.A,{label:"User Name / Email / Mobile",margin:"normal",name:"user_name",value:this.state.user_name,fullWidth:!0,error:!!this.state.user_name_err,helperText:this.state.user_name_err?this.state.user_name_err:"",onChange:this.handleChange}),(0,b.jsx)(m.A,{className:"signin-btn",type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},disabled:this.state.processing,children:this.state.processing?"Processing...":"Submit"}),(0,b.jsx)(w.Ay,{container:!0,children:(0,b.jsx)(w.Ay,{item:!0,xs:!0,children:(0,b.jsx)(u.A,{href:"/admin/login",variant:"body2",className:"forget-text",children:"Already have an account?"})})})]})})]}),(0,b.jsxs)(d.A,{variant:"body2",color:"text.secondary",align:"center",sx:{mt:6,mb:0},className:"copyright",children:["Copyright ©  RatnVihar ",(new Date).getFullYear(),(0,b.jsx)(u.A,{color:"inherit",href:"https://webappssol.com/",target:"_blank",children:"  | Developed by: webappsSOL"})]})]})]})]})}}const P=(0,v.Gh)((0,f.A)((0,a.connect)((s=>({auth:s.auth,isLoggedIn:"isLoggedIn"in s.auth&&s.auth.isLoggedIn,forgotPassError:"forgotPassError"in s.auth?s.auth.forgotPassError:""})),(s=>({actions:(0,x.bindActionCreators)({},s)})))(C)))}}]);