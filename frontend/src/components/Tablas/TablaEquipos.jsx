import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";
import Equipo from "../Tablas/Equipo";
import "../../components/css/Tabla.css";
import "../css/JugadorEquipo.css";
import ErrorPage from "../Error";
import fetchData from "../../data/FetchData";

/**
 * Componente para mostrar una tabla de equipos con sus estadísticas.
 * Permite ordenar los equipos por goles, tarjetas amarillas y tarjetas rojas.
 *
 * @component
 * @returns {JSX.Element} Componente de tabla de equipos.
 */
function TablaEquipos() {
  const [equipos, setEquipos] = useState();
  const [cargando, setCargando] = useState(true);
  const [orden, setOrden] = useState({ campo: "", direccion: "asc" });
  const [error, setError] = useState();
  const navegar = useNavigate();

  // Efecto para cargar los equipos al montar el componente
  useEffect(() => {
    const obtenerEquipos = async () => {
      try {
        const resultado = await fetchData("equipos");

        if (
          resultado.status === "success" &&
          Array.isArray(resultado.equipos)
        ) {
          // Guardar los datos en sessionStorage
          sessionStorage.setItem(
            "equipos",
            JSON.stringify(resultado.equipos)
          );

          /**
           * Ordeno antes de guardar en el estado
           */
          const equiposOrdenados = [...resultado.equipos].sort(
            (equipoA, equipoB) => equipoB.stats.goles - equipoA.stats.goles
          );

          setEquipos(equiposOrdenados);
        } else {
          setError({
            tipo: "error",
            mensaje: "Hubo un problema al obtener los equipos.",
          });
        }
      } catch (error) {
        setError({
          tipo: error.response?.status || error.name,
          mensaje:
            error.response?.data?.message || "No hay equipos disponibles.",
        });
      } finally {
        setCargando(false);
      }
    };

    /**
     * Obtener datos desde sessionStorage
     */
    const equiposGuardados = sessionStorage.getItem("equipos");

    if (equiposGuardados) {
      /**
       * Convierto en ObjetoJSON antes de ordenar
       */
      const equiposOrdenados = JSON.parse(equiposGuardados).sort(
        (equipoA, equipoB) => equipoB.stats.goles - equipoA.stats.goles
      );

      setEquipos(equiposOrdenados);
      setCargando(false);
    } else {
      obtenerEquipos();
    }

    /**
     * Esto me llevará al principio de la página
     */
    window.scrollTo(0, 0);
  }, []);


  if (cargando) {
    return <Spinner></Spinner>;
  }

  /**
  * Enseño la página de error, cuando haya una página de error
  */
  if (error) {
    return <ErrorPage tipo={error.tipo} mensaje={error.mensaje} />;
  }

  /**
   * Función para navegar a la vista detallada de un equipo.
   *
   * @param {string} slug - Identificador único del equipo.
   */
  function navegarDetalleEquipo(slug) {
    navegar(`/estadisticas/${slug}`);
  }

  /**
   * Función para ordenar los equipos por un campo específico.
   *
   * @param {Object} e - Evento del clic.
   */
  function ordenarCampo(e) {
    let campo = e.target.dataset.campo;
    /**
     * Controlo que si vamos a modificar el estado que ya está ordenado asc, me lo ordene desc
     * Si el campo no está ordenado, pues me lo ordene ascendentemente
     */
    const direccion =
      orden.campo === campo && orden.direccion === "asc" ? "desc" : "asc";
    setOrden({ campo, direccion });

    /**
     *  Utilizo el sort para ordenar
     */
    const equiposOrdenados = equipos.sort((equipoA, equipoB) => {
      /**
       * Guardo los valores del jugadorA y jugadorB para luego ordenar por el campo específico
       */
      let valorEquipoA = equipoA.stats[campo];
      let valorEquipoB = equipoB.stats[campo];

      /**
       * Dependiendo de si se la direccion del ordenamiento es asc o desc, se ordenará de mayor a menor o menor a mayor
       */
      return direccion === "asc"
        ? valorEquipoA - valorEquipoB
        : valorEquipoB - valorEquipoA;
    });

    setEquipos(equiposOrdenados);
  }

  return (
    <>
      <div className="tabla container-fluid mt-5">
        {/* Cabecera */}
        <div className="row bg-primary text-white rounded-top border-bottom py-2">
          <div className="col-md-6 text-center font-weight-bold cursor-pointer h5">
            Nombre
          </div>
          <div
            className="col-md-2 text-center cursor-pointer h5"
            data-campo="goles"
            onClick={ordenarCampo}
          >
            Goles{" "}
            {orden.campo === "goles"
              ? orden.direccion === "asc"
                ? "⬆"
                : "⬇"
              : ""}
          </div>
          <div
            className="col-md-2 text-center cursor-pointer h5"
            data-campo="tarjetas_amarillas"
            onClick={ordenarCampo}
          >
            Amarillas{" "}
            {orden.campo === "tarjetas_amarillas"
              ? orden.direccion === "asc"
                ? "⬆"
                : "⬇"
              : ""}
          </div>
          <div
            className="col-md-2 text-center cursor-pointer h5"
            data-campo="tarjetas_rojas"
            onClick={ordenarCampo}
          >
            Rojas{" "}
            {orden.campo === "tarjetas_rojas"
              ? orden.direccion === "asc"
                ? "⬆"
                : "⬇"
              : ""}
          </div>
        </div>

        {/* Equipos de la página actual */}
        {equipos.map((valor, id) => (
          <Equipo
            key={id}
            equipo={valor}
            fnNavegar={navegarDetalleEquipo}
          ></Equipo>
        ))}
      </div>
    </>
  );
}

export default TablaEquipos;
