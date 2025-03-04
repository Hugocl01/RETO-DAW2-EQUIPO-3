import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../services/api";
import Spinner from "../../components/Spinner";
import fetchData from "../../data/FetchData";

function DetallePartidoPage() {
  /**
   * Estado para almacenar el estado partido
   * Estado para recoger la ruta del header
   * Estado para que cambie cuando cargue los datos en la api
   */
  const [partido, setPartido] = useState();
  const location = useLocation();
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState();

  /**
   * Se ejecutará la carga de la api cuando cambie la ruta del header con el location
   */
  useEffect(() => {
    const obtenerPartido = async () => {
      try {
        let path = location.pathname.startsWith('/') ? location.pathname.substring(1) : location.pathname;
        const resultado = await fetchData(path);
        if (resultado.status === "success") {
          /**
           * Si el resultado es success, guardo los datos del partido en la sessionstorage
           * También guardo el equipo en el estado
           */
          sessionStorage.setItem(
            resultado.partidos.slug,
            JSON.stringify(resultado.partidos)
          );
          setPartido(resultado.partidos);

        } else {
          /**
           * Si me devuelve otro tipo de estado la api, lo recojo en el estado de error
           */
          setError({
            tipo: "error",
            mensaje: "Hubo un problema al obtener el equipo.",
          });
        }
      } catch (error) {
        /**
        * Los errores que me recoja el catch, lo guardo en el estado de error
        */
        setError({
          tipo: error.response?.status || error.name,
          mensaje: error.response?.data?.message || "No existe el partido.",
        });
      }
    };

    /**
    * Cojo el valor del nombre del location
    * Obtengo luego los valores de la session storage con el nombre del equipo
    */
    const nombrePartido = location.pathname.split("/").pop();

    const obtenerPartidoSession = sessionStorage.getItem(nombrePartido);

    /**
     * Si hay datos en la sessioStorage, utilizo esos datos y la asigno al estado equipo
     * Si no hay datos, realizo la llamada a la api
     */
    if (obtenerPartidoSession) {
      setPartido(JSON.parse(obtenerPartidoSession));
      setCargando(false);
    } else {
      obtenerPartido();
    }
  }, [location]);

  /**
   * Si no se ha cargado los datos del partido, se mostrará un spinner
   */
  if (cargando) {
    return <Spinner></Spinner>;
  }

  /**
   * Función para obtener los actas agrupados por minuto con las incidencias de cada equipo en ese minuto
   * @returns
   */
  function obtenerActaAgrupado() {
    let actasAgrupados = {};

    /**
     * Ordeno los actas de menor a mayor por minuto
     */
    let totalActasOrdenado = partido.actas.sort(
      (acta1, acta2) => acta1.minuto - acta2.minuto
    );

    /**
     * Recorro el array de actas ordenado
     */
    totalActasOrdenado.forEach((acta) => {
      /**
       * Si la incidencia es inicio y fin que no haga nada
       */
      if (
        acta.incidencia === "Inicio del partido" ||
        acta.incidencia === "Final del partido"
      ) {
        return;
      }

      /**
       * Me mira si no hay una entrada para ese minuto y me la crea
       */
      if (!actasAgrupados[acta.minuto]) {
        actasAgrupados[acta.minuto] = { local: "", visitante: "" };
      }

      /**
       * Me añade la incidencia dependiendo del equipo
       */
      if (acta.equipo === partido["equipo local"].nombre) {
        actasAgrupados[acta.minuto].local = acta.incidencia;
      } else {
        actasAgrupados[acta.minuto].visitante = acta.incidencia;
      }
      /*
      if (acta.incidencia === "Gol") {
        if (acta.equipo === partido["equipo local"].nombre) {
          setGolesLocal(golesLocal + 1);
        } else {
          setGolesVisitante(golesVisitante + 1);
        }
      } else if (acta.incidencia === "Gol en propia puerta") {
        if (acta.equipo === partido["equipo local"].nombre) {
          setGolesVisitante(golesVisitante + 1);
        } else {
          setGolesLocal(golesLocal + 1);
        }
      }*/
    });

    return actasAgrupados;
  }

  /**
   * Guardo los actas agrupados
   */
  const actas = obtenerActaAgrupado();


  return (
    <>
      <title>Acta {partido.slug}</title>
      <section className="container-fluid w-75">
        {/** Título de la página */}
        <div className="row">
          <div className="col-12">
            <h2 className="mt-5 text-center bg-primary text-white py-3 rounded">
              Acta {partido["equipo local"].nombre} vs {partido["equipo visitante"].nombre}
            </h2>
          </div>
        </div>

        {/** Enfrentamiento con los logos de los equipos y resultado */}
        <div className="row my-5">
          <div className="col-4 d-flex flex-row justify-content-around align-items-center">
            <img
              src={"../../src/assets/imagenes/img1.jpg"}
              alt="imagenPatrocinador"
              className="img-fluid rounded"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-4 d-flex justify-content-center align-items-center">
            <p className="fs-2 w-50 h-50 fw-bold d-flex flex-row justify-content-center align-items-center p-4 bg-dark text-white rounded">
              {partido["goles local"]} - {partido["goles visitante"]}
            </p>
          </div>
          <div className="col-4 d-flex flex-row justify-content-around align-items-center">
            <img
              src={"../../src/assets/imagenes/img1.jpg"}
              alt="imagenPatrocinador"
              className="img-fluid rounded"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        {/** Incidencias de cada equipo */}
        <div className="container-fluid m-0 p-0">
          {/* Inicio del partido */}
          <div className="row text-center fw-bold border border-dark rounded-top bg-success text-white">
            <div className="col-12 fs-5 p-3">Inicio del partido</div>
          </div>

          {/* Incidencias del partido */}
          {/**
           * Me transformará el objeto json de los actas agrupados en un mapa de clave valor
           * Clave será el minuto y valor, las incidencias de los dos equipos
           */}
          {Object.entries(actas).map(([minuto, incidencias]) => (
            <div
              className="row text-center border border-dark bg-light"
              key={minuto}
            >
              <div className="col-4 fs-5 p-3">{incidencias.local}</div>
              <div className="col-4 fs-5 p-3 fw-bold">Minuto: {minuto}</div>
              <div className="col-4 fs-5 p-3">{incidencias.visitante}</div>
            </div>
          ))}

          {/* Fin del partido */}
          <div className="row text-center fw-bold border border-dark rounded-bottom bg-danger text-white">
            <div className="col-12 fs-5 p-3">Fin del partido</div>
          </div>
        </div>
      </section>
    </>
  );
}
export default DetallePartidoPage;
