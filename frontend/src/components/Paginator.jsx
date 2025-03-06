import React from "react";

/**
 * Componente `Paginator` que permite navegar entre páginas.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {number} props.currentPage - Número de la página actual.
 * @param {number} props.totalPages - Número total de páginas.
 * @param {Function} props.onPageChange - Función que se ejecuta al cambiar de página.
 * @returns {JSX.Element} Componente de paginación.
 */
const Paginator = ({ currentPage, totalPages, onPageChange }) => {
    /**
     * Maneja el evento de ir a la página anterior.
     */
    const handlePrevPage = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    /**
     * Maneja el evento de ir a la página siguiente.
     */
    const handleNextPage = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className="d-flex justify-content-center align-items-center gap-3 my-3">
            {/* Botón para ir a la página anterior */}
            <button
                className="btn btn-primary"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
            >
                Anterior
            </button>

            {/* Indicador de página actual y total de páginas */}
            <span>
                Página {currentPage} de {totalPages}
            </span>

            {/* Botón para ir a la página siguiente */}
            <button
                className="btn btn-primary"
                onClick={handleNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
            >
                Siguiente
            </button>
        </div>
    );
};

export default Paginator;
