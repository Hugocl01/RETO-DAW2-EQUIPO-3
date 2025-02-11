import axios from "axios";

/**
 * Instancia personalizada de Axios para realizar peticiones HTTP.
 * Esta configuración está destinada a interactuar con una API en el backend Laravel, 
 * con soporte para enviar y recibir cookies (autenticación basada en sesiones o tokens).
 * 
 * @module api
 */

/**
 * Instancia de Axios configurada con la base URL de la API y la opción de enviar cookies en las solicitudes.
 * 
 * @constant {AxiosInstance} api
 * @property {string} baseURL - URL base de la API (en este caso, el servidor local de desarrollo).
 * @property {boolean} withCredentials - Permite el envío de cookies con las solicitudes para habilitar la autenticación basada en sesión.
 * 
 */
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: true,
});

export default api;
