<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ImagenResource;

class PatrocinadorResource extends JsonResource
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
            'nombre' => $this->nombre,
            'landing_page' => $this->landing_page,
            'imagenes' => ImagenResource::collection($this->whenLoaded('imagen')), // Devolvemos un array de imágenes
        ];
    }
}
