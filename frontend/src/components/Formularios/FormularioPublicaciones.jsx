import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import llamadas from '../../data/FuncionesCombobox';

const FormularioPublicaciones = ({ datosIniciales, onGuardar, onCancelar }) => {
    const [formData, setFormData] = useState({
        titulo: '',
        contenido: '',
        publicacionable_type: '',
        publicacionable_id: '',
        ruta_video: '',
        ruta_audio: '',
        portada: false,
        imagen: null,
    });

    const [opcionesPublicacionable, setOpcionesPublicacionable] = useState([]);
    const [errores, setErrores] = useState({ titulo: '', contenido: '', imagen: '' });
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (datosIniciales) {
            setFormData((prev) => ({
                ...prev,
                ...datosIniciales,
                publicacionable_type: datosIniciales.seccion,
                publicacionable_id: datosIniciales.elemento,
                imagen: null, // Evita problemas con archivos
            }));

            // Si hay un tipo de publicación inicial, cargar sus opciones
            if (datosIniciales.seccion) {
                cargarOpciones(datosIniciales.seccion, datosIniciales.elemento);
            }
        }
    }, [datosIniciales]);

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
            if(tipo.toLowerCase()=='jugador'){
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

    const handleEditorChange = (content) => {
        setFormData((prev) => ({ ...prev, contenido: content }));
    };

    const validarCampos = () => {
        const nuevosErrores = { titulo: '', contenido: '', imagen: '' };

        if (formData.portada) {
            if (!formData.titulo.trim()) {
                nuevosErrores.titulo = 'El título es obligatorio si la publicación está en la portada.';
            }
            if (!formData.contenido.trim()) {
                nuevosErrores.contenido = 'El contenido es obligatorio si la publicación está en la portada.';
            }
            if (!formData.imagen) {
                nuevosErrores.imagen = 'Una imagen es obligatoria si la publicación está en la portada.';
            }
        }

        setErrores(nuevosErrores);
        return Object.values(nuevosErrores).every((error) => error === '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarCampos()) return;

        try {
            const response = await fetch('http://127.0.0.1:8000/api/publicaciones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Publicación creada con ID:', data.publicacion.id);
                if (formData.imagen) {
                    await subirImagen(data.publicacion.id);
                }
                alert('Publicación creada con éxito');
            } else {
                console.error('Error en la creación:', data);
            }
        } catch (error) {
            console.error('Error al enviar la publicación:', error);
        }
    };

    const subirImagen = async (publicacionId) => {
        const formDataImagen = new FormData();
        formDataImagen.append('imagen', formData.imagen);

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/publicaciones/${publicacionId}/subir-imagen`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formDataImagen,
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Imagen subida correctamente:', data);
            } else {
                console.error('Error al subir imagen:', data);
            }
        } catch (error) {
            console.error('Error al subir imagen:', error);
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
                        toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | link image',
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
                    <label htmlFor="publicacionable_id" className="form-label">Publicación ID</label>
                    <select
                        className="form-select"
                        name="publicacionable_id"
                        id="publicacionable_id"
                        value={formData.publicacionable_id}
                        onChange={handleChange}
                    >
                        <option value="" hidden>Seleccione un ID</option>
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

            {/* Subida de Imagen */}
            <div className="mb-3">
                <label htmlFor="imagen" className="form-label">Subir Imagen</label>
                <input
                    type="file"
                    className="form-control"
                    name="imagen"
                    id="imagen"
                    accept="image/*"
                    onChange={handleChange}
                />
                {errores.imagen && <span className="text-danger d-block">{errores.imagen}</span>}
            </div>

            {/* Botones */}
            <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-success">{datosIniciales==null?'Crear publicacion':'Guardar publicacion'}</button>
                <button type="reset" className="btn btn-secondary" onClick={onCancelar}>Cancelar</button>
            </div>
        </form>
    );
};

export default FormularioPublicaciones;
