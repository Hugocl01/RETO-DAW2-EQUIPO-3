import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Migas from "../components/MigasDePan.jsx";

/**
 * Componente de diseño principal de la aplicación.
 * Proporciona la estructura general con el encabezado, el contenido dinámico y el pie de página.
 *
 * @component
 * @returns {JSX.Element} Elemento JSX que representa la estructura principal de la aplicación.
 */
function AppLayout() {
    
    return (
        <>
            {/* Encabezado de la aplicación */}
            <Header />

            {/* Contenido dinámico que cambia según la ruta */}
            <main>
                <Migas />
                <Outlet />
            </main>

            {/* Pie de página de la aplicación */}
            <Footer />
        </>
    );
}

export default AppLayout;
