<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PatrocinadorRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado para hacer esta solicitud.
     */
    public function authorize(): bool
    {
        return true; // Ajusta esto según tu sistema de permisos
    }

    /**
     * Obtiene las reglas de validación que se aplican a la solicitud.
     */
    public function rules(): array
    {
        return [
            'nombre' => 'required|string|max:255',
            'landing_page' => 'required|url|max:255',
        ];
    }

    /**
     * Mensajes de error personalizados para las reglas de validación.
     */
    public function messages(): array
    {
        return [
            'nombre.required' => 'El nombre del patrocinador es obligatorio.',
            'nombre.string' => 'El nombre debe ser una cadena de texto.',
            'nombre.max' => 'El nombre no puede superar los 255 caracteres.',
            'landing_page.required' => 'La URL de la landing page es obligatoria.',
            'landing_page.url' => 'La URL de la landing page debe ser una dirección válida.',
            'landing_page.max' => 'La URL no puede superar los 255 caracteres.',
        ];
    }
}
