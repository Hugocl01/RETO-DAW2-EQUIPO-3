<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ActaRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado para hacer esta solicitud.
     */
    public function authorize(): bool
    {
        return true; // Cambia esto si necesitas reglas de autorización
    }

    /**
     * Reglas de validación para la solicitud.
     */
    public function rules(): array
    {
        return [
            'partido_id'   => 'required|exists:partidos,id',  // Verifica que el partido exista
            'jugador_id'   => 'required|exists:jugadores,id', // Verifica que el jugador exista
            'incidencia_id'=> 'nullable|exists:incidencias,id', // Puede ser opcional, pero debe existir si se envía
            'minuto'       => 'required|integer|min:0|max:120', // Minuto válido dentro de un partido
            'comentario'   => 'nullable|string|max:255', // Comentario opcional, máximo 255 caracteres
        ];
    }

    /**
     * Mensajes personalizados para los errores de validación.
     */
    public function messages(): array
    {
        return [
            'partido_id.required'    => 'El campo partido es obligatorio.',
            'partido_id.exists'      => 'El partido seleccionado no es válido.',
            'jugador_id.required'    => 'El campo jugador es obligatorio.',
            'jugador_id.exists'      => 'El jugador seleccionado no es válido.',
            'incidencia_id.exists'   => 'La incidencia seleccionada no es válida.',
            'minuto.required'        => 'El campo minuto es obligatorio.',
            'minuto.integer'         => 'El minuto debe ser un número entero.',
            'minuto.min'             => 'El minuto no puede ser menor a 0.',
            'minuto.max'             => 'El minuto no puede ser mayor a 120.',
            'comentario.max'         => 'El comentario no puede tener más de 255 caracteres.',
        ];
    }
}
