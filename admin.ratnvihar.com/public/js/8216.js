"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8216],{12178:(e,s,t)=>{t.d(s,{Jo:()=>l,Mj:()=>c,P:()=>o,cY:()=>d,lK:()=>r});var a=t(80325),n=t(69288),i=t(45892);const r=e=>(e=(0,i.x0)(e,!0),s=>{a.A.get("/superadmin/investors".concat(e)).then((e=>{e.data.success&&s({type:n.VQ,payload:e.data.data})})).catch((e=>{}))}),l=e=>s=>{a.A.post("/superadmin/investors/store",e).then((e=>{s({type:n.ov,payload:e.data})})).catch((e=>{}))},o=e=>s=>{a.A.get("/superadmin/investors/fetch/".concat(e)).then((e=>{e.data.success&&s({type:n.PX,payload:e.data.data})})).catch((e=>{}))},c=(e,s)=>t=>{a.A.post("/superadmin/investors/update/".concat(e),s).then((e=>{t({type:n._f,payload:e.data})})).catch((e=>{}))},d=(e,s)=>t=>{a.A.delete("/superadmin/investors/delete/".concat(e),s).then((e=>{t({type:n.AR,payload:e.data})})).catch((e=>{}))}},38216:(e,s,t)=>{t.r(s),t.d(s,{default:()=>V});var a=t(63696),n=t(52821),i=t(49746),r=t(45271),l=t(88441),o=t(61176),c=t(66098),d=t(50977),h=t(45892),p=t(16520),u=(t(86552),t(88019),t(76712),t(27874)),m=t(73842),y=t(89429),x=t(52805),A=t(79859),j=t(43191),g=t(55482),b=t(41795),v=t(66107),S=t(26365),C=t(78976),D=t(59875),f=t(36122),M=t(13007),_=t(65469),P=t(61095),I=t(72839),w=t(12178),N=t(62540);function F(e,s,t){return s in e?Object.defineProperty(e,s,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[s]=t,e}class T extends a.Component{constructor(e){super(e),F(this,"renderInvestorField",(e=>{let{input:s,label:t,meta:{touched:a,error:n},...i}=e;return(0,N.jsxs)(b.A,{fullWidth:!0,error:!(!a||!n),children:[t?(0,N.jsx)(v.A,{children:t}):null,(0,N.jsxs)(S.A,{label:t,fullWidth:!0,...s,...i,children:[(0,N.jsx)(C.A,{value:""}),this.state.investors.map(((e,s)=>(0,N.jsx)(C.A,{value:e.id,children:e.name},s)))]}),a&&n?(0,N.jsx)(D.A,{children:n}):null]})})),F(this,"renderAmountField",(e=>{let{input:s,label:t,meta:{touched:a,error:n},...i}=e;return(0,N.jsx)(f.A,{label:t,fullWidth:!0,error:!(!a||!n),helperText:a&&n?n:"",InputProps:{startAdornment:(0,N.jsx)(M.A,{position:"start",children:"₹"})},...s,...i})})),F(this,"renderInterestField",(e=>{let{input:s,label:t,meta:{touched:a,error:n},...i}=e;return(0,N.jsx)(f.A,{label:t,fullWidth:!0,error:!(!a||!n),helperText:a&&n?n:"",InputProps:{endAdornment:(0,N.jsx)(M.A,{position:"start",children:"%"})},...s,...i})})),F(this,"renderDurationField",(e=>{let{input:s,label:t,meta:{touched:a,error:n},...i}=e;return(0,N.jsx)(f.A,{label:t,fullWidth:!0,error:!(!a||!n),helperText:a&&n?n:"",InputProps:{endAdornment:(0,N.jsx)(M.A,{position:"start",children:"months"})},...s,...i})})),F(this,"renderInterestTypeField",(e=>{let{input:s,label:t,meta:{touched:a,error:n},...i}=e;return(0,N.jsxs)(b.A,{fullWidth:!0,error:!(!a||!n),children:[t?(0,N.jsx)(v.A,{children:t}):null,(0,N.jsxs)(S.A,{label:t,fullWidth:!0,...s,...i,children:[(0,N.jsx)(C.A,{value:"monthly",children:"Monthly"}),(0,N.jsx)(C.A,{value:"yearly",children:"Yearly"})]}),a&&n?(0,N.jsx)(D.A,{children:n}):null]})})),F(this,"renderPaymentModeField",(e=>{let{input:s,label:t,meta:{touched:a,error:n},...i}=e;return(0,N.jsxs)(b.A,{fullWidth:!0,error:!(!a||!n),children:[t?(0,N.jsx)(v.A,{children:t}):null,(0,N.jsxs)(S.A,{label:t,fullWidth:!0,...s,...i,children:[(0,N.jsx)(C.A,{value:""}),(0,N.jsx)(C.A,{value:"cash",children:"Cash"}),(0,N.jsx)(C.A,{value:"cheque",children:"Cheque"}),(0,N.jsx)(C.A,{value:"imps_neft",children:"NEFT/IMPS/UPI"}),(0,N.jsx)(C.A,{value:"online",children:"Online"})]}),a&&n?(0,N.jsx)(D.A,{children:n}):null]})})),F(this,"renderTextArea",(e=>{let{input:s,label:t,meta:{touched:a,error:n},...i}=e;return(0,N.jsx)(_.A,{minRows:2,label:t,error:a&&n?n:"",style:{width:"100%"},...s,...i})})),this.state={investors:this.props.investors}}componentDidMount(){this.props.actions.investorList({all:1}),this.props.initialize({interest_display_type:"yearly"})}static getDerivedStateFromProps(e,s){let t={};return e.investors!==s.investors&&(t.investors=e.investors),t}render(){const{handleSubmit:e,pristine:s,submitting:t}=this.props;return(0,N.jsx)("form",{onSubmit:e,children:(0,N.jsxs)(P.A,{sx:{flexGrow:1},children:[(0,N.jsxs)(r.Ay,{container:!0,spacing:2,className:"tax-input",children:[(0,N.jsx)(r.Ay,{item:!0,xs:6,className:"create-input",children:(0,N.jsx)(g.D0,{name:"user_id",component:this.renderInvestorField,label:"Investor",type:"select"})}),(0,N.jsx)(r.Ay,{item:!0,xs:6,className:"create-input",children:(0,N.jsx)(g.D0,{name:"amount",component:this.renderAmountField,label:"Loan Amount"})}),(0,N.jsx)(r.Ay,{item:!0,xs:3,className:"create-input",children:(0,N.jsx)(g.D0,{name:"interest",component:this.renderInterestField,label:"Interest"})}),(0,N.jsx)(r.Ay,{item:!0,xs:3,className:"create-input",children:(0,N.jsx)(g.D0,{name:"interest_display_type",component:this.renderInterestTypeField,label:"Interest Type",type:"select"})}),(0,N.jsx)(r.Ay,{item:!0,xs:3,className:"create-input",children:(0,N.jsx)(g.D0,{name:"duration",component:this.renderDurationField,label:"Duration"})}),(0,N.jsx)(r.Ay,{item:!0,xs:3,className:"create-input",children:(0,N.jsx)(g.D0,{name:"payment_mode",component:this.renderPaymentModeField,label:"Payment Mode",type:"select"})}),(0,N.jsx)(r.Ay,{item:!0,xs:12,className:"create-input",children:(0,N.jsx)(g.D0,{className:"description",name:"notes",component:this.renderTextArea,placeholder:"Notes"})})]}),(0,N.jsx)(r.Ay,{item:!0,xs:12,children:(0,N.jsxs)(I.A,{spacing:{mt:2},direction:"row",className:"ratn-footer-buttons gap-1",justifyContent:"flex-end",children:[(0,N.jsx)(i.A,{variant:"contained",type:"submit",className:"conf-button",disabled:t,children:"Submit"}),(0,N.jsx)(i.A,{variant:"outlined",className:"close-button",onClick:()=>this.props.handleCancel(),children:"Cancel"})]})})]})})}}const L=(0,d.A)((0,n.connect)((e=>({investors:e.superadmin.investor.items})),(e=>({dispatch:e,actions:(0,l.bindActionCreators)({investorList:w.lK},e)})))((0,g.zW)({form:"LoanForm",validate:e=>{const s={};return["user_id","amount","interest","duration","interest_display_type","payment_mode"].forEach((t=>{e[t]||(s[t]="This field is required.")})),s}})(T)));var k=t(51449);function q(e,s,t){return s in e?Object.defineProperty(e,s,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[s]=t,e}class W extends a.Component{constructor(e){super(e),q(this,"handleView",(e=>{this.props.navigate("view/"+e.id)})),q(this,"handleDelete",(e=>{this.props.actions.loanDelete(e.id)})),q(this,"loadListData",(()=>{this.props.actions.loanList(this.state.queryParams)})),q(this,"handlePagination",(e=>{this.state.queryParams.page=e,this.loadListData()})),q(this,"handleCancel",(()=>{this.handleDialogClose()})),q(this,"handleCreate",(()=>{this.setState({openDialog:!0,dialogTitle:"Create Loan"})})),q(this,"handleDialogClose",((e,s)=>{s&&"backdropClick"==s||this.setState({openDialog:!1})})),q(this,"submitLoan",(e=>{this.props.actions.loanStore(e)})),this.state={...this.props,queryParams:{page:1,limit:50},openDialog:!1,actionCalled:this.props.actionCalled,createSuccess:this.props.createSuccess,deleteSuccess:this.props.deleteSuccess,paymentSuccess:this.props.paymentSuccess,successMessage:this.props.successMessage,errorMessage:this.props.errorMessage},this.columns=[{name:"investor_name",display_name:"Investor Name"},{name:"loan_amount",display_name:"Principal Amt"},{name:"interest_display",display_name:"INT Rate"},{name:"interest_display_type",display_name:"INT Type"},{name:"interest_amount",display_name:"Interest Amt"},{name:"total_with_interest",display_name:"Tot With Interest"},{name:"monthly_emi",display_name:"EMI Amount"}]}componentDidMount(){this.loadListData()}static getDerivedStateFromProps(e,s){let t={};return e.items!==s.items&&(t.items=e.items),e.total!==s.total&&(t.total=e.total),e.actionCalled!==s.actionCalled&&(t.actionCalled=e.actionCalled),e.createSuccess!==s.createSuccess&&(t.createSuccess=e.createSuccess),e.deleteSuccess!==s.deleteSuccess&&(t.deleteSuccess=e.deleteSuccess),e.paymentSuccess!==s.paymentSuccess&&(t.paymentSuccess=e.paymentSuccess),e.successMessage!==s.successMessage&&(t.successMessage=e.successMessage),e.errorMessage!==s.errorMessage&&(t.errorMessage=e.errorMessage),e.permissions!==s.permissions&&(t.permissions=e.permissions),t}componentDidUpdate(){this.state.actionCalled&&(this.state.createSuccess?(this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),this.setState({queryParams:{...this.state.queryParams,page:1},openDialog:!1},(()=>{this.loadListData()}))):this.state.deleteSuccess&&(this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),this.props.dispatch({type:m.h7}),this.handlePagination(1)),(0,h.Im)(this.state.errorMessage)||this.props.enqueueSnackbar(this.state.errorMessage,{variant:"error"}),this.props.dispatch({type:m.h7}))}render(){return(0,N.jsxs)(c.A,{title:"Loans",secondary:(0,h._m)(this.state.permissions,"loans","add")?(0,N.jsx)(i.A,{variant:"contained",onClick:this.handleCreate,children:"Add"}):null,children:[(0,N.jsx)(r.Ay,{container:!0,spacing:o.iL,children:(0,N.jsx)(u.A,{columns:this.columns,rows:this.state.items,page:this.state.queryParams.page,limit:this.state.queryParams.limit,total:this.state.total,handlePagination:this.handlePagination,actions:[{label:"View",onClick:this.handleView,color:"primary",show:(0,h._m)(this.state.permissions,"loans","view")},{label:"Delete",onClick:this.handleDelete,color:"error",isDelete:!0,show:(0,h._m)(this.state.permissions,"loans","delete")}]})}),(0,N.jsxs)(y.A,{className:"ratn-dialog-wrapper",open:this.state.openDialog,onClose:this.handleDialogClose,fullWidth:!0,maxWidth:"md",children:[(0,N.jsx)(j.A,{children:this.state.dialogTitle}),(0,N.jsxs)(x.A,{children:[(0,N.jsx)(A.A,{}),(0,N.jsx)(L,{onSubmit:this.submitLoan,handleCancel:this.handleCancel})]})]})]})}}const V=(0,k.Gh)((0,d.A)((0,n.connect)((e=>({items:e.superadmin.loan.items,total:e.superadmin.loan.total,actionCalled:e.superadmin.loan.actionCalled,createSuccess:e.superadmin.loan.createSuccess,deleteSuccess:e.superadmin.loan.deleteSuccess,paymentSuccess:e.superadmin.loan.paymentSuccess,successMessage:e.superadmin.loan.successMessage,successMessage:e.superadmin.loan.successMessage,errorMessage:e.superadmin.loan.errorMessage,permissions:e.employee.permissions.permissions})),(e=>({dispatch:e,actions:(0,l.bindActionCreators)({loanList:p.j,loanPayment:p.RZ,loanStore:p.cV,loanDelete:p.E$},e)})))(W)))}}]);