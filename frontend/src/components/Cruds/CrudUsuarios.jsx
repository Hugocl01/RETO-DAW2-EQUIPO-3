import { useMemo, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import Paginator from "../Paginator";
import Spinner from "../Spinner";

/**
 * Componente para gestionar y mostrar una lista de usuarios con funcionalidad de búsqueda, paginación y opciones de edición o eliminación.
 *
 * Este componente permite visualizar, buscar, paginar y realizar acciones sobre una lista de usuarios,
 * incluyendo opciones para crear, editar o eliminar usuarios. Utiliza el hook `useCrud` para la manipulación
 * de los datos y `Paginator` para la paginación de los elementos.
 *
 * @component
 * @example
 * // Ejemplo de uso del componente
 * <CrudUsuarios onModoCambio={(modo, usuario) => console.log(modo, usuario)} />
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {function} props.onModoCambio - Función que se ejecuta cuando se cambia el modo (crear o editar).
 * @returns {React.Element} El componente de gestión de usuarios con búsqueda y paginación.
 */
function CrudUsuarios({ onModoCambio }) {
    // Memoriza la sección para evitar recrearla en cada render
    const seccion = useMemo(() => ({ nombre: "Usuarios" }), []);
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

    // Filtrado de usuarios según el término de búsqueda
    const filteredItems = items.filter((usuario) => {
        const query = searchQuery.toLowerCase();
        return (
            safeToLower(usuario.nombre).includes(query) ||
            safeToLower(usuario.email).includes(query) ||
            safeToLower(usuario.perfil?.tipo).includes(query)
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
        setCurrentPage(1); // Reiniciar a la primera página en cada búsqueda
    };

    if (loading) {
        return <Spinner />;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    
    return (
        <div>
            <h2>Usuarios</h2>

            {/* Buscador  y Boton de crear */}
            <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
                <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Buscar usuarios..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button
                    className="btn btn-success"
                    onClick={() => onModoCambio("crear")} // Cambia el modo a "crear"
                >
                    Crear Usuario
                </button>
            </div>

            {/* Tabla de datos */}
            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.perfil?.tipo || "Sin rol"}</td>
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
