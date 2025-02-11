import Error from "../components/Error.jsx";

/**
 * Página de Error.
 * 
 * Esta página renderiza el componente de error (`Error`),
 * 
 * @component
 * @returns {JSX.Element} - Renderiza la página de error en caso de ruta no valida.
 */
function ErrorPage() {

    return (
        <div>
            <Error />
        </div>
    );
}

export default ErrorPage;