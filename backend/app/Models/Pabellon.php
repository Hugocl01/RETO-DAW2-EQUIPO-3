<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\Auditable;

/**
 * @OA\Schema(
 *     schema="Pabellon",
 *     type="object",
 *     title="Pabellon",
 *     description="Modelo de Pabellón",
 *     required={"nombre", "direccion"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID del pabellón",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="nombre",
 *         type="string",
 *         description="Nombre del pabellón",
 *         example="Pabellón Deportivo Central"
 *     ),
 *     @OA\Property(
 *         property="direccion",
 *         type="string",
 *         description="Dirección del pabellón",
 *         example="Calle Principal 123, Ciudad"
 *     )
 * )
 */
class Pabellon extends Model
{
    use Auditable, HasFactory;

    protected $table = 'pabellones';

    protected $fillable = [
        'nombre',
        'direccion',
    ];

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
