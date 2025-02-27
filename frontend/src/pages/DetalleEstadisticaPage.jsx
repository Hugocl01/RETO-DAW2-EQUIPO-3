import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DetalleJugadorPage from "./JugadoresPage/DetalleJugadorPage"; 
import DetalleEquipoPage from "./EquiposPage/DetallesEquipoPage"; 

/**
 * Es una page para redireccionar en las estadisticas, dependiendo si es un jugador o equipo
 */
function DetalleEstadisticaPage() {
  const { slug } = useParams(); // Obtiene el slug de la URL
  const [tipo, setTipo] = useState(null); // Estado para determinar el tipo (jugador o equipo)

  useEffect(() => {
    // Función para determinar si el slug pertenece a un jugador o a un equipo
    const determinarTipo = () => {
      const jugadores = JSON.parse(sessionStorage.getItem("jugadores")) || [];
      const equipos = JSON.parse(sessionStorage.getItem("equipos")) || [];

      const jugadorEncontrado = jugadores.find(jugador => jugador.slug === slug);
      const equipoEncontrado = equipos.find(equipo => equipo.slug === slug);

      if (jugadorEncontrado) {
        setTipo("jugador"); // Si es un jugador, se asigna "jugador"
      } else if (equipoEncontrado) {
        setTipo("equipo"); // Si es un equipo, se asigna "equipo"
      } else {
        setTipo(null); // Si no se encuentra ni en jugadores ni en equipos
      }
    };

    determinarTipo(); // Llamada a la función para verificar el tipo

    window.scrollTo(0, 0); // Desplaza la ventana arriba al cargar la página
  }, [slug]);

  // Renderiza el componente adecuado según el tipo
  if (tipo === "jugador") {
    return <DetalleJugadorPage slug={slug} />;
  } else if (tipo === "equipo") {
    return <DetalleEquipoPage slug={slug} />;
  } 
}

export default DetalleEstadisticaPage;
