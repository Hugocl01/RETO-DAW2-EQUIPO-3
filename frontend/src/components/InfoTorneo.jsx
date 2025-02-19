import imagenPrueba from "../assets/imagenes/img1.jpg";
import logo from "../assets/imagenes/logo.png";

function InfoTorneo() {
    return (
        <div className="container mt-4">
            <h3 className="fw-bold">Torneo solidario</h3>
            <div className="row">
                <div className="col-md-4 d-flex flex-column gap-3">
                    <div className="text-center">
                        <img src={imagenPrueba} alt="Imagen Torneo" className="img-fluid rounded" />
                    </div>
                    <div className="">
                        <div className="card">
                            <img src={logo} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <a href="#" className="btn btn-secondary d-flex align-items-center justify-content-between gap-2 px-4 py-2 fs-5 fw-bold shadow-sm transition">
                                    <span>Descargar Reglas</span>
                                    <i className="bi bi-file-earmark-arrow-down fs-4"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="p-4 bg-primary text-white rounded">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum quasi sapiente cum dolor quae consectetur labore eos quis omnis possimus nam, nisi, dolore ad vitae accusantium rem error neque reprehenderit.</p>
                        <p>Nemo, reprehenderit sint aut totam deleniti aliquam quidem hic provident! Similique consequatur vel voluptate nulla a, aperiam sed eligendi, qui exercitationem explicabo asperiores labore eaque eveniet expedita. Ut, dolore maiores?</p>
                        <p>Ipsum, eos vel distinctio tempore et fugiat dolores! A, cumque alias quae excepturi iste, provident autem officia velit obcaecati numquam adipisci, accusamus consectetur hic quas earum eligendi nihil. Rerum, eos.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio minima, libero qui tempore culpa inventore sed magnam a provident deleniti laboriosam recusandae repudiandae quaerat ipsam voluptatum eaque amet aliquid laborum?
                            Quis distinctio ratione delectus enim dolor consectetur hic maiores porro totam, soluta accusamus consequatur quae! Repellendus aperiam quis ipsum. Quibusdam adipisci iure impedit deserunt accusamus reprehenderit provident architecto, dolor dolorum!
                            Minus eos eius quidem quas laboriosam, aperiam expedita possimus, laborum earum debitis veritatis, vel explicabo optio minima accusamus rerum repellat ad doloribus tempora quo voluptates architecto necessitatibus. Laudantium, et debitis.
                            Placeat laborum aspernatur quia quaerat eum ad temporibus amet consequuntur, eveniet magnam eius nostrum. Incidunt optio fuga, quo, accusantium neque rerum illum iure deleniti eligendi eum tempore doloremque temporibus quidem?
                            Facere facilis consectetur ipsum tempore voluptatem iure? Ex soluta ab facilis eligendi, autem quae aspernatur accusamus hic expedita harum, aperiam, saepe earum dolorum commodi unde voluptates corrupti adipisci recusandae corporis?
                            Harum consequuntur sint sunt earum dolorum, amet dicta non magnam ut repellendus beatae quod et, alias ipsa eaque est rem id blanditiis animi. Blanditiis sapiente illum voluptatum, quos odit maiores.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoTorneo;
