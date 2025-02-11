<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Familia extends Model
{
    protected $table = 'familias';

    protected $fillable = [
        'nombre',
    ];

    public function ciclos()
    {
        $this->hasMany(Ciclo::class,'familia_id');
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
