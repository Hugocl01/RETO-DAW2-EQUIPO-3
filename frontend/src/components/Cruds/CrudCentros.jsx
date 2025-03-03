import { useMemo, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import Paginator from "../Paginator";
import Spinner from "../Spinner";

/**
 * Componente para gestionar los centros. Permite listar, buscar, editar y eliminar centros.
 * También soporta la paginación de los elementos listados.
 * 
 * @component
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {function} props.onModoCambio - Función que se ejecuta cuando el usuario cambia el modo entre "crear" o "editar". Recibe el modo y los datos del centro si es necesario.
 * 
 * @returns {React.Element} El componente para gestionar los centros.
 */
function CrudCentros({ onModoCambio }) {
    // Memoriza la sección para evitar recrearla en cada render
    const seccion = useMemo(() => ({ nombre: "Centros" }), []);
    const { items, loading, error, deleteItem } = useCrud(seccion);

    // Estados para búsqueda y paginación
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    /**
     * Función segura para evitar errores con valores null/undefined.
     * Convierte el valor en minúsculas si no es nulo ni indefinido.
     * 
     * @param {string|null|undefined} value - Valor a convertir a minúsculas.
     * @returns {string} El valor convertido a minúsculas o una cadena vacía si es nulo o indefinido.
     */
    const safeToLower = (value) => (value ? value.toString().toLowerCase() : "");

    /**
     * Filtra los centros en función del término de búsqueda. Compara el nombre y la landing page de cada centro con el término de búsqueda.
     * 
     * @returns {Array} Lista de centros que coinciden con el término de búsqueda.
     */
    const filteredItems = items.filter((centro) => {
        const query = searchQuery.toLowerCase();

        return (
            safeToLower(centro.nombre).includes(query) ||
            safeToLower(centro.landing_page).includes(query)
        );
    });

    // Cálculos de paginación
    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    /**
     * Maneja el cambio en el campo de búsqueda, actualizando el estado del término de búsqueda y reiniciando la paginación.
     * 
     * @param {Object} e - El evento de cambio.
     */
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reiniciar a la primera página en cada búsqueda
    };

    // Mostrar el cargando o el error
    if (loading) {
        return <Spinner />;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    
    return (
        <div>
            <h2>Centros</h2>

            {/* Buscador */}
            <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
                <input
                    type="text"
                    className="form-control" form-control-sm flex-grow-1
                    placeholder="Buscar centros..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button
                    className="btn btn-success text-nowrap"
                    onClick={() => onModoCambio("crear")} // Cambia el modo a "crear"
                >
                    Crear Centro
                </button>
            </div>

            {/* Tabla de datos */}
            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Landing Page</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((centro) => (
                        <tr key={centro.id}>
                            <td>{centro.nombre}</td>
                            <td>
                                <a href={centro.landing_page} target="_blank" rel="noopener noreferrer">
                                    {centro.landing_page}
                                </a>
                            </td>
                            <td className="d-flex">
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => onModoCambio("editar", centro)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => deleteItem(centro.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    {currentItems.length === 0 && (
                        <tr>
                            <td colSpan="3" className="text-center">
                                No hay centros disponibles.
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

export default CrudCentros;
