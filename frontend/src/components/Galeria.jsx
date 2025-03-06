import "./css/EstilosComun.css";
import imagenDefault from "../assets/imagenes/default.jpg";

/**
 * Componente que muestra una galería de imágenes con un pie de foto.
 * 
 * Este componente renderiza una sección de galería que contiene un título y una cuadrícula de tarjetas.
 * Cada tarjeta muestra una imagen y un pie de foto numerado. La imagen utilizada es la misma para todas
 * las tarjetas, y se genera un total de 8 tarjetas utilizando un array de longitud 8.
 * 
 * @component
 * @returns {JSX.Element} El componente de la galería, que incluye un título y una cuadrícula de tarjetas.
 */
function Galeria() {
    return (
        <div className="container mt-4">
            {/* Título de la galería */}
            <div className="d-flex justify-content-center align-items-center">
                <h1>Galería</h1>
            </div>

            {/* Cuadrícula de tarjetas */}
            <div className="row justify-content-center">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="col-md-4 col-sm-6 col-12 mb-4">
                        {/* Tarjeta individual */}
                        <div className="card">
                            {/* Imagen de la tarjeta */}
                            <img src={imagenDefault} className="card-img-top" alt="..." />

                            {/* Cuerpo de la tarjeta con el pie de foto */}
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
