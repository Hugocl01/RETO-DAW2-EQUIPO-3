import { useState } from "react";
import AdministracionMenu from "../components/MenuAdministracion";
import UsuariosCRUD from "../components/crud/UsuariosCRUD";
import PerfilesCRUD from "../components/crud/PerfilesCRUD";
//import PabellonesCRUD from "../components/crud/PabellonesCRUD";
//import PatrocinadoresCRUD from "../components/crud/PatrocinadoresCRUD";
//import CentrosCRUD from "../components/crud/CentrosCRUD";
//import CiclosCRUD from "../components/crud/CiclosCRUD";

function AdministracionPage() {
    // 'usuarios' es el CRUD por defecto
    const [entidadSeleccionada, setEntidadSeleccionada] = useState("usuarios");

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
        <div className="container mt-4">
            <h2 className="text-center">Panel de Administración</h2>

            {/* Menú separado en su propio componente */}
            <AdministracionMenu onSelect={setEntidadSeleccionada} />

            {/* Renderizado del CRUD según la entidad seleccionada */}
            {renderCRUD()}
        </div>
    );
}

export default AdministracionPage;
