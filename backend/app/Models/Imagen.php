<?php

namespace App\Models;

use App\Traits\Auditable;
use Illuminate\Database\Eloquent\Model;

class Imagen extends Model
{
    use Auditable;

    protected $table = 'imagenes';

    protected $fillable = [
        'nombre',
        'ruta_fichero',
        'imageable_id',
        'imageable_type',
    ];

    // Relación inversa: la imagen pertenece a "algo" (publicación, equipo, etc.)
    public function imageable()
    {
        return $this->morphTo();
    }
}
