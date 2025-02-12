import React from "react";

/**
 * Componente equipo
 * @param {String} nombre
 * @param {Function} fnNavegar
 * @returns 
 */

function Equipo({ equipoObtenido, fnNavegar }) {

    /**
     * Función manejadora del click que redirige a la pagina de detalles del equipo
     */
  function handleClick() {
    fnNavegar(equipoObtenido.id); 
  }

  /**
   * Muestro la informacion básica del equipo
   */
  return (
    <div className="col">
      <div className="card shadow-sm" onClick={handleClick}>
        <img 
          src="src/assets/imagenes/img1.jpg" 
          alt={equipoObtenido} 
          className="card-img-top" 
          style={{ height: '300px', objectFit: 'cover' }} // Ajusta el tamaño de la imagen
        />
        <div className="card-body">
          <h5 className="card-title text-center">{equipoObtenido.nombre}</h5>
        </div>
      </div>
    </div>
  );
}

export default Equipo;
