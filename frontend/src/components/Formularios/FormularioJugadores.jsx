import { useEffect, useState } from "react";
import api from "../../services/api";

const fetchEquipos = async () => {
    try {
        const response = await api.get("/equipos");
        
        // Iteramos sobre las claves del objeto de equipos para crear un array de opciones
        return Object.keys(response.data).map(key => ({
            value: key, // Usamos la clave como el ID
            label: response.data[key] // Usamos el valor como el nombre del equipo
        }));
    } catch (error) {
        console.error("Error al obtener los equipos", error);
        return [];
    }
};

const fetchEstudios = async () => {
    try {
        const response = await api.get("/lista/estudios");
        
        // Iteramos sobre las claves del objeto de estudios para crear un array de opciones
        return Object.keys(response.data).map(key => ({
            value: key, // Usamos la clave como el ID
            label: response.data[key] // Usamos el valor como el nombre del estudio
        }));
    } catch (error) {
        console.error("Error al obtener los estudios", error);
        return [];
    }
};

function FormularioJugadores({ datosIniciales, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({});
    const [equipos, setEquipos] = useState([]);
    const [estudios, setEstudios] = useState([]);

    useEffect(() => {
        const obtenerEquipos = async () => {
            const data = await fetchEquipos();
            setEquipos(data);
        };
        obtenerEquipos();

        const obtenerEstudios = async () => {
            const data = await fetchEstudios();
            setEstudios(data);
        };
        obtenerEstudios();
    }, []);

    useEffect(() => {
        if (datosIniciales) {
            setFormData(datosIniciales);
        }
    }, [datosIniciales]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onGuardar(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="nombre_completo">Nombre Completo</label>
                <input
                    type="text"
                    name="nombre_completo"
                    id="nombre_completo"
                    placeholder="Ingrese su nombre completo"
                    value={formData.nombre_completo || ''}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="equipo_id">Equipo</label>
                <select
                    name="equipo_id"
                    id="equipo_id"
                    value={formData.equipo_id || ''}
                    onChange={handleChange}
                >
                    <option value="" hidden>Seleccione un equipo</option>
                    {equipos.map((equipo) => (
                        <option key={equipo.value} value={equipo.value}>{equipo.label}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="estudio_id">Estudio</label>
                <select
                    name="estudio_id"
                    id="estudio_id"
                    value={formData.estudio_id || ''}
                    onChange={handleChange}
                >
                    <option value="" hidden>Seleccione un estudio</option>
                    {estudios.map((estudio) => (
                        <option key={estudio.value} value={estudio.value}>{estudio.label}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="capitan">Capitan</label>
                <input
                    type="checkbox"
                    name="capitan"
                    id="capitan"
                    checked={formData.capitan || false}
                    onChange={handleChange}
                />
            </div>
            <div>
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancelar}>Cancelar</button>
            </div>
        </form>
    );
}

export default FormularioJugadores;
