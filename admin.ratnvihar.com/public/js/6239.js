"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6239],{71558:(e,t,s)=>{s.d(t,{Ah:()=>r,CF:()=>c,KM:()=>h,U0:()=>o,aG:()=>g,ep:()=>d,rY:()=>l});var n=s(80325),i=s(31249),a=s(45892);const l=e=>(e=(0,a.x0)(e,!0),t=>{n.A.get("/superadmin/orders".concat(e)).then((e=>{e.data.success&&t({type:i.yK,payload:e.data.data})})).catch((e=>{}))}),o=e=>t=>{n.A.get("/superadmin/orders/fetch/".concat(e)).then((e=>{e.data.success&&t({type:i.Qh,payload:e.data.data})})).catch((e=>{}))},r=e=>n.A.get("/superadmin/orders/fetch/".concat(e)),c=e=>(e=(0,a.x0)(e,!0),n.A.get("/superadmin/user-list".concat(e))),h=(e,t)=>n.A.post("/superadmin/orders/update-status/".concat(e),t),d=(e,t)=>n.A.post("/superadmin/orders/sale-proceed/".concat(e),t),g=e=>n.A.post("/superadmin/orders/update-products",e)},27874:(e,t,s)=>{s.d(t,{A:()=>K});var n=s(63696),i=s(36846),a=s(46133),l=s(72839),o=s(49746),r=s(45271),c=s(41795),h=s(26365),d=s(78976),g=s(2626),p=s(98993),u=s(73947),m=s(10228),A=s(45166),x=s(2598),j=s(55186),y=s(25606),C=s(24019),w=s(62688),f=s.n(w),b=s(89429),k=s(29443),_=s(52805),v=s(79859),N=s(43191),D=s(45892),S=s(16638),V=s(97217),P=s(60669),O=s(86074),I=s(35008),B=s(78061),H=s(81117),F=s(51223),W=s(37001),L=s(37086),R=s(55063),M=s(71086),T=s(62540);function Y(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}class G extends n.Component{constructor(e){super(e),Y(this,"handleChangePage",((e,t)=>{this.props.handlePagination(t)})),Y(this,"getArrayComponent",((e,t)=>(0,T.jsx)(T.Fragment,{children:e.map(((e,s)=>(0,T.jsxs)(n.Fragment,{children:[e,!1!==t?(0,T.jsx)(T.Fragment,{children:" "}):""]},s)))}))),Y(this,"getData",(e=>{let t=[];for(let s of this.state.columns){let n=s.name in e?e[s.name]:"";if(Array.isArray(n))if("show_tag"in s){let e=[];for(let t=0;t<n.length;t++)e.push((0,T.jsx)(i.A,{label:n[t][s.array_key],color:"primary"}));n=this.getArrayComponent(e)}else{let e=[];if("array_key"in s){for(let t=0;t<n.length;t++)e.push(n[t][s.array_key]);n=e}n=(0,D.Gp)(n.join("\n"))}else{if("show_tag"in s){let t="primary";if("color_conditions"in s){for(let n=0;n<s.color_conditions.length;n++)if(s.color_conditions[n].value==e[s.color_conditions[n].key]){t=s.color_conditions[n].color;break}}else"Status"==s.display_name&&(t=(0,D.qY)(n));if(n=n?(0,T.jsx)(i.A,{label:n,color:t}):"","showAttendenceAddress"in s&&s.showAttendenceAddress){let t=[];e.attendence_address&&e.attendence_address.login&&(t.push((0,T.jsx)("a",{href:"http://maps.google.com/?ll="+e.attendence_address.login.lat+","+e.attendence_address.login.lng,style:{display:"block"},target:"_blank",children:e.attendence_address.login.address})),e.attendence_address.logout&&t.push((0,T.jsx)("a",{href:"http://maps.google.com/?ll="+e.attendence_address.logout.lat+","+e.attendence_address.logout.lng,target:"_blank",children:e.attendence_address.logout.address}))),n=[n].concat(t),n=this.getArrayComponent(n,!1)}if("redirectToMap"in s&&s.redirectToMap){let t=[(0,T.jsx)("a",{href:"http://maps.google.com/?ll="+e.lat+","+e.lng,style:{display:"block"},target:"_blank",children:n})];n=this.getArrayComponent(t,!1)}}"isBold"in s&&s.isBold&&(n=this.getArrayComponent([(0,T.jsx)("b",{children:n})]))}if("isImage"in s&&s.isImage){let e={width:"isBanner"in s&&s.isBanner?"200px":"60px"};"isBanner"in s&&s.isBanner||(e.height="40px"),t.push((0,T.jsx)("img",{src:n,style:e,className:"table-data-image cursor-pointer",onClick:()=>this.handleImageClick(n)}))}else if("isRating"in s&&s.isRating)t.push((0,T.jsx)(a.A,{name:"read-only",value:n,readOnly:!0}));else{let i="";if("class_conditions"in s)for(let t=0;t<s.class_conditions.length;t++)if(s.class_conditions[t].value==e[s.class_conditions[t].key]){i=s.class_conditions[t].class_name;break}"isHtml"in s&&s.isHtml&&(n=this.getArrayComponent([(0,T.jsx)("span",{dangerouslySetInnerHTML:{__html:n}})])),i&&(n=this.getArrayComponent([(0,T.jsx)("span",{className:i,children:n})])),t.push(n)}}return t})),Y(this,"getActionIcon",(e=>{if("icon"in e&&!1===e.icon)return e.label;switch(e.label){case"Edit":return(0,T.jsx)(V.A,{});case"Delete":return(0,T.jsx)(S.A,{});case"View":return(0,T.jsx)(P.A,{});case"+":return(0,T.jsx)(O.A,{});case"Download":return(0,T.jsx)(I.A,{});case"green_tick":return(0,T.jsx)(B.A,{});case"Accept":return(0,T.jsx)(H.A,{});case"Decline":return(0,T.jsx)(F.A,{});case"Close":return(0,T.jsx)(W.A,{});case"Return":return(0,T.jsx)(L.A,{});case"Assign":return(0,T.jsx)(R.A,{});case"Permissions":return(0,T.jsx)(M.A,{})}})),Y(this,"handleActionButtonClick",((e,t)=>{"isDelete"in e&&e.isDelete?this.setState({deleteDialogOpen:!0,deleteRow:t,deleteFun:e.onClick}):e.onClick(t)})),Y(this,"handleClose",(()=>{this.setState({deleteDialogOpen:!1})})),Y(this,"handleDelete",(()=>{this.state.deleteFun(this.state.deleteRow),this.setState({deleteDialogOpen:!1})})),Y(this,"checkActionBtnCondtion",((e,t)=>{let s=[];for(let n=0;n<e.length;n++)"con_type"in e[n]?t[e[n].key]!=e[n].value&&s.push(!0):t[e[n].key]==e[n].value&&s.push(!0);return s.length==e.length})),Y(this,"getColumnStyle",(e=>{let t={};return"width"in e&&(t.width=e.width),t})),Y(this,"getActionValueStyle",(e=>{let t="";for(let s=0;s<this.state.actionValueColorConditions.length;s++)if(this.state.actionValueColorConditions[s].value==e){t=this.state.actionValueColorConditions[s].color;break}return t?{color:t}:{}})),Y(this,"getSerialNo",((e,t,s)=>{let n=(t-1)*s+e+1;return n<10?"0"+n:n})),Y(this,"handleLimitChange",(e=>{this.setState({manualLimit:e.target.value,showAll:"all"==e.target.value},(()=>{this.props.handlePagination("all"==e.target.value?1:this.state.page,this.state.showAll)}))})),Y(this,"handleImageClick",(e=>{this.setState({imageDialogOpen:!0,imagePath:e})})),Y(this,"handleImageDialogClose",(()=>{this.setState({imageDialogOpen:!1})})),this.state={minWidth:this.props.minWidth,columns:this.props.columns,rows:this.props.rows,page:this.props.page,limit:this.props.limit,total:this.props.total,columnAlign:this.props.columnAlign,rowAlign:this.props.rowAlign,haveAction:this.props.haveAction,actions:this.props.actions,actionValue:this.props.actionValue,deleteDialogOpen:!1,deleteRow:null,deleteFun:null,havePagination:this.props.havePagination,actionValueColorConditions:this.props.actionValueColorConditions,showSerialNo:this.props.showSerialNo,haveAllOption:this.props.haveAllOption,stickyHeader:this.props.stickyHeader,showAll:!1,manualLimit:this.props.limit,imageDialogOpen:!1,imagePath:""}}static getDerivedStateFromProps(e,t){let s={};return e.rows!==t.rows&&(s.rows=e.rows),e.page!==t.page&&(s.page=e.page),e.total!==t.total&&(s.total=e.total),e.actions!==t.actions&&(s.actions=e.actions),s}render(){const{rows:e,columnAlign:t,rowAlign:s,total:i,limit:a,page:w,columns:f,actions:D,havePagination:S,haveAllOption:V,showAll:P,stickyHeader:O}=this.state,I=P?1:Math.ceil(i/a);return(0,T.jsxs)(x.A,{component:C.A,className:"ratn-table-wrapper",sx:{maxHeight:500},children:[(0,T.jsxs)(p.A,{sx:{minWidth:500},stickyHeader:O,children:[(0,T.jsx)(u.A,{className:"ratn-table-header",children:(0,T.jsxs)(y.A,{children:[this.state.showSerialNo?(0,T.jsx)(A.A,{align:t,children:"#"}):null,f.map(((e,s)=>(0,T.jsxs)(A.A,{align:t,sx:this.getColumnStyle(e),className:"className"in e?e.className:"",children:[e.display_name,"helper_text"in e?(0,T.jsx)("p",{className:"table-column-helper-text",children:e.helper_text}):null]},s))),D.length||""!=this.state.actionValue?(0,T.jsx)(A.A,{align:t,sx:{width:100},children:"Actions"}):null]})}),(0,T.jsxs)(m.A,{children:[e.map(((e,t)=>(0,T.jsxs)(y.A,{children:[this.state.showSerialNo?(0,T.jsx)(A.A,{align:s,children:this.getSerialNo(t,w,a)}):null,this.getData(e).map(((e,n)=>(0,T.jsx)(A.A,{align:s,children:e},t+n))),D.length||""!=this.state.actionValue?(0,T.jsxs)(A.A,{align:s,className:"action_btn",children:[D.length?(0,T.jsx)(l.A,{spacing:1,direction:"row",justifyContent:s,alignItems:s,children:D.map(((t,s)=>(0,T.jsx)(n.Fragment,{children:"show"in t&&!t.show||!("conditions"in t&&this.checkActionBtnCondtion(t.conditions,e)||!("conditions"in t))?null:(0,T.jsx)(o.A,{variant:"contained",color:t.color,onClick:()=>this.handleActionButtonClick(t,e),disabled:!!t.disabled&&t.disabled,children:this.getActionIcon(t)},"b"+s)},s)))}):null,""!=this.state.actionValue?(0,T.jsx)("span",{style:this.getActionValueStyle(e[this.state.actionValue]),children:e[this.state.actionValue]}):null]}):null]},t))),0==e.length?(0,T.jsx)(y.A,{children:(0,T.jsx)(A.A,{align:"center",colSpan:f.length+D.length+(this.state.showSerialNo?1:0),children:"No data found."})}):null]}),(0,T.jsx)(j.A,{children:(0,T.jsx)(y.A,{})})]}),i>0&&S?(0,T.jsxs)(r.Ay,{container:!0,alignItems:"right",className:"ratn-table-footer",children:[V?(0,T.jsx)(r.Ay,{item:!0,xs:2,children:(0,T.jsx)(c.A,{size:"small",children:(0,T.jsxs)(h.A,{className:"input-inner",value:this.state.manualLimit,fullWidth:!0,onChange:this.handleLimitChange,children:[(0,T.jsx)(d.A,{value:a,children:a}),(0,T.jsx)(d.A,{value:"all",children:"All"})]})})}):null,(0,T.jsx)(r.Ay,{item:!0,xs:V?10:12,children:(0,T.jsx)(g.A,{count:I,page:w,onChange:this.handleChangePage})})]}):null,(0,T.jsxs)(b.A,{className:"ratn-dialog-footer delete_modal",open:this.state.deleteDialogOpen,onClose:this.handleClose,fullWidth:!0,maxWidth:"md",children:[(0,T.jsx)(N.A,{children:"Delete"}),(0,T.jsx)(_.A,{children:(0,T.jsx)(v.A,{id:"alert-dialog-slide-description",children:"Are you sure want to delete this record?"})}),(0,T.jsx)(k.A,{children:(0,T.jsxs)("div",{className:"ratn-footer-buttons",children:[(0,T.jsx)(o.A,{onClick:this.handleClose,className:"close-button",children:"Close"}),(0,T.jsx)(o.A,{onClick:this.handleDelete,className:"conf-button",children:"Yes, Confirm"})]})})]}),(0,T.jsxs)(b.A,{onClose:this.handleImageDialogClose,open:this.state.imageDialogOpen,children:[(0,T.jsx)(N.A,{children:(0,T.jsx)(W.A,{sx:{cursor:"pointer",float:"right",marginTop:"5px",width:"30px"},onClick:this.handleImageDialogClose})}),(0,T.jsx)(_.A,{children:(0,T.jsx)("img",{src:this.state.imagePath,width:500,height:350})})]})]})}}G.defaultProps={minWidth:500,columns:[],rows:[],page:0,limit:0,total:0,columnAlign:"left",rowAlign:"left",haveAction:!0,actions:[],havePagination:!0,actionValue:"",actionValueColorConditions:[],showSerialNo:!0,haveAllOption:!1,loading:!1,stickyHeader:!0},G.propTypes={minWidth:f().number,columns:f().array,actionValueColorConditions:f().array,rows:f().array,page:f().number,limit:f().number,total:f().number,columnAlign:f().string,actionValue:f().string,rowAlign:f().string,haveAction:f().bool,actions:f().array,havePagination:f().bool,showSerialNo:f().bool,loading:f().bool,stickyHeader:f().bool};const K=G}}]);