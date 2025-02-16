import { useEffect, useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Jugador from "./Jugador";
import Paginador from "../Paginador";
import Spinner from "../Spinner";

function TablaJugadores() {
  /**
   * Estados Para jugadores, la página en la que se encuentra el usuario
   * Para el total de Jugadores que hay
   * Para controlar que no me muestre la tabla de jugadores hasta que no estén cargadps
   */
  const [jugadores, setJugadores] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalJugadores, setTotalJugadores] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [orden, setOrden] = useState({ campo: "", direccion: "asc" });
  const navegar = useNavigate();
  const jugadoresPorPagina = 10;
  let totalPaginas = Math.ceil(totalJugadores / jugadoresPorPagina);

  /**
   * Se ejecutará al cargar el componente
   */
  useEffect(() => {
    const cargarJugadores = async () => {
      try {
        const resultado = await api.get("/jugadores");
        if (resultado.data.status === "success") {
          let listaJugadores = resultado.data.jugadores;

          /**
           * Filtro por el máximo goleador
           */
          let jugadoresFiltrado = listaJugadores.sort((jugadorA, jugadorB) => {
            return jugadorB.stats.goles - jugadorA.stats.goles;
          });
          setJugadores(jugadoresFiltrado);
          setTotalJugadores(resultado.data.jugadores.length);
          setCargando(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    cargarJugadores();
  }, []);

  /**
   * Mientras esté el estado de cargando, se mostrará el spinner
   */
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

  /**
   * Función que envuelve le useNavigate y que me sirve para navegar a la página de detalles del jugador
   */
  function navegarDetalleJugador(idJugador){
    navegar(`/jugadores/${idJugador}`)
  }

  /**
   * Funcion para la paginador, me mostrará los jugadores de la página actual que verá el usuario
   * @param {[]} jugadores
   * @param {int} paginaActual
   * @param {int} jugadoresPorPagina
   * @returns
   */
  function obtenerJugadoresPaginados(
    jugadores,
    paginaActual,
    jugadoresPorPagina
  ) {
    /**
     * Obtengo el primer y ultimo jugador de la página
     */
    const ultimoJugador = paginaActual * jugadoresPorPagina;
    const primerJugador = ultimoJugador - jugadoresPorPagina;

    /**
     * Muestro los jugadores desde el primer hasta el ultimo de la página
     */
    return jugadores.slice(primerJugador, ultimoJugador);
  }

  /**
   * Método que avanza a la siguiente página
   */
  const siguientePagina = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
    }
  };

  /**
   * Metodo que retrocede a la anterior página
   */
  const paginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

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
    const jugadoresOrdenados = jugadores.sort((jugadorA, jugadorB) => {
      /**
       * Guardo los valores del jugadorA y jugadorB para luego ordenar por el campo específico
       */
      let valorJugadorA = jugadorA.stats[campo];
      let valorJugadorB = jugadorB.stats[campo];

      /**
       * Dependiendo de si se la direccion del ordenamiento es asc o desc, se ordenará de mayor a menor o menor a mayor
       */
      return direccion === "asc"
        ? valorJugadorA - valorJugadorB
        : valorJugadorB - valorJugadorA;
    });

    setJugadores(jugadoresOrdenados);
    setPaginaActual(1);
  }

  return (
    <>
      {/* Cabecera */}
      <div className="row bg-light border-bottom py-2">
        <div className="col-3 text-center font-weight-bold">Nombre</div>
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
      {obtenerJugadoresPaginados(
        jugadores,
        paginaActual,
        jugadoresPorPagina
      ).map((valor) => (
        <Jugador
          key={valor.id}
          jugador={valor}
          fnNavegarEquipo={navegarDetalleEquipo}
          fnNavegarJugador={navegarDetalleJugador}
        />
      ))}

      {/* Paginador */}
      <Paginador
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        siguientePagina={siguientePagina}
        paginaAnterior={paginaAnterior}
      />
    </>
  );
}

export default TablaJugadores;
