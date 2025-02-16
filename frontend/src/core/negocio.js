import partidos from "./datosPrueba";

const $negocio = (function () {
  async function obtenerPartidos() {
    return partidos;
  }

  return{
    obtenerPartidos
  }
})();

export default $negocio;
