"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8129],{36213:(e,a,s)=>{s.d(a,{A:()=>S});var t=s(49257),i=s(68102),r=s(63696),n=s(68017),l=s(81023),c=s(91785),o=s(28362),d=s(90013),m=s(2512),h=s(46733);function p(e){return(0,h.A)("MuiCircularProgress",e)}(0,s(29009).A)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var u=s(62540);const x=["className","color","disableShrink","size","style","thickness","value","variant"];let v,A,f,y,_=e=>e;const j=(0,c.i7)(v||(v=_`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),g=(0,c.i7)(A||(A=_`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),b=(0,m.Ay)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,a)=>{const{ownerState:s}=e;return[a.root,a[s.variant],a[`color${(0,o.A)(s.color)}`]]}})((({ownerState:e,theme:a})=>(0,i.A)({display:"inline-block"},"determinate"===e.variant&&{transition:a.transitions.create("transform")},"inherit"!==e.color&&{color:(a.vars||a).palette[e.color].main})),(({ownerState:e})=>"indeterminate"===e.variant&&(0,c.AH)(f||(f=_`
      animation: ${0} 1.4s linear infinite;
    `),j))),N=(0,m.Ay)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,a)=>a.svg})({display:"block"}),k=(0,m.Ay)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,a)=>{const{ownerState:s}=e;return[a.circle,a[`circle${(0,o.A)(s.variant)}`],s.disableShrink&&a.circleDisableShrink]}})((({ownerState:e,theme:a})=>(0,i.A)({stroke:"currentColor"},"determinate"===e.variant&&{transition:a.transitions.create("stroke-dashoffset")},"indeterminate"===e.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:e})=>"indeterminate"===e.variant&&!e.disableShrink&&(0,c.AH)(y||(y=_`
      animation: ${0} 1.4s ease-in-out infinite;
    `),g))),S=r.forwardRef((function(e,a){const s=(0,d.A)({props:e,name:"MuiCircularProgress"}),{className:r,color:c="primary",disableShrink:m=!1,size:h=40,style:v,thickness:A=3.6,value:f=0,variant:y="indeterminate"}=s,_=(0,t.A)(s,x),j=(0,i.A)({},s,{color:c,disableShrink:m,size:h,thickness:A,value:f,variant:y}),g=(e=>{const{classes:a,variant:s,color:t,disableShrink:i}=e,r={root:["root",s,`color${(0,o.A)(t)}`],svg:["svg"],circle:["circle",`circle${(0,o.A)(s)}`,i&&"circleDisableShrink"]};return(0,l.A)(r,p,a)})(j),S={},w={},P={};if("determinate"===y){const e=2*Math.PI*((44-A)/2);S.strokeDasharray=e.toFixed(3),P["aria-valuenow"]=Math.round(f),S.strokeDashoffset=`${((100-f)/100*e).toFixed(3)}px`,w.transform="rotate(-90deg)"}return(0,u.jsx)(b,(0,i.A)({className:(0,n.A)(g.root,r),style:(0,i.A)({width:h,height:h},w,v),ownerState:j,ref:a,role:"progressbar"},P,_,{children:(0,u.jsx)(N,{className:g.svg,ownerState:j,viewBox:"22 22 44 44",children:(0,u.jsx)(k,{className:g.circle,style:S,ownerState:j,cx:44,cy:44,r:(44-A)/2,fill:"none",strokeWidth:A})})}))}))},4945:(e,a,s)=>{s.d(a,{T:()=>r});var t=s(80325),i=s(45892);const r=e=>(e=(0,i.x0)(e,!0),t.A.get("/superadmin/my-performance".concat(e)))},88129:(e,a,s)=>{s.r(a),s.d(a,{default:()=>j});var t=s(63696),i=s(52821),r=s(61095),n=s(45271),l=s(41795),c=s(36122),o=s(13007),d=s(36213),m=s(88441),h=s(61176),p=s(66098),u=s(50977),x=s(27874),v=s(4945),A=(s(89667),s(51449)),f=(s(45892),s(62540));function y(e,a,s){return a in e?Object.defineProperty(e,a,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[a]=s,e}class _ extends t.Component{constructor(e){super(e),y(this,"thisMonthPerformance",(async()=>{let e=await(0,v.T)({current:1});e.data.success&&this.setState({performance:e.data.data})})),y(this,"preMonthsPerformance",(async()=>{let e=await(0,v.T)({months:6});e.data.success&&this.setState({prev_month_performance:e.data.data})})),this.state={performance:null,prev_month_performance:[]},this.columns=[{name:"month",display_name:"Month"},{name:"sale_target_display",display_name:"Target Amt"},{name:"sale_achived_display",display_name:"Achieve Amt"},{name:"sale_achived_percent_display",display_name:"Achieve %"},{name:"visit_target",display_name:"Target Visit"},{name:"visit_achived",display_name:"Achieve Visit"},{name:"visit_achived_percent_display",display_name:"Achieve %"}]}componentDidMount(){this.thisMonthPerformance(),this.preMonthsPerformance()}static getDerivedStateFromProps(e,a){return{}}render(){const{performance:e,prev_month_performance:a}=this.state;return(0,f.jsx)(p.A,{children:e||a?(0,f.jsxs)(f.Fragment,{children:[e?(0,f.jsx)("div",{className:"calender-wrapper",children:(0,f.jsx)(p.A,{title:"Performance of the Month",children:(0,f.jsx)(r.A,{sx:{flexGrow:1,m:.5},className:"ratn-dialog-inner",children:(0,f.jsxs)(n.Ay,{container:!0,spacing:2,className:"tax-input loans_view p_view",children:[(0,f.jsx)(n.Ay,{item:!0,xs:12,md:4,className:"create-input",children:(0,f.jsxs)(n.Ay,{container:!0,spacing:1,className:"",children:[(0,f.jsx)(n.Ay,{item:!0,xs:12,className:"create-input",children:(0,f.jsx)("b",{children:"Achieved"})}),(0,f.jsx)(n.Ay,{item:!0,xs:6,md:12,className:"create-input",children:(0,f.jsx)(l.A,{fullWidth:!0,sx:{m:1},className:"left-radius",children:(0,f.jsx)(c.A,{label:"Sale Achieved",variant:"outlined",value:e.sale_achived_display,InputProps:{endAdornment:(0,f.jsx)(o.A,{position:"end",className:"i-icon-right",children:e.sale_achived_percent_display}),className:"non_disable_text"},disabled:!0})})}),(0,f.jsx)(n.Ay,{item:!0,xs:6,md:12,className:"create-input",children:(0,f.jsx)(l.A,{fullWidth:!0,sx:{m:1},className:"left-radius",children:(0,f.jsx)(c.A,{label:"Visit Achieved",variant:"outlined",value:e.visit_achived,InputProps:{endAdornment:(0,f.jsx)(o.A,{position:"end",className:"i-icon-right",children:e.visit_achived_percent_display}),className:"non_disable_text"},disabled:!0})})})]})}),(0,f.jsx)(n.Ay,{item:!0,xs:12,md:4,className:"create-input",children:(0,f.jsxs)(n.Ay,{container:!0,spacing:1,className:"",children:[(0,f.jsx)(n.Ay,{item:!0,xs:12,className:"create-input",children:(0,f.jsx)("b",{children:"Remaining"})}),(0,f.jsx)(n.Ay,{item:!0,xs:6,md:12,className:"create-input",children:(0,f.jsx)(l.A,{fullWidth:!0,sx:{m:1},className:"left-radius",children:(0,f.jsx)(c.A,{label:"Sale Remaining",variant:"outlined",value:e.sale_due_display,InputProps:{className:"non_disable_text"},disabled:!0})})}),(0,f.jsx)(n.Ay,{item:!0,xs:6,md:12,className:"create-input",children:(0,f.jsx)(l.A,{fullWidth:!0,sx:{m:1},className:"left-radius",children:(0,f.jsx)(c.A,{label:"Visit Remaining",variant:"outlined",value:e.visit_due,InputProps:{className:"non_disable_text"},disabled:!0})})})]})}),(0,f.jsx)(n.Ay,{item:!0,xs:12,md:4,className:"create-input",children:(0,f.jsxs)(n.Ay,{container:!0,spacing:1,className:"",children:[(0,f.jsx)(n.Ay,{item:!0,xs:12,className:"create-input",children:(0,f.jsx)("b",{children:"Target"})}),(0,f.jsx)(n.Ay,{item:!0,xs:6,md:12,className:"create-input",children:(0,f.jsx)(l.A,{fullWidth:!0,sx:{m:1},className:"left-radius",children:(0,f.jsx)(c.A,{label:"Sale Target",variant:"outlined",value:e.sale_target_display,InputProps:{className:"non_disable_text"},disabled:!0})})}),(0,f.jsx)(n.Ay,{item:!0,xs:6,md:12,className:"create-input",children:(0,f.jsx)(l.A,{fullWidth:!0,sx:{m:1},className:"left-radius",children:(0,f.jsx)(c.A,{label:"Visit Target",variant:"outlined",value:e.visit_target,InputProps:{className:"non_disable_text"},disabled:!0})})})]})})]})})})}):null,(0,f.jsx)("div",{className:"perv_months_perfrmnc",children:(0,f.jsx)(p.A,{title:"Previous 6 Months Performance",children:(0,f.jsx)(n.Ay,{container:!0,spacing:h.iL,children:(0,f.jsx)(x.A,{columns:this.columns,rows:a,page:1,limit:6,total:6,havePagination:!1,showSerialNo:!1})})})})]}):(0,f.jsx)(n.Ay,{container:!0,justifyContent:"center",children:(0,f.jsx)(d.A,{})})})}}const j=(0,A.Gh)((0,u.A)((0,i.connect)((e=>({})),(e=>({dispatch:e,actions:(0,m.bindActionCreators)({},e)})))(_)))}}]);