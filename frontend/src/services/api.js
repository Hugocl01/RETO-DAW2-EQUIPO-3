import axios from "axios";

/**
 * @file api.js
 * @description Instancia personalizada de Axios para realizar peticiones HTTP a una API en Laravel.
 * Esta configuración está destinada a interactuar con la API backend de Laravel con autenticación basada en tokens (Laravel Sanctum).
 * 
 * @module api
 */

/**
 * Instancia de Axios configurada con la base URL de la API.
 * El encabezado de la solicitud incluye un token de autenticación si está presente en el sessionStorage.
 * 
 * @constant {AxiosInstance} api
 * @property {string} baseURL - URL base de la API (en este caso, el servidor local de desarrollo de Laravel).
 * @property {Object} headers - Configuración de los encabezados, incluye el tipo de contenido como JSON.
 * 
 */
const api = axios.create({
    baseURL: 'http://23.23.87.65/api',
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

/**
 * Interceptor de solicitudes para incluir el token de autenticación en el encabezado de la solicitud.
 * Si el token está disponible en sessionStorage, se incluirá automáticamente en los encabezados de cada solicitud
 * para acceder a las rutas protegidas en la API de Laravel.
 * 
 * @function
 * @param {Object} config - Configuración de la solicitud de Axios.
 * @returns {Object} Configuración modificada con el token en los encabezados si está disponible.
 * @throws {Promise} Retorna una promesa rechazada en caso de fallo durante la configuración de la solicitud.
 */
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
