import { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SeguridadContext } from "../contexts/SeguridadProvider";
import { generateSlug } from "../utils/stringUtils";  // Asumimos que la función generateSlug está definida
import "./css/MenuAdministracion.css";

function MenuAdministracion({ onSelect }) {
    const { seguridad } = useContext(SeguridadContext);
    const { seccion } = useParams();
    const navigate = useNavigate();

    const [secciones, setSecciones] = useState([]);
    const [selectedSeccion, setSelectedSeccion] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isSidenavActive, setIsSidenavActive] = useState(false); // Estado para manejar el toggle del sidenav
    const [showModal, setShowModal] = useState(false);
    const sidenavRef = useRef(null);
    const isActive = (path) => (location.pathname === path ? "active" : "");
    const [isSubMenuActive, setIsSubMenuActive] = useState(false);

    const toggleSidenav = () => {
        setIsSidenavActive(prevState => !prevState);
    };

    useEffect(() => {
        const url = import.meta.env.VITE_API_URL;
        const fetchSecciones = async () => {
            if (!seguridad?.user?.perfil?.id) return;
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${url}perfiles/${seguridad.user.perfil.id}`, {
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

    useEffect(() => {
        // Cuando se entre a una sección, cerramos el sidebar
        if (isSidenavActive) {
            toggleSidenav();
        }
    }, [seccion]);

    const handleSelect = (seccion) => {
        onSelect(seccion);
        // Cerrar el sidebar al seleccionar una nueva sección
        if (isSidenavActive) {
            toggleSidenav();
        }
    };

    return (
        <div className="menuAdmin">
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


            <div className="sidebarAdministracion p-2" ref={sidenavRef} onClick={(e) => e.stopPropagation()}>
                <div>
                    <nav id="sidenav-1" className={`sidenav ${isSidenavActive ? "active" : ""}`} onClick={(e) => e.stopPropagation()}>
                        <h4 className="text-center mt-4">Administración</h4>
                        {loading ? <p className="text-center">Cargando secciones...</p> : (
                            <ul className="mx-4 list-group">
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
                    </nav>
                    <button id="sidenav-toggle" className={`toggler-btn ${isSidenavActive ? "active" : ""}`} onClick={toggleSidenav}>
                        <i className={`bi bi-list-task botonMenuAdmin p-2 rounded border border-primary ${isSidenavActive ? "text-dark" : "text-dark"}`}></i>
                    </button>
                </div>
                {isSidenavActive && <div className="backdrop" onClick={toggleSidenav}></div>}
            </div>

        </div>
    );
}

export default MenuAdministracion;
