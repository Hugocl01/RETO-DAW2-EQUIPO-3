import React from "react";

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
