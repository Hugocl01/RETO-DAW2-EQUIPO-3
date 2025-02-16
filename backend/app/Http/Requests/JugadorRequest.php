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
            'estudio_id' => 'required|int',  // Ahora es obligatorio
            'dni' => 'required|string|size:9|unique:jugadores,dni',
            'email' => 'nullable|string|email|unique:jugadores,email',
            'telefono' => 'nullable|string|size:9|regex:/^[0-9]{9}$/', // Solo números
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages(): array
    {
        return [
            'equipo_id.required' => 'El id del equipo es obligatorio.',
            'equipo_id.int' => 'El id del equipo debe ser un número entero.',
            'nombre_completo.required' => 'El nombre completo es obligatorio.',
            'nombre_completo.string' => 'El nombre completo debe ser una cadena de texto.',
            'nombre_completo.min' => 'El nombre completo debe tener al menos 3 caracteres.',
            'nombre_completo.max' => 'El nombre completo no puede superar los 70 caracteres.',
            'capitan.required' => 'El campo capitán es obligatorio.',
            'capitan.int' => 'El campo capitán debe ser un número entero.',
            'estudio_id.required' => 'El id del estudio es obligatorio.',  // Mensaje de error para el campo estudio_id
            'estudio_id.int' => 'El id del estudio debe ser un número entero.',
            'dni.required' => 'El DNI es obligatorio.',
            'dni.string' => 'El DNI debe ser una cadena de texto.',
            'dni.size' => 'El DNI debe tener exactamente 9 caracteres.',
            'dni.unique' => 'El DNI ya está registrado.',
            'email.string' => 'El email debe ser una cadena de texto.',
            'email.email' => 'El email debe ser una dirección de correo válida.',
            'email.unique' => 'El email ya está registrado.',
            'telefono.string' => 'El teléfono debe ser una cadena de texto.',
            'telefono.size' => 'El teléfono debe tener exactamente 9 caracteres.',
            'telefono.regex' => 'El teléfono solo puede contener 9 dígitos numéricos.',
        ];
    }
}

