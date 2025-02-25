import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import Spinner from "../../components/Spinner.jsx";
import "../../core/CSS/DetalleEquipoPage.css";
import ErrorPage from "../ErrorPage.jsx";

function DetallesEquipoPage() {
  const location = useLocation();
  const [equipo, setEquipo] = useState();
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState();
  const navegar = useNavigate();

  useEffect(() => {
    /**
     * Función envoltorio que realiza la llamada a la api apra obtener los datos del equipo
     */
    const obtenerEquipo = async () => {
      try {
        const resultado = await api.get(location.pathname);
        if (resultado.data.status === "success") {
          /**
           * Si el resultado es success, guardo los datos del equipo en la sessionstorage
           * También guardo el equipo en el estado
           */
          sessionStorage.setItem(
            resultado.data.equipo.nombre,
            JSON.stringify(resultado.data.equipo)
          );
          setEquipo(resultado.data.equipo);
        } else {
          /**
           * Si me devuelve otro tipo de estado la api, lo recojo en el estado de error
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
     * Cojo el valor del nombre del location
     * Obtengo luego los valores de la session storage con el nombre del equipo
     */
    const nombreEquipo = location.pathname.split("/").pop(); 
    const obtenerEquipoSession = sessionStorage.getItem(nombreEquipo);

    /**
     * Si hay datos en la sessioStorage, utilizo esos datos y la asigno al estado equipo
     * Si no hay datos, realizo la llamada a la api
     */
    if (obtenerEquipoSession) {
      setEquipo(JSON.parse(obtenerEquipoSession)); 
      setCargando(false);
    } else {
      obtenerEquipo();
    }
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
   * @param {String} slug 
   */
  function navegarDetalleJugador(slug) {
    navegar(`/jugadores/${slug}`);
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
                      src={"../../src/assets/imagenes/img1.jpg"}
                      alt="imagenPatrocinador"
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
                {equipo.Jugadores.jugador.map((valor, index) => (
                  <div
                    key={index}
                    className="col-12 col-sm-6 col-md-3 mb-4 d-flex justify-content-center align-items-center"
                    onClick={() => navegarDetalleJugador(valor.slug)}
                  >
                    <div className="jugador flip-card shadow-sm">
                      <div className="flip-card-inner">
                        {/* Parte frontal de la carta (imagen) */}
                        <div className="flip-card-front">
                          <img
                            src={`../../src/assets/imagenes/messi.jpg`} // Cambiar para cada jugador
                            alt="imagenJugador"
                            className="card-img-top img-fluid rounded"
                          />
                        </div>
                        {/* Parte posterior de la carta (nombre del jugador) */}
                        <div className="nombre flip-card-back d-flex justify-content-center align-items-center">
                          <p>
                            <strong>{valor.nombre}</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default DetallesEquipoPage;
