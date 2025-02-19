import { useEffect, useState } from "react";

function MenuAdministracion({ secciones, loading, onSelect }) {
    const [selectedSeccion, setSelectedSeccion] = useState(null);

    useEffect(() => {
        if (secciones.length > 0) {
            const urlParams = new URLSearchParams(window.location.search);
            let seccionPorDefecto = secciones[0]; // Primera sección como fallback

            // Buscar si algún parámetro coincide con el nombre de una sección
            for (const [key] of urlParams.entries()) {
                const seccionEncontrada = secciones.find(s => s.nombre.toLowerCase() === key.toLowerCase());
                if (seccionEncontrada) {
                    seccionPorDefecto = seccionEncontrada;
                    break; // Detenerse al encontrar la primera coincidencia
                }
            }

            setSelectedSeccion(seccionPorDefecto);
            onSelect(seccionPorDefecto);
        }
    }, [secciones]); // Se ejecuta cuando `secciones` cambia

    const handleSelect = (seccion) => {
        setSelectedSeccion(seccion);
        onSelect(seccion);
    };

    return (
        <aside className="p-3 border-end bg-light" style={{ minWidth: "240px", height: "100vh" }}>
            <h4 className="text-center">Administración</h4>

            {loading ? (
                <p className="text-center">Cargando secciones...</p>
            ) : (
                <ul className="list-group">
                    {secciones.length > 0 ? (
                        secciones.map((seccion) => (
                            <li
                                key={seccion.id}
                                className={`list-group-item ${selectedSeccion?.id === seccion.id ? "active" : ""} cursor-pointer`}
                                role="button"
                                onClick={() => handleSelect(seccion)}>
                                {seccion.nombre}
                            </li>
                        ))
                    ) : (
                        <li className="list-group-item text-center text-muted">
                            No hay secciones disponibles
                        </li>
                    )}
                </ul>
            )}
        </aside>
    );
}

export default MenuAdministracion;
