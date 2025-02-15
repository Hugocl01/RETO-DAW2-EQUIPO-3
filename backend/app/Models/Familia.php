<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;

/**
 * @OA\Schema(
 *     schema="Familia",
 *     type="object",
 *     title="Familia",
 *     required={"nombre"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID único de la familia",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="nombre",
 *         type="string",
 *         description="Nombre de la familia",
 *         example="CFGS Estética Integral y Bienestar"
 *     ),
 * )
 */
class Familia extends Model
{
    use Auditable;

    protected $table = 'familias';

    protected $fillable = [
        'nombre',
    ];

    public function ciclos()
    {
        $this->hasMany(Ciclo::class, 'familia_id');
    }

}
