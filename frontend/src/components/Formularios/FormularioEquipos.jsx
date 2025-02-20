import { useEffect, useState } from "react";
import api from "../../services/api";

const fetchEquipos = async () => {
    try {
        const response = await api.get("/equipos");
        return response.data.estudios.map(equipo => ({
            value: equipo.id,
            label: equipo.nombre
        }));
    } catch (error) {
        console.error("Error al obtener los equipos", error);
        return [];
    }
};

function FormularioEquipos({ datosIniciales, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({});
    const [equipos, setEquipos] = useState([]);

    useEffect(() => {
        const obtenerEquipos = async () => {
            const data = await fetchEquipos();
            setEquipos(data);
        };
        obtenerEquipos();
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
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancelar}>Cancelar</button>
            </div>
        </form>
    );
}

export default FormularioEquipos;
