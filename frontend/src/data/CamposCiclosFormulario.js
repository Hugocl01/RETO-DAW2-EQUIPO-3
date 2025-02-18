import api from "../services/api";

const fetchFamilias = async () => {
    try {
        const response = await api.get("/familias");
        return response.data.estudios.map(familia => ({
            value: familia.id,
            label: familia.nombre
        }));
    } catch (error) {
        console.error("Error al obtener los familias", error);
        return [];
    }
};

const campoCiclosFormulario = [
    {
        name: 'nombre',
        label: 'Nombre',
        type: 'text',
        placeholder: 'Ingrese el nombre'
    },
    {
        name: 'familia_id',
        label: 'Familia',
        type: 'select',
        options: fetchFamilias()
    }
];

export default campoCiclosFormulario;