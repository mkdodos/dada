(this["webpackJsonpsocial-cool"]=this["webpackJsonpsocial-cool"]||[]).push([[0],{176:function(e,c,t){"use strict";t.r(c);var n=t(62),a=t.n(n),l=t(9),i=t(0),s=t.n(i),o=t(190),j=t(189),r=t(88),d=t(31),b=t(123),u=(t(177),t(162),b.a.initializeApp({apiKey:"AIzaSyBKVsNm8RP9VKYBgEwmyRQsitx9dncLuaI",authDomain:"social-cool-f16ba.firebaseapp.com",projectId:"social-cool-f16ba",storageBucket:"social-cool-f16ba.appspot.com",messagingSenderId:"578558980743",appId:"1:578558980743:web:4668ba80e8df3c24087e22"})),h=b.a.firestore(),O=u.auth(),x=b.a,m=t(14),f=t(2);var p=function(){var e=Object(m.g)(),c=s.a.useState(""),t=Object(l.a)(c,2),n=t[0],a=t[1],i=s.a.useState(null),b=Object(l.a)(i,2),u=b[0],h=b[1];function x(e,c){var t=c.name;a(t)}return s.a.useEffect((function(){O.onAuthStateChanged((function(e){h(e)}))}),[]),Object(f.jsxs)(o.a,{secondary:!0,pointing:!0,widths:5,children:[Object(f.jsx)(o.a.Item,{as:d.b,to:"/balances",name:"balances",onClick:x,active:"balances"===n,children:"\u6536\u652f"}),Object(f.jsx)(o.a.Item,{as:d.b,to:"/query-balances",name:"query-balances",onClick:x,active:"query-balances"===n,children:"\u660e\u7d30"}),Object(f.jsx)(o.a.Item,{as:d.b,to:"/dashboard",name:"dashboard",onClick:x,active:"dashboard"===n,children:"\u7d71\u8a08"}),Object(f.jsx)(j.a,{item:!0,text:"\u8a2d\u5b9a",children:Object(f.jsxs)(j.a.Menu,{children:[Object(f.jsx)(j.a.Item,{as:d.b,to:"/user",children:"\u4f7f\u7528\u8005"}),Object(f.jsx)(j.a.Item,{as:d.b,to:"/accounts",children:"\u5e33\u6236"}),Object(f.jsx)(j.a.Item,{children:"Home"})]})}),Object(f.jsx)(o.a.Menu,{position:"right",children:u?Object(f.jsxs)(o.a.Item,{name:"",onClick:function(){O.signOut().then((function(){e.push("/login")}))},children:[Object(f.jsx)(r.a,{name:"sign-out"}),u.displayName]}):Object(f.jsx)(o.a.Item,{name:"login",as:d.b,to:"/login",onClick:x,children:"Login"})})]})},g=t(145),v=t(29),C=t(198),S=t(199),k=t(113),w=t(200),y=t(188),I=t(192),A=t(191),R=t(195),F=function(e){return new Intl.NumberFormat("en-US",{currency:"USD"}).format(e)};function z(){var e=O.currentUser,c=s.a.useState(!1),t=Object(l.a)(c,2),n=t[0],a=t[1],i=s.a.useState(""),o=Object(l.a)(i,2),d=o[0],b=o[1],u=s.a.useState(""),m=Object(l.a)(u,2),p=m[0],z=m[1],E=s.a.useState(""),D=Object(l.a)(E,2),B=D[0],M=D[1],V=s.a.useState(""),H=Object(l.a)(V,2),N=H[0],P=H[1],U=s.a.useState([]),q=Object(l.a)(U,2),L=q[0],J=q[1];function K(){a(!1),z(""),M(""),P("")}s.a.useEffect((function(){var c=h.collection("accounts");e&&(c=c.where("user","==",e.email)),c=c.onSnapshot((function(e){console.log(e.size);var c=e.docs.map((function(e){return Object(v.a)(Object(v.a)({},e.data()),{},{id:e.id})})),t=[],n=0,l=[];0==c.length&&(l.push(Object(f.jsx)(C.a.Column,{children:Object(f.jsxs)(S.a,{textAlign:"center",onClick:function(){a(!0)},children:[Object(f.jsx)(k.a,{attached:"top",children:"\u65b0\u589e"}),Object(f.jsx)(w.a,{children:"+"})]})},"0")),t.push(Object(f.jsx)(C.a.Row,{children:l},n)));var i,s=Object(g.a)(c);try{var o=function(){var e=i.value;0==n&&l.push(Object(f.jsx)(C.a.Column,{children:Object(f.jsxs)(S.a,{textAlign:"center",onClick:function(){a(!0)},children:[Object(f.jsx)(k.a,{attached:"top",children:"\u65b0\u589e"}),Object(f.jsx)(w.a,{children:"+"})]})},"0")),l.push(Object(f.jsx)(C.a.Column,{children:Object(f.jsxs)(S.a,{textAlign:"center",onClick:function(){a(!0),b(e.id),z(e.name),P(e.prior),M(e.balance)},children:[Object(f.jsx)(k.a,{color:"teal",attached:"top",children:e.name}),Object(f.jsx)(w.a,{children:F(e.balance)})]})},n+1)),n%3!=1&&n!=c.length-1||(t.push(Object(f.jsx)(C.a.Row,{children:l},n)),l=[]),n++};for(s.s();!(i=s.n()).done;)o()}catch(j){s.e(j)}finally{s.f()}J(t)}))}),[]);return Object(f.jsx)(f.Fragment,{children:Object(f.jsxs)(y.a,{children:[Object(f.jsx)("div",{className:"App",children:Object(f.jsx)(C.a,{columns:3,children:L})}),Object(f.jsxs)(I.a,{closeIcon:!0,open:n,onClose:function(){a(!1),K()},children:[Object(f.jsx)(w.a,{children:"\u7de8\u8f2f\u5e33\u6236"}),Object(f.jsx)(I.a.Content,{children:Object(f.jsxs)(A.a,{size:"large",children:[Object(f.jsxs)(A.a.Field,{children:[Object(f.jsx)("label",{children:"\u5e33\u6236\u540d\u7a31"}),Object(f.jsx)("input",{value:p,onChange:function(e){z(e.target.value)},placeholder:"please enter your name"})]}),Object(f.jsxs)(A.a.Field,{children:[Object(f.jsx)("label",{children:"\u9918\u984d"}),Object(f.jsx)("input",{type:"number",value:B,onChange:function(e){M(e.target.value)},placeholder:"please enter your amount"})]}),Object(f.jsxs)(A.a.Field,{children:[Object(f.jsx)("label",{children:"\u9806\u4f4d"}),Object(f.jsx)(j.a,{selection:!0,value:N,placeholder:"\u9806\u4f4d",options:[{key:"1",text:"1",value:"1"},{key:"2",text:"2",value:"2"},{key:"3",text:"3",value:"3"},{key:"4",text:"4",value:"4"}],onChange:function(e,c){P(c.value)}})]})]})}),Object(f.jsxs)(I.a.Actions,{children:[Object(f.jsxs)(R.a,{color:"red",floated:"left",onClick:function(){d&&h.collection("accounts").doc(d).delete().then((function(){K()}))},children:[Object(f.jsx)(r.a,{name:"remove"}),"Delete"]}),Object(f.jsxs)(R.a,{color:"green",onClick:function(){var c={name:p,balance:B,prior:N,user:e.email,createdAt:x.firestore.Timestamp.now()};d?h.collection("accounts").doc(d).update(c):h.collection("accounts").add(c),K()},children:[Object(f.jsx)(r.a,{name:"check"}),"Save"]})]})]})]})})}var E=t(196),D=t(193);var B=function(){var e=s.a.useState(!1),c=Object(l.a)(e,2),t=c[0],n=c[1],a=s.a.useState(""),i=Object(l.a)(a,2),j=i[0],d=i[1],b=s.a.useState(""),u=Object(l.a)(b,2),O=u[0],x=u[1],m=s.a.useState(""),p=Object(l.a)(m,2),g=p[0],z=p[1],B=s.a.useState((new Date).toISOString().slice(0,10)),M=Object(l.a)(B,2),V=M[0],H=M[1],N=s.a.useState("income"),P=Object(l.a)(N,2),U=P[0],q=P[1],L=s.a.useState(""),J=Object(l.a)(L,2),K=J[0],W=J[1],$=s.a.useState(0),Q=Object(l.a)($,2),T=Q[0],Y=Q[1],G=s.a.useState([]),X=Object(l.a)(G,2),Z=X[0],_=X[1],ee=s.a.useState([]),ce=Object(l.a)(ee,2),te=ce[0],ne=ce[1];function ae(){n(!1),d(""),x(""),z("")}function le(e,c){var t=c.name;q(t)}return s.a.useEffect((function(){h.collection("topics").where("prior","<=","3").get().then((function(e){var c=e.docs.map((function(e){return e.data()}));ne(c),console.log(c)})),h.collection("posts").onSnapshot((function(e){var c=e.docs.map((function(e){return Object(v.a)(Object(v.a)({},e.data()),{},{id:e.id})}));_(c)}))}),[]),Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(w.a,{}),Object(f.jsxs)(y.a,{children:[Object(f.jsxs)(I.a,{closeIcon:!0,open:t,onClose:function(){n(!1),ae()},children:[Object(f.jsx)(w.a,{children:"\u7de8\u8f2f\u6536\u652f"}),Object(f.jsxs)(I.a.Content,{children:[Object(f.jsxs)(o.a,{fluid:!0,widths:2,pointing:!0,secondary:!0,children:[Object(f.jsx)(o.a.Item,{color:"teal",name:"income",active:"income"===U,onClick:le,children:"\u6536\u5165"}),Object(f.jsx)(o.a.Item,{color:"orange",name:"expense",active:"expense"===U,onClick:le,children:"\u652f\u51fa"})]}),Object(f.jsxs)(A.a,{size:"large",children:[Object(f.jsxs)(A.a.Field,{children:[Object(f.jsx)("label",{children:"\u65e5\u671f"}),Object(f.jsx)("input",{type:"date",value:V,onChange:function(e){H(e.target.value)}})]}),Object(f.jsxs)(A.a.Field,{children:[Object(f.jsx)("label",{children:"\u9805\u76ee"}),Object(f.jsx)("input",{value:O,onChange:function(e){x(e.target.value)}})]}),Object(f.jsxs)(A.a.Field,{children:[Object(f.jsx)("label",{children:"\u91d1\u984d"}),Object(f.jsx)("input",{type:"number",value:g,onChange:function(e){z(e.target.value)}})]})]})]}),Object(f.jsxs)(I.a.Actions,{children:[j&&Object(f.jsxs)(R.a,{color:"red",floated:"left",onClick:function(){j&&h.collection("posts").doc(j).delete().then((function(){console.log("add"),ae()}))},children:[Object(f.jsx)(r.a,{name:"remove"}),"Delete"]}),Object(f.jsxs)(R.a,{color:"green",onClick:function(){var e={title:O,date:V};"income"==U?e.income=g:e.expense=g,j?h.collection("posts").doc(j).set(e).then((function(){ae()})):h.collection("posts").add(e).then((function(){ae()}))},children:[Object(f.jsx)(r.a,{name:"check"}),"Save"]})]})]}),Object(f.jsxs)(C.a,{columns:"equal",children:[Object(f.jsx)(C.a.Row,{children:te.map((function(e,c){return Object(f.jsx)(C.a.Column,{children:Object(f.jsx)(S.a,{textAlign:"center",onClick:function(){W(e.name),Y(e.balance)},color:"teal",inverted:K===e.name,children:e.name})},c)}))}),K&&Object(f.jsxs)(C.a.Row,{children:[Object(f.jsx)(C.a.Column,{children:Object(f.jsx)(E.a,{horizontal:!0,children:Object(f.jsx)(E.a.Value,{children:F(T)})})}),Object(f.jsx)(C.a.Column,{verticalAlign:"middle",children:Object(f.jsxs)(R.a,{floated:"right",color:"blue",onClick:function(){n(!0)},children:[Object(f.jsx)(r.a,{name:"plus"})," Create"]})})]}),Object(f.jsx)(C.a.Row,{children:Object(f.jsx)(C.a.Column,{children:Z.map((function(e,c){return Object(f.jsx)(D.a,{unstackable:!0,children:Object(f.jsx)(D.a.Body,{children:Object(f.jsxs)(D.a.Row,{onClick:function(){n(!0),d(e.id),x(e.title),H(e.date),e.income?(q("income"),z(e.income)):(q("expense"),z(e.expense))},children:[Object(f.jsxs)(D.a.Cell,{children:[Object(f.jsx)(w.a,{as:"h4",children:e.title}),e.date]}),Object(f.jsxs)(D.a.Cell,{textAlign:"right",children:[e.income?Object(f.jsx)(k.a,{color:"teal",circular:!0,children:"\u5b58"}):Object(f.jsx)(k.a,{color:"orange",circular:!0,children:"\u63d0"}),Object(f.jsx)("br",{}),"$"," ",e.income?e.income:e.expense+""]})]})})},c)}))})})]})]})]})};function M(e){return Object(f.jsxs)(o.a,{widths:3,children:[Object(f.jsx)(o.a.Item,{children:Object(f.jsx)(R.a,{onClick:e.onMinusClick,children:"-"})}),Object(f.jsx)(o.a.Item,{children:Object(f.jsx)(R.a,{primary:!0,onClick:e.onClick,children:e.text})}),Object(f.jsx)(o.a.Item,{children:Object(f.jsx)(R.a,{onClick:e.onPlusClick,children:"+"})})]})}var V=function(){var e=O.currentUser,c=s.a.useState(!1),t=Object(l.a)(c,2),n=t[0],a=t[1],i=s.a.useState(""),j=Object(l.a)(i,2),d=j[0],b=j[1],u=s.a.useState(""),x=Object(l.a)(u,2),m=x[0],p=x[1],g=s.a.useState(""),z=Object(l.a)(g,2),B=z[0],M=z[1],V=s.a.useState(),H=Object(l.a)(V,2),N=H[0],P=H[1],U=s.a.useState((new Date).toISOString().slice(0,10)),q=Object(l.a)(U,2),L=q[0],J=q[1],K=s.a.useState(""),W=Object(l.a)(K,2),$=W[0],Q=W[1],T=s.a.useState("income"),Y=Object(l.a)(T,2),G=Y[0],X=Y[1],Z=s.a.useState(""),_=Object(l.a)(Z,2),ee=_[0],ce=_[1],te=s.a.useState()||null,ne=Object(l.a)(te,2),ae=ne[0],le=ne[1],ie=s.a.useState(!1),se=Object(l.a)(ie,2),oe=se[0],je=se[1],re=s.a.useState(""),de=Object(l.a)(re,2),be=(de[0],de[1]),ue=s.a.useState(0),he=Object(l.a)(ue,2),Oe=he[0],xe=he[1],me=s.a.useState([]),fe=Object(l.a)(me,2),pe=fe[0],ge=fe[1],ve=s.a.useState([]),Ce=Object(l.a)(ve,2),Se=Ce[0],ke=Ce[1];function we(e){h.collection("accounts").doc(ae.id).update({balance:1*Oe+1*e}).then((function(){ye(),je(!1)}))}function ye(){a(!1),b(""),p(""),M("")}function Ie(e,c){var t=c.name;X(t)}return s.a.useEffect((function(){var c=h.collection("balances");e&&(c=c.where("user","==",e.email)),ae&&(c=c.where("account.id","==",ae.id)),c.orderBy("date","desc").onSnapshot((function(e){var c=e.docs.map((function(e){return Object(v.a)(Object(v.a)({},e.data()),{},{id:e.id})}));ge(c)}));var t=h.collection("accounts");e&&(t=t.where("user","==",e.email)),t.onSnapshot((function(e){var c=e.docs.map((function(e){return Object(v.a)(Object(v.a)({},e.data()),{},{id:e.id})}));ke(c),ae&&xe(c.filter((function(e){return e.id==ae.id}))[0].balance)}))}),[ae]),Object(f.jsx)(f.Fragment,{children:Object(f.jsxs)(y.a,{children:[Object(f.jsxs)(I.a,{closeIcon:!0,open:n,onClose:function(){a(!1),ye()},children:[Object(f.jsx)(w.a,{children:"\u7de8\u8f2f\u6536\u652f"}),Object(f.jsxs)(I.a.Content,{children:[Object(f.jsxs)(o.a,{fluid:!0,widths:2,pointing:!0,secondary:!0,children:[Object(f.jsx)(o.a.Item,{color:"teal",name:"income",active:"income"===G,onClick:Ie,children:"\u6536\u5165"}),Object(f.jsx)(o.a.Item,{color:"orange",name:"expense",active:"expense"===G,onClick:Ie,children:"\u652f\u51fa"})]}),Object(f.jsxs)(A.a,{size:"large",children:[Object(f.jsxs)(A.a.Field,{children:[Object(f.jsx)("label",{children:"\u65e5\u671f"}),Object(f.jsx)("input",{type:"date",value:L,onChange:function(e){J(e.target.value)}})]}),Object(f.jsxs)(A.a.Field,{children:[Object(f.jsx)("label",{children:"\u9805\u76ee"}),Object(f.jsx)("input",{value:m,onChange:function(e){p(e.target.value)}})]}),Object(f.jsxs)(A.a.Field,{children:[Object(f.jsx)("label",{children:"\u91d1\u984d"}),Object(f.jsx)("input",{type:"number",value:B,onChange:function(e){M(e.target.value)}})]})]})]}),Object(f.jsxs)(I.a.Actions,{children:[d&&Object(f.jsxs)(R.a,{color:"red",floated:"left",onClick:function(){d&&h.collection("balances").doc(d).delete().then((function(){we("expense"==G?B:-1*B),ye()}))},children:[Object(f.jsx)(r.a,{name:"remove"}),"Delete"]}),Object(f.jsxs)(R.a,{color:"green",loading:oe,onClick:function(){je(!0);var c={title:m,date:L};"income"==G?c.income=B:c.expense=B,N&&(c.account=N),ae&&(c.account=ae),e&&(c.user=e.email),d?h.collection("balances").doc(d).set(c).then((function(){var e=0;"income"==ee&&"expense"==G?e=e-1*B-1*$:"expense"==ee&&"income"==G?e=e+1*B+1*$:"income"==G?e=B-$:"expense"==G&&(e=$-B),we(e)})):h.collection("balances").add(c).then((function(){we("income"==G?B:-1*B),ye()}))},children:[Object(f.jsx)(r.a,{name:"check"}),"Save"]})]})]}),Object(f.jsxs)(C.a,{columns:"equal",children:[Object(f.jsx)(C.a.Row,{children:Se.map((function(e,c){return Object(f.jsx)(C.a.Column,{children:Object(f.jsx)(S.a,{textAlign:"center",onClick:function(){be(e.name),xe(e.balance),le(e)},color:"teal",inverted:(null===ae||void 0===ae?void 0:ae.name)===e.name,children:e.name})},c)}))}),ae&&Object(f.jsxs)(C.a.Row,{children:[Object(f.jsx)(C.a.Column,{children:Object(f.jsx)(E.a,{horizontal:!0,children:Object(f.jsx)(E.a.Value,{children:F(Oe)})})}),Object(f.jsx)(C.a.Column,{verticalAlign:"middle",children:Object(f.jsxs)(R.a,{floated:"right",color:"blue",onClick:function(){a(!0)},children:[Object(f.jsx)(r.a,{name:"plus"})," Create"]})})]}),Object(f.jsx)(C.a.Row,{children:Object(f.jsx)(C.a.Column,{children:pe.map((function(e,c){return Object(f.jsx)(D.a,{unstackable:!0,children:Object(f.jsx)(D.a.Body,{children:Object(f.jsxs)(D.a.Row,{onClick:function(){a(!0),b(e.id),p(e.title),J(e.date),P(e.account),le(e.account),e.income?(X("income"),M(e.income),Q(e.income),ce("income")):(X("expense"),M(e.expense),Q(e.expense),ce("expense"))},children:[Object(f.jsxs)(D.a.Cell,{children:[Object(f.jsx)(w.a,{as:"h4",children:e.title}),Object(f.jsxs)("span",{children:[e.date," "]}),!ae&&Object(f.jsx)(k.a,{children:e.account&&e.account.name})]}),Object(f.jsxs)(D.a.Cell,{textAlign:"right",children:[e.income?Object(f.jsx)(k.a,{color:"teal",circular:!0,children:"\u5b58"}):Object(f.jsx)(k.a,{color:"orange",circular:!0,children:"\u63d0"}),Object(f.jsx)("br",{}),"$"," ",e.income?F(e.income):F(e.expense)+""]})]})})},c)}))})})]})]})})};function H(){var e=O.currentUser,c=s.a.useState((new Date).getMonth()+1),t=Object(l.a)(c,2),n=t[0],a=t[1],i=s.a.useState([]),o=Object(l.a)(i,2),j=o[0],r=o[1];return s.a.useEffect((function(){var c=h.collection("balances");e&&(c=c.where("user","==",e.email)),(c=c.where("date",">=","2022-0".concat(n,"-01")).where("date","<=","2022-0".concat(n,"-31"))).orderBy("date","desc").onSnapshot((function(e){var c=e.docs.map((function(e){return Object(v.a)(Object(v.a)({},e.data()),{},{id:e.id})}));r(c),console.log(c)}))}),[n]),Object(f.jsxs)(y.a,{children:[Object(f.jsx)(M,{text:"".concat(n," \u6708"),onPlusClick:function(){a(12==n?1:n+1)},onClick:function(){a((new Date).getMonth()+1)},onMinusClick:function(){a(1==n?12:n-1)}}),Object(f.jsxs)(D.a,{celled:!0,unstackable:!0,children:[Object(f.jsx)(D.a.Header,{children:Object(f.jsxs)(D.a.Row,{children:[Object(f.jsx)(D.a.HeaderCell,{width:3,children:"\u65e5\u671f"}),Object(f.jsx)(D.a.HeaderCell,{children:"\u9805\u76ee"}),Object(f.jsx)(D.a.HeaderCell,{width:3,children:"\u6536\u5165"}),Object(f.jsx)(D.a.HeaderCell,{children:"\u652f\u51fa"})]})}),Object(f.jsx)(D.a.Body,{children:j.map((function(e,c){return Object(f.jsxs)(D.a.Row,{children:[Object(f.jsx)(D.a.Cell,{children:e.date.slice(5,10)}),Object(f.jsx)(D.a.Cell,{children:e.title}),Object(f.jsx)(D.a.Cell,{children:e.income}),Object(f.jsx)(D.a.Cell,{children:e.expense})]},c)}))})]})]})}function N(){var e=Object(m.g)(),c=s.a.useRef(),t=s.a.useRef();return Object(f.jsx)(y.a,{children:Object(f.jsx)(C.a,{columns:3,children:Object(f.jsxs)(C.a.Row,{children:[Object(f.jsx)(C.a.Column,{mobile:16,tablet:3,computer:5}),Object(f.jsx)(C.a.Column,{mobile:16,tablet:10,computer:6,children:Object(f.jsx)(S.a,{children:Object(f.jsxs)(A.a,{size:"large",children:[Object(f.jsxs)(A.a.Field,{children:[Object(f.jsx)("label",{children:"Email"}),Object(f.jsx)("input",{ref:c,defaultValue:"mkdodos@gmail.com"})]}),Object(f.jsxs)(A.a.Field,{children:[Object(f.jsx)("label",{children:"Password"}),Object(f.jsx)("input",{ref:t,defaultValue:"123456"})]}),Object(f.jsx)(R.a,{onClick:function(){O.signInWithEmailAndPassword(c.current.value,t.current.value).then((function(c){e.push("/user"),console.log(c.user.email)}))},size:"large",color:"blue",children:"Mark"}),Object(f.jsx)(R.a,{basic:!0,floated:"right",onClick:function(){O.signInWithEmailAndPassword("dada@gmail.com","123456").then((function(c){console.log(c.user.email),e.push("/user")}))},size:"large",color:"blue",children:"Dada"})]})})}),Object(f.jsx)(C.a.Column,{mobile:16,tablet:3,computer:5})]})})})}var P=function(){var e=O.currentUser,c=s.a.useState({}),t=Object(l.a)(c,2),n=t[0],a=t[1],i=s.a.useState("0".concat((new Date).getMonth()+1)),o=Object(l.a)(i,2),j=o[0];return o[1],s.a.useEffect((function(){var c=h.collection("balances");e&&(c=c.where("user","==",null===e||void 0===e?void 0:e.email)),c.where("date",">=","2022-".concat(j,"-01")),c.where("date","<=","2022-".concat(j,"-31")).get().then((function(e){var c=0,t=0;e.docs.map((function(e){e.data().income&&(c+=1*e.data().income),e.data().expense&&(t+=1*e.data().expense)})),a({income:c,expense:t})}))}),[j]),Object(f.jsx)(y.a,{children:Object(f.jsxs)(C.a,{columns:1,children:[Object(f.jsx)(C.a.Row,{stretched:!0,children:Object(f.jsx)(C.a.Column,{textAlign:"center",children:Object(f.jsx)(S.a,{color:"teal",children:Object(f.jsxs)(E.a,{children:[Object(f.jsx)(E.a.Label,{children:"\u672c\u6708\u6536\u5165"}),Object(f.jsx)(E.a.Value,{children:F(n.income)})]})})})}),Object(f.jsx)(C.a.Row,{stretched:!0,children:Object(f.jsx)(C.a.Column,{textAlign:"center",children:Object(f.jsx)(S.a,{color:"orange",children:Object(f.jsxs)(E.a,{children:[Object(f.jsx)(E.a.Label,{children:"\u672c\u6708\u652f\u51fa"}),Object(f.jsx)(E.a.Value,{children:F(n.expense)})]})})})})]})})},U=t(194),q=t(146),L=t.p+"static/media/matthew.a5edfa2f.png",J=t.p+"static/media/kristy.8300278f.png";function K(){var e=Object(m.g)(),c=O.currentUser,t=s.a.useState(!1),n=Object(l.a)(t,2),a=n[0],i=n[1],o=s.a.useState(""),j=Object(l.a)(o,2),d=j[0],b=j[1];return Object(f.jsxs)(y.a,{children:[Object(f.jsxs)(I.a,{closeIcon:!0,open:a,onClose:function(){i(!1)},children:[Object(f.jsx)(w.a,{children:"\u7de8\u8f2f\u5e33\u6236"}),Object(f.jsx)(I.a.Content,{children:Object(f.jsx)(A.a,{size:"large",children:Object(f.jsxs)(A.a.Field,{children:[Object(f.jsx)("label",{children:"\u540d\u7a31"}),Object(f.jsx)("input",{value:d,onChange:function(e){b(e.target.value)}})]})})}),Object(f.jsx)(I.a.Actions,{children:Object(f.jsxs)(R.a,{color:"green",onClick:function(){var e={displayName:d};c.updateProfile(e).then((function(){i(!1)}))},children:[Object(f.jsx)(r.a,{name:"check"}),"Save"]})})]}),Object(f.jsx)(C.a,{centered:!0,children:Object(f.jsxs)(C.a.Row,{columns:3,children:[Object(f.jsx)(C.a.Column,{mobile:1,tablet:3,computer:5}),Object(f.jsx)(C.a.Column,{mobile:13,tablet:10,computer:6,children:Object(f.jsxs)(U.a,{fluid:!0,children:[Object(f.jsx)(q.a,{src:"mkdodos@gmail.com"==(null===c||void 0===c?void 0:c.email)?L:J,size:"large"}),Object(f.jsxs)(U.a.Content,{children:[Object(f.jsx)(U.a.Header,{children:null===c||void 0===c?void 0:c.displayName}),Object(f.jsx)(U.a.Meta,{children:Object(f.jsx)("span",{className:"date",children:"Joined in 2015"})}),Object(f.jsx)(U.a.Description,{children:c&&c.email})]}),Object(f.jsxs)(U.a.Content,{extra:!0,children:[Object(f.jsx)(R.a,{onClick:function(){O.signOut().then((function(){e.push("/login")}))},children:"SignOut"}),Object(f.jsx)(R.a,{onClick:function(){i(!0)},children:"Edit"})]})]})}),Object(f.jsx)(C.a.Column,{mobile:1,tablet:3,computer:5})]})})]})}var W=function(){var e=s.a.useState()||null,c=Object(l.a)(e,2),t=c[0],n=c[1];return s.a.useEffect((function(){O.onAuthStateChanged((function(e){n(e)}))}),[]),Object(f.jsx)(f.Fragment,{children:Object(f.jsxs)(d.a,{children:[Object(f.jsx)(p,{}),Object(f.jsxs)(m.d,{children:[Object(f.jsx)(m.b,{path:"/accounts",children:t?Object(f.jsx)(z,{}):Object(f.jsx)(m.a,{to:"login"})}),Object(f.jsx)(m.b,{path:"/balances",children:Object(f.jsx)(V,{})}),Object(f.jsx)(m.b,{path:"/query-balances",children:Object(f.jsx)(H,{})}),Object(f.jsx)(m.b,{path:"/dashboard",children:Object(f.jsx)(P,{})}),Object(f.jsx)(m.b,{path:"/login",component:N}),Object(f.jsx)(m.b,{path:"/user",component:K}),Object(f.jsx)(m.b,{path:"/posts",component:B})]})]})})},$=(t(175),document.getElementById("root"));a.a.render(Object(f.jsx)(W,{}),$)}},[[176,1,2]]]);
//# sourceMappingURL=main.f25afb8f.chunk.js.map