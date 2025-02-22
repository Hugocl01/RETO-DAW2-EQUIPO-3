<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UsuarioRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado para hacer esta solicitud.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Obtiene las reglas de validación que se aplican a la solicitud.
     */
    public function rules(): array
    {
        return [
            'nombre_completo' => 'required|string|min:3|max:45',
            'email' => 'required|email',
            'password' => 'required|string|min:8',
            'perfil' => 'required'
        ];
    }

    /**
     * Personaliza los mensajes de error.
     */
    public function messages(): array
    {
        return [
            'nombre_completo.required' => 'El nombre completo es obligatorio.',
            'nombre_completo.min' => 'El nombre no puede tener menos de 3 caracteres.',
            'nombre_completo.max' => 'El nombre no puede tener más de 45 caracteres.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico no es válido.',
            'password.required' => 'La contraseña es obligatoria.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'perfil.required' => 'El perfil debe ser seleccionado.',
        ];
    }
}
