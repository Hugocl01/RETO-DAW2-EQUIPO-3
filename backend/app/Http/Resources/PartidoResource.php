<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PartidoResource extends JsonResource
{
    /**
     * Transforma el recurso en un array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'fecha'             => $this->fecha,
            'duracion'          => $this->duracion,
            'goles local'       => $this->goles_local,
            'goles visitante'   => $this->goles_visitante,
            // Se incluyen los datos de las relaciones si están cargadas
            'equipo local'      => $this->equipoLocal->nombre,
            'equipo visitante'  => $this->equipoVisitante->nombre,
            'pabellón'          => $this->pabellon->nombre,
            'actas'             => ActaResource::collection($this->actas)
        ];
    }
}
