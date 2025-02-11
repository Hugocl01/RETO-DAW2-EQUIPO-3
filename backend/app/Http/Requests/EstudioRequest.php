<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EstudioRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'centro_id' => 'required|exists:centros,id',
            'ciclo_id' => 'required|exists:ciclos,id',
            'curso' => 'required|integer|min:1|max:10',
        ];
    }
}
