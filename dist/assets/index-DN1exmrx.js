import{u as L,L as w}from"./useLoading-CGaVlP88.js";import{B as S}from"./BgBoard-BijZsrlh.js";import{_ as B,r as l,o as f,u as C,j as _,g as r,m as k,f as s,F as h,l as N,c as n,e as A,w as x,h as I,t as T,p as z,i as W,b as m}from"./index-CanqdiPq.js";import{g as E}from"./article-D_VLH-gR.js";import{i as V}from"./index-CFduwF1Z.js";import"./request-n9dUwLq9.js";const g=a=>(z("data-v-0d33fec7"),a=a(),W(),a),$={class:"fl"},F={class:"flh"},R=g(()=>s("span",{style:{color:"#afafaf","margin-right":"3px"}},"# ",-1)),j=g(()=>s("div",{id:"myChart"},null,-1)),D={__name:"index",setup(a){const i=l([]),c=l([]);f(async()=>{window.scrollTo(0,0)}),f(async()=>{var o,e;const t=await E();d.value=t.data.labelNameList[0],i.value=(o=t.data)==null?void 0:o.echartsNameList[0],c.value=(e=t.data)==null?void 0:e.echartsCountList[0];let u={title:[{text:"文章篇数",padding:[10,0,0,70],textStyle:{fontWeight:"bold",color:"#aac9fa",fontSize:"13px"}},{text:"标签文章篇数Top10统计图",left:"center",textStyle:{fontWeight:"bold",color:"#aac9fa",fontSize:"18px"}}],tooltip:{},xAxis:[{type:"category",data:i.value,axisTick:{alignWithLabel:!0},axisLabel:{show:!0,textStyle:{color:"#aac9fa"},interval:0}}],yAxis:[{type:"value",axisLabel:{show:!0,textStyle:{color:"#aac9fa"}}}],series:[{name:"文章篇数",type:"bar",barWidth:"40%",itemStyle:{barBorderRadius:[5,5,0,0],color:"#8597b4"},data:c.value,realtimeSort:!0}]};V(document.getElementById("myChart")).setOption(u)});const{isLoading:b}=L(),d=l([]),y=C(),v=t=>{y.push(`/allarticle/${t}/2`)};return(t,u)=>{const p=m("el-button"),o=m("el-badge");return n(),_(h,null,[r(w,{isLoading:k(b)},null,8,["isLoading"]),r(S,{title:"标签",wengan:"在这里，标签是时光的印记，每一页都充满了生活的色彩与温度"}),s("div",$,[s("div",F,[(n(!0),_(h,null,N(d.value,e=>(n(),A(o,{value:e.labelCount,"show-zero":!1,class:"item",offset:[1,3],color:e.color,key:e},{default:x(()=>[r(p,{size:"large",color:e.btColor,onClick:M=>v(e.labelName),style:{"border-radius":"10px",width:"98px",color:"white","font-weight":"bold","text-align":"center",opacity:"0.7"}},{default:x(()=>[R,I(" "+T(e.labelName),1)]),_:2},1032,["color","onClick"])]),_:2},1032,["value","color"]))),128))]),j])],64)}}},P=B(D,[["__scopeId","data-v-0d33fec7"]]);export{P as default};
