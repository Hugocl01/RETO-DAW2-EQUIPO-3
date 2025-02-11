<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CicloRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Permitir acceso
    }

    public function rules(): array
    {
        $id = $this->route('ciclo') ? $this->route('ciclo')->id : null;

        return [
            'nombre' => 'required|string|max:255|unique:ciclos,nombre,' . $id,
            'familia_id' => 'required|exists:familias,id'
        ];
    }
}
