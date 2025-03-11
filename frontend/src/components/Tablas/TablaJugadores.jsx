import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Jugador from "./Jugador";
import Paginador from "../Paginador";
import Spinner from "../Spinner";
import "../../components/css/Tabla.css";
import ErrorPage from "../Error";
import fetchData from "../../data/FetchData";

function TablaJugadores() {
  const [jugadores, setJugadores] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalJugadores, setTotalJugadores] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [orden, setOrden] = useState({ campo: "", direccion: "asc" });
  const [filtro, setFiltro] = useState("");
  const [error, setError] = useState();
  const navegar = useNavigate();

  const jugadoresPorPagina = 10;

  useEffect(() => {
    const cargarJugadores = async () => {
      try {
        const resultado = await fetchData("jugadores");
        if (resultado.status === "success" && resultado.jugadores.length > 0) {
          sessionStorage.setItem("jugadores", JSON.stringify(resultado.jugadores));
          const jugadoresOrdenados = [...resultado.jugadores].sort(
            (equipoA, equipoB) => equipoB.stats.goles - equipoA.stats.goles
          );
          setJugadores(jugadoresOrdenados);
          setTotalJugadores(jugadoresOrdenados.length);
        } else {
          setJugadores([]);
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

  if (cargando) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorPage tipo={error.tipo} mensaje={error.mensaje} />;
  }

  if (jugadores.length === 0) {
    return <div className="alert alert-warning text-center">No hay jugadores disponibles.</div>;
  }

  return (
    <>
      <div className="tabla container-fluid mt-5">
        <div className="row">
          <div className="col-md-12 p-0 mb-4 w-100 border">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre..."
              onChange={(e) => setFiltro(e.target.value.toLowerCase())}
            />
          </div>
        </div>
        <div className="row bg-primary text-white rounded-top border-bottom py-2">
          <div className="col-5 col-md-6 text-center font-weight-bold cursor-pointer h5">
            <p>Nombre</p>
          </div>
          <div className="col-3 col-md-2 text-center cursor-pointer h5" data-campo="goles">
            <p>Goles</p>
          </div>
          <div className="col-2 col-md-2 text-center cursor-pointer h5" data-campo="tarjetas_amarillas">
            <p>Amarillas</p>
          </div>
          <div className="col-2 col-md-2 text-center cursor-pointer h5" data-campo="tarjetas_rojas">
            <p>Rojas</p>
          </div>
        </div>
        {jugadores.length === 0 ? (
          <div className="alert alert-warning text-center">No hay jugadores disponibles.</div>
        ) : (
          jugadores.map((jugador) => (
            <Jugador key={jugador.slug} jugador={jugador} />
          ))
        )}
      </div>
    </>
  );
}

export default TablaJugadores;
