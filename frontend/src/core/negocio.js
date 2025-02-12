import jugadores from "./datosPrueba";

const $negocio = (function () {
  async function obtenerJugadores() {
    return jugadores;
  }

  async function obtenerJugadorPorId(id_jugador) {
    // Asegúrate de que 'jugadores' es un array que contiene los datos de los jugadores
    const jugador = jugadores.find(jugador => jugador.id_jugador === id_jugador);
    
    // Si el jugador no se encuentra, devuelve un mensaje o un valor nulo
    if (jugador) {
      return jugador; // Devuelve el jugador encontrado
    } else {
      throw new Error(`Jugador con ID ${id_jugador} no encontrado`); // Lanza un error si no lo encuentras
    }
  }
  
  

  return{
    obtenerJugadores,
    obtenerJugadorPorId
  }
})();

export default $negocio;
