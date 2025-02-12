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
        ];
    }
}
