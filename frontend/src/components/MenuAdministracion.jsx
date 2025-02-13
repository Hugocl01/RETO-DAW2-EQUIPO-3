import { useState } from "react";

function AdministracionMenu({ secciones, loading, onSelect }) {
    const [selectedSeccion, setSelectedSeccion] = useState("");

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
                            <li key={seccion.id} className="list-group-item" onClick={() => handleSelect(seccion.nombre)}>

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
