import { useState } from "react";
import JugadorLabel from "./JugadorLabel.jsx";
import { validarNombre, errorNombre, validarDNI, errorDNI, validarTelefono, errorTelefono, validarEmail, errorEmail } from "./Validaciones.js";
//import api from "../../services/api.js";

function Inscribirse() {
    const [jugadores, setJugadores] = useState([]);
    const [capitanId, setCapitanId] = useState(null);
    const [erroresEquipos, setErroresEquipos] = useState({ nombre: "", entrenador: "" });
    const [erroresJugadores, setErroresJugadores] = useState({});
    const [ciclos, setCiclos] = useState([]);

    //agregar jugador
    const agregarJugador = () => {
        setJugadores([...jugadores, { id: jugadores.length }]);
    };

    //eliminar jugador
    const eliminarJugador = (id) => {
        const nuevosJugadores = jugadores.filter(jugador => jugador.id !== id)
            .map((jugador, index) => ({ ...jugador, id: index }));
        setJugadores(nuevosJugadores);

        if (capitanId === id) {
            setCapitanId(null);
        }
    };

    //handle para asociar el capitan
    const handleSetCapitan = (id) => {
        if (capitanId === id) {
            setCapitanId(null);
        } else if (capitanId !== null) {
            alert("Solo puedes elegir un capitán");
        } else {
            setCapitanId(id);
        }
    };

    //handle para las validaciones
    const handleSubmit = (event) => {
        event.preventDefault();

        //array para almacenar los errores
        let errores = {};
        let esValido = true;

        // validar nombre del equipo
        const nombreEquipo = document.querySelector('input[name="nombreEquipo"]').value;
        if (!validarNombre(nombreEquipo)) {
            errores["nombre"] = errorNombre(nombreEquipo);
            esValido = false;
        }

        // validar entrenador
        const entrenador = document.querySelector('select[name="entrenador"]').value;
        if (!entrenador.trim()) {
            errores["entrenador"] = "* Debes seleccionar un entrenador";
            esValido = false;
        }

        let erroresJ = {};
        jugadores.forEach((jugador) => {
            let errorJugador = {};
            const jugadorElem = document.getElementById(`jugador-${jugador.id}`);

            if (!jugadorElem) {
                return;
            }

            const nombre = jugadorElem.querySelector('[name="nombre"]').value;
            const ciclo = jugadorElem.querySelector('[name="ciclo"]').value;

            // validar nombre del jugador
            if (!validarNombre(nombre)) {
                errorJugador["nombre"] = errorNombre(nombre);
                esValido = false;
            } 

            // validar ciclo 
            if (!ciclo.trim()) {
                errorJugador["ciclo"] = "* Este campo es obligatorio";
                esValido = false;
            }

            // si es capitan validar campos dni, email y telf
            if (jugador.id === capitanId) {
                const dni = jugadorElem.querySelector('[name="dni"]').value;
                const email = jugadorElem.querySelector('[name="email"]').value;
                const telefono = jugadorElem.querySelector('[name="telf"]').value;

                if (!validarDNI(dni)) {
                    errorJugador["dni"] = errorDNI(dni);
                    esValido = false;
                }

                if (!validarEmail(email)) {
                    errorJugador["email"] = errorEmail(email);
                    esValido = false;
                }

                if (!validarTelefono(telefono)) {
                    errorJugador["telefono"] = errorTelefono(telefono);
                    esValido = false;
                }
            }

            erroresJ[jugador.id] = errorJugador;
        });

        setErroresEquipos(errores);
        setErroresJugadores(erroresJ);

        if (esValido) {
            alert("Formulario enviado correctamente");
        }
    };

    /*
    //solicitud a la api
    useEffect(() => {
        const obtenerCiclos = async () => {
          try {
            const respuesta = await api.get("/ciclos"); // Solicitud a la API para obtener ciclos
            if (respuesta.data.status === "success") {
              setCiclos(respuesta.data.ciclos); // Guarda los ciclos en el estado
            }
          } catch (error) {
            console.error("Error al obtener los ciclos:", error);
          }
        };
      
        obtenerCiclos();
      }, []);
    */

    /*
    // si no se han cargado los ciclos mostrar el spinner
    if (!ciclos.length) {
        return <Spinner />;
    }
    */


    return (
        <div className="container mt-4">
            <div className="card p-3 mb-4 bg-light">
                <h5 className="m-0 bg-secondary py-2 px-3 text-white rounded">Equipo</h5>
                <div className="mb-1 p-3">
                    <div className="row mt-3">
                        <div className="col">
                            <label>Nombre: *</label>
                            <input type="text" className="form-control" name="nombreEquipo" />
                            <span className="text-danger small">{erroresEquipos["nombre"]}</span>
                        </div>
                        <div className="col">
                            <label>Entrenador: *</label>
                            <select className="form-select" name="entrenador">
                                <option value="">Selecciona...</option>
                                <option>Entrenador 1</option>
                                <option>Entrenador 2</option>
                            </select>
                            <span className="text-danger small">{erroresEquipos.entrenador}</span>
                        </div>
                    </div>
                </div>
                <button className="btn btn-secondary ms-3 mb-4 w-25" onClick={agregarJugador}>
                    <i class="bi bi-plus-circle-fill m-2"></i>
                    Añadir Jugador</button>
                {jugadores.map((jugador) => (
                    <JugadorLabel
                        key={jugador.id}
                        id={jugador.id}
                        esCapitan={capitanId === jugador.id}
                        onRemove={eliminarJugador}
                        onSetCapitan={handleSetCapitan}
                        isCapitanDisabled={capitanId !== null && capitanId !== jugador.id}
                        errores={erroresJugadores[jugador.id] || {}}
                        /*ciclos={ciclos}*/
                    />
                ))}
                <button className="btn btn-success mt-3 w-25" onClick={handleSubmit}>
                    <i class="bi bi-send-fill m-2"></i>
                    Enviar</button>
            </div>
        </div>
    );
}

export default Inscribirse;