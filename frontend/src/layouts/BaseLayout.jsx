import { Outlet } from "react-router-dom";

/**
 * Componente de diseño de la aplicación.
 * Proporciona la estructura general para el login y la pagina de error.
 *
 * @component
 * @returns {JSX.Element} Elemento JSX que representa la estructura principal de la aplicación.
 */
function BaseLayout() {
    
    return (
        <>
            {/* Contenido dinámico que cambia según la ruta */}
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default BaseLayout;
