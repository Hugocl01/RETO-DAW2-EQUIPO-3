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
        <div className="inicio-container d-flex flex-column justify-content-center align-items-center">
            <div className="imagenInicio d-flex flex-column justify-content-center align-items-center p-4 w-100 vh-100">
                <h2 className="text-white text-center">TORNEO SOLIDARIO</h2>
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
                        <button type="button" className="btn btn-secondary btn-lg mx-5 my-2 px-5">Inscríbete</button>
                    </div>
                </div>

                <div className='seccion2'>
                    <img src="../src/assets/imagenes/football2.jpg" alt="Fútbol" />
                </div>
            </section>
        </div>
    );
}

export default Inicio;
