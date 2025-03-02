import { useState, useEffect } from "react";
import { useCrud } from "../../hooks/useCrud";
import { cargarCentros, cargarCiclos } from "../../data/FuncionesCombobox";

/**
 * Función para obtener los centros desde sessionStorage o la API.
 * Si no hay datos en sessionStorage, se obtiene de la API.
 * 
 * @returns {Promise<Array<{value: string, label: string}>>} Lista de centros en formato [{value: string, label: string}]
 */
const fetchCentros = async () => {
    try {
        const storedData = sessionStorage.getItem("centros");

        if (storedData) {
            console.log("Cargando centros desde sessionStorage");
            const data = JSON.parse(storedData);
            return Object.keys(data).map(key => ({
                value: key,
                label: data[key]
            }));
        }

        console.log("Cargando centros desde la API...");
        const data = await cargarCentros();

        if (!data) return []; // Si hubo un error, devolvemos un array vacío

        return Object.keys(data).map(key => ({
            value: key,
            label: data[key]
        }));

    } catch (error) {
        console.error("Error al obtener los centros", error);
        return [];
    }
};

/**
 * Función para obtener los ciclos desde sessionStorage o la API.
 * Si no hay datos en sessionStorage, se obtiene de la API.
 * 
 * @returns {Promise<Array<{value: string, label: string}>>} Lista de ciclos en formato [{value: string, label: string}]
 */
const fetchCiclos = async () => {
    try {
        const storedData = sessionStorage.getItem("ciclos");

        if (storedData) {
            console.log("Cargando ciclos desde sessionStorage");
            const data = JSON.parse(storedData);
            return Object.keys(data).map(key => ({
                value: key,
                label: data[key]
            }));
        }

        console.log("Cargando ciclos desde la API...");
        const data = await cargarCiclos();

        if (!data) return []; // Si hubo un error, devolvemos un array vacío

        return Object.keys(data).map(key => ({
            value: key,
            label: data[key]
        }));

    } catch (error) {
        console.error("Error al obtener los ciclos", error);
        return [];
    }
};

/**
 * Componente para crear o editar un registro de estudio, permitiendo seleccionar un centro, ciclo y curso.
 * El formulario puede usarse tanto para agregar nuevos estudios como para editar un estudio existente.
 * 
 * @component
 * @example
 * // Ejemplo de uso del componente
 * <FormularioEstudios
 *     datosIniciales={{ centro_id: "1", ciclo_id: "2", curso: "1" }}
 *     onGuardar={handleGuardar}
 *     onCancelar={handleCancelar}
 * />
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} [props.datosIniciales] - Datos iniciales para editar un estudio.
 * @param {function} props.onGuardar - Función que se ejecuta cuando se guarda el formulario.
 * @param {function} props.onCancelar - Función que se ejecuta cuando se cancela el formulario.
 * @returns {React.Element} El formulario de estudios.
 */
function FormularioEstudios({ datosIniciales, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({
        centro_id: "",
        ciclo_id: "",
        curso_id: "",
    });
    const [centros, setCentros] = useState([]);
    const [ciclos, setCiclos] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { createItem, updateItem, fetchItems, loading, error } = useCrud({ nombre: "Estudios" });

    /**
     * Carga los centros y ciclos al montar el componente.
     */
    useEffect(() => {
        const obtenerCentros = async () => {
            const data = await fetchCentros();
            setCentros(data);
        };
        obtenerCentros();

        const obtenerCiclos = async () => {
            const data = await fetchCiclos();
            setCiclos(data);
        };
        obtenerCiclos();
    }, []);

    /**
     * Actualiza los valores del formulario cuando cambian los datos iniciales.
     */
    useEffect(() => {
        if (datosIniciales) {
            setFormData({
                centro_id: datosIniciales.centro_id || "",
                ciclo_id: datosIniciales.ciclo_id || "",
                curso_id: datosIniciales.curso || "",
            });
        }
    }, [datosIniciales]);

    /**
     * Maneja el cambio de valores en el formulario.
     * 
     * @param {Object} event - El evento de cambio en el formulario.
     * @param {string} event.target.name - El nombre del campo modificado.
     * @param {string} event.target.value - El nuevo valor del campo.
     */
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    /**
     * Maneja el envío del formulario.
     * 
     * Si el formulario tiene datos iniciales, se actualiza el estudio existente,
     * si no, se crea uno nuevo.
     * 
     * @param {Object} event - El evento de envío del formulario.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            if (datosIniciales) {
                await updateItem(datosIniciales.id, formData);
            } else {
                await createItem(formData);
            }

            fetchItems();
            onGuardar(formData);
        } catch (error) {
            console.error("Error al guardar estudio:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded shadow bg-light">
            <h2 className="mb-4 text-center">Formulario de Estudio</h2>

            {/* Selector de Centro */}
            <div className="mb-3">
                <label htmlFor="centro_id" className="form-label">Centro</label>
                <select
                    name="centro_id"
                    id="centro_id"
                    className="form-select"
                    value={formData.centro_id}
                    onChange={handleChange}
                    disabled={isSubmitting}
                >
                    <option value="" hidden>Seleccione un centro</option>
                    {centros.map((centro) => (
                        <option key={centro.value} value={centro.value}>{centro.label}</option>
                    ))}
                </select>
            </div>

            {/* Selector de Ciclo */}
            <div className="mb-3">
                <label htmlFor="ciclo_id" className="form-label">Ciclo</label>
                <select
                    name="ciclo_id"
                    id="ciclo_id"
                    className="form-select"
                    value={formData.ciclo_id}
                    onChange={handleChange}
                    disabled={isSubmitting}
                >
                    <option value="" hidden>Seleccione un ciclo</option>
                    {ciclos.map((ciclo) => (
                        <option key={ciclo.value} value={ciclo.value}>{ciclo.label}</option>
                    ))}
                </select>
            </div>

            {/* Selector de Curso */}
            <div className="mb-3">
                <label htmlFor="curso_id" className="form-label">Curso</label>
                <select
                    name="curso_id"
                    id="curso_id"
                    className="form-select"
                    value={formData.curso_id}
                    onChange={handleChange}
                    disabled={isSubmitting}
                >
                    <option value="" hidden>Seleccione un curso</option>
                    <option value="1">1º</option>
                    <option value="2">2º</option>
                </select>
            </div>

            {/* Botones */}
            <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Guardar"}
            </button>
            <button type="button" className="btn btn-secondary ms-2" onClick={onCancelar} disabled={isSubmitting}>
                Cancelar
            </button>

            {error && <p className="text-danger mt-3">{error}</p>}
        </form>
    );
}

export default FormularioEstudios;
