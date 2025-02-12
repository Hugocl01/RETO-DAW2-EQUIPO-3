import JugadorLabel from "./JugadorLabel.jsx";

function Inscribirse() {
    return (
        <div className="container mt-4">
            <div className="card mb-4 p-4 bg-light">
                <h5 className="w-100 bg-secondary p-2 text-white rounded">Equipo</h5>
                <div className="mb-3 p-3 d-flex align-items-center gap-3">
                    <label className="mb-0 mt-2">Nombre:</label>
                    <input type="text" className="form-control w-50" />

                    <label className="mb-0 mt-2">Entrenador:</label>
                    <select className="form-select w-50" aria-label="Default select example">
                        <option>Opción 1</option>
                        <option>Opción 2</option>
                        <option>Opción 3</option>
                        <option>Opción 4</option>
                        <option>Opción 5</option>
                        <option>Opción 6</option>
                        <option>Opción 7</option>
                    </select>
                </div>

                <button className="bg-secondary text-white w-25 mb-4 ms-4 rounded py-2 border-0">
                <i class="bi bi-plus-circle-fill m-2"></i>
                    Añadir Jugador
                </button>

                <JugadorLabel />
                
            </div>
        </div>
    );
}

export default Inscribirse;
