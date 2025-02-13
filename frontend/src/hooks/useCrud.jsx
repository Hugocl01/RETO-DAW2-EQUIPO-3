import { useState, useEffect } from "react";
import api from "../services/api";

/**
 * Hook genérico para manejar operaciones CRUD en cualquier entidad.
 *
 * @param {string} entidad - Nombre de la entidad en la API (ej. "usuarios", "perfiles").
 * @returns {Object} - Estado y funciones CRUD para la entidad.
 */
export const useCrud = (entidad) => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDatos = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/${entidad}`);
            setDatos(response.data[entidad]); // Asume que la API devuelve un array con el mismo nombre de la entidad
        } catch (err) {
            setError(err.response?.data?.message || `Error al obtener ${entidad}`);
        } finally {
            setLoading(false);
        }
    };

    const createDato = async (nuevoDato) => {
        setLoading(true);
        try {
            const response = await api.post(`/${entidad}`, nuevoDato);
            setDatos([...datos, response.data]);
        } catch (err) {
            setError(err.response?.data?.message || `Error al crear ${entidad}`);
        } finally {
            setLoading(false);
        }
    };

    const updateDato = async (id, updatedData) => {
        setLoading(true);
        try {
            const response = await api.put(`/${entidad}/${id}`, updatedData);
            setDatos(datos.map((d) => (d.id === id ? response.data : d)));
        } catch (err) {
            setError(err.response?.data?.message || `Error al actualizar ${entidad}`);
        } finally {
            setLoading(false);
        }
    };

    const deleteDato = async (id) => {
        setLoading(true);
        try {
            await api.delete(`/${entidad}/${id}`);
            setDatos(datos.filter((d) => d.id !== id));
        } catch (err) {
            setError(err.response?.data?.message || `Error al eliminar ${entidad}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDatos();
    }, []);

    return { datos, loading, error, fetchDatos, createDato, updateDato, deleteDato };
};
