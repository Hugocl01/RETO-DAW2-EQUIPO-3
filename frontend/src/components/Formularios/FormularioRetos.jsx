import { useState, useEffect } from "react";
import { useCrud } from "../../hooks/useCrud";
import { cargarEstudios } from "../../data/FuncionesCombobox";

/**
 * Función para obtener los estudios desde el almacenamiento de sesión o la API.
 *
 * Esta función primero intenta obtener los estudios desde `sessionStorage`. Si no están disponibles,
 * realiza una solicitud a la API para obtener los estudios y luego los almacena en `sessionStorage`.
 * 
 * @async
 * @returns {Array<Object>} Un arreglo de objetos con las propiedades `value` y `label` de los estudios.
 */
const fetchEstudios = async () => {
    try {
        const storedData = sessionStorage.getItem("estudios");

        if (storedData) {
            console.log("Cargando estudios desde sessionStorage");
            const data = JSON.parse(storedData);

            return Object.keys(data).map(key => ({
                value: key,
                label: data[key]
            }));
        }

        console.log("Cargando estudios desde la API...");
        const data = await cargarEstudios();

        if (!data) {
            return [];
        }
        
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
 * Componente de formulario para crear o editar un reto.
 * 
 * Este componente maneja la creación y edición de un reto. Permite ingresar un título, texto y seleccionar un estudio.
 * La información se guarda mediante la función `createItem` o `updateItem` del hook `useCrud`.
 * 
 * @component
 * @example
 * // Ejemplo de uso del componente
 * <FormularioRetos
 *   datosIniciales={{ titulo: "Reto 1", texto: "Texto del reto", estudio_id: 1 }}
 *   onGuardar={(data) => console.log(data)}
 *   onCancelar={() => console.log("Cancelado")}
 * />
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} [props.datosIniciales] - Datos iniciales para editar un reto (si existe).
 * @param {function} props.onGuardar - Función a ejecutar cuando se guarda un reto.
 * @param {function} props.onCancelar - Función a ejecutar cuando se cancela el formulario.
 * @returns {React.Element} El formulario de retos.
 */
function FormularioRetos({ datosIniciales, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({
        titulo: "",
        texto: "",
        estudio_id: null,
    });
    const [estudios, setEstudios] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { createItem, updateItem, fetchItems, loading, error } = useCrud({ nombre: "Retos" });

    /**
     * Carga los estudios desde `sessionStorage` o la API cuando el componente se monta.
     *
     * Utiliza el hook `useEffect` para cargar los estudios y actualiza el estado `estudios`.
     * 
     * @async
     * @returns {void}
     */
    useEffect(() => {
        const obtenerEstudios = async () => {
            const data = await fetchEstudios();
            setEstudios(data);
        };
        obtenerEstudios();
    }, []);

    /**
     * Carga los datos iniciales cuando `datosIniciales` cambia.
     *
     * Si `datosIniciales` contiene información, se actualiza el estado `formData` para reflejar esos datos.
     * 
     * @param {Object} datosIniciales - Los datos con los que pre-poblar el formulario.
     * @returns {void}
     */
    useEffect(() => {
        if (datosIniciales) {
            setFormData({
                ...datosIniciales,
                estudio_id: datosIniciales.estudio?.id || null,
            });
        }
    }, [datosIniciales]);

    /**
     * Maneja los cambios en los campos del formulario.
     *
     * Esta función se ejecuta cuando el usuario cambia un campo del formulario y actualiza
     * el estado `formData` con el nuevo valor.
     * 
     * @param {Object} event - El evento de cambio del input.
     * @param {string} event.target.name - El nombre del campo del formulario.
     * @param {string} event.target.value - El nuevo valor del campo.
     * @returns {void}
     */
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    /**
     * Maneja el envío del formulario para crear o actualizar un reto.
     *
     * Dependiendo de si los `datosIniciales` están presentes o no, se ejecuta la función
     * `createItem` o `updateItem` del hook `useCrud`.
     * 
     * @async
     * @param {Object} event - El evento de envío del formulario.
     * @returns {void}
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const modo = datosIniciales ? "editar" : "crear";

        try {
            if (modo === "crear") {
                await createItem(formData);
            } else {
                await updateItem(formData.id, formData);
            }

            fetchItems();
            onGuardar(formData);
        } catch (error) {
            console.error("Error al guardar reto:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="container mt-4 p-4 border rounded shadow bg-light"
        >
            <h2 className="mb-4 text-center">Formulario de Reto</h2>

            {/* Input para el título */}
            <div className="mb-3">
                <label htmlFor="titulo" className="form-label">Título</label>
                <input
                    type="text"
                    className="form-control"
                    name="titulo"
                    id="titulo"
                    placeholder="Ingrese el título"
                    value={formData.titulo || ""}
                    required
                    onChange={handleChange}
                    disabled={isSubmitting}
                />
            </div>

            {/* Textarea para el texto */}
            <div className="mb-3">
                <label htmlFor="texto" className="form-label">Texto</label>
                <textarea
                    className="form-control"
                    name="texto"
                    id="texto"
                    placeholder="Ingrese el texto del reto"
                    value={formData.texto || ""}
                    required
                    onChange={handleChange}
                    style={{ height: "150px", resize: "vertical" }}
                    disabled={isSubmitting}
                />
            </div>

            {/* Select para el estudio */}
            <div className="mb-3">
                <label htmlFor="estudio_id" className="form-label">Estudio</label>
                <select
                    className="form-select"
                    name="estudio_id"
                    id="estudio_id"
                    value={formData.estudio_id || ""}
                    required
                    onChange={handleChange}
                    disabled={isSubmitting}
                >
                    <option value="" hidden>Seleccione un estudio</option>
                    {estudios.map((estudio) => (
                        <option key={estudio.value} value={estudio.value}>
                            {estudio.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Botones de acción */}
            <div className="d-flex justify-content-between">
                <button
                    type="submit"
                    className={`btn ${datosIniciales ? "btn-warning" : "btn-success"}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Guardando..." : datosIniciales ? "Guardar" : "Crear"}
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCancelar}
                    disabled={isSubmitting}
                >
                    Cancelar
                </button>
            </div>

            {/* Mostrar errores si hay */}
            {error && <p className="text-danger mt-3">{error}</p>}
        </form>
    );
}

export default FormularioRetos;
