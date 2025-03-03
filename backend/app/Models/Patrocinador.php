<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\Auditable;

/**
 * @OA\Schema(
 *     schema="Patrocinador",
 *     type="object",
 *     title="Patrocinador",
 *     description="Modelo de Patrocinador",
 *     required={"nombre", "landing_page"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID del patrocinador",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="nombre",
 *         type="string",
 *         description="Nombre del patrocinador",
 *         example="Empresa XYZ"
 *     ),
 *     @OA\Property(
 *         property="landing_page",
 *         type="string",
 *         format="url",
 *         description="URL de la landing page del patrocinador",
 *         example="https://www.ejemplo.com"
 *     )
 * )
 */
class Patrocinador extends Model
{
    use Auditable, HasFactory;

    protected $table = 'patrocinadores';

    protected $fillable = [
        'nombre',
        'landing_page'
    ];

    public function imagen()
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
