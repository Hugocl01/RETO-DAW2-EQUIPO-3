import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { SeguridadContext } from "../contexts/SeguridadProvider";
import YouTubeLiveIndicator from "./YouTubeLiveIndicator";
import { useLocation } from "react-router-dom";
import "./css/Header.css";
import LoginModal from './LoginModal';
import imagenPerfil from "../assets/imagenes/user.png";
import logo from '../assets/imagenes/logo.png';

/**
 * Componente `Header` que representa la cabecera de la aplicación.
 * Incluye la navegación principal, el menú lateral y la gestión de la sesión de usuario.
 * 
 * @returns {JSX.Element} El elemento JSX que representa la cabecera de la aplicación.
 */
function Header() {
  const { seguridad, logout } = useContext(SeguridadContext);
  const location = useLocation();

  const [isSidenavActive, setIsSidenavActive] = useState(false); // Estado para manejar el toggle del sidenav
  const [showModal, setShowModal] = useState(false);
  const sidenavRef = useRef(null);
  const isActive = (path) => (location.pathname === path ? "active" : "");
  const [isSubMenuActive, setIsSubMenuActive] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  /**
   * Función para alternar la visibilidad del menú lateral (sidenav).
   */
  const toggleSidenav = () => {
    setIsSidenavActive(prevState => !prevState);
  };

  /**
   * Función para mostrar el modal de inicio de sesión.
   */
  const handleShow = () => setShowModal(true);

  /**
   * Función para ocultar el modal de inicio de sesión.
   */
  const handleClose = () => setShowModal(false);

  /**
   * Función para alternar la visibilidad del submenú en el menú lateral.
   */
  const toggleSubMenu = () => {
    setIsSubMenuActive(prevState => !prevState);
  };

  // Efecto para manejar clics fuera del menú lateral
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidenavRef.current && !sidenavRef.current.contains(event.target)) {
        setIsSidenavActive(false);
      }
    };

    if (isSidenavActive) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSidenavActive]);

  return (
    <header>
      <div className="contenidoCabecera container p-3">
        <div className="w-100 d-flex align-items-center justify-content-between gap-3" id="contenidoHeader">
          {/* Logo con enlace a la página principal */}
          <div className="flex-grow-0" id="logo">
            <Link to="/" className="d-flex justify-content-flex-start align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
              <img src={logo} alt="Logo" />
            </Link>
          </div>

          {/* Barra de navegación (centrada) */}
          <div className="d-flex align-items-center justify-content-center flex-grow-1" id="menu">
            <ul className="nav col-13 col-lg-auto me-lg-auto mb-3 d-flex justify-content-center align-items-center mb-md-0">
              <li>
                <Link to="/" className={`nav-link px-2 link-body-emphasis ${isActive("/")}`} id="elementoMenu">
                  INICIO
                </Link>
              </li>

              <li>
                <Link to="/equipos" className={`nav-link px-2 link-body-emphasis ${isActive("/")}`} id="elementoMenu">
                  EQUIPOS
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link to="/partidos" className={`nav-link px-2 link-body-emphasis ${isActive("/partidos")}`} id="elementoMenu" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                  TORNEO
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/partidos" className="dropdown-item">
                      PARTIDOS
                    </Link>
                  </li>
                  <li>
                    <Link to="/clasificacion" className="dropdown-item">
                      CLASIFICACIÓN
                    </Link>
                  </li>
                  <li>
                    <Link to="/estadisticas" className="dropdown-item">
                      ESTADÍSTICAS
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="/organizacion" className={`nav-link px-2 link-body-emphasis ${isActive("/organizacion")}`} id="elementoMenu">
                  ORGANIZACIÓN
                </Link>
              </li>
              <li>
                <Link to="/inscribirse" className={`nav-link px-2 link-body-emphasis ${isActive("/inscribirse")}`} id="elementoMenu">
                  INSCRIBIRSE
                </Link>
              </li>
              <li className="d-flex align-items-center">
                <YouTubeLiveIndicator />
              </li>
            </ul>
          </div>

          {/* Botón para abrir el modal de inicio de sesión */}
          <div className="flex-grow-0" id="iniciarSesion">
            {seguridad.user ? (
              <div className="dropdown text-end">
                <a
                  href="#"
                  className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={imagenPerfil}
                    alt="Perfil de usuario"
                    width="32"
                    height="32"
                    className="rounded-circle"
                  />
                </a>
                <ul className="dropdown-menu text-small">
                  <li>
                    <h2 className="dropdown-header">{seguridad.user.nombre}</h2>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link to="/administracion" className="dropdown-item">
                      Administración
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="" onClick={logout}>
                      Cerrar sesión
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <button className="btn btn-primary text-white" onClick={handleShow}>
                Iniciar sesión
              </button>
            )}
          </div>
          {showModal && (
            <>
              <div className="modal-backdrop fade show"></div>
              <div className="modal fade show d-block" tabIndex="-1">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-body">
                      <LoginModal handleClose={handleClose} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Menú lateral (sidenav) */}
      <div className="sidebar p-2" ref={sidenavRef} onClick={(e) => e.stopPropagation()}>
        <div className="flex-grow-0" id="logoSidebar">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <div>
          <nav id="sidenav-1" className={`sidenav ${isSidenavActive ? "active" : ""}`} onClick={(e) => e.stopPropagation()}>
            <ul className="nav col-13 col-lg-auto me-lg-auto mb-3 d-flex flex-column justify-content-start align-items-start mb-md-0 p-4">
              <li>
                <Link to="/" className={`nav-link px-2 link-body-emphasis ${isActive("/")}`} id="elementoMenu" onClick={toggleSidenav}>
                  INICIO
                </Link>
              </li>
              <li>
                <Link to="/equipos" className={`nav-link px-2 link-body-emphasis ${isActive("/")}`} id="elementoMenu" onClick={toggleSidenav}>
                  EQUIPOS
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#" className={`nav-link px-2 link-body-emphasis ${isActive("/torneo")}`} id="elementoMenu" onClick={toggleSubMenu}>
                  TORNEO
                </Link>
                <ul className={`submenu ${isSubMenuActive ? "active" : ""}`} style={{ maxHeight: isSubMenuActive ? "500px" : "0", opacity: isSubMenuActive ? "1" : "0" }}>
                  <li>
                    <Link to="/partidos" className="nav-link px-2 link-body-emphasis" onClick={toggleSidenav}>RESULTADOS</Link>
                  </li>
                  <li>
                    <Link to="/clasificacion" className="nav-link px-2 link-body-emphasis" onClick={toggleSidenav}>CLASIFICACIÓN</Link>
                  </li>
                  <li>
                    <Link to="/estadisticas" className="nav-link px-2 link-body-emphasis" onClick={toggleSidenav}>ESTADÍSTICAS</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/organizacion" className={`nav-link px-2 link-body-emphasis ${isActive("/organizacion")}`} id="elementoMenu" onClick={toggleSidenav}>
                  ORGANIZACIÓN
                </Link>
              </li>
              <li>
                <Link to="/galeria" className={`nav-link px-2 link-body-emphasis ${isActive("/galeria")}`} id="elementoMenu" onClick={toggleSidenav}>
                  GALERÍA
                </Link>
              </li>
              <li>
                <Link to="/inscribirse" className={`nav-link px-2 link-body-emphasis ${isActive("/inscribirse")}`} id="elementoMenu" onClick={toggleSidenav}>
                  INSCRIBIRSE
                </Link>
              </li>
              <li className="d-flex align-items-center">
                <YouTubeLiveIndicator />
              </li>
            </ul>
            <div className="flex-grow-0 px-4" id="iniciarSesion">
              {seguridad.user ? (
                <div className="dropdown text-start">
                  <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle ms-2" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={imagenPerfil} alt="Perfil de usuario" width="32" height="32" className="rounded-circle" />
                  </a>
                  <ul className="dropdown-menu text-small">
                    <li>
                      <h2 className="dropdown-header">{seguridad.user.nombre}</h2>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link to="/administracion" className="dropdown-item" onClick={toggleSidenav}>Administración</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="" onClick={logout}>Cerrar sesión</a></li>
                  </ul>
                </div>
              ) : (
                <Link to="/login" className="btn btn-primary text-black ms-2 text-white" onClick={toggleSidenav}>
                  Iniciar sesión
                </Link>
              )}
            </div>
          </nav>
          <button id="sidenav-toggle" className={`toggler-btn ${isSidenavActive ? "active" : ""}`} onClick={toggleSidenav}>
            <i className={`bi bi-list ${isSidenavActive ? "text-dark" : "text-dark"}`}></i>
          </button>
        </div>
        {isSidenavActive && <div className="backdrop" onClick={toggleSidenav}></div>}
      </div>
    </header>
  );
}

export default Header;
