import { Link } from "react-router-dom";
import Administracion from "../../components/Administracion";

function AdministracionPage() {

    return (
        <>
            <div className="d-flex flex-row-reverse">
                <Link to="/">Volver al inicio</Link>
            </div>

            <Administracion />
        </>
    );
}

export default AdministracionPage;