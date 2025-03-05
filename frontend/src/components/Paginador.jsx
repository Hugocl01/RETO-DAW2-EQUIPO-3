import React from "react";

/**
 * Componente `Paginador` que permite navegar entre páginas.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {number} props.paginaActual - Número de la página actual.
 * @param {number} props.totalPaginas - Número total de páginas.
 * @param {Function} props.siguientePagina - Función para ir a la siguiente página.
 * @param {Function} props.paginaAnterior - Función para ir a la página anterior.
 * @returns {JSX.Element} Componente de paginación.
 */
function Paginador({
  paginaActual,
  totalPaginas,
  siguientePagina,
  paginaAnterior,
}) {
  return (
    <div className="row">
      <div className="col-12 d-flex justify-content-between mt-4">
        {/* Botón anterior */}
        <button
          className="btn btn-primary mx-2"
          onClick={paginaAnterior}
          disabled={paginaActual === 1}
        >
          Anterior
        </button>

        {/* Número de página actual */}
        <p>{paginaActual}</p>

        {/* Botón siguiente */}
        <button
          className="btn btn-primary mx-2"
          onClick={siguientePagina}
          disabled={paginaActual === totalPaginas}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Paginador;
