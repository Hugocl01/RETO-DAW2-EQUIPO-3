<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Class PublicacionResource
 *
 * Esta clase es una representación de la publicación en la API. Convierte un objeto de publicación
 * en un formato JSON adecuado para ser utilizado en una respuesta de la API.
 *
 * @package App\Http\Resources
 */
class PublicacionResource extends JsonResource
{
    /**
     * Transforma el recurso de la publicación en un array.
     *
     * Este método mapea los atributos de la publicación a un formato JSON que será utilizado por la API.
     * Se incluye la información como el ID, título, portada, contenido, la sección asociada,
     * el ID del elemento relacionado con la publicación y las imágenes asociadas.
     *
     * @param Request $request La solicitud HTTP que contiene los parámetros de la API.
     *
     * @return array El array con los datos transformados de la publicación.
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'titulo' => $this->titulo,
            'portada' => $this->portada ? 'Si' : 'No',
            'contenido' => $this->contenido,
            'seccion' => class_basename($this->publicacionable),
            'elemento' => $this->publicacionable->id ?? null,
            'imagenes' => ImagenResource::collection($this->imagenes),
        ];
    }
}
