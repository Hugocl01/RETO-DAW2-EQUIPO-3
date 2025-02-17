<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PublicacionRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado a hacer este request.
     */
    public function authorize(): bool
    {
        // Aquí puedes agregar la lógica de autorización (por ejemplo, verificar roles o permisos)
        return true;
    }

    /**
     * Obtén las reglas de validación que se aplican al request.
     */
    public function rules(): array
    {
        return [
            'titulo' => 'required|string|max:255',
            'contenido' => 'nullable|string',
            'publicacionable_type' => 'required|string|max:255',
            'ruta_video' => 'nullable|string|max:255',
            'ruta_audio' => 'nullable|string|max:255',
            'portada' => 'sometimes|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'titulo.required' => 'El título es obligatorio.',
            'titulo.string' => 'El título debe ser un texto.',
            'titulo.max' => 'El título no debe tener más de 255 caracteres.',

            'contenido.string' => 'El contenido debe ser un texto.',

            'publicacionable_type.required' => 'El tipo de entidad es obligatorio.',
            'publicacionable_type.string' => 'El tipo de entidad debe ser un texto.',
            'publicacionable_type.max' => 'El tipo de entidad no debe tener más de 255 caracteres.',

            'ruta_video.string' => 'La ruta del video debe ser un texto.',
            'ruta_video.max' => 'La ruta del video no debe tener más de 255 caracteres.',

            'ruta_audio.string' => 'La ruta del audio debe ser un texto.',
            'ruta_audio.max' => 'La ruta del audio no debe tener más de 255 caracteres.',

            'portada.boolean' => 'El valor de portada debe ser verdadero o falso.',
        ];
    }

}
