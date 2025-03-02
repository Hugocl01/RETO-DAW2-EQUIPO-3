import { useState, useEffect } from "react";
import { useCrud } from "../../hooks/useCrud";
import llamadas from "../../data/FuncionesCombobox";

const fetchEstudios = async () => {
    try {
        // Si no hay datos en sessionStorage, los obtenemos de la API
        console.log("Cargando estudios desde la API...");
        const data = await llamadas().estudios();

        if (!data) return []; // Si hubo un error en la API, devolvemos un array vacío

        return Object.keys(data).map(key => ({
            value: key,
            label: data[key]
        }));

    } catch (error) {
        console.error("Error al obtener los estudios", error);
        return [];
    }
};
function FormularioRetos({ datosIniciales, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({
        titulo: "",
        texto: "",
        estudio_id: null,
    });
    const [estudios, setEstudios] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado local para controlar el envío
    const { createItem, updateItem, fetchItems, loading, error } = useCrud({ nombre: "Retos" });

    // Cargar los estudios desde sessionStorage
    useEffect(() => {
        const obtenerEstudios = async () => {
            const data = await fetchEstudios();
            setEstudios(data);
        };
        obtenerEstudios();
    }, []);

    // Cargar los datos iniciales si existen
    useEffect(() => {
        if (datosIniciales) {
            setFormData({
                ...datosIniciales,
                estudio_id: datosIniciales.estudio?.id || null,
            });
        }
    }, [datosIniciales]);

    // Manejo de cambios en los inputs
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // Manejo del envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true); // Activamos el estado de envío para deshabilitar el botón

        const modo = datosIniciales ? "editar" : "crear";

        try {
            if (modo === "crear") {
                await createItem(formData);
            } else {
                await updateItem(formData.id, formData);
            }

            fetchItems(); // Recargar la lista de retos
            onGuardar(formData);
        } catch (error) {
            console.error("Error al guardar reto:", error);
        } finally {
            setIsSubmitting(false); // Volver a habilitar el formulario tras la operación
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
                    disabled={isSubmitting} // Solo deshabilitado cuando se está enviando
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
                    disabled={isSubmitting} // Solo deshabilita el botón cuando se está enviando
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
