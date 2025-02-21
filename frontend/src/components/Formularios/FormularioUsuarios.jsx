import { useEffect, useState } from "react";
import api from "../../services/api";

const fetchTiposPerfil = async () => {
    try {
        const response = await api.get("/tipos/perfil");
        return response.data.map(tipo => ({
            value: tipo.id,
            label: tipo.tipo
        }));
    } catch (error) {
        console.error("Error al obtener los tipos de perfil", error);
        return [];
    }
};

function FormularioUsuarios({ datosIniciales, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        activo: false,
        perfil_id: "",
    });
    const [tiposPerfil, setTiposPerfil] = useState([]);

    useEffect(() => {
        const obtenerTiposPerfil = async () => {
            const data = await fetchTiposPerfil();
            setTiposPerfil(data);
        };
        obtenerTiposPerfil();
    }, []);

    useEffect(() => {
        if (datosIniciales) {
            console.log("Datos iniciales:", datosIniciales); // Verificar datosIniciales aquí
            setFormData({
                nombre: datosIniciales.nombre || "",
                email: datosIniciales.email || "",
                activo: datosIniciales.activo === 1, // Convertimos el valor de 'activo' en un booleano
                perfil_id: datosIniciales.perfil.id || "", // Asignar el id del perfil inicial
            });
        }
    }, [datosIniciales]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onGuardar(formData); // Enviar los datos al guardar
    };

    console.log("FormData actual:", formData);  // Verifica el valor actual de formData

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    placeholder="Ingrese el nombre"
                    value={formData.nombre || ''}  // Asegúrate que 'nombre' esté bien asignado
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Ingrese el email"
                    value={formData.email || ''}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="activo">Activo</label>
                <input
                    type="checkbox"
                    name="activo"
                    id="activo"
                    checked={formData.activo || false}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="perfil_id">Tipo de Perfil</label>
                <select
                    name="perfil_id"
                    id="perfil_id"
                    value={formData.perfil_id || ""}
                    onChange={handleChange}
                >
                    <option value="" hidden>Seleccione un perfil</option>
                    {tiposPerfil.map((tipo) => (
                        <option key={tipo.value} value={tipo.value}>
                            {tipo.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancelar}>Cancelar</button>
            </div>
        </form>
    );
}

export default FormularioUsuarios;
