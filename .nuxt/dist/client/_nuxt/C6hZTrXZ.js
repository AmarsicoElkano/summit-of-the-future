import{n as d,M as c,o,c as a,a as e,t as l,F as m,r as p,s as g}from"./BGiaB9s_.js";const h=d("/img/triangle.svg"),_={class:"w-full bg-secondary relative py-100 overflow-hidden md:overflow-visible"},u={class:"grid-layout items-center relative"},y={class:"col-start-2 col-span-10 md:col-start-2 md:col-span-8"},f={class:"text-primary text-[28px] leading-none md:text-md md:w-[900px]"},w={class:"grid-layout mt-100 relative"},x=e("figure",{class:"absolute inset-0 w-full h-full z-0 translate-y-[20%] md:translate-y-[inherit] scale-[2.7] sm:scale-[1.4] md:scale-100 rotate-[-45deg] md:rotate-0"},[e("img",{src:h,class:"absolute m-auto inset-0 w-full md:w-2/3"})],-1),v={class:"col-start-2 col-span-10"},b={class:"md:masonry grid gap-[20px] relative",ref:"masonry"},z={class:"content text-primary text-download uppercase"},S={class:"md:p-20"},k={class:"block mb-80 text-[16px] md:text-md md:text-base"},I={class:"text-[18px] leading-none md:text-md md:text-base"},R={data(){return{items:[]}},mounted(){this.items=this.$refs.items,this.$nextTick(()=>{this.onResize()}),window.addEventListener("resize",this.onResize),this.scroll()},methods:{scroll(){g.from(this.items,1,{ease:"expo.out",yPercent:150,opacity:0,stagger:.075,scrollTrigger:{trigger:this.items,scrub:!1,start:"top 60%",markers:!1}})},onResize(){this.resizeAllGridItems()},resizeGridItem(s){const t=this.$refs.masonry;let n=parseInt(window.getComputedStyle(t).getPropertyValue("grid-auto-rows")),i=parseInt(window.getComputedStyle(t).getPropertyValue("grid-row-gap")),r=Math.ceil((s.querySelector(".content").getBoundingClientRect().height+i)/(n+i));s.style.gridRowEnd="span "+r},resizeAllGridItems(){this.$refs.items.forEach((s,t)=>{this.resizeGridItem(s)})}}},G=Object.assign(R,{__name:"index",props:c(),setup(s){return(t,n)=>(o(),a("section",_,[e("div",u,[e("div",y,[e("p",f,l(t.slice.primary.paragraph),1)])]),e("div",w,[x,e("div",v,[e("div",b,[(o(!0),a(m,null,p(t.slice.primary.priorities,(i,r)=>(o(),a("div",{class:"bg-white p-[24px] md:p-0",key:r,ref_for:!0,ref:"items"},[e("div",z,[e("div",S,[e("span",k," 0"+l(r+1),1),e("h3",I,l(i.title),1)])])]))),128))],512)])])]))}});export{G as default};
