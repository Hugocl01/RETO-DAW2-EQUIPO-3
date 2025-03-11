<?php

namespace Database\Seeders;

use App\Models\Equipo;
use App\Models\Partido;
use App\Enums\TipoPartido;
use Illuminate\Database\Seeder;

class PartidoSeeder extends Seeder
{
    public function run()
    {
        /*
        // En caso de hacer los equipos de manera manual, deberá seguir este modelo
        Partido::factory()->create([
            'equipo_local_id'     => 2, // ID del equipo local / primer equipo
            'equipo_visitante_id' => 1, // ID del equipo visitante / segundo equipo
            'tipo'                => \App\Enums\TipoPartido::Clasificatorio,
            'fecha'               => '2025-03-30', // Fecha en formato Y-m-d
            'duracion'            => 10,  // Minutos que durará el partido
            'pabellon_id'         => 1  // ID del pabellón donde se celebrará el partido
        ]);
*/
        $partido1 = new Partido();
        $partido1->equipo_local_id=1;
        $partido1->equipo_visitante_id=3;
        $partido1->tipo=TipoPartido::Clasificatorio;
        $partido1->fecha='2025-03-13';
        $partido1->duracion=10;
        $partido1->pabellon_id=1;
        $partido1->save();
        $partido2 = new Partido();
        $partido2->equipo_local_id=2;
        $partido2->equipo_visitante_id=8;
        $partido2->tipo=TipoPartido::Clasificatorio;
        $partido2->fecha='2025-03-13';
        $partido2->duracion=10;
        $partido2->pabellon_id=1;
        $partido2->save();
        $partido3 = new Partido();
        $partido3->equipo_local_id=7;
        $partido3->equipo_visitante_id=4;
        $partido3->tipo=TipoPartido::Clasificatorio;
        $partido3->fecha='2025-03-13';
        $partido3->duracion=10;
        $partido3->pabellon_id=1;
        $partido3->save();
        $partido4 = new Partido();
        $partido4->equipo_local_id=9;
        $partido4->equipo_visitante_id=5;
        $partido4->tipo=TipoPartido::Clasificatorio;
        $partido4->fecha='2025-03-13';
        $partido4->duracion=10;
        $partido4->pabellon_id=1;
        $partido4->save();
        $partido5 = new Partido();
        $partido5->equipo_local_id=6;
        $partido5->equipo_visitante_id=1;
        $partido5->tipo=TipoPartido::Clasificatorio;
        $partido5->fecha='2025-03-13';
        $partido5->duracion=10;
        $partido5->pabellon_id=1;
        $partido5->save();
        $partido6 = new Partido();
        $partido6->equipo_local_id=10;
        $partido6->equipo_visitante_id=2;
        $partido6->tipo=TipoPartido::Clasificatorio;
        $partido6->fecha='2025-03-13';
        $partido6->duracion=10;
        $partido6->pabellon_id=1;
        $partido6->save();
        $partido7 = new Partido();
        $partido7->equipo_local_id=3;
        $partido7->equipo_visitante_id=7;
        $partido7->tipo=TipoPartido::Clasificatorio;
        $partido7->fecha='2025-03-13';
        $partido7->duracion=10;
        $partido7->pabellon_id=1;
        $partido7->save();
        $partido8 = new Partido();
        $partido8->equipo_local_id=8;
        $partido8->equipo_visitante_id=9;
        $partido8->tipo=TipoPartido::Clasificatorio;
        $partido8->fecha='2025-03-13';
        $partido8->duracion=10;
        $partido8->pabellon_id=1;
        $partido8->save();

        $partido9 = new Partido();
        $partido9->equipo_local_id=4;
        $partido9->equipo_visitante_id=6;
        $partido9->tipo=TipoPartido::Clasificatorio;
        $partido9->fecha='2025-03-13';
        $partido9->duracion=10;
        $partido9->pabellon_id=1;
        $partido9->save();
        $partido10 = new Partido();
        $partido10->equipo_local_id=5;
        $partido10->equipo_visitante_id=10;
        $partido10->tipo=TipoPartido::Clasificatorio;
        $partido10->fecha='2025-03-13';
        $partido10->duracion=10;
        $partido10->pabellon_id=1;
        $partido10->save();
        $partido11 = new Partido();
        $partido11->equipo_local_id=1;
        $partido11->equipo_visitante_id=7;
        $partido11->tipo=TipoPartido::Clasificatorio;
        $partido11->fecha='2025-03-13';
        $partido11->duracion=10;
        $partido11->pabellon_id=1;
        $partido11->save();
        $partido12 = new Partido();
        $partido12->equipo_local_id=2;
        $partido12->equipo_visitante_id=9;
        $partido12->tipo=TipoPartido::Clasificatorio;
        $partido12->fecha='2025-03-13';
        $partido12->duracion=10;
        $partido12->pabellon_id=1;
        $partido12->save();
        $partido13 = new Partido();
        $partido13->equipo_local_id=3;
        $partido13->equipo_visitante_id=4;
        $partido13->tipo=TipoPartido::Clasificatorio;
        $partido13->fecha='2025-03-13';
        $partido13->duracion=10;
        $partido13->pabellon_id=1;
        $partido13->save();

        $partido21 = new Partido();
        $partido21->equipo_local_id=8;
        $partido21->equipo_visitante_id=5;
        $partido21->tipo=TipoPartido::Clasificatorio;
        $partido21->fecha='2025-03-14';
        $partido21->duracion=10;
        $partido21->pabellon_id=1;
        $partido21->save();
        $partido22 = new Partido();
        $partido22->equipo_local_id=6;
        $partido22->equipo_visitante_id=3;
        $partido22->tipo=TipoPartido::Clasificatorio;
        $partido22->fecha='2025-03-14';
        $partido22->duracion=10;
        $partido22->pabellon_id=1;
        $partido22->save();
        $partido23 = new Partido();
        $partido23->equipo_local_id=10;
        $partido23->equipo_visitante_id=8;
        $partido23->tipo=TipoPartido::Clasificatorio;
        $partido23->fecha='2025-03-14';
        $partido23->duracion=10;
        $partido23->pabellon_id=1;
        $partido23->save();
        $partido24 = new Partido();
        $partido24->equipo_local_id=7;
        $partido24->equipo_visitante_id=6;
        $partido24->tipo=TipoPartido::Clasificatorio;
        $partido24->fecha='2025-03-14';
        $partido24->duracion=10;
        $partido24->pabellon_id=1;
        $partido24->save();
        $partido25 = new Partido();
        $partido25->equipo_local_id=9;
        $partido25->equipo_visitante_id=10;
        $partido25->tipo=TipoPartido::Clasificatorio;
        $partido25->fecha='2025-03-14';
        $partido25->duracion=10;
        $partido25->pabellon_id=1;
        $partido25->save();
        $partido26 = new Partido();
        $partido26->equipo_local_id=4;
        $partido26->equipo_visitante_id=1;
        $partido26->tipo=TipoPartido::Clasificatorio;
        $partido26->fecha='2025-03-14';
        $partido26->duracion=10;
        $partido26->pabellon_id=1;
        $partido26->save();
        $partido27 = new Partido();
        $partido27->equipo_local_id=5;
        $partido27->equipo_visitante_id=2;
        $partido27->tipo=TipoPartido::Clasificatorio;
        $partido27->fecha='2025-03-14';
        $partido27->duracion=10;
        $partido27->pabellon_id=1;
        $partido27->save();

        $this->command->info('tabla partidos inicializada');

/*
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
            */
    }
}
