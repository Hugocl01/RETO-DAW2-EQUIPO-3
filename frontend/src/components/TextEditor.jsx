import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react'; // Importar el componente Editor de TinyMCE

const TextEditor = () => {
  const [editorContent, setEditorContent] = useState(''); // Estado para guardar el contenido del editor

  // Función para manejar los cambios en el contenido del editor
  const handleEditorChange = (content, editor) => {
    setEditorContent(content);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Editor de Texto con TinyMCE</h2>

      <Editor
        apiKey="1970hen3xxpeg7q4hxbmuo33gez4jmscea18iie0jpz65znn" // Si tienes una clave API de TinyMCE, insértala aquí. Si no, omítela (TinyMCE tiene una versión gratuita).
        value={editorContent} // Asignar el contenido del editor
        onEditorChange={handleEditorChange} // Función para manejar los cambios en el contenido
        init={{
          height: 400,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table contextmenu paste wordcount'
          ],
          toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | link image',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }', // Estilo básico para el cuerpo
          images_upload_url: '/upload', // URL para subir imágenes, cambiar según tu backend si es necesario
        }}
      />

      {/* Mostrar el contenido actual del editor */}
      <div className="mt-3">
        <h4>Contenido Actual:</h4>
        <div dangerouslySetInnerHTML={{ __html: editorContent }} />
      </div>
    </div>
  );
};

export default TextEditor;
