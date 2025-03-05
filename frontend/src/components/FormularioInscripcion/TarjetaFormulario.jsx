import { useState, useEffect } from "react";
import "../css/TarjetaFormulario.css";
import "../css/EstilosComun.css";

/**
 * Componente que representa una tarjeta colapsable con un formulario.
 * Permite mostrar u ocultar el contenido de la tarjeta al hacer clic en el encabezado.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.titulo - Título de la tarjeta.
 * @param {string} props.id - Identificador único de la tarjeta.
 * @param {React.ReactNode} props.children - Contenido de la tarjeta.
 * @returns {JSX.Element} Componente de tarjeta colapsable.
 */
function TarjetaFormulario({ titulo, id, children }) {
    const [abiertas, setAbiertas] = useState({});

    /**
     * Efecto para inicializar el estado de la tarjeta como abierta cuando se monta.
     */
    useEffect(() => {
        setAbiertas((prev) => ({
            ...prev,
            [id]: true,
        }));
    }, [id]);

    /**
     * Función para alternar la visibilidad de la tarjeta.
     */
    const toggleTarjeta = () => {
        setAbiertas((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div className="card mb-3">
            <div
                className="card-header bg-primary text-white"
                onClick={toggleTarjeta}
                style={{ cursor: "pointer" }}
            >
                {titulo}
            </div>
            {abiertas[id] && <div className="card-body">{children}</div>}
        </div>
    );
}

export default TarjetaFormulario;
