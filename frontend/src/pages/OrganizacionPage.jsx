import InfoTorneo from "../components/InfoTorneo";
import Retos from "../components/Retos";

/**
 * Página de Organización.
 * 
 * @component
 * @returns {JSX.Element} - Renderiza la página de organización.
 */
function OrganizacionPage() {

    return (
        <>
            <title>Organización</title>
            <Retos />
            <InfoTorneo />
        </>
    );
}

export default OrganizacionPage;