import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../data/FetchData";

function RetoPage() {
    const { id } = useParams();
    const [reto, setReto] = useState([]);

    useEffect(() => {
        const fetchRetos = async () => {
            try {
                const response = await fetchData(`retos/${id}`);
                setReto(response.reto || []);
            } catch (error) {
                console.error("Error al obtener retos:", error);
            }
        };

        fetchRetos();
    }, []);

    return (
        <div className="container mt-4">
            <h1>{reto.titulo}</h1>
            <p>{reto.texto}</p>

            {reto.estudio && reto.estudio.centro ? (
                <>
                    <h3>Información del Estudio</h3>
                    <p><strong>Centro:</strong> {reto.estudio.centro.nombre}</p>
                    <p>
                        <strong>Web del Centro:</strong> <a href={reto.estudio.centro.landing_page} target="_blank" rel="noopener noreferrer">Web de {reto.estudio.centro.nombre}</a>
                    </p>
                    <p><strong>Ciclo:</strong> {reto.estudio.ciclo.nombre}</p>
                    <p><strong>Curso:</strong> {reto.estudio.curso}</p>
                </>
            ) : (
                <p>No hay información de estudio disponible.</p>
            )}
        </div>
    );
}

export default RetoPage;