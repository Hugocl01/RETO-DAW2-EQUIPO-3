import React from "react";

/**
 * Componente Equipo
 * @param {Object} equipoObtenido - Objeto con la información del equipo.
 * @param {Function} fnNavegar - Función para navegar a los detalles del equipo.
 * @returns {JSX.Element}
 */
function Equipo({ equipoObtenido, fnNavegar }) {
  /**
   * Función manejadora del click que redirige a la página de detalles del equipo
   */
  function handleClick() {
    // Usamos el slug en lugar de id
    fnNavegar(equipoObtenido.slug);
  }

  /**
   * Muestro la información básica del equipo
   */
  return (
    <div className="col">
      <div className="card shadow-sm m-2" onClick={handleClick} id="equipos">
        <img
          src="src/assets/imagenes/img1.jpg"
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
