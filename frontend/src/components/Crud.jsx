import React, { useState } from "react";
import { useCrud } from "../hooks/useCrud";
import EditForm from "./EditForm";

function Crud({ seccion }) {
    const { items, loading, error, columns, deleteItem } = useCrud(seccion);
    const [editingItem, setEditingItem] = useState(null); // Estado para manejar el item que se está editando
    const [paginaActual, setPaginaActual] = useState(1); // Pagina actual donde se encuentra el usuario
    const itemsPorPagina = 12; // Numero de items que aparece en la pagina
    const totalPaginas = Math.ceil(items.length / itemsPorPagina); // Numero total de paginas de la seccion

    const handleDelete = (id) => {
        deleteItem(id);
    };

    const handleEdit = (item) => {
        setEditingItem(item);// Establecer el item que se va a editar
    };

    const handleSave = (updatedItem) => {
        // Aquí puedes manejar la lógica para guardar los cambios
        // Por ejemplo, hacer una solicitud a la API para actualizar el item.
        console.log("Guardar item actualizado:", updatedItem);
        setEditingItem(null);
    };

    const handleCancel = () => {
        setEditingItem(null); // Cerrar el formulario de edición sin guardar
    };

    // Filtrar columnas que contengan objetos o arrays de objetos
    const filteredColumns = columns.filter((column) => {
        return !items.some((item) => {
            const value = item[column];
            return (typeof value === "object" && value !== null);// Excluir columnas que contengan objetos
        });
    });

    const renderColumnValue = (column, item) => {
        const value = item[column];
        // Si el valor es un objeto, no mostrar nada
        if (typeof value === "object" && value !== null) {
            return null; // No se mostrará el valor si es un objeto
        }
        return value ?? "N/A"; // Manejo de valores nulos o indefinidos
    };

    // Manejo de la carga
    if (loading) {
        return <p>Cargando...</p>;
    }

    // Manejo de errores
    if (error) {
        return <p>{error}</p>;
    }

    // Si no hay columnas disponibles después del filtrado
    if (!filteredColumns.length) {
        return <p>No se han encontrado columnas disponibles para esta entidad.</p>;
    }

    const sectionTitle = seccion.nombre || 'Entidad'; // Asegurar título
    const indiceInicio = (paginaActual - 1) * itemsPorPagina; //Inicio de los componentes que salen
    const itemsPaginados = items.slice(indiceInicio, indiceInicio + itemsPorPagina); //Items que saldran en la pantalla

    return (
        <>
            {editingItem ? (
                <EditForm item={editingItem} onSave={handleSave} onCancel={handleCancel} />
            ) : (
                <>
                    <h3>{sectionTitle}</h3>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                {filteredColumns.map((column) => (
                                    <th key={column}>{column.charAt(0).toUpperCase() + column.slice(1)}</th>
                                ))}
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsPaginados.length === 0 ? (
                                <tr>
                                    <td colSpan={filteredColumns.length + 1} className="text-center">
                                        No hay registros disponibles
                                    </td>
                                </tr>
                            ) : (
                                itemsPaginados.map((item) => (
                                    <tr key={item.id}>
                                        {filteredColumns.map((column) => (
                                            <td key={column}>{renderColumnValue(column, item)}</td>
                                        ))}
                                        <td>
                                            <button className="btn btn-primary btn-sm" onClick={() => handleEdit(item)}>Editar</button>
                                            <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(item.id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center mt-4">
                        <button className="btn btn-primary me-2" onClick={() => setPaginaActual(paginaActual - 1)} disabled={paginaActual === 1}>Anterior</button>
                        <span className="align-self-center">Página {paginaActual} de {totalPaginas}</span>
                        <button className="btn btn-primary ms-2" onClick={() => setPaginaActual(paginaActual + 1)} disabled={paginaActual === totalPaginas}>Siguiente</button>
                    </div>
                </>
            )}
        </>
    );
}

export default Crud;
