import { useState, useEffect } from "react";
import JugadorLabel from "./JugadorLabel.jsx";
import api from "../services/api.js";
import Spinner from "../components/Spinner.jsx";

function Inscribirse() {
    const [jugadores, setJugadores] = useState([]);
    const [capitanId, setCapitanId] = useState(null);
    const [errores, setErrores] = useState({}); // estado general para errores que vengan del backend
    const [estudios, setEstudios] = useState([]);
    const [centros, setCentros] = useState([]);

    // Agregar jugador
    const agregarJugador = () => {
        setJugadores([...jugadores, { id: jugadores.length }]);
    };

    // Eliminar jugador
    const eliminarJugador = (id) => {
        const nuevosJugadores = jugadores
            .filter((jugador) => jugador.id !== id)
            .map((jugador, index) => ({ ...jugador, id: index }));
        setJugadores(nuevosJugadores);
        if (capitanId === id) {
            setCapitanId(null);
        }
    };

    // Seleccionar capitán (único)
    const handleSetCapitan = (id) => {
        if (capitanId === id) {
            setCapitanId(null);
        } else if (capitanId !== null) {
            alert("Solo puedes elegir un capitán");
        } else {
            setCapitanId(id);
        }
    };

    // Manejo del envío del formulario sin validaciones en el frontend
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Recopilar datos del equipo
        const nombreEquipo = document.querySelector('input[name="nombre"]').value;
        const centroSeleccionado = document.querySelector('select[name="centro"]').value;

        // Recopilar datos del entrenador
        const nombreEntrenador = document.querySelector('input[name="entrenador_nombre_completo"]').value;
        const emailEntrenador = document.querySelector('input[name="entrenador_email"]').value;

        // Recopilar datos de los jugadores
        const jugadoresData = jugadores.map((jugador) => {
            const jugadorElem = document.getElementById(`jugador-${jugador.id}`);
            if (!jugadorElem) return {};

            const nombreCompleto = jugadorElem.querySelector('[name="nombre_completo"]').value;
            const estudio = jugadorElem.querySelector('[name="estudio_id"]').value;

            // Si es el capitán, incluir campos adicionales
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
                    capitan: 1, // marca como capitán
                };
            } else {
                jugadorData = { ...jugadorData, capitan: 0 };
            }

            return jugadorData;
        });

        // Estructura final de datos a enviar (ajusta las llaves según lo que espera tu API)
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
            // Puedes redirigir o limpiar el formulario aquí
        } catch (error) {
            // Manejo de errores devueltos por el backend
            if (error.response && error.response.data && error.response.data.errors) {
                setErrores(error.response.data.errors);
            } else {
                console.error("Error al enviar el formulario:", error);
            }
        }
    };

    // Solicitar datos de estudios y centros
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

    // Si aún no se han cargado los estudios, mostrar un spinner
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
                {jugadores.map((jugador) => (
                    <JugadorLabel
                        key={jugador.id}
                        id={jugador.id}
                        esCapitan={capitanId === jugador.id}
                        onRemove={eliminarJugador}
                        onSetCapitan={handleSetCapitan}
                        isCapitanDisabled={capitanId !== null && capitanId !== jugador.id}
                        // En este ejemplo, JugadorLabel se encargará de mostrar los errores individuales si los hay
                        errores={errores[`jugadores.${jugador.id}`] || {}}
                        estudios={estudios}
                    />
                ))}
                {/* Botón para enviar */}
                <button className="btn btn-success mt-3 w-25" onClick={handleSubmit}>
                    <i className="bi bi-send-fill m-2"></i>
                    Enviar
                </button>
            </div>
        </div>
    );
}

export default Inscribirse;
