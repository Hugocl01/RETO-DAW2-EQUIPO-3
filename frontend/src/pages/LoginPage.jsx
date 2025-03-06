import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SeguridadContext } from "../contexts/SeguridadProvider.jsx";
import Login from "../components/Login.jsx";

/**
 * Página `LoginPage` que permite a los usuarios autenticarse en la aplicación.
 * Si el usuario ya está autenticado, se redirige a la página principal.
 *
 * @component
 * @returns {JSX.Element} - Elemento JSX que representa la página de inicio de sesión.
 */
function LoginPage() {
    const { seguridad } = useContext(SeguridadContext);
    const navigate = useNavigate();

    /**
     * Efecto que redirige a la página principal si el usuario ya está autenticado.
     */
    useEffect(() => {
        // Si ya está logueado, redirige a la página principal
        if (seguridad?.user) {
            navigate("/"); // Redirige a la página principal
        }
    }, [seguridad, navigate]);

    return (
        <>
            <title>Iniciar sesión</title>
            {/* Si no está autenticado, muestra el formulario de login */}
            {!seguridad?.user && <Login />}
        </>
    );
}

export default LoginPage;
