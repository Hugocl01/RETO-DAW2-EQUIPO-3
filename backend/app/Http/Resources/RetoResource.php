<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RetoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'titulo' => $this->titulo,
            'texto' => $this->texto,
            'estudio' => new EstudioResource($this->whenLoaded('estudio')),
            'imagenes' => ImagenResource::collection($this->whenLoaded('imagenes')), // Devuelve un array de imágenes
        ];
    }
}
