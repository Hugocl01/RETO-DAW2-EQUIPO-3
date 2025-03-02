import { useMemo, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import Paginator from "../Paginator";
import Spinner from "../Spinner";

/**
 * Componente para gestionar y visualizar las publicaciones. Permite realizar búsquedas
 * de publicaciones por título, portada y contenido. Además, permite realizar acciones de
 * edición y eliminación, junto con la paginación para navegar entre las publicaciones.
 *
 * @component
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {function} props.onModoCambio - Función que se ejecuta cuando el usuario cambia el modo (crear, editar, etc.).
 * 
 * @returns {React.Element} El componente `CrudPublicaciones` para gestionar las publicaciones.
 */
function CrudPublicaciones({ onModoCambio }) {
    const seccion = useMemo(() => ({ nombre: "Publicaciones" }), []);
    const { items, loading, error, deleteItem } = useCrud(seccion);

    // Estados para la búsqueda y la paginación
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    /**
     * Filtra las publicaciones según el término de búsqueda. 
     * Las publicaciones son filtradas por título, portada y contenido.
     */
    const filteredItems = items.filter((publicacion) => {
        const query = searchQuery.toLowerCase();
        return (
            publicacion.titulo.toLowerCase().includes(query) ||
            publicacion.portada.toLowerCase().includes(query) ||
            publicacion.contenido.toLowerCase().includes(query) ||
            publicacion.seccion.toLowerCase().includes(query) 
        );
    });

    // Cálculos para la paginación
    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    /**
     * Maneja los cambios en el campo de búsqueda. 
     * Reinicia la paginación a la primera página cuando se cambia la búsqueda.
     * 
     * @param {Object} e - El evento de cambio del campo de búsqueda.
     */
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reinicia a la primera página al cambiar la búsqueda
    };

    // Si los datos están cargando, se muestra un spinner
    if (loading) return <Spinner />;
    // Si ocurre un error al cargar los datos, se muestra un mensaje de error
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Publicaciones</h2>

            {/* Buscador */}
            <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar publicaciones..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button
                    className="btn btn-success"
                    onClick={() => onModoCambio("crear")} // Cambia el modo a "crear"
                >
                    Crear Publicacion
                </button>
            </div>

            {/* Tabla de Publicaciones */}
            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Titulo</th>
                        <th>Portada</th>
                        <th>Contenido</th>
                        <th>Sección</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((publicacion) => (
                        <tr key={publicacion.id}>
                            <td>{publicacion.titulo}</td>
                            <td>{publicacion.portada}</td>
                            <td>{publicacion.contenido}</td>
                            <td>{publicacion.seccion}</td>
                            <td className="d-flex">
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => onModoCambio("editar", publicacion)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => deleteItem(publicacion.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    {currentItems.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No hay publicaciones disponibles.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Componente de paginación */}
            <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}

export default CrudPublicaciones;
