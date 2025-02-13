import React from "react";
import { useCrud } from "../hooks/useCrud";

function Crud({ seccion }) {
    const { items, loading, error, columns, deleteItem } = useCrud(seccion);

    const handleDelete = (id) => {
        deleteItem(id);
    };

    // Manejo de la carga
    if (loading) {
        return <p>Cargando...</p>;
    }

    // Manejo de errores
    if (error) {
        return <p>{error}</p>;
    }

    // Si no hay columnas, mostramos un mensaje
    if (!columns.length) {
        return <p>No se han encontrado columnas disponibles para esta entidad.</p>;
    }

    // Si 'seccion' no tiene la propiedad 'nombre', podemos mostrar un mensaje por defecto
    const sectionTitle = seccion.nombre || 'Entidad'; // Asegúrate de que 'nombre' esté disponible

    return (
        <>
            <h3>{sectionTitle}</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        {/* Renderizamos los encabezados de la tabla basados en las propiedades de la entidad */}
                        {columns.map((column) => (
                            <th key={column}>
                                {column.charAt(0).toUpperCase() + column.slice(1)}
                            </th>
                        ))}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + 1} className="text-center">
                                No hay registros disponibles
                            </td>
                        </tr>
                    ) : (
                        items.map((item) => (
                            <tr key={item.id}>
                                {/* Renderizamos los valores de cada propiedad de cada objeto */}
                                {columns.map((column) => (
                                    <td key={column}>
                                        {/* Aseguramos que item[column] no sea un objeto */}
                                        {typeof item[column] === 'object' 
                                            ? JSON.stringify(item[column]) // Si es un objeto, lo convertimos a string
                                            : item[column] // Si es un valor primitivo, lo mostramos directamente
                                        }
                                    </td>
                                ))}
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleEdit(item.id)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm ms-2"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
}

export default Crud;
