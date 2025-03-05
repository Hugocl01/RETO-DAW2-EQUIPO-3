import { useContext, useState } from "react";
import { SeguridadContext } from "../contexts/SeguridadProvider.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Spinner from "./Spinner.jsx";
import "./css/EstilosComun.css";

function LoginModal({ handleClose }) {
    const { login } = useContext(SeguridadContext);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
        setLoading(true);

        const result = await login(formData.email, formData.password);

        setLoading(false);

        if (!result.success) {
            setError(result.error);
            setFormData((prevData) => ({ ...prevData, password: '' }));
        } else {
            handleClose(); // Cierra el modal si el login es exitoso
            navigate("/");
        }
    };

    return (
        <div className="modal show d-block">
            <div className="modal-dialog">
                <div className="modal-content">
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center vh-50">
                            <Spinner />
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="formulario shadow-lg bg-white rounded p-5 text-center">
                            <button type="button" className="btn-close mb-4" aria-label="Close" onClick={handleClose}></button>

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
            </div>
        </div>
    );
}

export default LoginModal;
