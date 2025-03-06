<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Auditable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @OA\Schema(
 *     schema="Acta",
 *     title="Acta",
 *     description="Modelo de Acta",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="partido_id", type="integer", example=10),
 *     @OA\Property(property="jugador_id", type="integer", example=5),
 *     @OA\Property(property="incidencia_id", type="integer", example=2),
 *     @OA\Property(property="minuto", type="integer", example=45),
 *     @OA\Property(property="comentario", type="string", example="Gol de cabeza después de un córner"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
class Acta extends Model
{
    use Auditable, HasFactory;

    protected $table = 'actas';

    protected $fillable = [
        'partido_id',
        'jugador_id',
        'incidencia_id',
        'minuto',
        'comentario',
    ];

    // Relaciones
    public function partido()
    {
        return $this->belongsTo(Partido::class, 'partido_id');
    }

    public function jugador()
    {
        return $this->belongsTo(Jugador::class, 'jugador_id');
    }

    public function incidencia()
    {
        return $this->belongsTo(Incidencia::class, 'incidencia_id');
    }
}
