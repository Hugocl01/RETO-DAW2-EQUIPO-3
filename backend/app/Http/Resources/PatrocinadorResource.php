<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
            'id'     => $this->id,
            'nombre' => $this->nombre,
            'landing_page' => $this->landing_page,
            'ruta'   => optional($this->imagen->first())->ruta // Evita error si no hay imagen
        ];
    }
}
