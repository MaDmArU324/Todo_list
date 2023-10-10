(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const m of i.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&c(m)}).observe(document,{childList:!0,subtree:!0});function l(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(n){if(n.ep)return;n.ep=!0;const i=l(n);fetch(n.href,i)}})();const v=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
 \r
 \r
            <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> \r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <a class="selected filtro" id = "All">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" id="pendings">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filtro" id="completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`;let y;const C=new Uint8Array(16);function S(){if(!y&&(y=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(C)}const d=[];for(let e=0;e<256;++e)d.push((e+256).toString(16).slice(1));function L(e,t=0){return(d[e[t+0]]+d[e[t+1]]+d[e[t+2]]+d[e[t+3]]+"-"+d[e[t+4]]+d[e[t+5]]+"-"+d[e[t+6]]+d[e[t+7]]+"-"+d[e[t+8]]+d[e[t+9]]+"-"+d[e[t+10]]+d[e[t+11]]+d[e[t+12]]+d[e[t+13]]+d[e[t+14]]+d[e[t+15]]).toLowerCase()}const A=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),b={randomUUID:A};function P(e,t,l){if(b.randomUUID&&!t&&!e)return b.randomUUID();e=e||{};const c=e.random||(e.rng||S)();if(c[6]=c[6]&15|64,c[8]=c[8]&63|128,t){l=l||0;for(let n=0;n<16;++n)t[l+n]=c[n];return t}return L(c)}class E{constructor(t){this.id=P(),this.description=t,this.createdAt=new Date,this.done=!1}}const u={All:"All",Completed:"Completed",Pending:"Pending"},s={Todos:[],filter:u.All},F=()=>{w(),console.log("Store ready🫐"),console.log(s)},w=()=>{if(!localStorage.getItem("state"))return;const{Todos:e=[],filter:t=u.All}=JSON.parse(localStorage.getItem("state"));console.log(JSON.parse(localStorage.getItem("state"))),s.Todos=e,s.filter=t},I=()=>s.Todos,p=()=>{localStorage.setItem("state",JSON.stringify(s))},q=e=>{if(!e)throw new Error("Description required");const t=new E(e);s.Todos.push(t),p()},k=e=>{if(!e)throw new Error("Id required");const t=s.Todos.filter(l=>l.id===e);if(t[0]===void 0)throw new Error("The id doesn't exist");t[0].done=!t[0].done,p()},x=e=>{if(!e)throw new Error("Id required");s.Todos=s.Todos.filter(t=>t.id!==e),p()},D=()=>{s.Todos=s.Todos.filter(e=>!e.done),p()},O=(e=u.All)=>{if(!Object.keys(u).includes(e))throw new Error("The filter doesn't exist");s.filter=e,p()},U=()=>s.filter,M=(e=u.All)=>{switch(e){case u.All:return[...s.Todos];case u.Completed:return s.Todos.filter(t=>t.done);case u.Pending:return s.Todos.filter(t=>!t.done);default:throw new Error("Filter not found")}},N=()=>s.Todos.filter(l=>!l.done).length,o={initStore:F,loadStore:w,addTodo:q,toggleTodo:k,deleteCompleted:D,deleteTodo:x,setFilter:O,getCurrentFilter:U,getTodosbyfilter:M,state:s,Filters:u,getTodos:I,counter:N,saveStateLocalStorage:p},H=e=>{if(!e)throw new Error("Object is required");const t=`<li class=${e.done?"completed":"Pending"} data-id=${e.id}>
    <div class="view">
        <input class="toggle" type="checkbox" ${e.done?"checked":"unchecked"}>
        <label>${e.description}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
 `,l=document.createElement("li");return l.innerHTML=t,l.classList.add(e.done?"completed":"Pending"),l.setAttribute("data-id",e.id),l};let h;const T=(e,t=[])=>{if(h||(h=document.querySelector(e)),!h)throw new Error("You need to put an existing element in order to append something");h.innerHTML="",t.forEach(l=>{h.append(H(l))})},a={Todolist:".todo-list",Input:"#new-todo-input",DeleteCompleted:".clear-completed",Delete:".destroy",CounterP:"#pending-count",Completed:"#completed",Pendings:"#pendings",All:"#All"},V=e=>{const t=()=>{const r=o.getTodosbyfilter(o.getCurrentFilter()),g=document.querySelector(a.CounterP);g.innerHTML=o.counter(),T(a.Todolist,r)};(()=>{o.initStore();const r=document.createElement("div");r.innerHTML=v,document.querySelector(e).append(r),t()})();const l=document.querySelector(a.Input),c=document.querySelector(a.Todolist),n=document.querySelector(a.DeleteCompleted),i=document.querySelector(a.Completed),m=document.querySelector(a.Pendings),f=document.querySelector(a.All);l.addEventListener("keyup",r=>{r.keyCode===13&&r.target.value.trim().length!==0&&(o.addTodo(r.target.value),t(),r.target.value="")}),c.addEventListener("click",r=>{if(r.target.className!=="toggle")return;const g=r.target.closest("[data-id]");o.toggleTodo(g.getAttribute("data-id")),t()}),c.addEventListener("click",r=>{if(r.target.className!=="destroy")return;const g=r.target.closest("[data-id]");o.deleteTodo(g.getAttribute("data-id")),t()}),n.addEventListener("click",r=>{o.deleteCompleted(),t()}),f.addEventListener("click",r=>{o.getCurrentFilter()!==o.Filters.All&&(f.classList.add("selected"),o.setFilter(o.Filters.All),T(a.Todolist,o.getTodosbyfilter(o.Filters.All)),t())}),i.addEventListener("click",r=>{o.getCurrentFilter()!==o.Filters.Completed&&(f.classList.add("selected"),o.setFilter(o.Filters.Completed),T(a.Todolist,o.getTodosbyfilter(o.Filters.Completed)),t())}),m.addEventListener("click",r=>{o.getCurrentFilter()!==o.Filters.Pending&&(f.classList.add("selected"),o.setFilter(o.Filters.Pending),T(a.Todolist,o.getTodosbyfilter(o.Filters.Pending)),t())})};V("#app");
