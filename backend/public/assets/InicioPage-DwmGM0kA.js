import{r as i,j as s,u as y}from"./index-D8IbmME8.js";import{i as f}from"./img2-BuxD_u94.js";function v({id:o,items:u,intervalo:j}){const[a,g]=i.useState(null),[h,d]=i.useState(3);i.useEffect(()=>{const t=()=>{window.innerWidth<768?d(1):window.innerWidth<992?d(2):d(3)};return t(),window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]);const x=[];for(let t=0;t<u.length;t+=h)x.push(u.slice(t,t+h));return s.jsxs("div",{className:"contenido-carousel",children:[s.jsxs("div",{id:o,className:"carousel carousel-dark slide","data-bs-ride":"carousel","data-bs-interval":j,children:[s.jsx("div",{className:"carousel-indicators",children:x.map((t,c)=>s.jsx("button",{type:"button","data-bs-target":`#${o}`,"data-bs-slide-to":c,className:c===0?"active":"","aria-current":c===0?"true":"false","aria-label":`Slide ${c+1}`},c))}),s.jsx("div",{className:"carousel-inner p-5",children:x.map((t,c)=>s.jsx("div",{className:`carousel-item ${c===0?"active":""}`,children:s.jsx("div",{className:"container",children:s.jsx("div",{className:"row justify-content-center",children:t.map((e,b)=>e?s.jsx("div",{className:`col-md-${12/h} d-flex justify-content-center`,children:s.jsxs("div",{className:"card shadow-lg custom-card",children:[s.jsx("img",{src:(e==null?void 0:e.imagen)||f,className:"card-img-top",alt:(e==null?void 0:e.titulo)||"Sin título"}),s.jsxs("div",{className:"card-body d-flex flex-column justify-content-between",children:[s.jsx("h4",{className:"card-title",children:(e==null?void 0:e.titulo)||"Sin título"}),s.jsx("p",{className:"card-text",children:e!=null&&e.texto?e.texto.length>160?`${e.texto.substring(0,150)}...`:e.texto:e!=null&&e.contenido?e.contenido.length>160?`${e.contenido.substring(0,150)}...`:e.contenido:"No hay contenido disponible"}),s.jsx("button",{className:"btn btn-success",onClick:()=>g(e),"data-bs-toggle":"modal","data-bs-target":`#leerMasModal_${o}`,children:"LEER MÁS"})]})]})},b):null)})})},c))}),s.jsxs("button",{className:"carousel-control-prev",type:"button","data-bs-target":`#${o}`,"data-bs-slide":"prev",children:[s.jsx("span",{className:"carousel-control-prev-icon","aria-hidden":"true"}),s.jsx("span",{className:"visually-hidden",children:"Previous"})]}),s.jsxs("button",{className:"carousel-control-next",type:"button","data-bs-target":`#${o}`,"data-bs-slide":"next",children:[s.jsx("span",{className:"carousel-control-next-icon","aria-hidden":"true"}),s.jsx("span",{className:"visually-hidden",children:"Next"})]})]}),s.jsx("div",{className:"modal fade",id:`leerMasModal_${o}`,tabIndex:"-1","aria-hidden":"true",children:s.jsx("div",{className:"modal-dialog modal-lg",children:s.jsxs("div",{className:"modal-content",children:[s.jsxs("div",{className:"modal-header",children:[s.jsx("h5",{className:"modal-title",children:a?a.titulo:"Título"}),s.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),s.jsx("div",{className:"modal-body",children:a?s.jsxs(s.Fragment,{children:[s.jsx("img",{src:(a==null?void 0:a.imagen)||f,className:"img-fluid mb-3",alt:a.titulo}),s.jsx("h4",{className:"card-title mb-4",children:(a==null?void 0:a.titulo)||"Sin título"}),s.jsx("p",{children:a.texto||a.contenido})]}):s.jsx("p",{children:"Cargando..."})}),s.jsx("div",{className:"modal-footer",children:s.jsx("button",{type:"button",className:"btn btn-secondary","data-bs-dismiss":"modal",children:"Cerrar"})})]})})})]})}const w="/assets/cruz-roja-CIWVl830.png",I="/assets/torneo-XSvOHKaR.jpeg",E="/assets/cesta-a3hBFm02.png",S="/assets/donate-hXzejufu.png";function C(){const[o,u]=i.useState([]),[j,a]=i.useState([]),[g,h]=i.useState([]),[d,x]=i.useState([]),[t]=y(),c=t.get("inscripcion-status"),e="http://23.23.87.65/api/";i.useEffect(()=>{(async()=>{try{const n=await(await fetch("/api/donaciones")).json();n.status==="success"&&u(n.donaciones)}catch(r){console.error("Error al obtener las donaciones:",r)}})(),(async()=>{try{const n=await(await fetch("/api/publicaciones")).json();if(n.status==="success"){const p=n.publicaciones.filter(m=>m&&m.titulo&&m.portada==="Si");h(p)}}catch(r){console.error("Error al obtener las publicaciones:",r)}})(),(async()=>{try{const n=await(await fetch("/api/retos")).json();if(n.status==="success"){const p=n.retos.filter(m=>m&&m.texto);a(p)}}catch(r){console.error("Error al obtener los retos:",r)}})(),(async()=>{try{const n=await(await fetch("/api/patrocinadores")).json();n.status==="success"&&x(n.patrocinadores)}catch(r){console.error("Error al obtener los patrocinadores:",r)}})()},[]);function b(){if(!o||o.length===0)return"0.00";let l=0;return o.forEach(N=>{l+=parseFloat(N.importe)}),l.toFixed(2)}return s.jsxs("div",{className:"inicio-container",children:[s.jsxs("div",{className:"imagenInicio d-flex flex-column justify-content-center align-items-center p-4",children:[s.jsxs("h2",{className:"text-white text-center mb-4",children:["TORNEO DE FÚTBOL",s.jsx("br",{}),"SOLIDARIO"]}),s.jsx("div",{className:"py-2 d-flex justify-content-center align-items-center",children:s.jsx("a",{target:"_blank",className:"d-flex justify-content-center align-items-center",href:"https://cercadeti.cruzroja.es/ligasolidariadeformacionprofesional",children:s.jsx("img",{src:w,alt:"Cruz Roja"})})})]}),s.jsx("div",{children:c==="success"&&s.jsx("h1",{children:"¡Inscripción confirmada!"})}),s.jsxs("section",{className:"introduccion section-container w-100",children:[s.jsxs("div",{className:"seccion1",children:[s.jsx("div",{className:"titulo p-5 text-center w-100",children:s.jsx("h2",{className:"w-100",children:"PARTICIPA POR UNA CAUSA SOLIDARIA"})}),s.jsx("div",{className:"texto mx-5 mt-4 my-2",children:s.jsxs("p",{children:["Torrelavega se une por una gran causa en un torneo deportivo con un propósito solidario: recaudar fondos para Cruz Roja. En este evento, la pasión por el deporte y la solidaridad van de la mano para ayudar a quienes más lo necesitan.",s.jsx("br",{}),s.jsx("br",{}),"Este torneo es el resultado del esfuerzo y la colaboración de muchas personas, incluyendo la participación activa de nuestros alumnos de los institutos de Torrelavega.",s.jsx("br",{}),s.jsx("br",{})]})}),s.jsx("div",{className:"mx-5 mt-2",children:s.jsx("button",{type:"button",className:"btn btn-primary fs-6 btn-lg px-5",children:"INSCRÍBETE"})}),s.jsxs("div",{className:"infoIntroduccion border border-secondary rounded p-3 mx-5 mt-5",children:[s.jsx("h4",{className:"text-center mb-4",children:"Informacion del Torneo"}),s.jsxs("h5",{children:[s.jsx("i",{className:"bi bi-calendar me-2"}),"13 y 14 de Marzo de 2025"]}),s.jsx("a",{target:"_blank",href:"https://maps.app.goo.gl/rtgeS49dz9yWYWo99",children:s.jsxs("h5",{children:[s.jsx("i",{className:"bi bi-geo-alt me-2"}),"Pabellón la Habana Vieja - Torrelavega (Cantabria)"]})})]})]}),s.jsx("div",{className:"seccion2",children:s.jsx("img",{src:I,alt:"Torneo"})})]}),s.jsxs("section",{className:"colaboradores section-container d-flex flex-column justify-content-center align-items-center",children:[s.jsx("h1",{className:"text-center",children:"Colaboradores"}),s.jsxs("div",{className:"d-flex flex-wrap justify-content-center gap-3",children:[s.jsx("div",{className:"p-2 bg-white shadow-sm rounded",children:s.jsx("a",{href:"#s",target:"_blank",children:s.jsx("img",{src:"../../src/assets/imagenes/Logos Colaboradores/Logo Federación Cantabra futbol.png",className:"colaboradorImg img-fluid",alt:""})})}),s.jsx("div",{className:"p-2 bg-white shadow-sm rounded",children:s.jsx("a",{href:"#s",target:"_blank",children:s.jsx("img",{src:"../../src/assets/imagenes/Logos Colaboradores/LOGO SEDE TORRELAVEGA 1.png",className:"colaboradorImg img-fluid",alt:""})})}),s.jsx("div",{className:"p-2 bg-white shadow-sm rounded",children:s.jsx("a",{href:"#s",target:"_blank",children:s.jsx("img",{src:"../../src/assets/imagenes/Logos Colaboradores/Logo__Besaya.png",className:"colaboradorImg img-fluid",alt:""})})}),s.jsx("div",{className:"p-2 bg-white shadow-sm rounded",children:s.jsx("a",{href:"#s",target:"_blank",children:s.jsx("img",{src:"../../src/assets/imagenes/Logos Colaboradores/Logo_liga_solidaria_fp_cantabria.png",className:"colaboradorImg img-fluid",alt:""})})}),s.jsx("div",{className:"p-2 bg-white shadow-sm rounded",children:s.jsx("a",{href:"#s",target:"_blank",children:s.jsx("img",{src:"../../src/assets/imagenes/Logos Colaboradores/logo_zapaton.jpg",className:"colaboradorImg img-fluid",alt:""})})}),s.jsx("div",{className:"p-2 bg-white shadow-sm rounded",children:s.jsx("a",{href:"#s",target:"_blank",children:s.jsx("img",{src:"../../src/assets/imagenes/Logos Colaboradores/logoIESMHP.png",className:"colaboradorImg img-fluid",alt:""})})}),s.jsx("div",{className:"p-2 bg-white shadow-sm rounded",children:s.jsx("a",{href:"#s",target:"_blank",children:s.jsx("img",{src:"../../src/assets/imagenes/Logos Colaboradores/Logos Institucionales.png",className:"colaboradorImg img-fluid",alt:""})})})]})]}),s.jsxs("section",{className:"carruseles section-container d-flex flex-column justify-content-center align-items-center",children:[s.jsx("h1",{className:"text-center",children:"Noticias"}),g.length>0?s.jsx(v,{id:"carouselNoticias",items:g,intervalo:3e3}):s.jsx("p",{className:"text-center",children:"No hay noticias disponibles"}),s.jsx("h1",{className:"text-center",children:"Retos"}),j.length>0?s.jsx(v,{id:"carouselRetos",items:j,intervalo:3e3}):s.jsx("p",{className:"text-center",children:"No hay retos disponibles"})]}),s.jsxs("section",{className:"donaciones container d-flex flex-column align-items-center py-5",children:[s.jsx("h1",{className:"text-center text-primary fw-bold mb-4",children:"Donaciones"}),s.jsxs("div",{className:"row row-cols-1 row-cols-md-2 g-4 justify-content-center",children:[s.jsx("div",{className:"col",children:s.jsx("div",{className:"card shadow-lg border-0 rounded-4 h-100",children:s.jsxs("div",{className:"card-body d-flex flex-column justify-content-center align-items-center p-4",children:[s.jsx("img",{src:E,className:"mb-3 w-25",alt:"Cesta"}),s.jsx("h2",{className:"text-dark fw-bold",children:"Total Recaudado"}),s.jsxs("h3",{className:"text-success fw-bold display-5",children:[b(),"€"]})]})})}),s.jsx("div",{className:"col",children:s.jsx("div",{className:"card shadow-lg border-0 rounded-4 h-100",children:s.jsxs("div",{className:"card-body d-flex flex-column justify-content-center align-items-center p-4 text-center",children:[s.jsx("img",{src:S,className:"mb-3 w-25",alt:"Donar"}),s.jsx("h2",{className:"text-dark fw-bold",children:"Hacer una Donación"}),s.jsx("p",{className:"text-muted lead",children:"Tu ayuda importa. Cada aporte marca la diferencia."}),s.jsx("a",{target:"_blank",href:"https://cercadeti.cruzroja.es/ligasolidariadeformacionprofesional",className:"btn btn-primary btn-lg mt-3 px-4",children:"Donar"})]})})})]})]}),s.jsx("section",{className:"contenedorPatros py-5 bg-secondary",children:s.jsxs("div",{className:"patrocinadores container text-center",children:[s.jsx("h1",{className:"mb-4 text-primary fw-bold",children:"Patrocinadores"}),s.jsx("div",{className:"d-flex flex-wrap justify-content-center gap-3",children:d.length>0?d.map(l=>s.jsx("div",{className:"p-2 bg-white shadow-sm rounded",children:s.jsx("a",{href:l.landing_page,target:"_blank",rel:"noopener noreferrer",children:s.jsx("img",{src:`${e+l.ruta}`,className:"patrocinadorImg img-fluid",alt:l.nombre})})},l.nombre)):s.jsx("p",{className:"text-muted",children:"No hay patrocinadores disponibles"})})]})})]})}function k(){return s.jsxs(s.Fragment,{children:[s.jsx("title",{children:"Inicio"}),s.jsx(C,{})]})}export{k as default};
