import { useMemo, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import Paginator from "../Paginator";
import Spinner from "../Spinner";

/**
 * Componente para gestionar y visualizar los partidos. Permite realizar búsquedas de partidos
 * por fecha, equipos, pabellón, grupo y tipo. Además, permite realizar acciones de edición
 * y eliminación de partidos, junto con la paginación para navegar entre los partidos.
 *
 * @component
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {function} props.onModoCambio - Función que se ejecuta cuando el usuario cambia el modo (crear, editar, etc.).
 * 
 * @returns {React.Element} El componente `CrudPartidos` para gestionar los partidos.
 */
function CrudPartidos({ onModoCambio }) {
    // Memoriza la sección para evitar recrearla en cada render
    const seccion = useMemo(() => ({ nombre: "Partidos" }), []);
    const { items, loading, error, deleteItem } = useCrud(seccion);

    // Estados para búsqueda y paginación
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    /**
     * Filtra los partidos según el término de búsqueda. 
     * Los partidos son filtrados por fecha, equipo local, equipo visitante, pabellón, grupo y tipo.
     */
    const filteredItems = items.filter((partido) => {
        const query = searchQuery.toLowerCase();

        // Función auxiliar para evitar el error de null/undefined
        const safeToLower = (value) => (value ? value.toLowerCase() : "");
        return (
            safeToLower(partido.fecha).includes(query) ||
            safeToLower(partido["equipo local"]).includes(query) ||
            safeToLower(partido["equipo visitante"]).includes(query) ||
            safeToLower(partido.pabellón).includes(query) ||
            safeToLower(partido.grupo).includes(query) ||
            safeToLower(partido.tipo).includes(query)
        );
    });

    // Cálculos de paginación
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
            <h2>Partidos</h2>

            {/* Buscador */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar partidos..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Tabla de Partidos */}
            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Fecha</th>
                        <th>Equipo Local</th>
                        <th>Equipo Visitante</th>
                        <th>Pabellón</th>
                        <th>Grupo</th>
                        <th>Tipo</th>
                        <th>Goles Local</th>
                        <th>Goles Visitante</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((partido) => (
                        <tr key={partido.slug}>
                            <td>{partido.fecha}</td>
                            <td>{partido["equipo local"]}</td>
                            <td>{partido["equipo visitante"]}</td>
                            <td>{partido.pabellón}</td>
                            <td>{partido.grupo}</td>
                            <td>{partido.tipo}</td>
                            <td>{partido["goles local"]}</td>
                            <td>{partido["goles visitante"]}</td>
                            <td className="d-flex">
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => onModoCambio("editar", partido)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => deleteItem(partido.slug)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    {currentItems.length === 0 && (
                        <tr>
                            <td colSpan="9" className="text-center">
                                No hay partidos disponibles.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Componente de paginación */}
            <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
}

export default CrudPartidos;
