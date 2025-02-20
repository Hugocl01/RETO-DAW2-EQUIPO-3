import { useState, useEffect, useContext } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { SeguridadContext } from "../contexts/SeguridadProvider";
import api from "../services/api";
import AdministracionMenu from "../components/MenuAdministracion";
import Crud from "../components/Crud";
import FormularioCentros from "../components/Formularios/FormularioCentros";
import FormularioCiclos from "../components/Formularios/FormularioCiclos";
import FormularioEquipos from "../components/Formularios/FormularioEquipos";
import FormularioJugadores from "../components/Formularios/FormularioJugadores";
import FormularioRestos from "../components/Formularios/FormularioRetos";

function AdministracionPage() {
    const { seccion } = useParams();  // Obtener la sección desde la URL
    const navigate = useNavigate();  // Para cambiar la URL dinámicamente

    const { seguridad } = useContext(SeguridadContext);
    const [loading, setLoading] = useState(true);
    const [entidadSeleccionada, setEntidadSeleccionada] = useState(null);
    const [modo, setModo] = useState(null); // "edit" | "create" | null
    const [itemSeleccionado, setItemSeleccionado] = useState(null);

    // Cuando el usuario selecciona una sección, actualiza la URL
    const handleLoad = (seccion) => {
        setEntidadSeleccionada(seccion);
        navigate(`/administracion/${seccion.nombre.toLowerCase()}`);  // 🔥 Cambia la URL al seleccionar una sección
    };

    // Controla si se muestra el CRUD o el formulario
    const handleModoCambio = (nuevoModo, item = null) => {
        setModo(nuevoModo);
        setItemSeleccionado(item);
    };

    // Función para renderizar el formulario correspondiente según la sección
    const renderFormulario = () => {
        switch (seccion) {
            case "centros":
                return (
                    <FormularioCentros
                        datosIniciales={itemSeleccionado}
                        onGuardar={() => setModo(null)}
                        onCancelar={() => setModo(null)}
                    />
                );
            case "ciclos":
                return (
                    <FormularioCiclos
                        datosIniciales={itemSeleccionado}
                        onGuardar={() => setModo(null)}
                        onCancelar={() => setModo(null)}
                    />
                );
            case "jugadores":
                return (
                    <FormularioJugadores
                        datosIniciales={itemSeleccionado}
                        onGuardar={() => setModo(null)}
                        onCancelar={() => setModo(null)}
                    />
                );
                case "equipos":
                    return (
                        <FormularioEquipos
                            datosIniciales={itemSeleccionado}
                            onGuardar={() => setModo(null)}
                            onCancelar={() => setModo(null)}
                        />
                );
                case "retos":
                    return (
                        <FormularioRestos
                            datosIniciales={itemSeleccionado}
                            onGuardar={() => setModo(null)}
                            onCancelar={() => setModo(null)}
                        />
                    );
            // Agregar más casos según las secciones disponibles
            default:
                return <div>Sección no encontrada</div>;
        }
    };

    return (
        <div className="d-flex">
            <title>Administración</title>

            {/* Menú lateral de administración */}
            <AdministracionMenu loading={loading} onSelect={handleLoad} />

            <div className="flex-grow-1 p-4">
                {/* Si estamos editando o creando, mostramos el formulario */}
                {modo ? (
                    renderFormulario() // Aquí cargamos el formulario adecuado según la sección
                ) : (
                    <Crud seccion={entidadSeleccionada} onModoCambio={handleModoCambio} />
                )}
            </div>
        </div>
    );
}

export default AdministracionPage;
