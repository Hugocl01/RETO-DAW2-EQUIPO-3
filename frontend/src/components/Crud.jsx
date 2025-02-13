import React from "react";
import { useCrud } from "../hooks/useCrud";

function Crud({ entidad }) {
    const { items, loading, error, columns, deleteItem } = useCrud(entidad);

    const handleDelete = (id) => {
        deleteItem(id);
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    if (!columns.length) {
        return <p>No se han encontrado columnas disponibles para esta entidad.</p>;
    }

    return (
        <>
            <h3>{entidad.charAt(0).toUpperCase() + entidad.slice(1)}</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        {/* Renderizamos los encabezados de la tabla basados en las propiedades de la entidad */}
                        {columns.map((column) => (
                            <th key={column}>{column.charAt(0).toUpperCase() + column.slice(1)}</th>
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
                                    <td key={column}>{item[column]}</td>
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
