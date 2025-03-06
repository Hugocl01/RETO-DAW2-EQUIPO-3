import { useState, useEffect } from "react";

/**
 * Componente `YouTubeLiveIndicator` que verifica si un canal de YouTube está en vivo
 * y muestra un indicador visual si es así.
 * 
 * @component
 * @returns {JSX.Element | null} Un indicador de "Directo" si el canal está en vivo, o `null` si no lo está.
 */
function YouTubeLiveIndicator() {
  const [isLive, setIsLive] = useState(false);

  // Usar variables de entorno en Vite con import.meta.env
  const channelId = import.meta.env.VITE_CHANNEL_ID; // ID del canal de YouTube
  const apiKey = import.meta.env.VITE_YOUTUBE_API; // Clave de la API de YouTube

  /**
   * Efecto para verificar si el canal de YouTube está en vivo.
   * Se ejecuta cuando cambian `channelId` o `apiKey`.
   */
  useEffect(() => {
    if (!channelId || !apiKey) {
      console.error("Faltan las variables de entorno.");
      return;
    }

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setIsLive(data.items && data.items.length > 0);
      })
      .catch((error) => {
        console.error("Error al comprobar el estado en directo de YouTube:", error);
      });
  }, [channelId, apiKey]);

  // Mostrar el indicador de "Directo" si el canal está en vivo
  return isLive
    ? <span className="badge rounded-pill bg-danger text-white ms-2">
        <i className="bi bi-broadcast-pin me-1"></i> Directo
      </span>
    : null;
}

export default YouTubeLiveIndicator;
