<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\Auditable;

/**
 * @OA\Schema(
 *     schema="Inscripcion",
 *     type="object",
 *     title="Inscripcion",
 *     required={"comentarios","equipo_id","estado_id"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID único de la inscripcion",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="comentarios",
 *         type="string",
 *         description="Contenido adicional de la inscripcion",
 *         example="Componentes con gran posibilidad de aceptacion"
 *     ),
 *     @OA\Property(
 *         property="equipo_id",
 *         type="integer",
 *         description="ID del equipo asociado a la inscripcion",
 *         example="3"
 *     ),
 *     @OA\Property(
 *         property="estado_id",
 *         type="integer",
 *         description="ID del estado de la inscripcion",
 *         example="3"
 *     )
 * )
 */
class Inscripcion extends Model
{
    use Auditable, HasFactory;

    protected $table = 'inscripciones';

    protected $fillable = [
        'comentarios',
        'equipo_id',
        'estado_id',
    ];

    public function equipo()
    {
        return $this->belongsTo(Equipo::class, 'equipo_id');
    }

    public function estado()
    {
        return $this->belongsTo(EstadoInscripcion::class, 'estado_id');
    }

}
