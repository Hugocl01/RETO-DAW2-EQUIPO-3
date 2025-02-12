<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

class Seccion extends Model
{
    use Auditable;

    protected $table = 'secciones';

    // Asegura que los campos que pueden ser asignados masivamente están definidos
    protected $fillable = [
        'nombre',
        'descripcion',
    ];

    /**
     * Relación con perfiles (muchos a muchos)
     */
    public function perfiles()
    {
        return $this->belongsToMany(Perfil::class, 'perfiles_secciones');
    }
}
