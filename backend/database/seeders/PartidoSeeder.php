<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Equipo;
use App\Models\Partido;

class PartidoSeeder extends Seeder
{
    public function run()
    {
        // 1) Obtiene todos los equipos y los agrupa por 'grupo'
        $teamsByGroup = Equipo::all()->groupBy('grupo');

        // 2) Recorre cada grupo
        foreach ($teamsByGroup as $grupo => $equipos) {

            // 3) Vuelve la colección indexada
            $equipos = $equipos->values();
            $count = $equipos->count();

            // 4) Para cada par de equipos del mismo grupo...
            for ($i = 0; $i < $count; $i++) {
                for ($j = $i + 1; $j < $count; $j++) {

                    // 5) Crea "N" partidos para el emparejamiento
                    //    (por ahora 1, pero podrías poner 4 si lo necesitas).
                    for ($match = 0; $match < 1; $match++) {
                        Partido::factory()->create([
                            'equipo_local_id'     => $equipos[$i]->id,
                            'equipo_visitante_id' => $equipos[$j]->id,
                            'fecha'               => now()->addDays(1)->format('Y-m-d'),
                            'duracion'            => 10,
                            'pabellon_id'         => 1
                        ]);
                    }
                }
            }
        }
    }
}
