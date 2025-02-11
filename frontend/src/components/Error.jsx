import { Link } from "react-router-dom";

/**
 * Componente de página de error.
 *
 * Muestra un mensaje de error cuando ocurre un problema en la aplicación,
 * como una página no encontrada (404) o un error del servidor (500).
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.mensaje="Ocurrió un error"] - Mensaje de error a mostrar.
 * @returns {JSX.Element} - La estructura de la página de error.
 */
function ErrorPage({ mensaje = "Ocurrió un error" }) {
    
    return (
        <div>
            <h1>¡Ups! Algo salió mal</h1>
            <p>{mensaje}</p>
            <Link to="/">Volver al inicio</Link>
        </div>
    );
}

export default ErrorPage;
