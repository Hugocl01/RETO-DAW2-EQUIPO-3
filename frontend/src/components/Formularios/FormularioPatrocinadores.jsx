import { useState } from "react";
import { useCrud } from "../../hooks/useCrud";

/**
 * Componente de formulario para crear o editar patrocinadores.
 *
 * Permite al usuario ingresar los detalles de un patrocinador, como el nombre y la URL de la landing page.
 * Puede ser usado tanto para crear un nuevo patrocinador como para editar uno existente, dependiendo de si se pasa un objeto `datosIniciales`.
 *
 * @component
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Object} [props.datosIniciales] - Datos iniciales del patrocinador, si está editando un patrocinador.
 * @param {Function} props.onGuardar - Función que se llama cuando se guarda el patrocinador.
 * @param {Function} props.onCancelar - Función que se llama cuando se cancela la acción.
 */
function FormularioPatrocinadores({ datosIniciales, onGuardar, onCancelar }) {
    /**
     * Estado local para almacenar los datos del formulario.
     * @type {Object}
     * @property {string} nombre - Nombre del patrocinador.
     * @property {string} landing_page - URL de la landing page del patrocinador.
     */
    const [formData, setFormData] = useState({
        nombre: "",
        landing_page: "",
    });

    /**
     * Estado para manejar el estado de envío del formulario (si se está enviando).
     * @type {boolean}
     * @default false
     */
    const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * Hook para gestionar las operaciones CRUD.
     * @type {Object}
     * @property {Function} createItem - Función para crear un nuevo patrocinador.
     * @property {Function} updateItem - Función para actualizar un patrocinador existente.
     * @property {Function} fetchItems - Función para obtener los patrocinadores.
     * @property {string|null} error - Mensaje de error si ocurre un problema.
     */
    const { createItem, updateItem, fetchItems, error } = useCrud({ nombre: "Patrocinadores" });

    /**
     * Hook que se ejecuta cuando los datos iniciales cambian, para actualizar el formulario.
     * @param {Object} datosIniciales - Datos del patrocinador si está editando uno.
     */
    useState(() => {
        if (datosIniciales) {
            setFormData(datosIniciales);
        }
    }, [datosIniciales]);

    /**
     * Maneja los cambios en los campos del formulario.
     * 
     * @param {Event} event - El evento de cambio en el campo del formulario.
     */
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    /**
     * Maneja el envío del formulario, ya sea para crear o actualizar un patrocinador.
     * 
     * @param {Event} event - El evento de envío del formulario.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            if (datosIniciales) {
                await updateItem(formData.id, formData);
            } else {
                await createItem(formData);
            }

            fetchItems();
            onGuardar(formData);
        } catch (error) {
            console.error("Error al guardar patrocinador:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="container mt-4 p-4 border rounded shadow bg-light"
        >
            <h2 className="mb-4 text-center">Formulario de Patrocinador</h2>

            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    id="nombre"
                    placeholder="Ingrese el nombre"
                    value={formData.nombre || ""}
                    required
                    onChange={handleChange}
                    disabled={isSubmitting}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="landing_page" className="form-label">Landing Page</label>
                <input
                    type="url"
                    className="form-control"
                    name="landing_page"
                    id="landing_page"
                    placeholder="Ingrese la URL"
                    value={formData.landing_page || ""}
                    required
                    onChange={handleChange}
                    disabled={isSubmitting}
                />
            </div>

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

            {error && <p className="text-danger mt-3">{error}</p>}
        </form>
    );
}

export default FormularioPatrocinadores;
