<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\Auditable;
use App\Traits\HasSlug;
use Illuminate\Support\Str;

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
 *         property="duracion",
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
    use Auditable, HasFactory, HasSlug;

    protected $casts = [
        'tipo' => \App\Enums\TipoPartido::class,
    ];

    protected $table = 'partidos';

    protected $fillable = [
        'equipo_local_id',
        'equipo_visitante_id',
        'fecha',
        'duracion',
        'goles_local',
        'goles_visitante',
        'pabellon_id',
        'tipo'
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

    public function actas()
    {
        return $this->hasMany(Acta::class);
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

    protected function generateSlug()
    {
        if (empty($this->attributes['slug'])) {
            $fecha = $this->fecha
                ? \Carbon\Carbon::parse($this->fecha)->format('Y-m-d')
                : now()->format('Y-m-d');
            // Verificamos si las relaciones están cargadas para evitar consultas innecesarias
            $nombreEquipoLocal = $this->equipoLocal->nombre ?? 'local';
            $nombreEquipoVisitante = $this->equipoVisitante->nombre ?? 'visitante';

            // Concatenamos los valores para formar la base del slug
            $base = "{$fecha}-{$nombreEquipoLocal}-{$nombreEquipoVisitante}";

            // Generamos el slug
            $slug = Str::slug($base, '-');

            // Asignamos el slug de forma única
            $this->attributes['slug'] = $this->makeSlugUnique($slug);
        }
    }

    public function calcularGanador()
    {
        // Capturamos los IDs de los equipos para usarlos dentro de los closures
        $equipoLocalId = $this->equipo_local_id;
        $equipoVisitanteId = $this->equipo_visitante_id;

        // Contar goles para el equipo local (actas donde incidencia_id = 1)
        $golesLocal = $this->actas()
            ->where('incidencia_id', 1)
            ->whereHas('jugador', function ($query) use ($equipoLocalId) {
                $query->where('equipo_id', $equipoLocalId);
            })->count();

        // Contar goles para el equipo visitante (actas donde incidencia_id = 1)
        $golesVisitante = $this->actas()
            ->where('incidencia_id', 1)
            ->whereHas('jugador', function ($query) use ($equipoVisitanteId) {
                $query->where('equipo_id', $equipoVisitanteId);
            })->count();

        if ($golesLocal > $golesVisitante) {
            return $equipoLocalId;
        } elseif ($golesVisitante > $golesLocal) {
            return $equipoVisitanteId;
        } else {
            return null; // En caso de empate
        }
    }

    public static function getLista()
    {
        return array_map(
            fn(\App\Enums\TipoPartido $tipo) => $tipo->value,
            \App\Enums\TipoPartido::cases()
        );
    }

    public static function comprobarFinalFase(\App\Enums\TipoPartido $tipo_partido)
    {
        // $partidosSinFinal es la colección de partidos clasificatorios que NO tienen acta con la incidencia 'Final de partido'
        $partidosSinFinal = Partido::where('tipo_partido', $tipo_partido)
            ->whereDoesntHave('actas', function ($actasQuery) {
                $actasQuery->whereHas('incidencia', function ($incidenciaQuery) {
                    $incidenciaQuery->where('tipo', 'Final de partido');
                });
            })
            ->get();

        // Si $partidosSinFinal->isEmpty(), significa que NO hay partidos sin 'Final de partido',
        // es decir, se termino la fase de grupos.
        if ($partidosSinFinal->isEmpty()) {
            return true;
        } else {
            // Faltan partidos por terminar
            return false;
        }
    }


    public static function generarPartidosGrupos($fecha, $equipos)
    {
        // Agrupar equipos por grupo
        $equiposPorGrupo = $equipos->groupBy('grupo');

        // 3. Para cada grupo, generamos los partidos
        foreach ($equiposPorGrupo as $grupo => $listaEquipos) {
            // Convertir la lista a un array para facilitar el bucle
            $listaEquipos = $listaEquipos->values()->all();

            // 4. Recorremos la lista con bucles anidados para emparejar cada equipo con el resto
            for ($i = 0; $i < count($listaEquipos); $i++) {
                for ($j = $i + 1; $j < count($listaEquipos); $j++) {
                    $equipoLocal = $listaEquipos[$i];
                    $equipoVisitante = $listaEquipos[$j];

                    // 5. Crear el partido en la BD (ajusta los campos según tu tabla 'partidos')
                    Partido::create([
                        'equipo_local_id' => $equipoLocal->id,
                        'equipo_visitante_id' => $equipoVisitante->id,
                        'fecha' => $fecha,
                        'tipo_partido' => \App\Enums\TipoPartido::Clasificatorio,
                        'duracion' => 10
                    ]);
                }
            }
        }
    }

    public static function generarSemifinal()
    {
        $grupoA = DB::table('clasificacion_grupo_a')->get();
        $grupoB = DB::table('clasificacion_grupo_b')->get();

        $primerA  = $grupoA->first();
        $segundoA = $grupoA->get(1);
        $primerB  = $grupoB->first();
        $segundoB = $grupoB->get(1);

        Partido::create([
            'equipo_local_id'     => $primerA->equipo_id,
            'equipo_visitante_id' => $segundoB->equipo_id,
            'fecha'               => now()->addDays(1),
            'duracion'            => 20,
            'tipo_partido'        => \App\Enums\TipoPartido::Semifinal,
        ]);

        Partido::create([
            'equipo_local_id'     => $primerB->equipo_id,
            'equipo_visitante_id' => $segundoA->equipo_id,
            'fecha'               => now()->addDays(1),
            'duracion'            => 20,
            'tipo_partido'        => \App\Enums\TipoPartido::Semifinal,
        ]);
    }

    public static function generarFinal()
    {
        $partidos = Partido::where('tipo_partido', \App\Enums\TipoPartido::Semifinal)
            ->get();

        $ganadoresIds = [];

        foreach ($partidos as $partido) {
            // Supongamos que tienes campos goles_local y goles_visitante
            if ($partido->goles_local > $partido->goles_visitante) {
                // Gana el equipo local
                $ganadoresIds[] = $partido->equipo_local_id;
            } elseif ($partido->goles_visitante > $partido->goles_local) {
                // Gana el equipo visitante
                $ganadoresIds[] = $partido->equipo_visitante_id;
            }
        }

        Partido::create([
            'equipo_local_id'     => $ganadoresIds[0],
            'equipo_visitante_id' => $ganadoresIds[1],
            'fecha'               => now()->addDays(1),
            'duracion'            => 20,
            'tipo_partido'        => \App\Enums\TipoPartido::Final,
        ]);
    }
}
