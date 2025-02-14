<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RetoRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado para hacer esta solicitud.
     */
    public function authorize(): bool
    {
        return true; // Cambiar según los permisos si es necesario
    }

    /**
     * Obtiene las reglas de validación que se aplican a la solicitud.
     */
    public function rules(): array
    {
        return [
            'titulo' => 'required|string|max:255',
            'texto' => 'required|string',
            'estudio_id' => 'required|exists:estudios,id',
        ];
    }

    /**
     * Mensajes personalizados para errores de validación.
     */
    public function messages(): array
    {
        return [
            'titulo.required' => 'El título es obligatorio.',
            'titulo.string' => 'El título debe ser una cadena de texto.',
            'titulo.max' => 'El título no debe superar los 255 caracteres.',
            'texto.required' => 'El texto es obligatorio.',
            'texto.string' => 'El texto debe ser una cadena de texto.',
            'estudio_id.required' => 'El ID del estudio es obligatorio.',
            'estudio_id.exists' => 'El estudio seleccionado no es válido.',
        ];
    }
}
