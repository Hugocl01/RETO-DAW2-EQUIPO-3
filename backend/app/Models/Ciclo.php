<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Ciclo extends Model
{
    protected $table = 'ciclos';

    protected $fillable = [
        'nombre',
        'familia_id'
    ];

    public function familia()
    {
        return $this->belongsTo(Familia::class, 'familia_id');
    }

    // Creacion y Modificacion de perfiles
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
