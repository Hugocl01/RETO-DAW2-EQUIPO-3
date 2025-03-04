import { useMemo, useState, useEffect } from "react";
import { useCrud } from "../../hooks/useCrud";
import Paginator from "../Paginator";
import Spinner from "../Spinner";

function CrudInscripciones() {
    // Memoriza la sección para evitar recrearla en cada render
    const seccion = useMemo(() => ({ nombre: "Inscripciones" }), []);
    const { items: initialItems, loading, error, deleteItem } = useCrud(seccion);

    // Estado local para manejar la lista de inscripciones
    const [items, setItems] = useState(initialItems);

    // Actualizar items cuando los datos de useCrud cambien
    useEffect(() => {
        setItems(initialItems);
    }, [initialItems]);

    // Estados para búsqueda y paginación
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Función para manejar valores null/undefined
    const safeToLower = (value) => (value ? value.toString().toLowerCase() : "");

    // Filtrado de inscripciones según el término de búsqueda
    const filteredItems = items.filter((inscripcion) => {
        const query = searchQuery.toLowerCase();
        return (
            safeToLower(inscripcion.nombre).includes(query) ||
            safeToLower(inscripcion.comentarios).includes(query) ||
            safeToLower(inscripcion.estado).includes(query)
        );
    });

    // Cálculos de paginación
    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    async function cargarTabla() {
        const url = import.meta.env.VITE_API_URL;
        try {
            const response = await fetch(`${url}inscripciones`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (!response.ok) {
                throw new Error("Error al obtener las inscripciones.");
            }

            const data = await response.json();
            setItems(data.inscripciones); // ✅ Actualiza los items en el estado
        } catch (err) {
            console.error('Error al cargar la tabla:', err);
        }
    }

    async function actualizarInscripcion(inscripcion, estado) {
        try {
            const url = import.meta.env.VITE_API_URL;
            const response = await fetch(`${url}cambiar-estado/${inscripcion.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ estado }) // ✅ Ahora se envía el estado correctamente
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el estado de la inscripción.");
            }

            const data = await response.json();

            // Llamar a la función que actualiza la tabla
            cargarTabla();

            return data;
        } catch (err) {
            console.error('Error al actualizar la inscripción:', err);
            return null;
        }
    }


    const handleAprobar = async (inscripcion) => {
        console.log(`Inscripción aprobada`);
        await actualizarInscripcion(inscripcion, 3); // Pasa la inscripción y el estado 3
    };

    const handleRechazar = async (inscripcion) => {
        console.log(`Inscripción rechazada`);
        await actualizarInscripcion(inscripcion, 4); // Pasa la inscripción y el estado 4
    };


    if (loading) {
        return <Spinner />;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h2>Inscripciones</h2>

            {/* Buscador */}
            <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
                <input
                    type="text"
                    className="form-control form-control-sm flex-grow-1"
                    placeholder="Buscar inscripciones..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Tabla de datos */}
            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Comentarios</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((inscripcion) => (
                        <tr key={inscripcion.id}>
                            <td>{inscripcion.nombre}</td>
                            <td>{inscripcion.comentarios}</td>
                            <td>{inscripcion.estado}</td>
                            <td className="d-flex gap-2">
                                <button
                                    className="btn btn-sm btn-success"
                                    onClick={() => handleAprobar(inscripcion)}
                                    disabled={inscripcion.estado === "No Activa"}
                                >
                                    Aprobar
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleRechazar(inscripcion)}
                                    disabled={inscripcion.estado === "No Activa"}
                                >
                                    Rechazar
                                </button>
                            </td>
                        </tr>
                    ))}
                    {currentItems.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center">
                                No hay inscripciones disponibles.
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

export default CrudInscripciones;
