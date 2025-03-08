<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicacionResource extends JsonResource
{
    // App\Http\Resources\PublicacionResource.php
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'titulo' => $this->titulo,
            'portada' => $this->portada ? 'Si' : 'No',
            'contenido' => $this->contenido,
            'seccion' => class_basename($this->publicacionable),
            'elemento' => $this->publicacionable->id ?? null,
            'imagenes' => ImagenResource::collection($this->imagenes),
        ];
    }
}
