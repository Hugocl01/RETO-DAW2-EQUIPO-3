<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FamiliaRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado a realizar esta solicitud.
     */
    public function authorize(): bool
    {
        return true; // Permitir que cualquier usuario realice la solicitud
    }

    /**
     * Reglas de validación.
     */
    public function rules(): array
    {
        $id = $this->route('familia') ? $this->route('familia')->id : null;

        return [
            'nombre' => 'required|string|max:255|unique:familias,nombre,' . $id
        ];
    }

    /**
     * Mensajes de error personalizados.
     */
    public function messages(): array
    {
        return [
            'nombre.required' => 'El nombre de la familia es obligatorio.',
            'nombre.string' => 'El nombre debe ser un texto.',
            'nombre.max' => 'El nombre no puede superar los 255 caracteres.',
            'nombre.unique' => 'Ya existe una familia con este nombre.',
        ];
    }
}
