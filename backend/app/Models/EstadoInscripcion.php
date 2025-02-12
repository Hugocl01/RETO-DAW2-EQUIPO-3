<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

class EstadoInscripcion extends Model
{
    use Auditable;

    protected $table = 'estado_inscripciones';

    protected $fillable = [
        'estado'
    ];

}
