import { useParams } from "react-router-dom";

function RetoPage() {
    const { id } = useParams();

    return (
        <>
            pagina de reto {id}
        </>
    );
}

export default RetoPage;