import { Tooltip } from "react-tooltip";
import React from "react";

/**
 * Componente Jugador
 * @param {JSON} jugador
 * @returns
 */
function Jugador({ jugador, fnNavegarEquipo, fnNavegarJugador }) {

  function handleClickNavegarEquipo(event) {
    event.stopPropagation();
    fnNavegarEquipo(jugador.equipo.id);
  }

  function handleCLickNavegarJugador(){
    fnNavegarJugador(jugador.id)
  }
  return (
    <div className="row border-bottom py-2" onClick={handleCLickNavegarJugador}>
      <div className="col-3 d-flex flex-row  text-center">
        <img
          src="../src/assets/imagenes/img1.jpg"
          alt={`imagen${jugador.equipo.nombre}`}
          style={{ width: "20%" }}
          data-tooltip-id="imgEquipo"
          data-tooltip-content={jugador.equipo.nombre}
          data-tooltip-float
          onClick={handleClickNavegarEquipo}
        />
        <Tooltip id="imgEquipo"></Tooltip>
        <p className="mx-3">{jugador.nombre_completo}</p>
      </div>
      <div className="col-3 text-center">{jugador.stats.goles}</div>
      <div className="col-3 text-center">
        {jugador.stats.tarjetas_amarillas}
      </div>
      <div className="col-3 text-center">{jugador.stats.tarjetas_rojas}</div>
    </div>
  );
}

export default Jugador;
