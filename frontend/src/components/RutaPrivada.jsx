import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SeguridadContext } from "../contexts/SeguridadProvider.jsx";

/**
 * Componente de ruta privada.
 * 
 * Verifica si el usuario está autenticado. Si está autenticado, renderiza los componentes hijos, 
 * de lo contrario, redirige al login.
 * 
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Los componentes hijos que se mostrarán si el usuario está autenticado.
 * @param {string} [props.redirectTo="/login"] - Ruta a la que se redirige si no está autenticado.
 * @returns {JSX.Element} - Componente de ruta privada con redirección condicional.
 */
function RutaPrivada({ children, redirectTo = "/login" }) {
    const { seguridad, cargando } = useContext(SeguridadContext);

    if (cargando) {
        return <div>Cargando...</div>;
    }

    // Si el usuario no está autenticado, redirige al login (o a la ruta proporcionada)
    return seguridad.auth ? children : <Navigate to={redirectTo} />;
}

export default RutaPrivada;
