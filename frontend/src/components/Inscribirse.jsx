import { useState } from "react";
import JugadorLabel from "./JugadorLabel.jsx";

function Inscribirse() {
    const [jugadores, setJugadores] = useState([]);
    const [capitanId, setCapitanId] = useState(null); 

    // agregar jugador 
    const agregarJugador = () => {
        setJugadores([...jugadores, { id: jugadores.length }]);
    };

    // eliminar jugador 
    const eliminarJugador = (id) => {
        const nuevosJugadores = jugadores.filter(jugador => jugador.id !== id)
            .map((jugador, index) => ({ ...jugador, id: index }));
        setJugadores(nuevosJugadores);

        if (capitanId === id) {
            setCapitanId(null);
        }
    };


    const handleSetCapitan = (id) => {
        // si el jugador que se esta marcando ya es el capitan permitir desmarcarlo
        if (capitanId === id) {
            setCapitanId(null); 
        } else {
            // si ya existe un capitan, mostramos un mensaje de alerta
            if (capitanId !== null) {
                alert("Solo puedes elegir un capitán");  // Mostramos un aviso si ya hay un capitán
            } else {
                // Si no hay capitán, marcar al jugador actual como capitán
                setCapitanId(id); // Establecemos el id del nuevo capitán
            }
        }
    };
    

    return (
        //contenedor principal
        <div className="container mt-4">

            {/* contenedor principal del formulario */}
            <div className="card p-3 mb-4 bg-light">
                {/* cabecera */}
                <div className="w-100 bg-secondary py-2 px-3 text-white rounded d-flex align-items-center justify-content-between">
                    <h5 className="m-0">Equipo</h5>
                </div>

                {/* primera fila de campos */}
                <div className="mb-1 p-3">
                    <div className="row mt-3">
                        <div className="col d-flex align-items-center gap-2 mb-5">
                            <label className="mb-0">Nombre: *</label>
                            <input type="text" className="form-control w-60" />
                            <span className="text-danger small"></span>
                        </div>

                        <div className="col d-flex align-items-center gap-2 mb-5">
                            <label className="mb-0">Entrenador: *</label>
                            <select className="form-select w-60" aria-label="Default select example">
                                <option>Entrenador 1</option>
                                <option>Entrenador 2</option>
                                <option>Entrenador 3</option>
                                <option>Entrenador 4</option>
                                <option>Entrenador 5</option>
                                <option>Entrenador 6</option>
                                <option>Entrenador 7</option>
                                <option>Entrenador 8</option>
                                <option>Entrenador 9</option>
                                <option>Entrenador 10</option>
                            </select>
                            <span className="text-danger small"></span>
                        </div>
                    </div>
                </div>

                {/* boton agregar jugador */}
                <button
                    className="bg-secondary text-white w-25 mb-5 ms-4 rounded py-2 border-0"
                    onClick={agregarJugador}
                >
                    <i className="bi bi-plus-circle-fill m-2"></i>
                    Añadir Jugador
                </button>

                {/* para mostrar la tarjeta cuando se añade un jugador y recoger su id*/}
                {jugadores.map((jugador) => (
                    <JugadorLabel
                        key={jugador.id}
                        id={jugador.id}
                        esCapitan={capitanId === jugador.id}
                        onRemove={eliminarJugador}
                        onSetCapitan={handleSetCapitan}
                        isCapitanDisabled={capitanId !== null && capitanId !== jugador.id}  // Deshabilitar checkbox si ya hay un capitán
                    />
                ))}
            </div>
        </div>
    );
}

export default Inscribirse;
