<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JugadorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'nombre'          => $this->nombre_completo,
            'slug'            => $this->slug,
            'equipo'          => $this->equipo->nombre,
            'capitan'         => $this->capitan,
            // Si la relación es belongsTo (singular), usamos new EstudioResource:
            'estudio'         => $this->estudio->ciclo->nombre ." - Curso " .$this->estudio->curso,
            'dni'             => $this->dni,
            'email'           => $this->email,
            'telefono'        => $this->telefono,
            'stats'           => $this->statsJugador(),
        ];
    }
}
