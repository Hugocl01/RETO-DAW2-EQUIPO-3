import equipos from "./datosPrueba";

const $negocio = (function () {
  async function obtenerEquipos() {
    return equipos;
  }

  async function obtenerEquipoPorNombre(nombreEquipo) {
    return equipos.find((equipo) => equipo.equipo === nombreEquipo);
  }

  return{
    obtenerEquipos,
    obtenerEquipoPorNombre
  }
})();

export default $negocio;
