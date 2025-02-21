<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

/**
 * @OA\Schema(
 *     schema="Incidencia",
 *     type="object",
 *     required={"tipo"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID único de la incidencia",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="tipo",
 *         type="string",
 *         description="Tipo de la incidencia",
 *         example="Accidente"
 *     )
 * )
 */
class Incidencia extends Model
{
    protected $table = 'incidencias';

    protected $fillable = [
        'tipo',
    ];

    // Un tipo de incidencia puede estar relacionado con varias actas.
    public function actas()
    {
        return $this->hasMany(Acta::class, 'incidencia_id');
    }

    public static function getLista()
    {
        return self::pluck('tipo', 'id');
    }
}
