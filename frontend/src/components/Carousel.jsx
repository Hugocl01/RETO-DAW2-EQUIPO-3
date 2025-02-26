import React, { useState } from "react";
import "./css/Carrusel.css";
import "./css/EstilosComun.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Carousel({ id, items, intervalo }) {
    const [selectedItem, setSelectedItem] = useState(null);

    const groupedItems = [];
    for (let i = 0; i < items.length; i += 3) {
        groupedItems.push(items.slice(i, i + 3));
    }

    return (
        <>
            <div id={id} className="carousel carousel-dark slide" data-bs-ride="carousel" data-bs-interval={intervalo}>
                <div className="carousel-indicators">
                    {groupedItems.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target={`#${id}`}
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                            aria-current={index === 0 ? "true" : "false"}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>

                <div className="carousel-inner p-5">
                    {groupedItems.map((group, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                            <div className="container">
                                <div className="row justify-content-center">
                                    {group.map((item, i) => (
                                        item ? (
                                            <div key={i} className="col-md-4 d-flex justify-content-center">
                                                <div className="card text-center shadow-lg custom-card">
                                                    <img 
                                                    src={item?.imagen || "../src/assets/imagenes/img2.png"} className="card-img-top" alt={item?.titulo || "Sin título"} 
                                                    />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{item?.titulo || "Sin título"}</h5>
                                                        <p className="card-text text-center">
                                                            {item?.texto?.length > 160
                                                                ? `${item.texto.substring(0, 150)}...`
                                                                : item?.texto || "No hay contenido disponible"}
                                                        </p>
                                                        {item?.texto?.length > 150 && (
                                                            <button
                                                                className="btn btn-success"
                                                                onClick={() => {
                                                                    setSelectedItem(item);
                                                                }}
                                                                data-bs-toggle="modal"
                                                                data-bs-target={`#leerMasModal_${id}`}
                                                            >
                                                                LEER MÁS
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null
                                    ))}

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target={`#${id}`} data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target={`#${id}`} data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* Modal */}
            <div className="modal fade" id={`leerMasModal_${id}`} tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{selectedItem ? selectedItem.titulo : "Título"}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {selectedItem ? (
                                <>
                                    <img src={selectedItem?.imagen || "../src/assets/imagenes/img2.png"} className="img-fluid mb-3" alt={selectedItem.titulo} />
                                    <p>{selectedItem.texto}</p>
                                </>
                            ) : (
                                <p>Cargando...</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Carousel;
