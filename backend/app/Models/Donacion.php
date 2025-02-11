<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Donacion extends Model
{
    use HasFactory;
    protected $table = 'donaciones';
    protected $fillable = [
        'ong_id',
        'kilos',
        'importe',
        'usuario_creador_id',
        'usuario_modificador_id',
        'fecha_creacion',
        'fecha_modificacion',
    ];

    public function ong()
    {
        return $this->belongsTo(Ong::class);
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
