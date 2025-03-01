import { useState } from "react";
import TablaEquipos from "../components/Tablas/TablaEquipos";
import TablaJugadores from "../components/Tablas/TablaJugadores";
import "../components/css/EstilosComun.css";

function EstadisticasPage() {
  /**
   * Estado que cambiará la tabla que se mostrará
   */
  const [tabla, setTabla] = useState("jugadores");

  /**
   * Función que maneja el click cambiando el estado tabla, donde se mostrará una tabla diferente
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
