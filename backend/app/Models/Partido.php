<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\Auditable;

/**
 * @OA\Schema(
 *     schema="Partido",
 *     type="object",
 *     title="Partido",
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID único del ciclo",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="equipo_local_id",
 *         type="integer",
 *         description="ID del equipo local",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="equipo_visitante_id",
 *         type="integer",
 *         description="ID del equipo visitante",
 *         example=2
 *     ),
 *     @OA\Property(
 *         property="fecha",
 *         type="string",
 *         format="date",
 *         description="Fecha del partido",
 *         example="2025-02-15"
 *     ),
 *     @OA\Property(
 *         property="tiempo",
 *         type="integer",
 *         description="Minuto del partido",
 *         example=16
 *     ),
 *     @OA\Property(
 *         property="goles_local",
 *         type="integer",
 *         description="Goles del equipo local",
 *         example=3
 *     ),
 *     @OA\Property(
 *         property="goles_visitante",
 *         type="integer",
 *         description="Goles del equipo visitante",
 *         example=2
 *     ),
 *     @OA\Property(
 *         property="pabellon_id",
 *         type="integer",
 *         description="ID del pabellón donde se juega el partido",
 *         example=101
 *     )
 * )
 */

class Partido extends Model
{
    use Auditable, HasFactory;

    protected $table = 'partidos';

    protected $fillable = [
        'equipo_local_id',
        'equipo_visitante_id',
        'fecha',
        'tiempo',
        'goles_local',
        'goles_visitante',
        'pabellon_id',
    ];

    public function equipoLocal()
    {
        return $this->belongsTo(Equipo::class, 'equipo_local_id');
    }

    public function equipoVisitante()
    {
        return $this->belongsTo(Equipo::class, 'equipo_visitante_id');
    }

    public function pabellon()
    {
        return $this->belongsTo(Pabellon::class);
    }
}
