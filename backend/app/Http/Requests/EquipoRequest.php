<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EquipoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Equipo
            'nombre'                      => 'required|string|max:255|unique:equipos,nombre',
            'centro_id'                      => 'required|exists:centros,id',

            // Entrenador
            'entrenador_nombre_completo'  => 'required|string|max:255|min:3',
            'entrenador_email'            => 'required|string|email',

            'jugadores'                   => 'required|array|min:10',
            'jugadores.*.nombre_completo' => 'required|string|min:3|max:70',
            'jugadores.*.capitan'         => 'required|integer',
            'jugadores.*.estudio_id'      => 'nullable|integer|exists:estudios,id',
            // Validar DNI del capitán
            'jugadores.*.dni'             => [
                'string',
                'size:9', // exactamente 9 caracteres
                'regex:/^\d{8}[A-Za-z]$/', // 8 dígitos y 1 letra
                'unique:jugadores,dni'
            ],
            'jugadores.*.email'           => 'string|email|unique:jugadores,email',
            'jugadores.*.telefono'        => 'string|size:9',
        ];
    }

    public function messages(): array
    {
        return [
            'nombre.required'                      => 'El nombre del equipo es obligatorio.',
            'nombre.string'                        => 'El nombre del equipo debe ser una cadena de texto.',
            'nombre.max'                           => 'El nombre del equipo no puede superar los 255 caracteres.',
            'nombre.unique'                        => 'El nombre del equipo ya está en uso.',
            'centro_id.required'                      => 'El centro educativo es obligatorio.',
            'centro_id.exists'                        => 'El centro seleccionado no es válido.',

            'entrenador_nombre_completo.required'  => 'El entrenador es obligatorio.',
            'entrenador_nombre_completo.string'    => 'El nombre del entrenador debe ser una cadena de texto.',
            'entrenador_email.required'            => 'El email del entrenador es obligatorio',
            'entrenador_email.string'              => 'El email debe ser una cadena de texto',
            'entrenador_email.email'               => 'El email debe ser una dirección de correo válida',

            'jugadores.required' => 'Se requiere al menos un jugador.',
            'jugadores.array'    => 'Los jugadores deben enviarse en un arreglo.',
            'jugadores.min'      => 'Se requiere al menos 10 jugadores.',

            'jugadores.*.nombre_completo.required' => 'El nombre completo del jugador es obligatorio.',
            'jugadores.*.nombre_completo.string'   => 'El nombre completo debe ser una cadena de texto.',
            'jugadores.*.nombre_completo.min'      => 'El nombre completo debe tener al menos 3 caracteres.',
            'jugadores.*.nombre_completo.max'      => 'El nombre completo no puede superar los 70 caracteres.',

            'jugadores.*.capitan.required'         => 'El campo capitán es obligatorio.',
            'jugadores.*.capitan.integer'          => 'El campo capitán debe ser un número entero.',

            'jugadores.*.estudio_id.integer'       => 'El identificador del estudio debe ser un número entero.',
            'jugadores.*.estudio_id.exists'        => 'El estudio seleccionado no es válido.',

            'jugadores.*.dni.string'               => 'El DNI debe ser una cadena de texto.',
            'jugadores.*.dni.size'                 => 'El DNI debe tener exactamente 9 caracteres.',
            'jugadores.*.dni.regex'                => 'El DNI debe contener 8 dígitos seguidos de una letra.',
            'jugadores.*.dni.unique'               => 'El DNI ya está registrado.',

            'jugadores.*.email.string'             => 'El email debe ser una cadena de texto.',
            'jugadores.*.email.email'              => 'El email debe ser una dirección de correo válida.',
            'jugadores.*.email.unique'             => 'El email ya está registrado.',

            'jugadores.*.telefono.string'          => 'El teléfono debe ser una cadena de texto.',
            'jugadores.*.telefono.size'            => 'El teléfono debe tener exactamente 9 caracteres.',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $jugadores = $this->input('jugadores');
            // Contar cuántos jugadores tienen 'capitan' igual a true
            $capitanes = collect($jugadores)->filter(function ($jugador) {
                // Convertimos a boolean para asegurarnos
                return isset($jugador['capitan']) && (bool)$jugador['capitan'] === true;
            })->count();

            if ($capitanes !== 1) {
                $validator->errors()->add('jugadores', 'Debe de haner una unidad de capitán en el equipo.');
            }
        });
    }
}
