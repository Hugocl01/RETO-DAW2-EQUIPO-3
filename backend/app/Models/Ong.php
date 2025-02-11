<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Ong extends Model
{
    protected $table = 'ongs';
    protected $fillable = [
        'nombre',
        'landing_page',
        'usuario_creador_id',
        'usuario_modificador_id',
        'fecha_creacion',
        'fecha_modificacion',
    ];

    public function donacion()
    {
        return $this->hasMany(Donacion::class);
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
