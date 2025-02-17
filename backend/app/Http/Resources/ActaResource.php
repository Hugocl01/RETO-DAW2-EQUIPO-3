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
            'jugador'    => isset($this->jugador)
            ? $this->jugador->nombre_completo
            : null,
            'equipo'     => isset($this->jugador)
            ? $this->jugador->equipo->nombre
            : null,
            'incidencia' => $this->incidencia->tipo,
            'minuto'     => $this->minuto
        ];
    }
}
