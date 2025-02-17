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
    const [searchTerm, setSearchTerm] = useState(""); // Estado para el buscador
    const itemsPorPagina = 12;

    const handleDelete = (id) => deleteItem(id);
    const handleEdit = (item) => setEditingItem(item);
    const handleSave = (updatedItem) => {
        updateItem(updatedItem.id, updatedItem);
        setEditingItem(null);
    };
    const handleCancel = () => setEditingItem(null);
    const handleActivate = (id) => activateItem(id);
    const handleUpdateStatus = (id) => updateStatusItem(id);

    // Excluir 'id' de las columnas visibles
    const filteredColumns = columns.filter((column) =>
        column !== 'id' && column !== 'slug' && !items.some((item) => typeof item[column] === "object" && item[column] !== null)
    );

    console.log(columns);

    const renderColumnValue = (column, item) => {
        const value = item[column];
        return typeof value === "object" && value !== null ? null : value ?? "N/A";
    };

    // FILTRO POR BÚSQUEDA (Solo en columnas visibles)
    const itemsFiltrados = items.filter(item =>
        filteredColumns.some(column =>
            item[column]?.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchTerm.toLowerCase())
        )
    );

    // PAGINACIÓN
    const totalPaginas = Math.ceil(itemsFiltrados.length / itemsPorPagina);
    const indiceInicio = (paginaActual - 1) * itemsPorPagina;
    const itemsPaginados = itemsFiltrados.slice(indiceInicio, indiceInicio + itemsPorPagina);

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
                    onChange={(e) => setNewItem({ ...newItem, [e.target.name]: e.target.value })}
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
