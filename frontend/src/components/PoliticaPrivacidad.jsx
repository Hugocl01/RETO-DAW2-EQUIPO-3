function PoliticaPrivacidad() {
    return (
        <div className="container my-5">
            <div className="card shadow-lg border-light rounded-3">
                <div className="card-body p-4">
                    <h1 className="card-title text-center mb-4">Política de Privacidad</h1>

                    <p>
                        Valoramos tu privacidad y nos comprometemos a proteger tu información personal.
                        Esta política describe cómo recopilamos, usamos y protegemos tus datos.
                    </p>

                    <h3 className="mt-4">1. Información que Recopilamos</h3>
                    <ul>
                        <li>Datos personales como nombre, correo electrónico y teléfono.</li>
                        <li>Información de navegación y uso del sitio web.</li>
                        <li>Datos proporcionados en el formulario de inscripción.</li>
                    </ul>

                    <h3 className="mt-4">2. Uso de la Información</h3>
                    <p>Utilizamos tus datos para:</p>
                    <ul>
                        <li>Proporcionar y mejorar nuestros servicios.</li>
                        <li>Garantizar la seguridad y prevenir fraudes.</li>
                    </ul>

                    <h3 className="mt-4">3. Protección de Datos</h3>
                    <p>
                        Implementamos medidas de seguridad para proteger tu información.
                        Sin embargo, ningún sistema es completamente seguro, por lo que no podemos garantizar protección absoluta.
                    </p>

                    <h3 className="mt-4">4. Contacto</h3>
                    <p>Si tienes preguntas sobre nuestra política de privacidad, puedes contactarnos en:</p>
                    <ul className="list-unstyled">
                        <li>
                            <i className="bi bi-envelope-fill me-2"></i>
                            <a href="mailto:ies.miguel.herrero.pereda@educantabria.es" className="text-body-secondary">
                                ies.miguel.herrero.pereda@educantabria.es
                            </a>
                        </li>
                        <li>
                            <i className="bi bi-telephone-fill me-2"></i>
                            <span className="text-body-secondary">942 88 24 98</span>
                        </li>
                        <li>
                            <i className="bi bi-geo-alt-fill me-2"></i>
                            <a target="_blank" className="text-body-secondary" href="https://maps.app.goo.gl/XKEKHT8WGQDVdJr47">
                                P.º de Julio Hauzeur, 59, 39300, Torrelavega, Cantabria
                            </a>
                        </li>
                        <li>
                            <i className="bi bi-instagram me-2"></i>
                            <a target="_blank" className="text-body-secondary" href="https://www.instagram.com/iesmiguelherreroligasolidaria/" aria-label="Instagram">
                                Instagram
                            </a>
                        </li>
                    </ul>

                    <p className="text-muted mt-3">
                        Última actualización: {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PoliticaPrivacidad;
