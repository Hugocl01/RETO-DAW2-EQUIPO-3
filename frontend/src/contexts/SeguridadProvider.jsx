import { createContext, useState, useEffect } from "react";
import api from "../services/api.js";

/**
 * Contexto para gestionar la seguridad de la aplicación.
 * Utilizado para compartir información de seguridad (como autenticación, roles de usuario, etc.) en toda la aplicación.
 * 
 * @context
 * @example
 * const { seguridad, login, logout } = useContext(SeguridadContext);
 */
const SeguridadContext = createContext();

/**
 * Proveedor del contexto de seguridad.
 * Envuelve los componentes hijos y proporciona el contexto de autenticación.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al contexto.
 * @returns {JSX.Element} - Elemento JSX que proporciona el contexto de seguridad.
 */
function SeguridadProvider({ children }) {
    /**
     * Estado que almacena la autenticación, el usuario y el token.
     * @typedef {Object} SeguridadState
     * @property {boolean} auth - Indica si el usuario está autenticado.
     * @property {Object|null} user - Datos del usuario autenticado (id, name, email) o `null` si no hay usuario.
     * @property {string|null} token - Token de autenticación o `null` si no hay sesión activa.
     */
    const [seguridad, setSeguridad] = useState({
        auth: false,
        user: null,
        token: null
    });

    /**
     * Estado que indica si la autenticación está siendo verificada.
     * Se usa para evitar desincronización y la redirección prematura antes de que se carguen los datos de sesión.
     * 
     * @type {boolean}
     */
    const [cargando, setCargando] = useState(true);

    /**
     * Carga los datos de sesión almacenados en `sessionStorage` cuando la aplicación se inicia.
     */
    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        const storedUser = sessionStorage.getItem("user");

        if (storedToken && storedUser) {
            setSeguridad({
                auth: true,
                user: JSON.parse(storedUser),
                token: storedToken
            });
        }

        setCargando(false);
    }, []);

    /**
     * Inicia sesión con las credenciales del usuario y almacena el estado de autenticación.
     * Guarda el token y los datos del usuario en el estado global y en `sessionStorage`.
     *
     * @async
     * @function
     * @param {string} email - Correo electrónico del usuario.
     * @param {string} password - Contraseña del usuario.
     * @returns {Promise<{ success: boolean, error?: string }>} - Objeto con `success: true` si la autenticación fue exitosa, o `success: false` con un mensaje de error en `error`.
     *
     */
    const login = async (email, password) => {
        try {
            const response = await api.post('/login', { email, password });

            if (response.data.status === "success") {
                const { token, usuario } = response.data;

                // Guarda en el estado global
                setSeguridad({
                    auth: true,
                    user: usuario,
                    token: token
                });

                // Guarda en sessionStorage
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("user", JSON.stringify(usuario));

                return { success: true };
            }
        } catch (error) {
            let errorMessage = "Error desconocido";

            if (error.response) {
                if (error.response.status === 401) {
                    errorMessage = "Credenciales incorrectas. Verifica tu correo y contraseña.";
                } else if (error.response.status === 500) {
                    errorMessage = "Error interno del servidor. Inténtalo más tarde.";
                } else {
                    errorMessage = error.response.data.message || "Error en la autenticación.";
                }
            } else if (error.request) {
                errorMessage = "No se pudo conectar con el servidor.";
            } else {
                errorMessage = error.message;
            }

            return { success: false, error: errorMessage };
        }
    };

    /**
    * Cierra la sesión del usuario, eliminando la información de sesión.
    * 
    * @function
    */
    const logout = () => {
        setSeguridad({
            auth: false,
            user: null,
            token: null
        });

        // Elimina el user y el token de sessionStorage
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
    };

    return (
        <SeguridadContext.Provider value={{ seguridad, login, logout, cargando }}>
            {children}
        </SeguridadContext.Provider>
    );
}

export { SeguridadContext, SeguridadProvider };
