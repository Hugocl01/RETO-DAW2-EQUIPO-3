import React from 'react';
import Carousel from './Carousel';

import { useState, useEffect } from 'react';

function Inicio() {
    //arrays para los carruseles
    const [donaciones, setDonaciones] = useState([]);

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
    ];

    //obtener donaciones
    useEffect(() => {
        const obtenerDonaciones = async () => {
            try {
                const respuesta = await api.get("/donaciones");
                if (respuesta.data.status === "success") {
                    setDonaciones(respuesta.data.ciclos);
                }
            } catch (error) {
                console.error("Error al obtener los ciclos:", error);
            }
        };

        obtenerDonaciones();
    }, []);

    function totalDonado() {
        return donaciones.reduce((total, donacion) => total + donacion.importe, 0);
    }
    

    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="imagenInicio">
                <img src="../src/assets/imagenes/img2.png" className="w-100 h-100 vh-100 object-fit-cover" alt="..." />
            </div>

            <div className="d-flex flex-column align-items-center justify-content-center p-5">
                <h1 className="mb-5">Noticias</h1>
                <Carousel id="carouselExampleDark" items={noticias} interval={3000} />

                <hr className="border-3 border-black d-block w-100 my-5" />

                <h1 className="mb-5">Retos</h1>
                <Carousel id="carouselExampleDark2" items={retos} interval={3000} />

                <hr className="border-3 border-black d-block w-100 my-5" />

                <div className="container">
                    <h1 className="text-center mb-5">Donaciones</h1>
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        <div className="col">
                            <div className="bg-light p-3 rounded-2 text-center">
                                <h2>Total donado</h2>
                                <h1>{totalDonado()}</h1>
                            </div>
                        </div>

                        <div className="col">
                            <div className="bg-light p-3 rounded-2 text-center">
                                <h2>Info y enlace a donar</h2>
                                <button className="btn btn-primary mt-2">Donar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-3 border-black d-block w-100 my-5" />

                <div className="d-flex flex-column justify-content-center align-items-center mb-5">
                    <h1 className="text-center mb-4">Patrocinadores</h1>
                    <div className="d-flex flex-wrap justify-content-center align-items-center gap-4">
                        <div className="bg-light w-25 h-25 p-3 rounded-2 text-center">
                            <p>Patrocinador 1</p>
                        </div>

                        <div className="bg-light w-25 h-40 p-3 rounded-2 text-center">
                            <p>Patrocinador 2</p>
                        </div>

                        <div className="bg-light w-25 h-40 p-3 rounded-2 text-center">
                            <p>Patrocinador 3</p>
                        </div>

                        <div className="bg-light w-25 h-40 p-3 rounded-2 text-center">
                            <p>Patrocinador 4</p>
                        </div>

                        <div className="bg-light w-25 h-40 p-3 rounded-2 text-center">
                            <p>Patrocinador 5</p>
                        </div>

                        <div className="bg-light w-25 h-40 p-3 rounded-2 text-center">
                            <p>Patrocinador 6</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Inicio;
