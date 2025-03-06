import Error from "../components/Error.jsx";

/**
 * Página `ErrorPage` que muestra un mensaje de error personalizado.
 * 
 * Esta página renderiza el componente de error (`Error`) con un mensaje específico.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.tipo - Tipo de error (por ejemplo, "404", "500", etc.).
 * @param {string} props.mensaje - Mensaje de error que se mostrará al usuario.
 * @returns {JSX.Element} - Elemento JSX que representa la página de error.
 */
function ErrorPage({ tipo, mensaje }) {
    return (
        <>
            <title>Error {tipo}</title>
            <Error mensaje={mensaje} />
        </>
    );
}

export default ErrorPage;
