import { useState, useEffect } from "react";
import Spinner from "../Spinner";

export default function CrudTorneos() {
  const [torneo, setTorneo] = useState(null); // Estado para almacenar la información del torneo
  const [loading, setLoading] = useState(false); // Para mostrar el spinner mientras se hace la llamada
  const [error, setError] = useState(null); // Para manejar posibles errores

  // Función para obtener el estado del torneo desde la API
  const getTorneoStatus = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
  
      // Llamada a la API para obtener los partidos del torneo
      const response = await fetch("http://127.0.0.1:8000/api/partidos", {
        method: "GET", // Usamos GET para obtener los partidos del torneo
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
  
      if (!response.ok) throw new Error("Error al obtener los partidos");
  
      const data = await response.json();
  
      // Accedemos a la propiedad 'partidos' de la respuesta
      const partidosData = data.partidos || [];
  
      // Aseguramos que partidosData es un arreglo
      if (!Array.isArray(partidosData)) {
        console.error("La respuesta no es un arreglo de partidos:", partidosData);
        throw new Error("La respuesta de la API no contiene un arreglo de partidos.");
      }
  
      // Comprobamos si hay algún partido cuya fecha es posterior a la fecha actual
      const fechaActual = new Date(); // Fecha actual en formato Date
      
      // Función para normalizar la fecha a solo "YYYY-MM-DD"
      const normalizeDate = (date) => {
        // Establecemos las horas, minutos, segundos y milisegundos a cero para comparar solo la fecha
        const normalizedDate = new Date(date);
        normalizedDate.setHours(0, 0, 0, 0); // Establecemos las horas a 00:00:00
        return normalizedDate;
      };
  
      const fechaActualNormalized = normalizeDate(fechaActual); // Normalizamos la fecha actual
  
      // Comprobamos si hay partidos con fecha posterior a la actual
      const torneoActivo = partidosData.some((partido) => {
        const fechaPartido = normalizeDate(partido.fecha); // Normalizamos la fecha del partido
  
        // Mostrar las fechas en consola para debugging
        console.log("Fecha del partido:", fechaPartido);
        console.log("Fecha actual:", fechaActualNormalized);
  
        // Comparamos las fechas normalizadas
        return fechaPartido >= fechaActualNormalized; // Si la fecha del partido es posterior a la fecha actual
      });
  
      // Si hay partidos activos, definimos el estado como "activo"
      setTorneo({ iniciado: torneoActivo });
  
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    getTorneoStatus();
  }, []);
  
  // Función para iniciar el torneo
  const iniciarTorneo = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/comienzo-torneo", {
        method: "GET", // Usamos GET para iniciar el torneo
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) throw new Error("Error al iniciar el torneo");
 console.log(response);
     
  setTorneo({ iniciado: true });// Actualiza el estado con los datos del torneo recién iniciado
  getTorneoStatus();
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para reiniciar el torneo
  const reiniciarTorneo = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/reinicio-torneo", {
        method: "GET", // Usamos GET para reiniciar el torneo
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) throw new Error("Error al reiniciar el torneo");
      console.log(response);
      setTorneo({ iniciado: true }); // Actualiza el estado con el torneo reiniciado
      getTorneoStatus();
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Cargar el estado del torneo al cargar el componente
  useEffect(() => {
    getTorneoStatus();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <div className="flex mb-4">
        {/* Botón para iniciar torneo */}
        <button
          className="btn btn-success mb-2"
          onClick={iniciarTorneo}
          disabled={torneo && torneo.iniciado} // Deshabilitar si el torneo ya está iniciado
        >
          Iniciar Torneo
        </button>

        {/* Botón para reiniciar torneo */}
        <button
          className="btn btn-danger mb-2"
          onClick={reiniciarTorneo}
          disabled={!torneo || !torneo.iniciado} // Deshabilitar si el torneo no está iniciado
        >
          Reiniciar Torneo
        </button>
      </div>

      <div className="mt-4">
        {/* Mostrar detalles del torneo si existe */}
        {torneo && (
          <div>
            <h2>Detalles del Torneo</h2>
            <p><strong>Estado:</strong> {torneo.iniciado ? "Iniciado" : "No Iniciado"}</p>
            {/* Aquí puedes agregar más detalles del torneo, como los equipos o partidos */}
          </div>
        )}
      </div>
    </div>
  );
}
