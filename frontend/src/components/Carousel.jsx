import React from 'react';

import "./css/Carrusel.css";
import "./css/EstilosComun.css";


function Carousel({ id, items, intervalo }) {
    // Agrupamos los elementos en filas de 3
    const groupedItems = [];
    for (let i = 0; i < items.length; i += 3) {
        groupedItems.push(items.slice(i, i + 3));
    }

    return (
        <div id={id} className="carousel carousel-dark slide" data-bs-ride="carousel" data-bs-interval={intervalo}>
            <div className="carousel-indicators">
                {groupedItems.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target={`#${id}`}
                        data-bs-slide-to={index}
                        className={index === 0 ? 'active' : ''}
                        aria-current={index === 0 ? 'true' : 'false'}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>

            <div className="carousel-inner p-5">
                {groupedItems.map((group, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <div className="container">
                            <div className="row justify-content-center">
                                {group.map((item, i) => (
                                    <div key={i} className="col-md-4 d-flex justify-content-center">
                                        <div className="card text-center shadow-lg custom-card">
                                            <img src={item.imagen} className="card-img-top" alt={item.title} />
                                            <div className="card-body">
                                                <h5 className="card-title">{item.title}</h5>
                                                <p className="card-text text-muted">{item.date}</p>
                                                <p className="card-text">{item.text}</p>
                                                <button className="btn btn-success">LEER MÁS</button>
                                            </div>
                                        </div>
                                    </div>
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
    );
}

export default Carousel;
