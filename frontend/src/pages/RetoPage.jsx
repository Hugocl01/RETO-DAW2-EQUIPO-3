import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../data/FetchData";
import Spinner from "../components/Spinner";

/**
 * Página `RetoPage` que muestra los detalles de un reto específico, incluyendo información sobre el estudio asociado.
 * 
 * @component
 * @returns {JSX.Element} - Elemento JSX que representa la página de detalles del reto.
 */
function RetoPage() {
    const { id } = useParams(); // Obtiene el ID del reto desde la URL
    const [reto, setReto] = useState(null); // Estado para almacenar los detalles del reto
    const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

    /**
     * Efecto que se ejecuta al cargar el componente.
     * Obtiene los detalles del reto desde la API.
     */
    useEffect(() => {
        const fetchRetos = async () => {
            try {
                const response = await fetchData(`retos/${id}`);
                setReto(response.reto || null); // Guarda los detalles del reto en el estado
            } catch (error) {
                console.error("Error al obtener retos:", error);
            } finally {
                setIsLoading(false); // Finaliza la carga, independientemente del resultado
            }
        };

        fetchRetos();
    }, [id]);

    // Si está cargando, muestra el Spinner
    if (isLoading) {
        return <Spinner />;
    }

    // Si no hay datos del reto, muestra un mensaje
    if (!reto) {
        return <div className="container mt-4">No se pudo cargar la información del reto.</div>;
    }

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
