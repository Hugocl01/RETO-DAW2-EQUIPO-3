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
        // Si estamos en la ruta 'usuarios.updateActivo', solo validamos el campo 'activo'
        if ($this->isMethod('put') && $this->route('usuario')) {
            return [
                'activo' => 'required|boolean'
            ];
        }

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
            'activo.required' => 'Este campo es obligatorio.',
            'activo.boolean' => 'El estado debe ser verdadero o falso.',
            'perfil.required' => 'El perfil debe ser seleccionado.',
        ];
    }
}
