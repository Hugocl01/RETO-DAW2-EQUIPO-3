import { Link, useLocation } from "react-router-dom";
import "./css/MigasDePan.css";

const Migas = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);
    
    // Rutas donde no mostrar las migas de pan
    const hiddenRoutes = ["/", "/login"];

    if (hiddenRoutes.includes(location.pathname)) {
        return null; // No se renderiza nada
    }

    return (
        <nav className="migas-nav d-flex justify-content-center align-items-center mt-4">
            <ul className="migas-ul d-flex justify-content-start align-items-center px-3 m-0">
                <li className="migas-li">
                    <Link to="/" className="migas-link">Inicio</Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                    return (
                        <li key={to} className="migas-li">
                            <span className="migas-separator"></span>
                            <Link to={to} className="migas-link capitalize">{value}</Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Migas;
