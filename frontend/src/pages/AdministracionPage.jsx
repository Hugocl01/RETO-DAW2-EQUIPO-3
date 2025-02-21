import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SeguridadContext } from "../contexts/SeguridadProvider";
import AdministracionMenu from "../components/MenuAdministracion";
import Crud from "../components/Crud";
import FormularioCentros from "../components/Formularios/FormularioCentros";
import FormularioCiclos from "../components/Formularios/FormularioCiclos";
import FormularioEquipos from "../components/Formularios/FormularioEquipos";
import FormularioJugadores from "../components/Formularios/FormularioJugadores";
import FormularioRestos from "../components/Formularios/FormularioRetos";

function AdministracionPage() {
    const { seccion } = useParams();
    const navigate = useNavigate();
    const { seguridad } = useContext(SeguridadContext);
    
    const [entidadSeleccionada, setEntidadSeleccionada] = useState(null);
    const [modo, setModo] = useState(null);
    const [itemSeleccionado, setItemSeleccionado] = useState(null);

    const handleLoad = (seccion) => {
        setEntidadSeleccionada(seccion);
        navigate(`/administracion/${seccion.nombre.toLowerCase()}`);
    };

    const handleModoCambio = (nuevoModo, item = null) => {
        console.log("Modo cambiado a:", nuevoModo, "con item:", item);
        setModo(nuevoModo);
        setItemSeleccionado(item);
    };
    
    const renderFormulario = () => {
        switch (seccion) {
            case "centros":
                return <FormularioCentros datosIniciales={itemSeleccionado} onGuardar={() => setModo(null)} onCancelar={() => setModo(null)} />;
            case "ciclos":
                return <FormularioCiclos datosIniciales={itemSeleccionado} onGuardar={() => setModo(null)} onCancelar={() => setModo(null)} />;
            case "jugadores":
                return <FormularioJugadores datosIniciales={itemSeleccionado} onGuardar={() => setModo(null)} onCancelar={() => setModo(null)} />;
            case "equipos":
                return <FormularioEquipos datosIniciales={itemSeleccionado} onGuardar={() => setModo(null)} onCancelar={() => setModo(null)} />;
            case "retos":
                return <FormularioRestos datosIniciales={itemSeleccionado} onGuardar={() => setModo(null)} onCancelar={() => setModo(null)} />;
            default:
                return <div>Sección no encontrada</div>;
        }
    };

    return (
        <div className="d-flex">
            <AdministracionMenu onSelect={handleLoad} />
            <div className="flex-grow-1 p-4">
                {modo ? renderFormulario() : <Crud seccion={entidadSeleccionada} onModoCambio={handleModoCambio} />}
            </div>
        </div>
    );
}

export default AdministracionPage;
