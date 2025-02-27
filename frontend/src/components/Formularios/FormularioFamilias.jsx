import { useState } from "react";
import { useCrud } from "../../hooks/useCrud";

function FormularioFamilias({ datosIniciales, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({ nombre: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { createItem, updateItem, fetchItems, error } = useCrud({ nombre: "Familias" });

    // Cargar los datos iniciales si existen
    useState(() => {
        if (datosIniciales) {
            setFormData({ nombre: datosIniciales.nombre || "" });
        }
    }, [datosIniciales]);

    // Manejo de cambios en los inputs
    const handleChange = (event) => {
        setFormData({ ...formData, nombre: event.target.value });
    };

    // Manejo del envío del formulario
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
            console.error("Error al guardar familia:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded shadow bg-light">
            <h2 className="mb-4 text-center">Formulario de Familia</h2>

            {/* Input para el nombre */}
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    id="nombre"
                    placeholder="Ingrese el nombre"
                    value={formData.nombre}
                    required
                    onChange={handleChange}
                    disabled={isSubmitting}
                />
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

export default FormularioFamilias;
