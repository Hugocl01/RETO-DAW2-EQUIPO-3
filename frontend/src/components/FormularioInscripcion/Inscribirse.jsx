import { useState, useEffect, useId } from "react";
import JugadorLabel from "./JugadorLabel.jsx";
import api from "../../services/api.js";
import Spinner from "../Spinner.jsx";
import "../css/Inscribirse.css";
import TarjetaFormulario from "./TarjetaFormulario.jsx";

function Inscribirse() {
  const [capitanId, setCapitanId] = useState(null);

  // Objeto que guardará los mensajes de error de validación (respuestas de Laravel)
  const [errores, setErrores] = useState({});

  const [estudios, setEstudios] = useState([]);
  const [centros, setCentros] = useState([]);
  const [contadorJugadores, setContadorJugadores] = useState(0);
  const idUnico = useId();

  const [activo, setActivo] = useState(null);

  // Campos de Equipo
  const [nombreEquipo, setNombreEquipo] = useState("");
  const [centroSeleccionado, setCentroSeleccionado] = useState("");
  const handleNombreEquipoChange = (event) => {
    setNombreEquipo(event.target.value);
  };
  const handleCentroSeleccionadoChange = (event) => {
    setCentroSeleccionado(event.target.value);
  };

  // Campos de Entrenador
  const [nombreEntrenador, setNombreEntrenador] = useState("");
  const [emailEntrenador, setEmailEntrenador] = useState("");
  const handleNombreEntrenadorChange = (event) => {
    setNombreEntrenador(event.target.value);
  };
  const handleEmailEntrenadorChange = (event) => {
    setEmailEntrenador(event.target.value);
  };

  // Jugadores
  const [jugadores, setJugadores] = useState([]);
  const handleJugadorChange = (id, campo, valor) => {
    const nuevosJugadores = jugadores.map((jugador) => {
      if (jugador.id === id) {
        return { ...jugador, [campo]: valor };
      }
      return jugador;
    });
    setJugadores(nuevosJugadores);
  };

  // Buscar cuál es el capitán
  const capitan = jugadores.find((j) => j.id === capitanId) || {};

  // Agregar jugador
  const agregarJugador = () => {
    const nuevoIdJugador = `${idUnico}-${contadorJugadores}`;
    setJugadores([
      ...jugadores,
      { id: nuevoIdJugador, nombre_completo: "", estudio_id: "" },
    ]);
    setContadorJugadores(contadorJugadores + 1);
  };

  // Eliminar jugador
  const eliminarJugador = (id) => {
    const nuevosJugadores = jugadores.filter((jugador) => jugador.id !== id);
    if (capitanId === id) {
      setCapitanId(null);
    }
    setJugadores(nuevosJugadores);
  };

  // Establecer / quitar capitán
  const handleSetCapitan = (id) => {
    if (capitanId === id) {
      // Si ya es capitán, deshacerlo
      setCapitanId(null);
    } else {
      // Marcar nuevo capitán
      setCapitanId(id);
    }
  };

  /**
   * Laravel envía errores como:
   * {
   *   "jugadores.0.nombre_completo": ["Mensaje error"],
   *   "jugadores.0.dni": [...],
   *   "jugadores.1.email": [...]
   * }
   * Los agrupamos por índice (0, 1, 2...) para pasarlos a cada <JugadorLabel/>
   */
  const mapJugadorErrorsToArray = (errors) => {
    const jugadorErrors = [];
    Object.keys(errors).forEach((key) => {
      // Solo consideramos claves que empiecen con "jugadores."
      if (key.startsWith("jugadores.")) {
        const match = key.match(/^jugadores\.(\d+)\.(\w+)/);
        if (match) {
          const idx = parseInt(match[1]);
          const field = match[2];
          if (!jugadorErrors[idx]) {
            jugadorErrors[idx] = {};
          }
          // Solo tomamos el primer mensaje, o podrías concatenar todos
          jugadorErrors[idx][field] = errors[key][0];
        }
      }
    });
    return jugadorErrors;
  };

  // Manejo del envío del formulario (sin validación de JS)
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Construimos el formData que se enviará a Laravel
    const formData = {
      nombre: nombreEquipo,
      centro_id: centroSeleccionado,
      entrenador_nombre_completo: nombreEntrenador,
      entrenador_email: emailEntrenador,
      jugadores: jugadores.map((jugador) => {
        return {
          nombre_completo: jugador.nombre_completo,
          estudio_id: jugador.estudio_id,
          // Solo el capitán lleva dni, email y teléfono
          dni: jugador.id === capitanId ? jugador.dni : null,
          email: jugador.id === capitanId ? jugador.email : null,
          telefono: jugador.id === capitanId ? jugador.telefono : null,
          capitan: jugador.id === capitanId ? 1 : 0,
        };
      }),
    };

    try {
      const response = await api.post("/equipos", formData);
      alert("Formulario enviado correctamente");
      setErrores({}); // Limpiar errores si todo salió bien
    } catch (error) {
      console.error("Error al enviar el formulario", error);
      // Si hubo validaciones de Laravel con status=422, se capturan aquí
      if (error.response && error.response.status === 422) {
        setErrores(error.response.data.errors);
      }
    }
  };

  // Carga de datos inicial (estudios y centros) desde el back
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const respuestaEstudios = await api.get("/estudios");
        if (respuestaEstudios.data.status === "success") {
          setEstudios(respuestaEstudios.data.estudios);
        }

        const respuestaCentros = await api.get("/centros");
        if (respuestaCentros.status === 200) {
          setCentros(respuestaCentros.data.centros);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    obtenerDatos();
  }, []);

  // Si todavía no se han cargado "estudios", mostramos un Spinner
  if (!estudios.length) {
    return <Spinner />;
  }

  // Transformamos los errores de jugadores en un array por índice
  const erroresJugadores = mapJugadorErrorsToArray(errores);

  return (
    <div className="contenedor-inscripcion container bg-light border rounded p-5">
      <h2 className="text-center">Inscribe a tu Equipo</h2>
      <div className="row d-flex justify-content-between mb-4">
        {/* Tarjeta Equipo */}
        <div
          className="tarjeta card mb-3 text-center d-flex justify-content-center align-items-center mt-5"
          onClick={() => setActivo("equipo")}
          style={{ cursor: "pointer" }}
        >
          <div className="d-flex justify-content-center mt-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="130"
              height="130"
              fill="currentColor"
              className="bi bi-people-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
            </svg>
          </div>
          <div className="card-body">
            <h5 className="card-title">Equipo</h5>
          </div>
        </div>

        {/* Tarjeta Entrenador */}
        <div
          className="tarjeta card mb-3 text-center d-flex justify-content-center align-items-center mt-5"
          onClick={() => setActivo("entrenador")}
          style={{ cursor: "pointer" }}
        >
          <div className="d-flex justify-content-center mt-3">
            <img
              src="https://img.icons8.com/ios-filled/100/personal-trainer.png"
              alt="personal-trainer"
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">Entrenador</h5>
          </div>
        </div>

        {/* Tarjeta Jugadores */}
        <div
          className="tarjeta card mb-3 text-center d-flex justify-content-center align-items-center mt-5"
          onClick={() => setActivo("jugadores")}
          style={{ cursor: "pointer" }}
        >
          <div className="d-flex justify-content-center mt-3">
            <img
              src="https://img.icons8.com/ios-filled/100/groups.png"
              alt="groups"
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">Jugadores</h5>
          </div>
        </div>
      </div>

      {/* Mostrar tarjeta activa */}
      {activo && (
        <TarjetaFormulario
          titulo={activo.charAt(0).toUpperCase() + activo.slice(1)}
          activo={activo}
          setActivo={setActivo}
          id={activo}
        >
          {/* 1) Formulario de Equipo */}
          {activo === "equipo" && (
            <div className="mb-1 p-3">
              <label>Nombre del Equipo: *</label>
              <input
                type="text"
                className="form-control mb-1"
                name="nombre"
                value={nombreEquipo}
                onChange={handleNombreEquipoChange}
              />
              {/* Errores para 'nombre' */}
              {errores.nombre &&
                errores.nombre.map((errorMsg, i) => (
                  <small key={i} className="text-danger d-block">
                    {errorMsg}
                  </small>
                ))}

              <label>Centro: *</label>
              <select
                className="form-select mb-1"
                name="centro"
                value={centroSeleccionado}
                onChange={handleCentroSeleccionadoChange}
              >
                <option value="">Selecciona un centro</option>
                {Array.isArray(centros) &&
                  centros.map((centro) => (
                    <option key={centro.id} value={centro.id}>
                      {centro.nombre}
                    </option>
                  ))}
              </select>
              {/* Errores para 'centro_id' */}
              {errores.centro_id &&
                errores.centro_id.map((errorMsg, i) => (
                  <small key={i} className="text-danger d-block">
                    {errorMsg}
                  </small>
                ))}
            </div>
          )}

          {/* 2) Formulario de Entrenador */}
          {activo === "entrenador" && (
            <div className="mb-1 p-3">
              <label>Nombre Completo: *</label>
              <input
                type="text"
                className="form-control mb-1"
                name="entrenador_nombre_completo"
                value={nombreEntrenador}
                onChange={handleNombreEntrenadorChange}
              />
              {errores.entrenador_nombre_completo &&
                errores.entrenador_nombre_completo.map((msg, i) => (
                  <small key={i} className="text-danger d-block">
                    {msg}
                  </small>
                ))}

              <label>Email: *</label>
              <input
                type="email"
                className="form-control mb-1"
                name="entrenador_email"
                value={emailEntrenador}
                onChange={handleEmailEntrenadorChange}
              />
              {errores.entrenador_email &&
                errores.entrenador_email.map((msg, i) => (
                  <small key={i} className="text-danger d-block">
                    {msg}
                  </small>
                ))}
            </div>
          )}

          {/* 3) Formulario de Jugadores */}
          {activo === "jugadores" && (
            <div>
              <button
                className="botonAñadir btn btn-primary mt-2 mb-4"
                onClick={agregarJugador}
              >
                <i className="bi bi-plus-circle-fill m-2"></i>
                Añadir Jugador
              </button>

              <div className="d-flex flex-wrap justify-content-between">
                {jugadores.map((jugador, index) => (
                  <JugadorLabel
                    key={jugador.id}
                    id={jugador.id}
                    nombre_completo={jugador.nombre_completo}
                    dni={jugador.dni || ""}
                    email={jugador.email || ""}
                    telefono={jugador.telefono || ""}
                    estudio_id={jugador.estudio_id}
                    esCapitan={capitanId === jugador.id}
                    onRemove={eliminarJugador}
                    onSetCapitan={handleSetCapitan}
                    isCapitanDisabled={
                      capitanId !== null && capitanId !== jugador.id
                    }
                    // Pasamos errores de jugadores según índice
                    errores={erroresJugadores[index] || {}}
                    estudios={estudios}
                    numeroJugador={index + 1}
                    onJugadorChange={handleJugadorChange}
                  />
                ))}

                {/* Errores generales de 'jugadores' (si los hubiera) */}
                {errores.jugadores &&
                  Array.isArray(errores.jugadores) &&
                  errores.jugadores.map((mensaje, i) => (
                    <span key={i} className="text-danger small d-block">
                      {mensaje}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </TarjetaFormulario>
      )}

      {/* Botón para enviar el formulario */}
      <button className="botonEnviar btn btn-success mt-3" onClick={handleSubmit}>
        <i className="bi bi-send-fill m-2"></i>
        Enviar
      </button>
    </div>
  );
}

export default Inscribirse;
