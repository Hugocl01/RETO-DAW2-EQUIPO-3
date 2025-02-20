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

function FormularioCentros({ datosIniciales, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({});
    const [errores, setErrores] = useState({});
    const [centros, setCentros] = useState([]);

    useEffect(() => {
        const obtenerCentros = async () => {
            const data = await fetchCentros();
            setCentros(data);
        };
        obtenerCentros();
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
                    placeholder="Ingrese su nombre"
                    value={formData.nombre || ''}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="landing_page">Página web</label>
                <input
                    type="text"
                    name="landing_page"
                    id="landing_page"
                    placeholder="Ingrese la página web"
                    value={formData.landing_page || ''}
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

export default FormularioCentros;
