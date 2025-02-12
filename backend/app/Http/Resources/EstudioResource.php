<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EstudioResource extends JsonResource
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
            'centro' => new CentroResource($this->whenLoaded('centro')),
            'ciclo' => new CicloResource($this->whenLoaded('ciclo')),
            'curso' => $this->curso,
        ];
    }
}
