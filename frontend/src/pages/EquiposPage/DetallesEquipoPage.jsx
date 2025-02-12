import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api.js";

/**
 * Página de Detalles del Equipo
 * @returns 
 */

function DetallesEquipoPage() {
    /**
     * Recogemos el valor que vendrá en el header
     */
  const { id } = useParams();

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
        const resultado=await api.get(`/equipos/${id}`);
        if(resultado.data.status === 'success'){
          setEquipo(resultado.data.equipo);
        }
      } catch (error) {
        console.error(error);
      }
    };
    obtenerEquipo();
  }, [id,equipo]);

  return (
    <>
    {
        /**
         * Se ejecutará en cuanto cargue el equipo
         */
    }
      {equipo ? (
        <>
          <section className="container-fluid">
            <div className="row">
              
              {/**Sección de info de equipo */}
              <section id="infoEquipo" className="col-md-6">
                <h2>Equipo {equipo.nombre}</h2>

                <div>
                  <p>Entrenador: </p>
                </div>

                <div>
                  <img
                    src="../src/assets/imagenes/img1.jpg"
                    alt="imagenPatrocinador"
                    className="img-fluid"
                  />
                </div>

                <div>
                  <p>Ciclo Formativo: {equipo.ciclo_formativo}</p>
                  <p>Familia: {equipo.familia_ciclo}</p>
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
      ) : (
        <>
        {/**
         * Se ejecutará mientras cargue el equipo
         */}
        <p>Cargando Equipo</p>
        </>
      )}
    </>
  );
}

export default DetallesEquipoPage;
