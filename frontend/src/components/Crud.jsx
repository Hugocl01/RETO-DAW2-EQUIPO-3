import React, { useState } from "react";
import { useCrud } from "../hooks/useCrud";
import EditForm from "./EditForm";

function Crud({ seccion }) {
    if (!seccion) {
        return <p>Selecciona una sección para mostrar los datos.</p>;
    }

    const {
        items, loading, error, columns, 
        deleteItem, createItem, updateItem, activateItem
    } = useCrud(seccion);

    const [editingItem, setEditingItem] = useState(null);
    const [newItem, setNewItem] = useState({});
    const [paginaActual, setPaginaActual] = useState(1);
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

    const handleCreate = () => {
        createItem(newItem);
        setNewItem({});
    };

    const filteredColumns = columns.filter((column) => 
        !items.some((item) => typeof item[column] === "object" && item[column] !== null)
    );

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
            ) : (
                <>
                    <h3>{seccion.nombre || 'Entidad'}</h3>
                    
                    {/* Formulario para crear un nuevo registro */}
                    {seccion.acciones?.some(a => a.nombre === "store") && (
                        <div>
                            {filteredColumns.map(column => (
                                <input
                                    key={column}
                                    name={column}
                                    placeholder={column}
                                    value={newItem[column] || ""}
                                    onChange={handleNewItemChange}
                                />
                            ))}
                            <button onClick={handleCreate}>Crear</button>
                        </div>
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
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Paginación */}
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
                </>
            )}
        </>
    );
}

export default Crud;
