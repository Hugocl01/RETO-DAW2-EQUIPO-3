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
            'id'          => $this->id,
            'titulo'      => $this->titulo,
            'portada'     => $this->portada ? 'Si' : 'No',
            'contenido'   => $this->contenido,
            'seccion'     => class_basename($this->publicacionable),
            'elemento'    => $this->publicacionable->id ?? null,

            // Agrega aquí la relación de imágenes
            'imagenes'    => $this->imagenes->map(function ($imagen) {
                return [
                    'id'  => $imagen->id,
                    'ruta' => $imagen->ruta,
                    // ...otros campos que tengas en tu tabla imágenes...
                ];
            }),
        ];
    }
}
