import { Tooltip } from "react-tooltip";

/**
 * Componente para cada partido
 * @param {*} param0
 * @returns
 */
function Partido({ tipo, objPartido, fnNavegar }) {
  const partido = objPartido;

  function handleClick() {
    fnNavegar(partido.slug);
  }

  /**
   * Creo un identificador único para los accordeones de los partidos
   */
  const collapseId = `collapse-${partido.slug}`;
console.log(partido)
  return (
    <div className="accordion card mb-3 shadow-sm" id={`accordion-${partido.slug}`}>
       {/**
        * Cabecera
        */}
      <div
        className="accordion-button w-100 card-header bg-primary text-white"
        type="button"
        data-bs-toggle="collapse"
        /**Objetivo del target */
        data-bs-target={`#${collapseId}`}
        /**Para que de inicio no esté abierto */
        aria-expanded="false"
        /**Me aparezca la flecha del acordeon */
        aria-controls={collapseId}
      >
        {/**
         * Muestro el tipo de partido si no es 'clasificatorio'
         */}
        {tipo !== "clasificatorio" && tipo!== "" ? <h4>{partido.tipo.toUpperCase()}</h4> : ""}
        <h5 className="w-100 text-center m-0">{`Partido: ${partido["equipo local"]} vs ${partido["equipo visitante"]}`}</h5>
      </div>
      <div
        id={collapseId}
        className="accordion-collapse collapse show"
        /**Tengo que poner la clase padre para recibir la acción del collapse */
        data-bs-parent={`#accordion-${partido.slug}`}
      >
        <div className="card-body">
          <div className="row">
            <div className="col-4 text-center">
              <p className="display-4">{partido["goles local"]}</p>
            </div>
            <div className="col-4 text-center">
              <h6>VS</h6>
              <p className="text-muted">Resultado</p>

              <i
                className="bi bi-clipboard"
                data-tooltip-id="actaPartido"
                data-tooltip-content="Ver Acta"
                onClick={handleClick}
              ></i>
              <Tooltip id="actaPartido"></Tooltip>
            </div>
            <div className="col-4 text-center">
              <p className="display-4">{partido["goles visitante"]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Partido;
