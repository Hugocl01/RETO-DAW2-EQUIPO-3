import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { SeguridadContext } from "../contexts/SeguridadProvider";
import api from "../services/api";
import AdministracionMenu from "../components/MenuAdministracion";
import Crud from "../components/Crud";

function AdministracionPage() {
    const [secciones, setSecciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [entidadSeleccionada, setEntidadSeleccionada] = useState(null);
    const { seguridad } = useContext(SeguridadContext);
    const location = useLocation();

    useEffect(() => {
        const fetchSecciones = async () => {
            try {
                const response = await api.get(`/perfiles/${seguridad.user.perfil.id}`);
                const seccionesData = response.data.perfiles.secciones || [];
                setSecciones(seccionesData);

                // Obtener el primer parámetro de la URL
                const params = new URLSearchParams(location.search);
                for (const [key] of params.entries()) {
                    const seccionEncontrada = seccionesData.find(s => s.nombre.toLowerCase() === key.toLowerCase());
                    if (seccionEncontrada) {
                        setEntidadSeleccionada(seccionEncontrada);
                        break; // Salimos del bucle al encontrar la primera coincidencia
                    }
                }
            } catch (error) {
                console.error("Error al obtener secciones:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSecciones();
    }, [location.search]); // Se ejecuta cuando cambia la URL

    const handleLoad = (seccion) => {
        setEntidadSeleccionada(seccion);
    };

    return (
        <div className="d-flex">
            <title>Administración</title>
            <AdministracionMenu secciones={secciones} loading={loading} onSelect={handleLoad} />

            <div className="flex-grow-1 p-4">
                <Crud seccion={entidadSeleccionada} />
            </div>
        </div>
    );
}

export default AdministracionPage;
