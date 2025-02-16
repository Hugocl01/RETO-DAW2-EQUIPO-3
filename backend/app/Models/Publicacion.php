<?php

namespace App\Models;

use App\Traits\Auditable;
use Illuminate\Database\Eloquent\Model;

class Publicacion extends Model
{
    use Auditable;

    protected $table = 'publicaciones';

    protected $fillable = [
        'titulo',
        'contenido',
        'publicacionable_id',
        'publicacionable_type',
        'ruta_video',
        'ruta_audio',
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
        return $this->morphMany(Imagen::class, 'imageable');
    }
}
