import { useState, useEffect, useContext } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { SeguridadContext } from "../contexts/SeguridadProvider";
import api from "../services/api";
import AdministracionMenu from "../components/MenuAdministracion";
import Crud from "../components/Crud";
import Formulario from "../components/Formularios/Formulario";
import camposFormularios from "../data/index";

function AdministracionPage() {
    const { seccion } = useParams();  // Obtener la sección desde la URL
    const navigate = useNavigate();  // Para cambiar la URL dinámicamente
    const location = useLocation();
    
    const { seguridad } = useContext(SeguridadContext);
    const [loading, setLoading] = useState(true);
    const [entidadSeleccionada, setEntidadSeleccionada] = useState(null);
    const [modo, setModo] = useState(null); // "edit" | "create" | null
    const [itemSeleccionado, setItemSeleccionado] = useState(null);
    const camposFormulario = camposFormularios[seccion];

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
    console.log(itemSeleccionado);

    return (
        <div className="d-flex">
            <title>Administración</title>

            {/* Menú lateral de administración */}
            <AdministracionMenu loading={loading} onSelect={handleLoad} />

            <div className="flex-grow-1 p-4">
                {/* Si estamos editando o creando, mostramos el formulario */}
                {modo ? (
                    <Formulario
                        datosIniciales={itemSeleccionado}
                        camposFormulario={camposFormulario}
                        onGuardar={() => setModo(null)}
                        onCancelar={() => setModo(null)}
                    />
                ) : (
                    <Crud seccion={entidadSeleccionada} onModoCambio={handleModoCambio} />
                )}
            </div>
        </div>
    );
}

export default AdministracionPage;
