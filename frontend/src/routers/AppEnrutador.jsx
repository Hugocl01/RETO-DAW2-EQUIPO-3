import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout.jsx";
import { lazy, Suspense } from "react";
import Spinner from "../components/Spinner.jsx";

/**
 * Utilizo al carga perezosa o diferida para cada pages
 */
const BaseLayout = lazy(() => import("../layouts/BaseLayout.jsx"));
const InicioPage = lazy(() => import("../pages/InicioPage.jsx"));
const ErrorPage = lazy(() => import("../pages/ErrorPage.jsx"));
const EquiposPage = lazy(() => import("../pages/EquiposPage/EquiposPage.jsx"));
const DetallesEquipoPage = lazy(() =>
  import("../pages/EquiposPage/DetallesEquipoPage.jsx")
);
const TorneoPage = lazy(() => import("../pages/TorneoPage.jsx"));
const ClasificaciónPage = lazy(() => import("../pages/ClasificacionPage.jsx"));
const OrganizacionPage = lazy(() => import("../pages/OrganizacionPage.jsx"));
const RetoPage = lazy(() => import("../pages/RetoPage.jsx"));
const GaleriaPage = lazy(() => import("../pages/GaleriaPage.jsx"));
const InscribirsePage = lazy(() => import("../pages/InscribirsePage.jsx"));
const PerfilPage = lazy(() => import("../pages/PerfilPage.jsx"));
const LoginPage = lazy(() => import("../pages/LoginPage.jsx"));
const AdministracionPage = lazy(() =>
  import("../pages/AdministracionPage.jsx")
);
const EstadisticasPage = lazy(() =>
  import("../pages/EstadisticasPage.jsx")
);
const DetalleJugadorPage = lazy(() =>
  import("../pages/JugadoresPage/DetalleJugadorPage.jsx")
);
const RutaPrivada = lazy(() => import("../components/RutaPrivada.jsx"));

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
        <Route
          path="/"
          element={
            <Suspense fallback={<Spinner />}>
              <AppLayout />
            </Suspense>
          }
        >
          {/* Página de inicio */}
          <Route
            index
            element={
              <Suspense fallback={<Spinner />}>
                <InicioPage />
              </Suspense>
            }
          />

          {/* Otras páginas */}
          <Route
            path="equipos"
            element={
              <Suspense fallback={<Spinner />}>
                <EquiposPage />
              </Suspense>
            }
          />
          <Route
            path="estadisticas/equipos/:id"
            element={
              <Suspense fallback={<Spinner />}>
                <DetallesEquipoPage />
              </Suspense>
            }
          />
          <Route
            path="estadisticas/"
            element={
              <Suspense fallback={<Spinner />}>
                <EstadisticasPage />
              </Suspense>
            }
          />
          <Route
            path="estadisticas/jugadores/:id"
            element={
              <Suspense fallback={<Spinner />}>
                <DetalleJugadorPage />
              </Suspense>
            }
          />
          <Route
            path="equipos/:id"
            element={
              <Suspense fallback={<Spinner />}>
                <DetallesEquipoPage />
              </Suspense>
            }
          />
          <Route
            path="jugadores/:id"
            element={
              <Suspense fallback={<Spinner />}>
                <DetalleJugadorPage />
              </Suspense>
            }
          />
          <Route
            path="torneo"
            element={
              <Suspense fallback={<Spinner />}>
                <TorneoPage />
              </Suspense>
            }
          />
          <Route
            path="clasificacion"
            element={
              <Suspense fallback={<Spinner />}>
                <ClasificaciónPage />
              </Suspense>
            }
          />
          <Route
            path="organizacion"
            element={
              <Suspense fallback={<Spinner />}>
                <OrganizacionPage />
              </Suspense>
            }
          />
          <Route
            path="organizacion/retos/:id"
            element={
              <Suspense fallback={<Spinner />}>
                <RetoPage />
              </Suspense>
            }
          />
          <Route
            path="galeria"
            element={
              <Suspense fallback={<Spinner />}>
                <GaleriaPage />
              </Suspense>
            }
          />
          <Route
            path="inscribirse"
            element={
              <Suspense fallback={<Spinner />}>
                <InscribirsePage />
              </Suspense>
            }
          />
          <Route
            path="perfil"
            element={
              <RutaPrivada>
                <Suspense fallback={<Spinner />}>
                  <PerfilPage />
                </Suspense>
              </RutaPrivada>
            }
          />

          {/* Agrupación de rutas privadas para administración */}
          <Route
            path="administracion"
            element={
              <RutaPrivada>
                <Suspense fallback={<Spinner />}>
                  <AdministracionPage />
                </Suspense>
              </RutaPrivada>
            }
          />
        </Route>

        {/* Layout alternativo */}
        <Route path="/" element={<BaseLayout />}>
          {/* Página de Login */}
          <Route
            path="login"
            element={
              <Suspense fallback={<Spinner />}>
                <LoginPage />
              </Suspense>
            }
          />

          {/* Página de error para rutas no encontradas */}
          <Route
            path="*"
            element={
              <Suspense fallback={<Spinner />}>
                <ErrorPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppEnrutador;