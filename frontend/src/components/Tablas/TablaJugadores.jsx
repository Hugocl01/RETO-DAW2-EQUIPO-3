import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Jugador from "./Jugador";
import Paginador from "../Paginador";
import Spinner from "../Spinner";
import "../../components/css/Tabla.css";
import ErrorPage from "../Error";
import fetchData from "../../data/FetchData";

function TablaJugadores() {
  /**
   * Creo varios estados
   * Estado para guardar la lista de jugadores
   * Estado para guardar la página actual en la que se encuentra el usuario
   * Estado para guardar el número de jugadores que hay en total
   * Estado para cuando, esté cargando los datos de la api, aparezca un spinner
   * Estado para guardar el orden de filtrado, con la columna afectada
   * Estado para guardar el nombre del jugador que introduzco en el filtro
   */
  const [jugadores, setJugadores] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalJugadores, setTotalJugadores] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [orden, setOrden] = useState({ campo: "", direccion: "asc" });
  const [filtro, setFiltro] = useState("");
  const [error, setError] = useState();
  const navegar = useNavigate();

  /**
   * Número de jugadores a mostrar en cada página
   */
  const jugadoresPorPagina = 10;

  /**
   * Se ejecutará en cuanto cargue la página
   */
  useEffect(() => {
    const cargarJugadores = async () => {
      try {
        const resultado = await fetchData("jugadores");
        if (resultado.status === "success") {
          sessionStorage.setItem("jugadores", JSON.stringify(resultado.jugadores));

          const jugadoresOrdenados = [...resultado.jugadores].sort(
            (equipoA, equipoB) => equipoB.stats.goles - equipoA.stats.goles
          );

          setJugadores(jugadoresOrdenados);
          setTotalJugadores(jugadoresOrdenados.length);
        } else {
          setError({ tipo: "error", mensaje: "Hubo un problema al obtener los jugadores." });
        }
      } catch (error) {
        setError({
          tipo: error.response?.status || error.name,
          mensaje: error.response?.data?.message || "No hay jugadores disponibles.",
        });
      } finally {
        setCargando(false);
      }
    };

    const jugadoresGuardados = sessionStorage.getItem("jugadores");
    if (jugadoresGuardados) {
      const jugadoresOrdenados = JSON.parse(jugadoresGuardados).sort(
        (equipoA, equipoB) => equipoB.stats.goles - equipoA.stats.goles
      );

      setJugadores(jugadoresOrdenados);
      setTotalJugadores(jugadoresOrdenados.length);
      setCargando(false);
    } else {
      cargarJugadores();
    }

    window.scrollTo(0, 0);
  }, []);

  /**
   * Mientras cargue los datos, muestro el spinner
   */

  if (cargando) {
    return <Spinner />;
  }

  /**
  * Enseño la página de error, cuando haya una página de error
  */
  if (error) {
    return <ErrorPage tipo={error.tipo} mensaje={error.mensaje} />;
  }

  function navegarDetalleEquipo(slug) {
    navegar(`/estadisticas/${slug}`);
  }

  /**
   * Función envoltorio de navegar que redirecciona a la página de detalle jugador
   * @param {String} slug 
   * @param {String} tipo
   */
  function navegarDetalleJugador(slug) {
    navegar(`/estadisticas/${slug}`);
  }

  /**
   * Función que obtiene los jugadores de cada página
   */
  function obtenerJugadoresPaginados(jugadores, paginaActual, jugadoresPorPagina) {
    const ultimoJugador = paginaActual * jugadoresPorPagina;
    const primerJugador = ultimoJugador - jugadoresPorPagina;
    return jugadores.slice(primerJugador, ultimoJugador);
  }

  /**
   * Función que avanza a la siguiente página
   */
  const siguientePagina = () => {
    if (paginaActual < Math.ceil(totalJugadores / jugadoresPorPagina)) {
      setPaginaActual(paginaActual + 1);
    }
  };

  /**
   * Función que retrocede a la página anterior
   */
  const paginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  /**
   * Función que dependiendo de la columna, se ordenará de mayor a menor o menor a mayor al lista de jugadores
   * @param {*} e 
   */
  function ordenarCampo(e) {
    let campo = e.currentTarget.dataset.campo;
    const direccion = orden.campo === campo && orden.direccion === "asc" ? "desc" : "asc";
    setOrden({ campo, direccion });

    const jugadoresOrdenados = [...jugadores].sort((a, b) => {
      let valorA = a.stats[campo] || 0;
      let valorB = b.stats[campo] || 0;
      return direccion === "asc" ? valorA - valorB : valorB - valorA;
    });

    setJugadores(jugadoresOrdenados);
    setPaginaActual(1);
  }

  /**
   * Funcion manejadora para el change del filtro
   * @param {} e 
   */
  function handlerChange(e) {
    setFiltro(e.target.value.toLowerCase());
    setPaginaActual(1);
  }

  /**
   * Devuelve el jugador si hay una coincidencia en el valor del filtro
   */
  const jugadoresFiltrados = jugadores.filter(jugador =>
    jugador.nombre.toLowerCase().includes(filtro)
  );


  return (
    <>
      <div className="tabla container-fluid mt-5">
        <div className="row">
          <div className="col-md-12 p-0 mb-4 w-100 border">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre..."
              onChange={handlerChange}
            />
          </div>
        </div>
        <div className="row bg-primary text-white rounded-top border-bottom py-2">
          <div className="col-5 col-md-6 text-center font-weight-bold cursor-pointer h5">
            <p>Nombre</p>
          </div>
          <div className="col-3 col-md-2 text-center cursor-pointer h5" data-campo="goles" onClick={ordenarCampo}>
            <p>Goles</p> {orden.campo === "goles" ? (orden.direccion === "asc" ? "⬆" : "⬇") : ""}
          </div>
          <div className="col-2 col-md-2 text-center cursor-pointer h5" data-campo="tarjetas_amarillas" onClick={ordenarCampo}>
            <p>Amarillas</p> {orden.campo === "tarjetas_amarillas" ? (orden.direccion === "asc" ? "⬆" : "⬇") : ""}
          </div>
          <div className="col-2 col-md-2 text-center cursor-pointer h5" data-campo="tarjetas_rojas" onClick={ordenarCampo}>
            <p>Rojas</p> {orden.campo === "tarjetas_rojas" ? (orden.direccion === "asc" ? "⬆" : "⬇") : ""}
          </div>
        </div>
        {obtenerJugadoresPaginados(jugadoresFiltrados, paginaActual, jugadoresPorPagina).map(jugador => (
          <Jugador key={jugador.slug} jugador={jugador} fnNavegarEquipo={navegarDetalleEquipo} fnNavegarJugador={navegarDetalleJugador} />
        ))}
        <Paginador
          paginaActual={paginaActual}
          totalPaginas={Math.ceil(jugadoresFiltrados.length / jugadoresPorPagina)}
          siguientePagina={siguientePagina}
          paginaAnterior={paginaAnterior}
        />
      </div >
    </>
  );
}

export default TablaJugadores;