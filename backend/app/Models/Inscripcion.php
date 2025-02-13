<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\Auditable;

class Inscripcion extends Model
{
    use Auditable, HasFactory;

    protected $table = 'inscripciones';

    protected $fillable = [
        'comentarios',
        'equipo_id',
        'estado_id',
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
