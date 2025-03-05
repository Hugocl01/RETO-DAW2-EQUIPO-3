import { useEffect, useState } from "react";
import llamadas from "../../data/FuncionesCombobox";

/**
 * Función para obtener la lista de equipos desde la API.
 *
 * @async
 * @function fetchEquipos
 * @returns {Promise<Array>} Lista de equipos con formato { value, label }.
 */
const fetchEquipos = async () => {
    try {
        console.log("Cargando equipos desde la API...");
        const data = await llamadas().equipos();

        if (!data) return []; // Si hubo un error en la API, devolvemos un array vacío

        return Object.keys(data).map(key => ({
            value: key,
            label: data[key]
        }));

    } catch (error) {
        console.error("Error al obtener los equipos", error);
        return [];
    }
};

/**
 * Función para obtener la lista de estudios desde la API.
 *
 * @async
 * @function fetchEstudios
 * @returns {Promise<Array>} Lista de estudios con formato { value, label }.
 */
const fetchEstudios = async () => {
    try {
        // Si no hay datos en sessionStorage, los obtenemos de la API
        console.log("Cargando estudios desde la API...");
        const data = await llamadas().estudios();

        if (!data) return []; // Si hubo un error en la API, devolvemos un array vacío

        return Object.keys(data).map(key => ({
            value: key,
            label: data[key]
        }));

    } catch (error) {
        console.error("Error al obtener los estudios", error);
        return [];
    }
};

/**
 * Componente para gestionar un formulario de jugadores.
 * Permite crear o editar un jugador con nombre, equipo, estudio y estado de capitán.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.datosIniciales - Datos iniciales para el formulario.
 * @param {Function} props.onGuardar - Función para manejar el envío del formulario.
 * @param {Function} props.onCancelar - Función para manejar la cancelación del formulario.
 * @returns {JSX.Element} Componente de formulario de jugadores.
 */
function FormularioJugadores({ datosIniciales, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({
        nombre_completo: "",
        equipo_id: "",
        estudio_id: "",
        capitan: false,
    });
    const [equipos, setEquipos] = useState([]);
    const [estudios, setEstudios] = useState([]);

    // Efecto para cargar los equipos y estudios al montar el componente
    useEffect(() => {
        const obtenerEquipos = async () => {
            const data = await fetchEquipos();
            setEquipos(data);
        };
        obtenerEquipos();

        const obtenerEstudios = async () => {
            const data = await fetchEstudios();
            setEstudios(data);
        };
        obtenerEstudios();
    }, []);

    // Efecto para inicializar el formulario con datos iniciales
    useEffect(() => {
        if (datosIniciales) {
            // Aseguramos que equipo_id y estudio_id se asignen correctamente
            setFormData({
                ...datosIniciales,
                equipo_id: datosIniciales.equipo_id || "", // Asignar equipo_id inicial
                estudio_id: datosIniciales.estudio_id || "", // Asignar estudio_id inicial
                capitan: datosIniciales.capitan || false, // Asignar capitan si existe
            });
        }
    }, [datosIniciales]);

    /**
     * Maneja los cambios en los campos del formulario.
     *
     * @param {Object} event - Evento del input.
     */
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        // Si es un checkbox, usamos checked en lugar de value
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    /**
     * Maneja el envío del formulario.
     *
     * @param {Object} event - Evento del formulario.
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        onGuardar(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="nombre_completo">Nombre Completo</label>
                <input
                    type="text"
                    name="nombre_completo"
                    id="nombre_completo"
                    placeholder="Ingrese su nombre completo"
                    value={formData.nombre_completo || ""}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="equipo_id">Equipo</label>
                <select
                    name="equipo_id"
                    id="equipo_id"
                    value={formData.equipo_id || ""}
                    onChange={handleChange}
                >
                    <option value="" hidden>Seleccione un equipo</option>
                    {equipos.map((equipo) => (
                        <option key={equipo.value} value={equipo.value}>
                            {equipo.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="estudio_id">Estudio</label>
                <select
                    name="estudio_id"
                    id="estudio_id"
                    value={formData.estudio_id || ""}
                    onChange={handleChange}
                >
                    <option value="" hidden>Seleccione un estudio</option>
                    {estudios.map((estudio) => (
                        <option key={estudio.value} value={estudio.value}>
                            {estudio.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="capitan">Capitan</label>
                <input
                    type="checkbox"
                    name="capitan"
                    id="capitan"
                    checked={formData.capitan || false}
                    onChange={handleChange}
                />
            </div>
            <div>
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancelar}>Cancelar</button>
            </div>
        </form>
    );
}

export default FormularioJugadores;
