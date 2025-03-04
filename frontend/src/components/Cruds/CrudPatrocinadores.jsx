import { useMemo, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import Paginator from "../Paginator";
import Spinner from "../Spinner";

/**
 * Componente para gestionar la lista de patrocinadores.
 *
 * Este componente permite visualizar, buscar, editar y eliminar patrocinadores.
 * También permite la paginación de los patrocinadores listados.
 *
 * @component
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.onModoCambio - Función que maneja el cambio entre los diferentes modos de operación, como "crear" y "editar".
 */
function CrudPatrocinadores({ onModoCambio }) {
    /**
     * Sección utilizada para gestionar los patrocinadores.
     * @type {Object}
     * @property {string} nombre - El nombre de la sección.
     */
    const seccion = useMemo(() => ({ nombre: "Patrocinadores" }), []);

    /**
     * Hook para gestionar las operaciones CRUD.
     * @type {Object}
     * @property {Array} items - Array de patrocinadores obtenidos.
     * @property {boolean} loading - Estado de carga para la lista de patrocinadores.
     * @property {string|null} error - Mensaje de error si ocurre algún problema con las operaciones CRUD.
     * @property {Function} deleteItem - Función para eliminar un patrocinador.
     */
    const { items, loading, error, deleteItem } = useCrud(seccion);

    /**
     * Estado para almacenar el término de búsqueda en el campo de búsqueda.
     * @type {string}
     * @default ""
     */
    const [searchQuery, setSearchQuery] = useState("");

    /**
     * Estado para controlar la página actual de la paginación.
     * @type {number}
     * @default 1
     */
    const [currentPage, setCurrentPage] = useState(1);

    /**
     * Número de elementos a mostrar por página.
     * @type {number}
     * @default 5
     */
    const itemsPerPage = 5;

    /**
     * Convierte el valor a minúsculas si es un string, para realizar búsquedas insensibles a mayúsculas.
     * 
     * @param {string} value - El valor a convertir a minúsculas.
     * @returns {string} El valor en minúsculas o un string vacío si no se proporciona valor.
     */
    const safeToLower = (value) => (value ? value.toString().toLowerCase() : "");

    /**
     * Filtra los patrocinadores de acuerdo al término de búsqueda.
     * 
     * @type {Array}
     * @returns {Array} Array de patrocinadores filtrados.
     */
    const filteredItems = items.filter((patrocinador) => {
        const query = searchQuery.toLowerCase();
        return (
            safeToLower(patrocinador.nombre).includes(query) ||
            safeToLower(patrocinador.landing_page).includes(query)
        );
    });

    /**
     * Número total de elementos filtrados.
     * @type {number}
     */
    const totalItems = filteredItems.length;

    /**
     * Número total de páginas basadas en el número de elementos y elementos por página.
     * @type {number}
     */
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    /**
     * Índice de inicio para la paginación.
     * @type {number}
     */
    const startIndex = (currentPage - 1) * itemsPerPage;

    /**
     * Elementos actuales que se mostrarán en la página actual.
     * @type {Array}
     */
    const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    /**
     * Maneja el cambio en el campo de búsqueda y restablece la página a la primera.
     * 
     * @param {Event} e - El evento de cambio en el campo de búsqueda.
     */
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h2>Patrocinadores</h2>

            <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar patrocinadores..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button
                    className="btn btn-success"
                    onClick={() => onModoCambio("crear")}
                >
                    Crear Patrocinador
                </button>
            </div>

            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Landing Page</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((patrocinador) => (
                        <tr key={patrocinador.id}>
                            <td>{patrocinador.nombre}</td>
                            <td>
                                <a href={patrocinador.landing_page} target="_blank" rel="noopener noreferrer">
                                    {patrocinador.landing_page}
                                </a>
                            </td>
                            <td className="d-flex">
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => onModoCambio("editar", patrocinador)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => deleteItem(patrocinador.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    {currentItems.length === 0 && (
                        <tr>
                            <td colSpan="3" className="text-center">
                                No hay patrocinadores disponibles.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
}

export default CrudPatrocinadores;
