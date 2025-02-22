import { useContext, useState } from "react";
import { SeguridadContext } from "../contexts/SeguridadProvider.jsx";
import { useNavigate } from "react-router-dom";

function LoginModal({ handleClose }) {
    const { login } = useContext(SeguridadContext); // Obtiene la función de login desde el contexto
    const [formData, setFormData] = useState({
        email: '', // Almacena el correo electrónico ingresado
        password: '' // Almacena la contraseña ingresada
    });
    const [error, setError] = useState(null); // Estado para manejar el error de login

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

        // Si el login falla, muestra el error
        if (!result.success) {
            setError(result.error); // Muestra el error en el formulario
        } else {
            // Si el login es exitoso, cierra el modal
            handleClose();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center align-items-center border p-4">
            <i className="bi bi-bootstrap-fill mb-3" style={{ fontSize: '3rem' }}></i>
            <h1 className="h3 mb-3 fw-normal text-center">Iniciar sesión</h1>
        
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
        
            {/* Opción de recordar la sesión */}
            <div className="form-check text-start my-3 w-100">
                <input className="form-check-input" type="checkbox" value="recordar" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Recordarme
                </label>
            </div>
        
            {/* Botón para enviar el formulario */}
            <button className="btn btn-primary w-100 py-2" type="submit">Iniciar sesión</button>
            <p className="mt-5 mb-3 text-body-secondary text-center">© 2025</p>
        </form>
    );
}

export default LoginModal;