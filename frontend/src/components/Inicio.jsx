import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Carousel from "./Carouseles/Carousel";
import Spinner from "../components/Spinner.jsx";
import cruzRoja from "../assets/imagenes/cruz-roja.png";
import torneo from "../assets/imagenes/torneo.jpeg";
import cesta from "../assets/imagenes/cesta.png";
import donate from "../assets/imagenes/donate.png";
import defaultImagen from "../assets/imagenes/default.jpg";
import "./css/Inicio.css";
import "./css/EstilosComun.css";

import LogoFederacionCantabra from "../../src/assets/imagenes/Logos Colaboradores/Logo Federación Cantabra futbol.png";
import LogoSedeTorrelavega from "../../src/assets/imagenes/Logos Colaboradores/LOGO SEDE TORRELAVEGA 1.png";
import LogoBesaya from "../../src/assets/imagenes/Logos Colaboradores/Logo__Besaya.png";
import LogoLigaSolidaria from "../../src/assets/imagenes/Logos Colaboradores/Logo_liga_solidaria_fp_cantabria.png";
import LogoZapaton from "../../src/assets/imagenes/Logos Colaboradores/logo_zapaton.jpg";
import LogoIESMHP from "../../src/assets/imagenes/Logos Colaboradores/logoIESMHP.png";
import LogosInstitucionales from "../../src/assets/imagenes/Logos Colaboradores/Logos Institucionales.png";

import fetchData from "../data/FetchData";

/**
 * Componente principal de la página de inicio.
 *
 * @component
 *
 * Muestra noticias y retos en carruseles, las donaciones del reto, y la información sobre el torneo solidario.
 * También incluye una sección de colaboradores y patrocinadores.
 *
 * @returns {JSX.Element} Componente de la página de inicio.
 */
function Inicio() {
    const [donaciones, setDonaciones] = useState([]);
    const [retos, setRetos] = useState([]);
    const [noticias, setNoticias] = useState([]);
    const [patrocinadores, setPatrocinadores] = useState([]);
    const [imagenesPatrocinadores, setImagenesPatrocinadores] = useState([]);

    const [searchParams] = useSearchParams();
    const status = searchParams.get("inscripcion-status");

    const apiUrl = import.meta.env.VITE_API_URL;

    /**
     * Efecto para obtener datos de donaciones, publicaciones, retos y patrocinadores al montar el componente.
     */
    useEffect(() => {
        // Obtener las donaciones
        const obtenerDonaciones = async () => {
            try {
                const data = await fetchData("donaciones");
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
                const data = await fetchData("publicaciones");
                if (data.status === "success") {
                    const publicacionesPortada = data.publicaciones.filter(
                        (publicacion) =>
                            publicacion && publicacion.portada === "Si"
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
                const data = await fetchData("retos");
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
                const data = await fetchData("patrocinadores");
                if (data.status === "success") {
                    setPatrocinadores(data.patrocinadores);
                }
            } catch (error) {
                console.error("Error al obtener los patrocinadores:", error);
            }
        };
        obtenerPatrocinadores();
    }, []);

    /**
     * Calcula el total de donaciones recaudadas.
     *
     * @returns {string} El total de donaciones formateado como una cadena con dos decimales.
     */
    function totalDonado() {
        if (!donaciones || donaciones.length === 0) {
            return "0.00";
        }

        let totalDonado = 0;
        donaciones.forEach((donacion) => {
            totalDonado += parseFloat(donacion.importe);
        });

        return totalDonado.toFixed(2);
    }

    return (
        <div className="inicio-container">
            {/* Sección de la imagen de inicio */}
            <div className="imagenInicio d-flex flex-column justify-content-center align-items-center p-4">
                <h2 className="text-white text-center mb-4">
                    TORNEO DE FÚTBOL
                    <br />
                    SOLIDARIO
                </h2>
                <div className="py-2 d-flex justify-content-center align-items-center">
                    <a
                        target="_blank"
                        className="d-flex justify-content-center align-items-center"
                        href="https://cercadeti.cruzroja.es/ligasolidariadeformacionprofesional"
                    >
                        <img src={cruzRoja} alt="Cruz Roja" />
                    </a>
                </div>
            </div>

            {/* Mensaje de confirmación de inscripción */}
            <div>{status === "success" && <h1>¡Inscripción confirmada!</h1>}</div>

            {/* Sección de introducción */}
            <section className="introduccion section-container w-100">
                <div className="seccion1">
                    <div className="titulo p-5 text-center w-100">
                        <h2 className="w-100">PARTICIPA POR UNA CAUSA SOLIDARIA</h2>
                    </div>

                    <div className="texto mx-5 mt-4 my-2">
                        <p>
                            Torrelavega se une por una gran causa en un torneo deportivo con
                            un propósito solidario: recaudar fondos para Cruz Roja. En este
                            evento, la pasión por el deporte y la solidaridad van de la mano
                            para ayudar a quienes más lo necesitan.<br></br>
                            <br></br>
                            Este torneo es el resultado del esfuerzo y la colaboración de
                            muchas personas, incluyendo la participación activa de nuestros
                            alumnos de los institutos de Torrelavega.<br></br>
                            <br></br>
                        </p>
                    </div>

                    <a href="/inscribirse" className="ms-5">
                        <button type="button" className="btn btn-primary fs-6 btn-lg px-5">
                            INSCRÍBETE
                        </button>
                    </a>

                    <div className="infoIntroduccion border border-secondary rounded p-3 mx-5 mt-5">
                        <h4 className="text-center mb-4">Información del Torneo</h4>
                        <h5>
                            <i className="bi bi-calendar me-2"></i>
                            13 y 14 de Marzo de 2025
                        </h5>
                        <a target="_blank" href="https://maps.app.goo.gl/rtgeS49dz9yWYWo99">
                            <h5>
                                <i className="bi bi-geo-alt me-2"></i>
                                Pabellón la Habana Vieja - Torrelavega (Cantabria)
                            </h5>
                        </a>
                    </div>
                </div>

                <div className="seccion2">
                    <img src={torneo} alt="Torneo" />
                </div>
            </section>

            {/* Sección de colaboradores */}
            <section className="colaboradores section-container d-flex flex-column justify-content-center align-items-center m-3">
                <h1 className="text-center">Colaboradores</h1>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                    <div className="p-2 bg-white shadow-sm rounded">
                        <a href="#s" target="_blank">
                            <img
                                src={LogoFederacionCantabra}
                                className="colaboradorImg img-fluid"
                                alt="Logo Federación Cantabra"
                            />
                        </a>
                    </div>

                    <div className="p-2 bg-white shadow-sm rounded">
                        <a href="#s" target="_blank">
                            <img
                                src={LogoSedeTorrelavega}
                                className="colaboradorImg img-fluid"
                                alt="Logo Sede Torrelavega"
                            />
                        </a>
                    </div>

                    <div className="p-2 bg-white shadow-sm rounded">
                        <a href="#s" target="_blank">
                            <img
                                src={LogoBesaya}
                                className="colaboradorImg img-fluid"
                                alt="Logo Besaya"
                            />
                        </a>
                    </div>

                    <div className="p-2 bg-white shadow-sm rounded">
                        <a href="#s" target="_blank">
                            <img
                                src={LogoLigaSolidaria}
                                className="colaboradorImg img-fluid"
                                alt="Logo Liga Solidaria"
                            />
                        </a>
                    </div>

                    <div className="p-2 bg-white shadow-sm rounded">
                        <a href="#s" target="_blank">
                            <img
                                src={LogoZapaton}
                                className="colaboradorImg img-fluid"
                                alt="Logo Zapaton"
                            />
                        </a>
                    </div>

                    <div className="p-2 bg-white shadow-sm rounded">
                        <a href="#s" target="_blank">
                            <img
                                src={LogoIESMHP}
                                className="colaboradorImg img-fluid"
                                alt="Logo IESMHP"
                            />
                        </a>
                    </div>

                    <div className="p-2 bg-white shadow-sm rounded">
                        <a href="#s" target="_blank">
                            <img
                                src={LogosInstitucionales}
                                className="colaboradorImg img-fluid"
                                alt="Logos Institucionales"
                            />
                        </a>
                    </div>
                </div>
            </section>

            {/* Sección de carruseles de noticias y retos */}
            <section className="carruseles section-container d-flex flex-column justify-content-center align-items-center">
                <h1 className="text-center">Noticias</h1>
                {noticias.length > 0 ? (
                    <Carousel
                        id="carouselNoticias"
                        items={noticias}
                        intervalo={3000}
                    />
                ) : (
                    <p className="text-center">No hay noticias disponibles</p>
                )}

                <h1 className="text-center">Retos</h1>
                {retos.length > 0 ? (
                    <Carousel
                        id="carouselRetos"
                        items={retos}
                        intervalo={3000}
                    />
                ) : (
                    <p className="text-center">No hay retos disponibles</p>
                )}
            </section>

            {/* Sección de donaciones */}
            <section className="donaciones container d-flex flex-column align-items-center py-5">
                <h1 className="text-center text-primary fw-bold mb-4">Donaciones</h1>

                <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center">
                    {/* Tarjeta Total Recaudado */}
                    <div className="col">
                        <div className="card shadow-lg border-0 rounded-4 h-100">
                            <div className="card-body d-flex flex-column justify-content-center align-items-center p-4">
                                <img src={cesta} className="mb-3 w-25" alt="Cesta" />
                                <h2 className="text-dark fw-bold">Total Recaudado</h2>
                                <h3 className="text-success fw-bold display-5">
                                    {totalDonado()}€
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta Hacer una Donación */}
                    <div className="col">
                        <div className="card shadow-lg border-0 rounded-4 h-100">
                            <div className="card-body d-flex flex-column justify-content-center align-items-center p-4 text-center">
                                <img src={donate} className="mb-3 w-25" alt="Donar" />
                                <h2 className="text-dark fw-bold">Hacer una Donación</h2>
                                <p className="">
                                    Tu ayuda importa. Cada aporte marca la diferencia.
                                </p>
                                <a
                                    target="_blank"
                                    href="https://cercadeti.cruzroja.es/ligasolidariadeformacionprofesional"
                                    className="btn btn-primary btn-lg mt-2 px-4"
                                >
                                    Donar
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5 bg-light">
                <div className="container text-center">
                    <h1 className="mb-4 text-primary fw-bold">Patrocinadores</h1>
                    <div className="row justify-content-center">
                        {patrocinadores.length > 0 ? (
                            patrocinadores.map((patrocinador) => {
                                const imagenPatrocinador = patrocinador.imagenes[0];
                                const urlImagen = imagenPatrocinador
                                    ? `${apiUrl}/${imagenPatrocinador.ruta}`.replace('/api/', '/storage')
                                    : defaultImagen;

                                return (
                                    <div key={patrocinador.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex">
                                        <div className="bg-white p-3 rounded shadow-sm text-center w-100 d-flex flex-column">
                                            <a href={patrocinador.landing_page} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center justify-content-center flex-grow-1">
                                                <img
                                                    src={urlImagen}
                                                    className="img-fluid"
                                                    alt={patrocinador.nombre}
                                                    style={{ maxHeight: '124px', objectFit: 'contain' }}
                                                />
                                            </a>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-muted">No hay patrocinadores disponibles</p>
                        )}
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Inicio;
