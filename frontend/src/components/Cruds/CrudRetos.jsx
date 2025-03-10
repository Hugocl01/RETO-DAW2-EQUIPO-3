import { useMemo, useState, useEffect } from "react";
import { useCrud } from "../../hooks/useCrud";
import Paginator from "../Paginator";
import Spinner from "../Spinner";

/**
 * Componente para gestionar y mostrar una lista de retos con funcionalidad de búsqueda, paginación y opciones de edición o eliminación.
 *
 * Este componente permite visualizar, buscar, paginar y realizar acciones sobre una lista de retos, incluyendo
 * opciones para crear, editar o eliminar retos. Utiliza el hook `useCrud` para la manipulación de los datos
 * y `Paginator` para la paginación de los elementos.
 *
 * @component
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {function} props.onModoCambio - Función que se ejecuta cuando se cambia el modo (crear o editar).
 * @returns {React.Element} El componente de gestión de retos con búsqueda y paginación.
 */
function CrudRetos({ onModoCambio }) {
    // Memoriza la sección para evitar recrearla en cada render
    const seccion = useMemo(() => ({ nombre: "Retos" }), []);
    const { items, loading, error, deleteItem } = useCrud(seccion);

    // Estados para búsqueda y paginación
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    /**
     * Función para manejar valores null/undefined y convertirlos a minúsculas.
     * 
     * @param {string | null | undefined} value - El valor a convertir.
     * @returns {string} El valor convertido a minúsculas, o una cadena vacía si es null o undefined.
     */
    const safeToLower = (value) => (value ? value.toString().toLowerCase() : "");

    // Filtrado de retos según el término de búsqueda
    const filteredItems = items.filter((reto) => {
        const query = searchQuery.toLowerCase();
        return (
            safeToLower(reto.titulo).includes(query) ||
            safeToLower(reto.texto).includes(query) ||
            safeToLower(reto.estudio?.centro).includes(query) ||
            safeToLower(reto.estudio?.ciclo).includes(query) ||
            safeToLower(reto.estudio?.curso).includes(query)
        );
    });

    // Cálculos de paginación
    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    /**
     * Maneja el cambio en el valor del buscador.
     * 
     * Actualiza el estado `searchQuery` y reinicia la página actual a la primera página.
     *
     * @param {Object} e - El evento de cambio del input.
     * @param {string} e.target.value - El nuevo valor ingresado en el campo de búsqueda.
     * @returns {void}
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
            <h2>Retos</h2>

            {/* Buscador */}
            <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar retos..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button
                    className="btn btn-success"
                    onClick={() => onModoCambio("crear")} // Cambia el modo a "crear"
                >
                    Crear Reto
                </button>
            </div>

            {/* Tabla de datos */}
            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th>Centro</th>
                        <th>Ciclo</th>
                        <th>Curso</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((reto) => (
                        <tr key={reto.id}>
                            <td>{reto.titulo}</td>
                            <td>{reto.texto}</td>
                            <td>{reto.estudio?.centro || "N/A"}</td>
                            <td>{reto.estudio?.ciclo || "N/A"}</td>
                            <td>{reto.estudio?.curso || "N/A"}</td>
                            <td className="d-flex">
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => onModoCambio("editar", reto)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => deleteItem(reto.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    {currentItems.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No hay retos disponibles.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Paginación */}
            <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
}

export default CrudRetos;
