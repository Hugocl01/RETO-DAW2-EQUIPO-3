import Partidos from "../components/Partidos.jsx";

/**
 * Página de Torneo.
 * Este componente representa la página principal de un torneo, donde se muestran los partidos.
 * 
 * @component
 * @returns {JSX.Element} - Renderiza la página de torneo con un título y el componente `Partidos`.
 * @example
 * return (
 *   <TorneoPage />
 * )
 */
function TorneoPage() {
    return (
        <>
            <title>Torneo</title>
            <Partidos />
        </>
    );
}

export default TorneoPage;
