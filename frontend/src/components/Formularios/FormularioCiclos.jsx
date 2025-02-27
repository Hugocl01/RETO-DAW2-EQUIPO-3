import { useEffect, useState } from "react";
import api from "../../services/api";
import { cargarFamilias } from "../../data/FuncionesCombobox";

const fetchFamilias = async () => {
    try {
        // Verifica si los datos ya están en sessionStorage
        const storedData = sessionStorage.getItem("familias");

        if (storedData) {
            console.log("Cargando familias desde sessionStorage");
            const data = JSON.parse(storedData);

            return Object.keys(data).map(key => ({
                value: key,
                label: data[key]
            }));
        }

        // Si no hay datos en sessionStorage, los obtenemos de la API
        console.log("Cargando familias desde la API...");
        const data = await cargarFamilias();

        if (!data) return []; // Si hubo un error en la API, devolvemos un array vacío

        return Object.keys(data).map(key => ({
            value: key,
            label: data[key]
        }));

    } catch (error) {
        console.error("Error al obtener los familias", error);
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
