<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="ImagenResource",
 *     type="object",
 *     title="Imagen Resource",
 *     description="Estructura de una imagen",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="nombre", type="string", example="imagen.jpg"),
 *     @OA\Property(property="ruta", type="string", example="imagenes/patrocinadores/imagen.jpg"),
 *     @OA\Property(property="imagenable_id", type="integer", example=5),
 *     @OA\Property(property="imagenable_type", type="string", example="App\Models\Reto"),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2024-03-08T12:00:00Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2024-03-08T12:30:00Z")
 * )
 */
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
            'id' => $this->id,
            'nombre' => $this->nombre,
            'ruta' => $this->ruta,
            'imagenable_id' => $this->imagenable_id,
            'imagenable_type' => $this->imagenable_type,

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
