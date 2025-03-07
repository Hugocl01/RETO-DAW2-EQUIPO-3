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
        <div className="infoTorneo container">
            {/* Título de la sección */}
            <div className="text-center">
                <h1 className="d-inline-block">Información del Torneo</h1>
            </div>

            {/* Contenido principal en dos columnas */}
            <div className="row">
                {/* Columna izquierda: Imagen y tarjetas de reglas */}
                <div className="col-md-4 d-flex flex-column gap-3">
                    {/* Imagen del torneo */}
                    <div className="text-center">
                        <img src={imagenPrueba} alt="Imagen Torneo" className="img-fluid rounded" />
                    </div>

                    {/* Tarjeta para descargar reglas (versión vertical) */}
                    <div className="tarjetaReglas">
                        <div className="card d-flex flex-column justify-content-center align-items-center">
                            <img src={logo} className="card-img-top" alt="Logo" />
                            <div className="card-body">
                                <a target="_blank" href={reglas} className="btn btn-secondary d-flex align-items-center justify-content-between gap-2 px-4 py-2 fs-5 fw-bold shadow-sm transition">
                                    <span>Descargar Reglas</span>
                                    <i className="bi bi-file-earmark-arrow-down fs-4"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta para descargar reglas (versión horizontal) */}
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

                {/* Columna derecha: Texto descriptivo del torneo */}
                <div className="col-md-8">
                    <div className="p-4 bg-light border rounded text-left">
                        <p>
                            Para alcanzar las metas, este proyecto buscará recoger la mayor cantidad de
                            alimentos y recursos económicos posibles.
                            Cruz Roja gestionará tanto los alimentos no perecederos recogidos
                            como los recursos económicos generados, para que lleguen a las realidades
                            sociales que más lo necesitan.
                            <br></br><br></br>
                            El Torneo Solidario se disputará en dos fases: la primera con la colaboración
                            de las empresas patrocinadoras y la segunda de forma paralela a la
                            celebración del Torneo Deportivo.
                            <br></br><br></br>

                            <span className="subrayado">Patrocinios:</span><br></br>
                            A cada uno de los equipos participantes se les asignará un patrocinador.

                            <br></br><br></br>
                            <span className="subrayado">Recogida de alimentos y recaudación de fondos:</span><br></br>
                            El Torneo Solidario se llevará a cabo de manera paralela a la celebración
                            del Torneo Deportivo.
                            No solo los jugadores podrán donar, sino también sus compañeros de clase,
                            amistades y familiares.<br></br>
                            Durante el desarrollo de los torneos, se venderán agua, bebidas isotónicas
                            y alimentos saludables preparados por los alumnos del Ciclo Formativo de
                            Cocina, en su reto “Catering para un evento deportivo”. Todo el dinero
                            recaudado durante los dos días se donará, junto con los alimentos, a
                            Cruz Roja.
                            <br></br><br></br>
                            <span className="subrayado">Donaciones:</span><br></br>
                            ¿Te gustaría contribuir? ¡Es muy fácil! Acércate a nuestro pabellón deportivo
                            en Torrelavega y trae alimentos no perecederos para ayudar a llenar nuestras
                            cestas de donación. <br></br>Durante el evento, estaremos recogiendo alimentos
                            para apoyar a las familias más necesitadas de nuestra comunidad.
                            Tu generosidad hará posible que aquellos que enfrentan dificultades
                            tengan acceso a alimentos nutritivos y básicos. ¡Cada kilo cuenta!

                            Si prefieres apoyarnos económicamente, ¡no hay problema! Puede donar a traves del

                            <a target="_blank" href="https://cercadeti.cruzroja.es/ligasolidariadeformacionprofesional"> enlace de la Cruz Roja</a>

                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoTorneo;
