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
        const response = await llamadas().equipos();
        return response.data.map((equipo, index) => ({
            value: index,
            label: equipo
        }));
    } catch (error) {
        console.error("Error al obtener los equipos", error);
        return [];
    }
};

/**
 * Componente para gestionar un formulario de equipos.
 * Permite crear o editar un equipo con nombre y selección de equipo.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.datosIniciales - Datos iniciales para el formulario.
 * @param {Function} props.onGuardar - Función para manejar el envío del formulario.
 * @param {Function} props.onCancelar - Función para manejar la cancelación del formulario.
 * @returns {JSX.Element} Componente de formulario de equipos.
 */
function FormularioEquipos({ datosIniciales, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({
        nombre: "",
        equipo: ""
    });
    const [equipos, setEquipos] = useState([]);

    // Efecto para cargar los equipos al montar el componente
    useEffect(() => {
        const obtenerEquipos = async () => {
            const data = await fetchEquipos();
            setEquipos(data);
        };
        obtenerEquipos();
    }, []);

    // Efecto para inicializar el formulario con datos iniciales
    useEffect(() => {
        if (datosIniciales) {
            setFormData(datosIniciales);
        }
    }, [datosIniciales]);

    /**
     * Maneja los cambios en los campos del formulario.
     *
     * @param {Object} event - Evento del input.
     */
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
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
    useEffect(() => {
        if (datosIniciales) {
            setFormData({ ...datosIniciales }); // 🔥 Clonar el objeto puede evitar problemas de referencia
        }
    }, [datosIniciales]);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="nombre_completo">Nombre</label>
                <input
                    type="text"
                    name="nombre_completo"
                    id="nombre_completo"
                    placeholder="Ingrese su nombre completo"
                    value={formData?.nombre ?? ""}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="equipo_id">Equipo</label>
                <select
                    name="equipo_id"
                    id="equipo_id"
                    value={formData?.equipo ?? ""}
                    onChange={handleChange}
                >
                    <option value="" hidden>Seleccione un equipo</option>
                    {equipos.map((equipo) => (
                        <option key={equipo.value} value={equipo.value}>{equipo.label}</option>
                    ))}
                </select>
            </div>
            <div>
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancelar}>Cancelar</button>
            </div>
        </form>
    );
}

export default FormularioEquipos;
