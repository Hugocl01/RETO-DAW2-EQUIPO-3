<?php

namespace App\Models;

use App\Traits\Auditable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="Publicacion",
 *     type="object",
 *     required={"id", "titulo", "contenido", "publicacionable_id", "publicacionable_type"},
 *     @OA\Property(property="id", type="integer", description="ID de la publicación"),
 *     @OA\Property(property="titulo", type="string", description="Título de la publicación"),
 *     @OA\Property(property="contenido", type="string", description="Contenido de la publicación"),
 *     @OA\Property(property="portada", type="string", description="Indica si la publicación tiene portada (Si/No)"),
 *     @OA\Property(property="publicacionable_type", type="string", description="Tipo de modelo relacionado con la publicación (Equipo, Partido, etc.)"),
 *     @OA\Property(property="publicacionable_id", type="integer", description="ID del modelo relacionado con la publicación"),
 *     @OA\Property(
 *         property="imagenes",
 *         type="array",
 *         @OA\Items(type="string", description="URLs de las imágenes relacionadas con la publicación")
 *     )
 * )
 */
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
