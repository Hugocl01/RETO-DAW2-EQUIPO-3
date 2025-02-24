import { useState } from "react";
import "./css/Inscribirse.css";
import "./css/JugadorLabel.css";

function JugadorLabel({ id, esCapitan, onRemove, onSetCapitan, isCapitanDisabled, errores, estudios, numeroJugador }) {
    const [animating, setAnimating] = useState(false);

    const handleDelete = () => {
        setAnimating(true);
        setTimeout(() => {
            onRemove(id);
        }, 300); 
    };

    return (
        <div className={`d-flex justify-content-flex align-items-center ${animating ? 'fade-out' : ''}`}>
            <div className="card p-3 mb-4 bg-light col-11" id={`jugador-${id}`}>
                <div className="w-100 bg-primary py-2 px-3 text-white rounded d-flex align-items-center justify-content-between">
                    <h5 className="m-0">Jugador {numeroJugador}</h5>
                    <div className="form-check form-switch d-flex align-items-center">
                        <input
                            className="form-check-input me-2"
                            type="checkbox"
                            role="switch"
                            id={`capitan-${id}`}
                            checked={esCapitan}
                            onChange={() => onSetCapitan(id)}
                            disabled={isCapitanDisabled}
                        />
                        <label className="form-check-label" htmlFor={`capitan-${id}`}>Capitán</label>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <label>Nombre Completo: *</label>
                        <input type="text" className="form-control" name="nombre_completo" />
                        <span className="text-danger small">{errores?.nombre_completo}</span>
                    </div>
                    <div className="col">
                        <label>Estudio: *</label>
                        <select className="form-select" name="estudio_id">
                            <option value="">Selecciona un estudio</option>
                            {estudios.map((estudio) => (
                                <option key={estudio.id} value={estudio.id}>
                                    {estudio.ciclo} - Curso {estudio.curso}
                                </option>
                            ))}
                        </select>
                        {errores?.estudio && (
                            <span className="text-danger small">{errores?.estudio}</span>
                        )}

                    </div>
                </div>
                {esCapitan && (
                    <div className="row mt-3">
                        <div className="col">
                            <label>DNI: *</label>
                            <input type="text" className="form-control" name="dni" />
                            {errores?.dni && (
                                <span className="text-danger small">{errores.dni}</span>
                            )}
                        </div>
                        <div className="col">
                            <label>Email: *</label>
                            <input type="email" className="form-control" name="email" />
                            {errores?.email && (
                                <span className="text-danger small">{errores.email}</span>
                            )}
                        </div>
                        <div className="col">
                            <label>Teléfono: *</label>
                            <input type="tel" className="form-control" name="telf" />
                            {errores?.telefono && (
                                <span className="text-danger small">{errores.telefono}</span>
                            )}
                        </div>
                    </div>
                )}

                {/* Botón de eliminar debajo de todos los campos */}
                <div className="d-flex justify-content-left mt-3">
                    <button
                        className="btn btn-danger"
                        onClick={handleDelete}
                        id="botonEliminarResponsive"
                    >
                        Eliminar Jugador
                    </button>
                </div>
            </div>

            <div className="eliminar">
                <i
                    className="bi bi-trash text-danger fs-4 m-5"
                    style={{ cursor: "pointer" }}
                    onClick={handleDelete} 
                ></i>
            </div>
        </div>
    );
}

export default JugadorLabel;
