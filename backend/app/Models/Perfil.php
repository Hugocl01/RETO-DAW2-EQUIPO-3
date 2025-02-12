<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

class Perfil extends Model
{
    use Auditable;

    protected $table = 'perfiles';

    protected $fillable = [
        'tipo',
    ];

    public function usuarios()
    {
        return $this->HasMany(Usuario::class, 'perfil_id');
    }

    /**
     * Relación con secciones (muchos a muchos)
     */
    public function secciones()
    {
        return $this->belongsToMany(Seccion::class, 'perfiles_secciones', 'perfil_id', 'seccion_id');
    }
}
