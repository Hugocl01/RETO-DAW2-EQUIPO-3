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
    console.log(`URL solicitada: ${url}${endpoint}`);

    try {
        const response = await fetch(`${url}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body),
        });

        // Leemos el cuerpo de la respuesta en formato JSON
        const responseData = await response.json();

        if (!response.ok) {
            // Lanzamos un objeto con info útil: status, datos, statusText
            throw {
                status: response.status,
                data: responseData,      // Aquí vienen los "errors" de validación
                statusText: response.statusText
            };
        }

        // Si todo va bien, retornamos la data exitosa
        return responseData;

    } catch (error) {
        // Aquí capturamos errores de red o el objeto que lanzamos arriba
        console.error(`Error al enviar datos a ${endpoint}:`, error);

        // Retornamos un objeto que indique que hubo un error
        return {
            error: true,
            status: error.status ?? 500,
            statusText: error.statusText ?? error.message,
            data: error.data ?? null, // Contendrá los errores de validación si es 422
        };
    }
}
