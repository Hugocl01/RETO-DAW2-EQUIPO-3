import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SetPasswordForm = () => {
    const { id, token } = useParams(); // Obtener ID y token desde la URL
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/api/set-password/${id}/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password,
                    password_confirmation: passwordConfirm,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Contraseña establecida correctamente. Redirigiendo al login...");
                navigate("/login");
            } else {
                setError(data.message || "Error al establecer la contraseña.");
            }
        } catch (error) {
            setError("Error de conexión. Inténtalo de nuevo.");
            console.error("Error al enviar la contraseña:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center text-primary">Establecer Contraseña</h2>
                {error && <div className="alert alert-danger text-center">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nueva Contraseña:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="8"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirmar Contraseña:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            required
                            minLength="8"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Guardando..." : "Guardar Contraseña"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SetPasswordForm;
