import { useState } from "react";
/**
 * Componente para cada partido
 * @param {} param0 
 * @returns 
 */
function Partido({ objPartido }) {
  const [partido, setPartido] = useState(objPartido);

  /**
   * Obtengo los goles de cada equipo
   */
  const golesEquipo1 =
    partido.goles.find((g) => g.equipo === partido.goles[0].equipo)?.goles || 0;
  const golesEquipo2 =
    partido.goles.find((g) => g.equipo !== partido.goles[0].equipo)?.goles || 0;

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-header text-center bg-primary text-white">
        <h5 className="m-0">{partido.partido}</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-4 text-center">
            <p className="display-4">{golesEquipo1}</p>
          </div>
          <div className="col-4 text-center">
            <h6>VS</h6>
            <p className="text-muted">Resultado</p>
          </div>
          <div className="col-4 text-center">
            <p className="display-4">{golesEquipo2}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Partido;

