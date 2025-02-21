import { useMemo, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import Paginator from "../Paginator";

function CrudImagenes({ onModoCambio }) {
    // Memoriza la sección para evitar recrearla en cada render
    const seccion = useMemo(() => ({ nombre: "Imagenes" }), []);
    const { items, loading, error, deleteItem } = useCrud(seccion);

    // Estados para búsqueda y paginación
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Función para manejar valores null/undefined
    const safeToLower = (value) => (value ? value.toString().toLowerCase() : "");

    // Filtrado de retos según el término de búsqueda
    const filteredItems = items.filter((imagen) => {
        const query = searchQuery.toLowerCase();
        /*
        return (
            safeToLower(reto.titulo).includes(query) ||
            safeToLower(reto.texto).includes(query) ||
            safeToLower(reto.estudio?.centro).includes(query) ||
            safeToLower(reto.estudio?.ciclo).includes(query) ||
            safeToLower(reto.estudio?.curso).includes(query)
        );
        */
    });

    // Cálculos de paginación
    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div>
            <h2>Imágenes</h2>

            {/* Buscador  y Boton de crear */}
            <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
                <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Buscar imagenes..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button
                    className="btn btn-success"
                    onClick={() => onModoCambio("crear")} // Cambia el modo a "crear"
                >
                    Añadir Imagen
                </button>
            </div>
        </div>
    );
}

export default CrudImagenes;