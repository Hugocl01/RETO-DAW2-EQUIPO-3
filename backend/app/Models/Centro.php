<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Centro extends Model
{
    protected $table = 'centros';

    protected $fillable = [
        'nombre',
        'landing_page'
    ];

    public function estudios()
    {
        return $this->hasMany(Estudio::class,'centro_id');
    }

    public function equipos()
    {
        return $this->hasMany(Equipo::class,'centro_id');
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
