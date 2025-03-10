import React, { useState, useEffect } from "react";
import "../css/Carrusel.css";
import "../css/EstilosComun.css";
import defaultImagen from "../../assets/imagenes/default.jpg";

// Definir la URL de la API y la imagen por defecto
const apiUrl = import.meta.env.VITE_API_URL;

/**
 * Función para sanitizar el contenido HTML (elimina etiquetas peligrosas como <script>).
 * @param {string} html - El contenido HTML a sanitizar.
 * @returns {string} - El contenido HTML sanitizado.
 */
function sanitizeHTML(html) {
    return html.replace(/<script.*?>.*?<\/script>/gi, ""); // Elimina etiquetas <script>
}

/**
 * Componente de carrusel para mostrar elementos con imágenes configurables.
 *
 * @component
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.id - Identificador único para el carrusel.
 * @param {Array} props.items - Lista de elementos a mostrar en el carrusel.
 * @param {number} props.intervalo - Intervalo de cambio automático en milisegundos.
 * @returns {JSX.Element} Carrusel de elementos con opción de leer más.
 */
function Carousel({ id, items, intervalo }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemsPerSlide, setItemsPerSlide] = useState(3);

    // Detectar el tamaño de la pantalla y ajustar la cantidad de tarjetas por diapositiva
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerSlide(1); // Móviles: 1 tarjeta
            } else if (window.innerWidth < 992) {
                setItemsPerSlide(2); // Tablets: 2 tarjetas
            } else {
                setItemsPerSlide(3); // Escritorio: 3 tarjetas
            }
        };

        handleResize(); // Llamar una vez al montar el componente
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Agrupar elementos según el número de tarjetas por diapositiva
    const groupedItems = [];
    for (let i = 0; i < items.length; i += itemsPerSlide) {
        groupedItems.push(items.slice(i, i + itemsPerSlide));
    }

    return (
        <div className="contenido-carousel">
            <div id={id} className="carousel carousel-dark slide" data-bs-ride="carousel" data-bs-interval={intervalo}>
                {/* Indicadores del carrusel */}
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

                {/* Contenido del carrusel */}
                <div className="carousel-inner p-5">
                    {groupedItems.map((group, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                            <div className="container">
                                <div className="row justify-content-center">
                                    {group.map((item, i) => {
                                        const itemIndex = index * itemsPerSlide + i; // Obtener el índice real
                                        const imagenItem = item.imagenes[0];
                                        const urlImagen = imagenItem
                                            ? `${apiUrl}/${imagenItem.ruta}`.replace('/api/', '/storage')
                                            : defaultImagen;

                                        // Sanitizar el contenido HTML
                                        const contenidoHTML = item?.texto || item?.contenido || "No hay contenido disponible";
                                        const sanitizedContent = sanitizeHTML(contenidoHTML);

                                        return item ? (
                                            <div key={i} className={`col-md-${12 / itemsPerSlide} d-flex justify-content-center`}>
                                                <div className="card shadow-lg custom-card h-100">
                                                    <img
                                                        src={urlImagen}
                                                        className="card-img-top"
                                                        alt={item.titulo || "Sin título"}
                                                        style={{ height: "150px", objectFit: "cover" }}
                                                    />
                                                    <div className="card-body d-flex flex-column gap-3">
                                                        <h4
                                                            className="card-title"
                                                            style={{
                                                                display: "-webkit-box",
                                                                WebkitLineClamp: 2, // Mostrar hasta 4 líneas de texto
                                                                WebkitBoxOrient: "vertical",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                            }}
                                                        >
                                                            {item?.titulo || "Sin título"}</h4>
                                                        {/* Renderizar el contenido HTML */}
                                                        <div
                                                            className="card-text flex-grow-1"
                                                            style={{
                                                                display: "-webkit-box",
                                                                WebkitLineClamp: 4, // Mostrar hasta 4 líneas de texto
                                                                WebkitBoxOrient: "vertical",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                            }}
                                                            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                                                        />
                                                        <button
                                                            className="btn btn-success mt-auto"
                                                            onClick={() => setSelectedItem(item)}
                                                            data-bs-toggle="modal"
                                                            data-bs-target={`#leerMasModal_${id}`}
                                                        >
                                                            LEER MÁS
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Controles del carrusel */}
                <button className="carousel-control-prev" type="button" data-bs-target={`#${id}`} data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target={`#${id}`} data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* Modal de lectura ampliada */}
            <div className="modal fade" id={`leerMasModal_${id}`} tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-lg"> {/* Añadir modal-dialog-scrollable */}
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{selectedItem ? selectedItem.titulo : "Título"}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {selectedItem ? (
                                <>
                                    {/* Construir la URL de la imagen para el modal */}
                                    <img
                                        src={
                                            selectedItem.imagenes && selectedItem.imagenes[0]
                                                ? `${apiUrl}/${selectedItem.imagenes[0].ruta}`.replace('/api/', '/storage')
                                                : defaultImagen
                                        }
                                        className="img-fluid mb-3"
                                        alt={selectedItem.titulo || "Imagen"}
                                    />
                                    <h4 className="card-title mb-4">{selectedItem.titulo || "Sin título"}</h4>
                                    {/* Renderizar el contenido HTML en el modal */}
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: sanitizeHTML(selectedItem.texto || selectedItem.contenido || "No hay contenido disponible"),
                                        }}
                                    />
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
        </div>
    );
}

export default Carousel;