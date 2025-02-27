import { useMemo, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import Paginator from "../Paginator"; // Asegúrate de la ruta correcta

function CrudFamilias({ onModoCambio }) {
    const seccion = useMemo(() => ({ nombre: "Familias" }), []);
    const { items, loading, error, deleteItem } = useCrud(seccion);

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Ajusta según tus necesidades

    // Filtrar por el campo "nombre"
    const filteredItems = items.filter((familia) =>
        familia.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Paginación
    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reinicia a la primera página al cambiar la búsqueda
    };

    if (loading) return <p>Cargando familias...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Familias</h2>

            {/* Buscador */}
            <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
                <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Buscar familias..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button
                    className="btn btn-success"
                    onClick={() => onModoCambio("crear")} // Cambia el modo a "crear"
                >
                    Crear Familia
                </button>
            </div>

            {/* Tabla de Familias */}
            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((familia) => (
                        <tr key={familia.id}>
                            <td>{familia.nombre}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => onModoCambio("editar", familia)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => deleteItem(familia.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    {currentItems.length === 0 && (
                        <tr>
                            <td colSpan="2" className="text-center">
                                No hay familias disponibles.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Paginador */}
            <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}

export default CrudFamilias;
