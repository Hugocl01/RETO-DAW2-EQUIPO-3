import { useState, useEffect } from "react";
import api from "../services/api";
import AdministracionMenu from "../components/MenuAdministracion";
import Crud from "../components/Crud";

function AdministracionPage() {
    const [secciones, setSecciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [entidadSeleccionada, setEntidadSeleccionada] = useState(null);

    useEffect(() => {
        const fetchSecciones = async () => {
            try {
                const response = await api.get('/secciones');
                setSecciones(response.data.secciones || []);
            } catch (error) {
                console.error("Error al obtener secciones:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSecciones();
    }, []);

    const handleLoad = (seccion) => {
        setEntidadSeleccionada(seccion);
    }
    return (
        <div className="d-flex">
            <AdministracionMenu secciones={secciones} loading={loading} onSelect={handleLoad} />

            <div className="flex-grow-1 p-4">
                <Crud seccion={entidadSeleccionada} />
            </div>
        </div>
    );
}

export default AdministracionPage;
