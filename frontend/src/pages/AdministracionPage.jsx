import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { SeguridadContext } from "../contexts/SeguridadProvider";
import AdministracionMenu from "../components/MenuAdministracion";

// Importa todos los CRUD
import CrudJugadores from "../components/Crud/CrudJugadores";
import CrudPartidos from "../components/Crud/CrudPartidos";
import CrudPublicaciones from "../components/Crud/CrudPublicaciones";
import CrudActas from "../components/Crud/CrudActas";
import CrudUsuarios from "../components/Crud/CrudUsuarios";
import CrudRetos from "../components/Crud/CrudRetos";
import CrudImagenes from "../components/Crud/CrudImagenes";
import CrudPabellones from "../components/Crud/CrudPabellones";
import CrudFamilias from "../components/Crud/CrudFamilias";
import CrudCiclos from "../components/Crud/CrudCiclos";
import CrudCentros from "../components/Crud/CrudCentros";
import CrudEstudios from "../components/Crud/CrudEstudios";
import CrudInscripciones from "../components/Crud/CrudInscripciones";

// Importa todos los formularios
import FormularioJugadores from "../components/Formularios/FormularioJugadores";
import FormularioPartidos from "../components/Formularios/FormularioPartidos";
import FormularioPublicaciones from "../components/Formularios/FormularioPublicaciones";
import FormularioActas from "../components/Formularios/FormularioActas";
import FormularioUsuarios from "../components/Formularios/FormularioUsuarios";
import FormularioRetos from "../components/Formularios/FormularioRetos";
import FormularioImagenes from "../components/Formularios/FormularioImagenes";
import FormularioPabellones from "../components/Formularios/FormularioPabellones";
import FormularioFamilias from "../components/Formularios/FormularioFamilias";
import FormularioCiclos from "../components/Formularios/FormularioCiclos";
import FormularioCentros from "../components/Formularios/FormularioCentros";
import FormularioEstudios from "../components/Formularios/FormularioEstudios";
import FormularioInscripciones from "../components/Formularios/FormularioInscripciones";

function AdministracionPage() {
    const { seccion } = useParams();
    const { seguridad } = useContext(SeguridadContext);

    // Modo puede ser "crear", "editar" o null (listar)
    const [modo, setModo] = useState(null);
    // Item seleccionado para editar
    const [itemSeleccionado, setItemSeleccionado] = useState(null);

    // Maneja el cambio de modo (crear, editar) y el item seleccionado
    const handleModoCambio = (nuevoModo, item = null) => {
        setModo(nuevoModo);
        setItemSeleccionado(item);
    };

    /**
     * Renderiza el formulario según la sección actual.
     * Cuando se termine de guardar o cancelar, volvemos a modo null (lista).
     */
    const renderFormulario = () => {
        switch (seccion) {
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
                return <div>Sección no encontrada.</div>;
        }
    };

    /**
     * Renderiza el CRUD (lista + botones de crear/editar/eliminar) 
     * según la sección actual.
     */
    const renderCrud = () => {
        switch (seccion) {
            case "jugadores":
                return <CrudJugadores onModoCambio={handleModoCambio} />;
            case "partidos":
                return <CrudPartidos onModoCambio={handleModoCambio} />;
            case "publicaciones":
                return <CrudPublicaciones onModoCambio={handleModoCambio} />;
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
                return <div>Sección no encontrada.</div>;
        }
    };

    return (
        <div className="d-flex">
            {/* Menú de administración a la izquierda */}
            <AdministracionMenu />

            {/* Contenido principal a la derecha */}
            <div className="flex-grow-1 p-4">
                {
                    // Si tenemos un modo "crear" o "editar", mostramos el formulario.
                    // Si no, mostramos el CRUD.
                    modo ? renderFormulario() : renderCrud()
                }
            </div>
        </div>
    );
}

export default AdministracionPage;
