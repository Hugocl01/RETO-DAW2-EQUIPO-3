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

    public static function asignarGruposAleatoriamente()
    {
        // 1. Obtenemos los equipos con estado_inscripcion = 3 (o el nombre que uses)
        $equipos = Equipo::whereHas('inscripcion', function ($query) {
            $query->where('estado_id', 3);
        })->get();

        // 2. Barajamos aleatoriamente la colección
        $equiposBarajados = $equipos->shuffle();

        // 3. Dividimos en dos mitades
        //    Si la cantidad es impar, la segunda mitad tendrá un equipo más.
        $total = $equiposBarajados->count();
        $mitad = (int) floor($total / 2);

        $grupoA = $equiposBarajados->slice(0, $mitad);
        $grupoB = $equiposBarajados->slice($mitad);

        // 4. Asignamos a cada mitad su grupo (A o B)
        foreach ($grupoA as $equipo) {
            $equipo->grupo = 'A';
            $equipo->save();
        }
        foreach ($grupoB as $equipo) {
            $equipo->grupo = 'B';
            $equipo->save();
        }
    }

    public static function getLista()
    {
        return self::pluck('nombre', 'id');
    }
}
