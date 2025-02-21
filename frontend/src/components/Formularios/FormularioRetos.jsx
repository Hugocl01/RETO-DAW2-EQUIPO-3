import { useEffect, useState } from "react";
import api from "../../services/api";

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

function FormularioRetos({ datosIniciales, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({
        título: "",
        texto: ""
    });
    const [estudios, setEstudios] = useState([]);

    useEffect(() => {
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
                <label htmlFor="titulo">Titulo</label>
                <input
                    type="text"
                    name="titulo"
                    id="titulo"
                    placeholder="Ingrese el título"
                    value={formData.título || ''}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="texto">Texto</label>
                <textarea
                    name="texto"
                    id="texto"
                    placeholder="Ingrese el texto del reto"
                    value={formData.texto || ''}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="estudio_id">Estudio</label>
                <select
                    name="estudio_id"
                    id="estudio_id"
                    value={formData.estudio.id || ''}
                    onChange={handleChange}
                >
                    <option value="" hidden>Seleccione un estudio</option>
                    {estudios.map((estudio) => (
                        <option key={estudio.value} value={estudio.value}>{estudio.label}</option>
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

export default FormularioRetos;
