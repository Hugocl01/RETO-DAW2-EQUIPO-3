import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api.js";
import Spinner from "../../components/Spinner.jsx";

/**
 * Página de Detalles del Equipo
 * @returns
 */

function DetallesEquipoPage() {
  /**
   * Con esto, obtengo la ruta con el location
   */
  const { id } = useParams();

  /**
   * Estado para el equipo a mostrar
   */
  const [equipo, setEquipo] = useState();

  const [cargando, setCargando] = useState(true);

  const navegar=useNavigate();

  /**
   * Se ejecutará cuando haya cambios en el nombre que pasemos en el header
   */
  useEffect(() => {
    const obtenerEquipo = async () => {
      try {
        /**
         * Implemento el location para que me devuelva la ruta en la que nos encontramos
         */
        const resultado = await api.get(`equipos/${id}`);
        if (resultado.data.status === "success") {
          setCargando(false);
          console.log(resultado.data.equipo);
          setEquipo(resultado.data.equipo);
        }
      } catch (error) {
        console.error(error);
      }
    };
    obtenerEquipo();
  }, [id]);

  if (cargando) {
    return <Spinner></Spinner>;
  }

   /**
   * Función que envuelve le useNavigate y que me sirve para navegar a la página de detalles del jugador
   */
   function navegarDetalleJugador(idJugador){
    navegar(`/jugadores/${idJugador}`)
  }
  return (
    <>
      <section className="container-fluid">
        <div className="row">
          {/**Sección de info de equipo */}
          <section id="infoEquipo" className="col-md-4">
            <h2>Equipo {equipo.nombre}</h2>

            <div>
              <p>Entrenador: {equipo.entrenador.nombre} </p>
            </div>

            <div>
              <img
                src={"../../src/assets/imagenes/img1.jpg"}
                alt="imagenPatrocinador"
                className="img-fluid"
                style={{width:"50%"}}
              />
            </div>

            <div>
              <p>Centro: {equipo.centro.nombre}</p>
              <p>Grupo: {equipo.grupo}</p>
            </div>
          </section>

          {/* Sección de jugadores */}
          <section id="jugadores" className="col-md-8">
            <div className="row">
              <div className="col-12">
                <h3 className="text-center mb-4">Jugadores</h3>
                <div className="row">
                  {equipo.Jugadores.jugador.map((valor, index) => (
                    <div key={index} className="col-md-3 mb-2">
                      <div className="card h-100" onClick={()=>navegarDetalleJugador(valor.id)}>
                        <img
                          src={"../../src/assets/imagenes/img1.jpg"}
                          alt="imagenJugador"
                          className="card-img-top img-fluid"
                          style={{ objectFit: "cover", height: "75%" }} 
                        />
                        <div className="card-body d-flex flex-column">
                          <p className="card-text mt-auto text-center">
                            {valor.nombre}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default DetallesEquipoPage;
