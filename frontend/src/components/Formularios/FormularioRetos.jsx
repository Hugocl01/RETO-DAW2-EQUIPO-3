import { useState, useEffect } from "react";
import { useCrud } from "../../hooks/useCrud"; // Asegúrate de importar correctamente el hook

function FormularioRetos({ datosIniciales, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({
        titulo: "",
        texto: "",
        estudio_id: null,
    });
    const [estudios, setEstudios] = useState([]);
    const { createItem, updateItem, fetchItems, loading, error } = useCrud({ nombre: "Retos" });

    // Cargar los estudios desde sessionStorage
    useEffect(() => {
        const obtenerEstudios = async () => {
            const data = JSON.parse(sessionStorage.getItem("estudios")) || {}; // Recuperamos los datos como objeto
            console.log("Estudios recogidos:", data);

            // Convertimos el objeto a un array
            const estudiosFormat = Object.entries(data).map(([id, nombre]) => ({
                value: id, // Usamos el ID como valor
                label: nombre, // Usamos el nombre como label
            }));

            // Establecemos los estudios en el estado
            setEstudios(estudiosFormat);
        };

        obtenerEstudios();
    }, []);

    // Cargar los datos iniciales si existen
    useEffect(() => {
        if (datosIniciales) {
            setFormData({
                ...datosIniciales,
                estudio_id: datosIniciales.estudio?.id || null, // Aseguramos que el id del estudio inicial se cargue correctamente
            });
        }
    }, [datosIniciales]);

    // Función para manejar los cambios en los inputs
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // Función para manejar el submit del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        const modo = datosIniciales ? "editar" : "crear"; // Determinamos el modo según si tenemos datos iniciales

        try {
            if (modo === "crear") {
                await createItem(formData); // Creamos un nuevo reto
            } else {
                await updateItem(formData.id, formData); // Actualizamos el reto
            }

            // Recargar los elementos después de guardar
            fetchItems(); // Esto recargará la lista de retos después de crear/actualizar el reto

            // Llamar al callback `onGuardar` con los datos del formulario para notificar al componente principal
            onGuardar(formData);
        } catch (error) {
            console.error("Error al guardar reto:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded shadow bg-light">
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    style={{ height: "150px", resize: "vertical" }} // Ajuste de altura con redimensionamiento
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
                    onChange={handleChange}
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
                <button type="submit" className={`btn ${datosIniciales ? "btn-warning" : "btn-success"}`}>
                    {datosIniciales ? "Guardar" : "Crear"}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancelar}>Cancelar</button>
            </div>
        </form>
    );
}

export default FormularioRetos;
