<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Traits\Auditable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{

    use HasApiTokens, Auditable;

    protected $table = 'usuarios';

    protected $fillable = [
        'nombre_completo',
        'email',
        'perfil_id',
        'activo',
        'usuario_creador_id',
        'usuario_modificador_id',
        'fecha_creacion',
        'fecha_modificacion',
    ];

    public function perfil()
    {
        return $this->belongsTo(Perfil::class, 'perfil_id');
    }

}
