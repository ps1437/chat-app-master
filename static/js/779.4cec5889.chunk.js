(self.webpackChunkchat_app=self.webpackChunkchat_app||[]).push([[779],{6210:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return h}});var n=a(4942),r=a(2982),c=a(885),s=a(2791),i=a(242),l=a.n(i),o=a(9271),m=a(1399),u=a(2975),d=a.n(u),p=a(2092);var f=function(e){var t=e.index,a=e.message,n=e.time,r=e.otherUserMsg,c=e.userName,i="text-right";"IMG"===e.type&&(a=s.createElement("img",{src:a,alt:"img",style:{height:"100px"}})),r&&(i="text-left");var l=s.createElement("div",{className:r?"msg-bubble-right":"msg-bubble-left"},s.createElement("div",{className:"small text-black "+i,style:{color:"antiquewhite",fontWeight:"700"}},c),s.createElement("div",{className:"text-small mb-0 text-white text-wrap "+i},a));return r?(i="text-right",s.createElement("div",{className:"media  mb-1  message",key:t},s.createElement("div",{className:"media-body ml-2"},l,s.createElement("p",{className:"small text-muted text-left"},n)))):s.createElement("div",{className:"media ml-auto mb-1 message",key:t},s.createElement("div",{className:"media-body mr-2 "},l,s.createElement("p",{className:"small text-muted text-right"},n)))},g=s.memo(f),b=function(e){var t=e.users,a=e.roomName;return s.createElement("div",{className:"bg-light-chat ",id:"sidebar-wrapper"},s.createElement("div",{className:"activeUsers text-center font-weight-bold"},"Active Users"),s.createElement("div",{className:"list-group list-group-flush"},s.createElement("div",{className:"users list-group-item list-group-item-action bg-roomname"},"Room : ".concat(a)),t.map((function(e,t){return s.createElement("div",{key:t,className:"users list-group-item list-group-item-action bg-light-chat"},s.createElement("div",{className:"online"},e&&e.charAt(0).toUpperCase()),"string"!==typeof(a=e)?"":a.charAt(0).toUpperCase()+a.slice(1));var a}))))},h=function(e){var t,a=e.location,i=(0,s.useState)(),u=(0,c.Z)(i,2),f=u[0],h=u[1],v=(0,s.useState)(),E=(0,c.Z)(v,2),N=E[0],y=E[1],x=(0,s.useState)(),C=(0,c.Z)(x,2),w=C[0],Z=C[1],k=(0,s.useState)([]),j=(0,c.Z)(k,2),S=j[0],U=j[1],_=(0,s.useState)(""),W=(0,c.Z)(_,2),F=W[0],I=W[1],q=(0,s.useState)([]),A=(0,c.Z)(q,2),D=A[0],G=A[1],M=(0,s.useState)(!1),R=(0,c.Z)(M,2),L=R[0],J=R[1],T=(0,s.useState)(!1),z=(0,c.Z)(T,2),H=z[0],K=z[1],P=(0,s.useRef)(null),Q=(0,s.useRef)(),Y=(0,p.e1)().addToast,B=(0,o.k6)(),O=(0,s.useCallback)((function(e){Y(e,{appearance:"info",autoDismiss:!0})}),[Y]);(0,s.useEffect)((function(){Q.current=l().connect("/"),Q.current.emit("join",a.state.roomName,a.state.userName),G([a.state.userName]),h(a.state.userName),y(a.state.roomName)}),[a.state.userName,a.state.roomName]),(0,s.useEffect)((function(){Q.current.on("received message",(function(e){U((function(t){return[].concat((0,r.Z)(t),[e])}))})),Q.current.on("user-connected",(function(e){G(e)})),Q.current.on("new-user-connected",(function(e){O("".concat(e," join the chat room "))})),Q.current.on("image-share-received",(function(e){U((function(t){return[].concat((0,r.Z)(t),[e])}))})),Q.current.on("user-disconnected",(function(e,t){O("".concat(t," left the chat room ")),G(e)}))}),[O]);function V(e){!function(e){var t=new FileReader;t.onload=function(t){var a={};a.id=f,a.body=t.target.result.toString("base64"),a.fileName=e.name,a.type="IMG",U((function(e){return[].concat((0,r.Z)(e),[a])})),Q.current.emit("image-share",N,a)},t.readAsDataURL(e)}(e.target.files[0])}return(0,s.useEffect)((function(){P.current.scrollIntoView({behavior:"smooth"})}),[S]),s.createElement("div",{id:"wrapper",className:w?" d-flex toggledright":"container d-flex toggle"},s.createElement(b,{users:D,roomName:N}),s.createElement("div",{id:"page-content-wrapper"},s.createElement("nav",{className:"navbar navbar-expand-md navbar-blue"},s.createElement("button",{className:"btn btn-default menuToggle",onClick:function(){Z(!w)}},s.createElement("i",{className:"text-white fa fa-bars","aria-hidden":"true"})),s.createElement("button",{type:"button",className:"navbar-toggler","data-toggle":"collapse","data-target":"#navbarCollapse"},s.createElement("i",{className:"text-white fa fa-bars","aria-hidden":"true"})),s.createElement("div",{className:"collapse navbar-collapse",id:"navbarCollapse"},s.createElement("div",{className:"navbar-nav navbar-brand"},s.createElement("span",{className:"nav-item text-white active title"},"Fun2Chat")),s.createElement("div",{className:"navbar-nav ml-auto"},s.createElement("div",{className:"font-weight-bold text-white activeUsers"},f&&f.toUpperCase()),s.createElement("div",{title:"leave room",className:"font-weight-bold text-white activeUsers"},s.createElement("i",{className:"fa fa-sign-out",onClick:function(){Q.current.emit("disconnect"),B.push("/")},"aria-hidden":"true"}))))),s.createElement("div",{className:"container container-chat"},s.createElement("div",{className:"col-12 px-2 "},s.createElement("div",{className:"px-2 py-3 chat-box bg-white",style:{height:400}},S.map((function(e,t){return s.createElement("div",{key:t},s.createElement(g,{otherUserMsg:e.id!==f,userName:e.id,message:e.body,type:e.type,index:t,time:(new Date).toLocaleString("en-US",{hour:"numeric",minute:"numeric",hour12:!0})}))})),s.createElement("div",{ref:P})),L?s.createElement(d(),{onEmojiClick:function(e,t){I((function(e){return e+t.emoji}))}}):"",H?s.createElement(m.Z,(t={gifPerPage:30,libray:"stickers",gifListHeight:"250px",masonryConfig:[{mq:"320px",columns:3,imageWidth:90,gutter:2},{mq:"768px",columns:4,imageWidth:100,gutter:5},{mq:"1024px",columns:7,imageWidth:100,gutter:5},{mq:"1824px",columns:14,imageWidth:100,gutter:5}]},(0,n.Z)(t,"gifListHeight",200),(0,n.Z)(t,"listWrapperClassName","es_listWrapper__etyrU"),(0,n.Z)(t,"wrapperClassName","es_componentWrapper__1Y0JA"),(0,n.Z)(t,"poweredByGiphy",!1),(0,n.Z)(t,"apiKey","CovmgqzY8DjIxJOhhjz4FAQds8SQIJKC"),(0,n.Z)(t,"onSelect",(function(e){return function(e){console.log(e);var t={};t.id=f,t.body=e.images.preview_gif.url,t.fileName=e.type,t.type="IMG",U((function(e){return[].concat((0,r.Z)(e),[t])})),Q.current.emit("image-share",N,t)}(e)})),t)):"",s.createElement("div",null,s.createElement("form",{onSubmit:function(e){e.preventDefault();var t={body:F,id:f,type:"Text"};J(!1),I(""),U((function(e){return[].concat((0,r.Z)(e),[t])})),Q.current.emit("send message",N,t)},className:"bg-light-chat p-2"},s.createElement("div",{className:"input-group"},s.createElement("label",{className:"custom-file-upload"},s.createElement("i",{title:"send pics",className:"fa fa-upload","aria-hidden":"true"}),s.createElement("input",{type:"file",className:"form-control rounded-0 border-0 py-4 bg-light-chat",onChange:function(e){return V(e)},autoComplete:"off",accept:"image/*",autoFocus:"on",placeholder:"type your message here..."})),s.createElement("button",{onClick:function(){K(!1),J(!L)},id:"clear",type:"button",title:"Emoji",className:"btn btn-emoji"},s.createElement("span",{role:"img","aria-labelledby":"jsx-a11y/accessible-emoji"},"\ud83d\ude1c")),s.createElement("button",{onClick:function(){K(!H),J(!1)},id:"clear",type:"button",title:"Emoji",className:"btn btn-emoji"},s.createElement("span",{role:"img","aria-labelledby":"jsx-a11y/accessible-emoji"},"GIF")),s.createElement("input",{type:"text",id:"desktop",className:"form-control rounded-0 border-1 py-4",value:F,onChange:function(e){L&&J(!1),H&&K(!1),I(e.target.value)},autoComplete:"off",autoFocus:"on",placeholder:"type your message here..."}),s.createElement("div",{className:"input-group-append",id:"desktop"},s.createElement("button",{type:"submit",className:"btn btn-success"},s.createElement("i",{className:"fa fa-paper-plane","aria-hidden":"true"})))),s.createElement("div",{className:"m-send",id:"mobile"},s.createElement("input",{type:"text",className:"form-control rounded-0 border-1 py-4",value:F,onChange:function(e){L&&J(!1),H&&K(!1),I(e.target.value)},autoComplete:"off",autoFocus:"on",placeholder:"type your message here..."}),s.createElement("div",{className:"input-group-append"},s.createElement("button",{type:"submit",className:"btn btn-success"},s.createElement("i",{className:"fa fa-paper-plane","aria-hidden":"true"}))))))))))}},7020:function(){}}]);
//# sourceMappingURL=779.4cec5889.chunk.js.map