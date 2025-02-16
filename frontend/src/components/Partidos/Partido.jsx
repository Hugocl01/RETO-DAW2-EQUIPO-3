/**
 * Componente para cada partido
 * @param {*} param0
 * @returns
 */
function Partido({ tipo, objPartido }) {
  const partido = objPartido;

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-header text-center bg-primary text-white">
        {/**
         *  Muestro el tipo de partido si no es 'clasificatorio'
         */}
        {tipo !== "clasificatorio" ? <h4>{partido.tipo.toUpperCase()}</h4> : ""}
        <h5 className="m-0">{`Partido: ${partido["equipo local"]} vs ${partido["equipo visitante"]}`}</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-4 text-center">
            <p className="display-4">{partido["goles local"]}</p>
          </div>
          <div className="col-4 text-center">
            <h6>VS</h6>
            <p className="text-muted">Resultado</p>
          </div>
          <div className="col-4 text-center">
            <p className="display-4">{partido["goles visitante"]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Partido;
