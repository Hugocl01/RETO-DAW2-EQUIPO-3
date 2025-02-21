import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SeguridadContext } from "../contexts/SeguridadProvider";
import YouTubeLiveIndicator from "./YouTubeLiveIndicator";
import { useLocation } from "react-router-dom";

import "./css/Header.css";

function Header() {
  const { seguridad, logout } = useContext(SeguridadContext);
  const location = useLocation();

  const [isSidenavActive, setIsSidenavActive] = useState(false); // Estado para manejar el toggle del sidenav

  const isActive = (path) => (location.pathname === path ? "active" : "");

  // Función para manejar el toggle del sidenav
  const toggleSidenav = () => {
    setIsSidenavActive(prevState => !prevState);
  };

  return (
    <header className="p-3">
      <div className="contenidoCabecera container">
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
                      RESULTADOS
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
                <Link to="/galeria" className={`nav-link px-2 link-body-emphasis ${isActive("/galeria")}`} id="elementoMenu">
                  GALERÍA
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

          {/* Botón de iniciar sesión (alineado a la derecha) */}
          <div className="flex-grow-0" id="iniciarSesion">
            {seguridad.user ? (
              <div className="dropdown text-end">
                <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="https://github.com/mdo.png" alt="Perfil de usuario" width="32" height="32" className="rounded-circle" />
                </a>
                <ul className="dropdown-menu text-small">
                  <li>
                    <h2 className="dropdown-header">{seguridad.user.name}</h2>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link to="/administracion" className="dropdown-item">Administración</Link></li>
                  <li><Link to="/perfil" className="dropdown-item">Perfil</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="" onClick={logout}>Cerrar sesión</a></li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary text-black ms-2 text-white">
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="sidebar">
        <div className="flex-grow-0" id="logoSidebar">
          <Link to="/">
            <img src="../src/assets/imagenes/logo.png" alt="Logo" />
          </Link>
        </div>

        <div>
          <nav id="sidenav-1" className={`sidenav ${isSidenavActive ? "active" : ""}`}>
            <ul className="nav col-13 col-lg-auto me-lg-auto mb-3 d-flex flex-column justify-content-start align-items-start mb-md-0 p-4">
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
                      RESULTADOS
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
                <Link to="/galeria" className={`nav-link px-2 link-body-emphasis ${isActive("/galeria")}`} id="elementoMenu">
                  GALERÍA
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
          </nav>
          {/* boton para mostrar el sidenav */}
          <button
            id="sidenav-toggle"
            className={`toggler-btn ${isSidenavActive ? "active" : ""}`}
            onClick={toggleSidenav}
          >
            <i className={`bi bi-list ${isSidenavActive ? "text-dark" : "text-dark"}`}></i>
          </button>
        </div>
      </div>
    </header >
  );
}

export default Header;
