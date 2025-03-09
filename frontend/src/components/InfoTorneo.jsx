import imagenPrueba from "../assets/imagenes/img1.jpg";
import logo from "../assets/imagenes/logo.png";
import reglas from "../../public/reglas.pdf";
import "./css/EstilosComun.css";
import "./css/InfoTorneo.css";

/**
 * Componente `InfoTorneo` que muestra la información detallada sobre un torneo.
 * Incluye una imagen del torneo, un enlace para descargar las reglas y un texto descriptivo.
 * 
 * @returns {JSX.Element} El elemento JSX que representa la información del torneo.
 */
function InfoTorneo() {
    return (
        <div className="infoTorneo container my-5">
            {/* Título de la sección */}
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Información del Torneo</h1>
            </div>

            {/* Contenido principal en dos columnas */}
            <div className="row g-4">
                {/* Columna izquierda: Imagen y tarjetas de reglas */}
                <div className="col-md-4">
                    {/* Imagen del torneo */}
                    <div className="text-center mb-4">
                        <img
                            src={imagenPrueba}
                            alt="Imagen Torneo"
                            className="img-fluid rounded shadow"
                            style={{ maxHeight: "300px", objectFit: "cover" }}
                        />
                    </div>

                    {/* Tarjeta para descargar reglas (versión vertical) */}
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body d-flex flex-column align-items-center text-center">
                            <img
                                src={logo}
                                alt="Logo"
                                className="img-fluid mb-3"
                                style={{ maxWidth: "150px" }}
                            />
                            <a
                                target="_blank"
                                href={reglas}
                                className="btn btn-secondary d-flex align-items-center gap-2 px-4 py-2 fs-5 fw-bold shadow-sm"
                            >
                                <span>Descargar Reglas</span>
                                <i className="bi bi-file-earmark-arrow-down fs-4"></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Columna derecha: Texto descriptivo del torneo */}
                <div className="col-md-8">
                    <div className="p-4 bg-light border rounded shadow-sm">
                        <p className="lead">
                            Para alcanzar las metas, este proyecto buscará recoger la mayor cantidad de
                            alimentos y recursos económicos posibles. Cruz Roja gestionará tanto los
                            alimentos no perecederos recogidos como los recursos económicos generados,
                            para que lleguen a las realidades sociales que más lo necesitan.
                        </p>
                        <p>
                            <span className="fw-bold">Patrocinios:</span><br />
                            A cada uno de los equipos participantes se les asignará un patrocinador.
                        </p>
                        <p>
                            <span className="fw-bold">Recogida de alimentos y recaudación de fondos:</span><br />
                            El Torneo Solidario se llevará a cabo de manera paralela a la celebración
                            del Torneo Deportivo. No solo los jugadores podrán donar, sino también sus
                            compañeros de clase, amistades y familiares.
                        </p>
                        <p>
                            Durante el desarrollo de los torneos, se venderán agua, bebidas isotónicas
                            y alimentos saludables preparados por los alumnos del Ciclo Formativo de
                            Cocina, en su reto “Catering para un evento deportivo”. Todo el dinero
                            recaudado durante los dos días se donará, junto con los alimentos, a
                            Cruz Roja.
                        </p>
                        <p>
                            <span className="fw-bold">Donaciones:</span><br />
                            ¿Te gustaría contribuir? ¡Es muy fácil! Acércate a nuestro pabellón deportivo
                            en Torrelavega y trae alimentos no perecederos para ayudar a llenar nuestras
                            cestas de donación. Durante el evento, estaremos recogiendo alimentos
                            para apoyar a las familias más necesitadas de nuestra comunidad.
                            Tu generosidad hará posible que aquellos que enfrentan dificultades
                            tengan acceso a alimentos nutritivos y básicos. ¡Cada kilo cuenta!
                        </p>
                        <p>
                            Si prefieres apoyarnos económicamente, ¡no hay problema! Puedes donar a través del
                            <a
                                target="_blank"
                                href="https://cercadeti.cruzroja.es/ligasolidariadeformacionprofesional"
                                className="text-decoration-none fw-bold"
                            >
                                {" "}enlace de la Cruz Roja
                            </a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoTorneo;
