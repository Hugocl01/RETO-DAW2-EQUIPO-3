import { useState, useEffect } from "react";
import llamadas from "../../data/FuncionesCombobox";

/**
 * Función para obtener la lista de incidencias desde la API.
 *
 * @async
 * @function fetchIncidencias
 * @returns {Promise<Array>} Lista de incidencias con formato { value, label }.
 */
const fetchIncidencias = async () => {
    try {
        // Si no hay datos en sessionStorage, los obtenemos de la API
        console.log("Cargando incidencias desde la API...");
        const data = await llamadas().incidencias();

        if (!data) return []; // Si hubo un error en la API, devolvemos un array vacío

        return Object.keys(data).map(key => ({
            value: key,
            label: data[key]
        }));

    } catch (error) {
        console.error("Error al obtener las incidencias", error);
        return [];
    }
};

/**
 * Componente para gestionar un formulario de partidos.
 * Permite registrar incidencias durante un partido, como goles, tarjetas, etc.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.datosIniciales - Datos iniciales para el formulario.
 * @param {Function} props.onGuardar - Función para manejar el envío del formulario.
 * @param {Function} props.onCancelar - Función para manejar la cancelación del formulario.
 * @returns {JSX.Element} Componente de formulario de partidos.
 */
function FormularioPartidos({ datosIniciales, onGuardar, onCancelar }) {
    const [equipoSeleccionado, setEquipoSeleccionado] = useState("");
    const [jugadores, setJugadores] = useState([]);
    const [equipoLocal, setEquipoLocal] = useState(datosIniciales["equipo local"].nombre);
    const [equipoVisitante, setEquipoVisitante] = useState(datosIniciales["equipo visitante"].nombre);
    const [incidencias, setIncidencias] = useState([]);
    const [minuto, setMinuto] = useState("");  // Nuevo estado para el minuto
    const [comentario, setComentario] = useState("");  // Nuevo estado para el comentario
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState("");
    const [incidenciaSeleccionada, setIncidenciaSeleccionada] = useState("");

    // Efecto para cargar las incidencias al montar el componente
    useEffect(() => {
        const cargarIncidencias = async () => {
            const data = await fetchIncidencias();
            console.log("Incidencias cargadas:", data);
            setIncidencias(data);
        };
        cargarIncidencias();
    }, []);

    // Efecto para cargar los jugadores del equipo seleccionado
    useEffect(() => {
        if (equipoSeleccionado) {
            const jugadoresEquipo = datosIniciales["equipo local"].nombre === equipoSeleccionado
                ? datosIniciales["equipo local"].Jugadores
                : datosIniciales["equipo visitante"].Jugadores;
            setJugadores(jugadoresEquipo);
        }
    }, [equipoSeleccionado, datosIniciales]);

    // Deshabilitar el botón de guardar si no se han completado todos los campos
    const deshabilitarGuardar = !equipoSeleccionado || !jugadorSeleccionado || !incidenciaSeleccionada || !minuto || !comentario;

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            {/* Tablas de Actas */}
            <div className="d-flex justify-content-between">
                {/* Tabla Equipo Local */}
                <div className="w-50">
                    <h3 className="text-lg font-bold mb-2 text-center">Actas - {equipoLocal}</h3>
                    <table className="w-full mx-auto border">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">Jugador</th>
                                <th className="border p-2">Incidencia</th>
                                <th className="border p-2">Minuto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datosIniciales.actas.filter(acta => acta.equipo === equipoLocal).map((acta) => (
                                <tr key={acta.id} className="border">
                                    <td className="border p-2">{acta.jugador || "-"}</td>
                                    <td className="border p-2">{acta.incidencia}</td>
                                    <td className="border p-2">{acta.minuto}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Tabla Equipo Visitante */}
                <div className="w-50">
                    <h3 className="text-lg font-bold mb-2 text-center">Actas - {equipoVisitante}</h3>
                    <table className="w-full mx-auto border">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">Jugador</th>
                                <th className="border p-2">Incidencia</th>
                                <th className="border p-2">Minuto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datosIniciales.actas.filter(acta => acta.equipo === equipoVisitante).map((acta) => (
                                <tr key={acta.id} className="border">
                                    <td className="border p-2">{acta.jugador || "-"}</td>
                                    <td className="border p-2">{acta.incidencia}</td>
                                    <td className="border p-2">{acta.minuto}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Selección de Equipo */}
            <div className="mb-4">
                <label className="block font-semibold mb-2">Seleccionar Equipo</label>
                <div className="flex space-x-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="equipo"
                            value={equipoLocal}
                            checked={equipoSeleccionado === equipoLocal}
                            onChange={(e) => setEquipoSeleccionado(e.target.value)}
                            className="mr-2"
                        />
                        {equipoLocal}
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="equipo"
                            value={equipoVisitante}
                            checked={equipoSeleccionado === equipoVisitante}
                            onChange={(e) => setEquipoSeleccionado(e.target.value)}
                            className="mr-2"
                        />
                        {equipoVisitante}
                    </label>
                </div>
            </div>

            {/* Selección de Jugador */}
            <div className="mb-4">
                <label className="block font-semibold mb-2">Seleccionar Jugador</label>
                <select
                    className="w-full p-2 border rounded"
                    disabled={!equipoSeleccionado}
                    onChange={(e) => setJugadorSeleccionado(e.target.value)}
                >
                    <option value="" hidden>Seleccione un jugador</option>
                    {jugadores.map((jugador) => (
                        <option key={jugador.id} value={jugador.nombre}>{jugador.nombre}</option>
                    ))}
                </select>
            </div>

            {/* Selección de Incidencia */}
            <div className="mb-4">
                <label className="block font-semibold mb-2">Seleccionar Incidencia</label>
                <select
                    className="w-full p-2 border rounded"
                    onChange={(e) => setIncidenciaSeleccionada(e.target.value)}
                >
                    <option value="" hidden>Seleccione una incidencia</option>
                    {incidencias.length > 0 ? (
                        incidencias.map((incidencia, index) => (
                            <option key={index} value={incidencia.value}>{incidencia.label}</option>
                        ))
                    ) : (
                        <option disabled>Cargando...</option>
                    )}
                </select>
            </div>

            {/* Minuto */}
            <div className="mb-4">
                <label className="block font-semibold mb-2">Minuto</label>
                <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={minuto}
                    onChange={(e) => setMinuto(e.target.value)}
                    min="1"
                    max="90"
                    required
                />
            </div>

            {/* Comentario */}
            <div className="mb-4">
                <label className="block font-semibold mb-2">Comentario</label>
                <textarea
                    className="w-full p-2 border rounded"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    rows="4"
                    placeholder="Escribe un comentario sobre la incidencia"
                    required
                />
            </div>

            {/* Botones de Acción */}
            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={onGuardar}
                    disabled={deshabilitarGuardar}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Guardar
                </button>
                <button
                    type="button"
                    onClick={onCancelar}
                    className="px-4 py-2 bg-gray-300 rounded"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}

export default FormularioPartidos;