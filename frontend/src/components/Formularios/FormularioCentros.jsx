import { useEffect, useState } from "react";
import { useCrud } from "../../hooks/useCrud";

function FormularioCentros({ datosIniciales, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({});
    const [errores, setErrores] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false); // Para manejar el estado de envío
    const { createItem, updateItem, loading, error } = useCrud({ nombre: "Centros" });

    useEffect(() => {
        if (datosIniciales) {
            setFormData(datosIniciales); // Si estamos en edición, cargamos los datos iniciales
        }
    }, [datosIniciales]);

    // Función para validar el formulario
    const validateForm = () => {
        let errors = {};
        if (!formData.nombre) {
            errors.nombre = "El nombre es obligatorio";
        }
        if (!formData.landing_page) {
            errors.landing_page = "La página web es obligatoria";
        }
        // Validación simple para comprobar si la URL es válida
        if (formData.landing_page && !/^https?:\/\/[^\s]+$/.test(formData.landing_page)) {
            errors.landing_page = "La URL debe ser válida (ej. http://example.com)";
        }
        setErrores(errors);
        return Object.keys(errors).length === 0;
    };

    // Función para manejar los cambios en los campos del formulario
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // Manejo del envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        // Validar el formulario antes de proceder
        if (validateForm()) {
            if (datosIniciales) {
                // Modo edición: Usamos updateItem para actualizar el centro existente
                await updateItem(formData); // Asegúrate de que `updateItem` esté correctamente implementado
            } else {
                // Modo creación: Usamos createItem para crear un nuevo centro
                await createItem(formData); // Asegúrate de que `createItem` esté correctamente implementado
            }
        } else {
            setIsSubmitting(false); // Solo volvemos a habilitar el formulario si hay errores
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded shadow bg-light">
            <h2 className="mb-4 text-center">{datosIniciales ? "Editar Centro" : "Crear Centro"}</h2>

            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    placeholder="Ingrese el nombre del centro"
                    value={formData.nombre || ''}
                    onChange={handleChange}
                    className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                    disabled={isSubmitting}
                />
                {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="landing_page" className="form-label">Página web</label>
                <input
                    type="text"
                    name="landing_page"
                    id="landing_page"
                    placeholder="Ingrese la página web"
                    value={formData.landing_page || ''}
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

            {/* Mostrar errores generales si existen */}
            {Object.keys(errores).length > 0 && (
                <div className="alert alert-danger mt-3">
                    <ul>
                        {Object.values(errores).map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Mostrar estado de error */}
            {error && <div className="alert alert-danger">{error}</div>}
        </form>
    );
}

export default FormularioCentros;
