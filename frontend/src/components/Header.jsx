import { useContext } from "react";
import { Link } from "react-router-dom";
import { SeguridadContext } from "../contexts/SeguridadProvider";

/**
 * Componente de encabezado de la aplicación.
 * Contiene la barra de navegación y un menú desplegable de usuario.
 * 
 * @component
 * @returns {JSX.Element} Elemento JSX que representa el encabezado de la aplicación.
 */
function Header() {
    const { seguridad, logout } = useContext(SeguridadContext); // Obtiene el estado de seguridad del contexto

    return (
        <header>
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                    {/* Logo con enlace a la página principal */}
                    <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                        <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                            <use xlinkHref="#bootstrap"></use>
                        </svg>
                    </Link>

                    {/* Barra de navegación */}
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/" className="nav-link px-2 link-body-emphasis">Inicio</Link></li>
                        <li><Link to="/equipos" className="nav-link px-2 link-body-emphasis">Equipos</Link></li>
                        <li><Link to="/torneo" className="nav-link px-2 link-body-emphasis">Torneo</Link></li>
                        <li><Link to="/organizacion" className="nav-link px-2 link-body-emphasis">Organización</Link></li>
                        <li><Link to="/galeria" className="nav-link px-2 link-body-emphasis">Galería</Link></li>
                        <li><Link to="/inscribirse" className="nav-link px-2 link-body-emphasis">Inscribirse</Link></li>
                    </ul>

                    {/* Menú desplegable de usuario cuando está autenticado */}
                    {seguridad.auth ? (
                        <div className="dropdown text-end">
                            <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                {/* Imagen del perfil de usuario */}
                                <img src="https://github.com/mdo.png" alt="Perfil de usuario" width="32" height="32" className="rounded-circle" />
                            </a>
                            <ul className="dropdown-menu text-small">
                                <li><h2 className="dropdown-header">{seguridad.user.name}</h2></li>
                                <li><hr className="dropdown-divider" /></li>
                                {/* Solo se muestra si el usuario logeado es de tipo 'administrador' */}
                                {seguridad.user.perfil.tipo == 'administrador' ? (
                                    <li><Link to="/administracion" className="dropdown-item">Administración</Link></li>
                                ) : ('')}
                                <li><Link to="/perfil" className="dropdown-item">Perfil</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="" onClick={logout}>Cerrar sesión</a></li>
                            </ul>
                        </div>
                    ) : (
                        // Si no hay autenticación, muestra un botón de iniciar sesión
                        <Link to="/login" className="btn btn-primary ms-2">Iniciar sesión</Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;

