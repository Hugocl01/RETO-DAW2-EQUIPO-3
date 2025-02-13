import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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
  const location = useLocation(); 


  /**
   * Estado para el equipo a mostrar
   */
  const [equipo, setEquipo] = useState();

  /**
   * Se ejecutará cuando haya cambios en el nombre que pasemos en el header
   */
  useEffect(() => {
    const obtenerEquipo = async () => {
      try {
        /**
         * Implemento el location para que me devuelva la ruta en la que nos encontramos
         */
        const resultado = await api.get(location.pathname);
        if (resultado.data.status === "success") {
          setEquipo(resultado.data.equipo);
        }
      } catch (error) {
        console.error(error);
      }
    };
    obtenerEquipo();
  }, [location]);

  if(!equipo){
    return <Spinner></Spinner>
  }

  return (
    <>
          <section className="container-fluid">
            <div className="row">
              {/**Sección de info de equipo */}
              <section id="infoEquipo" className="col-md-6">
                <h2>Equipo {equipo.nombre}</h2>

                <div>
                  <p>Entrenador: {equipo.entrenador[1]} </p>
                </div>

                <div>
                  <img
                    src="../src/assets/imagenes/img1.jpg"
                    alt="imagenPatrocinador"
                    className="img-fluid"
                  />
                </div>

                <div>
                  <p>Centro: {equipo.centro.nombre}</p>
                  <p>Grupo: {equipo.grupo}</p>
                </div>
              </section>

              {/* Sección de jugadores */}
              <section id="jugadores" className="col-md-6">
                <h3>Jugadores</h3>
              </section>
            </div>
          </section>
    </>
  );
}

export default DetallesEquipoPage;
