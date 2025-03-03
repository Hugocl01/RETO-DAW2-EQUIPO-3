import { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import Carousel from './Carouseles/Carousel';
import Spinner from "../components/Spinner.jsx";
import "./css/Inicio.css";
import "./css/EstilosComun.css";

/**
 * Componente principal de la página de inicio.
 * 
 * @component
 * 
 * Muestra noticias y retos en carruseles, las donaciones del reto.
 * @returns {JSX.Element} Componente de la página de inicio.
 */
function Inicio() {
    const [donaciones, setDonaciones] = useState([]);
    const [retos, setRetos] = useState([]);
    const [noticias, setNoticias] = useState([]);
    const [patrocinadores, setPatrocinadores] = useState([]);

    const [searchParams] = useSearchParams();
    const status = searchParams.get("inscripcion-status");

    useEffect(() => {
        // Obtener las donaciones
        const obtenerDonaciones = async () => {
            try {
                const respuesta = await fetch("/api/donaciones");
                const data = await respuesta.json();
                if (data.status === "success") {
                    setDonaciones(data.donaciones);
                }
            } catch (error) {
                console.error("Error al obtener las donaciones:", error);
            }
        };
        obtenerDonaciones();

        // Obtener publicaciones
        const obtenerPublicaciones = async () => {
            try {
                const respuesta = await fetch("/api/publicaciones");
                const data = await respuesta.json();
                if (data.status === "success") {
                    const publicacionesPortada = data.publicaciones.filter(
                        (publicacion) => publicacion && publicacion.titulo && publicacion.portada === 'Si'
                    );
                    setNoticias(publicacionesPortada);
                }
            } catch (error) {
                console.error("Error al obtener las publicaciones:", error);
            }
        };
        obtenerPublicaciones();

        // Obtener retos
        const obtenerRetos = async () => {
            try {
                const respuesta = await fetch("/api/retos");
                const data = await respuesta.json();
                if (data.status === "success") {
                    const retosValidos = data.retos.filter((reto) => reto && reto.texto);
                    setRetos(retosValidos);
                }
            } catch (error) {
                console.error("Error al obtener los retos:", error);
            }
        };
        obtenerRetos();

        // Obtener patrocinadores
        const obtenerPatrocinadores = async () => {
            try {
                const respuesta = await fetch("/api/patrocinadores");
                const data = await respuesta.json();
                if (data.status === "success") {
                    setPatrocinadores(data.patrocinadores);
                }
            } catch (error) {
                console.error("Error al obtener los patrocinadores:", error);
            }
        };
        obtenerPatrocinadores();

    }, []);

    function totalDonado() {
        if (!donaciones || donaciones.length === 0) {
            return "0.00";
        }

        let totalDonado = 0;
        donaciones.forEach(donacion => {
            totalDonado += parseFloat(donacion.importe);
        });

        return totalDonado.toFixed(2);
    }

    return (
        <div className="inicio-container">
            <div className="imagenInicio d-flex flex-column justify-content-center align-items-center p-4">
                <h2 className="text-white text-center mb-4">TORNEO DE FÚTBOL<br />SOLIDARIO</h2>
                <div className='py-2 d-flex justify-content-center align-items-center'>
                    <a target="_blank" className='d-flex justify-content-center align-items-center' href="https://cercadeti.cruzroja.es/ligasolidariadeformacionprofesional">
                        <img src="/assets/imagenes/cruz-roja.png" alt="Cruz Roja" />
                    </a>
                </div>
            </div>

            <div>
                {status === "success" && (
                    <h1>¡Inscripción confirmada!</h1>
                )}
            </div>

            <section className="introduccion section-container w-100">
                <div className='seccion1'>
                    <div className='titulo p-5 text-center w-100 mt-3'>
                        <h2 className='w-100'>PARTICIPA POR UNA CAUSA SOLIDARIA</h2>
                    </div>

                    <div className='texto mx-5 mt-5 my-2'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Voluptatibus atque dicta excepturi error autem ex deleniti
                            consequatur. Tempore quasi doloremque rerum beatae necessitatibus
                            laudantium. Veritatis nobis ipsum iusto repudiandae modi.</p>
                    </div>

                    <div className='mx-5 mt-2'>
                        <button type="button" className="btn btn-primary fs-6 btn-lg px-5">INSCRÍBETE</button>
                    </div>

                    <div className='infoIntroduccion border border-secondary rounded p-3 mx-5 mt-5'>
                        <h4 className='text-center mb-4'>Informacion del Torneo</h4>
                        <h5>
                            <i className="bi bi-calendar me-2"></i>
                            13 y 14 de Marzo de 2025
                        </h5>
                        <a target="_blank" href='https://maps.app.goo.gl/rtgeS49dz9yWYWo99'>
                            <h5>
                                <i className="bi bi-geo-alt me-2"></i>
                                Pabellón la Habana Vieja - Torrelavega (Cantabria)
                            </h5>
                        </a>
                    </div>
                </div>

                <div className='seccion2'>
                    <img src="/assets/imagenes/torneo.jpeg" alt="Torneo" />
                </div>
            </section>

            <section className="carruseles section-container d-flex flex-column justify-content-center align-items-center">
                <h1 className='text-center'>Noticias</h1>
                {noticias.length > 0 ? (
                    <Carousel id="carouselNoticias" items={noticias} intervalo={3000} />
                ) : (
                    <p className="text-center">No hay noticias disponibles</p>
                )}

                <h1 className='text-center'>Retos</h1>
                {retos.length > 0 ? (
                    <Carousel id="carouselRetos" items={retos} intervalo={3000} />
                ) : (
                    <p className="text-center">No hay retos disponibles</p>
                )}
            </section>

            <section className="donaciones container d-flex flex-column justify-content-center align-items-center">
                <h1 className='text-center'>Donaciones</h1>

                <div className="row m-5">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <div className="card text-center">
                            <div className="card-body d-flex flex-column justify-content-center align-items-center p-2">
                                <img src="/assets/imagenes/cesta.png" className='w-25 m-4' alt="Cesta" />
                                <h2>Total Recaudado</h2>
                                <h2 className='text-success fw-bold'>{totalDonado()}€</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <div className="card text-center">
                            <div className="card-body d-flex flex-column justify-content-center align-items-center p-2">
                                <img src="/assets/imagenes/donate.png" className='w-25 m-4' alt="Donar" />
                                <h2>Hacer una Donación</h2>
                                <p>Tu ayuda importa. Cada aporte marca la diferencia</p>
                                <div>
                                    <a target="_blank" href="https://cercadeti.cruzroja.es/ligasolidariadeformacionprofesional" className="btn btn-primary">Donar</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='patrocinadores'>
                <div className="d-flex align-items-center justify-content-center p-2 bg-secondary mt-5" id="contenedorPatros">
                    <div className="d-flex flex-column justify-content-center align-items-center m-5" id="patrocinadores">
                        <h1 className='text-center mb-5 mt-5'>Patrocinadores</h1>
                        <div className="container m-4 p-2 text-center" id="logosPatrocinadores">
                            <div className="row">
                                {patrocinadores.length > 0 ? patrocinadores.map((patrocinador) => (
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 d-flex justify-content-center align-items-center" key={patrocinador.nombre}>
                                        <a href={patrocinador.landing_page} target="_blank" rel="noopener noreferrer">
                                            <img src={patrocinador.ruta} className="img-fluid" alt={patrocinador.nombre} />
                                        </a>
                                    </div>
                                )) : (
                                    <p>No hay patrocinadores disponibles</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Inicio;
