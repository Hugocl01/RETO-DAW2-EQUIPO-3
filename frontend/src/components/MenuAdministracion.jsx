import { useContext } from "react";
import { SeguridadContext } from "../contexts/SeguridadProvider.jsx";
import { Link } from "react-router-dom";

function Administracion() {
    const { seguridad } = useContext(SeguridadContext);
    const usuario = seguridad.user;

    console.log(usuario);

    return (
        <div className="d-flex flex-column align-items-center gap-3">
            <Link to="/administracion/usuarios" className="btn btn-primary">Usuarios</Link>
            <Link to="/administracion/perfiles" className="btn btn-primary">Perfiles</Link>
            <Link to="/administracion/pabellones" className="btn btn-primary">Pabellones</Link>
            <Link to="/administracion/patrocinadores" className="btn btn-primary">Patrocinadores</Link>
            <Link to="/administracion/centros" className="btn btn-primary">Centros</Link>
            <Link to="/administracion/ciclos" className="btn btn-primary">Ciclos</Link>
        </div>
    );
}

export default Administracion;