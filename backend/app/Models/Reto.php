<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\Auditable;

/**
 * @OA\Schema(
 *     schema="Reto",
 *     type="object",
 *     title="Reto",
 *     required={"titulo","texto","estudio_id"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID único del reto",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="titulo",
 *         type="string",
 *         description="Titulo del reto",
 *         example="Primer gol del torneo"
 *     ),
 *     @OA\Property(
 *         property="texto",
 *         type="string",
 *         description="Contenido del reto",
 *         example="Empezando todos los partidos a la vez el equipo que marque el primer gol gana el reto"
 *     ),
 *     @OA\Property(
 *         property="estudio_id",
 *         type="string",
 *         description="ID relacionado con el estudio asociado al reto",
 *         example="3"
 *     )
 * )
 */
class Reto extends Model
{
    use Auditable, HasFactory;

    protected $table = 'retos';

    protected $fillable = [
        'titulo',
        'texto',
        'estudio_id',
    ];

    public function estudio()
    {
        return $this->belongsTo(Estudio::class);
    }

    public function imagenes()
    {
        return $this->morphMany(Imagen::class, 'imagenable');
    }

    public function publicaciones()
    {
        return $this->morphMany(Publicacion::class, 'publicacionable');
    }

    public static function getLista()
    {
        return self::pluck('titulo', 'id');
    }
}
