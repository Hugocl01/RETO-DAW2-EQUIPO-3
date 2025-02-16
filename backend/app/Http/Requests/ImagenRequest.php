<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ImagenRequest extends FormRequest
{
    public function authorize()
    {
        // return Auth::user()->can('subir-imagenes');
        // O simplemente true si no usas roles detallados
        return true;
    }

    public function rules()
    {
        return [
            // si recibes solo una imagen con name="imagen"
            'imagen' => 'required|image|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'imagen.required' => 'Debes seleccionar un archivo de imagen.',
            'imagen.image'    => 'El archivo no es un formato de imagen válido.',
            'imagen.max'      => 'La imagen no puede pesar más de 2MB.',
        ];
    }
}
