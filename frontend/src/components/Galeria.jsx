import "./css/EstilosComun.css";

function Galeria() {

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-center align-items-center">
                <h1>Galería</h1>
            </div>
            <div className="row justify-content-center">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="col-md-4 col-sm-6 col-12 mb-4">
                        <div className="card">
                            <img src="../src/assets/imagenes/img2.png" className="card-img-top" alt="..." />
                            <div className="card-body text-center">
                                <h5 className="card-title">Pie de Foto {index + 1}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Galeria;
