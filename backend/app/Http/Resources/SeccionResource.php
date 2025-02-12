<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SeccionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // Puedes personalizar los datos retornados, por ejemplo:
        return [
            'id'         => $this->id,
            'nombre'     => $this->nombre,
            'descripcion'=> $this->descripcion,
        ];
    }
}
