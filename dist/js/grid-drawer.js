!function(){"use strict";var e={classNameItems:".gd__item",classNameOutside:".gd__outside",classNameInside:".gd__inside",animateEasing:"easeInOutQuint",animateTime:600};function t(e,t){return e.split(t).join("")}function i(){var e=this.CONFIG,i=e.data,s=e.classNameItems,n=e.classNameOutside,r=e.classNameInside;if(!1!==Array.isArray(i)){var a=function(e,t){for(var i=0,s=t.length,n=e.length;i<s;i++,n++)e[n]=t[i];return e}([],i),l=["inside","outside"];!1!==a.every((function(e){var t=[];return l.forEach((function(i){t.push(Object.prototype.hasOwnProperty.call(e,i));var s="string"==typeof e[i];t.push(s)})),t.every((function(e){return!0===e}))}))&&(this.GD_CONTAINER.innerHTML=a.reduce((function(e,i){return e+'\n      <div class="'+t(s,".")+'">\n        <div class="'+t(n,".")+'">'+i.outside+'</div>\n        <div class="'+t(r,".")+'">'+i.inside+"</div>\n      </div>"}),""))}}function s(e,t){return e.map((function(e){return e.reduce((function(e,t){return e.appendChild(t),e}),document.createElement(t))}))}function n(e,t){for(var i=0;i<e.length;i++){var s=e[i].innerHTML;e[i].innerHTML='<div class="'+t+'">'+s+"</div>"}}function r(){var e=this,t=this.CONFIG,i=t.classNameItems,r=t.classNameOutside,a=t.classNameInside,l=document.querySelectorAll(this.EL+" > "+i),o=document.querySelectorAll(this.EL+" "+r),c=document.querySelectorAll(this.EL+" "+a);n(o,"gd__wrap"),n(c,"gd__wrap"),n(document.querySelectorAll(this.EL+" "+a+" .gd__wrap"),"gd__content"),function(e,t){for(var i=0;i<e.length;i++){var s=document.createElement("a");s.setAttribute("href","javascript:;"),s.setAttribute("title","close"),s.textContent="",s.className="close-btn",e[i].appendChild(s)}}(c),s(function(e,t){for(var i=[],s=0;s<e.length;s+=5){var n=Array.prototype.slice.call(e,s,s+5);i.push(n)}return i}(l),"div").forEach((function(t,n){var r=n%2;s(function(e,t){for(var i=[],s=e.length>1?Math.round(e.length/2)+1:1,n=0;n<s;n++){var r=2*n,a=r,l=r+2;0===t&&(a=n>0?r-1:0,l=n>0?r+1:1);var o=Array.prototype.slice.call(e,a,l);i.push(o)}return i}(t.querySelectorAll(i),r),"div").forEach((function(e,i){var s=""+r+i,n="00"===s||"12"===s?"l":"s";e.className="gd__side gd__size-"+n,t.appendChild(e)})),t.className="gd__group",e.GD_CONTAINER.appendChild(t)}))}function a(e){if(e>1024)Array.prototype.forEach.call(this.GD_GROUPS,(function(e){var t=0,i=e.querySelectorAll(".gd__side");Array.prototype.forEach.call(i,(function(e,i){e.style.left=(i<1?0:t)+"px",e.style.position="absolute",t=e.offsetWidth+t}))}));else{for(var t=0;t<this.GD_ITEMS.length;t++)this.GD_ITEMS[t].classList.remove("is-open");for(t=0;t<this.GD_SIDES.length;t++)this.GD_SIDES[t].removeAttribute("style");for(t=0;t<this.GD_INSIDES.length;t++)this.GD_INSIDES[t].removeAttribute("style")}}function l(e,t,i,s){var n=this.CONFIG,r=n.animateEasing,a=n.animateTime,l=Array.prototype.slice.call(e,t,i);window.Velocity(l,{marginLeft:s},{duration:a,easing:r,queue:!1})}function o(){var e=this.CONFIG,t=e.animateEasing,i=e.animateTime;window.Velocity(this.GD_SIDES,{marginLeft:"0%"},{duration:i,easing:t,queue:!1})}function c(e){var t=this.CONFIG,i=t.classNameInside,s=t.animateEasing,n=t.animateTime;Array.prototype.forEach.call(e,(function(e){var t=e.querySelectorAll(i);window.Velocity(t,{width:"0%",opacity:0},{duration:n,easing:s,queue:!1,complete:function(e){for(var t=0;t<e.length;t++)e[t].style.display="none"}})}))}function u(e,t){for(var i=e;i&&!1===i.classList.contains(t);)if(void 0===(i=i.parentNode).tagName)return;return i}function d(e){if(!e)return-1;var t=0;do{t++}while(e=e.previousElementSibling);return t}function h(e){var t=this.CONFIG,i=t.classNameInside,s=t.animateEasing,n=t.animateTime;if(this.GD_CONTAINER.querySelectorAll(".is-open").length){var r=u(e,"gd__side"),a=u(e,"gd__group"),h=a.querySelectorAll(".gd__side"),f=e.querySelector(i),m=d(r),p=!0===r.classList.contains("gd__size-l")?"100%":"200%",_=d(a)%2==0;c.call(this,function(e,t){var i=Array.from(e),s=i.indexOf(t);return Array.prototype.splice.call(i,s,1),i.map((function(e){return e}))}(this.GD_ITEMS,e)),f.style.display="block",window.Velocity(f,{width:p,opacity:1},{duration:n,easing:s,queue:!1}),o.call(this);var v={begin:1,end:3,offset:"50%"};switch(m){case 2:v.begin=_?2:0,v.end=_?3:2,v.offset=_?"50%":"-50%";break;case 3:v.begin=0,v.offset="-50%"}l.call(this,h,v.begin,v.end,v.offset)}else c.call(this,this.GD_ITEMS),o.call(this)}function f(){var e=this.CONFIG.classNameInside;return Array.prototype.forEach.call(this.GD_ITEMS,(function(t){var i=t.querySelector(e),s=t.classList.contains("is-open");i.style.display=s?"block":"none"})),!1}function m(e){if(Array.prototype.some.call(this.GD_INSIDES,(function(e){return!0===e.classList.contains("velocity-animating")})))return!1;var t=this.CONFIG.classNameOutside,i=e.target,s=u(i,"gd__item"),n="gd__is-open";if(this.GD_CONTAINER.classList.remove(n),i.closest(t))if(s.classList.contains("is-open"))s.classList.remove("is-open");else{for(var r=0;r<this.GD_ITEMS.length;r++)this.GD_ITEMS[r].classList.remove("is-open");s.classList.add("is-open"),this.GD_CONTAINER.classList.add(n)}else{if(!i.classList.contains("close-btn"))return!1;s.classList.remove("is-open")}return window.innerWidth>1024?h.call(this,s):f.call(this),!1}function p(){var e,t,i=this;(e=function(){a.call(i,window.innerWidth)},600,function(){var i=arguments,s=this;t||(e.apply(s,i),t=!0,setTimeout((function(){return t=!1}),600))}).call(this)}Object.create,Object.create,function(t){if(void 0!==window.Velocity){void 0===window.GridDrawer&&(window.GridDrawer=function(t,s){var n=this;this.CONFIG=e,this.clickHandler=function(e){m.call(n,e)},this.resizeHandler=function(){p.call(n)},this.EL=t,this.CONFIG=Object.assign(e,s);var l=this.CONFIG,o=l.classNameItems,c=l.classNameOutside,u=l.classNameInside;1===document.querySelectorAll(t).length?(this.GD_CONTAINER=document.querySelector(t),this.GD_CONTAINER.classList.add("gd__container"),i.call(this),r.call(this),this.GD_GROUPS=document.querySelectorAll(this.EL+" .gd__group"),this.GD_SIDES=document.querySelectorAll(this.EL+" .gd__side"),this.GD_ITEMS=document.querySelectorAll(this.EL+" "+o),this.GD_INSIDES=document.querySelectorAll(this.EL+" "+u),this.GD_OUTSIDES=document.querySelectorAll(this.EL+" "+c),this.GD_CONTAINER.addEventListener("click",this.clickHandler,!1),window.addEventListener("resize",this.resizeHandler),a.call(this,window.innerWidth)):console.error("You must assign one element.")}||{})}else console.error("Please import Velocity.js in your file.")}()}();