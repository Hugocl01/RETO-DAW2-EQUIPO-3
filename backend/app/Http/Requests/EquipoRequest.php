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
            'nombre' => 'required|string|max:255|unique:equipos,nombre',
            'centro_id' => 'required|exists:centros,id',
            'grupo' => 'required|string|max:1|in:A,B',
            'usuario_id' => 'required|exists:usuarios,id',
            'jugadores.*.equipo_id' => 'required|int',
            'jugadores.*.nombre_completo' => 'required|string|min:3|max:70',
            'jugadores.*.capitan' => 'required|int',
            'jugadores.*.estudio_id' => 'int',
            'jugadores.*.dni' => 'string|min:9|max:9|digits:8|unique:jugadores,dni',
            'jugadores.*.email' => 'string|email|unique:jugadores,email',
            'jugadores.*.telefono' => 'string|min:9|max:9',
        ];
    }

    public function messages(): array
    {
        return [
            'nombre.required' => 'El nombre del equipo es obligatorio.',
            'nombre.string' => 'El nombre del equipo debe ser una cadena de texto.',
            'nombre.max' => 'El nombre del equipo no puede superar los 255 caracteres.',
            'nombre.unique' => 'El nombre del equipo ya está en uso.',
            'centro_id.required' => 'El centro educativo es obligatorio.',
            'centro_id.exists' => 'El centro seleccionado no es válido.',
            'grupo.required' => 'El grupo es obligatorio.',
            'grupo.string' => 'El grupo debe ser una cadena de texto.',
            'grupo.max' => 'El grupo debe ser una sola letra.',
            'grupo.in' => 'El grupo debe ser A o B',
            'centro_id.required' => 'El entrenador es obligatorio.',
            'centro_id.exists' => 'El entrenador seleccionado no es válido.',
            'jugadores.*.equipo_id.required' => 'El id del equipo es obligatorio.',
            'jugadores.*.equipo_id.int' => 'El id del equipo tiene que ser un entero.',
            'jugadores.*.nombre_completo.required' => 'El nombre completo es obligatorio.',
            'jugadores.*.nombre_completo.string' => 'El nombre completo debe ser una cadena de texto.',
            'jugadores.*.nombre_completo.min' => 'El nombre completo debe tener al menos 3 caracteres.',
            'jugadores.*.nombre_completo.max' => 'El nombre completo no puede superar los 70 caracteres.',
            'jugadores.*.capitan.required' => 'El campo capitán es obligatorio.',
            'jugadores.*.capitan.int' => 'El campo capitán debe ser un entero.',
            'jugadores.*.estudio_id.int' => 'El id del estudio debe ser un entero.',
            'jugadores.*.dni.string' => 'El DNI debe ser una cadena de texto.',
            'jugadores.*.dni.min' => 'El DNI debe tener exactamente 9 caracteres.',
            'jugadores.*.dni.max' => 'El DNI debe tener exactamente 9 caracteres.',
            'jugadores.*.dni.digits' => 'El DNI debe contener exactamente 8 dígitos.',
            'jugadores.*.dni.unique' => 'El DNI ya está registrado.',
            'jugadores.*.email.string' => 'El email debe ser una cadena de texto.',
            'jugadores.*.email.email' => 'El email debe ser una dirección de correo válida.',
            'jugadores.*.email.unique' => 'El email ya está registrado.',
            'jugadores.*.telefono.string' => 'El teléfono debe ser una cadena de texto.',
            'jugadores.*.telefono.min' => 'El teléfono debe tener exactamente 9 caracteres.',
            'jugadores.*.telefono.max' => 'El teléfono debe tener exactamente 9 caracteres.',
        ];
    }
}
