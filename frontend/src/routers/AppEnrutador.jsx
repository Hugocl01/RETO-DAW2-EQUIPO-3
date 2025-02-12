import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import AppLayout from "../layouts/AppLayout.jsx";
import BaseLayout from "../layouts/BaseLayout.jsx";
import InicioPage from "../pages/InicioPage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import EquiposPage from "../pages/EquiposPage.jsx";
import TorneoPage from "../pages/TorneoPage.jsx";
import OrganizacionPage from "../pages/OrganizacionPage.jsx";
import GaleriaPage from "../pages/GaleriaPage.jsx";
import InscribirsePage from "../pages/InscribirsePage.jsx";
import PerfilPage from "../pages/PerfilPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RutaPrivada from "../components/RutaPrivada.jsx";
import DetallesEquipoPage from "../pages/DetallesEquipoPage.jsx";
import AdministracionPage from "../pages/AdministracionPages/AdministracionPage.jsx";
import AdminEntidadPage from "../pages/AdministracionPages/AdminEntidadPage.jsx";

/**
 * Componente de enrutamiento principal de la aplicación.
 * Define las rutas y su estructura dentro de la aplicación.
 * 
 * @component
 * @returns {JSX.Element} Estructura de enrutamiento con `BrowserRouter` y `Routes`.
 */
function AppEnrutador() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Layout principal de la aplicación */}
                <Route path="/" element={<AppLayout />}>
                    {/* Página de inicio */}
                    <Route index element={<InicioPage />} />

                    {/* Otras páginas */}
                    <Route path="equipos" element={<EquiposPage />} />
                    <Route path="equipos/:nombreEquipo" element={<DetallesEquipoPage/>}></Route>
                    <Route path="torneo" element={<TorneoPage />} />
                    <Route path="organizacion" element={<OrganizacionPage />} />
                    <Route path="galeria" element={<GaleriaPage />} />
                    <Route path="inscribirse" element={<InscribirsePage />} />
                    <Route path="perfil" element={<RutaPrivada><PerfilPage /></RutaPrivada>} />

                    {/* Agrupación de rutas privadas para administración */}
                    <Route path="administracion" element={<RutaPrivada usuarioPermitido="administrador"><Outlet /></RutaPrivada>}>
                        <Route index element={<AdministracionPage />} />
                        <Route path=":entidad" element={<AdminEntidadPage />} />
                    </Route>
                </Route>

                {/* Layout alternativo */}
                <Route path="/" element={<BaseLayout />}>
                    {/* Página de Login */}
                    <Route path="login" element={<LoginPage />} />

                    {/* Página de error para rutas no encontradas */}
                    <Route path="*" element={<ErrorPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppEnrutador;
