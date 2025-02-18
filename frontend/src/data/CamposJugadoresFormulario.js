import api from "../services/api";

const fetchEquipos = async () => {
    try {
        const response = await api.get("/equipos");
        return response.data.estudios.map(equipo => ({
            value: equipo.id,
            label: equipo.nombre
        }));
    } catch (error) {
        console.error("Error al obtener los estudios", error);
        return [];
    }
};

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

const camposJugadoresFormulario = [
    {
        name: 'equipo_id',
        label: 'Equipo',
        type: 'select',
        placeholder: fetchEquipos()
    },
    {
        name: 'nombre_completo',
        label: 'Nombre Completo',
        type: 'text',
        placeholder: 'Ingrese su nombre completo'
    },
    {
        name: 'capitan',
        label: 'Capitan',
        type: 'checkbox',
        placeholder: 'Ingrese su correo electrónico'
    },
    {
        name: 'estudio_id',
        label: 'Estudio',
        type: 'select',
        options: fetchEstudios()
    }
];

export default camposJugadoresFormulario;