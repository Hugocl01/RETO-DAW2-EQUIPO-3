import { useState, useEffect } from "react";
import api from "../services/api";
import AdministracionMenu from "../components/MenuAdministracion";
import UsuariosCRUD from "../components/crud/UsuariosCRUD";
import PerfilesCRUD from "../components/crud/PerfilesCRUD";
import PabellonesCRUD from "../components/crud/PabellonesCRUD";
import PatrocinadoresCRUD from "../components/crud/PatrocinadoresCRUD";
import CentrosCRUD from "../components/crud/CentrosCRUD";
import CiclosCRUD from "../components/crud/CiclosCRUD";

function AdministracionPage() {
    const [secciones, setSecciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [entidadSeleccionada, setEntidadSeleccionada] = useState("usuarios"); // "usuarios" por defecto

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

    // Función para renderizar el CRUD según la entidad seleccionada
    const renderCRUD = () => {
        switch (entidadSeleccionada) {
            case "usuarios":
                return <UsuariosCRUD />;
            case "perfiles":
                return <PerfilesCRUD />;
            case "pabellones":
                return <PabellonesCRUD />;
            case "patrocinadores":
                return <PatrocinadoresCRUD />;
            case "centros":
                return <CentrosCRUD />;
            case "ciclos":
                return <CiclosCRUD />;
            default:
                return <h4 className="text-center mt-4">Seleccione una entidad para administrar</h4>;
        }
    };

    return (
        <div className="d-flex">
            <AdministracionMenu secciones={secciones} loading={loading} onSelect={setEntidadSeleccionada} />

            <div className="flex-grow-1 p-4">
                {renderCRUD()}
            </div>
        </div>
    );
}

export default AdministracionPage;
