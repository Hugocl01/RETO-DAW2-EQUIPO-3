import { useEffect, useState } from "react";
import { useCrud } from "../../hooks/useCrud";

function FormularioCentros({ datosIniciales, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({
        nombre: "",
        landing_page: "",
    });
    const [errores, setErrores] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { createItem, updateItem, loading, error } = useCrud({ nombre: "Centros" });

    useEffect(() => {
        if (datosIniciales) {
            setFormData({
                id: datosIniciales.id,  // Guarda el ID dentro de formData
                nombre: datosIniciales.nombre || "",
                landing_page: datosIniciales.landing_page || "",
            });
        }
    }, [datosIniciales]);

    // Validación del formulario
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

    // Manejo de cambios en los campos del formulario
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    // Manejo del envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return; // Si hay errores, no continuar
        }

        setIsSubmitting(true);

        try {
            console.log(formData)
            if (datosIniciales) {
                await updateItem(formData.id, formData);
            } else {
                await createItem(formData);
            }
            onGuardar(formData);
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
