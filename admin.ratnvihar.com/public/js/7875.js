"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7875],{86552:(e,t,a)=>{a.d(t,{EM:()=>o,HH:()=>l,LT:()=>d,kX:()=>r});var s=a(80325),i=a(86418),n=a(45892);const l=e=>(e=(0,n.x0)(e,!0),t=>{s.A.get("/superadmin/countries".concat(e)).then((e=>{e.data.success&&t({type:i.GO,payload:e.data.data})})).catch((e=>{}))}),d=e=>t=>{s.A.post("/superadmin/countries/store",e).then((e=>{e.data.success&&t({type:i.bT,payload:e.data})})).catch((e=>{}))},r=(e,t)=>a=>{s.A.post("/superadmin/countries/update/".concat(e),t).then((e=>{e.data.success&&a({type:i.v$,payload:e.data})})).catch((e=>{}))},o=(e,t)=>a=>{s.A.delete("/superadmin/countries/delete/".concat(e),t).then((e=>{e.data.success&&a({type:i.bI,payload:e.data})})).catch((e=>{}))}},87903:(e,t,a)=>{a.d(t,{FD:()=>o,IU:()=>l,Lv:()=>c,QM:()=>r,ed:()=>d});var s=a(80325),i=a(59017),n=a(45892);const l=e=>(e=(0,n.x0)(e,!0),t=>{s.A.get("/superadmin/distributors".concat(e)).then((e=>{e.data.success&&t({type:i.wq,payload:e.data.data})})).catch((e=>{}))}),d=e=>t=>{s.A.post("/superadmin/distributors/store",e).then((e=>{t({type:i.PF,payload:e.data})})).catch((e=>{}))},r=e=>t=>{s.A.get("/superadmin/distributors/fetch/".concat(e)).then((e=>{e.data.success&&t({type:i.o_,payload:e.data.data})})).catch((e=>{}))},o=(e,t)=>a=>{s.A.post("/superadmin/distributors/update/".concat(e),t).then((e=>{a({type:i.fC,payload:e.data})})).catch((e=>{}))},c=(e,t)=>a=>{s.A.delete("/superadmin/distributors/delete/".concat(e),t).then((e=>{a({type:i.bt,payload:e.data})})).catch((e=>{}))}},76712:(e,t,a)=>{a.d(t,{Fl:()=>c,Sn:()=>r,VX:()=>d,iI:()=>o,r_:()=>l});var s=a(80325),i=a(61666),n=a(45892);const l=e=>(e=(0,n.x0)(e,!0),t=>{s.A.get("/superadmin/districts".concat(e)).then((e=>{e.data.success&&t({type:i.EF,payload:e.data.data})})).catch((e=>{}))}),d=e=>t=>{s.A.post("/superadmin/districts/store",e).then((e=>{e.data.success&&t({type:i.dH,payload:e.data})})).catch((e=>{}))},r=(e,t)=>a=>{s.A.post("/superadmin/districts/update/".concat(e),t).then((e=>{e.data.success&&a({type:i.Fh,payload:e.data})})).catch((e=>{}))},o=(e,t)=>a=>{s.A.delete("/superadmin/districts/delete/".concat(e),t).then((e=>{e.data.success&&a({type:i.DV,payload:e.data})})).catch((e=>{}))},c=async e=>(e=(0,n.x0)(e,!0),await s.A.get("/superadmin/districts".concat(e)))},71475:(e,t,a)=>{a.d(t,{E$:()=>n,b9:()=>l,ec:()=>d,kY:()=>c,qO:()=>o,tO:()=>r});var s=a(80325),i=a(29941);const n=()=>s.A.get("/superadmin/profile"),l=e=>t=>{s.A.post("/superadmin/edit-profile",e).then((e=>{t({type:i.bW,payload:e.data})})).catch((e=>{}))},d=e=>t=>{s.A.post("/superadmin/change-password",e).then((e=>{t({type:i.P8,payload:e.data})})).catch((e=>{}))},r=e=>e=>{s.A.get("/superadmin/dashboard").then((t=>{e({type:i.WG,payload:t.data.data})})).catch((e=>{}))},o=e=>e=>{s.A.get("/superadmin/auto-notifications").then((e=>{})).catch((e=>{}))},c=e=>s.A.get("/superadmin/next-user-name?role=".concat(e))},55028:(e,t,a)=>{a.d(t,{FQ:()=>r,K4:()=>c,TK:()=>d,kW:()=>o,xL:()=>l});var s=a(80325),i=a(26454),n=a(45892);const l=e=>(e=(0,n.x0)(e,!0),t=>{s.A.get("/superadmin/employees".concat(e)).then((e=>{e.data.success&&t({type:i.Do,payload:e.data.data})})).catch((e=>{}))}),d=e=>t=>{s.A.post("/superadmin/employees/store",e).then((e=>{t({type:i.cy,payload:e.data})})).catch((e=>{}))},r=e=>t=>{s.A.get("/superadmin/employees/fetch/".concat(e,"?role_id=4")).then((e=>{e.data.success&&t({type:i.JN,payload:e.data.data})})).catch((e=>{}))},o=(e,t)=>a=>{s.A.post("/superadmin/employees/update/".concat(e),t).then((e=>{a({type:i.gX,payload:e.data})})).catch((e=>{}))},c=(e,t)=>a=>{s.A.delete("/superadmin/employees/delete/".concat(e),t).then((e=>{a({type:i.oo,payload:e.data})})).catch((e=>{}))}},88019:(e,t,a)=>{a.d(t,{IS:()=>c,Jx:()=>r,MO:()=>l,TP:()=>o,i9:()=>d});var s=a(80325),i=a(99333),n=a(45892);const l=e=>(e=(0,n.x0)(e,!0),t=>{s.A.get("/superadmin/states".concat(e)).then((e=>{e.data.success&&t({type:i.hj,payload:e.data.data})})).catch((e=>{}))}),d=e=>t=>{s.A.post("/superadmin/states/store",e).then((e=>{e.data.success&&t({type:i.Mi,payload:e.data})})).catch((e=>{}))},r=(e,t)=>a=>{s.A.post("/superadmin/states/update/".concat(e),t).then((e=>{e.data.success&&a({type:i.I_,payload:e.data})})).catch((e=>{}))},o=(e,t)=>a=>{s.A.delete("/superadmin/states/delete/".concat(e),t).then((e=>{e.data.success&&a({type:i.es,payload:e.data})})).catch((e=>{}))},c=async e=>(e=(0,n.x0)(e,!0),await s.A.get("/superadmin/states".concat(e)))},27875:(e,t,a)=>{a.d(t,{A:()=>H});var s=a(63696),i=a(52821),n=a(61095),l=a(45271),d=a(36122),r=a(41795),o=a(66107),c=a(26365),h=a(78976),u=a(49746),m=a(58211),p=a(19636),_=a(58792),g=a(47998),x=a(72839),f=a(45892),y=a(88441),b=a(51449),v=a(27218),A=a(50977),j=a(26454),C=a(88019),N=a(71475),k=a(86552),w=a(76712),S=a(55028),D=a(97525),P=a(17243),I=a.n(P),L=a(41307),W=a(59964),F=a(87903),E=a(42722),V=a(62540);function M(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class R extends s.Component{constructor(e){super(e),M(this,"loadUserName",(async e=>{let t=await(0,N.kY)("employee",e);t.data.success&&this.setState({formValues:{...this.state.formValues,user_name:t.data.data}})})),M(this,"loadSelectList",(async e=>{let t=await(0,C.IS)({all:1,country_id:e.country_id});t.data.success&&this.setState({stateList:t.data.data.items});let a=await(0,C.IS)({all:1,country_id:e.p_country_id});a.data.success&&this.setState({p_stateList:a.data.data.items});let s=await(0,w.Fl)({all:1,state_id:e.state_id});s.data.success&&this.setState({districtList:s.data.data.items});let i=await(0,w.Fl)({all:1,state_id:e.p_state_id});i.data.success&&this.setState({p_districtList:i.data.data.items})})),M(this,"handleDefaultChange",((e,t)=>{this.updateFormValues(e.target.value,t)})),M(this,"updateFormValues",((e,t)=>{let a=this.state.formValues;a[t]=e,this.setState({formValues:a})})),M(this,"handleSubmit",(async()=>{let e=this.formValidate();if(console.log(e),!e){this.setState({submitting:!0});let e={...this.state.formValues};this.state.profile_image?(e.profile_image=await(0,f.nk)(this.state.profile_image),this.setState({profile_base64:e.profile_image})):this.setState({profile_base64:""}),this.state.pan_image&&(e.pan_image=await(0,f.nk)(this.state.pan_image)),this.state.adhar_image&&(e.adhar_image=await(0,f.nk)(this.state.adhar_image)),this.state.company_logo&&(e.company_logo=await(0,f.nk)(this.state.company_logo)),e.remove_profile_image=this.state.remove_profile_image,e.remove_pan_image=this.state.remove_pan_image,e.remove_adhar_image=this.state.remove_adhar_image,e.remove_company_logo=this.state.remove_company_logo;let t=[...this.state.documents];for(let e=0;e<t.length;e++)t[e]=await(0,f.nk)(t[e]);e.documents=t,e.remove_documents=this.state.remove_documents,this.state.isCreateFrom?this.props.actions.salesExecutiveCreate(e):this.props.actions.salesExecutiveUpdate(this.state.formData.id,e)}})),M(this,"formValidate",(()=>{let e=this.state.formErros,t=this.state.formValues,a=!1;return(0,f.Im)(t.name)?(e.name=!0,a=!0):e.name=!1,(0,f.Im)(t.mobile)?(e.mobile=!0,a=!0):e.mobile=!1,this.state.isCreateFrom&&!this.state.isEditProfile&&((0,f.Im)(t.password)?(e.password=!0,a=!0):e.password=!1),(0,f.Im)(t.country_id)?(e.country_id=!0,a=!0):e.country_id=!1,(0,f.Im)(t.state_id)?(e.state_id=!0,a=!0):e.state_id=!1,(0,f.Im)(t.address)?(e.address=!0,a=!0):e.address=!1,(0,f.Im)(t.district_id)?(e.district_id=!0,a=!0):e.district_id=!1,(0,f.Im)(t.parent_id)?(e.parent_id=!0,a=!0):e.parent_id=!1,this.setState({formErros:e}),a})),M(this,"handleStateChange",(async(e,t)=>{if("state_id"==t){this.handleDefaultChange(e,"state_id"),this.updateFormValues("","district_id");let t=await(0,w.Fl)({all:1,state_id:e.target.value});t.data.success&&(console.log(t.data.data.items),this.setState({districtList:t.data.data.items}))}else{this.handleDefaultChange(e,"p_state_id"),this.updateFormValues("","p_district_id");let t=await(0,w.Fl)({all:1,state_id:e.target.value});t.data.success&&this.setState({p_districtList:t.data.data.items})}})),M(this,"onImageChange",((e,t)=>{let a="existing_"+t;this.setState({[t]:e.target.files[0],[a]:null});let s=t+"Ref";this[s]&&(this[s].current.value=null)})),M(this,"deleteExistingImage",(e=>{let t="remove_"+e,a="existing_"+e;this.setState({[a]:null,[t]:!0})})),M(this,"deleteImage",(e=>{this.setState({[e]:null})})),M(this,"getImageSrc",(e=>URL.createObjectURL(e))),M(this,"handleCountryChange",(async e=>{this.handleDefaultChange(e,"country_id"),this.updateFormValues("","state_id");let t=await(0,C.IS)({all:1,country_id:e.target.value});t.data.success&&this.setState({stateList:t.data.data.items})})),M(this,"handlePermanentCountryChange",(async e=>{this.handleDefaultChange(e,"p_country_id"),this.updateFormValues("","p_state_id");let t=await(0,C.IS)({all:1,country_id:e.target.value});t.data.success&&this.setState({p_stateList:t.data.data.items})})),M(this,"onDocumentChange",(e=>{let t=this.state.documents;if(this.state.existing_documents.length+t.length+e.target.files.length>10)this.props.enqueueSnackbar("Maximum 5 document are allowed.",{variant:"error"});else{for(let a=0;a<e.target.files.length;a++)console.log(e.target.files[a]),t.push(e.target.files[a]);this.setState({documents:t}),this.documentRef&&(this.documentRef.current.value=null)}})),M(this,"deleteDocument",(e=>{let t=this.state.documents;t.splice(e,1),this.setState({documents:t}),this.documentRef&&(this.documentRef.current.value=null)})),M(this,"deleteExistingDocument",(e=>{let t=this.state.remove_documents,a=this.state.existing_documents;t.push(a[e]),a.splice(e,1),this.setState({remove_documents:t,existing_documents:a})})),M(this,"filePreview",(e=>{})),M(this,"getAllDocuments",(e=>{let t=[];for(let e of this.state.existing_documents)t.push({path:e.path,type:"existing"});for(let e of this.state.documents)t.push({path:e,type:"new"});for(let e=t.length;e<5;e++)t.push({path:W.A,type:"no_image"});return e?t[0]:(t.shift(),t)})),M(this,"handleWeeklyHoliday",(e=>{const{name:t,checked:a}=e.target;let s=this.state.formValues,i=s.weekly_holidays;i[t]=!!a,s.weekly_holidays=i,this.setState({formValues:s})}));let t="formData"in this.props?this.props.formData:null;this.state={auth:this.props.auth,formData:t,isCreateFrom:!t,countryList:this.props.countryList,distributorList:this.props.distributorList,isEditProfile:this.props.isEditProfile,stateList:[],p_stateList:[],p_districtList:[],districtList:[],submitting:!1,formValues:{name:"",email:"",role_id:4,mobile:"",adhar:"",pan:"",address:"",city:"",pincode:"",district_id:"",state_id:"",country_id:"",p_address:"",p_city:"",p_pincode:"",p_district_id:"",p_state_id:"",p_country_id:"",company_name:"",gst:"",bank_name:"",bank_account_no:"",bank_ifsc:"",status:1,landmark:"",user_name:"",blood_group:"",password:"",parents_name:"",parents_contact_no:"",parent_id:"",branch_name:"",weekly_holidays:{mon:!1,tue:!1,wed:!1,thu:!1,fri:!1,sat:!1,sun:!1}},formErros:{name:!1,email:!1,mobile:!1,adhar:!1,pan:!1,address:!1,city:!1,pincode:!1,district_id:!1,state_id:!1,country_id:!1,p_address:!1,p_city:!1,p_pincode:!1,p_district_id:!1,p_state_id:!1,p_country_id:!1,company_name:!1,gst:!1,bank_name:!1,bank_account_no:!1,bank_ifsc:!1,landmark:!1,password:!1,parents_name:!1,parents_contact_no:!1,parent_id:!1},actionCalled:this.props.actionCalled,createSuccess:this.props.createSuccess,editSuccess:this.props.editSuccess,successMessage:this.props.successMessage,errorMessage:this.props.errorMessage,profile_image:null,pan_image:null,adhar_image:null,company_logo:null,documents:[],existing_profile_image:null,existing_pan_image:null,existing_adhar_image:null,existing_company_logo:null,existing_documents:[],remove_profile_image:!1,remove_pan_image:!1,remove_adhar_image:!1,remove_company_logo:!1,remove_documents:[],profile_base64:""},this.profile_imageRef=s.createRef(),this.pan_imageRef=s.createRef(),this.adhar_imageRef=s.createRef(),this.company_logoRef=s.createRef(),this.documentRef=s.createRef()}componentDidMount(){this.props.actions.countryList({all:1}),this.props.actions.distributorList({all:1}),this.state.formData?(this.initializeFormData(),this.setState({isCreateFrom:!1})):this.loadUserName("")}initializeFormData(){if(this.state.formData){let e=this.state.formValues;I().each(this.state.formData,(function(t,a){a in e&&(e[a]=t)})),this.setState({formValues:e,existing_profile_image:this.state.formData.profile_image,existing_pan_image:this.state.formData.pan_image,existing_adhar_image:this.state.formData.adhar_image,existing_company_logo:this.state.formData.company_logo,existing_documents:this.state.formData.documents,isCreateFrom:!1},(()=>{e.user_name||this.loadUserName(e.id)})),this.loadSelectList(e)}}static getDerivedStateFromProps(e,t){let a={};return e.formData!==t.formData&&(a.formData=e.formData),e.actionCalled!==t.actionCalled&&(a.actionCalled=e.actionCalled),e.createSuccess!==t.createSuccess&&(a.createSuccess=e.createSuccess),e.editSuccess!==t.editSuccess&&(a.editSuccess=e.editSuccess),e.successMessage!==t.successMessage&&(a.successMessage=e.successMessage),e.errorMessage!==t.errorMessage&&(a.errorMessage=e.errorMessage),e.countryList!==t.countryList&&(a.countryList=e.countryList),e.distributorList!==t.distributorList&&(a.distributorList=e.distributorList),e.isEditProfile!==t.isEditProfile&&(a.isEditProfile=e.isEditProfile),a}componentDidUpdate(e){if(this.props.formData!=e.formData&&this.initializeFormData(),this.state.actionCalled)if(this.state.isCreateFrom)this.state.createSuccess?(this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),this.props.dispatch({type:j.Ic}),this.props.navigate((0,f.zr)((0,f.mA)(this.state.auth))+"/sales-executive")):(this.setState({submitting:!1}),this.props.enqueueSnackbar(this.state.errorMessage,{variant:"error"}),this.props.dispatch({type:j.Ic}));else if(this.state.editSuccess)if(this.props.enqueueSnackbar(this.state.successMessage,{variant:"success"}),this.props.dispatch({type:j.Ic}),this.state.isEditProfile){let e={name:this.state.formValues.name,mobile:this.state.formValues.mobile,email:this.state.formValues.email};this.state.profile_image?e.image=this.state.profile_base64:e.image=this.state.existing_profile_image,this.props.dispatch({type:E.Rq,payload:e}),this.setState({submitting:!1})}else this.props.navigate((0,f.zr)((0,f.mA)(this.state.auth))+"/sales-executive");else this.setState({submitting:!1}),this.props.enqueueSnackbar(this.state.errorMessage,{variant:"error"}),this.props.dispatch({type:j.Ic})}render(){const{formValues:e,formErros:t,submitting:a,isEditProfile:s}=this.state;let i=this.getAllDocuments(!0);return(0,V.jsx)(n.A,{sx:{flexGrow:1,m:.5},className:"ratn-dialog-wrapper",children:(0,V.jsxs)("form",{autoComplete:"off",className:"ratn-dialog-inner",children:[(0,V.jsxs)(l.Ay,{container:!0,spacing:2,className:"loans_view p_view",children:[(0,V.jsx)(l.Ay,{item:!0,md:3,xs:12,className:"create-input",children:(0,V.jsx)(d.A,{label:"Candidate Name",variant:"outlined",fullWidth:!0,value:e.name,onChange:e=>this.handleDefaultChange(e,"name"),error:t.name,disabled:s,inputProps:{className:"non_disable_text"}})}),(0,V.jsx)(l.Ay,{item:!0,md:4,xs:12,className:"create-input",children:(0,V.jsx)(d.A,{label:"Email",variant:"outlined",fullWidth:!0,value:e.email,onChange:e=>this.handleDefaultChange(e,"email"),error:t.email,disabled:s,inputProps:{className:"non_disable_text"}})}),(0,V.jsx)(l.Ay,{item:!0,md:2,xs:12,className:"create-input",children:(0,V.jsx)(d.A,{label:"Contact No",variant:"outlined",fullWidth:!0,value:e.mobile,onChange:e=>this.handleDefaultChange(e,"mobile"),error:t.mobile,disabled:s,inputProps:{className:"non_disable_text"}})}),(0,V.jsx)(l.Ay,{item:!0,md:3,xs:12,className:"create-input",children:(0,V.jsxs)(r.A,{fullWidth:!0,error:t.parent_id,children:[(0,V.jsx)(o.A,{children:"Distributor"}),(0,V.jsxs)(c.A,{className:"input-inner",value:e.parent_id,fullWidth:!0,label:"Distributor",onChange:e=>this.handleDefaultChange(e,"parent_id"),disabled:s,inputProps:{className:"non_disable_text"},children:[(0,V.jsx)(h.A,{value:""}),this.state.distributorList.map(((e,t)=>(0,V.jsx)(h.A,{value:e.id,children:e.name},t)))]})]})}),(0,V.jsx)(l.Ay,{item:!0,xs:12,md:7,className:"create-input",children:(0,V.jsx)(d.A,{label:"Full Address",variant:"outlined",fullWidth:!0,value:e.address,onChange:e=>this.handleDefaultChange(e,"address"),error:t.address,disabled:s,inputProps:{className:"non_disable_text"}})}),(0,V.jsx)(l.Ay,{item:!0,md:3,xs:12,className:"create-input",children:(0,V.jsx)(d.A,{label:"Landmark",variant:"outlined",fullWidth:!0,value:e.landmark,onChange:e=>this.handleDefaultChange(e,"landmark"),error:t.landmark,disabled:s,inputProps:{className:"non_disable_text"}})}),(0,V.jsx)(l.Ay,{item:!0,md:2,xs:12,className:"create-input",children:(0,V.jsxs)(r.A,{fullWidth:!0,children:[(0,V.jsx)(o.A,{children:"Blood Group"}),(0,V.jsxs)(c.A,{className:"input-inner",value:e.blood_group,fullWidth:!0,label:"Blood Group",onChange:e=>this.handleDefaultChange(e,"blood_group"),disabled:s,inputProps:{className:"non_disable_text"},children:[(0,V.jsx)(h.A,{value:""}),(0,V.jsx)(h.A,{value:"A+",children:"A+"}),(0,V.jsx)(h.A,{value:"A-",children:"A-"}),(0,V.jsx)(h.A,{value:"B+",children:"B+"}),(0,V.jsx)(h.A,{value:"B-",children:"B-"}),(0,V.jsx)(h.A,{value:"AB+",children:"AB+"}),(0,V.jsx)(h.A,{value:"AB-",children:"AB-"}),(0,V.jsx)(h.A,{value:"O+",children:"O+"}),(0,V.jsx)(h.A,{value:"O-",children:"O-"})]})]})}),(0,V.jsx)(l.Ay,{item:!0,md:2.4,xs:12,className:"create-input",children:(0,V.jsxs)(r.A,{fullWidth:!0,error:t.country_id,children:[(0,V.jsx)(o.A,{children:"Country"}),(0,V.jsxs)(c.A,{className:"input-inner",value:e.country_id,fullWidth:!0,label:"Country",onChange:this.handleCountryChange,disabled:s,inputProps:{className:"non_disable_text"},children:[(0,V.jsx)(h.A,{value:""}),this.state.countryList.map(((e,t)=>(0,V.jsx)(h.A,{value:e.id,children:e.name},t)))]})]})}),(0,V.jsx)(l.Ay,{item:!0,md:2.4,xs:12,className:"create-input",children:(0,V.jsxs)(r.A,{fullWidth:!0,error:t.state_id,children:[(0,V.jsx)(o.A,{children:"State"}),(0,V.jsxs)(c.A,{className:"input-inner",value:e.state_id,fullWidth:!0,label:"State",onChange:e=>this.handleStateChange(e,"state_id"),disabled:s,inputProps:{className:"non_disable_text"},children:[(0,V.jsx)(h.A,{value:""}),this.state.stateList.map(((e,t)=>(0,V.jsx)(h.A,{value:e.id,children:e.name},t)))]})]})}),(0,V.jsx)(l.Ay,{item:!0,md:2.4,xs:12,className:"create-input",children:(0,V.jsxs)(r.A,{fullWidth:!0,error:t.district_id,children:[(0,V.jsx)(o.A,{children:"District"}),(0,V.jsxs)(c.A,{className:"input-inner",value:e.district_id,fullWidth:!0,label:"District",onChange:e=>this.handleDefaultChange(e,"district_id"),disabled:s,inputProps:{className:"non_disable_text"},children:[(0,V.jsx)(h.A,{value:""}),this.state.districtList.map(((e,t)=>(0,V.jsx)(h.A,{value:e.id,children:e.name},t)))]})]})}),(0,V.jsx)(l.Ay,{item:!0,md:2.4,xs:12,className:"create-input",children:(0,V.jsx)(d.A,{label:"City",variant:"outlined",fullWidth:!0,value:e.city,onChange:e=>this.handleDefaultChange(e,"city"),error:t.city,disabled:s,inputProps:{className:"non_disable_text"}})}),(0,V.jsx)(l.Ay,{item:!0,md:2.4,xs:12,className:"create-input",children:(0,V.jsx)(d.A,{label:"Pincode",variant:"outlined",fullWidth:!0,value:e.pincode,onChange:e=>this.handleDefaultChange(e,"pincode"),error:t.pincode,disabled:s,inputProps:{className:"non_disable_text"}})}),(0,V.jsx)(l.Ay,{item:!0,md:3,xs:12,className:"create-input",children:(0,V.jsx)(d.A,{label:"Parents Name",variant:"outlined",fullWidth:!0,value:e.parents_name,onChange:e=>this.handleDefaultChange(e,"parents_name"),error:t.parents_name,disabled:s,inputProps:{className:"non_disable_text"}})}),(0,V.jsx)(l.Ay,{item:!0,md:2,xs:12,className:"create-input",children:(0,V.jsx)(d.A,{label:"Parents Contact No",variant:"outlined",fullWidth:!0,value:e.parents_contact_no,onChange:e=>this.handleDefaultChange(e,"parents_contact_no"),error:t.parents_contact_no,disabled:s,inputProps:{className:"non_disable_text"}})}),(0,V.jsx)(l.Ay,{item:!0,xs:12,md:7,className:"create-input",children:(0,V.jsx)(d.A,{label:"Permanent Address",variant:"outlined",fullWidth:!0,value:e.p_address,onChange:e=>this.handleDefaultChange(e,"p_address"),error:t.p_address,disabled:s,inputProps:{className:"non_disable_text"}})}),(0,V.jsx)(l.Ay,{item:!0,md:3,xs:12,className:"create-input",children:(0,V.jsx)(d.A,{label:"Bank Name",variant:"outlined",fullWidth:!0,value:e.bank_name,onChange:e=>this.handleDefaultChange(e,"bank_name"),error:t.bank_name,disabled:s,inputProps:{className:"non_disable_text"}})}),(0,V.jsx)(l.Ay,{item:!0,md:3,xs:12,className:"create-input",children:(0,V.jsx)(d.A,{label:"Branch",variant:"outlined",fullWidth:!0,value:e.branch_name,onChange:e=>this.handleDefaultChange(e,"branch_name"),error:t.branch_name,disabled:s,inputProps:{className:"non_disable_text"}})}),(0,V.jsx)(l.Ay,{item:!0,md:3,xs:12,className:"create-input",children:(0,V.jsx)(d.A,{label:"Account Number",variant:"outlined",fullWidth:!0,value:e.bank_account_no,onChange:e=>this.handleDefaultChange(e,"bank_account_no"),error:t.bank_account_no,disabled:s,inputProps:{className:"non_disable_text"}})}),(0,V.jsx)(l.Ay,{item:!0,md:3,xs:12,className:"create-input",children:(0,V.jsx)(d.A,{label:"IFSC Code",variant:"outlined",fullWidth:!0,value:e.bank_ifsc,onChange:e=>this.handleDefaultChange(e,"bank_ifsc"),error:t.bank_ifsc,disabled:s,inputProps:{className:"non_disable_text"}})})]}),(0,V.jsx)("div",{className:"custom-container ml-10",children:(0,V.jsxs)("div",{className:"custom-row pl-0",children:[(0,V.jsx)("div",{className:"custom-col-2",children:(0,V.jsx)("div",{className:"admin-buttons",children:(0,V.jsxs)("div",{className:"p-single-image-wrapper",children:[(0,V.jsx)("div",{className:"p-single-image",children:this.state.existing_profile_image?(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)("button",{className:"close_img",onClick:()=>this.deleteExistingImage("profile_image"),children:"x"}),(0,V.jsx)("img",{src:this.state.existing_profile_image})]}):(0,V.jsx)(V.Fragment,{children:this.state.profile_image?(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)("button",{className:"close_img",onClick:()=>this.deleteImage("profile_image"),children:"x"}),(0,V.jsx)("img",{src:this.getImageSrc(this.state.profile_image)})]}):(0,V.jsx)("img",{src:W.A})})}),(0,V.jsxs)(u.A,{variant:"contained",className:"image-button",component:"label",endIcon:(0,V.jsx)(D.A,{}),children:["Profile Photo",(0,V.jsx)("input",{name:"profile_image",hidden:!0,accept:"image/*",type:"file",onChange:e=>this.onImageChange(e,"profile_image"),ref:this.profile_imageRef})]})]})})}),(0,V.jsx)("div",{className:"custom-col-2",children:" "}),(0,V.jsx)("div",{className:"custom-col-8",children:(0,V.jsxs)("div",{className:"all-image-wrapper",children:[(0,V.jsxs)("div",{className:"all-single-image",children:[(0,V.jsxs)("div",{children:["no_image"!=i.type?(0,V.jsx)(V.Fragment,{children:"existing"==i.type?(0,V.jsx)("button",{className:"close_img",onClick:()=>this.deleteExistingDocument(0),disabled:s,children:"x"}):(0,V.jsx)("button",{className:"close_img",onClick:()=>this.deleteDocument(0),disabled:s,children:"x"})}):null,(0,V.jsx)(L.A,{file:i.path,viewImage:"no_image"!=i.type})]}),(0,V.jsxs)(u.A,{variant:"contained",className:"image-button",component:"label",sx:{maxWidth:"260px"},endIcon:(0,V.jsx)(D.A,{}),disabled:s,children:["Documents",(0,V.jsx)("input",{name:"documents",hidden:!0,type:"file",onChange:this.onDocumentChange,ref:this.documentRef,accept:"application/pdf, image/*",multiple:!0})]})]}),this.getAllDocuments().map(((e,t)=>(0,V.jsx)("div",{className:"all-single-image",children:(0,V.jsxs)("div",{children:["no_image"!=e.type?(0,V.jsx)(V.Fragment,{children:"existing"==e.type?(0,V.jsx)("button",{className:"close_img",onClick:()=>this.deleteExistingDocument(t+1),disabled:s,children:"x"}):(0,V.jsx)("button",{className:"close_img",onClick:()=>this.deleteDocument(t+1),disabled:s,children:"x"})}):null,(0,V.jsx)(L.A,{file:e.path,viewImage:"no_image"!=e.type})]})},t)))]})})]})}),(0,V.jsxs)(l.Ay,{container:!0,spacing:2,className:"loans_view p_view",children:[(0,V.jsx)(l.Ay,{item:!0,md:2,xs:12,className:"create-input",children:(0,V.jsx)(d.A,{label:"User Name",variant:"outlined",fullWidth:!0,value:e.user_name,disabled:!0,inputProps:{className:"non_disable_text"}})}),s?null:(0,V.jsx)(l.Ay,{item:!0,md:2,xs:12,className:"create-input",children:(0,V.jsx)(d.A,{label:"Password",variant:"outlined",fullWidth:!0,value:e.password,autoComplete:"new-password",type:"password",onChange:e=>this.handleDefaultChange(e,"password"),error:t.password})}),(0,V.jsx)(l.Ay,{item:!0,md:2,xs:12,className:"create-input",children:(0,V.jsxs)(r.A,{fullWidth:!0,children:[(0,V.jsx)(o.A,{children:"Status"}),(0,V.jsxs)(c.A,{className:"input-inner",value:e.status,fullWidth:!0,label:"Status",onChange:e=>this.handleDefaultChange(e,"status"),disabled:s,inputProps:{className:"non_disable_text"},children:[(0,V.jsx)(h.A,{value:1,children:"Active"}),(0,V.jsx)(h.A,{value:0,children:"Inactive"})]})]})}),(0,V.jsx)(l.Ay,{item:!0,xs:12,md:6,className:"create-input",children:(0,V.jsxs)(r.A,{component:"fieldset",children:[(0,V.jsx)(m.A,{component:"legend",children:"Weekly Holidays"}),(0,V.jsxs)(p.A,{"aria-label":"position",row:!0,children:[(0,V.jsx)(_.A,{value:"mon",control:(0,V.jsx)(g.A,{checked:this.state.formValues.weekly_holidays.mon,name:"mon",onChange:this.handleWeeklyHoliday}),label:"Mon",labelPlacement:"end",disabled:s,inputProps:{className:"non_disable_text"}}),(0,V.jsx)(_.A,{value:"tue",control:(0,V.jsx)(g.A,{checked:this.state.formValues.weekly_holidays.tue,name:"tue",onChange:this.handleWeeklyHoliday}),label:"Tue",labelPlacement:"end",disabled:s,inputProps:{className:"non_disable_text"}}),(0,V.jsx)(_.A,{value:"wed",control:(0,V.jsx)(g.A,{checked:this.state.formValues.weekly_holidays.wed,name:"wed",onChange:this.handleWeeklyHoliday}),label:"Wed",labelPlacement:"end",disabled:s,inputProps:{className:"non_disable_text"}}),(0,V.jsx)(_.A,{value:"thu",control:(0,V.jsx)(g.A,{checked:this.state.formValues.weekly_holidays.thu,name:"thu",onChange:this.handleWeeklyHoliday}),label:"Thu",labelPlacement:"end",disabled:s,inputProps:{className:"non_disable_text"}}),(0,V.jsx)(_.A,{value:"fri",control:(0,V.jsx)(g.A,{checked:this.state.formValues.weekly_holidays.fri,name:"fri",onChange:this.handleWeeklyHoliday}),label:"Fri",labelPlacement:"end",disabled:s,inputProps:{className:"non_disable_text"}}),(0,V.jsx)(_.A,{value:"sat",control:(0,V.jsx)(g.A,{checked:this.state.formValues.weekly_holidays.sat,name:"sat",onChange:this.handleWeeklyHoliday}),label:"Sat",labelPlacement:"end",disabled:s,inputProps:{className:"non_disable_text"}}),(0,V.jsx)(_.A,{value:"sun",control:(0,V.jsx)(g.A,{checked:this.state.formValues.weekly_holidays.sun,name:"sun",onChange:this.handleWeeklyHoliday}),label:"Sun",labelPlacement:"end",disabled:s,inputProps:{className:"non_disable_text"}})]})]})})]}),(0,V.jsxs)(l.Ay,{container:!0,spacing:2,className:"loans_view p_view",children:[(0,V.jsx)(l.Ay,{item:!0,xs:9,className:"create-input",children:" "}),(0,V.jsx)(l.Ay,{item:!0,md:3,xs:12,className:"create-input",children:(0,V.jsxs)(x.A,{spacing:1,direction:"row",className:"ratn-footer-buttons",justifyContent:"flex-end",children:[(0,V.jsx)(v.A,{className:"conf-button",variant:"contained",type:"button",loading:a,disabled:a,onClick:this.handleSubmit,children:"Save"}),a?null:(0,V.jsx)(u.A,{variant:"outlined",className:"close-button",onClick:()=>this.props.navigate(-1),children:"Cancel"})]})})]}),(0,V.jsx)(l.Ay,{container:!0,spacing:2,className:"loans_view p_view"})]})})}}R.defaultProps={isEditProfile:!1};const H=(0,b.Gh)((0,A.A)((0,i.connect)((e=>({actionCalled:e.superadmin.salesExecutive.actionCalled,createSuccess:e.superadmin.salesExecutive.createSuccess,editSuccess:e.superadmin.salesExecutive.editSuccess,successMessage:e.superadmin.salesExecutive.successMessage,errorMessage:e.superadmin.salesExecutive.errorMessage,countryList:e.superadmin.country.items,auth:e.auth,distributorList:e.superadmin.distributor.items})),(e=>({dispatch:e,actions:(0,y.bindActionCreators)({countryList:k.HH,stateList:C.MO,salesExecutiveUpdate:S.kW,salesExecutiveCreate:S.TK,distributorList:F.IU},e)})))(R)))},41307:(e,t,a)=>{a.d(t,{A:()=>r});var s=a(63696);const i=a.p+"assets/Icon_pdf_file.png";var n=a(62540);function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class d extends s.Component{constructor(e){super(e),l(this,"getImageSrc",(e=>URL.createObjectURL(e))),l(this,"handleClick",(e=>{this.state.viewImage&&window.open(e,"_blank").focus()})),this.state={file:this.props.file,viewImage:this.props.viewImage||!1}}static getDerivedStateFromProps(e,t){let a={};return e.file!==t.file&&(a.file=e.file),"viewImage"in e&&e.viewImage!==t.viewImage&&(a.viewImage=e.viewImage),a}render(){let e=this.state.file,t="";return"object"==typeof e?(t=e.type,e=this.getImageSrc(e)):t=e.split(".").pop(),(0,n.jsx)("div",{children:"application/pdf"==t||"pdf"==t?(0,n.jsx)("img",{src:i,loading:"lazy",style:{cursor:"pointer"},onClick:()=>this.handleClick(e)}):(0,n.jsx)("img",{src:e,loading:"lazy",style:{cursor:"pointer"},onClick:()=>this.handleClick(e)})})}}const r=d},59964:(e,t,a)=>{a.d(t,{A:()=>s});const s=a.p+"assets/no_image.jpg"}}]);