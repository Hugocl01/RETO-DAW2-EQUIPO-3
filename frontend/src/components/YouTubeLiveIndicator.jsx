import { useState, useEffect } from "react";

function YouTubeLiveIndicator() {
  const [isLive, setIsLive] = useState(false);

  // Usar variables de entorno en Vite con import.meta.env
  const channelId = import.meta.env.VITE_CHANNEL_ID;
  const apiKey = import.meta.env.VITE_YOUTUBE_API;

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

  return isLive
    ? <span className="badge rounded-pill bg-danger text-white ms-2">
        <i className="bi bi-broadcast-pin me-1"></i> Directo
      </span>

    : null;
}

export default YouTubeLiveIndicator;
