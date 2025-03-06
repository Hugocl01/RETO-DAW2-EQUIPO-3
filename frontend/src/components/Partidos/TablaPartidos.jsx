import Partido from "./Partido";
import { useNavigate } from "react-router-dom";

/**
 * Componente para mostrar una tabla de partidos según su tipo (clasificatorio, eliminatorias, etc.).
 * Permite filtrar y mostrar los partidos según el tipo seleccionado.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.tipo - Tipo de partido (clasificatorio, eliminatorias, etc.).
 * @param {string} props.grupo - Grupo de clasificación (solo aplica para partidos clasificatorios).
 * @param {Array} props.partidos - Lista de partidos a mostrar.
 * @returns {JSX.Element} Componente de tabla de partidos.
 */
function TablaPartidos({ tipo, grupo, partidos }) {
  const navegar = useNavigate();

  /**
   * Si no hay partidos, mostrar un mensaje.
   */
  if (!partidos || partidos.length === 0) {
    return <p>No hay partidos disponibles.</p>;
  }

  /**
   * Filtra los partidos según el tipo y el grupo (si es clasificatorio).
   *
   * @param {string} tipo - Tipo de partido (clasificatorio, eliminatorias, etc.).
   * @param {string} grupo - Grupo de clasificación (solo aplica para partidos clasificatorios).
   * @returns {Array} Lista de partidos filtrados.
   */
  function obtenerPartidosTipo(tipo, grupo = "") {
    let partidosFiltrados;

    /**
     * Si la opción es clasificatorio y se ha seleccionado un grupo.
     */
    if (tipo === "clasificatorio" && grupo !== "") {
      partidosFiltrados = partidos.filter(
        (p) => p.tipo === tipo && p.grupo === grupo
      );
    } else if (tipo === "eliminatorias") {
      /**
       * Si el tipo es eliminatorias, filtrar partidos de semifinales y finales.
       */
      partidosFiltrados = partidos.filter(
        (p) => p.tipo === "semifinal" || p.tipo === "final"
      );
    } else {
      partidosFiltrados = partidos;
    }

    return partidosFiltrados;
  }

  /**
   * Navega a la vista detallada de un partido.
   *
   * @param {string} slug - Identificador único del partido.
   */
  function navegarDetalleResultado(slug) {
    navegar(`/partidos/${slug}`);
  }

  return (
    <div className="container-fluid">
      {/**
       * Mostrar según el tipo de partido: clasificatorio, eliminatorias o amistoso
       */}
      {tipo === "clasificatorio"  ? (
        <>
          <h3>Clasificatorio</h3>
          <div>
            {/**
             * Muestro los partidos del grupo seleccionado
             */}
            {obtenerPartidosTipo(tipo, grupo).map((valor, indice) => (
              <Partido
                key={indice}
                tipo={tipo}
                objPartido={valor}
                fnNavegar={navegarDetalleResultado}
              />
            ))}
          </div>
        </>
      ) : tipo === "eliminatorias" ? (
        <>
          <h3>Eliminatorias</h3>
          <div>
            {/**
             * Filtro los partidos de eliminatorias
             **/}
            {obtenerPartidosTipo(tipo).map((valor, indice) => (
              <Partido
                key={indice}
                tipo={tipo}
                objPartido={valor}
                fnNavegar={navegarDetalleResultado}
              />
            ))}
          </div>
        </>
      ) :  (
        <>
          <div>
            {/**
             * Filtro cuando no seleccionas una opción que te salga el primer partido
             **/}

            <Partido
              key={0}
              tipo={tipo}
              objPartido={partidos[0]}
              fnNavegar={navegarDetalleResultado}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default TablaPartidos;
