import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import TablaPartidos from "../../components/Partidos/TablaPartidos";
import Error from "../../components/Error"
import "../../core/CSS/PartidosPage.css";
import "../../components/css/EstilosComun.css";
import fetchData from "../../data/FetchData";

/**
 * Página `PartidosPage` que muestra los resultados de los partidos, permitiendo filtrar por tipo (clasificatorio o eliminatorias) y grupo (A o B).
 *
 * @component
 * @returns {JSX.Element} - Elemento JSX que representa la página de partidos.
 */
function PartidosPage() {
  /**
   * Estado para almacenar la lista de partidos.
   * @type {Array}
   */
  const [partidos, setPartidos] = useState(null);

  /**
   * Estado para almacenar la opción seleccionada de tipo de partido (clasificatorio o eliminatorias).
   * @type {string}
   */
  const [opcionPartidos, setOpcionPartidos] = useState("");

  /**
   * Estado para almacenar la opción seleccionada de grupo (A o B).
   * @type {string}
   */
  const [opcionGrupos, setGrupos] = useState("A");

  /**
   * Estado para indicar si la página está cargando.
   * @type {boolean}
   */
  const [cargando, setCargando] = useState(true);

  /**
   * Estado para almacenar errores.
   * @type {Object}
   */
  const [error, setError] = useState();

  /**
   * Efecto que se ejecuta al cargar el componente.
   * Obtiene los partidos desde la API o desde la sesión de almacenamiento.
   */
  useEffect(() => {
    const obtenerPartidos = async () => {
      try {
        const listaPartidos = await fetchData("partidos");

        if (
          listaPartidos.status === "success" &&
          Array.isArray(listaPartidos.partidos)
        ) {
          sessionStorage.setItem(
            "partidos",
            JSON.stringify(listaPartidos.partidos)
          );
          setPartidos(listaPartidos.partidos);
        } else {
          setError({
            tipo: listaPartidos.status,
            mensaje: "Hubo un problema al obtener los partidos.",
          });
        }
      } catch (error) {
        setError({ tipo: error.name, mensaje: "No hay partidos" });
      } finally {
        setCargando(false);
      }
    };

    const obtenerPartidosSession = sessionStorage.getItem("partidos");
    /**
     * Si hay datos en la sessionStorage, utilizo esos datos y la asigno al estado equipo
     * Si no hay datos, realizo la llamada a la api
     */
    if (obtenerPartidosSession) {
      const partidosSession = JSON.parse(obtenerPartidosSession);
      if (partidosSession.length === 0) {
        setError({ tipo: "NoData", mensaje: "No hay partidos disponibles" });
      } else {
        setPartidos(partidosSession);
      }
      setCargando(false);
    } else {
      obtenerPartidos();
    }
    window.scrollTo(0, 0);
  }, []);

  /**
   * Enseño la página de error, cuando haya una página de error
   */
  if (error) {
    return <Error tipo={error.tipo} mensaje={error.mensaje} />;
  }

  /**
   * Mientras cargue, muestro el spinner
   */
  if (cargando) {
    return <Spinner />;
  }

  /**
   * Manejador para los cambios que se produzcan en los selectores
   * 
   * @param {Event} e - Evento de cambio en los selectores.
   */
  function handleChange(e) {
    const seleccion = e.target.dataset.seleccion;
    const valor = e.target.value;

    if (seleccion === "partidos") {
      setOpcionPartidos(valor);
    } else if (seleccion === "") {
      setOpcionPartidos("");
    } else {
      setGrupos(valor);
    }
  }

  /**
   * Si no hay partidos, mostramos un mensaje.
   */
  if (!partidos || partidos.length === 0) {
    return (
      <section className="container-fluid my-5 mx-auto w-75 min-vh-100">
        <div className="row">
          <h1 className="mx-auto w-auto text-center">Resultados</h1>
        </div>
        <section className="row mt-4">
          <p className="text-center">No hay partidos disponibles en este momento.</p>
        </section>
      </section>
    );
  }

  return (
    <>
      <section className="container-fluid my-5 mx-auto w-75 min-vh-100">
        <div className="row">
          <h1 className="mx-auto w-auto text-center">Resultados</h1>
        </div>

        <section className="p-3 mb-5 row my-3 bg-primary rounded-top">
          <h5 className="mb-3 text-white font-weight-bold">Filtros</h5>
          <div className="col-12 col-md-6 d-flex flex-column flex-md-row justify-content-between">
            <select
              className="form-select mb-2 mb-md-0"
              aria-label="Default select example"
              data-seleccion="partidos"
              value={opcionPartidos}
              onChange={handleChange}
            >
              <option value="">Selecciona tipo</option>
              <option value="clasificatorio">Clasificatorio</option>
              <option value="eliminatorias">Eliminatorias</option>
            </select>

            {opcionPartidos === "clasificatorio" && (
              <select
                className="form-select"
                aria-label="Default select example"
                data-seleccion="grupos"
                value={opcionGrupos}
                onChange={handleChange}
              >
                <option value="A">Grupo A</option>
                <option value="B">Grupo B</option>
              </select>
            )}
          </div>
        </section>

        <section className="row">
          <TablaPartidos
            tipo={opcionPartidos}
            grupo={opcionGrupos}
            partidos={partidos}
          />
        </section>
      </section>
    </>
  );
}

export default PartidosPage;
