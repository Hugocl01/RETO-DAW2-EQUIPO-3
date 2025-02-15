import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from "../services/api";
import imagenPrueba from "../assets/imagenes/img2.png"

function Retos() {
    const [retos, setRetos] = useState([]);

    useEffect(() => {
        const fetchSecciones = async () => {
            try {
                const response = await api.get('/retos');
                setRetos(response.data.retos || []);
            } catch (error) {
                console.error("Error al obtener retos:", error);
            }
        };

        fetchSecciones();
    }, []);

    return (
        <div className="container mt-4">
            <h1>Listado de Retos</h1>
            <div className="row">
                {retos.map((reto) => (
                    <div className="col-md-4 mb-3" key={reto.id}>
                        <div className="card h-100">
                            <img src={imagenPrueba} className='card-img-top' alt="reto.titulo" />
                            <div className="card-body">
                                <h5 className="card-title">{reto.titulo}</h5>
                                <p className="card-text">
                                    {reto.texto.length > 80
                                        ? reto.texto.slice(0, 80) + '...'
                                        : reto.texto}
                                </p>
                                {/* Botón "Ver Detalles" redirige la page de Reto */}
                                <Link
                                    to={`retos/${reto.id}`}
                                    className="btn btn-primary"
                                >
                                    Ver Detalles
                                </Link>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Retos;