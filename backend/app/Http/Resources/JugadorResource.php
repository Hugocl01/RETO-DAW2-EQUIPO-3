<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JugadorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                => $this->id,
            'equipo'            => EquipoResource::collection($this->whenLoaded('equipos')),
            'nombre_completo'   => $this->nombre_completo,
            'capitan'           => $this->capitan,
            'estudio'           => EstudioResource::collection($this->whenLoaded('estudios')),
            'dni'               => $this->dni,
            'email'             => $this->email,
            'telefono'          => $this->telefono,
        ];
    }
}
