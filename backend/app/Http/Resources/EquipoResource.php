<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\CentroResource;
use Illuminate\Http\Resources\Json\JsonResource;

class EquipoResource extends JsonResource
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
            'centro' => new CentroResource($this->centro),
            'grupo' => $this->grupo,
            'entrenador' => [
                $this->usuario->id,
                $this->usuario->nombre_completo
            ]
        ];
    }
}
