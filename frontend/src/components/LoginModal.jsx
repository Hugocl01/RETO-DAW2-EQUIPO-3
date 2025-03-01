import { useContext, useState, useEffect, useRef } from "react";
import { SeguridadContext } from "../contexts/SeguridadProvider.jsx";

function LoginModal({ handleClose }) {
    const { login } = useContext(SeguridadContext);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const modalRef = useRef(null); // Referencia al modal

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const result = await login(formData.email, formData.password);
        if (!result.success) {
            setError(result.error);
        } else {
            handleClose();
        }
    };

    // Cerrar el modal cuando se hace clic fuera del modal
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                handleClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClose]);

    return (
        <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center align-items-center border p-4" ref={modalRef}>
            {/* Botón para cerrar el modal */}
            <button type="button" className="btn-close mb-4" aria-label="Close" onClick={handleClose}></button>
            <h1 className="h3 mb-4 fw-normal text-center">Iniciar sesión</h1>
            
            {error && <div className="alert alert-danger">{error}</div>}
            
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

            <div className="form-check text-start my-3 w-100">
                <input className="form-check-input" type="checkbox" value="recordar" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Recordarme
                </label>
            </div>

            <button className="btn btn-primary w-100 py-2" type="submit">Iniciar sesión</button>
            <p className="mt-5 mb-3 text-body-secondary text-center">© 2025</p>
        </form>
    );
}

export default LoginModal;
