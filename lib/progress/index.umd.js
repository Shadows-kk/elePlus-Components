(function(e,s){typeof exports=="object"&&typeof module!="undefined"?module.exports=s(require("vue")):typeof define=="function"&&define.amd?define(["vue"],s):(e=typeof globalThis!="undefined"?globalThis:e||self,e.index=s(e.Vue))})(this,function(e){"use strict";var s="",i=(r,t)=>{const n=r.__vccOpts||r;for(const[o,p]of t)n[o]=p;return n};const a={class:"progress-circle-svg"};var c=i(e.defineComponent({__name:"index",props:{percentage:{type:Number,default:0},isAnimation:{type:Boolean,default:!1},time:{type:Number,default:3e3}},setup(r){const t=r;let n=e.ref(0);return e.onMounted(()=>{if(t.isAnimation){let o=t.time/t.percentage,p=setInterval(()=>{n.value+=1,n.value>=t.percentage&&(n.value=t.percentage,clearInterval(p))},o)}}),(o,p)=>{const _=e.resolveComponent("el-progress");return e.openBlock(),e.createElementBlock("div",a,[e.createVNode(_,e.mergeProps({percentage:e.unref(n)},o.$attrs),null,16,["percentage"])])}}}),[["__scopeId","data-v-fef5415c"]]),l={install(r){r.component("m-progress",c)}};return l});