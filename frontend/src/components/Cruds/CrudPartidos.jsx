import { useMemo, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import Paginator from "../Paginator";

function CrudPartidos({ onModoCambio }) {
    // Memoriza la sección para evitar recrearla en cada render
    const seccion = useMemo(() => ({ nombre: "Partidos" }), []);
    const { items, loading, error, deleteItem } = useCrud(seccion);

    // Estados para búsqueda y paginación
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Ajusta según tus necesidades

    // Filtrado de items según el término de búsqueda (por ejemplo, por equipos, fecha, grupo)
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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reinicia a la primera página en cada búsqueda
    };

    if (loading) return <p>Cargando partidos...</p>;
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

            {/* Tabla de datos */}
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

            {/* Componente de paginación reutilizable */}
            <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
}

export default CrudPartidos;
