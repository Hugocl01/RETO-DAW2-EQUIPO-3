<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;
use Illuminate\Database\Eloquent\Factories\HasFactory;


/**
 * @OA\Schema(
 *     schema="Donacion",
 *     type="object",
 *     title="Donacion",
 *     required={"ong_id"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID único de la donacion",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="ong_id",
 *         type="integer",
 *         description="ID relacionado a la ong asociada",
 *         example="2"
 *     ),
 *     @OA\Property(
 *         property="kilos",
 *         type="integer",
 *         description="Numero entero de los kilos",
 *         example="36"
 *     ),
 *     @OA\Property(
 *         property="importe",
 *         type="double",
 *         description="Importe total de la donacion",
 *         example="23.96"
 *     )
 * )
 */
class Donacion extends Model
{
    use HasFactory, Auditable;
    protected $table = 'donaciones';
    protected $fillable = [
        'ong_id',
        'kilos',
        'importe',
    ];

    public function ong()
    {
        return $this->belongsTo(Ong::class);
    }

    public function publicaciones()
    {
        return $this->morphMany(Publicacion::class, 'publicacionable');
    }
}
