"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9383],{16078:(e,t,s)=>{s.d(t,{Tz:()=>o,Xs:()=>r,ef:()=>h,pe:()=>l,uA:()=>c});var a=s(80325),i=s(34364),n=s(45892);const l=e=>(e=(0,n.x0)(e,!0),t=>{a.A.get("/superadmin/employees".concat(e)).then((e=>{e.data.success&&t({type:i.Rk,payload:e.data.data})})).catch((e=>{}))}),o=e=>t=>{a.A.post("/superadmin/employees/store",e).then((e=>{t({type:i.wR,payload:e.data})})).catch((e=>{}))},r=(e,t)=>(t=t||"",s=>{a.A.get("/superadmin/employees/fetch/".concat(e,"?role_id=").concat(t)).then((e=>{e.data.success&&s({type:i.xQ,payload:e.data.data})})).catch((e=>{}))}),c=(e,t)=>s=>{a.A.post("/superadmin/employees/update/".concat(e),t).then((e=>{s({type:i.SV,payload:e.data})})).catch((e=>{}))},h=(e,t)=>s=>{a.A.delete("/superadmin/employees/delete/".concat(e),t).then((e=>{s({type:i.W8,payload:e.data})})).catch((e=>{}))}},99383:(e,t,s)=>{s.r(t),s.d(t,{default:()=>x});var a=s(63696),i=s(52821),n=s(49746),l=s(45271),o=s(88441),r=s(61176),c=s(66098),h=s(50977),d=s(16078),p=s(27874),m=s(34364),g=s(62540);function u(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}class A extends a.Component{constructor(e){super(e),u(this,"loadListData",(()=>{this.props.actions.employeeList(this.state.queryParams)})),u(this,"handlePagination",(e=>{this.state.queryParams.page=e,this.loadListData()})),u(this,"handleEdit",(e=>{this.props.navigate("edit/"+e.id)})),u(this,"handleDelete",(e=>{this.props.actions.employeeDelete(e.id)})),u(this,"handleView",(e=>{this.props.navigate("view/"+e.id)})),this.state={...this.props,queryParams:{page:1,limit:50,role_id:10},deleteSuccess:this.props.deleteSuccess},this.columns=[{name:"profile_image",display_name:"Image",isImage:!0},{name:"name",display_name:"Worker Name"},{name:"mobile",display_name:"Contact Number"}],this.tableActions=[{label:"Edit",onClick:this.handleEdit,color:"primary"},{label:"View",onClick:this.handleView,color:"primary"}]}componentDidMount(){this.loadListData()}static getDerivedStateFromProps(e,t){let s={};return e.items!==t.items&&(s.items=e.items),e.total!==t.total&&(s.total=e.total),e.deleteSuccess!==t.deleteSuccess&&(s.deleteSuccess=e.deleteSuccess),s}componentDidUpdate(e,t){if(this.state.deleteSuccess){const{dispatch:e}=this.props;e({type:m.ey}),this.handlePagination(1)}}render(){return(0,g.jsx)(c.A,{title:"Workers",secondary:(0,g.jsx)(n.A,{variant:"contained",onClick:()=>this.props.navigate("create"),children:"Add"}),children:(0,g.jsx)(l.Ay,{container:!0,spacing:r.iL,className:"abc",children:(0,g.jsx)(p.A,{columns:this.columns,rows:this.state.items,page:this.state.queryParams.page,limit:this.state.queryParams.limit,total:this.state.total,handlePagination:this.handlePagination,actions:this.tableActions})})})}}const x=(0,h.A)((0,i.connect)((e=>({items:e.superadmin.employee.items,total:e.superadmin.employee.total,deleteSuccess:e.superadmin.employee.deleteSuccess})),(e=>({dispatch:e,actions:(0,o.bindActionCreators)({employeeList:d.pe,employeeDelete:d.ef},e)})))(A))},27874:(e,t,s)=>{s.d(t,{A:()=>z});var a=s(63696),i=s(36846),n=s(46133),l=s(72839),o=s(49746),r=s(45271),c=s(41795),h=s(26365),d=s(78976),p=s(2626),m=s(98993),g=s(73947),u=s(10228),A=s(45166),x=s(2598),y=s(55186),j=s(25606),C=s(24019),w=s(62688),b=s.n(w),f=s(89429),k=s(29443),_=s(52805),v=s(79859),S=s(43191),D=s(45892),N=s(16638),P=s(97217),V=s(60669),O=s(86074),I=s(35008),L=s(78061),W=s(81117),B=s(51223),H=s(37001),F=s(37086),R=s(55063),q=s(71086),T=s(62540);function M(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}class E extends a.Component{constructor(e){super(e),M(this,"handleChangePage",((e,t)=>{this.props.handlePagination(t)})),M(this,"getArrayComponent",((e,t)=>(0,T.jsx)(T.Fragment,{children:e.map(((e,s)=>(0,T.jsxs)(a.Fragment,{children:[e,!1!==t?(0,T.jsx)(T.Fragment,{children:" "}):""]},s)))}))),M(this,"getData",(e=>{let t=[];for(let s of this.state.columns){let a=s.name in e?e[s.name]:"";if(Array.isArray(a))if("show_tag"in s){let e=[];for(let t=0;t<a.length;t++)e.push((0,T.jsx)(i.A,{label:a[t][s.array_key],color:"primary"}));a=this.getArrayComponent(e)}else{let e=[];if("array_key"in s){for(let t=0;t<a.length;t++)e.push(a[t][s.array_key]);a=e}a=(0,D.Gp)(a.join("\n"))}else{if("show_tag"in s){let t="primary";if("color_conditions"in s){for(let a=0;a<s.color_conditions.length;a++)if(s.color_conditions[a].value==e[s.color_conditions[a].key]){t=s.color_conditions[a].color;break}}else"Status"==s.display_name&&(t=(0,D.qY)(a));if(a=a?(0,T.jsx)(i.A,{label:a,color:t}):"","showAttendenceAddress"in s&&s.showAttendenceAddress){let t=[];e.attendence_address&&e.attendence_address.login&&(t.push((0,T.jsx)("a",{href:"http://maps.google.com/?ll="+e.attendence_address.login.lat+","+e.attendence_address.login.lng,style:{display:"block"},target:"_blank",children:e.attendence_address.login.address})),e.attendence_address.logout&&t.push((0,T.jsx)("a",{href:"http://maps.google.com/?ll="+e.attendence_address.logout.lat+","+e.attendence_address.logout.lng,target:"_blank",children:e.attendence_address.logout.address}))),a=[a].concat(t),a=this.getArrayComponent(a,!1)}if("redirectToMap"in s&&s.redirectToMap){let t=[(0,T.jsx)("a",{href:"http://maps.google.com/?ll="+e.lat+","+e.lng,style:{display:"block"},target:"_blank",children:a})];a=this.getArrayComponent(t,!1)}}"isBold"in s&&s.isBold&&(a=this.getArrayComponent([(0,T.jsx)("b",{children:a})]))}if("isImage"in s&&s.isImage){let e={width:"isBanner"in s&&s.isBanner?"200px":"60px"};"isBanner"in s&&s.isBanner||(e.height="40px"),t.push((0,T.jsx)("img",{src:a,style:e,className:"table-data-image cursor-pointer",onClick:()=>this.handleImageClick(a)}))}else if("isRating"in s&&s.isRating)t.push((0,T.jsx)(n.A,{name:"read-only",value:a,readOnly:!0}));else{let i="";if("class_conditions"in s)for(let t=0;t<s.class_conditions.length;t++)if(s.class_conditions[t].value==e[s.class_conditions[t].key]){i=s.class_conditions[t].class_name;break}"isHtml"in s&&s.isHtml&&(a=this.getArrayComponent([(0,T.jsx)("span",{dangerouslySetInnerHTML:{__html:a}})])),i&&(a=this.getArrayComponent([(0,T.jsx)("span",{className:i,children:a})])),t.push(a)}}return t})),M(this,"getActionIcon",(e=>{if("icon"in e&&!1===e.icon)return e.label;switch(e.label){case"Edit":return(0,T.jsx)(P.A,{});case"Delete":return(0,T.jsx)(N.A,{});case"View":return(0,T.jsx)(V.A,{});case"+":return(0,T.jsx)(O.A,{});case"Download":return(0,T.jsx)(I.A,{});case"green_tick":return(0,T.jsx)(L.A,{});case"Accept":return(0,T.jsx)(W.A,{});case"Decline":return(0,T.jsx)(B.A,{});case"Close":return(0,T.jsx)(H.A,{});case"Return":return(0,T.jsx)(F.A,{});case"Assign":return(0,T.jsx)(R.A,{});case"Permissions":return(0,T.jsx)(q.A,{})}})),M(this,"handleActionButtonClick",((e,t)=>{"isDelete"in e&&e.isDelete?this.setState({deleteDialogOpen:!0,deleteRow:t,deleteFun:e.onClick}):e.onClick(t)})),M(this,"handleClose",(()=>{this.setState({deleteDialogOpen:!1})})),M(this,"handleDelete",(()=>{this.state.deleteFun(this.state.deleteRow),this.setState({deleteDialogOpen:!1})})),M(this,"checkActionBtnCondtion",((e,t)=>{let s=[];for(let a=0;a<e.length;a++)"con_type"in e[a]?t[e[a].key]!=e[a].value&&s.push(!0):t[e[a].key]==e[a].value&&s.push(!0);return s.length==e.length})),M(this,"getColumnStyle",(e=>{let t={};return"width"in e&&(t.width=e.width),t})),M(this,"getActionValueStyle",(e=>{let t="";for(let s=0;s<this.state.actionValueColorConditions.length;s++)if(this.state.actionValueColorConditions[s].value==e){t=this.state.actionValueColorConditions[s].color;break}return t?{color:t}:{}})),M(this,"getSerialNo",((e,t,s)=>{let a=(t-1)*s+e+1;return a<10?"0"+a:a})),M(this,"handleLimitChange",(e=>{this.setState({manualLimit:e.target.value,showAll:"all"==e.target.value},(()=>{this.props.handlePagination("all"==e.target.value?1:this.state.page,this.state.showAll)}))})),M(this,"handleImageClick",(e=>{this.setState({imageDialogOpen:!0,imagePath:e})})),M(this,"handleImageDialogClose",(()=>{this.setState({imageDialogOpen:!1})})),this.state={minWidth:this.props.minWidth,columns:this.props.columns,rows:this.props.rows,page:this.props.page,limit:this.props.limit,total:this.props.total,columnAlign:this.props.columnAlign,rowAlign:this.props.rowAlign,haveAction:this.props.haveAction,actions:this.props.actions,actionValue:this.props.actionValue,deleteDialogOpen:!1,deleteRow:null,deleteFun:null,havePagination:this.props.havePagination,actionValueColorConditions:this.props.actionValueColorConditions,showSerialNo:this.props.showSerialNo,haveAllOption:this.props.haveAllOption,stickyHeader:this.props.stickyHeader,showAll:!1,manualLimit:this.props.limit,imageDialogOpen:!1,imagePath:""}}static getDerivedStateFromProps(e,t){let s={};return e.rows!==t.rows&&(s.rows=e.rows),e.page!==t.page&&(s.page=e.page),e.total!==t.total&&(s.total=e.total),e.actions!==t.actions&&(s.actions=e.actions),s}render(){const{rows:e,columnAlign:t,rowAlign:s,total:i,limit:n,page:w,columns:b,actions:D,havePagination:N,haveAllOption:P,showAll:V,stickyHeader:O}=this.state,I=V?1:Math.ceil(i/n);return(0,T.jsxs)(x.A,{component:C.A,className:"ratn-table-wrapper",sx:{maxHeight:500},children:[(0,T.jsxs)(m.A,{sx:{minWidth:500},stickyHeader:O,children:[(0,T.jsx)(g.A,{className:"ratn-table-header",children:(0,T.jsxs)(j.A,{children:[this.state.showSerialNo?(0,T.jsx)(A.A,{align:t,children:"#"}):null,b.map(((e,s)=>(0,T.jsxs)(A.A,{align:t,sx:this.getColumnStyle(e),className:"className"in e?e.className:"",children:[e.display_name,"helper_text"in e?(0,T.jsx)("p",{className:"table-column-helper-text",children:e.helper_text}):null]},s))),D.length||""!=this.state.actionValue?(0,T.jsx)(A.A,{align:t,sx:{width:100},children:"Actions"}):null]})}),(0,T.jsxs)(u.A,{children:[e.map(((e,t)=>(0,T.jsxs)(j.A,{children:[this.state.showSerialNo?(0,T.jsx)(A.A,{align:s,children:this.getSerialNo(t,w,n)}):null,this.getData(e).map(((e,a)=>(0,T.jsx)(A.A,{align:s,children:e},t+a))),D.length||""!=this.state.actionValue?(0,T.jsxs)(A.A,{align:s,className:"action_btn",children:[D.length?(0,T.jsx)(l.A,{spacing:1,direction:"row",justifyContent:s,alignItems:s,children:D.map(((t,s)=>(0,T.jsx)(a.Fragment,{children:"show"in t&&!t.show||!("conditions"in t&&this.checkActionBtnCondtion(t.conditions,e)||!("conditions"in t))?null:(0,T.jsx)(o.A,{variant:"contained",color:t.color,onClick:()=>this.handleActionButtonClick(t,e),disabled:!!t.disabled&&t.disabled,children:this.getActionIcon(t)},"b"+s)},s)))}):null,""!=this.state.actionValue?(0,T.jsx)("span",{style:this.getActionValueStyle(e[this.state.actionValue]),children:e[this.state.actionValue]}):null]}):null]},t))),0==e.length?(0,T.jsx)(j.A,{children:(0,T.jsx)(A.A,{align:"center",colSpan:b.length+D.length+(this.state.showSerialNo?1:0),children:"No data found."})}):null]}),(0,T.jsx)(y.A,{children:(0,T.jsx)(j.A,{})})]}),i>0&&N?(0,T.jsxs)(r.Ay,{container:!0,alignItems:"right",className:"ratn-table-footer",children:[P?(0,T.jsx)(r.Ay,{item:!0,xs:2,children:(0,T.jsx)(c.A,{size:"small",children:(0,T.jsxs)(h.A,{className:"input-inner",value:this.state.manualLimit,fullWidth:!0,onChange:this.handleLimitChange,children:[(0,T.jsx)(d.A,{value:n,children:n}),(0,T.jsx)(d.A,{value:"all",children:"All"})]})})}):null,(0,T.jsx)(r.Ay,{item:!0,xs:P?10:12,children:(0,T.jsx)(p.A,{count:I,page:w,onChange:this.handleChangePage})})]}):null,(0,T.jsxs)(f.A,{className:"ratn-dialog-footer delete_modal",open:this.state.deleteDialogOpen,onClose:this.handleClose,fullWidth:!0,maxWidth:"md",children:[(0,T.jsx)(S.A,{children:"Delete"}),(0,T.jsx)(_.A,{children:(0,T.jsx)(v.A,{id:"alert-dialog-slide-description",children:"Are you sure want to delete this record?"})}),(0,T.jsx)(k.A,{children:(0,T.jsxs)("div",{className:"ratn-footer-buttons",children:[(0,T.jsx)(o.A,{onClick:this.handleClose,className:"close-button",children:"Close"}),(0,T.jsx)(o.A,{onClick:this.handleDelete,className:"conf-button",children:"Yes, Confirm"})]})})]}),(0,T.jsxs)(f.A,{onClose:this.handleImageDialogClose,open:this.state.imageDialogOpen,children:[(0,T.jsx)(S.A,{children:(0,T.jsx)(H.A,{sx:{cursor:"pointer",float:"right",marginTop:"5px",width:"30px"},onClick:this.handleImageDialogClose})}),(0,T.jsx)(_.A,{children:(0,T.jsx)("img",{src:this.state.imagePath,width:500,height:350})})]})]})}}E.defaultProps={minWidth:500,columns:[],rows:[],page:0,limit:0,total:0,columnAlign:"left",rowAlign:"left",haveAction:!0,actions:[],havePagination:!0,actionValue:"",actionValueColorConditions:[],showSerialNo:!0,haveAllOption:!1,loading:!1,stickyHeader:!0},E.propTypes={minWidth:b().number,columns:b().array,actionValueColorConditions:b().array,rows:b().array,page:b().number,limit:b().number,total:b().number,columnAlign:b().string,actionValue:b().string,rowAlign:b().string,haveAction:b().bool,actions:b().array,havePagination:b().bool,showSerialNo:b().bool,loading:b().bool,stickyHeader:b().bool};const z=E}}]);