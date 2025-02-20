import { Tooltip } from "react-tooltip";

function Equipo({ equipo, fnNavegar }) {
  function handleClickNavegar() {
    fnNavegar(equipo.slug);
  }
  console.log(equipo);
  return (
    <div className="row border-bottom py-2">
      <div className="col-3 d-flex flex-row justify-content-center text-center">
        <div className="d-flex flex-row w-75 ">
          <img
            src="../src/assets/imagenes/img1.jpg"
            alt={`imagen${equipo.slug}`}
            style={{ width: "20%" }}
            data-tooltip-id="imgEquipo"
            data-tooltip-content={equipo.nombre}
            data-tooltip-float
            onClick={handleClickNavegar}
          />
          <Tooltip id="imgEquipo"></Tooltip>
          <p className="mx-3">{equipo.slug}</p>
        </div>
      </div>
      <div className="col-3 text-center">{equipo.stats.goles}</div>
      <div className="col-3 text-center">{equipo.stats.tarjetas_amarillas}</div>
      <div className="col-3 text-center">{equipo.stats.tarjetas_rojas}</div>
    </div>
  );
}

export default Equipo;
