import { useParams } from "react-router-dom";
import EntidadCRUD from "../../components/EntidadCRUD";

function AdminEntidadPage() {
    const { entidad } = useParams();
    const listaEntidades = [
        ''
    ];

    return (
        <div>
            <h1>Administración de {entidad}</h1>

            <EntidadCRUD entidad={entidad} />
        </div>
    );
}

export default AdminEntidadPage;
