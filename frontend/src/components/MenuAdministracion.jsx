import { useEffect, useState } from "react";

function AdministracionMenu({ secciones, loading, onSelect }) {
    const [selectedSeccion, setSelectedSeccion] = useState("");

    // Hacer que la primera vez que veamos el menu cargue por defecto la primera seccion
    useEffect(() => {
        if (secciones.length > 0) {
            const urlParams = new URLSearchParams(window.location.search);
            const inscripciones = urlParams.get('inscripciones');
            const defaultSeccion = (inscripciones === "true")
                ? secciones[secciones.length - 1]
                : secciones[0];

            setSelectedSeccion(defaultSeccion);
            onSelect(defaultSeccion);
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

export default AdministracionMenu;