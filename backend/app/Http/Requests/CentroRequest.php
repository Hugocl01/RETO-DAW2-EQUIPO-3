<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CentroRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('centro') ? $this->route('centro')->id : null;

        return [
            'nombre' => 'required|string|max:255|unique:centros,nombre,' . $id,
        ];
    }
}
