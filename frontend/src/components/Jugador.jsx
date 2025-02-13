import React from "react";

/**
 * Componente Equipo
 * @param {JSON} jugador
 * @param {fnNavegar} fnNavegar función para navegar a los detalles del jugador
 * @returns 
 */
function Jugador({ jugador, fnNavegar }) {

    /**
     * Manejador para el click
     */
    function handleClick(){
        fnNavegar(jugador.id_jugador);
    }
  return (
    <div className="row border-bottom py-2" onClick={handleClick}>
      <div className="col-3 text-center">{jugador.nombre}</div>
      <div className="col-3 text-center">
        {jugador.primer_apellido} {jugador.segundo_apellido}
      </div>
      <div className="col-3 text-center">{jugador.goles_marcados}</div>
      <div className="col-3 text-center">{jugador.equipo.nombre}</div>
    </div>
  );
}

export default Jugador;

