import imagenPrueba from "../assets/imagenes/img1.jpg";
import logo from "../assets/imagenes/logo.png";
import "./css/EstilosComun.css";
import "./css/InfoTorneo.css";

function InfoTorneo() {
    return (
        <div className="infoTorneo container">
            <div className="text-center">
                <h1 className="d-inline-block">Información del Torneo</h1>
            </div>
            <div className="row">
                <div className="col-md-4 d-flex flex-column gap-3">
                    <div className="text-center">
                        <img src={imagenPrueba} alt="Imagen Torneo" className="img-fluid rounded" />
                    </div>
                    <div className="tarjetaReglas">
                        <div className="card d-flex flex-column justify-content-center align-items-center">
                            <img src={logo} className="card-img-top" alt="Logo" />
                            <div className="card-body">
                                <a href="#" className="btn btn-secondary d-flex align-items-center justify-content-between gap-2 px-4 py-2 fs-5 fw-bold shadow-sm transition">
                                    <span>Descargar Reglas</span>
                                    <i className="bi bi-file-earmark-arrow-down fs-4"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="tarjetaReglashorizontal border rounded px-3 py-2 mb-3">
                        <div className="w-100 d-flex justify-content-between align-items-center">
                            <img src={logo} className="w-25" alt="Logo" />
                            <a href="#" className="btn btn-secondary d-flex align-items-center justify-content-between gap-2 px-4 py-2 shadow-sm transition">
                                <span className="descargarReglas">Descargar Reglas</span>
                                <i className="bi bi-file-earmark-arrow-down fs-4"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="p-4 bg-light border rounded text-left">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum quasi sapiente cum dolor quae consectetur labore eos quis omnis possimus nam,
                            nisi, dolore ad vitae accusantium rem error neque reprehenderit.
                            Nemo, reprehenderit sint aut totam deleniti aliquam quidem hic provident! Similique consequatur vel voluptate nulla a, aperiam sed eligendi, qui
                            exercitationem explicabo asperiores labore eaque eveniet expedita. Ut, dolore maiores?
                            Ipsum, eos vel distinctio tempore et fugiat dolores! A, cumque alias quae excepturi iste, provident autem officia velit obcaecati numquam adipisci,
                            accusamus consectetur hic quas earum eligendi nihil. Rerum, eos.<br></br><br></br>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio minima, libero qui tempore culpa inventore sed magnam a provident deleniti laboriosam
                            recusandae repudiandae quaerat ipsam voluptatum eaque amet aliquid laborum?
                            Quis distinctio ratione delectus enim dolor consectetur hic maiores porro totam, soluta accusamus consequatur quae! Repellendus aperiam quis ipsum.
                            Quibusdam adipisci iure impedit deserunt accusamus reprehenderit provident architecto, dolor dolorum!
                            Minus eos eius quidem quas laboriosam, aperiam expedita possimus, laborum earum debitis veritatis, vel explicabo optio minima accusamus rerum
                            repellat ad doloribus tempora quo voluptates architecto necessitatibus. Laudantium, et debitis.
                            Placeat laborum aspernatur quia quaerat eum ad temporibus amet consequuntur, eveniet magnam eius nostrum. Incidunt optio fuga, quo, accusantium
                            neque rerum illum iure deleniti eligendi eum tempore doloremque temporibus quidem?<br></br><br></br>
                            Facere facilis consectetur ipsum tempore voluptatem iure? Ex soluta ab facilis eligendi, autem quae aspernatur accusamus hic expedita harum, aperiam,
                            saepe earum dolorum commodi unde voluptates corrupti adipisci recusandae corporis?<br></br><br></br>
                            Harum consequuntur sint sunt earum dolorum, amet dicta non magnam ut repellendus beatae quod et, alias ipsa eaque est rem id blanditiis animi.
                            Blanditiis sapiente illum voluptatum, quos odit maiores.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoTorneo;
