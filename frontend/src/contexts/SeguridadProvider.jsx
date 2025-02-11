import { createContext } from "react";

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
    
    return (
        <SeguridadContext.Provider
            value={{
                // Aquí puedes agregar la lógica de seguridad (por ejemplo: autenticación, estado de sesión, etc.)
            }}
        >
            {children}
        </SeguridadContext.Provider>
    );
}

export { SeguridadContext, SeguridadProvider };
