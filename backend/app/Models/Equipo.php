<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use App\Traits\Auditable;
use App\Traits\HasSlug;

/**
 * @OA\Schema(
 *     schema="Equipo",
 *     title="Equipo",
 *     description="Modelo de equipo",
 *     @OA\Property(property="id", type="integer", description="ID único del equipo"),
 *     @OA\Property(property="nombre", type="string", description="Nombre del equipo"),
 *     @OA\Property(property="centro_id", type="integer", description="ID del centro"),
 *     @OA\Property(property="grupo", type="string", description="Grupo del equipo"),
 *     @OA\Property(property="usuario_id", type="integer", description="ID del entrenador"),
 *     @OA\Property(property="activo", type="boolean", description="Si el equipo está activo"),
 *     @OA\Property(
 *         property="stats",
 *         type="object",
 *         @OA\Property(property="goles", type="integer", description="Total de goles"),
 *         @OA\Property(property="tarjetas_amarillas", type="integer", description="Total de tarjetas amarillas"),
 *         @OA\Property(property="tarjetas_rojas", type="integer", description="Total de tarjetas rojas"),
 *         @OA\Property(property="faltas", type="integer", description="Total de faltas")
 *     )
 * )
 */
class Equipo extends Model
{
    use HasFactory, Auditable, HasSlug;

    protected $slugSource = 'nombre';

    protected $table = 'equipos';

    protected $fillable = [
        'nombre',
        'centro_id',
        'grupo',
        'usuario_id',
        'activo'
    ];

    public function centro()
    {
        return $this->belongsTo(Centro::class, 'centro_id');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id', 'id'); // o el modelo que represente al entrenador
    }

    public function jugadores()
    {
        return $this->hasMany(Jugador::class);
    }

    public function inscripcion()
    {
        return $this->hasOne(Inscripcion::class);
    }

    public function imagenes()
    {
        return $this->morphMany(Imagen::class, 'imagenable');
    }

    public function publicaciones()
    {
        return $this->morphMany(Publicacion::class, 'publicacionable');
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function statsEquipo(): array
    {
        // Obtener todos los jugadores del equipo
        $jugadores = $this->jugadores;

        // Inicializar contadores
        $totalGoles = 0;
        $totalTarjetasAmarillas = 0;
        $totalTarjetasRojas = 0;
        $totalFaltas = 0;

        // Recorrer cada jugador y sumar sus estadísticas
        foreach ($jugadores as $jugador) {
            $stats = $jugador->statsJugador();
            $totalGoles += $stats['goles'];
            $totalTarjetasAmarillas += $stats['tarjetas_amarillas'];
            $totalTarjetasRojas += $stats['tarjetas_rojas'];
            $totalFaltas += $stats['faltas'];
        }

        return [
            'goles'             => $totalGoles,
            'tarjetas_amarillas' => $totalTarjetasAmarillas,
            'tarjetas_rojas'     => $totalTarjetasRojas,
            'faltas'             => $totalFaltas,
        ];
    }

    public static function getLista(?string $tipo_partido = null, ?int $equipo_id = null, ?string $grupo = null): ?Collection
    {
        // Si el partido no es "Clasificatorio", la lógica no aplica.
        if ($tipo_partido !== 'Clasificatorio') {
            return null;
        }

        // Validar que, si se provee un grupo, éste sea 'A' o 'B'.
        if ($grupo && !in_array($grupo, ['A', 'B'])) {
            return collect(); // Retorna colección vacía si el grupo no es válido.
        }

        // Inicializamos la consulta para obtener equipos.
        $query = self::query()
            ->select('id', 'nombre')
            ->orderBy('nombre'); // Ordenamos por nombre (puedes ajustar el orden si es necesario).

        // Si se especifica un grupo, filtramos por él.
        if ($grupo) {
            $query->where('grupo', $grupo);
        }

        // Si se pasa un equipo base (por ejemplo, el equipo local seleccionado):
        if ($equipo_id) {
            // Obtenemos el grupo del equipo base.
            $grupoEquipo = self::where('id', $equipo_id)->value('grupo');

            // Si se pasó un grupo por parámetro, debe coincidir con el grupo del equipo base.
            if ($grupo && $grupo !== $grupoEquipo) {
                return collect(); // No hay coincidencia de grupos, retorna colección vacía.
            }

            // Filtramos para obtener equipos del mismo grupo que:
            // - No sean el equipo base.
            // - No hayan jugado ya contra el equipo base.
            $query->where('grupo', $grupoEquipo)
                ->where('id', '!=', $equipo_id)
                ->whereNotExists(function ($sub) use ($equipo_id) {
                    $sub->select(DB::raw(1))
                        ->from('partidos')
                        ->whereRaw(
                            '(equipo_local_id = ? AND equipo_visitante_id = equipos.id) OR (equipo_visitante_id = ? AND equipo_local_id = equipos.id)',
                            [$equipo_id, $equipo_id]
                        );
                });
        } else {
            // Si no se especifica un equipo base, buscamos equipos que hayan jugado menos de 4 partidos clasificatorios.
            $query->whereRaw(
                "(SELECT COUNT(*) FROM partidos AS p
                  WHERE p.tipo = 'Clasificatorio'
                    AND (p.equipo_local_id = equipos.id OR p.equipo_visitante_id = equipos.id)
                ) < 4"
            );
        }

        // Retornamos la colección con los equipos, pluckeando 'nombre' y 'id' para formar los selectores.
        return $query->pluck('nombre', 'id');
    }
}
