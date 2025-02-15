import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function RetoPage() {
    const { id } = useParams();
    const [reto, setReto] = useState([]);

    useEffect(() => {
        const fetchRetos = async () => {
            try {
                const response = await api.get(`/retos/${id}`);
                setReto(response.data.reto || []);
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

            <h3>Información del Estudio</h3>
            <p><strong>Centro:</strong> {reto.estudio.centro.nombre}</p>
            <p>
                <strong>Web del Centro:</strong> <a href={reto.estudio.centro.landing_page} target="_blank" rel="noopener noreferrer">{reto.estudio.centro.landing_page}</a>
            </p>
            <p><strong>Ciclo:</strong> {reto.estudio.ciclo.nombre}</p>
            <p><strong>Curso:</strong> {reto.estudio.curso}</p>
        </div>
    );
}

export default RetoPage;