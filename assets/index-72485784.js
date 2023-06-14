var f=Object.defineProperty;var v=(i,e,s)=>e in i?f(i,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):i[e]=s;var r=(i,e,s)=>(v(i,typeof e!="symbol"?e+"":e,s),s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();class p{constructor(){r(this,"setUrl",(e,s,n,t,o,c)=>{const l=s.getAttribute("src"),a=l.indexOf(n),h=l.substring(a).split(".")[0],m=h.slice(0,n.length);let d="";if(l.includes(t))return;switch(o){case"name":d=l.replace(h,`${m+c+t}`);break;case"folder":d=l.replace(h,`${t+"/"+m}`);break;case"both":d=l.replace(h,`${t+"/"+m+c+t}`);break;default:d=l}s.setAttribute("src",d);const u=()=>{s.setAttribute("src",l),s.removeEventListener("mouseout",u),e.removeEventListener("blur",u)};s.addEventListener("mouseout",u),e.addEventListener("blur",u)});r(this,"init",(e,s,n,t="folder",o="-")=>{e.forEach(c=>{const l=c.firstElementChild,a=()=>this.setUrl(c,l,s,n,t,o);l.removeEventListener("mouseover",a),l.addEventListener("mouseover",a),c.removeEventListener("focus",a),c.addEventListener("focus",a)})})}}const g={timeouts:[],setTimeout:function(i,e){const s=setTimeout(i,e);this.timeouts.push(s)},clearAllTimeouts:function(){for(;this.timeouts.length;)clearTimeout(this.timeouts.pop())}};class E{constructor(){r(this,"toggleActive",()=>this.toggles.forEach(e=>e.classList.toggle("active")));r(this,"toggleProxy",()=>this.proxy.classList.toggle("v-visible"));r(this,"handleClickOpen",()=>{this.toggleActive(),this.modal.showModal(),this.toggles[1].addEventListener("click",this.handleClickClose),window.addEventListener("keydown",this.handleEsc),this.links.forEach(e=>e.addEventListener("click",this.handleClickClose)),removeEventListener("click",this.handleClickOpen),g.setTimeout(()=>this.toggleProxy(),500)});r(this,"handleClickClose",()=>{this.toggleActive(),this.toggleProxy(),this.modal.close(),removeEventListener("click",this.handleClickClose),window.removeEventListener("keydown",this.handleEsc),this.links.forEach(e=>e.removeEventListener("click",this.handleClickClose)),g.clearAllTimeouts(),this.header.classList.remove("headerPlaceholder")});r(this,"handleEsc",e=>{this.modal.hasAttribute("open")&&e.code==="Escape"&&this.handleClickClose()});r(this,"setState",e=>{e?this.toggles[0].addEventListener("click",this.handleClickOpen):(this.toggles[0].removeEventListener("click",this.handleClickOpen),this.modal.hasAttribute("open")&&this.header.classList.add("headerPlaceholder"))});r(this,"checkState",e=>window.innerWidth<=e&&this.setState(!0));r(this,"toggleState",e=>e?this.setState(!0):this.setState(!1));r(this,"watchState",e=>{window.matchMedia(`(max-width: ${e}px)`).addEventListener("change",n=>this.toggleState(n.matches))});r(this,"initOn",e=>{this.checkState(e),this.watchState(e)});this.toggles=document.querySelectorAll(".toggle"),this.modal=document.querySelector(".modal"),this.proxy=document.querySelector(".proxy"),this.header=document.querySelector(".main-header"),this.links=document.querySelectorAll(".modal__nav-link")}}const L=document.querySelectorAll(".logo"),y=new p;y.init(L,"logo","gradient");const S=new E;S.initOn(900);const k=document.querySelectorAll(".master"),w=document.querySelectorAll(".slave"),b=new ResizeObserver(i=>{for(const[e,s]of i.entries()){const n=s.borderBoxSize[0].inlineSize;w[e].style.maxWidth=`${n}px`}});k.forEach(i=>b.observe(i));
