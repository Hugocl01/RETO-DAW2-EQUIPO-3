import { createContext, useState } from "react";
import api from "../services/api.js";

/**
 * Contexto para gestionar la seguridad de la aplicación.
 * Utilizado para compartir información de seguridad (como autenticación, roles de usuario, etc.) en toda la aplicación.
 * 
 * @context
 * @example
 * const { user, login, logout } = useContext(SeguridadContext);
 */
const SeguridadContext = createContext();

/**
 * Proveedor del contexto de seguridad.
 * Envuelve a los componentes hijos y proporciona el contexto de seguridad a su interior.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al contexto.
 * @returns {JSX.Element} Elemento JSX que envuelve a los hijos con el contexto de seguridad.
 */
function SeguridadProvider({ children }) {
    const [auth, setAuth] = useState(false);

    const login = async (email, password) => {
        console.log(email, password);
        
        try {
            const response = await api.post('/login', {
                email: email,
                password: password
            });
            console.log(response.data); // Manejar la respuesta
            // Aquí puedes realizar acciones adicionales con los datos recibidos
            return response.data; // Devuelve los datos de respuesta
        } catch (error) {
            console.log(error);
            if (error.response) {
                console.log('Error en la respuesta:', error.response.data);
            } else if (error.request) {
                console.log('Error en la solicitud:', error.request);
            } else {
                console.log('Error:', error.message);
            }
        }
    };

    return (
        <SeguridadContext.Provider
            value={{
                // Aquí puedes agregar la lógica de seguridad (por ejemplo: autenticación, estado de sesión, etc.)
                auth, login,
            }}
        >
            {children}
        </SeguridadContext.Provider>
    );
}

export { SeguridadContext, SeguridadProvider };
