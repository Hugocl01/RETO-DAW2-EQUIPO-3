
function JugadorLabel(esCapitan) {
    return (
        <div className="d-flex justify-content-flex align-items-center">
            <div className="card p-4 mb-4 bg-light col-11">
                <h5 className="w-100 bg-secondary p-2 text-white rounded">Jugador 1</h5>
                <div className="row">
                    <div className="col d-flex align-items-center gap-3 mb-3">
                        <label className="mb-0 mt-2">Nombre:</label>
                        <input type="text" className="form-control w-50" />
                    </div>
                    <div className="col d-flex align-items-center gap-3 mb-3">
                        <label className="mb-0 mt-2">Primer apellido:</label>
                        <input type="text" className="form-control w-75" />
                    </div>
                    <div className="col d-flex align-items-center gap-3 mb-3">
                        <label className="mb-0 mt-2">Segundo apellido:</label>
                        <input type="text" className="form-control w-75" />
                    </div>
                </div>

                <div className="row">
                    <div className="col d-flex align-items-center gap-3 mb-3">
                        <label className="mb-0 mt-2">Ciclo formativo:</label>
                        <input type="text" className="form-control w-75" />
                    </div>
                    <div className="col d-flex align-items-center gap-3 mb-3">
                        <label className="mb-0 mt-2">DNI:</label>
                        <input type="text" className="form-control w-75" />
                    </div>
                </div>

            </div>
            <div>
                <i
                    className="bi bi-trash text-danger fs-4 m-5 cursor-pointer"
                    style={{ cursor: "pointer" }}>
                </i>
            </div>
        </div>
    )
}
export default JugadorLabel;