import { useEffect, useState } from "react";
import api from "../../services/api";
import llamadas from "../../data/FuncionesCombobox";

const fetchEquipos = async () => {
    try {
        const response = await llamadas().equipos();
        console.log(equipos);
        return response.data.map((equipo, index) => ({
            value: index,
            label: equipo
        }));
    } catch (error) {
        console.error("Error al obtener los equipos", error);
        return [];
    }
};

function FormularioEquipos({ datosIniciales, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({
        nombre: "",
        equipo: ""
    });
    const [equipos, setEquipos] = useState([]);
    console.log(datosIniciales)
    useEffect(() => {
        const obtenerEquipos = async () => {
            const data = await fetchEquipos();
            setEquipos(data);
        };
        obtenerEquipos();
    }, []);

    useEffect(() => {
        if (datosIniciales) {
            console.log("Datos Iniciales recibidos:", datosIniciales); // 🔍 Debug
            setFormData(datosIniciales);
        }
    }, [datosIniciales]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Formulario enviado con:", formData);
        onGuardar(formData);
    };
    useEffect(() => {
        if (datosIniciales) {
            setFormData({ ...datosIniciales }); // 🔥 Clonar el objeto puede evitar problemas de referencia
        }
    }, [datosIniciales]);

    console.log("Estado actual del formulario:", formData);

    return (
        <form onSubmit={handleSubmit}>
            {console.log(formData.nombre)}
            <div>
                <label htmlFor="nombre_completo">Nombre</label>
                <input
                    type="text"
                    name="nombre_completo"
                    id="nombre_completo"
                    placeholder="Ingrese su nombre completo"
                    value={formData?.nombre ?? ""}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="equipo_id">Equipo</label>
                <select
                    name="equipo_id"
                    id="equipo_id"
                    value={formData?.equipo ?? ""}
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
