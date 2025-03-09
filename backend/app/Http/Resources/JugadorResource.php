<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JugadorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre_completo,
            'slug' => $this->slug,
            'equipo' => $this->equipo->nombre,
            'capitan' => $this->capitan,
            'estudio' => new EstudioResource($this->estudio),
            'dni' => $this->dni,
            'email' => $this->email,
            'telefono' => $this->telefono,
            'stats' => $this->statsJugador(),
            'imagenes' => ImagenResource::collection($this->whenLoaded('imagenes')),
        ];
    }
}
