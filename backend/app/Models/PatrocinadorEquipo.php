<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class PatrocinadorEquipo extends Model
{
    protected $table = 'patrocinadores_equipos';
    protected $fillable = [
        'patrocinador_id',
        'equipo_id',
        'usuario_creador_id',
        'fecha_creacion',
        'usuario_modificador_id',
        'fecha_modificacion'
    ];

    public function patrocinador()
    {
        return $this->belongsTo(Patrocinador::class);
    }

    public function equipo()
    {
        return $this->belongsTo(Equipo::class);
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
