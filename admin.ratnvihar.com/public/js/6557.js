"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6557],{86552:(e,t,a)=>{a.d(t,{EM:()=>r,HH:()=>l,LT:()=>o,kX:()=>c});var s=a(80325),n=a(86418),i=a(45892);const l=e=>(e=(0,i.x0)(e,!0),t=>{s.A.get("/superadmin/countries".concat(e)).then((e=>{e.data.success&&t({type:n.GO,payload:e.data.data})})).catch((e=>{}))}),o=e=>t=>{s.A.post("/superadmin/countries/store",e).then((e=>{e.data.success&&t({type:n.bT,payload:e.data})})).catch((e=>{}))},c=(e,t)=>a=>{s.A.post("/superadmin/countries/update/".concat(e),t).then((e=>{e.data.success&&a({type:n.v$,payload:e.data})})).catch((e=>{}))},r=(e,t)=>a=>{s.A.delete("/superadmin/countries/delete/".concat(e),t).then((e=>{e.data.success&&a({type:n.bI,payload:e.data})})).catch((e=>{}))}},76712:(e,t,a)=>{a.d(t,{Fl:()=>d,Sn:()=>c,VX:()=>o,iI:()=>r,r_:()=>l});var s=a(80325),n=a(61666),i=a(45892);const l=e=>(e=(0,i.x0)(e,!0),t=>{s.A.get("/superadmin/districts".concat(e)).then((e=>{e.data.success&&t({type:n.EF,payload:e.data.data})})).catch((e=>{}))}),o=e=>t=>{s.A.post("/superadmin/districts/store",e).then((e=>{e.data.success&&t({type:n.dH,payload:e.data})})).catch((e=>{}))},c=(e,t)=>a=>{s.A.post("/superadmin/districts/update/".concat(e),t).then((e=>{e.data.success&&a({type:n.Fh,payload:e.data})})).catch((e=>{}))},r=(e,t)=>a=>{s.A.delete("/superadmin/districts/delete/".concat(e),t).then((e=>{e.data.success&&a({type:n.DV,payload:e.data})})).catch((e=>{}))},d=async e=>(e=(0,i.x0)(e,!0),await s.A.get("/superadmin/districts".concat(e)))},16520:(e,t,a)=>{a.d(t,{E$:()=>r,RZ:()=>d,cV:()=>o,j:()=>l,qF:()=>c});var s=a(80325),n=a(73842),i=a(45892);const l=e=>(e=(0,i.x0)(e,!0),t=>{s.A.get("/superadmin/loans".concat(e)).then((e=>{e.data.success&&t({type:n.k7,payload:e.data.data})})).catch((e=>{}))}),o=e=>t=>{s.A.post("/superadmin/loans/store",e).then((e=>{t({type:n.B7,payload:e.data})})).catch((e=>{}))},c=e=>t=>{s.A.get("/superadmin/loans/view/".concat(e)).then((e=>{e.data.success&&t({type:n.C3,payload:e.data.data})})).catch((e=>{}))},r=(e,t)=>a=>{s.A.delete("/superadmin/loans/delete/".concat(e),t).then((e=>{a({type:n.TR,payload:e.data})})).catch((e=>{}))},d=(e,t)=>a=>{s.A.post("/superadmin/loans/make-payment/".concat(e),t).then((e=>{a({type:n.tx,payload:e.data})})).catch((e=>{}))}},88019:(e,t,a)=>{a.d(t,{IS:()=>d,Jx:()=>c,MO:()=>l,TP:()=>r,i9:()=>o});var s=a(80325),n=a(99333),i=a(45892);const l=e=>(e=(0,i.x0)(e,!0),t=>{s.A.get("/superadmin/states".concat(e)).then((e=>{e.data.success&&t({type:n.hj,payload:e.data.data})})).catch((e=>{}))}),o=e=>t=>{s.A.post("/superadmin/states/store",e).then((e=>{e.data.success&&t({type:n.Mi,payload:e.data})})).catch((e=>{}))},c=(e,t)=>a=>{s.A.post("/superadmin/states/update/".concat(e),t).then((e=>{e.data.success&&a({type:n.I_,payload:e.data})})).catch((e=>{}))},r=(e,t)=>a=>{s.A.delete("/superadmin/states/delete/".concat(e),t).then((e=>{e.data.success&&a({type:n.es,payload:e.data})})).catch((e=>{}))},d=async e=>(e=(0,i.x0)(e,!0),await s.A.get("/superadmin/states".concat(e)))},27874:(e,t,a)=>{a.d(t,{A:()=>G});var s=a(63696),n=a(36846),i=a(46133),l=a(72839),o=a(49746),c=a(45271),r=a(41795),d=a(26365),h=a(78976),p=a(2626),u=a(98993),g=a(73947),m=a(10228),A=a(45166),x=a(2598),y=a(55186),j=a(25606),C=a(24019),w=a(62688),b=a.n(w),f=a(89429),k=a(29443),_=a(52805),v=a(79859),N=a(43191),S=a(45892),D=a(16638),V=a(97217),O=a(60669),P=a(86074),I=a(35008),H=a(78061),F=a(81117),B=a(51223),T=a(37001),R=a(37086),W=a(55063),L=a(71086),M=a(62540);function E(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class q extends s.Component{constructor(e){super(e),E(this,"handleChangePage",((e,t)=>{this.props.handlePagination(t)})),E(this,"getArrayComponent",((e,t)=>(0,M.jsx)(M.Fragment,{children:e.map(((e,a)=>(0,M.jsxs)(s.Fragment,{children:[e,!1!==t?(0,M.jsx)(M.Fragment,{children:" "}):""]},a)))}))),E(this,"getData",(e=>{let t=[];for(let a of this.state.columns){let s=a.name in e?e[a.name]:"";if(Array.isArray(s))if("show_tag"in a){let e=[];for(let t=0;t<s.length;t++)e.push((0,M.jsx)(n.A,{label:s[t][a.array_key],color:"primary"}));s=this.getArrayComponent(e)}else{let e=[];if("array_key"in a){for(let t=0;t<s.length;t++)e.push(s[t][a.array_key]);s=e}s=(0,S.Gp)(s.join("\n"))}else{if("show_tag"in a){let t="primary";if("color_conditions"in a){for(let s=0;s<a.color_conditions.length;s++)if(a.color_conditions[s].value==e[a.color_conditions[s].key]){t=a.color_conditions[s].color;break}}else"Status"==a.display_name&&(t=(0,S.qY)(s));if(s=s?(0,M.jsx)(n.A,{label:s,color:t}):"","showAttendenceAddress"in a&&a.showAttendenceAddress){let t=[];e.attendence_address&&e.attendence_address.login&&(t.push((0,M.jsx)("a",{href:"http://maps.google.com/?ll="+e.attendence_address.login.lat+","+e.attendence_address.login.lng,style:{display:"block"},target:"_blank",children:e.attendence_address.login.address})),e.attendence_address.logout&&t.push((0,M.jsx)("a",{href:"http://maps.google.com/?ll="+e.attendence_address.logout.lat+","+e.attendence_address.logout.lng,target:"_blank",children:e.attendence_address.logout.address}))),s=[s].concat(t),s=this.getArrayComponent(s,!1)}if("redirectToMap"in a&&a.redirectToMap){let t=[(0,M.jsx)("a",{href:"http://maps.google.com/?ll="+e.lat+","+e.lng,style:{display:"block"},target:"_blank",children:s})];s=this.getArrayComponent(t,!1)}}"isBold"in a&&a.isBold&&(s=this.getArrayComponent([(0,M.jsx)("b",{children:s})]))}if("isImage"in a&&a.isImage){let e={width:"isBanner"in a&&a.isBanner?"200px":"60px"};"isBanner"in a&&a.isBanner||(e.height="40px"),t.push((0,M.jsx)("img",{src:s,style:e,className:"table-data-image cursor-pointer",onClick:()=>this.handleImageClick(s)}))}else if("isRating"in a&&a.isRating)t.push((0,M.jsx)(i.A,{name:"read-only",value:s,readOnly:!0}));else{let n="";if("class_conditions"in a)for(let t=0;t<a.class_conditions.length;t++)if(a.class_conditions[t].value==e[a.class_conditions[t].key]){n=a.class_conditions[t].class_name;break}"isHtml"in a&&a.isHtml&&(s=this.getArrayComponent([(0,M.jsx)("span",{dangerouslySetInnerHTML:{__html:s}})])),n&&(s=this.getArrayComponent([(0,M.jsx)("span",{className:n,children:s})])),t.push(s)}}return t})),E(this,"getActionIcon",(e=>{if("icon"in e&&!1===e.icon)return e.label;switch(e.label){case"Edit":return(0,M.jsx)(V.A,{});case"Delete":return(0,M.jsx)(D.A,{});case"View":return(0,M.jsx)(O.A,{});case"+":return(0,M.jsx)(P.A,{});case"Download":return(0,M.jsx)(I.A,{});case"green_tick":return(0,M.jsx)(H.A,{});case"Accept":return(0,M.jsx)(F.A,{});case"Decline":return(0,M.jsx)(B.A,{});case"Close":return(0,M.jsx)(T.A,{});case"Return":return(0,M.jsx)(R.A,{});case"Assign":return(0,M.jsx)(W.A,{});case"Permissions":return(0,M.jsx)(L.A,{})}})),E(this,"handleActionButtonClick",((e,t)=>{"isDelete"in e&&e.isDelete?this.setState({deleteDialogOpen:!0,deleteRow:t,deleteFun:e.onClick}):e.onClick(t)})),E(this,"handleClose",(()=>{this.setState({deleteDialogOpen:!1})})),E(this,"handleDelete",(()=>{this.state.deleteFun(this.state.deleteRow),this.setState({deleteDialogOpen:!1})})),E(this,"checkActionBtnCondtion",((e,t)=>{let a=[];for(let s=0;s<e.length;s++)"con_type"in e[s]?t[e[s].key]!=e[s].value&&a.push(!0):t[e[s].key]==e[s].value&&a.push(!0);return a.length==e.length})),E(this,"getColumnStyle",(e=>{let t={};return"width"in e&&(t.width=e.width),t})),E(this,"getActionValueStyle",(e=>{let t="";for(let a=0;a<this.state.actionValueColorConditions.length;a++)if(this.state.actionValueColorConditions[a].value==e){t=this.state.actionValueColorConditions[a].color;break}return t?{color:t}:{}})),E(this,"getSerialNo",((e,t,a)=>{let s=(t-1)*a+e+1;return s<10?"0"+s:s})),E(this,"handleLimitChange",(e=>{this.setState({manualLimit:e.target.value,showAll:"all"==e.target.value},(()=>{this.props.handlePagination("all"==e.target.value?1:this.state.page,this.state.showAll)}))})),E(this,"handleImageClick",(e=>{this.setState({imageDialogOpen:!0,imagePath:e})})),E(this,"handleImageDialogClose",(()=>{this.setState({imageDialogOpen:!1})})),this.state={minWidth:this.props.minWidth,columns:this.props.columns,rows:this.props.rows,page:this.props.page,limit:this.props.limit,total:this.props.total,columnAlign:this.props.columnAlign,rowAlign:this.props.rowAlign,haveAction:this.props.haveAction,actions:this.props.actions,actionValue:this.props.actionValue,deleteDialogOpen:!1,deleteRow:null,deleteFun:null,havePagination:this.props.havePagination,actionValueColorConditions:this.props.actionValueColorConditions,showSerialNo:this.props.showSerialNo,haveAllOption:this.props.haveAllOption,stickyHeader:this.props.stickyHeader,showAll:!1,manualLimit:this.props.limit,imageDialogOpen:!1,imagePath:""}}static getDerivedStateFromProps(e,t){let a={};return e.rows!==t.rows&&(a.rows=e.rows),e.page!==t.page&&(a.page=e.page),e.total!==t.total&&(a.total=e.total),e.actions!==t.actions&&(a.actions=e.actions),a}render(){const{rows:e,columnAlign:t,rowAlign:a,total:n,limit:i,page:w,columns:b,actions:S,havePagination:D,haveAllOption:V,showAll:O,stickyHeader:P}=this.state,I=O?1:Math.ceil(n/i);return(0,M.jsxs)(x.A,{component:C.A,className:"ratn-table-wrapper",sx:{maxHeight:500},children:[(0,M.jsxs)(u.A,{sx:{minWidth:500},stickyHeader:P,children:[(0,M.jsx)(g.A,{className:"ratn-table-header",children:(0,M.jsxs)(j.A,{children:[this.state.showSerialNo?(0,M.jsx)(A.A,{align:t,children:"#"}):null,b.map(((e,a)=>(0,M.jsxs)(A.A,{align:t,sx:this.getColumnStyle(e),className:"className"in e?e.className:"",children:[e.display_name,"helper_text"in e?(0,M.jsx)("p",{className:"table-column-helper-text",children:e.helper_text}):null]},a))),S.length||""!=this.state.actionValue?(0,M.jsx)(A.A,{align:t,sx:{width:100},children:"Actions"}):null]})}),(0,M.jsxs)(m.A,{children:[e.map(((e,t)=>(0,M.jsxs)(j.A,{children:[this.state.showSerialNo?(0,M.jsx)(A.A,{align:a,children:this.getSerialNo(t,w,i)}):null,this.getData(e).map(((e,s)=>(0,M.jsx)(A.A,{align:a,children:e},t+s))),S.length||""!=this.state.actionValue?(0,M.jsxs)(A.A,{align:a,className:"action_btn",children:[S.length?(0,M.jsx)(l.A,{spacing:1,direction:"row",justifyContent:a,alignItems:a,children:S.map(((t,a)=>(0,M.jsx)(s.Fragment,{children:"show"in t&&!t.show||!("conditions"in t&&this.checkActionBtnCondtion(t.conditions,e)||!("conditions"in t))?null:(0,M.jsx)(o.A,{variant:"contained",color:t.color,onClick:()=>this.handleActionButtonClick(t,e),disabled:!!t.disabled&&t.disabled,children:this.getActionIcon(t)},"b"+a)},a)))}):null,""!=this.state.actionValue?(0,M.jsx)("span",{style:this.getActionValueStyle(e[this.state.actionValue]),children:e[this.state.actionValue]}):null]}):null]},t))),0==e.length?(0,M.jsx)(j.A,{children:(0,M.jsx)(A.A,{align:"center",colSpan:b.length+S.length+(this.state.showSerialNo?1:0),children:"No data found."})}):null]}),(0,M.jsx)(y.A,{children:(0,M.jsx)(j.A,{})})]}),n>0&&D?(0,M.jsxs)(c.Ay,{container:!0,alignItems:"right",className:"ratn-table-footer",children:[V?(0,M.jsx)(c.Ay,{item:!0,xs:2,children:(0,M.jsx)(r.A,{size:"small",children:(0,M.jsxs)(d.A,{className:"input-inner",value:this.state.manualLimit,fullWidth:!0,onChange:this.handleLimitChange,children:[(0,M.jsx)(h.A,{value:i,children:i}),(0,M.jsx)(h.A,{value:"all",children:"All"})]})})}):null,(0,M.jsx)(c.Ay,{item:!0,xs:V?10:12,children:(0,M.jsx)(p.A,{count:I,page:w,onChange:this.handleChangePage})})]}):null,(0,M.jsxs)(f.A,{className:"ratn-dialog-footer delete_modal",open:this.state.deleteDialogOpen,onClose:this.handleClose,fullWidth:!0,maxWidth:"md",children:[(0,M.jsx)(N.A,{children:"Delete"}),(0,M.jsx)(_.A,{children:(0,M.jsx)(v.A,{id:"alert-dialog-slide-description",children:"Are you sure want to delete this record?"})}),(0,M.jsx)(k.A,{children:(0,M.jsxs)("div",{className:"ratn-footer-buttons",children:[(0,M.jsx)(o.A,{onClick:this.handleClose,className:"close-button",children:"Close"}),(0,M.jsx)(o.A,{onClick:this.handleDelete,className:"conf-button",children:"Yes, Confirm"})]})})]}),(0,M.jsxs)(f.A,{onClose:this.handleImageDialogClose,open:this.state.imageDialogOpen,children:[(0,M.jsx)(N.A,{children:(0,M.jsx)(T.A,{sx:{cursor:"pointer",float:"right",marginTop:"5px",width:"30px"},onClick:this.handleImageDialogClose})}),(0,M.jsx)(_.A,{children:(0,M.jsx)("img",{src:this.state.imagePath,width:500,height:350})})]})]})}}q.defaultProps={minWidth:500,columns:[],rows:[],page:0,limit:0,total:0,columnAlign:"left",rowAlign:"left",haveAction:!0,actions:[],havePagination:!0,actionValue:"",actionValueColorConditions:[],showSerialNo:!0,haveAllOption:!1,loading:!1,stickyHeader:!0},q.propTypes={minWidth:b().number,columns:b().array,actionValueColorConditions:b().array,rows:b().array,page:b().number,limit:b().number,total:b().number,columnAlign:b().string,actionValue:b().string,rowAlign:b().string,haveAction:b().bool,actions:b().array,havePagination:b().bool,showSerialNo:b().bool,loading:b().bool,stickyHeader:b().bool};const G=q}}]);