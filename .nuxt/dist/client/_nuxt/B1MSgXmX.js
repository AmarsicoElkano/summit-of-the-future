import{M as d,o as r,c as a,b as h,w as n,F as x,r as u,G as f,l as p,a as e,t as c}from"./Cq8WsDQv.js";import{a as l,S as m,N as w}from"./CAZ2iUqp.js";const g={class:"py-[50px] md:py-[150px] px-[60x] md:px-[160px]"},_={class:"text-medium_mb md:text-medium uppercase font-bold mb-[40px]"},v={class:""},k=e("div",{class:"flex gap-[20px] mt-[26px] justify-end"},[e("div",{class:"custom-prev cursor-pointer"},[e("svg",{width:"53",height:"53",viewBox:"0 0 53 53",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[e("path",{d:"M29 19.6858L21.4286 27.2572L29 34.8286",stroke:"#004987","stroke-width":"2","stroke-miterlimit":"13.33","stroke-linecap":"square"}),e("circle",{opacity:"0.5",cx:"26.5",cy:"26.5",r:"26",transform:"matrix(-1 0 0 1 53 0)",stroke:"#004987"})])]),e("div",{class:"custom-next cursor-pointer"},[e("svg",{width:"53",height:"53",viewBox:"0 0 53 53",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[e("path",{d:"M24 19.6858L31.5714 27.2572L24 34.8286",stroke:"#004987","stroke-width":"2","stroke-miterlimit":"13.33","stroke-linecap":"square"}),e("circle",{opacity:"0.5",cx:"26.5",cy:"26.5",r:"26",stroke:"#004987"})])])],-1),y={components:{Swiper:m,SwiperSlide:l},data(){return{items:[],modules:[w]}},mounted(){this.items=this.$refs.items,this.init()},methods:{init(){let s=0;this.items.forEach(t=>{const i=t.offsetHeight;i>s&&(s=i)}),this.items.forEach(t=>{t.style.height=s+"px"})}}},S=Object.assign(y,{__name:"index",props:d(),setup(s){return(t,i)=>(r(),a("section",g,[h(p(m),{slidesPerView:1,breakpoints:{768:{slidesPerView:1,spaceBetween:10},1024:{slidesPerView:3,spaceBetween:24}},spaceBetween:10,navigation:{prevEl:".custom-prev",nextEl:".custom-next"},modules:t.modules,style:{paddingLeft:"16px !important",paddingRight:"16px !important"}},{default:n(()=>[(r(!0),a(x,null,u(t.slice.primary.slides,(o,B)=>(r(),f(p(l),{class:"text-primary bg-[var(--secondary-color)]"},{default:n(()=>[e("div",{ref_for:!0,ref:"items",class:"p-[32px] flex flex-col justify-between min-h-[382px]"},[e("p",_,c(o.title),1),e("p",v,c(o.paragraph),1)],512)]),_:2},1024))),256)),k]),_:1},8,["modules"])]))}});export{S as default};
