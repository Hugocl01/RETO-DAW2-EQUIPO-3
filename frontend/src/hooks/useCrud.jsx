import { useState, useEffect } from "react";
import api from "../services/api";

/**
 * Hook genérico para gestionar cualquier entidad con operaciones CRUD.
 * 
 * @param {string} entidad - Nombre de la entidad (ej: "usuarios", "perfiles").
 * @returns {Object} - Estado y funciones para gestionar la entidad.
 */
export const useCrud = (entidad) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [columns, setColumns] = useState([]);

    // Función para obtener todos los registros de la entidad
    const fetchItems = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`/${entidad}`);
            const entityData = response.data[entidad] || [];
            setItems(entityData);

            // Aseguramos que solo establecemos las columnas si los datos no están vacíos
            if (entityData.length > 0) {
                const columnKeys = Object.keys(entityData[0]);
                setColumns(columnKeys);
            } else {
                setColumns([]); // Si no hay datos, aseguramos que columns sea un arreglo vacío
            }
        } catch (err) {
            setError("Error al obtener los datos.");
        } finally {
            setLoading(false);
        }
    };

    // Cargar los items cuando se seleccione la entidad
    useEffect(() => {
        if (entidad) {
            fetchItems();
        }
    }, [entidad]);

    return {
        items,
        loading,
        error,
        columns,  // Añadimos las columnas al retorno
        fetchItems,
    };
};
