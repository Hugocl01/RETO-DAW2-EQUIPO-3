import { useState, useEffect } from "react";
import "../css/TarjetaFormulario.css";
import "../css/EstilosComun.css";

function TarjetaFormulario({ titulo, id, children }) {
    const [abiertas, setAbiertas] = useState({});

    useEffect(() => {
        setAbiertas((prev) => ({
            ...prev,
            [id]: true,
        }));
    }, [id]);

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
