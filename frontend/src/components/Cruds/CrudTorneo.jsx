import { useState, useEffect, useMemo } from "react";
import Spinner from "../Spinner";
import Paginator from "../Paginator"; // Asegúrate de que la ruta es correcta

const url = import.meta.env.VITE_API_URL;
async function fetchEquipos() {
    try {
        const response = await fetch(`${url}equipos`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener los datos.");
        }

        const data = await response.json();
        return data.equipos || [];
    } catch (err) {
        console.error('Error al recoger los equipos:', err);
        return [];
    }
}

export default function CrudTorneos() {
    const [torneo, setTorneo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fechaInicioTorneo, setFechaInicioTorneo] = useState("");
    const [fechaActual, setFechaActual] = useState("");
    const [equipos, setEquipos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setFechaInicioTorneo(formattedDate);
        setFechaActual(formattedDate);
        getTorneoStatus();
    }, []);

    const getTorneoStatus = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${url}partidos`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) throw new Error("Error al obtener los partidos");

            const data = await response.json();
            const partidosData = data.partidos || [];

            const fechaActual = new Date();
            const normalizeDate = (date) => {
                const normalizedDate = new Date(date);
                normalizedDate.setHours(0, 0, 0, 0);
                return normalizedDate;
            };

            const torneoActivo = partidosData.some((partido) => normalizeDate(partido.fecha) >= normalizeDate(fechaActual));

            setTorneo({ iniciado: torneoActivo });
            const equiposData = await fetchEquipos();
            setEquipos(equiposData);
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const iniciarTorneo = async () => {
        if (!fechaInicioTorneo) {
            alert("Por favor, selecciona una fecha.");
            return;
        }

        if (new Date(fechaInicioTorneo) <= new Date(fechaActual)) {
            alert("Por favor, selecciona una fecha posterior.");
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${url}comienzo-torneo`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fecha: fechaInicioTorneo })
            });

            if (!response.ok) throw new Error("Error al iniciar el torneo");

            setTorneo({ iniciado: true });
            getTorneoStatus();
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const reiniciarTorneo = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${url}reinicio-torneo`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fecha: fechaInicioTorneo })
            });

            if (!response.ok) throw new Error("Error al reiniciar el torneo");

            setTorneo({ iniciado: false });
            getTorneoStatus();
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const totalItems = equipos.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = equipos.slice(startIndex, startIndex + itemsPerPage);

    if (loading) return <Spinner />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-4">
            <div className="d-flex justify-content-between">
                {/* Columna Izquierda - Detalles del Torneo */}
                <div className="w-50">
                    <h2>Detalles del Torneo</h2>
                    <p><strong>Estado:</strong> {torneo?.iniciado ? "Iniciado" : "No Iniciado"}</p>
                    <p><strong>Fecha seleccionada:</strong> {fechaInicioTorneo || "No seleccionada"}</p>
                </div>

                {/* Columna Derecha - Fecha y Botones */}
                <div className="w-50">
                    <div className="mb-3 w-75">
                        <label htmlFor="fecha" className="form-label">
                            Selecciona la fecha del torneo:
                        </label>
                        <input
                            type="date"
                            id="fecha"
                            className="form-control"
                            value={fechaInicioTorneo}
                            onChange={(e) => setFechaInicioTorneo(e.target.value)}
                        />
                    </div>

                    <div className="d-flex gap-2 mt-3">
                        <button className="btn btn-success" onClick={iniciarTorneo} disabled={torneo?.iniciado}>
                            Iniciar Torneo
                        </button>
                        <button className="btn btn-danger" onClick={reiniciarTorneo} disabled={!torneo?.iniciado}>
                            Reiniciar Torneo
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabla de Equipos y Paginador */}
            <div className="mt-4">
                <h2>Participantes</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nombre del Equipo</th>
                            <th>Grupo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((equipo, index) => (
                            <tr key={index}>
                                <td>{equipo.nombre}</td>
                                <td>{equipo.grupo}</td>
                            </tr>
                        ))}
                        {currentItems.length === 0 && (
                            <tr>
                                <td colSpan="2" className="text-center">No hay equipos disponibles.</td>
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
        </div>
    );
}
