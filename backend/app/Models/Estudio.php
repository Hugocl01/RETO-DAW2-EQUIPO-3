<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Estudio extends Model
{
    protected $table = 'estudios';

    protected $fillable = [
        'centro_id',
        'ciclo_id',
        'curso'
    ];

    public function centro()
    {
        return $this->belongsTo(Centro::class, 'centro_id');
    }

    public function ciclo()
    {
        return $this->belongsTo(Ciclo::class, 'ciclo_id');
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
