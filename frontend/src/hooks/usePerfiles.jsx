import { useState, useEffect } from "react";
import api from "../services/api";

/**
 * Hook para gestionar los perfiles en la aplicación.
 * Proporciona funciones para obtener, crear, actualizar y eliminar perfiles.
 *
 * @returns {Object} Estado y funciones para gestionar perfiles.
 */
export const usePerfiles = () => {
    const [perfiles, setPerfiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Obtener lista de perfiles
    const fetchPerfiles = async () => {
        setLoading(true);
        try {
            const response = await api.get("/perfiles");
            setPerfiles(response.data.perfiles);
        } catch (err) {
            setError(err.response?.data?.message || "Error al obtener perfiles");
        } finally {
            setLoading(false);
        }
    };

    // Crear un perfil
    const createPerfil = async (perfilData) => {
        setLoading(true);
        try {
            const response = await api.post("/perfiles", perfilData);
            setPerfiles([...perfiles, response.data.perfil]);
        } catch (err) {
            setError(err.response?.data?.message || "Error al crear perfil");
        } finally {
            setLoading(false);
        }
    };

    // Actualizar un perfil
    const updatePerfil = async (id, perfilData) => {
        setLoading(true);
        try {
            const response = await api.put(`/perfiles/${id}`, perfilData);
            setPerfiles(perfiles.map((p) => (p.id === id ? response.data.perfil : p)));
        } catch (err) {
            setError(err.response?.data?.message || "Error al actualizar perfil");
        } finally {
            setLoading(false);
        }
    };

    // Eliminar un perfil
    const deletePerfil = async (id) => {
        setLoading(true);
        try {
            await api.delete(`/perfiles/${id}`);
            setPerfiles(perfiles.filter((p) => p.id !== id));
        } catch (err) {
            setError(err.response?.data?.message || "Error al eliminar perfil");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPerfiles();
    }, []);

    return {
        perfiles,
        loading,
        error,
        fetchPerfiles,
        createPerfil,
        updatePerfil,
        deletePerfil,
    };
};
