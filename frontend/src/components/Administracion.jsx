import { useContext } from "react";
import { SeguridadContext } from "../contexts/SeguridadProvider.jsx";
import { Link } from "react-router-dom";

function Administracion() {
    const { seguridad } = useContext(SeguridadContext);
    const usuario = seguridad.user;

    console.log(usuario);

    return (
        <div className="d-flex flex-column align-items-center gap-3">
            <Link className="btn btn-primary">Usuarios</Link>
            <Link className="btn btn-primary">Perfiles</Link>
            <Link className="btn btn-primary">Pabellones</Link>
            <Link className="btn btn-primary">Patrocinadores</Link>
            <Link className="btn btn-primary">Centros</Link>
            <Link className="btn btn-primary">Ciclos</Link>
        </div>
    );
}

export default Administracion;