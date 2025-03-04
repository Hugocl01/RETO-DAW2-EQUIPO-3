import React, { useEffect, useState } from "react";
import CuadroClasificacion from "../components/CuadroClasificacion";
import Spinner from "../components/Spinner.jsx";
import fetchData from "../data/FetchData";

import "./css/EstilosComun.css";
import "./css/Clasificacion.css";

function Clasificacion() {
    const [equiposA, setEquiposA] = useState([]);
    const [equiposB, setEquiposB] = useState([]);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const cargarInformacion = async () => {
            try {
                // Simulación de una API real para cada grupo
                const responseA = await fetchData('clasificacion/grupo-a');
                const responseB = await fetchData('clasificacion/grupo-b');

                setEquiposA(responseA);
                setEquiposB(responseB);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        cargarInformacion();
    }, []);

    if (!equiposB.length && !equiposA.length) {
        return <Spinner />;
    }

    return (
        <div className="container my-5 d-flex flex-column jusitfy-content-center align-items-center">
            <h1>Clasificación</h1>
            <div className="tabla-normal row d-flex justify-content-center flex-wrap">
                <div className="cuadro-normal col-6">
                    <CuadroClasificacion titulo="Grupo A" equipos={equiposA} />
                </div>
                <div className="cuadro-normal col-6">
                    <CuadroClasificacion titulo="Grupo B" equipos={equiposB} />
                </div>
            </div>

            <div className="tabla-responsive row d-flex justify-content-center flex-wrap">
                <div className="cuadro-responsive col-8">
                    <CuadroClasificacion titulo="Grupo A" equipos={equiposA} />
                </div>
                <div className="cuadro-responsive col-8">
                    <CuadroClasificacion titulo="Grupo B" equipos={equiposB} />
                </div>
            </div>
        </div>
    );
};

export default Clasificacion;