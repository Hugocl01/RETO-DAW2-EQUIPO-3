import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import Spinner from "../../components/Spinner.jsx";
import "../../core/CSS/DetalleEquipoPage.css";

function DetallesEquipoPage() {
  const location = useLocation();
  const [equipo, setEquipo] = useState();
  const [cargando, setCargando] = useState(true);
  const navegar = useNavigate();

  useEffect(() => {
    const obtenerEquipo = async () => {
      try {
        const resultado = await api.get(location.pathname);
        if (resultado.data.status === "success") {
          setCargando(false);
          setEquipo(resultado.data.equipo);
        }
      } catch (error) {
        console.error(error);
      }
    };
    obtenerEquipo();
  }, [location]);

  if (cargando) {
    return <Spinner />;
  }

  function navegarDetalleJugador(slug) {
    navegar(`/jugadores/${slug}`);
  }

  return (
    <>
      <title>Detalles del Equipo</title>
      <section className="container-fluid py-5 w-75">

        <div className="row">

          {/* Sección de información del equipo */}
          <section id="infoEquipo" className="col-md-4 p-0 d-flex flex-column">
            <div className="card shadow-sm border-light rounded">
              <div className="card-body text-center">
                <h2 className="card-title mb-3 w-100 bg-primary text-white py-2 rounded-3">
                  Equipo {equipo.nombre}
                </h2>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <div>
                    <img
                      src={"../../src/assets/imagenes/img1.jpg"}
                      alt="imagenPatrocinador"
                      className="img-fluid w-75"
                    />
                  </div>

                  <div className="w-75 d-flex flex-column justify-content-start mt-3 align-items-start">
                    <p>
                      <strong>Entrenador:</strong> {equipo.entrenador}
                    </p>
                    <p>
                      <strong>Centro:</strong> {equipo.centro}
                    </p>
                    <p>
                      <strong>Grupo:</strong> {equipo.grupo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sección de jugadores */}
          <section id="jugadores" className="col-md-8 ">
            <div className="card shadow-sm border-light rounded">
              <div className="card-body text-center">
                <h2 className="card-title mb-3 w-100 bg-primary text-white py-2 rounded-3">
                  Jugadores
                </h2>
              </div>
              <div className="row d-flex flex-row flex-wrap justify-content-center align-items-center g-4">
                {equipo.Jugadores.jugador.map((valor, index) => (
                  <div
                    key={index}
                    className="col-12 col-sm-6 col-md-3 mb-4 d-flex justify-content-center align-items-center"
                    onClick={() => navegarDetalleJugador(valor.slug)}
                  >
                    <div className="flip-card shadow-sm">
                      <div className="flip-card-inner">
                        {/* Parte frontal de la carta (imagen) */}
                        <div className="flip-card-front">
                          <img
                            src={`../../src/assets/imagenes/messi.jpg`} // Cambiar para cada jugador
                            alt="imagenJugador"
                            className="card-img-top img-fluid rounded"
                          />
                        </div>
                        {/* Parte posterior de la carta (nombre del jugador) */}
                        <div className="flip-card-back d-flex justify-content-center align-items-center">
                          <p>
                            <strong>{valor.nombre}</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default DetallesEquipoPage;
