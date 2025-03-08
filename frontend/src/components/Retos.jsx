import { useEffect, useState } from 'react';
import entrenador from "../assets/imagenes/retosIconos/entrenador.png";
import marcador from "../assets/imagenes/retosIconos/marcador.png";
import corazon from "../assets/imagenes/retosIconos/corazon.png";
import masaje from "../assets/imagenes/retosIconos/masaje.png";
import jabon from "../assets/imagenes/retosIconos/jabon.png";
import termal from "../assets/imagenes/retosIconos/termal.png";
import camara from "../assets/imagenes/retosIconos/camara.png";
import sonido from "../assets/imagenes/retosIconos/sonido.png";
import red from "../assets/imagenes/retosIconos/red.png";
import pc from "../assets/imagenes/retosIconos/pc.png";
import servidor from "../assets/imagenes/retosIconos/servidor.png";
import coche from "../assets/imagenes/retosIconos/coche.png";
import grafico from "../assets/imagenes/retosIconos/grafico.png";
import camiseta from "../assets/imagenes/retosIconos/camiseta.png";
import food_truck from "../assets/imagenes/retosIconos/food-truck.png";
import lapiz from "../assets/imagenes/retosIconos/lapiz.png";
import inclusion from "../assets/imagenes/retosIconos/inclusion.png";
import fetchData from '../data/FetchData';

// Lista de iconos para los retos
const iconos = [
    entrenador, marcador, corazon, masaje, jabon, termal, camara, sonido, red,
    pc, servidor, coche, grafico, camiseta, food_truck, lapiz, inclusion
];

/**
 * Componente `Retos` que muestra una lista de retos con sus detalles.
 * Cada reto tiene un icono, un título, una descripción y un modal para ver más detalles.
 * 
 * @component
 * @returns {JSX.Element} Componente que representa la lista de retos.
 */
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
        <div className="container mt-5">
            <h1 className="text-center mb-5">Retos Participantes</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {retos.map((reto, index) => (
                    <div key={reto.id}>
                        {/* Tarjeta del reto */}
                        <div className="card h-100 shadow-sm d-flex flex-column justify-content-between align-items-center gap-3 p-3">
                            <img
                                src={iconos[index % iconos.length]}
                                alt={reto.titulo}
                                style={{ height: "150px", objectFit: "contain" }}
                            />
                            <div>
                                <h5 className="card-title text-center mb-3">{reto.titulo}</h5>
                                <div
                                    className="card-text"
                                    style={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                    dangerouslySetInnerHTML={{ __html: reto.texto }}
                                />
                            </div>
                            <div className="text-center">
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

                        {/* Modal para ver más detalles del reto */}
                        <div className="modal fade" id={`leerMasModal_${reto.id}`} tabIndex="-1" aria-hidden="true">
                            <div className="modal-dialog modal-lg modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">{reto.titulo}</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div dangerouslySetInnerHTML={{ __html: reto.texto }} />
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
    );
}

export default Retos;