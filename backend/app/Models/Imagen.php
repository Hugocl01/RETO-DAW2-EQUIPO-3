<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * @OA\Schema(
 *     schema="Imagen",
 *     title="Imagen",
 *     description="Modelo de Imagen",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="nombre", type="string", example="imagen1.png"),
 *     @OA\Property(property="ruta", type="string", example="uploads/patrocinadores/imagen1.png"),
 *     @OA\Property(property="imagenable_id", type="integer", example=3),
 *     @OA\Property(property="imagenable_type", type="string", example="App\\Models\\Patrocinador"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
class Imagen extends Model
{
    use HasFactory;

    protected $table = 'imagenes';

    protected $fillable = ['nombre', 'ruta', 'imagenable_id', 'imagenable_type'];

    /**
     * Relación polimórfica con otros modelos.
     *
     * @return MorphTo
     */
    public function imagenable(): MorphTo
    {
        return $this->morphTo();
    }
}
