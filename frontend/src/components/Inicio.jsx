import React from 'react';
import Carousel from './Carousel';

import { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";

import api from "../services/api.js";
import Spinner from "../components/Spinner.jsx";

import "./css/Inicio.css";
import "./css/EstilosComun.css";

function Inicio() {
    //arrays para los carruseles
    const [donaciones, setDonaciones] = useState([]);
    //const [patrocinadores, setPatrocinadores] = useState([]);

    const [searchParams] = useSearchParams();
    const status = searchParams.get("inscripcion-status"); // "success" o lo que hayas enviado

    const noticias = [
        { imagen: "../src/assets/imagenes/img2.png", title: "Noticia 1", text: "Lorem ipsum dolor sit amet..." },
        { imagen: "../src/assets/imagenes/img4.png", title: "Noticia 2", text: "Lorem ipsum dolor sit amet..." },
        { imagen: "../src/assets/imagenes/img2.png", title: "Noticia 3", text: "Lorem ipsum dolor sit amet..." },
        { imagen: "../src/assets/imagenes/img2.png", title: "Noticia 4", text: "Lorem ipsum dolor sit amet..." },
        { imagen: "../src/assets/imagenes/img4.png", title: "Noticia 5", text: "Lorem ipsum dolor sit amet..." },
        { imagen: "../src/assets/imagenes/img2.png", title: "Noticia 6", text: "Lorem ipsum dolor sit amet..." }
    ];

    const retos = [
        { imagen: "../src/assets/imagenes/img2.png", title: "Reto 1", text: "Lorem ipsum dolor sit amet..." },
        { imagen: "../src/assets/imagenes/img4.png", title: "Reto 2", text: "Lorem ipsum dolor sit amet..." },
        { imagen: "../src/assets/imagenes/img2.png", title: "Reto 3", text: "Lorem ipsum dolor sit amet..." },
        { imagen: "../src/assets/imagenes/img2.png", title: "Reto 4", text: "Lorem ipsum dolor sit amet..." },
        { imagen: "../src/assets/imagenes/img4.png", title: "Reto 5", text: "Lorem ipsum dolor sit amet..." },
        { imagen: "../src/assets/imagenes/img2.png", title: "Reto 6", text: "Lorem ipsum dolor sit amet..." }
    ];


    //obtener donaciones
    useEffect(() => {
        const obtenerDonaciones = async () => {
            try {
                const respuesta = await api.get("/donaciones");
                if (respuesta.data.status === "success") {
                    setDonaciones(respuesta.data.donaciones);
                }
            } catch (error) {
                console.error("Error al obtener las donaciones:", error);
            }
        };

        obtenerDonaciones();

        /*const obtenerPatrocinadores = async () => {
            try {
                const respuesta = await api.get("/patrocinadores");
                if (respuesta.data.status === "success") {
                    setPatrocinadores(respuesta.data.patrocinadores);
                }
            } catch (error) {
                console.error("Error al obtener los patrocinadores:", error);
            }
        };

        obtenerPatrocinadores();
        */
    }, []);

    function totalDonado() {
        if (!donaciones || donaciones.length === 0) {
            return 0;
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
                <h2 className="text-white">TORNEO SOLIDARIO</h2>
                <h3 className="text-white">Texto</h3>
            </div>

            <div>
                {status === "success" ? (
                    <h1>¡Inscripción confirmada!</h1>
                ) : (
                    ''
                )}
            </div>

            <section className="introduccion section-container">
                <div className='seccion1'>
                    <div className='titulo p-5'>
                        <h5 className='w-100'>PARTICIPA POR UNA CAUSA SOLIDARIA</h5>
                    </div>

                    <div className='texto mx-5 mt-5 my-2'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Voluptatibus atque dicta excepturi error autem ex deleniti
                            consequatur. Tempore quasi doloremque rerum beatae necessitatibus
                            laudantium. Veritatis nobis ipsum iusto repudiandae modi.</p>
                    </div>

                    <div>
                        <button type="button" class="btn btn-secondary btn-lg mx-5 mt-2 px-5">Inscríbete</button>
                    </div>
                </div>


                <div className='seccion2'>
                    <img src="../src/assets/imagenes/football2.jpg"></img>
                </div>
            </section>


            <section className="carruseles section-container">
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <h1>Noticias</h1>
                </div>
                <Carousel id="carouselNoticias" items={noticias} interval={3000} />


                <div className="d-flex flex-column align-items-center justify-content-center">
                    <h1>Retos</h1>
                </div>
                <Carousel id="carouselRetos" items={retos} interval={3000} />
            </section>



            <section className="donaciones container">
                <div className='d-flex flex-column align-items-center justify-content-center'>
                    <h1>Donaciones</h1>
                </div>

                <div className="row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <div className="card text-center">
                            <div className="card-body">
                                <img src="../src/assets/imagenes/cesta.png" className='w-25 m-4'></img>
                                <h2>Total Recaudado</h2>
                                <h2 className='text-success fw-bold'>{totalDonado()}€</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card text-center">
                            <div className="card-body">
                                <img src="../src/assets/imagenes/donate.png" className='w-25 m-4'></img>
                                <h2>Como Donar</h2>
                                <a href="https://cercadeti.cruzroja.es/ligasolidariadeformacionprofesional" className="btn btn-primary">Donar</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/*
                <div className="tarjetasDonar row row-cols-1 row-cols-md-2">
                    <div className="col">
                        <div className="totalRecaudado p-3 rounded-2 text-center">
                            <img src="../src/assets/imagenes/cesta.png" className='w-25 m-4'></img>
                            <h2>Total Recaudado</h2>
                            <h2 className='text-success fw-bold'>{totalDonado()}€</h2>
                        </div>
                    </div>

                    <div className="col">
                        <div className="comoDonar p-3 rounded-2 text-center">
                            <img src="../src/assets/imagenes/donate.png" className='w-25 m-4'></img>
                            <h2>Como Donar</h2>
                            <button className="btn btn-primary mt-2 rounded-pill">Donar</button>
                        </div>
                    </div>
                </div>
                */}
            </section>



            <div className="d-flex align-items-center justify-content-center p-2 bg-secondary mt-5" id="contenedorPatros">
                <div className="d-flex flex-column justify-content-center align-items-center" id="patrocinadores">
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <h1>Patrocinadores</h1>
                    </div>
                    <div className="container mt-4 text-center" id="logosPatrocinadores">
                        {/*
                        {patrocinadores.map((patrocinador) => (
                            <div className="bg-light w-25 h-40 p-3 rounded-2 text-center">
                                <a href={patrocinador.landing_page} target="_blank" rel="noopener noreferrer">
                                    <img src="#" alt={patrocinador.nombre} />
                                    <p className="fw-bold">{patrocinador.nombre}</p>
                                </a>
                            </div>

                        ))}
                        */}
                        <div class="row">
                            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                <img src="../src/assets/imagenes/patrocinadores/acicatech.png" class="img-fluid rounded" alt="Imagen 1" />
                            </div>
                            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                <img src="../src/assets/imagenes/patrocinadores/c&c_color.png" class="img-fluid rounded" alt="Imagen 2" />
                            </div>
                            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                <img src="../src/assets/imagenes/patrocinadores/soicon.png" class="img-fluid rounded" alt="Imagen 3" />
                            </div>
                            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                <img src="../src/assets/imagenes/patrocinadores/cantabria_informatica.png" class="img-fluid rounded" alt="Imagen 4" />
                            </div>
                            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                <img src="../src/assets/imagenes/patrocinadores/cic.png" class="img-fluid rounded" alt="Imagen 5" />
                            </div>
                            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                <img src="../src/assets/imagenes/patrocinadores/deduce.png" class="img-fluid rounded" alt="Imagen 6" />
                            </div>
                            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                <img src="../src/assets/imagenes/patrocinadores/deode.png" class="img-fluid rounded" alt="Imagen 7" />
                            </div>
                            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                <img src="../src/assets/imagenes/patrocinadores/infortec.png" class="img-fluid rounded" alt="Imagen 8" />
                            </div>
                            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                <img src="../src/assets/imagenes/patrocinadores/netkia.png" class="img-fluid rounded" alt="Imagen 9" />
                            </div>
                            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                <img src="../src/assets/imagenes/patrocinadores/seidor.png" class="img-fluid rounded" alt="Imagen 10" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
}

export default Inicio;
