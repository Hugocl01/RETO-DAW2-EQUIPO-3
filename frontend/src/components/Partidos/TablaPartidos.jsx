import Partido from "./Partido";

/**
 * Componente para las tablas de los partidos
 * @param {*} param0
 * @returns
 */
function TablaPartidos({ tipo, grupo, partidos }) {
  /**
   * Si no hay partidos, mostrar un mensaje.
   */
  if (!partidos || partidos.length === 0) {
    return <p>No hay partidos disponibles.</p>;
  }
/**
 * Funcion que obtiene los partidos filtrados por si son clasificatorios o eliminatorias
 * @param {String} tipo es el tipo de enfrentamiento, si es clasificatorio o eliminatoria
 * @param {Int} grupo 
 * @returns 
 */
  function obtenerPartidosTipo(tipo, grupo = "") {
    let partidosFiltrados;

    /**
     * Si la opción es clasificatorio y haya seleccionado alguna opción del grupo
     */
    if (tipo === "clasificatorio" && grupo !== "") {
      partidosFiltrados = partidos.filter(
        (p) => p.tipo === tipo && p.grupo === grupo
      );
    }
    /**
     * Si el tipo es distinto a clasificatorio, es decir, eliminatorias
     */
    else
      partidosFiltrados = partidos.filter(
        (p) => p.tipo === "semifinal" || p.tipo === "final"
      );

    return partidosFiltrados;
  }

  return (
    <div className="container">
      {/** 
       * Mostrar según el tipo de partido: clasificatorio o eliminatorias 
       */}
      {tipo === "clasificatorio" ? (
        <>
          <h3>Clasificatorio</h3>
          <div>
            {/** 
             * Muestro los partidos del grupo seleccionado 
             */}
            {obtenerPartidosTipo(tipo, grupo).map((valor, indice) => (
              <Partido key={indice} tipo={tipo} objPartido={valor} />
            ))}
          </div>
        </>
      ) : (
        <>
          <h3>Eliminatorias</h3>
          <div>
            {/** 
             * Filtro los partidos de eliminatorias 
             **/}
            {obtenerPartidosTipo(tipo).map((valor, indice) => (
              <Partido key={indice} tipo={tipo} objPartido={valor} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TablaPartidos;
