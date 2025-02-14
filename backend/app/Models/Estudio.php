<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

/**
 * @OA\Schema(
 *     schema="Estudio",
 *     type="object",
 *     title="Estudio",
 *     required={"centro_id","ciclo_id","curso"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID único del estudio",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="centro_id",
 *         type="integer",
 *         description="ID del centro asociado al estudio",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="ciclo_id",
 *         type="integer",
 *         description="ID del ciclo asociado con el estudio",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="curso",
 *         type="integer",
 *         description="Grado del estudio",
 *         example=1
 *     )
 * )
 */
class Estudio extends Model
{
    use Auditable;

    protected $table = 'estudios';

    protected $fillable = [
        'centro_id',
        'ciclo_id',
        'curso'
    ];

    public function centro()
    {
        return $this->belongsTo(Centro::class, 'centro_id');
    }

    public function ciclo()
    {
        return $this->belongsTo(Ciclo::class, 'ciclo_id');
    }
}
