export default async function fetchData(endpoint) {
    const token = localStorage.getItem("token"); // Si necesitas autenticación
    const url = import.meta.env.VITE_API_URL;

    try {
        const response = await fetch(`${url}${endpoint}`, {
            headers: { Authorization: `Bearer ${token}` }, // Enviar token para autorización
        });

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }

        const data = await response.json(); // Convertimos la respuesta en JSON

        return data; // Devolvemos los datos tal como se reciben
    } catch (error) {
        console.error(`Error al obtener ${endpoint}:`, error);
        return [];
    }
}

export async function postData(endpoint, body) {
    const url = import.meta.env.VITE_API_URL;

    try {
        const response = await fetch(`${url}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error al enviar datos a ${endpoint}:`, error);
        return { error: true, message: error.message };
    }
}


