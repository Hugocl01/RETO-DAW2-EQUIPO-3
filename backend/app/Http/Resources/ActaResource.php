<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActaResource extends JsonResource
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
            'jugador'    => $this->jugador->nombre_completo,
            'equipo'     => $this->jugador->equipo->nombre,
            'incidencia' => $this->incidencia->tipo,
            'minuto'     => $this->minuto
        ];
    }
}
