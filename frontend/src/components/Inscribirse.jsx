import { useState, useEffect, useId } from "react";
import JugadorLabel from "./JugadorLabel.jsx";
import api from "../services/api.js";
import Spinner from "../components/Spinner.jsx";
import "./css/Inscribirse.css";

import TarjetaFormulario from "./TarjetaFormulario.jsx";

function Inscribirse() {
    const [capitanId, setCapitanId] = useState(null);
    const [errores, setErrores] = useState({});
    const [estudios, setEstudios] = useState([]);
    const [centros, setCentros] = useState([]);
    const [contadorJugadores, setContadorJugadores] = useState(0);
    const idUnico = useId();

    const [activo, setActivo] = useState(null); // maneja que tarjeta esta activa


    const [nombreEquipo, setNombreEquipo] = useState("");
    const [centroSeleccionado, setCentroSeleccionado] = useState("");
    const handleNombreEquipoChange = (event) => {
        setNombreEquipo(event.target.value);
    };

    const handleCentroSeleccionadoChange = (event) => {
        setCentroSeleccionado(event.target.value);
    };



    const [nombreEntrenador, setNombreEntrenador] = useState("");
    const [emailEntrenador, setEmailEntrenador] = useState("");
    const handleNombreEntrenadorChange = (event) => {
        setNombreEntrenador(event.target.value);
    };

    const handleEmailEntrenadorChange = (event) => {
        setEmailEntrenador(event.target.value);
    };


    const [jugadores, setJugadores] = useState([]);
    const handleJugadorChange = (id, campo, valor) => {
        const nuevosJugadores = jugadores.map(jugador => {
            if (jugador.id === id) {
                return { ...jugador, [campo]: valor };
            }
            return jugador;
        });
        setJugadores(nuevosJugadores);
    };

    const capitan = jugadores.find(j => j.id === capitanId) || {};


    // Agregar jugador
    const agregarJugador = () => {
        const nuevoIdJugador = `${idUnico}-${contadorJugadores}`;
        setJugadores([...jugadores, { id: nuevoIdJugador, nombre_completo: '', estudio_id: '' }]);
        setContadorJugadores(contadorJugadores + 1);
    };

    // Función para eliminar jugador
    const eliminarJugador = (id) => {
        const nuevosJugadores = jugadores.filter((jugador) => jugador.id !== id);
        if (capitanId === id) {
            setCapitanId(null); // Si el jugador eliminado era el capitán, restablecer el capitanId
        }
        setJugadores(nuevosJugadores); // Actualiza el estado con los jugadores restantes
    };

    // Seleccionar capitán
    const handleSetCapitan = (id) => {
        if (capitanId === id) {
            setCapitanId(null);  // Desmarcar como capitán si ya es el capitán
        } else {
            setCapitanId(id);  // Marcar como capitán
        }
    };

    // Manejo del envío del formulario sin validaciones en el frontend
    const handleSubmit = async (event) => {
        event.preventDefault();

        const nombreEquipo = document.querySelector('input[name="nombre"]').value;
        const centroSeleccionado = document.querySelector('select[name="centro"]').value;

        const nombreEntrenador = document.querySelector('input[name="entrenador_nombre_completo"]').value;
        const emailEntrenador = document.querySelector('input[name="entrenador_email"]').value;

        const jugadoresData = jugadores.map((jugador) => {
            const jugadorElem = document.getElementById(`jugador-${jugador.id}`);
            if (!jugadorElem) return {};

            const nombreCompleto = jugadorElem.querySelector('[name="nombre_completo"]').value;
            const estudio_id = jugadorElem.querySelector('[name="estudio_id"]').value;

            let jugadorData = {
                nombre_completo: nombreCompleto,
                estudio_id,
            };

            if (jugador.id === capitanId) {
                const dni = jugadorElem.querySelector('[name="dni"]').value;
                const email = jugadorElem.querySelector('[name="email"]').value;
                const telefono = jugadorElem.querySelector('[name="telf"]').value;
                jugadorData = {
                    ...jugadorData,
                    dni,
                    email,
                    telefono,
                    capitan: 1,
                };
            } else {
                jugadorData = { ...jugadorData, capitan: 0 };
            }

            return jugadorData;
        });

        const formData = {
            nombre: nombreEquipo,
            centro_id: centroSeleccionado,
            entrenador_nombre_completo: nombreEntrenador,
            entrenador_email: emailEntrenador,
            jugadores: jugadoresData,
        };

        try {
            const response = await api.post("/equipos", formData);
            alert("Formulario enviado correctamente");
        } catch (error) {
            console.error("Error al enviar el formulario", error);
        }
    };



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



    if (!estudios.length) {
        return <Spinner />;
    }

    return (
        <div className="container bg-light border rounded p-5">
            <h2 className="text-center">Inscribe a tu Equipo</h2>
            <div className="row d-flex justify-content-between mb-4">

                {/* Tarjeta Equipo */}
                <div
                    className="tarjeta card mb-3 text-center d-flex justify-content-center align-items-center mt-5"
                    onClick={() => setActivo("equipo")}
                    style={{ cursor: "pointer" }}
                >
                    <div className="d-flex justify-content-center mt-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="130" height="130" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
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
                        <img src="https://img.icons8.com/ios-filled/100/personal-trainer.png" alt="personal-trainer" />
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
                        <img src="https://img.icons8.com/ios-filled/100/groups.png" alt="groups" />
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
                    {/* Condiciones para cada formulario */}
                    {activo === "equipo" && (
                        <div className="mb-1 p-3">
                            <label>Nombre del Equipo: *</label>
                            <input
                                type="text"
                                className="form-control mb-4"
                                name="nombre"
                                value={nombreEquipo}
                                onChange={handleNombreEquipoChange}
                            />
                            <label>Centro: *</label>
                            <select
                                className="form-select"
                                name="centro"
                                value={centroSeleccionado}
                                onChange={handleCentroSeleccionadoChange}
                            >
                                <option value="">Selecciona un centro</option>
                                {Array.isArray(centros) && centros.map((centro) => (
                                    <option key={centro.id} value={centro.id}>
                                        {centro.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {activo === "entrenador" && (
                        <div className="mb-1 p-3">
                            <label>Nombre Completo: *</label>
                            <input
                                type="text"
                                className="form-control mb-4"
                                name="entrenador_nombre_completo"
                                value={nombreEntrenador}
                                onChange={handleNombreEntrenadorChange}
                            />
                            <label>Email: *</label>
                            <input
                                type="email"
                                className="form-control mb-4"
                                name="entrenador_email"
                                value={emailEntrenador}
                                onChange={handleEmailEntrenadorChange}
                            />
                        </div>
                    )}

                    {activo === "jugadores" && (
                        <div>
                            <button
                                className="btn btn-primary ms-3 mb-4 w-25"
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
                                        dniCapitan={capitan.dni || ""}
                                        emailCapitan={capitan.email || ""}
                                        telefonoCapitan={capitan.telefono || ""}
                                        estudio_id={jugador.estudio_id}
                                        esCapitan={capitanId === jugador.id}
                                        onRemove={eliminarJugador}
                                        onSetCapitan={handleSetCapitan}
                                        isCapitanDisabled={capitanId !== null && capitanId !== jugador.id}
                                        errores={errores[jugadores[index]] || {}}
                                        estudios={estudios}
                                        numeroJugador={index + 1}
                                        onJugadorChange={handleJugadorChange}
                                    />
                                ))}



                                {errores["jugadores"] && Array.isArray(errores["jugadores"]) && (
                                    errores["jugadores"].map((mensaje, i) => (
                                        <span key={i} className="text-danger small d-block">
                                            {mensaje}
                                        </span>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </TarjetaFormulario>
            )}

            <button className="btn btn-success mt-3 w-25" onClick={handleSubmit}>
                <i className="bi bi-send-fill m-2"></i>
                Enviar
            </button>
        </div>
    );
}

export default Inscribirse;
