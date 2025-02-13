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
            'equipo'      => [
                'id'      => $this->equipo->id,
                'nombre'  => $this->equipo->nombre
            ],
            'estado'      => [
                'id'      => $this->estado->id,
                'estado'  => $this->estado->estado
            ],
        ];
    }
}
