import React, { useEffect, useState } from "react";
import CuadroClasificacion from "../components/CuadroClasificacion";
import api from "../services/api";

const ClasificacionPage = () => {
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


    return (
        <div className="container my-5">
            <h1 className="text-center mb-5">Clasificación</h1>
            <div className="row">
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

export default ClasificacionPage;
