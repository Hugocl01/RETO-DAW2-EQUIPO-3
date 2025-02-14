import React from 'react';

function Carousel({ id, items, intervalo }) {
    return (
        <div id={id} className="carousel carousel-dark slide" data-bs-ride="carousel" data-bs-interval={intervalo}>
            <div className="carousel-indicators">
                {items.map((_, index) => (
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

            <div className="carousel-inner">
                {items.map((item, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <div className="bg-light p-3 rounded-2 d-flex flex-column align-items-center justify-content-center">
                            <div className="w-75 d-flex flex-column align-items-center justify-content-center">
                                <img className="mb-4 w-50 mt-3" src={item.imagen} alt={`Noticia ${index + 1}`} />
                                <h3>{item.title}</h3>
                                <p>{item.text}</p>
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
