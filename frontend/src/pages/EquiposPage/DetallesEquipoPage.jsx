import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner.jsx";
import "../../core/CSS/DetalleEquipoPage.css";
import imagenDefault from "../../assets/imagenes/default.jpg"; // Imagen por defecto
import ErrorPage from "../ErrorPage.jsx";
import fetchData from "../../data/FetchData.js";

/**
 * Componente `DetallesEquipoPage` que muestra los detalles de un equipo, incluyendo su información y la lista de jugadores.
 * 
 * @component
 * @returns {JSX.Element} - Elemento JSX que representa la página de detalles del equipo.
 */
function DetallesEquipoPage() {
  const location = useLocation();
  const [equipo, setEquipo] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navegar = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const slugEquipo = location.pathname.split("/").pop();

    // Verificar si el equipo ya está almacenado en el estado
    const equipoEnStorage = equipo && equipo.slug === slugEquipo;

    if (equipoEnStorage) {
      // Si el equipo ya está cargado, no es necesario hacer la llamada a la API
      setCargando(false);
    } else {
      // Si el equipo no está en el estado, hacer la llamada a la API
      const obtenerEquipo = async () => {
        try {
          const resultado = await fetchData(`equipos/${slugEquipo}`);
          if (resultado.status === "success") {
            // Actualizar el estado con los datos del equipo
            setEquipo(resultado.equipo);
          } else {
            setError({
              tipo: "error",
              mensaje: "Hubo un problema al obtener el equipo.",
            });
          }
        } catch (error) {
          setError({
            tipo: error.response?.status || error.name,
            mensaje: error.response?.data?.message || "No existe el equipo.",
          });
        } finally {
          setCargando(false);
        }
      };

      obtenerEquipo();
    }

    window.scrollTo(0, 0);
  }, [location.pathname, equipo]);  

  if (error) {
    return <ErrorPage tipo={error.tipo} mensaje={error.mensaje} />;
  }

  if (cargando) {
    return <Spinner />;
  }

  function navegarDetalleJugador(slug) {
    navegar(`${location.pathname}/${slug}`);
  }

  return (
    <>
      <title>Detalles del Equipo</title>
      <section className="contenedor container py-5">
        <div className="row">
          {/* Sección de detalles del equipo (izquierda) */}
          <div className="col-12 col-md-4 mb-4">
            <div className="card shadow-lg border-light rounded-3 overflow-hidden">
              <div className="card-body text-center">
                <h2 className="card-title mb-4 w-100 bg-primary text-white py-3 rounded-3">
                  Equipo {equipo.nombre}
                </h2>
                <div className="mb-4">
                  <img
                    src={equipo.imagen || imagenDefault}
                    alt={`Imagen del equipo ${equipo.nombre}`}
                    className="img-fluid rounded-3 shadow-sm"
                  />
                </div>
                <div className="d-flex flex-column justify-content-center align-items-start mt-3">
                  <p className="mb-2">
                    <strong>Entrenador:</strong> {equipo.entrenador}
                  </p>
                  <p className="mb-2">
                    <strong>Centro:</strong> {equipo.centro}
                  </p>
                  <p>
                    <strong>Grupo:</strong> {equipo.grupo}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de jugadores (derecha) */}
          <div className="col-12 col-md-8">
            <div className="card shadow-lg border-light rounded-3 overflow-hidden p-3">
              <h2 className="card-title mb-4 w-100 bg-primary text-white py-3 rounded-3 text-center">
                Jugadores
              </h2>
              <div className="row justify-content-center">
                {equipo.Jugadores && equipo.Jugadores.length > 0 ? (
                  equipo.Jugadores.map((jugador, index) => {
                    const urlImagen = jugador.imagenes?.[0]
                      ? `${apiUrl}/${jugador.imagenes[0].ruta}`.replace(
                        "/api/",
                        "/storage"
                      )
                      : imagenDefault;

                    return (
                      <div
                        key={index}
                        className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
                        onClick={() => navegarDetalleJugador(jugador.slug)}
                      >
                        <div className="jugador flip-card shadow-sm rounded">
                          <div className="flip-card-inner">
                            {/* Parte frontal de la carta (imagen) */}
                            <div className="flip-card-front">
                              <img
                                src={urlImagen}
                                alt={`Imagen de ${jugador.nombre}`}
                                className="card-img-top img-fluid rounded"
                              />
                            </div>
                            {/* Parte posterior de la carta (nombre del jugador) */}
                            <div className="nombre flip-card-back d-flex justify-content-center align-items-center rounded">
                              <p className="text-center">
                                <strong>{jugador.nombre}</strong>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>No hay jugadores disponibles.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DetallesEquipoPage;
