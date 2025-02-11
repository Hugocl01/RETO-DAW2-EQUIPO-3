import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SeguridadContext } from "../contexts/SeguridadProvider.jsx"


function RutaPrivada({children}) {
    const { auth } = useContext(SeguridadContext);
    
    // En caso de que el usuario no este autenticado redirige al login
    return auth ? children : <Navigate to="/login" />
}

export default RutaPrivada;