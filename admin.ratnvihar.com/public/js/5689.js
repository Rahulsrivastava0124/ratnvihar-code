"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5689],{11505:(e,t,s)=>{s.d(t,{A:()=>S});var a=s(49257),i=s(68102),r=s(63696),n=s(68017),c=s(81023),o=s(39195),l=s(2512),d=s(90013),h=s(87034),u=s(28362),p=s(46733);function m(e){return(0,p.A)("MuiIconButton",e)}const y=(0,s(29009).A)("MuiIconButton",["root","disabled","colorInherit","colorPrimary","colorSecondary","edgeStart","edgeEnd","sizeSmall","sizeMedium","sizeLarge"]);var g=s(62540);const A=["edge","children","className","color","disabled","disableFocusRipple","size"],x=(0,l.Ay)(h.A,{name:"MuiIconButton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[t.root,"default"!==s.color&&t[`color${(0,u.A)(s.color)}`],s.edge&&t[`edge${(0,u.A)(s.edge)}`],t[`size${(0,u.A)(s.size)}`]]}})((({theme:e,ownerState:t})=>(0,i.A)({textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:8,borderRadius:"50%",overflow:"visible",color:(e.vars||e).palette.action.active,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest})},!t.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,o.X4)(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"start"===t.edge&&{marginLeft:"small"===t.size?-3:-12},"end"===t.edge&&{marginRight:"small"===t.size?-3:-12})),(({theme:e,ownerState:t})=>(0,i.A)({},"inherit"===t.color&&{color:"inherit"},"inherit"!==t.color&&"default"!==t.color&&(0,i.A)({color:(e.vars||e).palette[t.color].main},!t.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,o.X4)(e.palette[t.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}}),"small"===t.size&&{padding:5,fontSize:e.typography.pxToRem(18)},"large"===t.size&&{padding:12,fontSize:e.typography.pxToRem(28)},{[`&.${y.disabled}`]:{backgroundColor:"transparent",color:(e.vars||e).palette.action.disabled}}))),S=r.forwardRef((function(e,t){const s=(0,d.A)({props:e,name:"MuiIconButton"}),{edge:r=!1,children:o,className:l,color:h="default",disabled:p=!1,disableFocusRipple:y=!1,size:S="medium"}=s,b=(0,a.A)(s,A),C=(0,i.A)({},s,{edge:r,color:h,disabled:p,disableFocusRipple:y,size:S}),v=(e=>{const{classes:t,disabled:s,color:a,edge:i,size:r}=e,n={root:["root",s&&"disabled","default"!==a&&`color${(0,u.A)(a)}`,i&&`edge${(0,u.A)(i)}`,`size${(0,u.A)(r)}`]};return(0,c.A)(n,m,t)})(C);return(0,g.jsx)(x,(0,i.A)({className:(0,n.A)(v.root,l),centerRipple:!0,focusRipple:!y,disabled:p,ref:t,ownerState:C},b,{children:o}))}))},86552:(e,t,s)=>{s.d(t,{EM:()=>l,HH:()=>n,LT:()=>c,kX:()=>o});var a=s(80325),i=s(86418),r=s(45892);const n=e=>(e=(0,r.x0)(e,!0),t=>{a.A.get("/superadmin/countries".concat(e)).then((e=>{e.data.success&&t({type:i.GO,payload:e.data.data})})).catch((e=>{}))}),c=e=>t=>{a.A.post("/superadmin/countries/store",e).then((e=>{e.data.success&&t({type:i.bT,payload:e.data})})).catch((e=>{}))},o=(e,t)=>s=>{a.A.post("/superadmin/countries/update/".concat(e),t).then((e=>{e.data.success&&s({type:i.v$,payload:e.data})})).catch((e=>{}))},l=(e,t)=>s=>{a.A.delete("/superadmin/countries/delete/".concat(e),t).then((e=>{e.data.success&&s({type:i.bI,payload:e.data})})).catch((e=>{}))}},76712:(e,t,s)=>{s.d(t,{Fl:()=>d,Sn:()=>o,VX:()=>c,iI:()=>l,r_:()=>n});var a=s(80325),i=s(61666),r=s(45892);const n=e=>(e=(0,r.x0)(e,!0),t=>{a.A.get("/superadmin/districts".concat(e)).then((e=>{e.data.success&&t({type:i.EF,payload:e.data.data})})).catch((e=>{}))}),c=e=>t=>{a.A.post("/superadmin/districts/store",e).then((e=>{e.data.success&&t({type:i.dH,payload:e.data})})).catch((e=>{}))},o=(e,t)=>s=>{a.A.post("/superadmin/districts/update/".concat(e),t).then((e=>{e.data.success&&s({type:i.Fh,payload:e.data})})).catch((e=>{}))},l=(e,t)=>s=>{a.A.delete("/superadmin/districts/delete/".concat(e),t).then((e=>{e.data.success&&s({type:i.DV,payload:e.data})})).catch((e=>{}))},d=async e=>(e=(0,r.x0)(e,!0),await a.A.get("/superadmin/districts".concat(e)))},88019:(e,t,s)=>{s.d(t,{IS:()=>d,Jx:()=>o,MO:()=>n,TP:()=>l,i9:()=>c});var a=s(80325),i=s(99333),r=s(45892);const n=e=>(e=(0,r.x0)(e,!0),t=>{a.A.get("/superadmin/states".concat(e)).then((e=>{e.data.success&&t({type:i.hj,payload:e.data.data})})).catch((e=>{}))}),c=e=>t=>{a.A.post("/superadmin/states/store",e).then((e=>{e.data.success&&t({type:i.Mi,payload:e.data})})).catch((e=>{}))},o=(e,t)=>s=>{a.A.post("/superadmin/states/update/".concat(e),t).then((e=>{e.data.success&&s({type:i.I_,payload:e.data})})).catch((e=>{}))},l=(e,t)=>s=>{a.A.delete("/superadmin/states/delete/".concat(e),t).then((e=>{e.data.success&&s({type:i.es,payload:e.data})})).catch((e=>{}))},d=async e=>(e=(0,r.x0)(e,!0),await a.A.get("/superadmin/states".concat(e)))},75689:(e,t,s)=>{s.r(t),s.d(t,{default:()=>$});var a=s(63696),i=s(52821),r=s(49746),n=s(61095),c=s(45271),o=s(41795),l=s(66107),d=s(26365),h=s(78976),u=s(36122),p=s(11505),m=s(88441),y=s(61176),g=s(66098),A=s(50977),x=s(76712),S=s(27874),b=s(89429),C=s(52805),v=s(79859),j=s(43191),f=s(55482),D=s(59875),M=s(72839),w=s(88019),P=s(62540);function _(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}class R extends a.Component{constructor(e){super(e),_(this,"getDefaultValues",(()=>({name:"",country_id:"",is_certificate:!1}))),_(this,"handleCountryChange",((e,t)=>{this.props.actions.stateList({all:1,country_id:t})})),_(this,"handleStateChange",((e,t)=>{})),_(this,"renderTextField",(e=>{let{input:t,label:s,meta:{touched:a,error:i},...r}=e;return(0,P.jsx)(u.A,{label:s,fullWidth:!0,error:!(!a||!i),helperText:a&&i?i:"",...t,...r})})),_(this,"renderStateField",(e=>{let{input:t,label:s,meta:{touched:a,error:i},...r}=e;return(0,P.jsxs)(o.A,{fullWidth:!0,error:!(!a||!i),children:[s?(0,P.jsx)(l.A,{children:s}):null,(0,P.jsxs)(d.A,{label:s,fullWidth:!0,...t,...r,children:[(0,P.jsx)(h.A,{value:"",children:"select state"}),this.state.states.map(((e,t)=>(0,P.jsx)(h.A,{value:e.id,children:e.name},t)))]}),a&&i?(0,P.jsx)(D.A,{children:i}):null]})})),_(this,"renderCountryField",(e=>{let{input:t,label:s,meta:{touched:a,error:i},...r}=e;return(0,P.jsxs)(o.A,{fullWidth:!0,error:!(!a||!i),children:[s?(0,P.jsx)(l.A,{children:s}):null,(0,P.jsxs)(d.A,{label:s,fullWidth:!0,...t,...r,children:[(0,P.jsx)(h.A,{value:"",children:"select country"}),this.state.countries.map(((e,t)=>(0,P.jsx)(h.A,{value:e.id,children:e.name},t)))]}),a&&i?(0,P.jsx)(D.A,{children:i}):null]})})),this.state={formData:"formData"in this.props?this.props.formData:null,states:this.props.states,countries:this.props.countries}}componentDidMount(){this.state.formData?(this.props.actions.stateList({all:1,country_id:this.state.formData.country_id}),this.props.initialize(this.state.formData)):this.props.initialize(this.getDefaultValues())}static getDerivedStateFromProps(e,t){let s={};return e.states!==t.states&&(s.states=e.states),e.countries!==t.countries&&(s.countries=e.countries),s}render(){const{handleSubmit:e,pristine:t,submitting:s}=this.props;return(0,P.jsx)("form",{onSubmit:e,children:(0,P.jsx)(n.A,{sx:{flexGrow:1,m:.5},children:(0,P.jsxs)(c.Ay,{container:!0,spacing:2,children:[(0,P.jsx)(c.Ay,{item:!0,xs:6,md:6,className:"create-input",children:(0,P.jsx)(f.D0,{name:"country_id",component:this.renderCountryField,label:"Country",type:"select",onChange:(e,t)=>this.handleCountryChange(e,t)})}),(0,P.jsx)(c.Ay,{item:!0,xs:6,md:6,className:"create-input",children:(0,P.jsx)(f.D0,{name:"state_id",component:this.renderStateField,label:"State",type:"select",onChange:(e,t)=>this.handleStateChange(e,t)})}),(0,P.jsx)(c.Ay,{item:!0,xs:6,md:6,className:"create-input",children:(0,P.jsx)(f.D0,{name:"name",component:this.renderTextField,label:"District"})}),(0,P.jsx)(c.Ay,{item:!0,xs:12,className:"p-submit-button",children:(0,P.jsxs)(M.A,{spacing:1,direction:"row",justifyContent:"flex-end",children:[(0,P.jsx)(r.A,{variant:"contained",type:"submit",children:"Submit"}),(0,P.jsx)(r.A,{variant:"outlined",onClick:()=>this.props.handleCancel(),children:"Cancel"})]})})]})})})}}const q=(0,A.A)((0,i.connect)((e=>({states:e.superadmin.countryState.items})),(e=>({dispatch:e,actions:(0,m.bindActionCreators)({stateList:w.MO},e)})))((0,f.zW)({form:"DistrictForm",validate:e=>{const t={};return["name","country_id","state_id"].forEach((s=>{e[s]||(t[s]="Required")})),t}})(R)));var k=s(86552),L=s(51449),z=s(45892),F=s(61666),N=s(11784);function I(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}class T extends a.Component{constructor(e){super(e),I(this,"loadStatesForFilter",(async()=>{let e=await(0,w.IS)({all:1,country_id:this.state.queryParams.country_id});e.data.success&&this.setState({stateList:e.data.data.items})})),I(this,"handlePagination",(e=>{this.setState({queryParams:{...this.state.queryParams,page:e}},(()=>{this.loadListData()}))})),I(this,"loadListData",(()=>{this.props.actions.districtList(this.state.queryParams)})),I(this,"handleEdit",(e=>{this.setState({editRow:e,openDialog:!0,dialogTitle:"Edit District"})})),I(this,"handleDelete",(e=>{this.props.actions.districtDelete(e.id)})),I(this,"handleCreate",(()=>{this.setState({openDialog:!0,dialogTitle:"Create District",editRow:null})})),I(this,"handleDialogClose",((e,t)=>{t&&"backdropClick"==t||this.setState({openDialog:!1,editRow:null})})),I(this,"submit",(e=>{this.state.editRow?this.props.actions.districtUpdate(this.state.editRow.id,e):this.props.actions.districtCreate(e)})),I(this,"handleCancel",(()=>{this.handleDialogClose()})),I(this,"handleSearchChange",((e,t)=>{this.setState({queryParams:{...this.state.queryParams,[t]:e}},(()=>{"country_id"==t&&this.loadStatesForFilter()}))})),I(this,"handleSearch",(()=>{this.setState({queryParams:{...this.state.queryParams,page:1}},(()=>{this.loadListData()}))})),this.state={...this.props,queryParams:{page:1,limit:50,country_id:"",state_id:"",search:""},openDialog:!1,isCreate:!0,editRow:null,states:this.props.states,countries:this.props.countries,createSuccess:!1,editSuccess:!1,deleteSuccess:!1,actionCalled:this.props.actionCalled,successMessage:this.props.successMessage,errorMessage:this.props.errorMessage,stateList:[]},this.columns=[{name:"name",display_name:"District"},{name:"country",display_name:"Country"},{name:"state",display_name:"State"}]}componentDidMount(){this.loadListData(),this.props.actions.countryList({all:1}),this.props.actions.stateList({all:1})}static getDerivedStateFromProps(e,t){let s={};return e.items!==t.items&&(s.items=e.items),e.total!==t.total&&(s.total=e.total),e.states!==t.states&&(s.states=e.states),e.countries!==t.countries&&(s.countries=e.countries),e.actionCalled!==t.actionCalled&&(s.actionCalled=e.actionCalled),e.successMessage!==t.successMessage&&(s.successMessage=e.successMessage),e.errorMessage!==t.errorMessage&&(s.errorMessage=e.errorMessage),"createSuccess"in e&&e.createSuccess!==t.createSuccess&&(s.createSuccess=e.createSuccess),"editSuccess"in e&&e.editSuccess!==t.editSuccess&&(s.editSuccess=e.editSuccess),"deleteSuccess"in e&&e.deleteSuccess!==t.deleteSuccess&&(s.deleteSuccess=e.deleteSuccess),e.permissions!==t.permissions&&(s.permissions=e.permissions),s}componentDidUpdate(){this.state.actionCalled&&(this.state.createSuccess?(this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),this.props.dispatch({type:F.dH,payload:!1}),this.setState({queryParams:{...this.state.queryParams,page:1},openDialog:!1,editRow:null},(()=>{this.loadListData()}))):this.state.editSuccess?(this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),this.props.dispatch({type:F.Fh,payload:!1}),this.setState({queryParams:{...this.state.queryParams,page:1},openDialog:!1,editRow:null},(()=>{this.loadListData()}))):this.state.deleteSuccess?(this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),this.props.dispatch({type:F.DV,payload:!1}),this.handlePagination(1)):null!=this.state.errorMessage&&this.props.enqueueSnackbar(this.state.errorMessage,{variant:"error"}))}render(){return(0,P.jsxs)(g.A,{className:"wrapper-table",title:"District List",secondary:(0,z._m)(this.state.permissions,"district","add")?(0,P.jsx)(r.A,{variant:"contained",onClick:this.handleCreate,children:"Add"}):null,children:[(0,P.jsx)(n.A,{sx:{flexGrow:1,m:.5},className:"ratn-dialog-inner",children:(0,P.jsxs)(c.Ay,{container:!0,spacing:2,className:"tax-input loans_view p_view",children:[(0,P.jsx)(c.Ay,{item:!0,xs:3,className:"create-input",children:(0,P.jsxs)(o.A,{fullWidth:!0,children:[(0,P.jsx)(l.A,{children:"Country"}),(0,P.jsxs)(d.A,{value:this.state.queryParams.country_id,label:"Country",onChange:e=>this.handleSearchChange(e.target.value,"country_id"),className:"input-inner",defaultValue:"",children:[(0,P.jsx)(h.A,{value:"",children:"All"}),this.state.countries.map(((e,t)=>(0,P.jsx)(h.A,{value:e.id,children:e.name},t)))]})]})}),(0,P.jsx)(c.Ay,{item:!0,xs:3,className:"create-input",children:(0,P.jsxs)(o.A,{fullWidth:!0,children:[(0,P.jsx)(l.A,{children:"State"}),(0,P.jsxs)(d.A,{value:this.state.queryParams.state_id,label:"State",onChange:e=>this.handleSearchChange(e.target.value,"state_id"),className:"input-inner",defaultValue:"",children:[(0,P.jsx)(h.A,{value:"",children:"All"}),this.state.stateList.map(((e,t)=>(0,P.jsx)(h.A,{value:e.id,children:e.name},t)))]})]})}),(0,P.jsx)(c.Ay,{item:!0,xs:4,className:"create-input",children:(0,P.jsx)(o.A,{fullWidth:!0,children:(0,P.jsx)(u.A,{label:"Search",variant:"outlined",value:this.state.queryParams.search,onChange:e=>this.handleSearchChange(e.target.value,"search"),InputProps:{endAdornment:(0,P.jsx)(p.A,{sx:{visibility:this.state.queryParams.search?"visible":"hidden"},onClick:e=>this.handleSearchChange("","search"),children:(0,P.jsx)(N.A,{})})}})})}),(0,P.jsx)(c.Ay,{item:!0,xs:12,md:2,className:"create-input order-input button-right",children:(0,P.jsx)(r.A,{variant:"contained",className:"search-btn",onClick:this.handleSearch,children:"Search"})})]})}),(0,P.jsx)(c.Ay,{container:!0,spacing:y.iL,className:"table-inner",children:(0,P.jsx)(S.A,{columns:this.columns,rows:this.state.items,page:this.state.queryParams.page,limit:this.state.queryParams.limit,total:this.state.total,handlePagination:this.handlePagination,actions:[{label:"Edit",onClick:this.handleEdit,color:"primary",show:(0,z._m)(this.state.permissions,"district","edit")},{label:"Delete",onClick:this.handleDelete,isDelete:!0,color:"error",show:(0,z._m)(this.state.permissions,"district","delete")}]})}),(0,P.jsxs)(b.A,{className:"ratn-dialog-wrapper",open:this.state.openDialog,onClose:this.handleDialogClose,fullWidth:!0,maxWidth:"md",children:[(0,P.jsx)(j.A,{children:this.state.dialogTitle}),(0,P.jsxs)(C.A,{children:[(0,P.jsx)(v.A,{}),(0,P.jsx)(q,{onSubmit:this.submit,formData:this.state.editRow,states:this.state.states,countries:this.state.countries,handleCancel:this.handleCancel})]})]})]})}}const $=(0,L.Gh)((0,A.A)((0,i.connect)((e=>({items:e.superadmin.district.items,total:e.superadmin.district.total,states:e.superadmin.countryState.items||[],countries:e.superadmin.country.items||[],actionCalled:e.superadmin.district.actionCalled,createSuccess:e.superadmin.district.createSuccess,editSuccess:e.superadmin.district.editSuccess,deleteSuccess:e.superadmin.district.deleteSuccess,successMessage:e.superadmin.district.successMessage,errorMessage:e.superadmin.district.errorMessage,permissions:e.employee.permissions.permissions})),(e=>({dispatch:e,actions:(0,m.bindActionCreators)({districtList:x.r_,districtCreate:x.VX,districtUpdate:x.Sn,districtDelete:x.iI,countryList:k.HH,stateList:w.MO},e)})))(T)))}}]);