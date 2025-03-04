import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SeguridadContext } from "../contexts/SeguridadProvider";
import MenuAdministracion from "../components/MenuAdministracion";

// Importa los componentes de CRUD para cada sección
import CrudEquipos from "../components/Cruds/CrudEquipos";
import CrudJugadores from "../components/Cruds/CrudJugadores";
import CrudPartidos from "../components/Cruds/CrudPartidos";
import CrudPublicaciones from "../components/Cruds/CrudPublicaciones";
import CrudPerfiles from "../components/Cruds/CrudPerfiles";
import CrudActas from "../components/Cruds/CrudActas";
import CrudUsuarios from "../components/Cruds/CrudUsuarios";
import CrudRetos from "../components/Cruds/CrudRetos";
import CrudImagenes from "../components/Cruds/CrudImagenes";
import CrudPabellones from "../components/Cruds/CrudPabellones";
import CrudPatrocinadores from "../components/Cruds/CrudPatrocinadores";
import CrudFamilias from "../components/Cruds/CrudFamilias";
import CrudCiclos from "../components/Cruds/CrudCiclos";
import CrudCentros from "../components/Cruds/CrudCentros";
import CrudEstudios from "../components/Cruds/CrudEstudios";
import CrudInscripciones from "../components/Cruds/CrudInscripciones";
import CrudTorneo from "../components/Cruds/CrudTorneo";

// Importa los formularios para cada sección
import FormularioJugadores from "../components/Formularios/FormularioJugadores";
import FormularioPartidos from "../components/Formularios/FormularioPartidos";
import FormularioPublicaciones from "../components/Formularios/FormularioPublicaciones";
import FormularioActas from "../components/Formularios/FormularioActas";
import FormularioUsuarios from "../components/Formularios/FormularioUsuarios";
import FormularioRetos from "../components/Formularios/FormularioRetos";
import FormularioImagenes from "../components/Formularios/FormularioImagenes";
import FormularioPabellones from "../components/Formularios/FormularioPabellones";
import FormularioPatrocinadores from "../components/Formularios/FormularioPatrocinadores";
import FormularioFamilias from "../components/Formularios/FormularioFamilias";
import FormularioCiclos from "../components/Formularios/FormularioCiclos";
import FormularioCentros from "../components/Formularios/FormularioCentros";
import FormularioEstudios from "../components/Formularios/FormularioEstudios";
import FormularioInscripciones from "../components/Formularios/FormularioInscripciones";
import Spinner from "../components/Spinner";
import { generateSlug } from "../utils/stringUtils";

function AdministracionPage() {
    // Obtenemos la sección actual desde la URL
    const { seccion } = useParams();
    const navigate = useNavigate();
    const { seguridad } = useContext(SeguridadContext);

    // Estado para determinar si estamos en modo "crear", "editar" o mostrando la lista (null)
    const [modo, setModo] = useState(null);
    // Estado para almacenar el item seleccionado (para editar)
    const [itemSeleccionado, setItemSeleccionado] = useState(null);
    // Estado para almacenar la sección seleccionada (basada en el objeto de MenuAdministracion)
    const [selectedSeccion, setSelectedSeccion] = useState(seccion ? generateSlug(seccion) : "");

    // Función que se pasa al menú y se ejecuta al seleccionar una sección.
    const handleMenuSelect = (seccionSeleccionada) => {
        const seccionNombreSlug = generateSlug(seccionSeleccionada.nombre);  // Aseguramos que el nombre se convierte a slug
        if (modo != null) {
            if (window.confirm('¿Estás seguro de salir del apartado de edición / creación?')) {
                setSelectedSeccion(seccionNombreSlug);
                setModo(null);
            }
        } else {
            setSelectedSeccion(seccionNombreSlug);
            navigate(`/administracion/${seccionNombreSlug}`);
        }
    };

    useEffect(() => {
        if (modo == null) {
            navigate(`/administracion/${selectedSeccion}`);
        }
    }, [modo]);

    // Función para cambiar el modo (por ejemplo, al editar o crear)
    const handleModoCambio = (nuevoModo, item = null) => {
        setModo(nuevoModo);
        setItemSeleccionado(item);
    };

    // Renderiza el formulario según la sección actual y el modo (crear o editar)
    const renderFormulario = () => {
        switch (selectedSeccion) {
            case "jugadores":
                return (
                    <FormularioJugadores
                        datosIniciales={itemSeleccionado}
                        onGuardar={() => setModo(null)}
                        onCancelar={() => setModo(null)}
                    />
                );
            case "partidos":
                return (
                    <FormularioPartidos
                        datosIniciales={itemSeleccionado}
                        onGuardar={() => setModo(null)}
                        onCancelar={() => setModo(null)}
                    />
                );
            case "publicaciones":
                return (
                    <FormularioPublicaciones
                        datosIniciales={itemSeleccionado}
                        onGuardar={() => setModo(null)}
                        onCancelar={() => setModo(null)}
                    />
                );
            case "actas":
                return (
                    <FormularioActas
                        datosIniciales={itemSeleccionado}
                        onGuardar={() => setModo(null)}
                        onCancelar={() => setModo(null)}
                    />
                );
            case "usuarios":
                return (
                    <FormularioUsuarios
                        datosIniciales={itemSeleccionado}
                        onGuardar={() => setModo(null)}
                        onCancelar={() => setModo(null)}
                    />
                );
            case "retos":
                return (
                    <FormularioRetos
                        datosIniciales={itemSeleccionado}
                        onGuardar={() => setModo(null)}
                        onCancelar={() => setModo(null)}
                    />
                );
            case "imagenes":
                return (
                    <FormularioImagenes
                        datosIniciales={itemSeleccionado}
                        onGuardar={() => setModo(null)}
                        onCancelar={() => setModo(null)}
                    />
                );
            case "pabellones":
                return (
                    <FormularioPabellones
                        datosIniciales={itemSeleccionado}
                        onGuardar={() => setModo(null)}
                        onCancelar={() => setModo(null)}
                    />
                );
            case "patrocinadores":
                return (
                    <FormularioPatrocinadores
                        datosIniciales={itemSeleccionado}
                        onGuardar={() => setModo(null)}
                        onCancelar={() => setModo(null)}
                    />
                );
            case "familias":
                return (
                    <FormularioFamilias
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
            case "centros":
                return (
                    <FormularioCentros
                        datosIniciales={itemSeleccionado}
                        onGuardar={() => setModo(null)}
                        onCancelar={() => setModo(null)}
                    />
                );
            case "estudios":
                return (
                    <FormularioEstudios
                        datosIniciales={itemSeleccionado}
                        onGuardar={() => setModo(null)}
                        onCancelar={() => setModo(null)}
                    />
                );
            case "inscripciones":
                return (
                    <FormularioInscripciones
                        datosIniciales={itemSeleccionado}
                        onGuardar={() => setModo(null)}
                        onCancelar={() => setModo(null)}
                    />
                );
            default:
                return <div>Formulario no definido para esta sección.</div>;
        }
    };

    // Renderiza el componente de CRUD (lista y botones) según la sección actual
    const renderCrud = () => {
        switch (selectedSeccion) {
            case "torneo":
                return <CrudTorneo onModoCambio={handleModoCambio} />
            case "equipos":
                return <CrudEquipos onModoCambio={handleModoCambio} />
            case "jugadores":
                return <CrudJugadores onModoCambio={handleModoCambio} />;
            case "partidos":
                return <CrudPartidos onModoCambio={handleModoCambio} />;
            case "publicaciones":
                return <CrudPublicaciones onModoCambio={handleModoCambio} />;
            case "perfiles":
                return <CrudPerfiles onModoCambio={handleModoCambio} />;
            case "actas":
                return <CrudActas onModoCambio={handleModoCambio} />;
            case "usuarios":
                return <CrudUsuarios onModoCambio={handleModoCambio} />;
            case "retos":
                return <CrudRetos onModoCambio={handleModoCambio} />;
            case "imagenes":
                return <CrudImagenes onModoCambio={handleModoCambio} />;
            case "pabellones":
                return <CrudPabellones onModoCambio={handleModoCambio} />;
            case "patrocinadores":
                return <CrudPatrocinadores onModoCambio={handleModoCambio} />;
            case "familias":
                return <CrudFamilias onModoCambio={handleModoCambio} />;
            case "ciclos":
                return <CrudCiclos onModoCambio={handleModoCambio} />;
            case "centros":
                return <CrudCentros onModoCambio={handleModoCambio} />;
            case "estudios":
                return <CrudEstudios onModoCambio={handleModoCambio} />;
            case "inscripciones":
                return <CrudInscripciones onModoCambio={handleModoCambio} />;
            default:
                return <div>CRUD no definido para esta sección.</div>;
        }
    };

    return (
        <div className="d-flex">
            {/* Se le pasa la función onSelect al menú */}
            <MenuAdministracion onSelect={handleMenuSelect} />
            <div className="flex-grow-1 p-4">
                {modo ? renderFormulario() : renderCrud()}
            </div>
        </div>
    );
}

export default AdministracionPage;