<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

class Ong extends Model
{
    use Auditable;

    protected $table = 'ongs';

    protected $fillable = [
        'nombre',
        'landing_page',
        'usuario_creador_id',
        'usuario_modificador_id',
        'fecha_creacion',
        'fecha_modificacion',
    ];

    public function donacion()
    {
        return $this->hasMany(Donacion::class);
    }

}
