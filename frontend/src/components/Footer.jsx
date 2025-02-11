/**
 * Componente de pie de página de la aplicación.
 * Contiene información de copyright y enlaces a redes sociales.
 * 
 * @component
 * @returns {JSX.Element} Elemento JSX que representa el pie de página.
 */
function Footer() {
    
    return (
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">

            {/* Sección de copyright */}
            <div className="col-md-4 d-flex align-items-center">
                <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                    <i className="bi bi-bootstrap"></i>
                </a>
                <span className="mb-3 mb-md-0 text-body-secondary">© 2025 Company, Inc</span>
            </div>

            {/* Enlaces a redes sociales */}
            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li className="ms-3">
                    <a className="text-body-secondary" href="#" aria-label="Twitter">
                        <i className="bi bi-twitter-x"></i>
                    </a>
                </li>
                <li className="ms-3">
                    <a className="text-body-secondary" href="#" aria-label="Instagram">
                        <i className="bi bi-instagram"></i>
                    </a>
                </li>
                <li className="ms-3">
                    <a className="text-body-secondary" href="#" aria-label="Facebook">
                        <i className="bi bi-facebook"></i>
                    </a>
                </li>
            </ul>
        </footer>
    );
}

export default Footer;
