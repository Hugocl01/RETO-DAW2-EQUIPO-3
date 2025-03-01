import { useEffect, useState } from "react";
import api from "../../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import { cargarPerfiles } from "../../data/FuncionesCombobox";

const fetchTiposPerfil = async () => {
    try {
        // Verifica si los datos ya están en sessionStorage
        const storedData = sessionStorage.getItem("perfiles");

        if (storedData) {
            console.log("Cargando perfiles desde sessionStorage");
            const data = JSON.parse(storedData);

            return Object.keys(data).map(key => ({
                value: key, // ID del perfil
                label: data[key] // Nombre del perfil
            }));
        }

        // Si no hay datos en sessionStorage, los obtenemos de la API
        console.log("Cargando perfiles desde la API...");
        const data = await cargarPerfiles();

        if (!data) return []; // Si hubo un error en la API, devolvemos un array vacío

        return Object.keys(data).map(key => ({
            value: key, // ID del perfil
            label: data[key] // Nombre del perfil
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
        password: "",
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
            console.log("Datos iniciales:", datosIniciales);
            setFormData({
                nombre: datosIniciales.nombre || "",
                email: datosIniciales.email || "",
                password: "", // No cargar contraseñas por seguridad
                activo: datosIniciales.activo === 1,
                perfil_id: datosIniciales.perfil?.id || "",
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
        onGuardar(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded shadow bg-light">
            <h2 className="mb-4 text-center">Formulario de Usuario</h2>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    id="nombre"
                    placeholder="Ingrese el nombre"
                    value={formData.nombre}
                    onChange={handleChange}
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
                />
            </div>
            <div className="mb-3">
                <label htmlFor="perfil_id" className="form-label">Tipo de Perfil</label>
                <select
                    className="form-select"
                    name="perfil_id"
                    id="perfil_id"
                    value={formData.perfil_id || ''}
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
            <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-success">Guardar</button>
                <button type="button" className="btn btn-secondary" onClick={onCancelar}>Cancelar</button>
            </div>
        </form>
    );
}

export default FormularioUsuarios;
