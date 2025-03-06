import { useContext, useState } from "react";
import { SeguridadContext } from "../contexts/SeguridadProvider.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Spinner from "./Spinner.jsx";
import "./css/EstilosComun.css";
import "./css/PaginaLogin.css";

/**
 * Componente que maneja el inicio de sesión de los usuarios.
 * Permite a los usuarios ingresar su correo electrónico y contraseña para iniciar sesión.
 * 
 * @component
 * 
 * Muestra un formulario de inicio de sesión, valida las credenciales y, si son correctas, redirige al usuario a la página principal.
 *
 */
function Login() {
    /**
     * Contexto que proporciona las funciones de autenticación, como `login` y `logout`.
     * 
     * @type {Object}
     * @property {function} login - Función para autenticar a un usuario.
     * @returns {Object} Resultado de la autenticación.
     */
    const { login } = useContext(SeguridadContext);
    
    /**
     * Estado que almacena los datos del formulario.
     * 
     * @typedef {Object} FormData
     * @property {string} email - Correo electrónico del usuario.
     * @property {string} password - Contraseña del usuario.
     */
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    /**
     * Estado que almacena el mensaje de error si ocurre un problema con el inicio de sesión.
     * 
     * @type {string|null}
     */
    const [error, setError] = useState(null);

    /**
     * Estado que indica si la solicitud de inicio de sesión está en proceso.
     * 
     * @type {boolean}
     */
    const [loading, setLoading] = useState(false);

    /**
     * Hook para navegar entre páginas.
     * 
     * @type {function}
     */
    const navigate = useNavigate();

    /**
     * Maneja los cambios en los campos del formulario de inicio de sesión.
     * Actualiza el estado `formData` con los valores de los campos.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e - El evento de cambio del formulario.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    /**
     * Maneja el envío del formulario de inicio de sesión.
     * Envía las credenciales al servidor y maneja la respuesta.
     * 
     * @param {React.FormEvent<HTMLFormElement>} e - El evento de envío del formulario.
     * @returns {Promise<void>} - Retorna una promesa que maneja la respuesta del inicio de sesión.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const result = await login(formData.email, formData.password);

        setLoading(false);

        if (!result.success) {
            setError(result.error);
            setFormData((prevData) => ({ ...prevData, password: '' }));
        } else {
            navigate("/");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            {loading ? (
                <Spinner />
            ) : (
                <form onSubmit={handleSubmit} className="formulario shadow-lg bg-white rounded p-5 text-center">
                    <Link to="/" className="position-absolute top-0 start-0 ms-3 mt-3 text-decoration-none text-primary">
                        <i className="bi bi-arrow-left me-2"></i> Volver al Inicio
                    </Link>
                    
                    <h1 className="h3 mb-4 fw-bold">Iniciar sesión</h1>
                    {error && <div className="alert alert-danger">{error}</div>}
                    
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            name="email"
                            placeholder="correo@ejemplo.com"
                            onChange={handleChange}
                            value={formData.email}
                            required
                            disabled={loading}
                        />
                        <label htmlFor="floatingInput">Correo electrónico</label>
                    </div>
                    
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            name="password"
                            placeholder="Contraseña"
                            onChange={handleChange}
                            value={formData.password}
                            required
                            disabled={loading}
                        />
                        <label htmlFor="floatingPassword">Contraseña</label>
                    </div>
                    
                    <button className="btn btn-primary w-100 py-2" type="submit" disabled={loading}>
                        {loading ? <Spinner /> : "Iniciar sesión"}
                    </button>
                    
                    <p className="mt-4 text-muted">© 2025</p>
                </form>
            )}
        </div>
    );
}

export default Login;
