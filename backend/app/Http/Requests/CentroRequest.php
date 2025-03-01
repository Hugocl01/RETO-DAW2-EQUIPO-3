<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CentroRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Adjust this if you have authorization logic
        return true;
    }

    public function rules(): array
    {
        // If the route has a 'centro' parameter, get its id for update operations.
        $id = $this->route('centro') ? $this->route('centro')->id : null;

        return [
            'nombre'     => 'required|string|max:255|unique:centros,nombre,' . $id,
            'landing_page' => 'required|url|max:255',
        ];
    }
}
