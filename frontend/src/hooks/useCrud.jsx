import { useState, useEffect } from "react";
import { generateSlug } from "../utils/stringUtils";

/**
 * Hook para gestionar operaciones CRUD dinámicamente.
 * @param {Object} seccion - Información de la entidad (ej: {nombre: "Equipos", acciones: [...]})
 * @returns {Object} - Estado y funciones para gestionar la entidad.
 */
export const useCrud = (seccion) => {
    const url = import.meta.env.VITE_API_URL;
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [columns, setColumns] = useState([]);
    const entidadNombre = generateSlug(seccion.nombre); // Convertir a slug

    /**
     * Obtiene los elementos de la entidad desde la API.
     * Se realiza una solicitud GET para obtener los datos.
     */
    const fetchItems = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${url}${entidadNombre}`, {
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

    /**
     * Crea un nuevo elemento.
     * Se realiza una solicitud POST para crear el elemento en la API.
     * 
     * @param {Object} newItem - Objeto con los datos del nuevo elemento.
     */
    const createItem = async (newItem) => {
        try {
            const response = await fetch(`${url}${entidadNombre}`, {
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

    /**
    * Actualiza un elemento existente.
    * Se realiza una solicitud PUT para actualizar el elemento en la API.
    * 
    * @param {number} id - ID del elemento a actualizar.
    * @param {Object} updatedItem - Objeto con los datos actualizados del elemento.
    */
    const updateItem = async (id, updatedItem) => {
        try {
            const response = await fetch(`${url}${entidadNombre}/${id}`, {
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

    /**
     * Elimina un elemento.
     * Se realiza una solicitud DELETE para eliminar el elemento de la API.
     * 
     * @param {number} id - ID del elemento a eliminar.
     */
    const deleteItem = async (id) => {
        try {
            const response = await fetch(`${url}${entidadNombre}/${id}`, {
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

    /**
     * Guarda un nuevo elemento o actualiza uno existente.
     * Detecta si el objeto `formData` tiene un `id` para decidir si es una creación o una actualización.
     * 
     * @param {Object} formData - Datos del elemento. Si incluye un `id`, se actualiza; de lo contrario, se crea.
     */
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
