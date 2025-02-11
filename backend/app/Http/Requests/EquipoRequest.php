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
            'grupo' => 'required|string|max:1|in:A,B,C',
        ];
    }
}
