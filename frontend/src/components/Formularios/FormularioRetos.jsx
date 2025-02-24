import { useEffect, useState } from "react";

function FormularioRetos({ datosIniciales, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({
        titulo: "",
        texto: "",
        estudio_id: null // Usamos null en lugar de cadena vacía
    });
    const [estudios, setEstudios] = useState([]);

    useEffect(() => {
        const obtenerEstudios = async () => {
            const data = JSON.parse(sessionStorage.getItem("estudios")) || {}; // Recuperamos los datos como objeto
            console.log('Estudios recogidos:', data);
            
            // Convertimos el objeto a un array
            const estudiosFormat = Object.entries(data).map(([id, nombre]) => ({
                value: id,   // Usamos el ID como valor
                label: nombre // Usamos el nombre como label
            }));
            
            // Establecemos los estudios en el estado
            setEstudios(estudiosFormat);
        };
    
        obtenerEstudios();
    }, []);                

    useEffect(() => {
        if (datosIniciales) {
            setFormData({
                ...datosIniciales,
                estudio_id: datosIniciales.estudio?.id || null // Aseguramos que el id del estudio inicial se cargue correctamente
            });
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
                <label htmlFor="titulo">Título</label>
                <input
                    type="text"
                    name="titulo"
                    id="titulo"
                    placeholder="Ingrese el título"
                    value={formData.titulo || ''}
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
                    value={formData.estudio_id || ''}
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
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancelar}>Cancelar</button>
            </div>
        </form>
    );
}

export default FormularioRetos;
