import{c,r as o,j as e,f as i}from"./index-_2EO4M7r.js";function l(){const{id:t}=c(),[r,n]=o.useState([]);return o.useEffect(()=>{(async()=>{try{const s=await i(`retos/${t}`);n(s.reto||[])}catch(s){console.error("Error al obtener retos:",s)}})()},[]),e.jsxs("div",{className:"container mt-4",children:[e.jsx("h1",{children:r.titulo}),e.jsx("p",{children:r.texto}),r.estudio&&r.estudio.centro?e.jsxs(e.Fragment,{children:[e.jsx("h3",{children:"Información del Estudio"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Centro:"})," ",r.estudio.centro.nombre]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Web del Centro:"})," ",e.jsxs("a",{href:r.estudio.centro.landing_page,target:"_blank",rel:"noopener noreferrer",children:["Web de ",r.estudio.centro.nombre]})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Ciclo:"})," ",r.estudio.ciclo.nombre]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Curso:"})," ",r.estudio.curso]})]}):e.jsx("p",{children:"No hay información de estudio disponible."})]})}export{l as default};
