<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

class Pabellon extends Model
{
    use Auditable;

    protected $table = 'pabellones';

    protected $fillable = [
        'nombre',
        'direccion',
        'usuario_creador_id',
        'fecha_creacion',
        'usuario_modificador_id',
        'fecha_modificacion'
    ];

}
