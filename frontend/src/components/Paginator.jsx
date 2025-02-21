import React from "react";

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevPage = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className="d-flex justify-content-center align-items-center gap-3 my-3">
            <button
                className="btn btn-primary"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
            >
                Anterior
            </button>
            <span>
                Página {currentPage} de {totalPages}
            </span>
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
