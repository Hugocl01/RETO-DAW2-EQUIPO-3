import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import $negocio from "../../core/negocio";

function DetalleJugadorPage() {
  const [jugador, setJugador] = useState(null);
  const { id } = useParams();


/**Cuando cambie el id del jugador, se ejecutará */
  useEffect(() => {
    const obtenerJugador = async () => {
      try {
        let idJugador = parseInt(id);
        const resultado = await $negocio.obtenerJugadorPorId(idJugador);
        console.log(resultado);
        setJugador(resultado);
      } catch (error) {
        console.error(error);
      }
    };
    obtenerJugador();
  }, [id]);

  return (
    <>
      {jugador ? (
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
                    <strong>Nombre Completo:</strong> {jugador.nombre}{" "}
                    {jugador.primer_apellido} {jugador.segundo_apellido}
                  </p>
                  <p className="card-text">
                    <strong>Tipo:</strong> {jugador.tipo}
                  </p>
                  <p className="card-text">
                    <strong>Goles Marcados:</strong> {jugador.goles_marcados}
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
      ) : (
        <div className="container my-5">
          <p>Cargando detalles...</p>
        </div>
      )}
    </>
  );
}

export default DetalleJugadorPage;
