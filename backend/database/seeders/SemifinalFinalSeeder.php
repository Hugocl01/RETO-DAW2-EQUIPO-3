<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Partido;

class SemifinalFinalSeeder extends Seeder
{
    public function run()
    {
        // Obtener clasificación ordenada para Grupo A y Grupo B a partir de las vistas
        $grupoA = DB::table('clasificacion_grupo_a')->get();
        $grupoB = DB::table('clasificacion_grupo_b')->get();

        // Verificar que ambos grupos tengan al menos 2 equipos
        if ($grupoA->count() < 2 || $grupoB->count() < 2) {
            throw new \Exception("No hay suficientes equipos en alguno de los grupos para continuar con el torneo.");
        }

        // Extraer equipos para semifinales (ya están ordenados)
        $primerA  = $grupoA->first();
        $segundoA = $grupoA->get(1);
        $primerB  = $grupoB->first();
        $segundoB = $grupoB->get(1);

        // Crear partidos de semifinal (tipo 'semifinal')
        $semifinal1 = Partido::factory()->create([
            'equipo_local_id'     => $primerA->equipo_id,
            'equipo_visitante_id' => $segundoB->equipo_id,
            'fecha'               => now()->addDays(2),
            'duracion'            => 20,
            'tipo'                => 'semifinal',
        ]);

        $semifinal2 = Partido::factory()->create([
            'equipo_local_id'     => $primerB->equipo_id,
            'equipo_visitante_id' => $segundoA->equipo_id,
            'fecha'               => now()->addDays(2),
            'duracion'            => 20,
            'tipo'                => 'semifinal',
        ]);

        if ($semifinal1->goles_local > $semifinal1->goles_visitante) {
            $ganador = $semifinal1->equipo_local_id;
        } else {
            $ganador = $semifinal1->equipo_visitante_id;
        }

        if ($semifinal2->goles_local > $semifinal2->goles_visitante) {
            $ganador2 = $semifinal2->equipo_local_id;
        } else {
            $ganador2 = $semifinal2->equipo_visitante_id;
        }

        // Crear el partido de final (tipo 'final')
        if ($ganador && $ganador2) {
            Partido::factory()->create([
                'equipo_local_id'     => $ganador,
                'equipo_visitante_id' => $ganador2,
                'fecha'               => now()->addDays(2),
                'duracion'            => 20,
                'tipo'                => 'final',
            ]);
        } else {
            throw new \Exception("No se han definido los ganadores de las semifinales.");
        }
    }
}
