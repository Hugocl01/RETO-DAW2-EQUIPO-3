import { useMemo, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import Paginator from "../Paginator"; // Asegúrate de la ruta correcta

function CrudPublicaciones({ onModoCambio }) {
    const seccion = useMemo(() => ({ nombre: "Publicaciones" }), []);
    const { items, loading, error, deleteItem } = useCrud(seccion);

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Ajusta según tus necesidades

    // Filtra los jugadores por nombre, equipo, estudio, email, etc.
    const filteredItems = items.filter((publicacion) => {
        const query = searchQuery.toLowerCase();
        return (
            publicacion.titulo.toLowerCase().includes(query) ||
            publicacion.portada.toLowerCase().includes(query) ||
            publicacion.contenido.toLowerCase().includes(query)
            //|| publicacion.seccion.toLowerCase().includes(query) 
        );
    });

    // Cálculo de la paginación.
    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reinicia a la primera página al cambiar la búsqueda
    };

    if (loading) return <p>Cargando publicaciones...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Publicaciones</h2>

            {/* Buscador */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar publicaciones..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Tabla de Publicaciones */}
            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Titulo</th>
                        <th>Portada</th>
                        <th>Contenido</th>
                        <th>Seccion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((publicacion) => (
                        <tr key={publicacion.id}>
                            <td>{publicacion.titulo}</td>
                            <td>{publicacion.portada}</td>
                            <td>{publicacion.contenido}</td>
                            {<td>{publicacion.seccion}</td>}
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

            {/* Paginador */}
            <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}

export default CrudPublicaciones;
