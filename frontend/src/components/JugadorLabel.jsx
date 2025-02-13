import { useState } from "react";

function JugadorLabel({ id, esCapitan, onRemove, onSetCapitan, isCapitanDisabled }) {
    const [isCapitanState, setIsCapitanState] = useState(esCapitan);

    // handle para mostrar el confirm al eliminar el jugador
    const handleRemove = () => {
        if (window.confirm("¿Seguro que quieres eliminar el jugador?")) {
            onRemove(id);
        }
    };

    const handleCapitanChange = () => {
        // si ya existe un capitan, no permitimos marcar este jugador como capitan
        if (isCapitanDisabled) {
            return; // no hace nada si el checkbox esta deshabilitado
        }

        // si no esta deshabilitado cambiamos el estado para marcar o desmarcarlo como capitan
        onSetCapitan(id); // actualiza el capitan de el padre
        setIsCapitanState(!isCapitanState); // cambia el estado del capitan localmente
    };


    return (
        // contenedor principal del jugador
        <div className="d-flex justify-content-flex align-items-center">
            {/* cabecera del jugador */}
            <div className="card p-3 mb-4 bg-light col-11" id={{id}}>
                {/* titulo de jugador*/}
                <div className="w-100 bg-secondary py-2 px-3 text-white rounded d-flex align-items-center justify-content-between">
                    <h5 className="m-0">Jugador {id + 1}</h5>

                    {/* checkbox de capitan */}
                    <div className="form-check form-switch d-flex align-items-center">
                        <input
                            className="form-check-input me-2"
                            type="checkbox"
                            role="switch"
                            id={`capitan-${id}`}
                            checked={isCapitanState}
                            onChange={handleCapitanChange}
                            disabled={isCapitanDisabled}  // Deshabilitar si ya hay un capitán
                        />
                        <label className="form-check-label" htmlFor={`capitan-${id}`}>
                            Capitán
                        </label>
                    </div>
                </div>

                {/* primera fila de campos */}
                <div className="row mt-3">
                    <div className="col d-flex flex-column align-items-start gap-2 mb-5">
                        <label className="mb-0">Nombre Completo: *</label>
                        <input type="text" className="form-control w-75" name="nombre"/>
                        <span className="text-danger small"></span>
                    </div>
                    <div className="col d-flex flex-column align-items-start gap-2 mb-5">
                        <label className="mb-0">Ciclo: *</label>
                        <select className="form-select w-50" aria-label="Default select example" name="ciclo">
                            
                        </select>
                        <span className="text-danger small"></span>
                    </div>
                </div>

                {/* si es capitan añade los campos necesarios */}
                {isCapitanState && (
                    <div className="row mt-3">
                        <div className="col d-flex flex-column align-items-start gap-2 mb-4">
                            <label className="mb-0">DNI: *</label>
                            <input type="text" className="form-control w-50" name="dni" />
                            <span className="text-danger small"></span>
                        </div>
                        <div className="col d-flex flex-column align-items-start gap-2 mb-4">
                            <label className="mb-0">Email: *</label>
                            <input type="email" className="form-control w-75" name="email"/>
                            <span className="text-danger small"></span>
                        </div>
                        <div className="col d-flex flex-column align-items-start gap-2 mb-4">
                            <label className="mb-0">Teléfono: *</label>
                            <input type="tel" className="form-control w-50" name="telf"/>
                            <span className="text-danger small"></span>
                        </div>
                    </div>
                )}
            </div>

            {/* boton para eliminar el jugador */}
            <div>
                <i
                    className="bi bi-trash text-danger fs-4 m-5"
                    style={{ cursor: "pointer" }}
                    onClick={handleRemove}
                ></i>
            </div>
        </div>
    );
}

export default JugadorLabel;
