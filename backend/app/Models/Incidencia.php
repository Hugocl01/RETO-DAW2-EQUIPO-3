<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\Auditable;

class Incidencia extends Model
{
    use Auditable, HasFactory;

    protected $table = 'incidencias';

    protected $fillable = [
        'tipo',
        'usuario_creador_id',
        'fecha_creacion',
        'usuario_modificador_id',
        'fecha_modificacion'
    ];

}
