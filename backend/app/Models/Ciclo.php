<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

/**
 * @OA\Schema(
 *     schema="Ciclo",
 *     type="object",
 *     title="Ciclo",
 *     required={"nombre","familia_id"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID único del ciclo",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="nombre",
 *         type="string",
 *         description="Nombre del ciclo",
 *         example="CFGS Estética Integral y Bienestar"
 *     ),
 *     @OA\Property(
 *         property="familia_id",
 *         type="integer",
 *         description="ID de la familia a la que pertenece el ciclo",
 *         example="3"
 *     )
 * )
 */
class Ciclo extends Model
{
    use Auditable;

    protected $table = 'ciclos';

    protected $fillable = [
        'nombre',
        'familia_id'
    ];

    public function familia()
    {
        return $this->belongsTo(Familia::class, 'familia_id');
    }

    public function imagenes()
    {
        return $this->morphMany(Imagen::class, 'imagenable');
    }

    public function publicaciones()
    {
        return $this->morphMany(Publicacion::class, 'publicacionable');
    }
}
