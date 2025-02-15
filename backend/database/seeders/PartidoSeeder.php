<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Equipo;
use App\Models\Partido;

class PartidoSeeder extends Seeder
{
    public function run()
    {
        // Obtener todos los equipos y agruparlos por el atributo 'grupo'
        $teamsByGroup = Equipo::all()->groupBy('grupo');

        // Recorrer cada grupo
        foreach ($teamsByGroup as $grupo => $equipos) {
            // Convertir a colección indexada para facilitar el acceso
            $equipos = $equipos->values();
            $count = $equipos->count();

            // Para cada par de equipos del mismo grupo
            for ($i = 0; $i < $count; $i++) {
                for ($j = $i + 1; $j < $count; $j++) {
                    // Crear 4 partidos para este enfrentamiento
                    for ($match = 0; $match < 1; $match++) {
                        Partido::factory()->create([
                            'equipo_local_id'     => $equipos[$i]->id,
                            'equipo_visitante_id' => $equipos[$j]->id,
                            'fecha' => now()->addDays(1),
                            'tiempo' => random_int(1,20),
                        ]);
                    }
                }
            }
        }
    }
}
