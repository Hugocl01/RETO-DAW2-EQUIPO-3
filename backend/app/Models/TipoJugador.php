<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class TipoJugador extends Model
{
    protected $table = 'tipo_jugadores';
    protected $fillable = [
        'tipo'
    ];

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
