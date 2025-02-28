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
            'slug'              => $this->slug,
            'fecha'             => $this->fecha,
            'duracion'          => $this->duracion,
            'goles local'       => $this->goles_local??0,
            'goles visitante'   => $this->goles_visitante??0,
            'equipo local'      => $this->equipoLocal->nombre,
            'equipo visitante'  => $this->equipoVisitante->nombre,
            'pabellón'          => $this->pabellon->nombre,
            'grupo' => ($this->tipo->value !== 'clasificatorio')
                ? null
                : $this->equipoLocal->grupo,

            'tipo'              => $this->tipo,
            'actas'             => ActaResource::collection($this->actas)
        ];
    }
}
