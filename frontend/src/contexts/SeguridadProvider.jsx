import { createContext, useState } from "react";
import axios from 'axios';

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
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                "email": email,
                "password": password
            });
            console.log(response.data); // Manejar la respuesta
            setAuth(true);
        } catch (error) {
            if (error.response) {
                // La solicitud fue realizada y el servidor respondió con un estado de error
                console.log('Error en la respuesta:', error.response.data);
            } else if (error.request) {
                // La solicitud fue realizada pero no se recibió respuesta
                console.log('Error en la solicitud:', error.request);
            } else {
                // Algo sucedió al configurar la solicitud que lanzó un error
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
