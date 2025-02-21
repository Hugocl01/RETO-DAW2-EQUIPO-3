<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\Auditable;
use App\Traits\HasSlug;

/**
 * @OA\Schema(
 *     schema="Jugador",
 *     type="object",
 *     title="Jugador",
 *     required={"equipo_id","nombre_completo","capitan"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID único del ciclo",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="equipo_id",
 *         type="integer",
 *         description="ID relacionado con el equipo del jugador",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="nombre_completo",
 *         type="string",
 *         description="Nombre completo del jugador",
 *         example="Rodolfo Abascal De la Guerra"
 *     ),
 *     @OA\Property(
 *         property="capitan",
 *         type="boolean",
 *         description="Campo para saber quien es el capitan del equipo",
 *         example="true"
 *     )
 * )
 */
class Jugador extends Model
{
    use Auditable, HasFactory, HasSlug;

    // Indico qué campo usar para generar el slug
    protected $slugSource = 'nombre_completo';

    protected $table = 'jugadores';

    protected $fillable = [
        'equipo_id',
        'nombre_completo',
        'capitan',
        'estudio_id',
        'dni',
        'email',
        'telefono',
        'activo',
    ];

    // Relationship with Equipo
    public function equipo()
    {
        return $this->belongsTo(Equipo::class, 'equipo_id');
    }

    // Relationship with Estudio
    public function estudio()
    {
        return $this->belongsTo(Estudio::class, 'estudio_id');
    }

    public function actas()
    {
        return $this->hasMany(Acta::class, 'jugador_id');
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function imagenes()
    {
        return $this->morphMany(Imagen::class, 'imagenable');
    }

    public function publicaciones()
    {
        return $this->morphMany(Publicacion::class, 'publicacionable');
    }

    // Custom method to compute stats for the player
    public function statsJugador(): array
    {
        // Load actas with their associated incidencia to avoid N+1 issues

        $goles = $this->actas()->where('incidencia_id', 1)->count();
        $tarjetas_amarillas = $this->actas()->where('incidencia_id', 3)->count();
        $tarjetas_rojas = $this->actas()->where('incidencia_id', 4)->count();
        $faltas = $this->actas()->where('incidencia_id', 8)->count();

        return [
            'goles'             => $goles,
            'tarjetas_amarillas' => $tarjetas_amarillas,
            'tarjetas_rojas'     => $tarjetas_rojas,
            'faltas'             => $faltas,
        ];
    }
    public static function getLista()
    {
        return self::all()->mapWithKeys(function ($item) {
            return [$item->id => ['nombre' => $item->nombre_completo, 'equipo' => $item->equipo_id]];
        });
    }
}
