<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PerfilResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->id,
            'tipo'      => $this->tipo,
            'secciones' => SeccionResource::collection($this->whenLoaded('secciones')),
        ];
    }
}
