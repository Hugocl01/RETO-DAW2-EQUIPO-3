import { Tooltip } from "react-tooltip";
import React from "react";
import "../css/JugadorEquipo.css";
import img1 from '../../assets/imagenes/img1.jpg';

/**
 * Componente para mostrar la información de un jugador.
 * Permite navegar a la vista detallada del jugador o de su equipo al hacer clic en la imagen o nombre.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.jugador - Objeto que contiene la información del jugador.
 * @param {Function} props.fnNavegarEquipo - Función para navegar a la vista detallada del equipo.
 * @param {Function} props.fnNavegarJugador - Función para navegar a la vista detallada del jugador.
 * @returns {JSX.Element} Componente de jugador.
 */
function Jugador({ jugador, fnNavegarEquipo, fnNavegarJugador }) {

  /**
   * Maneja el clic en la imagen del equipo para navegar a la vista detallada del equipo.
   *
   * @param {Object} event - Evento del clic.
   */
  function handleClickNavegarEquipo(event) {
    event.stopPropagation();
    fnNavegarEquipo(jugador.equipo);
  }

  /**
   * Maneja el clic en el nombre o la fila del jugador para navegar a su vista detallada.
   */
  function handleCLickNavegarJugador() {
    fnNavegarJugador(jugador.slug);
  }

  return (
    <div className="row border-bottom py-2" onClick={handleCLickNavegarJugador}>
      {/* Columna para la imagen y el nombre del jugador */}
      <div className="col-5 col-md-6 d-flex flex-row justify-content-center text-center">
        <div className="d-flex flex-row w-75">
          <img
            src={img1}
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
