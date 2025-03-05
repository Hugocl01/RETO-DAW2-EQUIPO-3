import{j as e,a as f,r as x,E as g,S as b,f as v}from"./index-_2EO4M7r.js";import{M as N}from"./react-tooltip.min-DFJO45Pb.js";function p({tipo:s,objPartido:m,fnNavegar:t}){const a=m;function d(){t(a.slug)}const r=`collapse-${a.slug}`;return e.jsxs("div",{className:"accordion card mb-3 shadow-sm",id:`accordion-${a.slug}`,children:[e.jsxs("div",{className:"accordion-button w-100 card-header bg-primary text-white",type:"button","data-bs-toggle":"collapse","data-bs-target":`#${r}`,"aria-expanded":"false","aria-controls":r,children:[s!=="clasificatorio"&&s!==""?e.jsx("h4",{children:a.tipo.toUpperCase()}):"",e.jsx("h5",{className:"w-100 text-center m-0",children:`Partido: ${a["equipo local"].nombre} vs ${a["equipo visitante"].nombre}`})]}),e.jsx("div",{id:r,className:"accordion-collapse collapse show","data-bs-parent":`#accordion-${a.slug}`,children:e.jsx("div",{className:"card-body",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-4 text-center",children:e.jsx("p",{className:"display-4",children:a["goles local"]})}),e.jsxs("div",{className:"col-4 text-center",children:[e.jsx("h6",{children:"VS"}),e.jsx("p",{className:"text-muted",children:"Resultado"}),e.jsx("i",{className:"bi bi-clipboard","data-tooltip-id":"actaPartido","data-tooltip-content":"Ver Acta",onClick:d}),e.jsx(N,{id:"actaPartido"})]}),e.jsx("div",{className:"col-4 text-center",children:e.jsx("p",{className:"display-4",children:a["goles visitante"]})})]})})})]})}function w({tipo:s,grupo:m,partidos:t}){const a=f();if(!t||t.length===0)return e.jsx("p",{children:"No hay partidos disponibles."});function d(i,l=""){let n;return i==="clasificatorio"&&l!==""?n=t.filter(c=>c.tipo===i&&c.grupo===l):i==="eliminatorias"?n=t.filter(c=>c.tipo==="semifinal"||c.tipo==="final"):n=t,n}function r(i){a(`/partidos/${i}`)}return e.jsx("div",{className:"container-fluid",children:s==="clasificatorio"?e.jsxs(e.Fragment,{children:[e.jsx("h3",{children:"Clasificatorio"}),e.jsx("div",{children:d(s,m).map((i,l)=>e.jsx(p,{tipo:s,objPartido:i,fnNavegar:r},l))})]}):s==="eliminatorias"?e.jsxs(e.Fragment,{children:[e.jsx("h3",{children:"Eliminatorias"}),e.jsx("div",{children:d(s).map((i,l)=>e.jsx(p,{tipo:s,objPartido:i,fnNavegar:r},l))})]}):e.jsx(e.Fragment,{children:e.jsx("div",{children:e.jsx(p,{tipo:s,objPartido:t[0],fnNavegar:r},0)})})})}function S(){const[s,m]=x.useState(null),[t,a]=x.useState(""),[d,r]=x.useState("A"),[i,l]=x.useState(!0),[n,c]=x.useState();if(x.useEffect(()=>{const h=async()=>{try{const o=await v("partidos");o.status==="success"&&Array.isArray(o.partidos)?(sessionStorage.setItem("partidos",JSON.stringify(o.partidos)),m(o.partidos)):c({tipo:o.status,mensaje:"Hubo un problema al obtener los partidos."})}catch(o){c({tipo:o.name,mensaje:"No hay partidos"})}finally{l(!1)}},u=sessionStorage.getItem("partidos");u?(m(JSON.parse(u)),l(!1)):h(),window.scrollTo(0,0)},[]),n)return e.jsx(g,{tipo:n.tipo,mensaje:n.mensaje});if(i)return e.jsx(b,{});function j(h){const u=h.target.dataset.seleccion,o=h.target.value;u==="partidos"?a(o):u===""?a(""):r(o)}return e.jsx(e.Fragment,{children:e.jsxs("section",{className:"container-fluid my-5 mx-auto w-75 min-vh-100",children:[e.jsx("div",{className:"row",children:e.jsx("h1",{className:"mx-auto w-auto text-center",children:"Resultados"})}),e.jsxs("section",{className:"p-3 mb-5 row my-3 bg-primary rounded-top",children:[e.jsx("h5",{className:"mb-3 text-white font-weight-bold",children:"Filtros"}),e.jsxs("div",{className:"col-12 col-md-6 d-flex flex-column flex-md-row justify-content-between",children:[e.jsxs("select",{className:"form-select mb-2 mb-md-0","aria-label":"Default select example","data-seleccion":"partidos",value:t,onChange:j,children:[e.jsx("option",{value:"",children:"Selecciona tipo"}),e.jsx("option",{value:"clasificatorio",children:"Clasificatorio"}),e.jsx("option",{value:"eliminatorias",children:"Eliminatorias"})]}),t==="clasificatorio"&&e.jsxs("select",{className:"form-select","aria-label":"Default select example","data-seleccion":"grupos",value:d,onChange:j,children:[e.jsx("option",{value:"A",children:"Grupo A"}),e.jsx("option",{value:"B",children:"Grupo B"})]})]})]}),e.jsx("section",{className:"row",children:e.jsx(e.Fragment,{children:e.jsx(w,{tipo:t,grupo:d,partidos:s})})})]})})}export{S as default};
