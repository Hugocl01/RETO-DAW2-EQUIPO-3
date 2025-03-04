export default async function fetchData(endpoint) {
    const token = localStorage.getItem("token"); // Si necesitas autenticación
    const url = 'http://127.0.0.1:8000/api/';


    try {
        const response = await fetch(`${url}${endpoint}`, {
            headers: { Authorization: `Bearer ${token}` }, // Enviar token para autorización
        });

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }

        const data = await response.json(); // Convertimos la respuesta en JSON
        console.log(`Datos recibidos de la API para ${endpoint}:`, data);

        return data; // Devolvemos los datos tal como se reciben
    } catch (error) {
        console.error(`Error al obtener ${endpoint}:`, error);
        return [];
    }
}

export async function postData(endpoint, body) {
    const token = localStorage.getItem("token"); // Si necesitas autenticación
    const url = 'http://127.0.0.1:8000/api/';

    try {
        const response = await fetch(`${url}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Enviar token si es necesario
            },
            body: JSON.stringify(body), // Convertimos el objeto a JSON
        });

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }

        const data = await response.json(); // Convertimos la respuesta en JSON
        console.log(`Datos recibidos de la API para ${endpoint}:`, data);

        return data; // Devolvemos la respuesta de la API
    } catch (error) {
        console.error(`Error al enviar datos a ${endpoint}:`, error);
        return { error: true, message: error.message }; // Devolvemos un objeto de error
    }
}


