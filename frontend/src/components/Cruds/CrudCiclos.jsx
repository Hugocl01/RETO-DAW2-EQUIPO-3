import { useMemo, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import Paginator from "../Paginator";
import Spinner from "../Spinner";

/**
 * Componente que gestiona la visualización y edición de los ciclos formativos.
 * Permite buscar, eliminar y editar ciclos, así como paginar los resultados.
 * 
 * @component
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {function} props.onModoCambio - Función que se ejecuta cuando cambia el modo, por ejemplo, para editar o crear un ciclo.
 * 
 * @returns {React.Element} El componente `CrudCiclos` que permite administrar los ciclos formativos.
 */
function CrudCiclos({ onModoCambio }) {
    // Memoriza la sección para evitar recrearla en cada render
    const seccion = useMemo(() => ({ nombre: "Ciclos" }), []);
    const { items, loading, error, deleteItem } = useCrud(seccion);

    // Estados para búsqueda y paginación
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    /**
     * Función segura para convertir valores en minúsculas sin causar errores si el valor es null o undefined.
     * 
     * @param {any} value - El valor a convertir a minúsculas.
     * @returns {string} El valor en minúsculas o una cadena vacía si es null/undefined.
     */
    const safeToLower = (value) => (value ? value.toString().toLowerCase() : "");

    // Filtrar ciclos según el término de búsqueda
    const filteredItems = items.filter((ciclo) => {
        const query = searchQuery.toLowerCase();

        return (
            safeToLower(ciclo.nombre).includes(query) ||
            safeToLower(ciclo.familia_id?.nombre).includes(query)
        );
    });

    // Cálculos de paginación
    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    /**
     * Maneja el cambio en el campo de búsqueda.
     * Reinicia la página a la primera en cada búsqueda.
     * 
     * @param {Object} e - El evento de cambio.
     */
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reiniciar a la primera página en cada búsqueda
    };

    // Cargar el spinner mientras se cargan los datos
    if (loading) return <Spinner />;

    // Mostrar un mensaje de error si ocurre uno
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Ciclos Formativos</h2>

            {/* Buscador */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar ciclos..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Tabla de datos */}
            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Familia Profesional</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((ciclo) => (
                        <tr key={ciclo.id}>
                            <td>{ciclo.nombre}</td>
                            <td>{ciclo.familia_id?.nombre || "Sin familia"}</td>
                            <td className="d-flex">
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => onModoCambio("editar", ciclo)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => deleteItem(ciclo.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    {currentItems.length === 0 && (
                        <tr>
                            <td colSpan="3" className="text-center">
                                No hay ciclos disponibles.
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

export default CrudCiclos;
