import { useEffect, useState } from "react";
import api from "../../services/api";

const fetchCentros = async () => {
    try {
        const response = await api.get("/centros");
        
        // Iteramos sobre las claves del objeto de centros para crear un array de opciones
        return Object.keys(response.data).map(key => ({
            value: key, // Usamos la clave como el ID
            label: response.data[key] // Usamos el valor como el nombre del centro
        }));
    } catch (error) {
        console.error("Error al obtener los centros", error);
        return [];
    }
};

const fetchCiclos = async () => {
    try {
        const response = await api.get("/ciclos");
        return response.data.estudios.map(ciclo => ({
            value: ciclo.id,
            label: ciclo.nombre
        }));
    } catch (error) {
        console.error("Error al obtener los ciclos", error);
        return [];
    }
};

function FormularioEstudios({ datosIniciales, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({});
    const [centros, setCentros] = useState([]);
    const [ciclos, setCiclos] = useState([]);

    useEffect(() => {
        const obtenerCentros = async () => {
            const data = await fetchCentros();
            setCentros(data);
        };
        obtenerCentros();

        const obtenerCiclos = async () => {
            const data = await fetchCiclos();
            setCiclos(data);
        };
        obtenerCiclos();
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
                <label htmlFor="centro_id">Centro</label>
                <select
                    name="centro_id"
                    id="centro_id"
                    value={formData.centro_id || ''}
                    onChange={handleChange}
                >
                    <option value="" hidden>Seleccione un centro</option>
                    {centros.map((centro) => (
                        <option key={centro.value} value={centro.value}>{centro.label}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="ciclo_id">Ciclo</label>
                <select
                    name="ciclo_id"
                    id="ciclo_id"
                    value={formData.ciclo_id || ''}
                    onChange={handleChange}
                >
                    <option value="" hidden>Seleccione un ciclo</option>
                    {ciclos.map((ciclo) => (
                        <option key={ciclo.value} value={ciclo.value}>{ciclo.label}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="curso_id">Curso</label>
                <input
                    type="number"
                    name="curso_id"
                    id="curso_id"
                    placeholder="1"
                    value={formData.curso_id || ''}
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

export default FormularioEstudios;
