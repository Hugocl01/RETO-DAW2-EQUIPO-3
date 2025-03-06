<?php

namespace App\Models;

use App\Traits\Auditable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publicacion extends Model
{
    use Auditable, HasFactory;

    protected $table = 'publicaciones';

    protected $fillable = [
        'titulo',
        'contenido',
        'publicacionable_id',
        'publicacionable_type',
        'portada',
    ];

    // Relación inversa: "pertenezco a algo" (equipo, reto, etc.)
    public function publicacionable()
    {
        return $this->morphTo();
    }

    // Si cada publicacion tiene sus imágenes
    public function imagenes()
    {
        return $this->morphMany(Imagen::class, 'imagenable');
    }

    /**
     * Retorna una lista con los tipos de modelos (clases) asociados a las publicaciones.
     *
     * @return \Illuminate\Support\Collection
     */
    public static function getLista()
    {
        return self::query()
            ->select('publicacionable_type')
            ->distinct()
            ->pluck('publicacionable_type');
    }
}
