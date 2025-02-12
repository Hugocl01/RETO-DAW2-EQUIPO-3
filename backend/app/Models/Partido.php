<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Partido extends Model
{
    protected $table = 'partidos';
    protected $fillable = [
        'equipo_local_id',
        'equipo_visitante_id',
        'fecha',
        'hora',
        'goles_local',
        'goles_visitante',
        'pabellon_id',
        'usuario_creador_id',
        'fecha_creacion',
        'usuario_modificador_id',
        'fecha_modificacion'
    ];

    public function equipoLocal()
    {
        return $this->belongsTo(Equipo::class, 'equipoL_id');
    }

    public function equipoVisitante()
    {
        return $this->belongsTo(Equipo::class, 'equipoV_id');
    }

    public function pabellon()
    {
        return $this->belongsTo(Pabellon::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->usuario_creador_id = Auth::id();
            $model->fecha_creacion = now();
        });

        static::updating(function ($model) {
            $model->usuario_modificador_id = Auth::id();
            $model->fecha_modificacion = now();
        });
    }
}
