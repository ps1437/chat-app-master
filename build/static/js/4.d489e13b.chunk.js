(this["webpackJsonpchat-app"]=this["webpackJsonpchat-app"]||[]).push([[4],{33:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var a=r(34);function n(e,t){if(e){if("string"===typeof e)return Object(a.a)(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(r):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(a.a)(e,t):void 0}}},34:function(e,t,r){"use strict";function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}r.d(t,"a",(function(){return a}))},44:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var a=r(33);function n(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var r=[],a=!0,n=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(a=(c=i.next()).done)&&(r.push(c.value),!t||r.length!==t);a=!0);}catch(u){n=!0,o=u}finally{try{a||null==i.return||i.return()}finally{if(n)throw o}}return r}}(e,t)||Object(a.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},93:function(e,t,r){"use strict";r.r(t);var a=r(44),n=r(0),o=r.n(n),c=r(1),i=r(12);t.default=function(e){e.isLogin;var t=Object(n.useState)({userName:""}),r=Object(a.a)(t,2),u=r[0],l=r[1],s=Object(c.f)();return o.a.createElement("div",{class:"container py-5"},o.a.createElement("div",{class:"row"},o.a.createElement("div",{class:"col-md-12"},o.a.createElement("div",{class:"row"},o.a.createElement("div",{class:"col-md-5 mx-auto"},o.a.createElement("div",{class:"card rounded-1 chat-room-card"},o.a.createElement("div",{class:"card-header chat-header-title"},o.a.createElement("h3",{class:"mb-0 text-center"},"Chat Room")),o.a.createElement("div",{class:"card-body"},o.a.createElement("form",{class:"form",onSubmit:function(e){e.preventDefault(),i.a.authenticate(),s.push("/chat",u)},autocomplete:"off",id:"formLogin"},o.a.createElement("div",{class:"form-group"},o.a.createElement("label",{for:"uname"},"Name"),o.a.createElement("input",{type:"text",required:!0,"aria-describedby":"button-addon2",className:"form-control rounded-0 border-0 py-4 bg-light",value:u.userName,onChange:function(e){return l({userName:e.target.value})},autoComplete:"off",autoFocus:"on",placeholder:"Please Enter your name"})),o.a.createElement("button",{type:"submit",class:"btn btn-success btn-block font-weight-bold",id:"btnJoin"},"Join")))))))))}}}]);
//# sourceMappingURL=4.d489e13b.chunk.js.map