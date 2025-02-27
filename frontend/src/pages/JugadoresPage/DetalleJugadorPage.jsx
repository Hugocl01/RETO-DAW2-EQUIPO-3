import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import Spinner from "../../components/Spinner";
import ErrorPage from "../ErrorPage";

function DetalleJugadorPage({slug}) {
  const [jugador, setJugador] = useState(null);
  const {jugadorSlug } = useParams();
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const obtenerJugador = async () => {
      try {
        const resultado = await api.get(`jugadores/${slug}`);
        if (resultado.data.status === "success") {
          /**
           * Obtengo el array de jugadoresMostrados
           * Si no hay, inicializo el array vacio
           */
          let arrayJugadores =
            JSON.parse(sessionStorage.getItem("jugadoresMostrados")) || [];

          /**
           * Quiero verificar que no me meta duplicados
           */
          const jugadorExistente = arrayJugadores.find(
            (e) => e.nombre === resultado.data.jugador.nombre
          );

          if (!jugadorExistente) {
            arrayJugadores.push(resultado.data.jugador);
            sessionStorage.setItem(
              "jugadoresMostrados",
              JSON.stringify(arrayJugadores)
            );
          }

          /**
           * Actualizo el estado de jugador
           */
          setJugador(resultado.data.jugador);
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
     * Obtengo el array de JugadoresMostrados desde la session
     */
    const obtenerJugadorSession =
      JSON.parse(sessionStorage.getItem("jugadoresMostrados")) || [];

    /**
     * Busco al jugador por su slug
     */
    const jugadorEnStorage = obtenerJugadorSession.find(
      (e) => e.slug === slug
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
  }, [jugadorSlug,slug]);

  /**
   * Enseño la página de error, cuando haya una página de error
   */
  if (error) {
    return <ErrorPage tipo={error.tipo} mensaje={error.mensaje} />;
  }

  if (cargando) {
    return <Spinner></Spinner>;
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
              <div className="col-md-6 d-flex flex-column justify-content-between align-items-center">
                <h3 className="card-title text-center">Información Personal</h3>
                {/* Nueva forma de mostrar si es capitán */}
                {jugador.capitan === 1 && jugador.equipo && (
                  <p className="card-text">
                    <strong>Capitán del equipo</strong>

                    <span className="">{jugador.equipo.nombre}</span>
                  </p>
                )}
                <p className="card-text">
                  <strong>Nombre Completo: </strong>
                  {jugador.nombre}
                </p>

                <p className="card-text">
                  <strong>Goles Marcados:</strong> {jugador.stats.goles}
                </p>
                <p className="card-text">
                  <strong>Tarjetas Amarillas: </strong>{" "}
                  {jugador.stats.tarjetas_amarillas}
                </p>

                <p className="card-text">
                  <strong>Tarjetas Rojas: </strong>{" "}
                  {jugador.stats.tarjetas_rojas}
                </p>

                <p className="card-text">
                  <strong>Email:</strong> {jugador.email}
                </p>
                <p className="card-text">
                  <strong>Equipo:</strong> {jugador.equipo}
                </p>
              </div>
              {/*
               *Columna para la foto del jugador
               */}
              <div className="col-md-6">
                <img
                  src={"../../src/assets/imagenes/img1.jpg"}
                  alt={`${jugador.nombre} ${jugador.primer_apellido}`}
                  className="img-fluid mb-3"
                  style={{ maxWidth: "100%" }}
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
