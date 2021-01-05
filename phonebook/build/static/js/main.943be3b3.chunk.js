(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{21:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t(6),c=t(3),u=t(1),i=t(15),o=t.n(i),l=(t(21),function(e){return Object(r.jsxs)("form",{onSubmit:e.addPerson,children:[Object(r.jsxs)("div",{children:[Object(r.jsx)("label",{htmlFor:"name",children:"Name: "}),Object(r.jsx)("input",{name:"name",value:e.newName,onChange:e.handleName})]}),Object(r.jsxs)("div",{children:[Object(r.jsx)("label",{htmlFor:"phone",children:"Phone number: "}),Object(r.jsx)("input",{name:"phone",type:"tel",value:e.newNum,onChange:e.handleNum})]}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{type:"submit",children:"add"})})]})}),d=function(e){var n=e.id,t=e.handleClick;return Object(r.jsx)("button",{onClick:function(){return t(n)},children:"delete"})},s=function(e){var n=e.name,t=e.number,a=e.id,c=e.handleDelete;return Object(r.jsxs)("li",{children:[n," ",t," ",Object(r.jsx)(d,{name:n,id:a,handleClick:c})]})},j=function(e){var n=e.persons,t=e.handleDelete;return Object(r.jsx)("ul",{children:n.map((function(e){return Object(r.jsx)(s,{name:e.name,number:e.number,id:e.id,handleDelete:t},e.id)}))})},b=function(e){return Object(r.jsxs)("form",{children:["Filter results by",Object(r.jsx)("input",{value:e.filter,onChange:e.filterHandler})]})},h=function(e){var n=e.text;return null===n?null:Object(r.jsx)("div",{className:"message",children:n})},f=function(e){var n=e.text;return null===n?null:Object(r.jsx)("div",{className:"error",children:n})},m=t(4),O=t.n(m),x="http://localhost:3001/api/persons";var p={getAll:function(){return O.a.get(x).then((function(e){return e.data}))},addP:function(e){return O.a.post(x,e).then((function(e){return e.data}))},deleteP:function(e){return O.a.delete(x+"/"+e).then((function(e){return e.data}))},replace:function(e,n){return O.a.put(x+"/"+e,n).then((function(e){return e.data}))}},v=function(){Object(u.useEffect)((function(){p.getAll().then((function(e){i(e)}))}),[]);var e=Object(u.useState)([]),n=Object(c.a)(e,2),t=n[0],i=n[1],o=Object(u.useState)(""),d=Object(c.a)(o,2),s=d[0],m=d[1],O=Object(u.useState)("000-000-0000"),x=Object(c.a)(O,2),v=x[0],w=x[1],g=Object(u.useState)(""),N=Object(c.a)(g,2),k=N[0],S=N[1],C=Object(u.useState)(!1),D=Object(c.a)(C,2),P=D[0],y=D[1],A=Object(u.useState)(null),E=Object(c.a)(A,2),F=E[0],H=E[1],I=Object(u.useState)(null),J=Object(c.a)(I,2),B=J[0],R=J[1],U=function(e,n){p.replace(e,n).then((function(n){console.log(n),i(t.map((function(t){return t.id!==e?t:n}))),H("Updated "+n.name)})).catch((function(r){console.log(r),R("Cannot update, information of ".concat(n.name," has already been removed from server ")),i(t.filter((function(n){return n.id!==e})))}))},q=new RegExp(k,"i");return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Phonebook"}),Object(r.jsx)(h,{text:F}),Object(r.jsx)(f,{text:B}),Object(r.jsx)(b,{filter:k,filterHandler:function(e){S(e.target.value),y(!0)}}),Object(r.jsx)("h2",{children:"Add a new entry"}),Object(r.jsx)(l,{addPerson:function(e){if(e.preventDefault(),""!==s)if(t.some((function(e){return e.name===s}))){if(window.confirm("".concat(s," is already added to phonebook, replace the old number with the new one?"))){var n=t.find((function(e){return e.name===s})),r=Object(a.a)(Object(a.a)({},n),{},{number:v});U(n.id,r)}}else{var c={name:s.trim(),date:(new Date).toISOString,number:v,id:t.length+1};p.addP(c).then((function(e){i(t.concat(e)),m(""),H("Added "+e.name)}))}else window.alert("Cannot have a blank name")},handleName:function(e){m(e.target.value)},handleNum:function(e){w(e.target.value)},newName:s,newNum:v}),Object(r.jsx)("h2",{children:"Numbers"}),Object(r.jsx)(j,{persons:P?t.filter((function(e){return e.name.match(q)||e.number.match(q)})):t,handleDelete:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name,"?"))&&p.deleteP(e).then((function(){i(t.filter((function(e){return e!==n}))),H("Deleted ".concat(n.name))}))}})]})};o.a.render(Object(r.jsx)(v,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.943be3b3.chunk.js.map