import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DetalleJugadorPage from "./JugadoresPage/DetalleJugadorPage";
import DetalleEquipoPage from "./EquiposPage/DetallesEquipoPage";

/**
 * Página `DetalleEstadisticaPage` que redirige a la página de detalles de un jugador o equipo según el slug proporcionado.
 * 
 * @component
 * @returns {JSX.Element | null} - Elemento JSX que representa la página de detalles de estadísticas (jugador o equipo), o `null` si no se encuentra el tipo.
 */
function DetalleEstadisticaPage() {
  const { slug } = useParams(); // Obtiene el slug de la URL
  const [tipo, setTipo] = useState(null); // Estado para determinar el tipo (jugador o equipo)

  /**
   * Efecto que se ejecuta cuando cambia el slug.
   * Determina si el slug pertenece a un jugador o a un equipo.
   */
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
    return <DetalleJugadorPage />;
  } else if (tipo === "equipo") {
    return <DetalleEquipoPage />;
  }
}

export default DetalleEstadisticaPage;
