<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JugadorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'equipo_id' => 'required|int',
            'nombre_completo' => 'required|string|min:3|max:70',
            'capitan' => 'required|int',
            'estudio_id' => 'int',
            'dni' => 'string|min:9|max:9|digits:8|unique:jugadores,dni',
            'email' => 'string|email|unique:jugadores,email',
            'telefono' => 'string|min:9|max:9',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages(): array
    {
        return [
            'equipo_id.required' => 'El id del equipo es obligatorio.',
            'equipo_id.int' => 'El id del equipo tiene que ser un entero.',
            'nombre_completo.required' => 'El nombre completo es obligatorio.',
            'nombre_completo.string' => 'El nombre completo debe ser una cadena de texto.',
            'nombre_completo.min' => 'El nombre completo debe tener al menos 3 caracteres.',
            'nombre_completo.max' => 'El nombre completo no puede superar los 70 caracteres.',
            'capitan.required' => 'El campo capitán es obligatorio.',
            'capitan.int' => 'El campo capitán debe ser un entero.',
            'estudio_id.int' => 'El id del estudio debe ser un entero.',
            'dni.string' => 'El DNI debe ser una cadena de texto.',
            'dni.min' => 'El DNI debe tener exactamente 9 caracteres.',
            'dni.max' => 'El DNI debe tener exactamente 9 caracteres.',
            'dni.digits' => 'El DNI debe contener exactamente 8 dígitos.',
            'dni.unique' => 'El DNI ya está registrado.',
            'email.string' => 'El email debe ser una cadena de texto.',
            'email.email' => 'El email debe ser una dirección de correo válida.',
            'email.unique' => 'El email ya está registrado.',
            'telefono.string' => 'El teléfono debe ser una cadena de texto.',
            'telefono.min' => 'El teléfono debe tener exactamente 9 caracteres.',
            'telefono.max' => 'El teléfono debe tener exactamente 9 caracteres.',
        ];
    }
}
