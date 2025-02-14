import imagenPrueba from "../assets/imagenes/img1.jpg";

function Retos() {

    return (
        <div className="container mt-4">
            <h3 className="fw-bold">Retos</h3>
            <div className="d-flex flex-wrap gap-3 justify-content-center">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                    <div className="card" style={{ width: "200px" }} key={num}>
                        <img src={imagenPrueba} className="card-img-top" alt={`Reto ${num}`} />
                        <div className="card-body">
                            <p className="card-text">Descripción del reto {num}.</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Retos;