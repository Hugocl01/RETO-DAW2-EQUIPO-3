<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PerfilRequest extends FormRequest
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
    // App\Http\Requests\PerfilRequest.php

    public function rules(): array
    {
        return [
            'tipo' => 'required|string|max:100',
            // Hacemos que "secciones" sea opcional (nullable), pero si está presente, debe ser un array
            'secciones'   => 'nullable|array',
            'secciones.*' => 'integer|exists:secciones,id',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages(): array
    {
        return [
            'tipo.required'    => 'El campo "tipo" es obligatorio.',
            'tipo.string'      => 'El campo "tipo" debe ser una cadena de caracteres.',
            'tipo.max'         => 'El campo "tipo" no puede superar los 100 caracteres.',

            'secciones.array'  => 'El campo "secciones" debe ser un array.',
            'secciones.*.integer' => 'Cada valor de "secciones" debe ser un número entero.',
            'secciones.*.exists'  => 'Se ha proporcionado un ID de sección que no existe.',
        ];
    }
}
