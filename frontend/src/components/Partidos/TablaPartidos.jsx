import Partido from "./Partido";
/**
 * Componente para las tablas de los partidos
 * @param {*} param0 
 * @returns 
 */
function TablaPartidos({ tipo, grupo, partidos }) {
  /**
   * Si no hay partidos que salgan un mensaje
   */
  if (!partidos) {
    return <p>No hay partidos disponibles.</p>; 
  }

  return (
    <div className="container">
      {/**
       * Se mostrará una tabla u otra dependiendo de las selecciones en paginaPage
       */}
      {tipo === "clasificatorio" ? (
        <>
          <h3>Clasificatorio</h3>
          {/* Mostrar grupo A o B dependiendo de la selección */}
          <div>
            {grupo === "grupoA"
              ? partidos.fase_grupos.grupo_A.map((valor) => {
                  return (
                    <Partido
                      key={valor.id}
                      objPartido={valor}
                    ></Partido>
                  );
                })
              : partidos.fase_grupos?.grupo_B.map((valor) => {
                  return (
                    <Partido
                      key={valor.id}
                      objPartido={valor}
                    ></Partido>
                  );
                })}
          </div>
        </>
      ) : (
        <>
          <h3>Eliminatorias</h3>
          <div>
            <div>
              {partidos.eliminatorias.semifinales.map((valor) => {
                return (
                  <Partido
                    key={valor.id}
                    tipo={"semifinal"}
                    objPartido={valor}
                  ></Partido>
                );
              })}
            </div>

            <div>
              {
                <Partido
                  key={partidos.eliminatorias.final.id}
                  tipo={"final"}
                  objPartido={partidos.eliminatorias.final}
                ></Partido>
              }
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TablaPartidos;
