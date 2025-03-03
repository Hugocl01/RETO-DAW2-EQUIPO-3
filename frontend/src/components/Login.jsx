import { useContext, useState } from "react";
import { SeguridadContext } from "../contexts/SeguridadProvider.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./css/EstilosComun.css";
import "./css/PaginaLogin.css";

/**
 * Componente de formulario de inicio de sesión.
 * Permite a los usuarios ingresar su correo electrónico y contraseña para autenticarse.
 * 
 * @component
 * @returns {JSX.Element} Elemento JSX que representa el formulario de inicio de sesión.
 */
function Login() {
    const { login } = useContext(SeguridadContext); // Obtiene la función de login desde el contexto
    const [formData, setFormData] = useState({
        email: '', // Almacena el correo electrónico ingresado
        password: '' // Almacena la contraseña ingresada
    });
    const [error, setError] = useState(null); // Estado para manejar el error de login
    const navigate = useNavigate(); // Hook de React Router para redirigir

    /**
     * Maneja los cambios en los campos del formulario.
     * 
     * @param {Object} e - El evento de cambio.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value // Actualiza el valor del campo correspondiente
        });
    };

    /**
     * Maneja el envío del formulario de inicio de sesión.
     * Intenta realizar el login y maneja el error si existe.
     * 
     * @param {Object} e - El evento de envío del formulario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Resetea el error antes de intentar el login

        // Intenta realizar el login con las credenciales ingresadas
        const result = await login(formData.email, formData.password);

        // Si el login falla, redirige al inicio
        if (!result.success) {
            setError(result.error); // Muestra el error en el formulario
        } else {
            // Si el login es exitoso, redirige al usuario a la página principal
            navigate("/");
        }
    };

    return (
        <div className="d-flex justify-content-center flex-column align-items-center vw-100 vh-100">
            <form onSubmit={handleSubmit} className="formulario d-flex flex-column align-items-center border rounded p-5 position-relative">
                {/* Enlace "Volver" en la esquina superior izquierda de la tarjeta */}
                <Link to="/" className="position-absolute top-0 start-0 ms-3 mt-3">
                    <i className="bi bi-arrow-left me-2"></i>
                    Volver al Inicio
                </Link>

                <h1 className="h1 mb-4 mt-3 fw-normal text-center">Iniciar sesión</h1>

                {/* Muestra el mensaje de error si existe */}
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Campo de correo electrónico */}
                <div className="form-floating mb-3 w-100">
                    <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        name="email"
                        placeholder="correo@ejemplo.com"
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="floatingInput">Correo electrónico</label>
                </div>

                {/* Campo de contraseña */}
                <div className="form-floating mb-3 w-100">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        name="password"
                        placeholder="Contraseña"
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="floatingPassword">Contraseña</label>
                </div>

                {/* Botón para enviar el formulario */}
                <button className="btn btn-primary py-2" type="submit">Iniciar sesión</button>
                <p className="mt-3 mb-3 text-body-secondary text-center">© 2025</p>
            </form>
        </div>
    );
}

export default Login;
