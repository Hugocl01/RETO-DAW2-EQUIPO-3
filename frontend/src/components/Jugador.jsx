

import React from "react";

/**
 * Componente Jugador
 * @param {JSON} jugador
 * @returns 
 */
function Jugador({ jugador }) {
  return (
    <div className="row border-bottom py-2">
      <div className="col-3 text-center">{jugador.nombre_completo}</div>
      <div className="col-2 text-center">{jugador.stats.tarjetas_amarillas}</div>
      <div className="col-2 text-center">{jugador.stats.tarjetas_rojas}</div>
      <div className="col-2 text-center">{jugador.stats.goles}</div>
      <div className="col-3 text-center">{jugador.equipo.nombre}</div>
    </div>
  );
}

export default Jugador;

