<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EquipoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'nombre'        => $this->nombre,
            'slug'          => $this->slug,
            'centro'        => $this->centro?->nombre,
            'grupo'         => $this->grupo,
            'entrenador'    => $this->usuario?->nombre_completo,
            'inscripcion'   => [
                'estado'    => $this->inscripcion->estado_id,
                'comentario' => $this->inscripcion->comentarios
            ],
            'stats'         => $this->statsEquipo(),
            'imagenes'      => ImagenResource::collection($this->whenLoaded('imagenes')),
            'Jugadores'     => JugadorResource::collection($this->jugadores->load('imagenes')),
        ];
    }
}
