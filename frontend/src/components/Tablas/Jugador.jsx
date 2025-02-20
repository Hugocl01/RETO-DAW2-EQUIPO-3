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
    fnNavegarEquipo(jugador.equipo.slug);
  }

  function handleCLickNavegarJugador(){
    fnNavegarJugador(jugador.slug)
  }
  return (
    <div className="row border-bottom py-2" onClick={handleCLickNavegarJugador}>
      <div className="col-3 d-flex flex-row justify-content-center text-center">
        <div className="d-flex flex-row w-75 ">
        <img
          src="../src/assets/imagenes/img1.jpg"
          alt={`imagen${jugador.equipo}`}
          style={{ width: "20%" }}
          data-tooltip-id="imgEquipo"
          data-tooltip-content={jugador.equipo}
          data-tooltip-float
          onClick={handleClickNavegarEquipo}
        />
        <Tooltip id="imgEquipo"></Tooltip>
        <p className="mx-3">{jugador.nombre}</p>
        </div>
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
