import { useState, useEffect } from "react";
import api from "../services/api";

/**
 * Hook personalizado para gestionar usuarios.
 * Proporciona funciones para obtener, crear, actualizar y cambiar el estado de los usuarios.
 *
 * @returns {Object} - Estado y funciones para interactuar con los usuarios.
 * @property {Array} usuarios - Lista de usuarios obtenidos de la API.
 * @property {boolean} loading - Indica si se está realizando una operación.
 * @property {string|null} error - Mensaje de error en caso de fallo.
 * @property {Function} fetchUsuarios - Función para obtener la lista de usuarios.
 * @property {Function} createUsuario - Función para crear un nuevo usuario.
 * @property {Function} updateUsuario - Función para actualizar un usuario.
 * @property {Function} toggleUsuarioActivo - Función para activar/desactivar un usuario.
 */
export const useUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Obtiene la lista de usuarios desde la API.
     * Actualiza el estado `usuarios` con los datos recibidos.
     *
     * @async
     * @function fetchUsuarios
     * @returns {Promise<void>}
     */
    const fetchUsuarios = async () => {
        setLoading(true);
        try {
            const response = await api.get("/usuarios");
            setUsuarios(response.data.usuarios);
        } catch (err) {
            setError(err.response?.data?.message || "Error al obtener usuarios");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Crea un nuevo usuario en la API.
     * Agrega el usuario creado a la lista actual de usuarios.
     *
     * @async
     * @function createUsuario
     * @param {Object} usuarioData - Datos del nuevo usuario.
     * @param {string} usuarioData.nombre_completo - Nombre del usuario.
     * @param {string} usuarioData.email - Correo del usuario.
     * @param {number} usuarioData.perfil_id - ID del perfil del usuario.
     * @param {boolean} usuarioData.activo - Estado del usuario.
     * @param {string} usuarioData.password - Contraseña del usuario.
     * @returns {Promise<void>}
     */
    const createUsuario = async (usuarioData) => {
        setLoading(true);
        try {
            const response = await api.post("/usuarios", usuarioData);
            setUsuarios([...usuarios, response.data.usuario]);
        } catch (err) {
            setError(err.response?.data?.message || "Error al crear usuario");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Actualiza la información de un usuario existente.
     * Reemplaza el usuario en la lista con los datos actualizados.
     *
     * @async
     * @function updateUsuario
     * @param {number} id - ID del usuario a actualizar.
     * @param {Object} usuarioData - Datos a actualizar.
     * @returns {Promise<void>}
     */
    const updateUsuario = async (id, usuarioData) => {
        setLoading(true);
        try {
            const response = await api.put(`/usuarios/${id}`, usuarioData);
            setUsuarios(usuarios.map((u) => (u.id === id ? response.data.usuario : u)));
        } catch (err) {
            setError(err.response?.data?.message || "Error al actualizar usuario");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Alterna el estado activo/inactivo de un usuario.
     * Modifica el estado `activo` del usuario en la lista.
     *
     * @async
     * @function toggleUsuarioActivo
     * @param {number} id - ID del usuario a modificar.
     * @returns {Promise<void>}
     */
    const toggleUsuarioActivo = async (id) => {
        setLoading(true);
        try {
            await api.put(`/usuarios/${id}/update-activo`);
            setUsuarios(usuarios.map((u) =>
                u.id === id ? { ...u, activo: !u.activo } : u
            ));
        } catch (err) {
            setError(err.response?.data?.message || "Error al cambiar estado del usuario");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    return {
        usuarios,
        loading,
        error,
        fetchUsuarios,
        createUsuario,
        updateUsuario,
        toggleUsuarioActivo,
    };
};
