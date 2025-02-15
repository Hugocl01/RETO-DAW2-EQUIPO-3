import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import api from "../../services/api";
import Spinner from "../../components/Spinner";

function DetalleJugadorPage() {
  const [jugador, setJugador] = useState(null);
  const { id } = useParams();
  const [cargando,setCargando]=useState(true);

  /**Cuando cambie el id del jugador, se ejecutará */
  useEffect(() => {
    const obtenerJugador = async () => {
      try {
        const resultado = await api.get(`jugadores/${id}`);
        if(resultado.data.status==="success"){
          setJugador(resultado.data.jugador);
          setCargando(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    obtenerJugador();
  }, [id]);

  if(cargando){
    return <Spinner></Spinner>
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
                  <h3 className="card-title text-center">
                    Información Personal
                  </h3>
                  <p className="card-text">
                    <strong>Nombre Completo: </strong>
                    {jugador.nombre}
                  </p>
                  {jugador.capitan === 1 ? (
                    <p className="card-text">
                      <strong>Capitan:</strong> {jugador.equipo.nombre}
                    </p>
                  ) : (
                    ""
                  )}

                  <p className="card-text">
                    <strong>Goles Marcados:</strong> {jugador.stats.goles}
                  </p>
                  <p className="card-text">
                    <strong>Tarjetas Amarillas: </strong> {jugador.stats.tarjetas_amarillas}
                  </p>

                  <p className="card-text">
                    <strong>Tarjetas Rojas: </strong> {jugador.stats.tarjetas_rojas}
                  </p>

                  <p className="card-text">
                    <strong>Email:</strong> {jugador.email}
                  </p>
                  <p className="card-text">
                    <strong>Equipo:</strong> {jugador.equipo.nombre}
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
