/**
 * Componente de formulario de inicio de sesión.
 * Permite a los usuarios ingresar su correo electrónico y contraseña para autenticarse.
 * 
 * @component
 * @returns {JSX.Element} Elemento JSX que representa el formulario de inicio de sesión.
 */
function Login() {
    return (
        <form>
            <i className="bi bi-bootstrap-fill"></i>
            <h1 className="h3 mb-3 fw-normal">Iniciar sesión</h1>

            <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="correo@ejemplo.com" />
                <label htmlFor="floatingInput">Correo electrónico</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Contraseña" />
                <label htmlFor="floatingPassword">Contraseña</label>
            </div>

            <div className="form-check text-start my-3">
                <input className="form-check-input" type="checkbox" value="recordar" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Recordarme
                </label>
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">Iniciar sesión</button>
            <p className="mt-5 mb-3 text-body-secondary">© 2025</p>
        </form>
    );
}

export default Login;
