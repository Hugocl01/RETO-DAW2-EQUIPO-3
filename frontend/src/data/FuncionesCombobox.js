const url = 'http://127.0.0.1:8000/api/';

/**
 * Carga la lista de centros desde la API y los almacena en sessionStorage.
 */
async function cargarCentros() {
    let token = localStorage.getItem("token");
    const urlCentros = url + 'lista/centros';

    try {
        // Hacer la solicitud con el token en los encabezados
        const response = await fetch(urlCentros, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        // Verificar si la respuesta es exitosa (status 200-299)
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Convertir la respuesta en JSON
        const data = await response.json();
        console.log('Centros recogidos:', data);

        sessionStorage.setItem('centros', JSON.stringify(data));

    } catch (error) {
        console.error("Error al cargar los centros:", error);
    }
}

/**
 * Carga la lista de ciclos desde la API y los almacena en sessionStorage.
 */
async function cargarCiclos() {
    let token = localStorage.getItem("token");
    const urlCiclos = url + 'lista/ciclos';

    try {
        // Hacer la solicitud con el token en los encabezados
        const response = await fetch(urlCiclos, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        // Verificar si la respuesta es exitosa (status 200-299)
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Convertir la respuesta en JSON
        const data = await response.json();
        console.log('Ciclos recogidos:', data);

        sessionStorage.setItem('ciclos', JSON.stringify(data));

    } catch (error) {
        console.error("Error al cargar los ciclos:", error);
    }
}

/**
 * Carga la lista de equipos desde la API y los almacena en sessionStorage.
 */
async function cargarEquipos() {
    let token = localStorage.getItem("token");
    const urlEquipos = url + 'lista/equipos';

    try {
        // Hacer la solicitud con el token en los encabezados
        const response = await fetch(urlEquipos, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        // Verificar si la respuesta es exitosa (status 200-299)
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Convertir la respuesta en JSON
        const data = await response.json();
        console.log('Equipos recogidos:', data);

        sessionStorage.setItem('equipos', JSON.stringify(data));

    } catch (error) {
        console.error("Error al cargar los equipos:", error);
    }
}

/**
 * Carga la lista de estudios desde la API y los almacena en sessionStorage.
 */
async function cargarEstudios() {
    let token = localStorage.getItem("token");
    const urlEstudios = url + 'lista/estudios';

    try {
        const response = await fetch(urlEstudios, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Estudios recogidos:', data);

        sessionStorage.setItem('estudios', JSON.stringify(data));

    } catch (error) {
        console.error("Error al cargar los estudios:", error);
    }
}

/**
 * Carga la lista de familias desde la API y los almacena en sessionStorage.
 */
async function cargarFamilias() {
    let token = localStorage.getItem("token");
    const urlFamilias = url + 'lista/familias';

    try {
        const response = await fetch(urlFamilias, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Familias recogidas:', data);

        sessionStorage.setItem('familias', JSON.stringify(data));

    } catch (error) {
        console.error("Error al cargar las familias:", error);
    }
}

/**
 * Carga la lista de incidencias desde la API y los almacena en sessionStorage.
 */
async function cargarIncidencias() {
    let token = localStorage.getItem("token");
    const urlIncidencias = url + 'lista/incidencias';

    try {
        const response = await fetch(urlIncidencias, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Incidencias recogidas:', data);

        sessionStorage.setItem('incidencias', JSON.stringify(data));

    } catch (error) {
        console.error("Error al cargar las incidencias:", error);
    }
}

/**
 * Carga la lista de jugadores desde la API y los almacena en sessionStorage.
 */
async function cargarJugadores() {
    let token = localStorage.getItem("token");
    const urlJugadores = url + 'lista/jugadores';

    try {
        const response = await fetch(urlJugadores, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Jugadores recogidos:', data);

        sessionStorage.setItem('jugadores', JSON.stringify(data));

    } catch (error) {
        console.error("Error al cargar los jugadores:", error);
    }
}

/**
 * Carga la lista de perfiles desde la API y los almacena en sessionStorage.
 */
async function cargarPerfiles() {
    let token = localStorage.getItem("token");
    const urlPerfiles = url + 'lista/perfiles';

    try {
        const response = await fetch(urlPerfiles, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Perfiles recogidos:', data);

        sessionStorage.setItem('perfiles', JSON.stringify(data));

    } catch (error) {
        console.error("Error al cargar los perfiles:", error);
    }
}

export {
    cargarCentros,
    cargarCiclos,
    cargarEquipos,
    cargarEstudios,
    cargarFamilias,
    cargarIncidencias,
    cargarJugadores,
    cargarPerfiles
};
