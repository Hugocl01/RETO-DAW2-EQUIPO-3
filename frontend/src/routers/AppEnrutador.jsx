import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout.jsx";
import { lazy, Suspense, useContext } from "react";
import Spinner from "../components/Spinner.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import { SeguridadContext } from "../contexts/SeguridadProvider.jsx";
import DetalleEstadisticaPage from "../pages/DetalleEstadisticaPage.jsx";

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
const PartidosPage = lazy(() =>
  import("../pages/PartidosPage/PartidosPage.jsx")
);
const DetallePartidoPage = lazy(() =>
  import("../pages/PartidosPage/DetallePartidoPage.jsx")
);
const ClasificaciónPage = lazy(() => import("../pages/ClasificacionPage.jsx"));
const OrganizacionPage = lazy(() => import("../pages/OrganizacionPage.jsx"));
const RetoPage = lazy(() => import("../pages/RetoPage.jsx"));
const GaleriaPage = lazy(() => import("../pages/GaleriaPage.jsx"));
const InscribirsePage = lazy(() => import("../pages/InscribirsePage.jsx"));
const PerfilPage = lazy(() => import("../pages/PerfilPage.jsx"));
const SetPasswordPage = lazy(() => import("../pages/SetPasswordForm.jsx"));
const AdministracionPage = lazy(() =>
  import("../pages/AdministracionPage.jsx")
);
const EstadisticasPage = lazy(() => import("../pages/EstadisticasPage.jsx"));
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
  const { seguridad } = useContext(SeguridadContext);
  const seccionesPermitidas =
    seguridad?.user?.perfil?.secciones?.map((sec) =>
      sec.nombre.toLowerCase()
    ) || [];
  
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
            path="estadisticas/"
            element={
              <Suspense fallback={<Spinner />}>
                <EstadisticasPage />
              </Suspense>
            }
          />
          <Route
            path="estadisticas/:slug"
            element={
              <Suspense fallback={<Spinner />}>
                <DetalleEstadisticaPage />
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
            path="equipos/:equipoSlug/:jugadorSlug"
            element={
              <Suspense fallback={<Spinner />}>
                <DetalleJugadorPage />
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
            path="partidos"
            element={
              <Suspense fallback={<Spinner />}>
                <PartidosPage />
              </Suspense>
            }
          />
          <Route
            path="partidos/:slig"
            element={
              <Suspense fallback={<Spinner />}>
                <DetallePartidoPage />
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
                  {seccionesPermitidas.length === 0 ? (
                    <ErrorPage mensaje="Error 403" />
                  ) : (
                    <AdministracionPage seccion={seccionesPermitidas[0]} />
                  )}
                </Suspense>
              </RutaPrivada>
            }
          />

          <Route
            path={`administracion/:seccion`}
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
          <Route path="login" element={<LoginPage />} />

          {/* 🔹 Nueva Ruta para establecer contraseña */}
          <Route
            path="set-password/:id/:token"
            element={
              <Suspense fallback={<Spinner />}>
                <SetPasswordPage />
              </Suspense>
            }
          />

          {/* Página de error para rutas no encontradas */}
          <Route
            path="*"
            element={
              <Suspense fallback={<Spinner />}>
                <ErrorPage mensaje="Error 404" />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppEnrutador;
