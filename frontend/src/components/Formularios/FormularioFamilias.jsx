import { useState } from "react";
import { useCrud } from "../../hooks/useCrud";

/**
 * Componente para crear o editar una familia. Permite ingresar un nombre de familia
 * y enviar el formulario para crear una nueva familia o actualizar una existente.
 *
 * @component
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} [props.datosIniciales] - Datos iniciales para la familia si se está editando (opcional).
 * @param {function} props.onGuardar - Función que se ejecuta cuando el formulario es enviado con éxito (por ejemplo, para actualizar la lista o redirigir).
 * @param {function} props.onCancelar - Función que se ejecuta cuando el usuario cancela la acción.
 * 
 * @returns {React.Element} El componente `FormularioFamilias` para crear o editar familias.
 */
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

    /**
     * Maneja los cambios en los campos del formulario. En este caso, el campo `nombre`.
     * 
     * @param {Object} event - El evento del input que disparó el cambio.
     */
    const handleChange = (event) => {
        setFormData({ ...formData, nombre: event.target.value });
    };

    /**
     * Maneja el envío del formulario. Crea o actualiza una familia dependiendo de si
     * existen datos iniciales. Al finalizar, actualiza la lista de familias y ejecuta 
     * la función `onGuardar`.
     * 
     * @param {Object} event - El evento de envío del formulario.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            if (datosIniciales) {
                // Actualizar familia existente
                await updateItem(datosIniciales.id, formData);
            } else {
                // Crear nueva familia
                await createItem(formData);
            }

            fetchItems(); // Recargar la lista de familias
            onGuardar(formData); // Llamar a la función de "guardar" proporcionada
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
