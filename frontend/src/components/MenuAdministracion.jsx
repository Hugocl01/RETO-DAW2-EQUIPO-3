import { useContext, useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { SeguridadContext } from "../contexts/SeguridadProvider";

function MenuAdministracion({ loading: propLoading, onSelect }) {
    const { seguridad } = useContext(SeguridadContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { seccion } = useParams();

    const [secciones, setSecciones] = useState([]);
    const [selectedSeccion, setSelectedSeccion] = useState(null);
    const [loading, setLoading] = useState(propLoading);

    // 🔹 1️⃣ Cargar secciones SOLO UNA VEZ cuando cambia el usuario
    useEffect(() => {
        const fetchSecciones = async () => {
            if (!seguridad?.user?.perfil?.id) return;

            setLoading(true);
            try {
                const response = await api.get(`/perfiles/${seguridad.user.perfil.id}`);
                const seccionesData = response.data.perfiles?.secciones || [];
                setSecciones(seccionesData);
            } catch (error) {
                console.error("Error al obtener secciones:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSecciones();
    }, [seguridad?.user?.perfil?.id]); // 🔥 Solo se ejecuta cuando cambia el usuario

    // 🔹 2️⃣ Seleccionar la sección cuando cambia la URL
    useEffect(() => {
        if (secciones.length === 0) return;

        const seccionPorDefecto = secciones.find(sec => sec.nombre.toLowerCase() === seccion?.toLowerCase()) || secciones[0] || null;

        setSelectedSeccion(seccionPorDefecto);
        if (seccionPorDefecto) onSelect(seccionPorDefecto);
    }, [secciones, seccion]); // 🔥 Solo se ejecuta cuando cambia la URL o la lista de secciones

    const handleSelect = (seccion) => {
        setSelectedSeccion(seccion);
        onSelect(seccion);
        navigate(`/administracion/${seccion.nombre.toLowerCase()}`);
    };

    return (
        <aside className="p-3 border-end bg-light" style={{ minWidth: "240px", height: "100vh" }}>
            <h4 className="text-center">Administración</h4>

            {loading ? (
                <p className="text-center">Cargando secciones...</p>
            ) : (
                <ul className="list-group">
                    {secciones.length > 0 ? (
                        secciones.map((sec) => (
                            <li
                                key={sec.id}
                                className={`list-group-item ${selectedSeccion?.id === sec.id ? "active" : ""}`}
                                role="button"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleSelect(sec)}
                            >
                                {sec.nombre}
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
