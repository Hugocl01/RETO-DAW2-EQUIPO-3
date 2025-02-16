import React, { useState } from "react";
import { useCrud } from "../hooks/useCrud";
import EditForm from "./EditForm";

function Crud({ seccion }) {
    if (!seccion) {
        return <p>Selecciona una sección para mostrar los datos.</p>;
    }

    const {
        items, loading, error, columns,
        deleteItem, createItem, updateItem, activateItem, updateStatusItem
    } = useCrud(seccion);

    const [editingItem, setEditingItem] = useState(null);
    const [newItem, setNewItem] = useState({});
    const [paginaActual, setPaginaActual] = useState(1);
    const [isCreating, setIsCreating] = useState(false); // Nueva variable de estado para el formulario de creación
    const itemsPorPagina = 12;
    const totalPaginas = Math.ceil(items.length / itemsPorPagina);

    const handleDelete = (id) => deleteItem(id);
    const handleEdit = (item) => setEditingItem(item);
    const handleSave = (updatedItem) => {
        updateItem(updatedItem.id, updatedItem);
        setEditingItem(null);
    };
    const handleCancel = () => setEditingItem(null);
    const handleActivate = (id) => activateItem(id);

    const handleNewItemChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    const handleUpdateStatus = (id) => {
        updateStatusItem(id);
    };

    const handleCreate = () => {
        createItem(newItem);
        setNewItem({});
        setIsCreating(false); // Cerrar el formulario de creación después de guardar
    };

    const filteredColumns = columns.filter((column) =>
        column !== 'id' && !items.some((item) => typeof item[column] === "object" && item[column] !== null)
    ); // Excluir 'id' de las columnas visibles

    const renderColumnValue = (column, item) => {
        const value = item[column];
        return typeof value === "object" && value !== null ? null : value ?? "N/A";
    };

    const indiceInicio = (paginaActual - 1) * itemsPorPagina;
    const itemsPaginados = items.slice(indiceInicio, indiceInicio + itemsPorPagina);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            {editingItem ? (
                <EditForm item={editingItem} onSave={handleSave} onCancel={handleCancel} />
            ) : isCreating ? (
                <CreateForm
                    columns={filteredColumns}
                    onSave={handleCreate}
                    onCancel={() => setIsCreating(false)}
                    newItem={newItem}
                    onChange={handleNewItemChange}
                />
            ) : (
                <>
                    <h3>{seccion.nombre || 'Entidad'}</h3>

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
                                            <td key={column}>{renderColumnValue(column, item)}</td>
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
                                                <button
                                                    onClick={() => handleUpdateStatus(item.id)}
                                                    className="btn btn-warning"
                                                >
                                                    Aprobar
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Paginación (solo se muestra si hay datos) */}
                    {items.length > 0 && (
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
