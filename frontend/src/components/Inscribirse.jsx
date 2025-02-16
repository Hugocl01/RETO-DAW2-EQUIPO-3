import { useState, useEffect } from "react";
import JugadorLabel from "./JugadorLabel.jsx";
import api from "../services/api.js";
import Spinner from "../components/Spinner.jsx";

function Inscribirse() {
    const [jugadores, setJugadores] = useState([]);
    const [capitanId, setCapitanId] = useState(null);
    const [errores, setErrores] = useState({});
    const [estudios, setEstudios] = useState([]);
    const [centros, setCentros] = useState([]);

    // Agregar jugador
    const agregarJugador = () => {
        setJugadores([...jugadores, { id: jugadores.length, nombre_completo: '', estudio_id: '' }]);
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
            const estudio = jugadorElem.querySelector('[name="estudio_id"]').value;

            let jugadorData = {
                nombre_completo: nombreCompleto,
                estudio,
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
            if (error.response && error.response.data && error.response.data.errors) {
                const nuevosErrores = {};
                const erroresBackend = error.response.data.errors;

                Object.keys(erroresBackend).forEach((clave) => {
                    if (clave.startsWith("jugadores")) {
                        const jugadorId = clave.split('.')[1];
                        if (!nuevosErrores[`jugadores.${jugadorId}`]) {
                            nuevosErrores[`jugadores.${jugadorId}`] = {};
                        }
                        if (clave.includes("estudio")) {
                            nuevosErrores[`jugadores.${jugadorId}`]["estudio"] = erroresBackend[clave][0];
                        } else {
                            nuevosErrores[`jugadores.${jugadorId}`][clave.split('.')[2]] = erroresBackend[clave][0];
                        }
                    } else {
                        nuevosErrores[clave] = erroresBackend[clave][0];
                    }
                });

                setErrores(nuevosErrores);
            } else {
                console.error("Error al enviar el formulario:", error);
            }
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
                if (respuestaCentros.data.status === "success") {
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
        <div className="container mt-4">
            <div className="card p-3 mb-4 bg-light">
                <h5 className="m-0 bg-secondary py-2 px-3 text-white rounded">Equipo</h5>
                <div className="mb-1 p-3">
                    <div className="row mt-3">
                        <div className="col">
                            <label>Nombre: *</label>
                            <input type="text" className="form-control" name="nombre" />
                            {errores.nombre && (
                                <span className="text-danger small">{errores.nombre}</span>
                            )}
                        </div>
                        <div className="col">
                            <label>Centro: *</label>
                            <select className="form-select" name="centro">
                                <option value="">Selecciona un centro</option>
                                {centros.map((centro) => (
                                    <option key={centro.id} value={centro.id}>
                                        {centro.nombre}
                                    </option>
                                ))}
                            </select>
                            {errores.centro_id && (
                                <span className="text-danger small">{errores.centro_id}</span>
                            )}
                        </div>
                    </div>
                </div>

                <h5 className="m-0 bg-secondary py-2 px-3 text-white rounded">Entrenador</h5>
                <div className="mb-1 p-3">
                    <div className="row mt-3">
                        <div className="col">
                            <label>Nombre Completo: *</label>
                            <input type="text" className="form-control" name="entrenador_nombre_completo" />
                            {errores["entrenador_nombre_completo"] && (
                                <span className="text-danger small">
                                    {errores["entrenador_nombre_completo"]}
                                </span>
                            )}
                        </div>
                        <div className="col">
                            <label>Email: *</label>
                            <input type="email" className="form-control" name="entrenador_email" />
                            {errores["entrenador_email"] && (
                                <span className="text-danger small">
                                    {errores["entrenador_email"]}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <button
                    className="btn btn-secondary ms-3 mb-4 w-25"
                    onClick={agregarJugador}
                >
                    <i className="bi bi-plus-circle-fill m-2"></i>
                    Añadir Jugador
                </button>
                {jugadores.map((jugador, index) => (
                    <JugadorLabel
                        key={jugador.id}
                        id={jugador.id}
                        esCapitan={capitanId === jugador.id}
                        onRemove={eliminarJugador}
                        onSetCapitan={handleSetCapitan}
                        isCapitanDisabled={capitanId !== null && capitanId !== jugador.id}
                        errores={errores[`jugadores.${jugador.id}`] || {}}
                        estudios={estudios}
                        numeroJugador={index + 1}
                    />
                ))}



                <button className="btn btn-success mt-3 w-25" onClick={handleSubmit}>
                    <i className="bi bi-send-fill m-2"></i>
                    Enviar
                </button>
            </div>
        </div>
    );
}

export default Inscribirse;
