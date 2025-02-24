import { useMemo, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import Paginator from "../Paginator"; // Asegúrate de la ruta correcta
import Spinner from "../Spinner";

function CrudJugadores({ onModoCambio }) {
    const seccion = useMemo(() => ({ nombre: "Jugadores" }), []);
    const { items, loading, error, deleteItem } = useCrud(seccion);

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Ajusta según tus necesidades

    // Filtra los jugadores por nombre, equipo, estudio, email, etc.
    const filteredItems = items.filter((jugador) => {
        const query = searchQuery.toLowerCase();
        return (
            jugador.nombre.toLowerCase().includes(query) ||
            jugador.equipo.toLowerCase().includes(query) ||
            jugador.estudio.toLowerCase().includes(query) ||
            jugador.dni.toLowerCase().includes(query) ||
            jugador.email.toLowerCase().includes(query) ||
            jugador.telefono.includes(query)
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

    if (loading) return <Spinner />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Jugadores</h2>

            {/* Buscador */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar jugadores..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Tabla de Jugadores */}
            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Equipo</th>
                        <th>Estudio</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((jugador) => (
                        <tr key={jugador.slug}>
                            <td>{jugador.nombre}</td>
                            <td>{jugador.equipo}</td>
                            <td>{jugador.estudio}</td>
                            <td>{jugador.email}</td>
                            <td>{jugador.telefono}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => onModoCambio("editar", jugador)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => deleteItem(jugador.slug)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    {currentItems.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No hay jugadores disponibles.
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

export default CrudJugadores;
