<?php

namespace App\Models;

use App\Traits\Auditable;
use Illuminate\Database\Eloquent\Model;

class PerfilSeccion extends Model
{
    use Auditable;

    protected $table = 'perfiles_secciones';

    // Campos que se pueden asignar masivamente
    protected $fillable = [
        'perfil_id',
        'seccion_id',
    ];

    /**
     * Relación con Perfil
     */
    public function perfil()
    {
        return $this->belongsTo(Perfil::class);
    }

    /**
     * Relación con Sección
     */
    public function seccion()
    {
        return $this->belongsTo(Seccion::class);
    }
}
