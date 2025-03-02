import { useEffect, useState } from "react";
import api from "../../services/api";
import llamadas from "../../data/FuncionesCombobox";

const fetchFamilias = async () => {
    try {
        // Si no hay datos en sessionStorage, los obtenemos de la API
        console.log("Cargando familias desde la API...");
        const data = await llamadas().familias();

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
    console.log(formData);
    return (
        <form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded shadow bg-light">
            <h2 className="mb-4 text-center">{datosIniciales!=null?'Editar Ciclo':'Crear ciclo'}</h2>
    
            {/* Nombre */}
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    id="nombre"
                    placeholder="Ingrese el nombre"
                    value={formData.nombre || ''}
                    onChange={handleChange}
                />
            </div>
    
            {/* Familia */}
            <div className="mb-3">
                <label htmlFor="familia_id" className="form-label">Familia</label>
                <select
                    className="form-select"
                    name="familia_id"
                    id="familia_id"
                    value={formData.familia_id?.id || ''}
                    onChange={handleChange}
                >
                    <option value="" hidden>Seleccione una familia</option>
                    {familias.map((familia) => (
                        <option key={familia.value} value={familia.value}>{familia.label}</option>
                    ))}
                </select>
            </div>
    
            {/* Botones */}
            <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-success">Guardar</button>
                <button type="button" className="btn btn-secondary" onClick={onCancelar}>Cancelar</button>
            </div>
        </form>
    );
    
}

export default FormularioCiclos;
