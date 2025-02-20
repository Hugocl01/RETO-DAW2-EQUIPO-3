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
    let actaEquipo = [];
    /**
     * Ordeno los actas de menor a mayor
     */
    let totalActasOrdenado = partido.actas.sort((acta1, acta2) => {
      let minutoActa1 = acta1.minuto;
      let minutoActa2 = acta2.minuto;

      return minutoActa1 - minutoActa2;
    });

    actaEquipo = totalActasOrdenado.map((incidencia) => {
      // Si el equipo de la incidencia coincide con el equipo pasado como parámetro
      if (incidencia.equipo === equipo) {
        return incidencia; // Mantiene la incidencia original
      } else {
        return ""; // Pone un string vacío en las incidencias que no correspondan al equipo
      }
    });

    return actaEquipo;
  }

  /**
   * Guardo los actas de los equipos y de los inicio y final de partido en constantes
   */
  const actaEquipoLocal = obtenerActaEquipo(partido["equipo local"]);
  const actaEquipoVisitante = obtenerActaEquipo(partido["equipo visitante"]);
  const actaInicioFin = obtenerActaEquipo();

  console.log(actaEquipoLocal);
  console.log(actaEquipoVisitante);

  return (
    <>
      <title>Acta {partido.slug}</title>
      <section className="container-fluid w-75">
        {/**
         * Titulo de la página
         */}
        <div className="row">
          <div className="col-12">
            <h2 className=" mt-5 text-center">
              Acta {partido["equipo local"]} vs {partido["equipo visitante"]}
            </h2>
          </div>
        </div>

        {/**Enfrentamiento con los logos de los equipos */}
        <div className="row my-5">
          <div className="col-4 d-flex flex-row justify-content-around align-items-center border border-dark">
            <img
              src={"../../src/assets/imagenes/img1.jpg"}
              alt="imagenPatrocinador"
              className="img-fluid"
              style={{ width: "50%" }}
            />
          </div>
          <div className="col-4"></div>
          <div className="col-4 d-flex flex-row border justify-content-around align-items-center border-dark">
            <img
              src={"../../src/assets/imagenes/img1.jpg"}
              alt="imagenPatrocinador"
              className="img-fluid"
              style={{ width: "50%" }}
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
            {actaEquipoLocal.map((valor, indice) => {
              return (
                <>
                  {valor !== "" ? (
                    <>
                      <p key={indice} className="text-center border border-dark w-100">
                        {valor.incidencia} Minuto: {valor.minuto}
                      </p>
                    </>
                  ) : (
                    <>
                    <p className="text-center border border-dark w-100"><br></br></p>
                    </>
                  )}
                </>
              );
            })}
          </div>
          {/**
           * Resultado del Enfrentamiento
           */}
          <div className="col-4 d-flex justify-content-center align-items-center border border-dark">
            <p className="display-4 text-center align-self-center border border-dark">
              {partido["goles local"]} - {partido["goles visitante"]}
            </p>
          </div>

          <div className="col-4 d-flex flex-column border justify-content-center align-items-center  border-dark">
            {/**
             * Incidencias del equipo visitante
             */}
            {actaEquipoVisitante.map((valor, indice) => {
              return (
                <>
                 {valor !== "" ? (
                    <>
                      <p key={indice} className="text-center border border-dark w-100">
                        {valor.incidencia} Minuto: {valor.minuto}
                      </p>
                    </>
                  ) : (
                    <>
                    <p className="text-center border border-dark w-100"><br></br></p>
                    </>
                  )}
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
