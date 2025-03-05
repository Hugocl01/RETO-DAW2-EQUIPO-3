import "./css/Footer.css";
import netkia from "../assets/imagenes/patrocinadores/netkia.png";

/**
 * Componente de pie de página de la aplicación.
 * Contiene información de copyright y enlaces a redes sociales.
 * 
 * @component
 * @returns {JSX.Element} Elemento JSX que representa el pie de página.
 */
function Footer() {

    return (
        <footer className="footer d-flex flex-wrap justify-content-between align-items-center p-4 mt-4 border-top">
            <div className="container">
                <div className="row">
                    {/* Ahora la primera columna ocupa el 40% en pantallas medianas */}
                    <div className="col-md-4 primera">
                        <p>Contacto</p>
                        <ul className="list-unstyled">
                            <li>
                                <i className="bi bi-envelope-fill me-2"></i>
                                ies.miguel.herrero.pereda@educantabria.es
                            </li>
                            <li>
                                <i className="bi bi-telephone-fill me-2"></i>
                                942 88 24 98
                            </li>
                            <li>
                                <i className="bi bi-geo-alt-fill me-2"></i>
                                P.º de Julio Hauzeur, 59, 39300, Torrelavega, Cantabria
                            </li>
                        </ul>

                        <ul className="w-100 nav col-md-4 d-flex justify-content-start align-items-center list-unstyled mt-3">
                            <li className="ms-3">
                                <a target="_blank" className="text-body-secondary" href="https://www.instagram.com/iesmiguelherreroligasolidaria/" aria-label="Instagram">
                                    <i className="bi bi-instagram me-2"></i>
                                    Instagram
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* La segunda columna ahora ocupa el 30% */}
                    <div className="col-md-4">
                        <p>Información</p>
                        <ul className="list-unstyled">
                            <li>
                                Política de privacidad
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
