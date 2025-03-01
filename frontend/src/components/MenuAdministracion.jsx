import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SeguridadContext } from "../contexts/SeguridadProvider";
import { generateSlug } from "../utils/stringUtils";  // Asumimos que la función generateSlug está definida

function MenuAdministracion({ onSelect }) {
    const { seguridad } = useContext(SeguridadContext);
    const { seccion } = useParams();
    const navigate = useNavigate();

    const [secciones, setSecciones] = useState([]);
    const [selectedSeccion, setSelectedSeccion] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSecciones = async () => {
            if (!seguridad?.user?.perfil?.id) return;
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`http://127.0.0.1:8000/api/perfiles/${seguridad.user.perfil.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token ? `Bearer ${token}` : ""
                    },
                    credentials: "include"
                });
                if (!response.ok) {
                    throw new Error("Error al obtener secciones");
                }
                const data = await response.json();
                setSecciones(data.perfiles?.secciones || []);
            } catch (error) {
                console.error("Error al obtener secciones:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSecciones();
    }, [seguridad?.user?.perfil?.id]);

    useEffect(() => {
        if (secciones.length === 0) return;
        // Reemplazamos el nombre de la sección por el slug
        const seccionSlug = seccion ? generateSlug(seccion) : '';
        const seccionPorDefecto = secciones.find(sec => generateSlug(sec.nombre) === seccionSlug) || secciones[0] || null;
        setSelectedSeccion(seccionPorDefecto);
        if (seccionPorDefecto) onSelect(seccionPorDefecto);
    }, [secciones, seccion]);

    const handleSelect = (seccion) => {
        setSelectedSeccion(seccion);
        onSelect(seccion);
        const slug = generateSlug(seccion.nombre);  // Generamos el slug para la URL
        navigate(`/administracion/${slug}`);         // Navegamos con el slug
    };

    return (
        <aside className="p-3" style={{ minWidth: "240px", height: "100vh" }}>
            <h4 className="text-center">Administración</h4>
            {loading ? <p className="text-center">Cargando secciones...</p> : (
                <ul className="list-group">
                    {secciones.length > 0 ? (
                        secciones.map((sec) => (
                            <li key={sec.id}
                                className={`list-group-item ${selectedSeccion?.id === sec.id ? "active" : ""}`}
                                role="button"
                                onClick={() => handleSelect(sec)}
                            >
                                {sec.nombre}
                            </li>
                        ))
                    ) : <li className="list-group-item text-center text-muted">No hay secciones disponibles</li>}
                </ul>
            )}
        </aside>
    );  
}

export default MenuAdministracion;
