import { useEffect, useState } from "react";
import api from "../../services/api";

const fetchFamilias = async () => {
    try {
        const response = await api.get("/familias");
        
        // Iteramos sobre las claves del objeto de familias para crear un array de opciones
        return Object.keys(response.data).map(key => ({
            value: key, // Usamos la clave como el ID
            label: response.data[key] // Usamos el valor como el nombre de la familia
        }));
    } catch (error) {
        console.error("Error al obtener las familias", error);
        return [];
    }
};

function FormularioCiclos({ datosIniciales, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({});
    const [errores, setErrores] = useState({});
    const [familias, setFamilias] = useState([]);

    useEffect(() => {
        const obtenerFamilias = async () => {
            const data = await fetchFamilias();
            setFamilias(data);
        };
        obtenerFamilias();
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
        // Validar antes de guardar
        onGuardar(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    placeholder="Ingrese el nombre"
                    value={formData.nombre || ''}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="familia_id">Familia</label>
                <select
                    name="familia_id"
                    id="familia_id"
                    value={formData.familia_id || ''}
                    onChange={handleChange}
                >
                    <option value="" hidden>Seleccione una familia</option>
                    {familias.map((familia) => (
                        <option key={familia.value} value={familia.value}>{familia.label}</option>
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

export default FormularioCiclos;
