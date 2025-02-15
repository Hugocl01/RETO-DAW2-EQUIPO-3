import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SeguridadContext } from "../contexts/SeguridadProvider.jsx";
import Login from "../components/Login.jsx";

/**
 * Página de Login.
 *
 * Esta página renderiza el componente de inicio de sesión (`Login`),
 * permitiendo a los usuarios autenticarse en la aplicación. Si el usuario ya está autenticado,
 * se redirige a la página principal.
 *
 * @component
 * @returns {JSX.Element} - La estructura de la página de login.
 */
function LoginPage() {
    const { seguridad } = useContext(SeguridadContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Si ya está logueado, redirige a la página principal
        if (seguridad?.user) {
            navigate("/"); // Redirige a la página principal
        }
    }, [seguridad, navigate]);

    return (
        <div className="d-flex align-items-center align-content-center justify-content-center py-4">
            {/* Si no está autenticado, muestra el formulario de login */}
            {!seguridad?.user && <Login />}
        </div>
    );
}

export default LoginPage;
