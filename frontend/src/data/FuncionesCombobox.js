const url = 'http://127.0.0.1:8000/api/';

//import { cargarCentros, cargarCiclos, cargarEquipos, cargarEstudios, cargarFamilias, cargarIncidencias, cargarJugadores, cargarPerfiles } from "../data/FuncionesCombobox.js";

async function cargarCentros() {
    let token = localStorage.getItem("token"); // Aquí se encuentra tu token de autenticación
    const urlCentros = url + 'lista/centros';  // La URL de los centros que deseas consultar

    try {
        // Hacer la solicitud con el token en los encabezados
        const response = await fetch(urlCentros, {
            method: 'GET',  // El método HTTP que deseas utilizar (GET, POST, etc.)
            headers: {
                'Content-Type': 'application/json',  // Tipo de contenido esperado
                'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado Authorization
            },
        });

        // Verificar si la respuesta es exitosa (status 200-299)
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Convertir la respuesta en JSON
        const data = await response.json();

        // Mostrar los datos obtenidos
        console.log('Centros recogidos ' + JSON.stringify(data));

        sessionStorage('centros', JSON.stringify(data));

    } catch (error) {
        console.error("Error al cargar los centros:", error);
    }
}

async function cargarCiclos() {
    let token = localStorage.getItem("token"); // Aquí se encuentra tu token de autenticación
    const urlCiclos = url + 'lista/ciclos';  // La URL de los ciclos que deseas consultar

    try {
        // Hacer la solicitud con el token en los encabezados
        const response = await fetch(urlCiclos, {
            method: 'GET',  // El método HTTP que deseas utilizar (GET, POST, etc.)
            headers: {
                'Content-Type': 'application/json',  // Tipo de contenido esperado
                'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado Authorization
            },
        });

        // Verificar si la respuesta es exitosa (status 200-299)
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Convertir la respuesta en JSON
        const data = await response.json();

        // Mostrar los datos obtenidos
        console.log('Centros recogidos :' + JSON.stringify(data));

        sessionStorage('centros', JSON.stringify(data));

    } catch (error) {
        console.error("Error al cargar los centros:", error);
    }
}

async function cargarEquipos() {
    let token = localStorage.getItem("token"); // Aquí se encuentra tu token de autenticación
    const urlEquipos = url + 'lista/equipos';  // La URL de los equipos que deseas consultar

    try {
        // Hacer la solicitud con el token en los encabezados
        const response = await fetch(urlEquipos, {
            method: 'GET',  // El método HTTP que deseas utilizar (GET, POST, etc.)
            headers: {
                'Content-Type': 'application/json',  // Tipo de contenido esperado
                'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado Authorization
            },
        });

        // Verificar si la respuesta es exitosa (status 200-299)
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Convertir la respuesta en JSON
        const data = await response.json();

        // Mostrar los datos obtenidos
        console.log('Equipos recogidos :' + JSON.stringify(data));

        sessionStorage('equipos', JSON.stringify(data));

    } catch (error) {
        console.error("Error al cargar los equipos:", error);
    }
}

async function cargarEstudios() {
    let token = localStorage.getItem("token"); // Aquí se encuentra tu token de autenticación
    const urlEstudios = url + 'lista/estudios';  // La URL de los estudios que deseas consultar

    try {
        // Hacer la solicitud con el token en los encabezados
        const response = await fetch(urlEstudios, {
            method: 'GET',  // El método HTTP que deseas utilizar (GET, POST, etc.)
            headers: {
                'Content-Type': 'application/json',  // Tipo de contenido esperado
                'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado Authorization
            },
        });

        // Verificar si la respuesta es exitosa (status 200-299)
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Convertir la respuesta en JSON
        const data = await response.json();

        // Mostrar los datos obtenidos
        console.log('Estudios recogidos :' + JSON.stringify(data));

        sessionStorage('estudios', JSON.stringify(data));

    } catch (error) {
        console.error("Error al cargar los estudios:", error);
    }
}

async function cargarFamilias() {
    let token = localStorage.getItem("token"); // Aquí se encuentra tu token de autenticación
    const urlFamilias = url + 'lista/familias';  // La URL de los familias que deseas consultar

    try {
        // Hacer la solicitud con el token en los encabezados
        const response = await fetch(urlFamilias, {
            method: 'GET',  // El método HTTP que deseas utilizar (GET, POST, etc.)
            headers: {
                'Content-Type': 'application/json',  // Tipo de contenido esperado
                'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado Authorization
            },
        });

        // Verificar si la respuesta es exitosa (status 200-299)
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Convertir la respuesta en JSON
        const data = await response.json();

        // Mostrar los datos obtenidos
        console.log('Familias recogidas :' + JSON.stringify(data));

        sessionStorage('familias', JSON.stringify(data));

    } catch (error) {
        console.error("Error al cargar los familias:", error);
    }
}

async function cargarIncidencias() {
    let token = localStorage.getItem("token"); // Aquí se encuentra tu token de autenticación
    const urlIncidencias = url + 'lista/incidencias';  // La URL de los incidencias que deseas consultar

    try {
        // Hacer la solicitud con el token en los encabezados
        const response = await fetch(urlIncidencias, {
            method: 'GET',  // El método HTTP que deseas utilizar (GET, POST, etc.)
            headers: {
                'Content-Type': 'application/json',  // Tipo de contenido esperado
                'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado Authorization
            },
        });

        // Verificar si la respuesta es exitosa (status 200-299)
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Convertir la respuesta en JSON
        const data = await response.json();

        // Mostrar los datos obtenidos
        console.log('Incidencias recogidas :' + JSON.stringify(data));

        sessionStorage('incidencias', JSON.stringify(data));

    } catch (error) {
        console.error("Error al cargar los incidencias:", error);
    }
}

async function cargarJugadores() {
    let token = localStorage.getItem("token"); // Aquí se encuentra tu token de autenticación
    const urlJugadores = url + 'lista/jugadores';  // La URL de los jugadores que deseas consultar

    try {
        // Hacer la solicitud con el token en los encabezados
        const response = await fetch(urlJugadores, {
            method: 'GET',  // El método HTTP que deseas utilizar (GET, POST, etc.)
            headers: {
                'Content-Type': 'application/json',  // Tipo de contenido esperado
                'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado Authorization
            },
        });

        // Verificar si la respuesta es exitosa (status 200-299)
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Convertir la respuesta en JSON
        const data = await response.json();

        // Mostrar los datos obtenidos
        console.log('Jugadores recogidos :' + JSON.stringify(data));

        sessionStorage('jugadores', JSON.stringify(data));

    } catch (error) {
        console.error("Error al cargar los jugadores:", error);
    }
}

async function cargarPerfiles() {
    let token = localStorage.getItem("token"); // Aquí se encuentra tu token de autenticación
    const urlPerfiles = url + 'lista/perfiles';  // La URL de los perfiles que deseas consultar

    try {
        // Hacer la solicitud con el token en los encabezados
        const response = await fetch(urlPerfiles, {
            method: 'GET',  // El método HTTP que deseas utilizar (GET, POST, etc.)
            headers: {
                'Content-Type': 'application/json',  // Tipo de contenido esperado
                'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado Authorization
            },
        });

        // Verificar si la respuesta es exitosa (status 200-299)
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Convertir la respuesta en JSON
        const data = await response.json();

        // Mostrar los datos obtenidos
        console.log('Perfiles recogidos :' + JSON.stringify(data));

        sessionStorage('perfiles', JSON.stringify(data));

    } catch (error) {
        console.error("Error al cargar los perfiles:", error);
    }
}

export { cargarCentros, cargarCiclos, cargarEquipos, cargarEstudios, cargarFamilias, cargarIncidencias, cargarJugadores, cargarPerfiles };