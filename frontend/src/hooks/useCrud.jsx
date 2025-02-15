import { useState, useEffect } from "react";
import api from "../services/api";
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

    // Obtener todos los registros de la sección (index)
    const fetchItems = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`/${entidadNombre}`);
            setItems(response.data[entidadNombre] || []);

            if (response.data[entidadNombre]?.length > 0) {
                setColumns(Object.keys(response.data[entidadNombre][0]));
            } else {
                setColumns([]);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Error de red.");
        } finally {
            setLoading(false);
        }
    };

    // Crear nuevo registro (store)
    const createItem = async (newItem) => {
        try {
            await api.post(`/${entidadNombre}`, newItem);
            fetchItems(); // Recargar la lista
        } catch (err) {
            setError(err.response?.data?.message || "Error al crear el registro.");
        }
    };

    // Actualizar un registro (update)
    const updateItem = async (id, updatedItem) => {
        try {
            await api.put(`/${entidadNombre}/${id}`, updatedItem);
            fetchItems();
        } catch (err) {
            setError(err.response?.data?.message || "Error al actualizar.");
        }
    };

    // Eliminar un registro (destroy)
    const deleteItem = async (id) => {
        try {
            await api.delete(`/${entidadNombre}/${id}`);
            fetchItems();
        } catch (err) {
            setError(err.response?.data?.message || "Error al eliminar.");
        }
    };

    // Activar o desactivar usuario/inscripción (acciones personalizadas)
    const activateItem = async (id) => {
        try {
            await api.put(`/${entidadNombre}/${id}/activo`);
            fetchItems();
        } catch (err) {
            setError(err.response?.data?.message || "Error al activar.");
        }
    };

    useEffect(() => {
        if (seccion) fetchItems();
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
        activateItem,
    };
};
