import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Equipo from "../../components/Equipo";
import api from "../../services/api.js";
import Spinner from "../../components/Spinner.jsx";
import ErrorPage from "../ErrorPage.jsx";
import "../../../src/components/css/EstilosComun.css";
import fetchData from "../../data/FetchData.js";

/**
 * Página de Equipos.
 *
 * Esta página obtiene y muestra una lista de equipos.
 *
 * @component
 * @returns {JSX.Element} - Renderiza la lista de equipos o una página de error.
 */
function EquiposPage() {
  const [equipos, setEquipos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navegar = useNavigate();

  useEffect(() => {

    /**
     * Funcion envoltorio para realizar llamada a la api
     */
    const obtenerListadoEquipos = async () => {
      try {
        const resultado = await fetchData("equipos");
        /**
         * Si el resultado de la llamada es success y la respuesta es un array guardo los datos en el estado y en la sessionStorage
         */
        if (resultado.status === "success" && Array.isArray(resultado.equipos)) {
          setEquipos(resultado.equipos);
          sessionStorage.setItem("equipos", JSON.stringify(resultado.equipos));
        } else {
          /**
           * Si da fallo, recojo el error
           */
          setError({
            tipo: "error",
            mensaje: "Hubo un problema al obtener los equipos.",
          });
        }
      } catch (error) {
        /**
         * Recojo cualquier tipo de error que me recoja el catch
         */
        setError({
          tipo: error.response?.status || error.name,
          mensaje: error.response?.data?.message || "No hay equipos disponibles.",
        });
      } finally {
        /**
         * Salte el catch o no, se dejará de cargar la página
         */
        setCargando(false);
      }
    };

    /**
     * Recojo los valores de la sessionStorage
     */
    const equiposGuardados = sessionStorage.getItem("equipos");

    /**
     * Si hay datos guardados de equipos, guardo los valores en la sessionstorage
     * Si no hay datos, realizo la llamada a la api
     */
    if (equiposGuardados) {
      setEquipos(JSON.parse(equiposGuardados));
      setCargando(false);
    } else {
      obtenerListadoEquipos();
    }

    /**
     * Esto me llevará al principio de la página
     */
    window.scrollTo(0, 0);
  }, []);
  /**
   * Enseño la página de error, cuando haya una página de error
   */
  if (error) {
    return <ErrorPage tipo={error.tipo} mensaje={error.mensaje} />;
  }

  /**
   * Mientras cargue la respuesta de la api, muestro un spinner
   */
  if (cargando) {
    return <Spinner />;
  }

  /**
   * Navega a la página de detalles equipo
   * @param {String} slug
   */
  function navegarDetalleEquipo(slug) {
    navegar(`/equipos/${slug}`);
  }

  return (
    <>
      <title>Equipos</title>
      <section className="container-fluid w-75" id="equipos">
        <div className="row mb-4">
          <div className="d-flex justify-content-center align-items-center">
            <h1>Listado de Equipos</h1>
          </div>
        </div>
        <div className="row d-flex justify-content-center align-items-center row-cols-1 row-cols-md-3 g-5">
          {equipos.map((equipo) => (
            <Equipo
              key={equipo.slug}
              equipoObtenido={equipo}
              fnNavegar={navegarDetalleEquipo}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default EquiposPage;
