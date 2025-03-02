import { useEffect, useState } from "react";
import { useCrud } from "../../hooks/useCrud";

/**
 * Componente que muestra un formulario para crear o editar un centro. Incluye validación de los campos
 * y maneja el envío del formulario tanto para crear como para actualizar un centro.
 * 
 * @component
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} [props.datosIniciales] - Datos iniciales para editar un centro. Si no se proporciona, el formulario será para crear un nuevo centro.
 * @param {function} props.onGuardar - Función que se llama después de guardar los datos (crear o actualizar) de un centro.
 * @param {function} props.onCancelar - Función que se llama cuando el usuario cancela la acción.
 * 
 * @returns {React.Element} El formulario para crear o editar un centro.
 */
function FormularioCentros({ datosIniciales, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({
        nombre: "",
        landing_page: "",
    });
    const [errores, setErrores] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { createItem, updateItem, loading, error } = useCrud({ nombre: "Centros" });

    /**
     * Efecto para cargar los datos iniciales del centro cuando se pasa como prop.
     * 
     * @param {Object} datosIniciales - Datos de un centro existente para editar.
     */
    useEffect(() => {
        if (datosIniciales) {
            setFormData({
                id: datosIniciales.id,  // Guarda el ID dentro de formData
                nombre: datosIniciales.nombre || "",
                landing_page: datosIniciales.landing_page || "",
            });
        }
    }, [datosIniciales]);

    /**
     * Valida el formulario para asegurarse de que los campos no estén vacíos y que la URL sea válida.
     * 
     * @returns {boolean} - Retorna true si el formulario es válido, false si hay errores.
     */
    const validateForm = () => {
        let errors = {};
        if (!formData.nombre.trim()) {
            errors.nombre = "El nombre es obligatorio";
        }
        if (!formData.landing_page.trim()) {
            errors.landing_page = "La página web es obligatoria";
        } else if (!/^https?:\/\/[^\s]+$/.test(formData.landing_page)) {
            errors.landing_page = "La URL debe ser válida (ej. http://example.com)";
        }
        setErrores(errors);
        return Object.keys(errors).length === 0;
    };

    /**
     * Maneja el cambio en los campos del formulario (nombre, landing_page).
     * 
     * @param {Object} event - El evento de cambio del campo.
     */
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    /**
     * Maneja el envío del formulario. Si es válido, realiza la creación o actualización del centro.
     * 
     * @param {Object} event - El evento de envío del formulario.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return; // Si hay errores, no continuar
        }

        setIsSubmitting(true);

        try {
            if (datosIniciales) {
                // Actualiza el centro si se pasan datos iniciales
                await updateItem(formData.id, formData);
            } else {
                // Crea un nuevo centro si no se pasan datos iniciales
                await createItem(formData);
            }
            onGuardar(formData); // Llama la función de callback onGuardar
        } catch (error) {
            console.error("Error al guardar:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded shadow bg-light">
            <h2 className="mb-4 text-center">{datosIniciales ? "Editar Centro" : "Crear Centro"}</h2>

            {/* Campo Nombre */}
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    placeholder="Ingrese el nombre del centro"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                    disabled={isSubmitting}
                />
                {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
            </div>

            {/* Campo Página Web */}
            <div className="mb-3">
                <label htmlFor="landing_page" className="form-label">Página web</label>
                <input
                    type="text"
                    name="landing_page"
                    id="landing_page"
                    placeholder="Ingrese la página web"
                    value={formData.landing_page}
                    onChange={handleChange}
                    className={`form-control ${errores.landing_page ? 'is-invalid' : ''}`}
                    disabled={isSubmitting}
                />
                {errores.landing_page && <div className="invalid-feedback">{errores.landing_page}</div>}
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

            {/* Errores generales */}
            {Object.keys(errores).length > 0 && (
                <div className="alert alert-danger mt-3">
                    <ul>
                        {Object.values(errores).map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Error de API */}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </form>
    );
}

export default FormularioCentros;
