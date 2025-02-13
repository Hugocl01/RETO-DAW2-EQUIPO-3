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
            'id'         => $this->id,
            'nombre'     => $this->nombre,
            'centro'     => $this->centro ? new CentroResource($this->centro) : null,
            'grupo'      => $this->grupo,
            'entrenador' => $this->usuario ? [
                'id'     => $this->usuario->id,
                'nombre' => $this->usuario->nombre_completo,
            ] : null,
            'Jugadores'  => [
                'jugador' => $this->jugadores->map(function ($jugador) {
                    return [
                        'id'     => $jugador->id,
                        'nombre' => $jugador->nombre_completo,
                    ];
                }),
            ],
            'stats'     => $this->statsEquipo(),
        ];
    }
}
