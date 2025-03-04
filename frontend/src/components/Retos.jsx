import { useEffect, useState } from 'react';
import "./css/EstilosComun.css";
import "./css/Retos.css";
import fetchData from '../data/FetchData';


const iconos = [
    "../src/assets/imagenes/retosIconos/entrenador.png",
    "../src/assets/imagenes/retosIconos/marcador.png",
    "../src/assets/imagenes/retosIconos/corazon.png",
    "../src/assets/imagenes/retosIconos/masaje.png",
    "../src/assets/imagenes/retosIconos/jabon.png",
    "../src/assets/imagenes/retosIconos/termal.png",
    "../src/assets/imagenes/retosIconos/camara.png",
    "../src/assets/imagenes/retosIconos/sonido.png",
    "../src/assets/imagenes/retosIconos/red.png",
    "../src/assets/imagenes/retosIconos/pc.png",
    "../src/assets/imagenes/retosIconos/servidor.png",
    "../src/assets/imagenes/retosIconos/coche.png",
    "../src/assets/imagenes/retosIconos/grafico.png",
    "../src/assets/imagenes/retosIconos/camiseta.png",
    "../src/assets/imagenes/retosIconos/food-truck.png",
    "../src/assets/imagenes/retosIconos/lapiz.png",
    "../src/assets/imagenes/retosIconos/inclusion.png",
];

const imagenDefault = "../src/assets/imagenes/img2.png"; // Imagen por defecto si no hay una disponible

function Retos() {
    const [retos, setRetos] = useState([]);
    const [selectedReto, setSelectedReto] = useState(null);

    useEffect(() => {
        const fetchRetos = async () => {
            try {
                const response = await fetchData('retos');
                setRetos(response.retos || []);
            } catch (error) {
                console.error("Error al obtener retos:", error);
            }
        };
        fetchRetos();
    }, []);

    return (
        <>
            {retos.length > 0 && (
                <div className="retos container mt-5 d-flex flex-column justify-content-center align-items-center">
                    <h1 className="mt-5">Retos Participantes</h1>
                    <div className="row">
                        {retos.map((reto, index) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-3 text-center" key={reto.id}>
                                <div className="card h-100 mx-auto p-3 d-flex flex-column justify-content-center align-items-center" style={{ width: '85%' }}>
                                    <img src={iconos[index % iconos.length]} className="card-img-top" alt={reto.titulo} />
                                    <div className="card-body">
                                        <h5 className="card-title">{reto.titulo}</h5>
                                        <p className="card-text">
                                            {reto.texto.length > 80 ? reto.texto.slice(0, 80) + '...' : reto.texto}
                                        </p>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => setSelectedReto(reto)}
                                            data-bs-toggle="modal"
                                            data-bs-target={`#leerMasModal_${reto.id}`}
                                        >
                                            Ver Detalles
                                        </button>
                                    </div>
                                </div>

                                {/* Modal individual para cada reto */}
                                <div className="modal fade" id={`leerMasModal_${reto.id}`} tabIndex="-1" aria-hidden="true">
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">{reto.titulo}</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <img
                                                    src={reto.imagen || imagenDefault}
                                                    className="img-fluid mb-3"
                                                    alt={reto.titulo}
                                                />
                                                <p>{reto.texto}</p>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                                    Cerrar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default Retos;
