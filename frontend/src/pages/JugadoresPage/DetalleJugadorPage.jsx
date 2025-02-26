import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import api from "../../services/api";
import Spinner from "../../components/Spinner";
import ErrorPage from "../ErrorPage";

function DetalleJugadorPage() {
  const [jugador, setJugador] = useState(null);
  const location = useLocation();
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState();

  /**Cuando cambie el id del jugador, se ejecutará */
  useEffect(() => {
    const obtenerJugador = async () => {
      try {
        const resultado = await api.get(location.pathname);
        if (resultado.data.status === "success") {
          /**
           * Si el resultado es success, guardo los datos del jugador en la sessionstorage
           * También guardo el jugador en el estado
           */
          sessionStorage.setItem(
            resultado.data.jugador.slug,
            JSON.stringify(resultado.data.jugador)
          );
          setJugador(resultado.data.jugador);
        } else {
          /**
           * Si me devuelve otro tipo de estado la api, lo recojo en el estado de error
           */
          setError({
            tipo: "error",
            mensaje: "Hubo un problema al obtener el jugador.",
          });
        }
      } catch (error) {
        /**
         * Los errores que me recoja el catch, lo guardo en el estado de error
         */
        setError({
          tipo: error.response?.status || error.name,
          mensaje: error.response?.data?.message || "No existe el jugador.",
        });
      } finally {
        setCargando(false);
      }
    };
    /**
     * Cojo el valor del nombre del location
     * Obtengo luego los valores de la session storage con el nombre del equipo
     */
    const nombreJugador = location.pathname.split("/").pop(); 

    const obtenerJugadorSession = sessionStorage.getItem(nombreJugador);

    /**
     * Si hay datos en la sessioStorage, utilizo esos datos y la asigno al estado equipo
     * Si no hay datos, realizo la llamada a la api
     */
    if (obtenerJugadorSession) {
      setJugador(JSON.parse(obtenerJugadorSession)); 
      setCargando(false);
    } else {
      obtenerJugador();
    }
    window.scrollTo(0, 0);
  }, [location]);

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
                    <h2>
                      <strong>Capitán del equipo</strong>
                    </h2>
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
