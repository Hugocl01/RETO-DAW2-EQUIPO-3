<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicacionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'titulo'      => $this->titulo,
            'portada'     => ($this->portada)
                ? 'Si'
                : 'No',
            'contenido'   => $this->contenido,
            // Relaciones polimórficas, si quieres mostrarlas
            'seccion' => class_basename($this->publicacionable),
            'elemento' => $this->publicacionable->id??null
        ];
    }
}
