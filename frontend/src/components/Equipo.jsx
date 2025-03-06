import React from "react";
import "./css/EquipoPage.css";
import img1 from '../assets/imagenes/img1.jpg';

/**
 * Componente para mostrar la información básica de un equipo.
 * Permite navegar a la vista detallada del equipo al hacer clic en la tarjeta.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.equipoObtenido - Objeto que contiene la información del equipo.
 * @param {Function} props.fnNavegar - Función para navegar a la vista detallada del equipo.
 * @returns {JSX.Element} Componente de equipo.
 */
function Equipo({ equipoObtenido, fnNavegar }) {
  /**
   * Maneja el clic en la tarjeta del equipo para navegar a su vista detallada.
   */
  function handleClick() {
    // Usamos el slug en lugar de id
    fnNavegar(equipoObtenido.slug);
  }

  return (
    <div className="col">
      <div className="card contEquipo shadow-sm m-2" onClick={handleClick} id="equipos">
        <img
          src={img1}
          alt={equipoObtenido.nombre}
          className="card-img-top"
          style={{ height: '250px', objectFit: 'cover' }} // Ajusta el tamaño de la imagen
        />
        <div className="card-body">
          <h5 className="card-title text-center">{equipoObtenido.nombre}</h5>
        </div>
      </div>
    </div>
  );
}

export default Equipo;
