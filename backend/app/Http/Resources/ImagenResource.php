<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ImagenResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|string|int
     */
    public function toArray($request)
    {
        return [
            'id'                 => $this->id,
            'nombre'             => $this->nombre,
            'ruta'               => $this->ruta,
            'imagenable_id'      => $this->imagenable_id,
            'imagenable_type'    => $this->imagenable_type,

            // Ejemplo: podrías anidar información del modelo padre (imagenable)
            // 'imagenable' => [
            //     'id' => $this->imagenable?->id,
            //     // Otros campos del modelo relacionado (según lo necesites)
            // ],

            // Si deseas incluir timestamps
            // 'created_at'         => $this->created_at,
            // 'updated_at'         => $this->updated_at,
        ];
    }
}
