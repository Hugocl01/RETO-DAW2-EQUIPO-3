<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

class Acta extends Model
{
    use Auditable;

    protected $table = 'actas';

    protected $fillable = [
        'partido_id',
        'jugador_id',
        'incidencia_id',
        'hora',
        'comentario',
        'usuario_creador_id',
        'fecha_creacion',
        'usuario_modificador_id',
        'fecha_modificacion'
    ];

    public function partido()
    {
        return $this->belongsTo(Partido::class, 'partido_id');
    }

    public function jugador()
    {
        return $this->belongsTo(Jugador::class, 'jugador_id');
    }

    public function incidencia()
    {
        return $this->hasOne(Incidencia::class, 'incidencia_id');
    }

}
