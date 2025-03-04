import { useMemo, useState, useEffect } from "react";
import { useCrud } from "../../hooks/useCrud";
import Paginator from "../Paginator";
import Spinner from "../Spinner";

/**
 * Componente que gestiona las inscripciones, permitiendo la búsqueda, aprobación, rechazo y paginación de las inscripciones.
 *
 * @component
 */
function CrudInscripciones() {
    /**
     * Objeto `seccion` que define el nombre de la sección.
     * @type {Object}
     * @property {string} nombre - Nombre de la sección.
     */
    const seccion = useMemo(() => ({ nombre: "Inscripciones" }), []);

    /**
     * Hook para obtener el estado de la solicitud de los datos (cargando y errores).
     * @type {Object}
     * @property {boolean} loading - Si los datos están siendo cargados.
     * @property {string|null} error - Mensaje de error si ocurrió un error al obtener los datos.
     */
    const { loading, error } = useCrud(seccion);

    /**
     * Estado para almacenar las inscripciones obtenidas de la API.
     * @type {Array}
     * @default []
     */
    const [items, setItems] = useState([]);

    /**
     * Estado para almacenar el valor de búsqueda introducido por el usuario.
     * @type {string}
     * @default ""
     */
    const [searchQuery, setSearchQuery] = useState("");

    /**
     * Estado para almacenar la página actual de la paginación.
     * @type {number}
     * @default 1
     */
    const [currentPage, setCurrentPage] = useState(1);

    /**
     * Cantidad de inscripciones por página.
     * @type {number}
     * @default 5
     */
    const itemsPerPage = 5;

    /**
     * Estado que indica si el componente está recargando los datos (activo cuando se actualiza o se cargan datos).
     * @type {boolean}
     * @default false
     */
    const [isReloading, setIsReloading] = useState(false);

    /**
     * Hook que se ejecuta al montar el componente, cargando la tabla de inscripciones.
     */
    useEffect(() => {
        cargarTabla();
    }, []);

    /**
     * Función para cargar las inscripciones desde la API.
     * Se actualizan los estados `items` y `isReloading` durante la carga.
     */
    async function cargarTabla() {
        const url = import.meta.env.VITE_API_URL;
        try {
            setIsReloading(true); // Activar el Spinner antes de la solicitud

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
            setItems(data.inscripciones);
        } catch (err) {
            console.error('Error al cargar la tabla:', err);
        } finally {
            setTimeout(() => setIsReloading(false), 500); // Pausa para la UX
        }
    }

    /**
     * Función para actualizar el estado de una inscripción.
     *
     * @param {Object} inscripcion - Inscripción que se actualizará.
     * @param {string} estado - El nuevo estado de la inscripción.
     */
    async function actualizarInscripcion(inscripcion, estado) {
        try {
            setIsReloading(true); // Activamos el Spinner antes de actualizar
            const url = import.meta.env.VITE_API_URL;
            const response = await fetch(`${url}cambiar-estado/${inscripcion.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ estado })
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el estado de la inscripción.");
            }

            await cargarTabla();
        } catch (err) {
            console.error('Error al actualizar la inscripción:', err);
        }
    }

    /**
     * Función que maneja la acción de aprobar una inscripción.
     *
     * @param {Object} inscripcion - Inscripción que se aprobará.
     */
    const handleAprobar = async (inscripcion) => {
        await actualizarInscripcion(inscripcion, 3);
    };

    /**
     * Función que maneja la acción de rechazar una inscripción.
     *
     * @param {Object} inscripcion - Inscripción que se rechazará.
     */
    const handleRechazar = async (inscripcion) => {
        await actualizarInscripcion(inscripcion, 4);
    };

    /**
     * Función que convierte una cadena de texto a minúsculas de forma segura.
     *
     * @param {any} value - Valor que se convertirá a minúsculas.
     * @returns {string} - Cadena de texto en minúsculas.
     */
    const safeToLower = (value) => (value ? value.toString().toLowerCase() : "");

    /**
     * Filtra las inscripciones en base al término de búsqueda introducido por el usuario.
     * 
     * @type {Array}
     * @default []
     */
    const filteredItems = items.filter((inscripcion) => {
        const query = searchQuery.toLowerCase();
        return (
            safeToLower(inscripcion.nombre).includes(query) ||
            safeToLower(inscripcion.comentarios).includes(query) ||
            safeToLower(inscripcion.estado).includes(query)
        );
    });

    /**
     * Calcula la cantidad total de páginas de acuerdo al número de inscripciones filtradas y la cantidad de inscripciones por página.
     * 
     * @type {number}
     * @default 1
     */
    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    /**
     * Calcula el índice de inicio de las inscripciones para la página actual.
     * 
     * @type {number}
     * @default 0
     */
    const startIndex = (currentPage - 1) * itemsPerPage;

    /**
     * Obtiene las inscripciones correspondientes a la página actual.
     * 
     * @type {Array}
     * @default []
     */
    const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    // Cargando o error, mostrar Spinner o mensaje de error
    if (loading || isReloading) {
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
                    onChange={(e) => setSearchQuery(e.target.value)}
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
