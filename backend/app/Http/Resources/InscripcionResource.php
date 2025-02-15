<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class InscripcionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'          => $this->id,
            'comentarios' => $this->comentarios,
            'nombre'  => $this->equipo->nombre,
            'estado'  => $this->estado->estado,
        ];
    }
}
