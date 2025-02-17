import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../services/api";
import Spinner from "../../components/Spinner";

function DetallePartidoPage() {
    /**
     * Estado para almacenar el estado partido
     * Estado para recoger la ruta del header
     * Estado para que cambie cuando cargue los datos en la api
     */
  const [partido, setPartido] = useState();
  const location = useLocation();
  const [cargando, setCargando] = useState(true);

  /**
   * Se ejecutará la carga de la api cuando cambie la ruta del header con el location
   */
  useEffect(() => {
    const obtenerPartido = async () => {
      try {
        const resultado = await api.get(location.pathname);
        console.log(resultado.data.partidos);
        if (resultado.data.status === "success") {
          setPartido(resultado.data.partidos);
          setCargando(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    obtenerPartido();
  }, [location]);

  /**
   * Si no se ha cargado los datos del partido, se mostrará un spinner
   */
  if (cargando) {
    return <Spinner></Spinner>;
  }

  /**
   * Función para obtener el acta de un equipo, si no pongo nada, recogerá los inicio de partido y final
   * @param {String} equipo 
   * @returns 
   */
  function obtenerActaEquipo(equipo = null) {
    return partido.actas.filter((p) => p.equipo === equipo);
  }

  /**
   * Guardo los actas de los equipos y de los inicio y final de partido en constantes
   */
  const actaEquipoLocal = obtenerActaEquipo(partido["equipo local"]);
  const actaEquipoVisitante = obtenerActaEquipo(partido["equipo visitante"]);
  const actaInicioFin = obtenerActaEquipo();

  return (
    <>
      <section className="container-fluid w-75">
        {/**
         * Titulo de la página
         */}
        <div className="row">
            <div className="col-12">
                <h2 className=" mt-5 text-center">Acta {partido["equipo local"]} vs {partido["equipo visitante"]}</h2>
            </div>
        </div>

        {/**Enfrentamiento con los logos de los equipos */}
        <div className="row mt-3">
          <div className="col-6 d-flex flex-row justify-content-around align-items-center border border-dark">
            <img
              src={"../../src/assets/imagenes/img1.jpg"}
              alt="imagenPatrocinador"
              className="img-fluid"
              style={{ width: "30%" }}
            />
          </div>
          <div className="col-6 d-flex flex-row border justify-content-around align-items-center border-dark">
            <img
              src={"../../src/assets/imagenes/img1.jpg"}
              alt="imagenPatrocinador"
              className="img-fluid"
              style={{ width: "30%" }}
            />
          </div>
        </div>

        {/**
         * Incidencias de cada equipo
         */}
        <div className="row mt-3">
          <div className="col-4 d-flex flex-column justify-content-center align-items-center border border-dark">
            {/**
             * Incidencia del equipo local
             */}
            {console.log(actaEquipoLocal)}
            {actaEquipoLocal.map((valor, indice) => {
              return (
                <>
                  <p key={indice}>
                    {valor.incidencia} Minuto: {valor.minuto}
                  </p>
                </>
              );
            })}
          </div>
          {/**
           * Resultado del Enfrentamiento 
           */}
          <div className="col-4 d-flex justify-content-center align-items-center border border-dark">
          <p className="display-4 text-center align-self-center border border-dark">{partido["goles local"]} - {partido["goles visitante"]}</p>
          </div>

          <div className="col-4 d-flex flex-column border justify-content-center align-items-center  border-dark">

            {/**
             * Incidencias del equipo visitante
             */}
            {console.log(actaEquipoVisitante)}
            {actaEquipoVisitante.map((valor, indice) => {
              return (
                <>
                  <p key={indice}>
                    {valor.incidencia} Minuto: {valor.minuto}
                  </p>
                </>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
export default DetallePartidoPage;
