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

  /**
   * Efecto que se ejecuta cuando cambia la ubicación (URL).
   * Obtiene los datos del equipo desde la API o desde la sesión de almacenamiento.
   */
  useEffect(() => {
    /**
     * Cojo el valor del nombre del equipo desde la URL (última parte de location.pathname)
     */
    const nombreEquipo = location.pathname.split("/").pop();

    /**
     * Función envoltorio que realiza la llamada a la API para obtener los datos del equipo
     */
    const obtenerEquipo = async () => {
      try {
        const resultado = await fetchData(`equipos/${nombreEquipo}`);
        if (resultado.status === "success") {
          /**
           * Tengo que obtener el array de la session donde tengo los jugadores ya cargados
           * Si me devuelve null, inicializo un array vacío
           */
          let arrayEquipo =
            JSON.parse(sessionStorage.getItem("equiposMostrados")) || [];

          /**
           * Quiero evitar duplicados
           */
          const equipoExistente = arrayEquipo.find(
            (e) => e.nombre === resultado.equipo.nombre
          );

          /**
           * Si no está, lo añade
           */
          if (!equipoExistente) {
            arrayEquipo.push(resultado.equipo);
            sessionStorage.setItem(
              "equiposMostrados",
              JSON.stringify(arrayEquipo)
            );
          }

          /**
           * Actualizo el estado del equipo
           */
          setEquipo(resultado.equipo);
        } else {
          /**
           * Si me devuelve otro tipo de estado la API, lo recojo en el estado de error
           */
          setError({
            tipo: "error",
            mensaje: "Hubo un problema al obtener el equipo.",
          });
        }
      } catch (error) {
        /**
         * Los errores que me recoja el catch, lo guardo en el estado de error
         */
        setError({
          tipo: error.response?.status || error.name,
          mensaje: error.response?.data?.message || "No existe el equipo.",
        });
      } finally {
        /**
         * De error o no, dejará de estar el spinner
         */
        setCargando(false);
      }
    };

    /**
     * Obtengo el array de equiposMostrados en la sessionStorage
     */
    const obtenerEquipoSession =
      JSON.parse(sessionStorage.getItem("equiposMostrados")) || [];

    /**
     * Busco si el equipo ya está en sessionStorage por su slug
     */
    const equipoEnStorage = obtenerEquipoSession.find(
      (e) => e.slug === nombreEquipo
    );

    /**
     * Si el equipo está en sessionStorage, lo uso directamente
     * Si no está, realizo la llamada a la API
     */
    if (equipoEnStorage) {
      // Si ya está en sessionStorage, asignamos directamente el equipo al estado
      setEquipo(equipoEnStorage);
      setCargando(false);
    } else {
      obtenerEquipo();
    }

    /**
     * Desplazo la página arriba del todo
     */
    window.scrollTo(0, 0);
  }, [location]);

  /**
   * Enseño la página de error, cuando haya una página de error
   */
  if (error) {
    return <ErrorPage tipo={error.tipo} mensaje={error.mensaje} />;
  }

  /**
   * Mientras cargue, muestro el spinner
   */
  if (cargando) {
    return <Spinner />;
  }

  /**
   * Redirijo a la página de detalle jugador
   * 
   * @param {string} slug - El identificador único del jugador.
   */
  function navegarDetalleJugador(slug) {
    navegar(`${location.pathname}/${slug}`);
  }

  return (
    <>
      <title>Detalles del Equipo</title>
      <section className="contenedor container-fluid py-5">
        <div className="row">
          {/* Sección de información del equipo */}
          <section id="infoEquipo" className="col-md-4 p-0 d-flex flex-column">
            <div className="card shadow-sm border-light rounded p-3">
              <div className="card-body text-center">
                <h2 className="card-title mb-3 w-100 bg-primary text-white py-2 rounded-3">
                  Equipo {equipo.nombre}
                </h2>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <div>
                    <img
                      src={equipo.imagen || imagenDefault}
                      alt={`Imagen del equipo ${equipo.nombre}`}
                      className="img-fluid w-75"
                    />
                  </div>

                  <div className="w-75 d-flex flex-column justify-content-start mt-3 align-items-start">
                    <p>
                      <strong>Entrenador:</strong> {equipo.entrenador}
                    </p>
                    <p>
                      <strong>Centro:</strong> {equipo.centro}
                    </p>
                    <p>
                      <strong>Grupo:</strong> {equipo.grupo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sección de jugadores */}
          <section id="jugadores" className="col-md-8">
            <div className="card shadow-sm border-light rounded p-3">
              <div className="card-body text-center">
                <h2 className="card-title mb-3 w-100 bg-primary text-white py-2 rounded-3">
                  Jugadores
                </h2>
              </div>
              <div className="row d-flex flex-row flex-wrap justify-content-center align-items-center g-4">
                {equipo.Jugadores && equipo.Jugadores.length > 0 ? (
                  equipo.Jugadores.map((jugador, index) => {
                    const urlImagen = jugador.imagenes?.[0]
                      ? `${apiUrl}/${jugador.imagenes[0].ruta}`.replace('/api/', '/storage')
                      : imagenDefault;

                    return (
                      <div
                        key={index}
                        className="col-12 col-sm-6 col-md-3 mb-4 d-flex justify-content-center align-items-center"
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
                              <p>
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
          </section>
        </div>
      </section>
    </>
  );
}

export default DetallesEquipoPage;
