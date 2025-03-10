import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import llamadas from '../../data/FuncionesCombobox';

/**
 * Componente para gestionar un formulario de publicaciones.
 * Permite crear o editar una publicación con título, contenido, tipo de publicación
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.datosIniciales - Datos iniciales para el formulario.
 * @param {Function} props.onGuardar - Función para manejar el envío del formulario.
 * @param {Function} props.onCancelar - Función para manejar la cancelación del formulario.
 * @returns {JSX.Element} Componente de formulario de publicaciones.
 */
const FormularioPublicaciones = ({ datosIniciales, onGuardar, onCancelar }) => {
    const [formData, setFormData] = useState({
        titulo: '',
        contenido: '',
        publicacionable_type: '',
        publicacionable_id: '',
        portada: false,
    });

    const [opcionesPublicacionable, setOpcionesPublicacionable] = useState([]);
    const [errores, setErrores] = useState({ titulo: '', contenido: ''});
    const token = localStorage.getItem('token');

    // Efecto para inicializar el formulario con datos iniciales
    useEffect(() => {
        if (datosIniciales) {
            setFormData((prev) => ({
                ...prev,
                ...datosIniciales,
                publicacionable_type: datosIniciales.seccion,
                publicacionable_id: datosIniciales.elemento,
            }));

            // Si hay un tipo de publicación inicial, cargar sus opciones
            if (datosIniciales.seccion) {
                cargarOpciones(datosIniciales.seccion, datosIniciales.elemento);
            }
        }
    }, [datosIniciales]);

    /**
     * Carga las opciones de publicación según el tipo seleccionado.
     *
     * @async
     * @function cargarOpciones
     * @param {string} tipo - Tipo de publicación (equipo, partido, jugador, etc.).
     * @param {string} elementoId - ID del elemento seleccionado.
     */
    const cargarOpciones = async (tipo, elementoId) => {
        let llamada;
        switch (tipo.toLowerCase()) {
            case 'equipo': llamada = await llamadas().equipos(); break;
            case 'partido': llamada = await llamadas().partidos(); break;
            case 'patrocinador': llamada = await llamadas().patrocinadores(); break;
            case 'jugador': llamada = await llamadas().jugadores(); break;
            case 'reto': llamada = await llamadas().retos(); break;
            case 'ong': llamada = await llamadas().ongs(); break;
            case 'pabellon': llamada = await llamadas().pabellones(); break;
            default: llamada = {};
        }

        if (llamada) {
            let opcionesModificadas;
            // Transformamos el objeto de ID -> nombre a un array de opciones con id y nombre
            if (tipo.toLowerCase() == 'jugador') {
                opcionesModificadas = Object.keys(llamada).map(key => ({
                    id: key,  // ID como id
                    nombre: llamada[key].nombre // El nombre como nombre
                }));
            } else {
                opcionesModificadas = Object.keys(llamada).map(key => ({
                    id: key,  // ID como id
                    nombre: llamada[key] // El nombre como nombre
                }));
            }

            setOpcionesPublicacionable(opcionesModificadas); // Asignamos las opciones modificadas

            setFormData((prev) => ({
                ...prev,
                publicacionable_id: elementoId || "", // Asegurar que el ID inicial se establezca
            }));
        }
    };

    /**
     * Maneja los cambios en los campos del formulario.
     *
     * @param {Object} e - Evento del input.
     */
    const handleChange = async (e) => {
        const { name, value, type, checked, files } = e.target;

        if (name === 'publicacionable_type') {
            setFormData((prev) => ({
                ...prev,
                publicacionable_type: value,
                publicacionable_id: '', // Resetear el ID al cambiar tipo
            }));

            cargarOpciones(value, '');
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
            }));
        }
    };

    /**
     * Maneja los cambios en el editor de texto.
     *
     * @param {string} content - Contenido del editor.
     */
    const handleEditorChange = (content) => {
        setFormData((prev) => ({ ...prev, contenido: content }));
    };

    /**
     * Valida los campos del formulario.
     *
     * @returns {boolean} `true` si todos los campos son válidos, `false` en caso contrario.
     */
    const validarCampos = () => {
        const nuevosErrores = { titulo: '', contenido: ''};

        if (formData.portada) {
            if (!formData.titulo.trim()) {
                nuevosErrores.titulo = 'El título es obligatorio si la publicación está en la portada.';
            }
            if (!formData.contenido.trim()) {
                nuevosErrores.contenido = 'El contenido es obligatorio si la publicación está en la portada.';
            }
        }

        setErrores(nuevosErrores);
        return Object.values(nuevosErrores).every((error) => error === '');
    };

    /**
     * Maneja el envío del formulario.
     *
     * @param {Object} e - Evento del formulario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarCampos()) return;

        const url = import.meta.env.VITE_API_URL;
        const formDataEnvio = new FormData();

        formDataEnvio.append('titulo', formData.titulo);
        formDataEnvio.append('contenido', formData.contenido);
        formDataEnvio.append('publicacionable_type', formData.publicacionable_type);
        formDataEnvio.append('publicacionable_id', formData.publicacionable_id);
        formDataEnvio.append('portada', formData.portada ? '1' : '0');

        try {
            const response = await fetch(`${url}publicaciones`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formDataEnvio,
            });

            const data = await response.json();
            if (response.ok) {
                alert('Publicación creada con éxito');
                if (onGuardar) onGuardar(data.publicacion);
            } else {
                console.error('Error en la creación:', data);
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error al enviar la publicación:', error);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded shadow bg-light">
            <h2 className="mb-4 text-center">Crear Publicación</h2>

            {/* Título */}
            <div className="mb-3">
                <label htmlFor="titulo" className="form-label">Título</label>
                <input
                    type="text"
                    className="form-control"
                    name="titulo"
                    id="titulo"
                    placeholder="Ingrese el título"
                    value={formData.titulo}
                    onChange={handleChange}
                />
                {errores.titulo && <span className="text-danger d-block">{errores.titulo}</span>}
            </div>

            {/* Contenido - Editor TinyMCE */}
            <div className="mb-3">
                <label className="form-label">Contenido</label>
                <Editor
                    apiKey="1970hen3xxpeg7q4hxbmuo33gez4jmscea18iie0jpz65znn"
                    value={formData.contenido}
                    onEditorChange={handleEditorChange}
                    init={{
                        height: 300,
                        menubar: true,
                        plugins: 'advlist autolink lists link image charmap print preview anchor',
                        toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | link',
                    }}
                />
                {errores.contenido && <span className="text-danger d-block">{errores.contenido}</span>}
            </div>

            {/* Tipo de Publicación */}
            <div className="mb-3">
                <label htmlFor="publicacionable_type" className="form-label">Tipo de Publicación</label>
                <select
                    className="form-select"
                    name="publicacionable_type"
                    id="publicacionable_type"
                    value={formData.publicacionable_type}
                    onChange={handleChange}
                >
                    <option value="" hidden>Seleccione un tipo</option>
                    {['Equipo', 'Partido', 'Patrocinador', 'Jugador', 'Reto', 'Ong', 'Pabellon'].map((tipo, index) => (
                        <option key={index} value={tipo}>{tipo}</option>
                    ))}
                </select>
            </div>

            {/* Publicacionable ID */}
            {formData.publicacionable_type && (
                <div className="mb-3">
                    <label htmlFor="publicacionable_id" className="form-label">Nombre</label>
                    <select
                        className="form-select"
                        name="publicacionable_id"
                        id="publicacionable_id"
                        value={formData.publicacionable_id}
                        onChange={handleChange}
                    >
                        <option value="" hidden>Seleccione una opción</option>
                        {opcionesPublicacionable.map((opcion, index) => (
                            <option key={index} value={opcion.id}>{opcion.nombre}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Portada */}
            <div className="mb-3 form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    name="portada"
                    id="portada"
                    checked={formData.portada}
                    onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="portada">Usar como portada</label>
            </div>

            {/* Botones */}
            <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-success">
                    {datosIniciales == null ? 'Crear publicación' : 'Guardar publicación'}
                </button>
                <button type="reset" className="btn btn-secondary" onClick={onCancelar}>Cancelar</button>
            </div>
        </form>
    );
};

export default FormularioPublicaciones;
