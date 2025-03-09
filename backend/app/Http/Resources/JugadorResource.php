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
            'equipo' => optional($this->equipo)->nombre, // Usamos optional para evitar error si 'equipo' es null
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
