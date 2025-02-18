import api from "../services/api";

const fetchCentros = async () => {
    try {
        const response = await api.get("/centros");
        return response.data.estudios.map(centro => ({
            value: centro.id,
            label: centro.nombre
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

const campoEstudiosFormulario = [
    {
        name: 'centro_id',
        label: 'Centro',
        type: 'select',
        options: fetchCentros()
    },
    {
        name: 'ciclo_id',
        label: 'Ciclo',
        type: 'select',
        options: fetchCiclos()
    },
    {
        name: 'curso_id',
        label: 'Curso',
        type: 'number',
        placeholder: '1'
    }
];

export default campoEstudiosFormulario;