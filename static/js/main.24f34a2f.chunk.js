(this.webpackJsonpminesweeper=this.webpackJsonpminesweeper||[]).push([[0],{24:function(e,t,n){},25:function(e,t,n){"use strict";n.r(t);var i=n(1),A=n(0),o=n.n(A),r=n(5),a=n.n(r),l=n(3),s="SET_DIFFICULTY_EASY",c="SET_DIFFICULTY_MEDIUM",u="SET_DIFFICULTY_HARD",d=function(e){switch(e){case"easy":return{type:s};case"medium":return{type:c};case"hard":return{type:u}}},b="START_NEW_GAME",f=function(){return{type:b}},g=Object(l.b)((function(e){return{bombsCounter:e.bombsCounter,flagCounter:e.flagCounter,difficulty:e.difficulty,state:e}}),(function(e){return{setDifficulty:function(t){return e(d(t))},startNewGame:function(){return e(f())}}}))((function(e){return Object(i.jsxs)("div",{className:"settings",children:[Object(i.jsx)("div",{className:"flags",children:Object(i.jsx)("div",{className:"flagsCounter",title:"\u041e\u0441\u0442\u0430\u043b\u043e\u0441\u044c \u043c\u0438\u043d",children:e.bombsCounter-e.flagCounter})}),Object(i.jsx)("div",{className:"newGame",children:Object(i.jsx)("button",{onClick:function(){e.startNewGame()},children:"New Game"})}),Object(i.jsxs)("div",{className:"difficulty",children:[Object(i.jsx)("p",{style:{marginTop:"0.3em",marginBottom:"0.3em"},children:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u043b\u043e\u0436\u043d\u043e\u0441\u0442\u044c:"}),Object(i.jsxs)("select",{onChange:function(t){return e.setDifficulty(t.target.value)},children:[Object(i.jsx)("option",{value:"easy",title:"\u041f\u043e\u043b\u0435 8\u04458, 10 \u043c\u0438\u043d",children:"\u041d\u043e\u0432\u0438\u0447\u043e\u043a"}),Object(i.jsx)("option",{value:"medium",title:"\u041f\u043e\u043b\u0435 16\u044516, 40 \u043c\u0438\u043d",children:"\u041b\u044e\u0431\u0438\u0442\u0435\u043b\u044c"}),Object(i.jsx)("option",{value:"hard",title:"\u041f\u043e\u043b\u0435 30\u044516, 99 \u043c\u0438\u043d",children:"\u041f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b"})]})]})]})})),m=n(4),O=n.n(m),h="SET_QUESTION",p="SET_FLAG",v="SET_NOTHING",y=function(e,t){switch(t){case"none":return{type:p,id:e};case"flag":return{type:h,id:e};case"question":return{type:v,id:e}}},j="OPEN_TILE",B=function(e){return{type:j,id:e}},I="LOSE_GAME",T="WIN_GAME",w=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;switch(e){case"win":return{type:T};case"lose":return{type:I,detonatedId:t}}},C=Object(l.b)((function(e,t){return{isGameOver:e.isGameOver,detonatedId:e.detonatedId,bombsCounter:e.bombsCounter,tile:t.tile,tiles:e.tiles,width:e.width,height:e.height}}),(function(e){return{toggleFlag:function(t,n){return e(y(t,n))},openTile:function(t){return e(B(t))},endGame:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return e(w(t,n))}}}))((function(e){Object(A.useEffect)((function(){return n(e.tiles)}),[e.tiles]);var t=0,n=function(t){var n=0;t.forEach((function(e){e.isOpen&&!e.isBomb&&(n+=1)})),n===e.tiles.length-e.bombsCounter&&e.endGame("win")},o=function(t){var n=t[0],i=t[1],A=[];return+n-1>=0&&+i-1>=0&&A.push([+n-1,+i-1]),+i-1>=0&&A.push([+n,+i-1]),+n+1<e.width&&+i-1>=0&&A.push([+n+1,+i-1]),+n-1>=0&&A.push([+n-1,+i]),+n+1<e.width&&A.push([+n+1,+i]),+n-1>=0&&+i+1<e.height&&A.push([+n-1,+i+1]),+i+1<e.height&&A.push([+n,+i+1]),+n+1<e.width&&+i+1<e.height&&A.push([+n+1,+i+1]),A},r=function(t){return(t[1]<=0?0:t[1]*e.width)+t[0]},a=function(t){var n=new Set,i=function(t){o(t).forEach((function(t){var i=r(t);"flag"===e.tiles[i].overlay||e.tiles[i].isOpen||(e.openTile(i),0===e.tiles[i].number&&n.add("".concat(t[0],",").concat(t[1])),e.tiles[i].isBomb&&e.endGame("lose",i))}))};i(t);for(var A=0;n.size!==A;)A=n.size,n.forEach((function(e){var t=e.split(",");i(t)}))};return Object(i.jsx)("div",{onClick:function(){"flag"===e.tile.overlay||e.isGameOver||(e.openTile(e.tile.index),0!==e.tile.number||e.tile.isBomb||a(e.tile.coords)),"flag"!==e.tile.overlay&&e.tile.isBomb&&!e.isGameOver&&e.endGame("lose",e.tile.index)},onDoubleClick:function(){e.tile.isOpen&&function(t,n){var i=0;o(n).forEach((function(t){var n=r(t);"flag"===e.tiles[n].overlay&&i++})),i===t.number&&a(n)}(e.tile,e.tile.coords)},onContextMenu:function(t){t.preventDefault(),e.tile.isOpen||e.isGameOver||e.toggleFlag(e.tile.index,e.tile.overlay)},onTouchStart:function(e){e.preventDefault(),t=Date.now()},onTouchEnd:function(){var n;!(n=500,Date.now()-t>n)||e.tile.isOpen||e.isGameOver||e.toggleFlag(e.tile.index,e.tile.overlay)},className:"tile",children:Object(i.jsxs)("div",{className:O()({tile__open:e.tile.isOpen,tile__closed:!e.tile.isOpen||"none"!==e.tile.overlay,color__one:"none"===e.tile.overlay&&!e.tile.isBomb&&1===e.tile.number,color__two:"none"===e.tile.overlay&&!e.tile.isBomb&&2===e.tile.number,color__three:"none"===e.tile.overlay&&!e.tile.isBomb&&3===e.tile.number,color__four:"none"===e.tile.overlay&&!e.tile.isBomb&&4===e.tile.number,color__five:"none"===e.tile.overlay&&!e.tile.isBomb&&5===e.tile.number,color__six:"none"===e.tile.overlay&&!e.tile.isBomb&&6===e.tile.number,color__seven:"none"===e.tile.overlay&&!e.tile.isBomb&&7===e.tile.number,color__eight:"none"===e.tile.overlay&&!e.tile.isBomb&&8===e.tile.number,bomb:e.tile.isOpen&&e.tile.isBomb,flag:"flag"===e.tile.overlay,detonated:e.detonatedId===e.tile.index}),children:["flag"===e.tile.overlay&&Object(i.jsx)("img",{src:"data:image/png;base64,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",alt:"F",title:"\u0424\u043b\u0430\u0433",className:"flagIcon"}),!e.tile.isOpen&&"question"===e.tile.overlay&&"?",e.tile.isOpen&&!e.tile.isBomb&&0!==e.tile.number&&e.tile.number,e.tile.isOpen&&e.tile.isBomb&&Object(i.jsx)("img",{src:"data:image/png;base64,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",alt:"B",title:"\u041c\u0438\u043d\u0430",className:"bombIcon"})]})})})),x=Object(l.b)((function(e){return{tiles:e.tiles,isGameOver:e.isGameOver,difficulty:e.difficulty,message:e.message,detonatedId:e.detonatedId}}),null)((function(e){return Object(i.jsxs)("div",{className:O()({app:!0,field:!0,easy:"easy"===e.difficulty,medium:"medium"===e.difficulty,hard:"hard"===e.difficulty}),children:[e.tiles.map((function(e){return Object(i.jsx)(C,{tile:e},e.index)})),e.isGameOver&&Object(i.jsx)("div",{className:O()({messageBox:!0,message__win:"\u041f\u043e\u0431\u0435\u0434\u0430!"===e.message,message__lose:"\u041f\u043e\u0440\u0430\u0436\u0435\u043d\u0438\u0435!"===e.message}),onClick:function(){document.querySelector(".messageBox").style="display: none"},children:Object(i.jsx)("span",{children:e.message})})]})}));var G=Object(l.b)((function(e){return{state:e}}),(function(e){return{setDifficulty:function(t){return e(d(t))}}}))((function(e){return Object(A.useEffect)((function(){e.setDifficulty("easy")}),[]),Object(i.jsxs)("div",{children:[Object(i.jsx)(g,{}),Object(i.jsx)(x,{})]})})),N=(n(24),n(6)),E={width:8,height:8,bombsCounter:10,tiles:[],difficulty:"easy",flagCounter:0,isGameOver:!1,detonatedId:null},D=n(2),Q=n(11),V=function(e,t){var n=function(e,t,n){for(var i=e*t,A=[],o=0;o<i;o++)A.push({index:o,isBomb:!1,number:0,isOpen:!1,overlay:"none"});var r=new Set;do{r.add(Math.trunc(Math.random()*i))}while(r.size<n);r.forEach((function(e){A[e].isBomb=!0}));var a=[],l=0,s=0;return A.forEach((function(n){n.coords=[l,s],n.isBomb&&(l>0&&s>0&&a.push([l-1,s-1]),s>0&&a.push([l,s-1]),s>0&&l<e-1&&a.push([l+1,s-1]),l>0&&a.push([l-1,s]),l<e-1&&a.push([l+1,s]),l>0&&s<t-1&&a.push([l-1,s+1]),s<t-1&&a.push([l,s+1]),l<e-1&&s<t-1&&a.push([l+1,s+1])),++l>=e&&(l=0,s++)})),a.forEach((function(e){A.forEach((function(t){t.coords[0]===e[0]&&t.coords[1]===e[1]&&t.number++}))})),A},i=function(t){var n=Object(Q.a)(e.tiles);return n[t]=Object(D.a)({},e.tiles[t]),"none"===n[t].overlay?n[t].overlay="flag":"flag"===n[t].overlay?n[t].overlay="question":n[t].overlay="none",n};switch(t.type){case s:return Object(D.a)(Object(D.a)({},e),{},{width:8,height:8,bombsCounter:10,tiles:n(8,8,10),difficulty:"easy",flagCounter:0,isGameOver:!1,detonatedId:null});case c:return Object(D.a)(Object(D.a)({},e),{},{width:16,height:16,bombsCounter:40,tiles:n(16,16,40),difficulty:"medium",flagCounter:0,isGameOver:!1,detonatedId:null});case u:return Object(D.a)(Object(D.a)({},e),{},{width:30,height:16,bombsCounter:99,tiles:n(30,16,99),difficulty:"hard",flagCounter:0,isGameOver:!1,detonatedId:null});case b:return Object(D.a)(Object(D.a)({},e),{},{tiles:n(e.width,e.height,e.bombsCounter),flagCounter:0,isGameOver:!1,detonatedId:null});case p:return Object(D.a)(Object(D.a)({},e),{},{tiles:i(t.id),flagCounter:e.flagCounter+1});case h:return Object(D.a)(Object(D.a)({},e),{},{tiles:i(t.id),flagCounter:e.flagCounter-1});case v:return Object(D.a)(Object(D.a)({},e),{},{tiles:i(t.id)});case j:return Object(D.a)(Object(D.a)({},e),{},{tiles:function(t){var n=Object(Q.a)(e.tiles);return n[t]=Object(D.a)({},e.tiles[t]),n[t].isOpen=!0,n[t].overlay="none",n}(t.id)});case I:return Object(D.a)(Object(D.a)({},e),{},{tiles:e.tiles.map((function(e){return e.isBomb?Object(D.a)(Object(D.a)({},e),{},{overlay:"none",isOpen:!0}):e})),isGameOver:!0,message:"\u041f\u043e\u0440\u0430\u0436\u0435\u043d\u0438\u0435!",detonatedId:t.detonatedId});case T:return Object(D.a)(Object(D.a)({},e),{},{isGameOver:!0,message:"\u041f\u043e\u0431\u0435\u0434\u0430!"});default:return e}},Y=Object(N.b)(V,E);a.a.render(Object(i.jsx)(o.a.StrictMode,{children:Object(i.jsx)(l.a,{store:Y,children:Object(i.jsx)(G,{})})}),document.getElementById("root"))}},[[25,1,2]]]);
//# sourceMappingURL=main.24f34a2f.chunk.js.map