<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

class Inscripcion extends Model
{
    use Auditable;

    protected $table = 'inscripciones';

    protected $fillable = [
        'comentarios',
        'equipo_id',
        'estado_id',
        'usuario_creador_id',
        'fecha_creacion',
        'usuario_modificador_id',
        'fecha_modificacion'
    ];

    public function equipo()
    {
        return $this->belongsTo(Equipo::class, 'equipo_id');
    }

    public function estado()
    {
        return $this->belongsTo(EstadoInscripcion::class, 'estado_id');
    }

}
