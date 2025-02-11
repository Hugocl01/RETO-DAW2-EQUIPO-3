import { Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                        <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                            <use xlinkHref="#bootstrap"></use>
                        </svg>
                    </Link>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/" className="nav-link px-2 link-body-emphasis">Inicio</Link></li>
                        <li><Link to="/equipos" className="nav-link px-2 link-body-emphasis">Equipos</Link></li>
                        <li><Link to="/torneo" className="nav-link px-2 link-body-emphasis">Torneo</Link></li>
                        <li><Link to="/organizacion" className="nav-link px-2 link-body-emphasis">Organización</Link></li>
                        <li><Link to="/galeria" className="nav-link px-2 link-body-emphasis">Galeria</Link></li>
                        <li><Link to="/inscribirse" className="nav-link px-2 link-body-emphasis">Inscribirse</Link></li>
                    </ul>

                    <div className="dropdown text-end">
                        <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                        </a>
                        <ul className="dropdown-menu text-small">
                            <li><a className="dropdown-item" href="#">New project...</a></li>
                            <li><a className="dropdown-item" href="#">Settings</a></li>
                            <li><a className="dropdown-item" href="#">Profile</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#">Sign out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
