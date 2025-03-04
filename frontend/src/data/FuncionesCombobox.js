const url = import.meta.env.VITE_API_URL;

/**
 * Llama a la API de forma genérica para obtener la lista desde cualquier endpoint.
 * Los datos se almacenan en sessionStorage y se devuelven tal como se reciben.
 *
 * @param {string} endpoint - El endpoint al que se hará la solicitud.
 */
async function fetchData(endpoint) {
    const token = localStorage.getItem("token"); // Si necesitas autenticación
    const datosCacheados = sessionStorage.getItem(endpoint); // Revisamos si los datos ya están en sessionStorage

    if (datosCacheados) {
        console.log(`Datos cargados desde sessionStorage para el endpoint: ${endpoint}`);
        return JSON.parse(datosCacheados); // Si están en sessionStorage, los devolvemos tal cual
    }

    try {
        const response = await fetch(`${url}${endpoint}`, {
            headers: { Authorization: `Bearer ${token}` }, // Enviar token para autorización
        });

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }

        const data = await response.json(); // Convertimos la respuesta en JSON
        console.log(`Datos recibidos de la API para ${endpoint}:`, data);

        sessionStorage.setItem(endpoint, JSON.stringify(data)); // Guardamos los datos en sessionStorage

        return data; // Devolvemos los datos tal como se reciben
    } catch (error) {
        console.error(`Error al obtener ${endpoint}:`, error);
        return [];
    }
}

const llamadas = () => {
    return {
        centros: () => fetchData('lista/centros'),
        ciclos: () => fetchData('lista/ciclos'),
        equipos: () => fetchData('lista/equipos'),
        estudios: () => fetchData('lista/estudios'),
        familias: () => fetchData('lista/familias'),
        incidencias: () => fetchData('lista/incidencias'),
        jugadores: () => fetchData('lista/jugadores'),
        perfiles: () => fetchData('lista/perfiles'),
        partidos: () => fetchData('lista/partidos'),
        patrocinadores: () => fetchData('lista/patrocinadores'),
        retos: () => fetchData('lista/retos'),
        ongs: () => fetchData('lista/ongs'),
        pabellones: () => fetchData('lista/pabellones'),
    };
};

export default llamadas;
