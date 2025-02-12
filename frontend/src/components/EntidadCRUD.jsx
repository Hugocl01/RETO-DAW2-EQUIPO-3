import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function EntidadCRUD({ entidad }) {
    const [registros, setRegistros] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [formData, setFormData] = useState({ id: null, nombre: "" });
    const [editando, setEditando] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGuardar = (e) => {
        e.preventDefault();
        if (!formData.nombre.trim()) return;

        if (editando) {
            setRegistros(registros.map((item) => (item.id === formData.id ? formData : item)));
            setEditando(false);
        } else {
            setRegistros([...registros, { ...formData, id: Date.now() }]);
        }

        setFormData({ id: null, nombre: "" });
        setMostrarModal(false);
    };

    const handleEditar = (item) => {
        setFormData(item);
        setEditando(true);
        setMostrarModal(true);
    };

    const handleEliminar = (id) => {
        setRegistros(registros.filter((item) => item.id !== id));
    };

    const registrosFiltrados = registros.filter((item) =>
        item.nombre.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Administración de {entidad}</h2>

            {/* Filtro de búsqueda */}
            <div className="mb-3 row">
                <div className="col-md-8">
                    <input
                        type="text"
                        className="form-control"
                        placeholder={`Buscar ${entidad}...`}
                        value={filtro}
                        onChange={handleFiltroChange}
                    />
                </div>
                <div className="col-md-4">
                    <button className="btn btn-success w-100" onClick={() => setMostrarModal(true)}>
                        ➕ Crear
                    </button>
                </div>
            </div>

            {/* Tabla de Registros */}
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrosFiltrados.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center">No hay registros encontrados.</td>
                            </tr>
                        ) : (
                            registrosFiltrados.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.nombre}</td>
                                    <td>
                                        <button onClick={() => handleEditar(item)} className="btn btn-sm btn-warning me-2">
                                            ✏️ Editar
                                        </button>
                                        <button onClick={() => handleEliminar(item.id)} className="btn btn-sm btn-danger">
                                            ❌ Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal de Crear/Editar */}
            {mostrarModal && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{editando ? "Editar" : "Crear"} {entidad}</h5>
                                <button type="button" className="btn-close" onClick={() => setMostrarModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleGuardar}>
                                    <div className="mb-3">
                                        <label className="form-label">Nombre</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">
                                        {editando ? "Actualizar" : "Guardar"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EntidadCRUD;
