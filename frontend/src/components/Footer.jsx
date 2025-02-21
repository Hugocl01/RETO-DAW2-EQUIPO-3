import "./css/Footer.css";

/**
 * Componente de pie de página de la aplicación.
 * Contiene información de copyright y enlaces a redes sociales.
 * 
 * @component
 * @returns {JSX.Element} Elemento JSX que representa el pie de página.
 */
function Footer() {

    return (
        <footer className="footer d-flex flex-wrap justify-content-between align-items-center p-4 mb-4 border-top">
            <div class="container">
                <div class="row">
                    <div class="col">
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

                            <ul className="w-100 nav col-md-4 d-flex justify-content-start align-items-center list-unstyled mt-4">
                                <li className="ms-3">
                                    <a target="_blank" className="text-body-secondary" href="https://www.instagram.com/reto_solidario_ies/" aria-label="Instagram">
                                        <i className="bi bi-instagram"></i>
                                    </a>
                                </li>
                                <li className="ms-3">
                                    <a className="text-body-secondary" href="#" aria-label="Facebook">
                                        <i className="bi bi-facebook"></i>
                                    </a>
                                </li>
                            </ul>
                        </ul>
                    </div>
                    <div class="col">
                        <p>Información</p>
                        <ul className="list-unstyled">
                            <li>
                                Política de privacidad
                            </li>
                        </ul>
                    </div>
                    <div class="col-6">
                        <p>Colaboradores</p>
                        <ul className="list-unstyled d-flex">
                            <li className="me-4">
                                <a href="#">
                                    <img src="../src/assets/imagenes/patrocinadores/netkia.png" className="img-fluid rounded" alt="Colaborador 1" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/*<span className="mb-3 mb-md-0 text-body-secondary">© 2025 Company, Inc</span>*/}

            {/* Enlaces a redes sociales */}

        </footer>
    );
}

export default Footer;
