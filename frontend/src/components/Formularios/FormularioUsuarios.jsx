import { useEffect, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import { cargarPerfiles } from "../../data/FuncionesCombobox";

const fetchTiposPerfil = async () => {
    try {
        const storedData = sessionStorage.getItem("perfiles");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            return Object.keys(parsedData).map(key => ({
                value: key,
                label: parsedData[key],
            }));
        }

        const data = await cargarPerfiles();
        if (!data) {
            return [];
        }

        sessionStorage.setItem("perfiles", JSON.stringify(data));
        return Object.keys(data).map(key => ({
            value: key,
            label: data[key],
        }));
    } catch (error) {
        console.error("Error al obtener los perfiles", error);
        return [];
    }
};

function FormularioUsuarios({ datosIniciales, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({
        nombre_completo: "",
        email: "",
        password: "",
        perfil_id: "",
    });

    const [tiposPerfil, setTiposPerfil] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { createItem, updateItem, fetchItems, loading, error } = useCrud({ nombre: "Usuarios" });

    // Use useEffect solo para cargar perfiles una vez
    useEffect(() => {
        const obtenerTiposPerfil = async () => {
            const data = await fetchTiposPerfil();
            setTiposPerfil(data);
        };

        if (tiposPerfil.length === 0) { // Solo carga si no hay datos en tiposPerfil
            obtenerTiposPerfil();
        }
    }, [tiposPerfil]); // Solo se ejecuta si tiposPerfil está vacío

    // UseEffect para establecer datos iniciales en el formulario solo si cambian
    useEffect(() => {
        if (datosIniciales) {
            setFormData((prevData) => ({
                nombre_completo: datosIniciales.nombre || datosIniciales.nombre_completo || "",
                email: datosIniciales.email || "",
                password: "",
                perfil_id: datosIniciales.perfil?.id || "",
            }));
        }
    }, [datosIniciales]); // Solo se ejecuta cuando datosIniciales cambian

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        if (!formData.nombre_completo.trim() || !formData.email.trim() || !formData.perfil_id) {
            alert("El nombre completo, email y perfil son obligatorios.");
            setIsSubmitting(false);
            return;
        }

        const datosParaEnviar = { ...formData };
        if (!datosParaEnviar.password) {
            delete datosParaEnviar.password;
        }

        try {
            if (datosIniciales) {
                // Si se trata de una actualización, debes pasar el ID en la URL
                console.log("Actualizando usuario:", datosParaEnviar);
                if (datosIniciales.id) {
                    await updateItem(datosIniciales.id, datosParaEnviar); // Pasa solo el ID en la URL
                    console.log("Usuario actualizado con éxito.");
                } else {
                    console.error("ID no encontrado para la actualización.");
                }
            } else {
                // Si es un nuevo usuario, mandamos los datos para crear
                console.log("Creando nuevo usuario:", datosParaEnviar);
                await createItem(datosParaEnviar);
                console.log("Usuario creado con éxito.");
            }
        } catch (error) {
            console.error("Error al guardar usuario:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded shadow bg-light">
            <h2 className="mb-4 text-center">{datosIniciales ? "Editar Usuario" : "Crear Usuario"}</h2>

            <div className="mb-3">
                <label htmlFor="nombre_completo" className="form-label">Nombre Completo</label>
                <input
                    type="text"
                    className="form-control"
                    name="nombre_completo"
                    id="nombre_completo"
                    placeholder="Ingrese el nombre completo"
                    value={formData.nombre_completo}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Ingrese el email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    placeholder="Ingrese la contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isSubmitting}
                />
                <small className="form-text text-muted">Déjelo en blanco para no cambiar la contraseña.</small>
            </div>

            <div className="mb-3">
                <label htmlFor="perfil_id" className="form-label">Tipo de Perfil</label>
                <select
                    className="form-select"
                    name="perfil_id"
                    id="perfil_id"
                    value={formData.perfil_id || ''}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                >
                    <option value="" hidden>Seleccione un perfil</option>
                    {tiposPerfil.map((tipo) => (
                        <option key={tipo.value} value={tipo.value}>
                            {tipo.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                    {isSubmitting ? "Guardando..." : datosIniciales ? "Guardar" : "Crear"}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancelar} disabled={isSubmitting}>
                    Cancelar
                </button>
            </div>
        </form>
    );
}

export default FormularioUsuarios;
