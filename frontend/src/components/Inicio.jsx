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
        {
            imagen: "../src/assets/imagenes/img2.png",
            title: "Noticia 1",
            text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus vel repellendus perspiciatis aspernatur! Consequuntur assumenda praesentium modi! Doloremque asperiores corrupti adipisci quos id dolorem, enim ullam tempora reprehenderit delectus eum?",
        },
        {
            imagen: "../src/assets/imagenes/img4.png",
            title: "Noticia 2",
            text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus vel repellendus perspiciatis aspernatur! Consequuntur assumenda praesentium modi! Doloremque asperiores corrupti adipisci quos id dolorem, enim ullam tempora reprehenderit delectus eum?",
        },
        {
            imagen: "../src/assets/imagenes/img2.png",
            title: "Noticia 3",
            text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus vel repellendus perspiciatis aspernatur! Consequuntur assumenda praesentium modi! Doloremque asperiores corrupti adipisci quos id dolorem, enim ullam tempora reprehenderit delectus eum?",
        },
        {
            imagen: "../src/assets/imagenes/img2.png",
            title: "Noticia 4",
            text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus vel repellendus perspiciatis aspernatur! Consequuntur assumenda praesentium modi! Doloremque asperiores corrupti adipisci quos id dolorem, enim ullam tempora reprehenderit delectus eum?",
        },
        {
            imagen: "../src/assets/imagenes/img2.png",
            title: "Noticia 5",
            text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus vel repellendus perspiciatis aspernatur! Consequuntur assumenda praesentium modi! Doloremque asperiores corrupti adipisci quos id dolorem, enim ullam tempora reprehenderit delectus eum?",
        },
        {
            imagen: "../src/assets/imagenes/img2.png",
            title: "Noticia 6",
            text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus vel repellendus perspiciatis aspernatur! Consequuntur assumenda praesentium modi! Doloremque asperiores corrupti adipisci quos id dolorem, enim ullam tempora reprehenderit delectus eum?",
        },
        {
            imagen: "../src/assets/imagenes/img2.png",
            title: "Noticia 7",
            text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus vel repellendus perspiciatis aspernatur! Consequuntur assumenda praesentium modi! Doloremque asperiores corrupti adipisci quos id dolorem, enim ullam tempora reprehenderit delectus eum?",
        },
        {
            imagen: "../src/assets/imagenes/img2.png",
            title: "Noticia 8",
            text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus vel repellendus perspiciatis aspernatur! Consequuntur assumenda praesentium modi! Doloremque asperiores corrupti adipisci quos id dolorem, enim ullam tempora reprehenderit delectus eum?",
        },
    ];

    const retos = [
        {
            imagen: "../src/assets/imagenes/img2.png",
            title: "Reto 1",
            text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus vel repellendus perspiciatis aspernatur! Consequuntur assumenda praesentium modi! Doloremque asperiores corrupti adipisci quos id dolorem, enim ullam tempora reprehenderit delectus eum?",
        },
        {
            imagen: "../src/assets/imagenes/img4.png",
            title: "Reto 2",
            text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus vel repellendus perspiciatis aspernatur! Consequuntur assumenda praesentium modi! Doloremque asperiores corrupti adipisci quos id dolorem, enim ullam tempora reprehenderit delectus eum?",
        },
        {
            imagen: "../src/assets/imagenes/img2.png",
            title: "Reto 3",
            text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus vel repellendus perspiciatis aspernatur! Consequuntur assumenda praesentium modi! Doloremque asperiores corrupti adipisci quos id dolorem, enim ullam tempora reprehenderit delectus eum?",
        },
        {
            imagen: "../src/assets/imagenes/img2.png",
            title: "Reto 3",
            text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus vel repellendus perspiciatis aspernatur! Consequuntur assumenda praesentium modi! Doloremque asperiores corrupti adipisci quos id dolorem, enim ullam tempora reprehenderit delectus eum?",
        },
        {
            imagen: "../src/assets/imagenes/img2.png",
            title: "Reto 4",
            text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus vel repellendus perspiciatis aspernatur! Consequuntur assumenda praesentium modi! Doloremque asperiores corrupti adipisci quos id dolorem, enim ullam tempora reprehenderit delectus eum?",
        },
        {
            imagen: "../src/assets/imagenes/img2.png",
            title: "Reto 5",
            text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus vel repellendus perspiciatis aspernatur! Consequuntur assumenda praesentium modi! Doloremque asperiores corrupti adipisci quos id dolorem, enim ullam tempora reprehenderit delectus eum?",
        },
        {
            imagen: "../src/assets/imagenes/img2.png",
            title: "Reto 6",
            text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus vel repellendus perspiciatis aspernatur! Consequuntur assumenda praesentium modi! Doloremque asperiores corrupti adipisci quos id dolorem, enim ullam tempora reprehenderit delectus eum?",
        },
        {
            imagen: "../src/assets/imagenes/img2.png",
            title: "Reto 7",
            text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus vel repellendus perspiciatis aspernatur! Consequuntur assumenda praesentium modi! Doloremque asperiores corrupti adipisci quos id dolorem, enim ullam tempora reprehenderit delectus eum?",
        },
        {
            imagen: "../src/assets/imagenes/img2.png",
            title: "Reto 8",
            text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus vel repellendus perspiciatis aspernatur! Consequuntur assumenda praesentium modi! Doloremque asperiores corrupti adipisci quos id dolorem, enim ullam tempora reprehenderit delectus eum?",
        },
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
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="row w-100 vh-100 imagenInicio d-flex justify-content-center align-items-center">
                <h2 className=" w-50 text-white text-center">TORNEO SOLIDARIO</h2>
            </div>

            <div>
                {status === "success" ? (
                    <h1>¡Inscripción confirmada!</h1>
                ) : (
                    ''
                )}
            </div>

            <div className="d-flex flex-column align-items-center justify-content-center p-5">
                <h1 className="mb-5">Noticias</h1>
                <Carousel id="carouselExampleDark" items={noticias} interval={3000} />
                <hr className="border-3 border-black d-block w-100 my-5" />

                <h1 className="mb-5">Retos</h1>
                <Carousel id="carouselExampleDark2" items={retos} interval={3000} />

                <hr className="border-3 border-black d-block w-100 my-5" />

                <div className="container d-flex flex-column align-items-center justify-content-center p-5">
                    <h1 className="mb-5">Donaciones</h1>
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        <div className="col">
                            <div className="bg-light p-3 rounded-2 text-center">
                                <img src="../src/assets/imagenes/cesta.png" className='w-25 m-4'></img>
                                <h2>Total Recaudado</h2>
                                <h2 className='text-success fw-bold'>{totalDonado()}€</h2>
                            </div>
                        </div>

                        <div className="col">
                            <div className="bg-light p-3 rounded-2 text-center">
                                <img src="../src/assets/imagenes/donate.png" className='w-25 m-4'></img>
                                <h2>Como Donar</h2>
                                <button className="btn btn-primary mt-2 rounded-pill">Donar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-wrap align-items-center justify-content-center p-2 bg-secondary mt-5" id="contenedorPatros">
                    <div className="d-flex flex-wrap flex-column justify-content-center align-items-center" id="patrocinadores">
                        <h1 className="mb-5 mt-4">Patrocinadores</h1>
                        <div className="m-4 d-flex flex-wrap justify-content-center align-items-center">
                            {/*
                        {patrocinadores.map((patrocinador) => (
                            <div className="bg-light w-25 h-25 p-3 rounded-2 text-center">
                                <a href={patrocinador.landing_page} target="_blank" rel="noopener noreferrer">
                                    <img src="#" className="w-25" alt={patrocinador.nombre} />
                                    <p className="fw-bold">{patrocinador.nombre}</p>
                                </a>
                            </div>

                        ))}
                        */}
                            <div className="w-25 h-40 p-3 rounded-2">
                                <img src="../src/assets/imagenes/patrocinadores/acicatech.png" />
                            </div>
                            <div className="w-25 h-40 p-3 rounded-2">
                                <img src="../src/assets/imagenes/patrocinadores/c&c_color.png" />
                            </div>

                            <div className="w-25 h-40 p-3 rounded-2">
                                <img src="../src/assets/imagenes/patrocinadores/cantabria_informatica.png" />
                            </div>

                            <div className="w-25 h-40 p-3 rounded-2">
                                <img src="../src/assets/imagenes/patrocinadores/cic.png" />
                            </div>

                            <div className="w-25 h-40 p-3 rounded-2">
                                <img src="../src/assets/imagenes/patrocinadores/deduce.png" />
                            </div>

                            <div className="w-25 h-40 p-3 rounded-2">
                                <img src="../src/assets/imagenes/patrocinadores/deode.png" />
                            </div>

                            <div className="w-25 h-40 p-3 rounded-2">
                                <img src="../src/assets/imagenes/patrocinadores/infortec.png" />
                            </div>

                            <div className="w-25 h-40 p-3 rounded-2">
                                <img src="../src/assets/imagenes/patrocinadores/netkia.png" />
                            </div>

                            <div className="w-25 h-40 p-3 rounded-2">
                                <img src="../src/assets/imagenes/patrocinadores/seidor.png" />
                            </div>

                            <div className="w-25 h-40 p-3 rounded-2">
                                <img src="../src/assets/imagenes/patrocinadores/soicon.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Inicio;
