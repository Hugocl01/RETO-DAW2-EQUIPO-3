<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

class Reto extends Model
{
    use Auditable;

    protected $table = 'retos';

    protected $fillable = [
        'titulo',
        'texto',
        'estudio_id',
        'usuario_creador_id',
        'fecha_creacion',
        'usuario_modificador_id',
        'fecha_modificacion'
    ];

    public function estudio()
    {
        return $this->belongsTo(Estudio::class);
    }

}
