import { useMemo, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import Paginator from "../Paginator";

/**
 * Componente que gestiona la visualización, búsqueda, creación, edición y eliminación de familias.
 * Permite realizar acciones sobre las familias como buscar, editar, eliminar y crear nuevas familias.
 * 
 * @component
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {function} props.onModoCambio - Función que se ejecuta cuando cambia el modo, como editar o crear una familia.
 * 
 * @returns {React.Element} El componente `CrudFamilias` para gestionar las familias.
 */
function CrudFamilias({ onModoCambio }) {
    // Memoriza la sección para evitar recrearla en cada render
    const seccion = useMemo(() => ({ nombre: "Familias" }), []);
    const { items, loading, error, deleteItem } = useCrud(seccion);

    // Estados para búsqueda y paginación
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Ajusta según tus necesidades

    /**
     * Filtra las familias basándose en el nombre, sin tener en cuenta mayúsculas/minúsculas.
     * 
     * @param {Object} familia - El objeto de familia a filtrar.
     * @returns {boolean} Retorna `true` si la familia cumple con el criterio de búsqueda.
     */
    const filteredItems = items.filter((familia) =>
        familia.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Cálculos de paginación
    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    /**
     * Maneja el cambio en el campo de búsqueda y reinicia la página a la primera.
     * 
     * @param {Object} e - El evento de cambio en el campo de búsqueda.
     */
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reinicia a la primera página al cambiar la búsqueda
    };

    // Muestra un mensaje mientras se están cargando las familias
    if (loading) return <p>Cargando familias...</p>;

    // Muestra un mensaje de error si ocurre un problema
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Familias</h2>

            {/* Buscador */}
            <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
                <input
                    type="text"
                    className="form-control form-control-sm flex-grow-1"
                    placeholder="Buscar familias..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button
                    className="btn btn-success text-nowrap"
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
