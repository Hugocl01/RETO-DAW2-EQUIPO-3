<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\Auditable;

class Reto extends Model
{
    use Auditable, HasFactory;
  
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
