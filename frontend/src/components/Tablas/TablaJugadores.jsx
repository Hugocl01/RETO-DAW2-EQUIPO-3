import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Jugador from "./Jugador";
import Paginador from "../Paginador";
import Spinner from "../Spinner";
import "../../components/css/Tabla.css"

function TablaJugadores() {
  const [jugadores, setJugadores] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalJugadores, setTotalJugadores] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [orden, setOrden] = useState({ campo: "", direccion: "asc" });
  const navegar = useNavigate();
  const jugadoresPorPagina = 10;
  let totalPaginas = Math.ceil(totalJugadores / jugadoresPorPagina);

  useEffect(() => {
    const cargarJugadores = async () => {
      try {
        const resultado = await api.get("/jugadores");
        if (resultado.data.status === "success") {
          let listaJugadores = resultado.data.jugadores;

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

  if (cargando) {
    return <Spinner />;
  }

  function navegarDetalleEquipo(slug) {
    console.log(slug);
    navegar(`/equipos/${slug}`);
  }

  function navegarDetalleJugador(slug) {
    navegar(`/jugadores/${slug}`);
  }

  function obtenerJugadoresPaginados(jugadores, paginaActual, jugadoresPorPagina) {
    const ultimoJugador = paginaActual * jugadoresPorPagina;
    const primerJugador = ultimoJugador - jugadoresPorPagina;
    return jugadores.slice(primerJugador, ultimoJugador);
  }

  const siguientePagina = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const paginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  function ordenarCampo(e) {
    let campo = e.currentTarget.dataset.campo;
    const direccion =
      orden.campo === campo && orden.direccion === "asc" ? "desc" : "asc";
    setOrden({ campo, direccion });

    const jugadoresOrdenados = [...jugadores].sort((jugadorA, jugadorB) => {
      let valorJugadorA = jugadorA.stats[campo];
      let valorJugadorB = jugadorB.stats[campo];
      return direccion === "asc"
        ? valorJugadorA - valorJugadorB
        : valorJugadorB - valorJugadorA;
    });

    setJugadores(jugadoresOrdenados);
    setPaginaActual(1);
  }

  return (
    <>
      <div className="container-fluid mt-5">
        {/* Cabecera */}
        <div className="row bg-primary text-white rounded-top border-bottom py-2">
          <div className="col-3 tabla text-center font-weight-bold cursor-pointer ">
            Nombre
          </div>
          <div
            className="col-3 d-flex flex-row justify-content-center align-items-center cursor-pointer "
            data-campo="goles"
            onClick={ordenarCampo}
          >
            <div className="d-flex flex-row w-50 justify-content-center">
              <p className="font-weight-bold h-100 text-center mx-2">Goles</p>
              {orden.direccion === "asc" && orden.campo === "goles" ? (
                <i className="bi bi-arrow-down"></i>
              ) : (
                <i className="bi bi-arrow-up"></i>
              )}
            </div>
          </div>
          <div
            className="col-3 text-center d-flex flex-row justify-content-center align-items-center font-weight-bold cursor-pointer"
            data-campo="tarjetas_amarillas"
            onClick={ordenarCampo}
          >
            <div className="d-flex flex-row w-50 justify-content-center">
              <p className="font-weight-bold h-100 text-center mx-2">Tarjetas Amarillas</p>
              {orden.direccion === "asc" && orden.campo === "tarjetas_amarillas" ? (
                <i className="bi bi-arrow-down"></i>
              ) : (
                <i className="bi bi-arrow-up"></i>
              )}
            </div>
          </div>
          <div
            className="col-3 text-center d-flex flex-row justify-content-center align-items-center font-weight-bold cursor-pointer"
            data-campo="tarjetas_rojas"
            onClick={ordenarCampo}
          >
            <div className="d-flex flex-row w-50 justify-content-center" data-campo="rojas">
              <p className="font-weight-bold h-100 text-center mx-2">Tarjetas Rojas</p>
              {orden.direccion === "asc" && orden.campo === "tarjetas_rojas" ? (
                <i className="bi bi-arrow-down"></i>
              ) : (
                <i className="bi bi-arrow-up"></i>
              )}
            </div>
          </div>
        </div>
  
        {/* Jugadores de la página actual */}
        {obtenerJugadoresPaginados(jugadores, paginaActual, jugadoresPorPagina).map((valor) => (
          <Jugador
            key={valor.slug}
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
      </div>
    </>
  );
  
  
}

export default TablaJugadores;
