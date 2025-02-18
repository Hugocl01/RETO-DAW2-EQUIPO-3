import React, { useState } from "react";
import { useCrud } from "../hooks/useCrud";
import Formulario from "./Formularios/Formulario";
import camposFormularios from "../data/index";

function Crud({ seccion }) {
    if (!seccion) {
        return <p>Selecciona una sección para mostrar los datos.</p>;
    }

    const {
        items, loading, error, columns,
        deleteItem, createItem, updateItem, activateItem, updateStatusItem
    } = useCrud(seccion);

    const [editingItem, setEditingItem] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [paginaActual, setPaginaActual] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemsPorPagina = 12;

    const camposFormulario = camposFormularios[seccion.nombre];

    const handleDelete = (id) => deleteItem(id);
    const handleEdit = (item) => setEditingItem(item);
    const handleSave = async (formData) => {
        if (editingItem) {
            await updateItem(editingItem.id, formData);
        } else {
            await createItem(formData);
        }
        setEditingItem(null);
        setIsCreating(false);
    };

    const handleCancel = () => {
        setEditingItem(null);
        setIsCreating(false);
    };

    const handleActivate = (id) => activateItem(id);
    const handleUpdateStatus = (id) => updateStatusItem(id);

    const handleValidarFormulario = (formData) => {
        const errores = {};
        if (!formData.username) errores.username = "El nombre de usuario es obligatorio.";
        if (!formData.password) errores.password = "La contraseña es obligatoria.";
        if (!formData.tipo) errores.tipo = "El rol es obligatorio.";
        return errores;
    };

    const filteredColumns = columns.filter((column) =>
        column !== 'id' && column !== 'slug' && !items.some((item) => typeof item[column] === "object" && item[column] !== null)
    );
    const itemsFiltrados = items.filter(item =>
        filteredColumns.some(column =>
            item[column]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Paginación
    const totalPaginas = Math.ceil(itemsFiltrados.length / itemsPorPagina);
    const indiceInicio = (paginaActual - 1) * itemsPorPagina;
    const itemsPaginados = itemsFiltrados.slice(indiceInicio, indiceInicio + itemsPorPagina);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            {editingItem || isCreating ? (
                <Formulario
                    datosIniciales={editingItem}
                    onGuardar={handleSave}
                    camposFormulario={camposFormulario}
                    onValidar={handleValidarFormulario}
                    onCancelar={handleCancel}
                />
            ) : (
                <>
                    <h3>{seccion.nombre || 'Entidad'}</h3>

                    {/* Buscador */}
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPaginaActual(1); // Reinicia a la primera página cuando se filtra
                        }}
                        className="form-control mb-3"
                    />

                    {/* Botón de crear entidad */}
                    {seccion.acciones?.some(a => a.nombre === "store") && (
                        <button onClick={() => setIsCreating(true)} className="btn btn-success">
                            Crear {seccion.nombre || 'Entidad'}
                        </button>
                    )}

                    {/* Tabla con datos */}
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                {filteredColumns.map(column => (
                                    <th key={column}>{column.charAt(0).toUpperCase() + column.slice(1)}</th>
                                ))}
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsPaginados.length === 0 ? (
                                <tr><td colSpan={filteredColumns.length + 1}>No hay registros disponibles</td></tr>
                            ) : (
                                itemsPaginados.map(item => (
                                    <tr key={item.id}>
                                        {filteredColumns.map(column => (
                                            <td key={column}>{item[column] ?? "N/A"}</td>
                                        ))}
                                        <td>
                                            {seccion.acciones?.some(a => a.nombre === "update") && (
                                                <button onClick={() => handleEdit(item)}>Editar</button>
                                            )}
                                            {seccion.acciones?.some(a => a.nombre === "destroy") && (
                                                <button onClick={() => handleDelete(item.id)}>Eliminar</button>
                                            )}
                                            {seccion.acciones?.some(a => a.nombre === "activar") && (
                                                <button onClick={() => handleActivate(item.id)}>Activar</button>
                                            )}
                                            {/* Botón para invocar updateStatusItem */}
                                            {seccion.acciones?.some(a => a.nombre === "cambiarEstado") && (
                                                <button onClick={() => handleUpdateStatus(item.id)} className="btn btn-warning">
                                                    Aprobar
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Paginación (solo si hay datos) */}
                    {itemsFiltrados.length > 0 && (
                        <div className="d-flex justify-content-center mt-4">
                            <button
                                className="btn btn-primary me-2"
                                onClick={() => setPaginaActual(paginaActual - 1)}
                                disabled={paginaActual === 1}
                            >
                                Anterior
                            </button>
                            <span className="align-self-center">Página {paginaActual} de {totalPaginas}</span>
                            <button
                                className="btn btn-primary ms-2"
                                onClick={() => setPaginaActual(paginaActual + 1)}
                                disabled={paginaActual === totalPaginas}
                            >
                                Siguiente
                            </button>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default Crud;
