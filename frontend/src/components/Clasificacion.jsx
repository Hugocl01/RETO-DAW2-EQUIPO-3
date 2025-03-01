import React, { useEffect, useState } from "react";
import CuadroClasificacion from "../components/CuadroClasificacion";
import api from "../services/api";
import Spinner from "../components/Spinner.jsx";

import "./css/EstilosComun.css";


function Clasificacion() {
    const [equiposA, setEquiposA] = useState([]);
    const [equiposB, setEquiposB] = useState([]);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulación de una API real para cada grupo
                const responseA = await api.get('/clasificacion/grupo-a');
                const responseB = await api.get('/clasificacion/grupo-b');

                setEquiposA(responseA.data);
                setEquiposB(responseB.data);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, []);

    if (!equiposB.length && !equiposA.length) {
        return <Spinner />;
    }

    return (
        <div className="container my-5 d-flex flex-column jusitfy-content-center align-items-center">
            <h1>Clasificación</h1>
            <div className="row d-flex flex-wrap">
                <div className="col-md-6">
                    <CuadroClasificacion titulo="Grupo A" equipos={equiposA} />
                </div>
                <div className="col-md-6">
                    <CuadroClasificacion titulo="Grupo B" equipos={equiposB} />
                </div>
            </div>
        </div>
    );
};

export default Clasificacion;