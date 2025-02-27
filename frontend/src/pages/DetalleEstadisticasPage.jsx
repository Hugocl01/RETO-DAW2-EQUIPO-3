import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import DetalleJugadorPage from "./JugadoresPage/DetalleJugadorPage";  // Componente de detalle jugador
import DetalleEquipoPage from "./EquiposPage/DetallesEquipoPage";    // Componente de detalle equipo

function DetalleEstadisticasPage() {
  const { slug } = useParams();
  const [tipo, setTipo] = useState(""); // Para saber si es un jugador o un equipo

  useEffect(() => {
    const obtenerTipo = async () => {
      try {
        // Hacer la llamada para obtener el jugador o el equipo
        const resultadoJugador = await api.get(`/jugadores/${slug}`);
        if (resultadoJugador.data.status === "success") {
          setTipo("jugador");
        } else {
          const resultadoEquipo = await api.get(`/equipos/${slug}`);
          if (resultadoEquipo.data.status === "success") {
            setTipo("equipo");
          }
        }
      } catch (error) {
        // Si hay error, puedes manejarlo aquí
        console.error("Error al obtener jugador o equipo", error);
      }
    };

    obtenerTipo();
  }, [slug]);

  if (tipo === "jugador") {
    return <DetalleJugadorPage />;
  } else if (tipo === "equipo") {
    return <DetalleEquipoPage />;
  } else {
    return <div>Loading...</div>;
  }
}

export default DetalleEstadisticasPage;

