import api from "../services/api";

const fetchEstudios = async () => {
    try {
        const response = await api.get("/estudios");
        return response.data.estudios.map(estudio => ({
            value: estudio.id,
            label: `${estudio.ciclo} - ${estudio.centro} (Curso ${estudio.curso})`
        }));
    } catch (error) {
        console.error("Error al obtener los estudios", error);
        return [];
    }
};

const camposRetosFormulario = [
    {
        name: 'titulo',
        label: 'Titulo',
        type: 'text',
        placeholder: 'Ingrese el titulo'
    },
    {
        name: 'texto',
        label: 'Texto',
        type: 'textarea',
        placeholder: 'Ingrese el texto del reto'
    },
    {
        name: 'estudio_id',
        label: 'Estudio',
        type: 'select',
        options: await fetchEstudios()
    }
];

export default camposRetosFormulario;
