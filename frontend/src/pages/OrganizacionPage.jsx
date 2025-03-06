import InfoTorneo from "../components/InfoTorneo";
import Retos from "../components/Retos";

/**
 * Página `OrganizacionPage` que muestra información sobre la organización del torneo y los retos asociados.
 * 
 * @component
 * @returns {JSX.Element} - Elemento JSX que representa la página de organización.
 */
function OrganizacionPage() {
    return (
        <>
            <title>Organización</title>
            <InfoTorneo />
            <Retos />
        </>
    );
}

export default OrganizacionPage;
