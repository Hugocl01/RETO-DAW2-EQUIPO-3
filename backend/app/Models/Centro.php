<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

/**
 * @OA\Schema(
 *     schema="Centro",
 *     type="object",
 *     title="Centro",
 *     required={"nombre"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID único del centro",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="nombre",
 *         type="string",
 *         description="Nombre del centro",
 *         example="Centro de Salud A"
 *     ),
 *     @OA\Property(
 *         property="landing_page",
 *         type="string",
 *         description="URL de la página de aterrizaje del centro",
 *         example="https://centrosaluda.com"
 *     )
 * )
 */
class Centro extends Model
{
    use Auditable;

    protected $table = 'centros';

    protected $fillable = [
        'nombre',
        'landing_page'
    ];

    public function estudios()
    {
        return $this->hasMany(Estudio::class, 'centro_id');
    }

    public function equipos()
    {
        return $this->hasMany(Equipo::class, 'centro_id');
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
        return self::pluck('nombre', 'id');
    }
}
