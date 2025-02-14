import { useState } from "react";

function JugadorLabel({ id, esCapitan, onRemove, onSetCapitan, isCapitanDisabled, errores, ciclos }) {
    return (
        <div className="d-flex justify-content-flex align-items-center">
            <div className="card p-3 mb-4 bg-light col-11" id={`jugador-${id}`}>
                <div className="w-100 bg-secondary py-2 px-3 text-white rounded d-flex align-items-center justify-content-between">
                    <h5 className="m-0">Jugador {id + 1}</h5>
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
                        <input type="text" className="form-control" name="nombre" />
                        <span className="text-danger small">{errores?.nombre}</span>
                    </div>
                    <div className="col">
                        <label>Ciclo: *</label>

                        <select className="form-select" name="ciclo">
                            <option value="">Selecciona un ciclo</option>
                            {ciclos.map((ciclo) => (
                                <option key={ciclo.id} value={ciclo.id}>{ciclo.nombre}</option>
                            ))}
                        </select>

                        <span className="text-danger small">{errores?.ciclo}</span>
                    </div>
                </div>

                {esCapitan && (
                    <div className="row mt-3">
                        <div className="col">
                            <label>DNI: *</label>
                            <input type="text" className="form-control" name="dni" />
                            <span className="text-danger small">{errores?.dni}</span>
                        </div>
                        <div className="col">
                            <label>Email: *</label>
                            <input type="email" className="form-control" name="email" />
                            <span className="text-danger small">{errores?.email}</span>
                        </div>
                        <div className="col">
                            <label>Teléfono: *</label>
                            <input type="tel" className="form-control" name="telf" />
                            <span className="text-danger small">{errores?.telefono}</span>
                        </div>
                    </div>
                )}
            </div>

            <div>
                <i
                    className="bi bi-trash text-danger fs-4 m-5"
                    style={{ cursor: "pointer" }}
                    onClick={() => onRemove(id)}
                ></i>
            </div>
        </div>
    );
}

export default JugadorLabel;
