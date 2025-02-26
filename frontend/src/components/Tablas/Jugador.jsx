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
    console.log(jugador)
    fnNavegarEquipo(jugador.equipo.slug);
  }

  function handleCLickNavegarJugador(){
    fnNavegarJugador(jugador.slug)
  }
  return (
    <div className="row border-bottom py-2" onClick={handleCLickNavegarJugador}>
      {/* Columna para la imagen y el nombre del jugador */}
      <div className="col-5 col-md-6 d-flex flex-row justify-content-center text-center">
        <div className="d-flex flex-row w-75">
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
          <p className="m-0 justify-self-center text-center  w-100 h5">{jugador.nombre}</p> 
        </div>
      </div>
  
      {/* Columnas para estadísticas del jugador */}
      <div className="col-2 col-md-2 text-center h5">
        {jugador.stats.goles}
      </div>
      <div className=" col-2 col-md-2 text-center h5">
        {jugador.stats.tarjetas_amarillas}
      </div>
      <div className="col-3 col-md-2 text-center h5">
        {jugador.stats.tarjetas_rojas}
      </div>
    </div>
  );
  
}

export default Jugador;
