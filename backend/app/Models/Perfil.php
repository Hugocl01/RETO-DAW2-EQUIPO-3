<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Perfil extends Model
{
    protected $table = 'perfiles';

    protected $fillable = [
        'tipo',
        'usuario_creador_id',
        'usuario_modificador_id',
        'fecha_creacion',
        'fecha_modificacion',
    ];

    public function usuarios()
    {
        return $this->HasMany(Usuario::class, 'perfil_id');
    }


    // Creacion y Modificacion de perfiles
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->usuario_creador_id = auth::id();
            $model->fecha_creacion = now();
        });

        static::updating(function ($model) {
            $model->usuario_modificador_id = auth::id();
            $model->fecha_modificacion = now();
        });
    }
}
