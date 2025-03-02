import { useEffect, useState } from "react";
import api from "../../services/api";
import llamadas from "../../data/FuncionesCombobox";


const fetchEquipos = async () => {
    try {
        console.log("Cargando equipos desde la API...");
        const data = await llamadas().equipos();

        if (!data) return []; // Si hubo un error en la API, devolvemos un array vacío

        return Object.keys(data).map(key => ({
            value: key,
            label: data[key]
        }));

    } catch (error) {
        console.error("Error al obtener los equipos", error);
        return [];
    }
};



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


function FormularioJugadores({ datosIniciales, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({
        nombre_completo: "",
        equipo_id: "",
        estudio_id: "",
        capitan: false,
    });
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
            // Aseguramos que equipo_id y estudio_id se asignen correctamente
            setFormData({
                ...datosIniciales,
                equipo_id: datosIniciales.equipo_id || "", // Asignar equipo_id inicial
                estudio_id: datosIniciales.estudio_id || "", // Asignar estudio_id inicial
                capitan: datosIniciales.capitan || false, // Asignar capitan si existe
            });
        }
    }, [datosIniciales]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        // Si es un checkbox, usamos checked en lugar de value
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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="nombre_completo">Nombre Completo</label>
                <input
                    type="text"
                    name="nombre_completo"
                    id="nombre_completo"
                    placeholder="Ingrese su nombre completo"
                    value={formData.nombre_completo || ""}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="equipo_id">Equipo</label>
                <select
                    name="equipo_id"
                    id="equipo_id"
                    value={formData.equipo_id || ""}
                    onChange={handleChange}
                >
                    <option value="" hidden>Seleccione un equipo</option>
                    {equipos.map((equipo) => (
                        <option key={equipo.value} value={equipo.value}>
                            {equipo.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="estudio_id">Estudio</label>
                <select
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
