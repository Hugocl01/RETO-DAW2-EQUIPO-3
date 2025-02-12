<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\Auditable;

class Jugador extends Model
{
    use Auditable, HasFactory;

    protected $table = 'jugadores';

    protected $fillable = [
        'equipo_id',
        'nombre_completo',
        'capitan',
        'estudio_id',
        'dni',
        'email',
        'telefono',
        'usuario_creador_id',
        'fecha_creacion',
        'usuario_modificador_id',
        'fecha_modificacion'
    ];

    public function equipo()
    {
        return $this->belongsTo(Equipo::class, 'equipo_id');
    }

    public function estudio()
    {
        return $this->belongsTo(Estudio::class, 'estudio_id');
    }

}
