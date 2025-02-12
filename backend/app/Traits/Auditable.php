<?php
namespace App\Traits;

use Illuminate\Support\Facades\Auth;

trait Auditable
{
    protected static function bootAuditable()
    {
        static::creating(function ($model) {
            $model->usuario_creador_id = optional(Auth::user())->id;
            $model->fecha_creacion = now();
        });

        static::updating(function ($model) {
            $model->usuario_modificador_id = optional(Auth::user())->id;
            $model->fecha_modificacion = now();
        });
    }
}
