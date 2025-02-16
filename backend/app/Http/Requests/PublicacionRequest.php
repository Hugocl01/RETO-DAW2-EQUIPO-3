<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PublicacionRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado a realizar esta petición.
     */
    public function authorize()
    {
        // Si usas políticas o gates, podría ser algo como:
        // return Auth::user()->can('crear-publicaciones');
        // De lo contrario, return true;
        return true;
    }

    /**
     * Reglas de validación.
     */
    public function rules()
    {
        // Si es "store", puede que quieras la regla 'required' en 'titulo';
        // si es "update", puede ser 'sometimes'. Ajusta según tus necesidades.
        return [
            'titulo'    => 'required|string|max:255',
            'contenido' => 'nullable|string',

            // Si permites subir múltiples imágenes, vendrán en un array
            // Ej: <input type="file" name="imagenes[]" multiple />
            // Validamos cada imagen (imagen opcional y peso máximo 2MB por ej.)
            'imagenes'      => 'sometimes|array',
            'imagenes.*'    => 'image|max:2048',

            // Si tienes un select para “tipo_entidad” e “entidad_id”
            'publicacionable_type' => 'sometimes|string',
            'publicacionable_id'   => 'sometimes|integer|exists:XXXX,id',
            // “XXXX” = la tabla que corresponda o usa tu propia lógica en caso polimórfico
        ];
    }

    /**
     * Mensajes de error personalizados (opcional).
     */
    public function messages()
    {
        return [
            'titulo.required' => 'El título de la publicación es obligatorio.',
            'titulo.max'      => 'El título no puede exceder 255 caracteres.',
            'imagenes.*.image' => 'Cada archivo debe ser una imagen válida.',
            'imagenes.*.max'   => 'El tamaño de cada imagen no puede sobrepasar los 2MB.',
        ];
    }
}
