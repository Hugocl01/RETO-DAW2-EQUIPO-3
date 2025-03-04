import { useEffect, useState } from "react";
import llamadas from "../../data/FuncionesCombobox";

/**
 * Obtiene las familias, ya sea desde sessionStorage o desde la API.
 * Si no hay datos en sessionStorage, los busca en la API y luego los guarda en sessionStorage.
 * 
 * @async
 * @returns {Array} Lista de objetos con propiedades `value` y `label` representando las familias.
 */
const fetchFamilias = async () => {
    try {
        // Si no hay datos en sessionStorage, los obtenemos de la API
        console.log("Cargando familias desde la API...");
        const data = await llamadas().familias();

        if (!data) return []; // Si hubo un error en la API, devolvemos un array vacío

        return Object.keys(data).map(key => ({
            value: key,
            label: data[key]
        }));

    } catch (error) {
        console.error("Error al obtener las familias", error);
        return [];
    }
};

/**
 * Componente para gestionar el formulario de ciclos.
 * Permite ingresar el nombre del ciclo y seleccionar una familia desde un listado.
 * 
 * @component
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} [props.datosIniciales] - Datos iniciales para el formulario. Si se proporcionan, se cargan en el formulario.
 * @param {function} props.onGuardar - Función que se ejecuta al guardar el formulario. Recibe los datos del formulario.
 * @param {function} props.onCancelar - Función que se ejecuta al cancelar el formulario.
 * 
 * @returns {React.Element} El formulario para gestionar los ciclos.
 */
function FormularioCiclos({ datosIniciales, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({});
    const [errores, setErrores] = useState({});
    const [familias, setFamilias] = useState([]);

    // Cargar las familias al montar el componente
    useEffect(() => {
        const obtenerFamilias = async () => {
            const data = await fetchFamilias();
            setFamilias(data);
        };
        obtenerFamilias();
    }, []);

    // Cargar los datos iniciales si existen
    useEffect(() => {
        if (datosIniciales) {
            setFormData(datosIniciales);
        }
    }, [datosIniciales]);

    /**
     * Maneja el cambio en los campos del formulario.
     * Actualiza el estado `formData` con los valores de los inputs.
     * 
     * @param {Object} event - El evento de cambio.
     */
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    /**
     * Maneja el envío del formulario.
     * Realiza la validación (si la implementas) y llama a `onGuardar` con los datos del formulario.
     * 
     * @param {Object} event - El evento de envío.
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        // Validar antes de guardar (puedes implementar validaciones aquí)
        onGuardar(formData);
    };
    console.log(formData);
    return (
        <form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded shadow bg-light">
            <h2 className="mb-4 text-center">{datosIniciales != null ? 'Editar Ciclo' : 'Crear ciclo'}</h2>

            {/* Nombre */}
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    id="nombre"
                    placeholder="Ingrese el nombre"
                    value={formData.nombre || ''}
                    onChange={handleChange}
                />
            </div>

            {/* Familia */}
            <div className="mb-3">
                <label htmlFor="familia_id" className="form-label">Familia</label>
                <select
                    className="form-select"
                    name="familia_id"
                    id="familia_id"
                    value={formData.familia_id?.id || ''}
                    onChange={handleChange}
                >
                    <option value="" hidden>Seleccione una familia</option>
                    {familias.map((familia) => (
                        <option key={familia.value} value={familia.value}>{familia.label}</option>
                    ))}
                </select>
            </div>

            {/* Botones */}
            <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-success">Guardar</button>
                <button type="button" className="btn btn-secondary" onClick={onCancelar}>Cancelar</button>
            </div>
        </form>
    );

}

export default FormularioCiclos;
