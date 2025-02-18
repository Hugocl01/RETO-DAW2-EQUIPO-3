<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ImagenRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado a hacer este request.
     */
    public function authorize(): bool
    {
        // Aquí puedes agregar lógica para autorizar al usuario, por ejemplo, verificar roles o permisos.
        return true;
    }

    /**
     * Obtén las reglas de validación que se aplican al request.
     */
    public function rules(): array
    {
        return [
            'imagen' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }

    /**
     * Mensajes de validación personalizados.
     */
    public function messages(): array
    {
        return [
            'imagen.required' => 'Es obligatorio seleccionar una imagen.',
            'imagen.image'    => 'El archivo debe ser una imagen válida.',
            'imagen.mimes'    => 'La imagen debe ser de tipo: jpeg, png, jpg, gif o svg.',
            'imagen.max'      => 'La imagen no debe superar los 2048 kilobytes.',
        ];
    }
}
