import { useEffect, useState } from "react";
import api from "../../services/api";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";
import Equipo from "../Tablas/Equipo";

function TablaEquipos() {
  const [equipos, setEquipos] = useState();
  const [cargando, setCargando] = useState(true);
  const [orden, setOrden] = useState({ campo: "", direccion: "asc" });
  const navegar = useNavigate();

  useEffect(() => {
    const obtenerEquipos = async () => {
      try {
        const resultado = await api.get("/equipos");
        if (resultado.data.status === "success") {
          let listaEquipos = resultado.data.equipos;
          /**
           * Filtro por el máximo goleador
           */
          let equiposFiltrado = listaEquipos.sort((equipoA, equipoB) => {
            return equipoB.stats.goles - equipoA.stats.goles;
          });
          setEquipos(equiposFiltrado);
          setCargando(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    obtenerEquipos();
  }, []);

  if (cargando) {
    return <Spinner></Spinner>;
  }

  /**
   * Función que envuelve le useNavigate y que me sirve para navegar a la página de detalles del equipo
   * @param {int} id
   */
  function navegarDetalleEquipo(id) {
    navegar(`/equipos/${id}`);
  }

  /**Función para ordenar un campo */
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
      {/* Cabecera */}
      <div className="row bg-light border-bottom py-2">
        <div className="col-3 text-center font-weight-bold">Equipo</div>
        <div
          className="col-3 text-center font-weight-bold"
          data-campo="goles"
          onClick={ordenarCampo}
        >
          Goles
        </div>
        <div
          className="col-3 text-center font-weight-bold"
          data-campo="tarjetas_amarillas"
          onClick={ordenarCampo}
        >
          Tarjetas Amarillas
        </div>
        <div
          className="col-3 text-center font-weight-bold"
          data-campo="tarjetas_rojas"
          onClick={ordenarCampo}
        >
          Tarjetas Rojas
        </div>
      </div>

      {/* Jugadores de la página actual */}
      {equipos.map((valor) => (
        <Equipo
          key={valor.id}
          equipo={valor}
          fnNavegar={navegarDetalleEquipo}
        ></Equipo>
      ))}
    </>
  );
}

export default TablaEquipos;
