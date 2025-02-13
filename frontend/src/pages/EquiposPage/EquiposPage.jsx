import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Equipo from "../../components/Equipo";
import api from "../../services/api.js";
import Spinner from "../../components/Spinner.jsx";

/**
 * Página del Listado de Equipos
 */
function EquiposPage() {
  /**
   * Estado para manejar los equipos
   */
  const [equipos, setEquipos] = useState();

  /**
   * Sirve para redireción de páginas
   */
  const navegar = useNavigate();

  /**
   * Cargará los equipos en cuantos se cargue el componente
   */
  useEffect(() => {
    const obtenerListadoEquipos = async () => {
      try {
        const resultado = await api.get("/equipos");
        if (resultado.data.status === "success") {
          setEquipos(resultado.data.equipos);
        }
      } catch (error) {
        console.error(error);
      }
    };

    obtenerListadoEquipos();
  }, []);

  /**
   * Mientras no estén cargados los equipos, muestre un spinner
   */
  if(!equipos){
    return <Spinner></Spinner>
  }

  /**
   * Función que envuelve le useNavigate y que me sirve para navegar a la página de detalles del equipo
   * @param {int} id
   */
  function navegarDetalleEquipo(id) {
    navegar(`/equipos/${id}`);
  }

  return (
    <>
        <section className="container-fluid py-5">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <h1>Listado de Equipos</h1>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-md-2 g-4">
            {/**
             * Recorro los equipos y muestro la información con el componente equipo
             * Al componente equipo le paso el key que es identificador único del componente con el id del equipo
             * El nombre del equipo
             * La función navegarDetalleEquipo que se la pasaré al componente
             */}
            {equipos.map((equipo) => (
              <Equipo
                key={equipo.id}
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
