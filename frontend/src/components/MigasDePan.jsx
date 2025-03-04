import { Link, useLocation } from "react-router-dom";
import "./css/MigasDePan.css";

/**
 * Componente que genera un menú de migas de pan (breadcrumb) para mostrar la ruta actual.
 * 
 * @component
 * 
 * @returns {JSX.Element|null} Retorna un elemento JSX que representa las migas de pan o `null` si la ruta actual está en la lista de rutas ocultas.
 */
const Migas = () => {
    const location = useLocation(); // Hook que obtiene la ubicación actual de la ruta
    const pathnames = location.pathname.split("/").filter((x) => x); // Separa la ruta en segmentos

    // Rutas donde no se deben mostrar las migas de pan
    const hiddenRoutes = ["/", "/login"];

    // Si la ruta actual está en la lista de rutas ocultas, no renderiza las migas de pan
    if (hiddenRoutes.includes(location.pathname)) {
        return null; // No se renderiza nada
    }

    return (
        <nav className="migas-nav d-flex justify-content-center align-items-center mt-4 mb-3">
            <ul className="migas-ul d-flex justify-content-start align-items-center px-3 m-0">
                <li className="migas-li">
                    <Link to="/" className="migas-link">Inicio</Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join("/")}`; // Crea el enlace para cada segmento de la ruta
                    return (
                        <li key={to} className="migas-li">
                            <span className="migas-separator"></span>
                            <Link to={to} className="migas-link">
                                {/* Capitaliza la primera letra */}
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Migas;
