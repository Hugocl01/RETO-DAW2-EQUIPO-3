<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UsuarioResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nombre_completo' => $this->nombre_completo,
            'email' => $this->email,
            'perfil' => new PerfilResource($this->whenLoaded('perfil')),
            'activo' => $this->activo,
        ];
    }
}
