import { useEffect, useState } from 'react';
import "./css/EstilosComun.css";
import "./css/Retos.css";
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
import img2 from "../assets/imagenes/img2.png";
import fetchData from '../data/FetchData';

// Lista de iconos para los retos
const iconos = [
    entrenador,
    marcador,
    corazon,
    masaje,
    jabon,
    termal,
    camara,
    sonido,
    red,
    pc,
    servidor,
    coche,
    grafico,
    camiseta,
    food_truck,
    lapiz,
    inclusion
];

const imagenDefault = img2; // Imagen por defecto si no hay una disponible

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

    /**
     * Efecto para obtener los retos al montar el componente.
     */
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
                                {/* Tarjeta del reto */}
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

                                {/* Modal para ver más detalles del reto */}
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
