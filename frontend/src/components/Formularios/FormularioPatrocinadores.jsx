import { useState } from "react";
import { useCrud } from "../../hooks/useCrud";

function FormularioPatrocinadores({ datosIniciales, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({
        nombre: "",
        landing_page: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { createItem, updateItem, fetchItems, error } = useCrud({ nombre: "Patrocinadores" });

    useState(() => {
        if (datosIniciales) {
            setFormData(datosIniciales);
        }
    }, [datosIniciales]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

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
