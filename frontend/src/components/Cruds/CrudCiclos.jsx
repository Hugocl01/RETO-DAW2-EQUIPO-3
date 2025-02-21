import { useMemo, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import Paginator from "../Paginator";

function CrudCiclos({ onModoCambio }) {
    // Memoriza la sección para evitar recrearla en cada render
    const seccion = useMemo(() => ({ nombre: "Ciclos" }), []);
    const { items, loading, error, deleteItem } = useCrud(seccion);

    // Estados para búsqueda y paginación
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Función segura para evitar errores con valores null/undefined
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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reiniciar a la primera página en cada búsqueda
    };

    if (loading) return <p>Cargando ciclos...</p>;
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
                            <td>
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
