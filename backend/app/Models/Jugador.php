<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Jugador extends Model
{
    protected $table = 'jugadores';
    protected $fillable = [
        'equipo_id',
        'nombre',
        'apellido1',
        'apellido2',
        'tipos_id',
        'estudio_id',
        'dni',
        'email',
        'telefono',
        'usuario_creador_id',
        'fecha_creacion',
        'usuario_modificador_id',
        'fecha_modificacion'
    ];

    public function equipo()
    {
        return $this->belongsTo(Equipo::class);
    }

    public function estudio()
    {
        return $this->belongsTo(Estudio::class);
    }

    public function tipo()
    {
        return $this->belongsTo(TipoJugador::class);
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
