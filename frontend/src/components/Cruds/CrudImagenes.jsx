import { useMemo, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import Paginator from "../Paginator";

/**
 * Componente para gestionar la lista de imágenes con funcionalidades CRUD.
 * Permite buscar, paginar y añadir imágenes.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.onModoCambio - Función para cambiar el modo (crear, editar) en el componente padre.
 * @returns {JSX.Element} Componente de gestión de imágenes.
 */
function CrudImagenes({ onModoCambio }) {
    // Memoriza la sección para evitar recrearla en cada render
    const seccion = useMemo(() => ({ nombre: "Imagenes" }), []);

    /**
     * Obtiene los datos de las imágenes mediante el hook useCrud.
     */
    const { items, loading, error, deleteItem } = useCrud(seccion);

    // Estados para búsqueda y paginación
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    /**
     * Función para manejar valores null/undefined.
     *
     * @param {string} value - Valor a convertir a minúsculas.
     * @returns {string} Valor en minúsculas o cadena vacía si es null/undefined.
     */
    const safeToLower = (value) => (value ? value.toString().toLowerCase() : "");

    /**
     * Filtrado de imágenes según el término de búsqueda.
     *
     * @type {Array}
     */
    const filteredItems = items.filter((imagen) => {
        const query = searchQuery.toLowerCase();
        /*
        return (
            safeToLower(imagen.titulo).includes(query) ||
            safeToLower(imagen.texto).includes(query) ||
            safeToLower(imagen.estudio?.centro).includes(query) ||
            safeToLower(imagen.estudio?.ciclo).includes(query) ||
            safeToLower(imagen.estudio?.curso).includes(query)
        );
        */
    });

    /**
     * Cálculos de paginación.
     *
     * @type {number}
     */
    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    /**
     * Maneja el cambio en el campo de búsqueda.
     *
     * @param {Object} e - Evento del input.
     */
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reinicia a la primera página al cambiar la búsqueda
    };

    return (
        <div>
            <h2>Imágenes</h2>

            {/* Buscador y Botón de crear */}
            <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
                <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Buscar imágenes..."
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