import { useState, useEffect } from "react";
import api from "../services/api";
import { generateSlug } from "../utils/stringUtils";

/**
 * Hook genérico para gestionar cualquier entidad con operaciones CRUD.
 * 
 * @param {string} seccion - Nombre de la entidad (ej: "usuarios", "perfiles").
 * @returns {Object} - Estado y funciones para gestionar la entidad.
 */
export const useCrud = (seccion) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [columns, setColumns] = useState([]);

    // Función para obtener todos los registros de la seccion
    const fetchItems = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log('nombre: ', seccion.nombre.toLowerCase())
            const response = await api.get(`/${generateSlug(seccion.nombre)}`);
            console.log("Respuesta de la API:", response); // Verifica la respuesta

            // Ahora accedemos a la propiedad correcta: 'equipos'
            const entityData = response.data.equipos || [];  // Cambié aquí para acceder a 'equipos'
            setItems(entityData);

            // Si hay datos, establecemos las columnas
            if (entityData.length > 0) {
                const columnKeys = Object.keys(entityData[0]);
                setColumns(columnKeys);
            } else {
                setColumns([]); // Si no hay datos, aseguramos que columns sea un arreglo vacío
            }
        } catch (err) {
            if (err.response) {
                const errorMessage = err.response.data.message || "Error desconocido al obtener los datos.";
                setError(errorMessage);
            } else {
                setError("Error de red o no se pudo conectar con la API.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Cargar los items cuando se seleccione la entidad
    useEffect(() => {
        if (seccion) {
            fetchItems();
        }
    }, [seccion]);

    return {
        items,
        loading,
        error,
        columns,
        fetchItems,
    };
};
