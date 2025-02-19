import { useContext } from "react";
import { Link } from "react-router-dom";
import { SeguridadContext } from "../contexts/SeguridadProvider";
import YouTubeLiveIndicator from "./YouTubeLiveIndicator"; // Ajusta la ruta según corresponda
import { useLocation } from 'react-router-dom';

import "./css/Header.css";


/**
 * Componente de encabezado de la aplicación.
 * Contiene la barra de navegación y un menú desplegable de usuario.
 * 
 * @component
 * @returns {JSX.Element} Elemento JSX que representa el encabezado de la aplicación.
 */
function Header() {
    const { seguridad, logout } = useContext(SeguridadContext); // Obtiene el estado de seguridad del contexto
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <header className="p-3">
            <div className="container">
                <div className="w-100 d-flex align-items-center justify-content-between gap-3" id="contenidoHeader">
                    {/* Logo con enlace a la página principal */}
                    <div className="flex-grow-0" id="logo">
                        <Link to="/" className="d-flex justify-content-flex-start align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                            <img src="../src/assets/imagenes/logo.png" alt="Logo" />
                        </Link>
                    </div>

                    {/* Barra de navegación (centrada) */}
                    <div className="d-flex align-items-center justify-content-center flex-grow-1" id="menu">
                        <ul className="nav col-13 col-lg-auto me-lg-auto mb-3 d-flex justify-content-center align-items-center mb-md-0">
                            <li>
                                <Link to="/" className={`nav-link px-2 link-body-emphasis ${isActive('/')}`} id="elementoMenu">INICIO</Link>
                            </li>
                            <li>
                                <Link to="/equipos" className={`nav-link px-2 link-body-emphasis ${isActive('/equipos')}`} id="elementoMenu">EQUIPOS</Link>
                            </li>
                            <li>
                                <Link to="/partidos" className={`nav-link px-2 link-body-emphasis ${isActive('/partidos')}`} id="elementoMenu">TORNEO</Link>
                            </li>
                            <li>
                                <Link to="/clasificacion" className={`nav-link px-2 link-body-emphasis ${isActive('/clasificacion')}`} id="elementoMenu">CLASIFICACIÓN</Link>
                            </li>
                            <li>
                                <Link to="/organizacion" className={`nav-link px-2 link-body-emphasis ${isActive('/organizacion')}`} id="elementoMenu">ORGANIZACIÓN</Link>
                            </li>
                            <li>
                                <Link to="/galeria" className={`nav-link px-2 link-body-emphasis ${isActive('/galeria')}`} id="elementoMenu">GALERÍA</Link>
                            </li>
                            <li>
                                <Link to="/inscribirse" className={`nav-link px-2 link-body-emphasis ${isActive('/inscribirse')}`} id="elementoMenu">INSCRIBIRSE</Link>
                            </li>
                            <li className="d-flex align-items-center"><YouTubeLiveIndicator /></li>
                        </ul>
                    </div>

                    {/* Botón de iniciar sesión (alineado a la derecha) */}
                    <div className="flex-grow-0" id="iniciarSesion">
                        {/* Menú desplegable de usuario cuando está autenticado */}
                        {seguridad.user ? (
                            <div className="dropdown text-end">
                                <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    {/* Imagen del perfil de usuario */}
                                    <img src="https://github.com/mdo.png" alt="Perfil de usuario" width="32" height="32" className="rounded-circle" />
                                </a>
                                <ul className="dropdown-menu text-small">
                                    <li><h2 className="dropdown-header">{seguridad.user.name}</h2></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link to="/administracion" className="dropdown-item">Administración</Link></li>
                                    <li><Link to="/perfil" className="dropdown-item">Perfil</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="" onClick={logout}>Cerrar sesión</a></li>
                                </ul>
                            </div>
                        ) : (
                            // Si no hay autenticación, muestra un botón de iniciar sesión
                            <Link to="/login" className="btn btn-primary text-black ms-2 text-white">Iniciar sesión</Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
