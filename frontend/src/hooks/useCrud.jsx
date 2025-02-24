import { useState, useEffect } from "react";
import { generateSlug } from "../utils/stringUtils";

/**
 * Hook para gestionar operaciones CRUD dinámicamente.
 * @param {Object} seccion - Información de la entidad (ej: {nombre: "Equipos", acciones: [...]})
 * @returns {Object} - Estado y funciones para gestionar la entidad.
 */
export const useCrud = (seccion) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [columns, setColumns] = useState([]);
    const entidadNombre = generateSlug(seccion.nombre); // Convertir a slug

    const fetchItems = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/${entidadNombre}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (!response.ok) {
                throw new Error("Error al obtener los datos.");
            }

            const data = await response.json();
            setItems(data[entidadNombre] || []);
            if (data[entidadNombre]?.length > 0) {
                setColumns(Object.keys(data[entidadNombre][0]));
            } else {
                setColumns([]);
            }
        } catch (err) {
            setError(err.message || "Error de red.");
        } finally {
            setLoading(false);
        }
    };

    const createItem = async (newItem) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/${entidadNombre}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(newItem)
            });

            if (!response.ok) {
                throw new Error("Error al crear el registro.");
            }

            fetchItems(); // Recargar la lista
        } catch (err) {
            setError(err.message || "Error al crear el registro.");
        }
    };

    const updateItem = async (id, updatedItem) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/${entidadNombre}/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(updatedItem)
            });

            if (!response.ok) {
                throw new Error("Error al actualizar.");
            }

            fetchItems();
        } catch (err) {
            setError(err.message || "Error al actualizar.");
        }
    };

    const deleteItem = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/${entidadNombre}/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (!response.ok) {
                throw new Error("Error al eliminar.");
            }

            fetchItems();
        } catch (err) {
            setError(err.message || "Error al eliminar.");
        }
    };

    const onGuardar = (formData, modo) => {
        if (modo === "crear") {
            createItem(formData);
        } else if (modo === "editar") {
            updateItem(formData.id, formData); // Asegúrate de que el 'formData' tenga 'id' en modo edición
        }
    };

    useEffect(() => {
        if (seccion) {
            fetchItems();
        };
    }, [seccion]);

    return {
        items,
        loading,
        error,
        columns,
        fetchItems,
        createItem,
        updateItem,
        deleteItem,
        onGuardar,
    };
};
