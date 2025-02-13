import { useEffect, useState } from "react";
import $negocio from "../../core/negocio";
import Jugador from "../../components/Jugador";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner"

function JugadoresPage() {
  const [jugadores, setJugadores] = useState();
  const navegar = useNavigate();

  /**En cuanto cargue el componente, se ejecutará la carga de los jugadores */
  useEffect(() => {
    const obtenerListadoJugadores = async () => {
      try {
        const resultado = await $negocio.obtenerJugadores();
        setJugadores(resultado);
      } catch (error) {
        console.error(error);
      }
    };
    obtenerListadoJugadores();
  }, []);

  /**
   * Mientras carga los jugadores, muestro el spinner
   */
  if(!jugadores){
    return <Spinner></Spinner>
  }

  /**
   * Redirige al detalle del jugador
   * @param {int} id 
   */
  function navegarDetalleJugador(id) {
    navegar(`/jugadores/${id}`);
  }

  return (
    <>
        <section>
          <div className="container-fluid w-75">
            <h2 className="my-4">Lista de Jugadores</h2>

            {/**
             * Cabecera de la tabla
             */}
            <div className="row">
              <div className="col-12">
                <div className="row bg-dark text-white py-2">
                  <div className="col-3 text-center">Nombre</div>
                  <div className="col-3 text-center">Apellidos</div>
                  <div className="col-3 text-center">Goles</div>
                  <div className="col-3 text-center">Equipo</div>
                </div>

                {/**
                 * Filas de los jugadores
                 */}
                {jugadores.map((valor) => (
                  <Jugador
                    key={valor.id_jugador}
                    jugador={valor}
                    fnNavegar={navegarDetalleJugador}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
    </>
  );
}

export default JugadoresPage;

