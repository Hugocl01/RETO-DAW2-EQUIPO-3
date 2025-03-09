import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "../../components/Spinner";
import ErrorPage from "../ErrorPage";
import fetchData from "../../data/FetchData";
import img1 from '../../assets/imagenes/img1.jpg';

/**
 * Componente `DetalleJugadorPage` que muestra los detalles de un jugador, incluyendo su información personal y estadísticas.
 * 
 * @component
 * @returns {JSX.Element} - Elemento JSX que representa la página de detalles del jugador.
 */
function DetalleJugadorPage() {
  const [jugador, setJugador] = useState(null);
  const location = useLocation();
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState();

  /**
   * Efecto que se ejecuta cuando cambia la ubicación (URL).
   * Obtiene los datos del jugador desde la API o desde la sesión de almacenamiento.
   */
  useEffect(() => {
    /**
     * Cojo el valor del slug del jugador desde la URL (última parte de location.pathname)
     */
    const nombreJugador = location.pathname.split("/").pop();

    /**
     * Función envoltorio que realiza la llamada a la API para obtener los datos del jugador.
     */
    const obtenerJugador = async () => {
      try {
        const resultado = await fetchData(`jugadores/${nombreJugador}`);
        if (resultado.status === "success") {
          /**
           * Obtengo el array de jugadoresMostrados
           * Si no hay, inicializo el array vacío
           */
          let arrayJugadores =
            JSON.parse(sessionStorage.getItem("jugadoresMostrados")) || [];

          /**
           * Quiero verificar que no me meta duplicados
           */
          const jugadorExistente = arrayJugadores.find(
            (e) => e.nombre === resultado.jugador.nombre
          );

          if (!jugadorExistente) {
            arrayJugadores.push(resultado.jugador);
            sessionStorage.setItem(
              "jugadoresMostrados",
              JSON.stringify(arrayJugadores)
            );
          }

          /**
           * Actualizo el estado de jugador
           */
          setJugador(resultado.jugador);
        } else {
          setError({
            tipo: "error",
            mensaje: "Hubo un problema al obtener el jugador.",
          });
        }
      } catch (error) {
        setError({
          tipo: error.response?.status || error.name,
          mensaje: error.response?.data?.message || "No existe el jugador.",
        });
      } finally {
        setCargando(false);
      }
    };

    /**
     * Obtengo el array de JugadoresMostrados desde la sesión
     */
    const obtenerJugadorSession =
      JSON.parse(sessionStorage.getItem("jugadoresMostrados")) || [];

    /**
     * Busco al jugador por su slug
     */
    const jugadorEnStorage = obtenerJugadorSession.find(
      (e) => e.slug === nombreJugador
    );

    if (jugadorEnStorage) {
      setJugador(jugadorEnStorage);
      setCargando(false);
    } else {
      obtenerJugador();
    }

    /**
     * Desplazo la página arriba del todo
     */
    window.scrollTo(0, 0);
  }, [location]);

  /**
   * Enseño la página de error, cuando haya una página de error
   */
  if (error) {
    return <ErrorPage tipo={error.tipo} mensaje={error.mensaje} />;
  }

  /**
   * Mientras cargue, muestro el spinner
   */
  if (cargando) {
    return <Spinner />;
  }

  return (
    <>
      <title>Detalles de jugador</title>
      <div className="container-fluid w-75 my-5">
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h2>Detalle Jugador</h2>
          </div>
          <div className="card-body">
            <div className="row">
              {/**
               * Columna para la información del jugador
               */}
              <div className="col-md-8">
                <h3 className="card-title">Información Personal</h3>

                {/* Información básica */}
                <p><strong>Nombre Completo: </strong>{jugador.nombre}</p>
                <p><strong>Equipo: </strong>{jugador.equipo}</p>
                
                {/* Información del capitán */}
                {jugador.capitan == "1" && jugador.equipo && (
                  <p>
                    <strong>Capitán del equipo: </strong>
                    <span>{jugador.equipo}</span>
                  </p>
                )}

                {/* Estudio del jugador */}
                {jugador.estudio && (
                  <div>
                    <h4>Estudios</h4>
                    <p><strong>Centro: </strong>{jugador.estudio.centro}</p>
                    <p><strong>Ciclo: </strong>{jugador.estudio.ciclo}</p>
                    <p><strong>Curso: </strong>{jugador.estudio.curso + 'º'}</p>
                  </div>
                )}

                {/* Estadísticas del jugador */}
                <h4>Estadísticas</h4>
                <p><strong>Goles Marcados: </strong>{jugador.stats.goles}</p>
                <p><strong>Tarjetas Amarillas: </strong>{jugador.stats.tarjetas_amarillas}</p>
                <p><strong>Tarjetas Rojas: </strong>{jugador.stats.tarjetas_rojas}</p>
                <p><strong>Faltas: </strong>{jugador.stats.faltas}</p>

              </div>
              {/*
               * Columna para la foto del jugador
               */}
              <div className="col-md-4 d-flex justify-content-center">
                <img
                  src={img1}
                  alt={`${jugador.nombre}`}
                  className="img-fluid mb-3"
                  style={{ maxWidth: "80%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetalleJugadorPage;
