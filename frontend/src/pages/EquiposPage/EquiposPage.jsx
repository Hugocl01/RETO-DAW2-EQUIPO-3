import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Equipo from "../../components/Equipo";
import api from "../../services/api.js";
import Spinner from "../../components/Spinner.jsx";
import ErrorPage from "../ErrorPage.jsx";
import "../../../src/components/css/EstilosComun.css";


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
    const obtenerListadoEquipos = async () => {
      try {
        const resultado = await api.get("/equipos");
        console.log(resultado);
        if (
          resultado.data.status === "success" &&
          Array.isArray(resultado.data.equipos)
        ) {
          setEquipos(resultado.data.equipos);
        } else {
          setError({
            tipo: resultado.data.status,
            mensaje: "Hubo un problema al obtener los equipos.",
          });
        }
      } catch (error) {
        setError({ tipo: error.name, mensaje: "No hay equipos" });
      } finally {
        setCargando(false);
      }
    };

    obtenerListadoEquipos();
    window.scrollTo(0,0);
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
      <section className="container-fluid py-5 w-75" id="equipos">
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
