<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Acta extends Model
{
    use Auditable, HasFactory;

    protected $fillable = [
        'partido_id',
        'jugador_id',
        'incidencia_id',
        'minuto',
        'comentario',
    ];

    // Relaciones
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
        return $this->belongsTo(Incidencia::class, 'incidencia_id');
    }
}
