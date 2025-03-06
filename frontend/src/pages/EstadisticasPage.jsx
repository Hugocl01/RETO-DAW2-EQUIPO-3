import { useState } from "react";
import TablaEquipos from "../components/Tablas/TablaEquipos";
import TablaJugadores from "../components/Tablas/TablaJugadores";
import "../components/css/EstilosComun.css";

/**
 * Página `EstadisticasPage` que muestra estadísticas de jugadores o equipos, permitiendo alternar entre ambas vistas.
 * 
 * @component
 * @returns {JSX.Element} - Elemento JSX que representa la página de estadísticas.
 */
function EstadisticasPage() {
  /**
   * Estado que controla qué tabla se muestra (jugadores o equipos).
   * @type {string}
   */
  const [tabla, setTabla] = useState("jugadores");

  /**
   * Maneja el clic en los botones para cambiar entre las tablas de jugadores y equipos.
   * 
   * @param {Event} e - Evento de clic en el botón.
   */
  function handleClick(e) {
    let accionBtn = e.target.dataset.accion;
    if (accionBtn === "equipos") {
      setTabla("equipos");
    } else {
      setTabla("jugadores");
    }
  }

  return (
    <>
      <title>Estadisticas</title>
      <section className="container-fluid mt-5 w-75">
        <div className="row">
          <h1 className="mx-auto w-auto text-center">Estadísticas</h1>
        </div>
        <div className="row">
          <div className="col-12 d-flex flex-row justify-content-start my-2">
            <button
              className="btn btn-primary mx-2"
              data-accion="jugadores"
              onClick={handleClick}
            >
              Jugadores
            </button>
            <button
              className="btn btn-primary mx-2"
              data-accion="equipos"
              onClick={handleClick}
            >
              Equipo
            </button>
          </div>
        </div>
        {tabla === "jugadores" ? (
          <>
            <TablaJugadores></TablaJugadores>
          </>
        ) : (
          <>
            <TablaEquipos></TablaEquipos>
          </>
        )}
      </section>
    </>
  );
}

export default EstadisticasPage;
