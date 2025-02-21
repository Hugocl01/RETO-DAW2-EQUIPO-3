import { useMemo, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import Paginator from "../Paginator";

function CrudUsuarios({ onModoCambio }) {
    // Memoriza la sección para evitar recrearla en cada render
    const seccion = useMemo(() => ({ nombre: "Usuarios" }), []);
    const { items, loading, error, deleteItem } = useCrud(seccion);

    // Estados para búsqueda y paginación
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Función segura para evitar errores con valores null/undefined
    const safeToLower = (value) => (value ? value.toString().toLowerCase() : "");

    // Filtrar usuarios según el término de búsqueda
    const filteredItems = items.filter((usuario) => {
        const query = searchQuery.toLowerCase();

        return (
            safeToLower(usuario.nombre).includes(query) ||
            safeToLower(usuario.email).includes(query) ||
            safeToLower(usuario.perfil?.tipo).includes(query) ||
            safeToLower(usuario.activo ? "activo" : "inactivo").includes(query)
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

    if (loading) return <p>Cargando usuarios...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Usuarios</h2>

            {/* Buscador */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar usuarios..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Tabla de datos */}
            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.perfil?.tipo || "Sin rol"}</td>
                            <td>{usuario.activo ? "Activo" : "Inactivo"}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => onModoCambio("editar", usuario)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => deleteItem(usuario.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    {currentItems.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No hay usuarios disponibles.
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

export default CrudUsuarios;
