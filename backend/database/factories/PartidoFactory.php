<?php

namespace Database\Factories;

use App\Models\Partido;
use App\Models\Equipo;
use App\Models\Pabellon;
use App\Models\Acta;
use App\Models\Jugador;
use App\Models\Incidencia;
use Illuminate\Database\Eloquent\Factories\Factory;

class PartidoFactory extends Factory
{
    protected $model = Partido::class;

    public function definition()
    {
        return [
            'equipo_local_id' => Equipo::inRandomOrder()->first()->id ?? Equipo::factory(),
            'equipo_visitante_id' => Equipo::inRandomOrder()->first()->id ?? Equipo::factory(),
            'fecha' => $this->faker->date(),
            'duracion' => $this->faker->numberBetween(0, 20),
            'goles_local' => $this->faker->numberBetween(0, 5),
            'goles_visitante' => $this->faker->numberBetween(0, 5),
            'pabellon_id' => Pabellon::inRandomOrder()->first()->id ?? Pabellon::factory(),
            'usuario_creador_id' => 1
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Partido $partido) {
            // Acta de inicio del partido (Incidencia ID 13)
            Acta::factory()->create([
                'partido_id' => $partido->id,
                'incidencia_id' => 13,
                'minuto' => 0,
                'comentario' => 'Inicio del partido'
            ]);

            // 8 actas con incidencias aleatorias
            for ($i = 0; $i < 8; $i++) {
                Acta::factory()->create([
                    'partido_id' => $partido->id,
                    'incidencia_id' => $this->faker->numberBetween(1, 4), // Incidencias 1 a 12
                    'minuto' => $this->faker->numberBetween(1, 19),
                    'comentario' => $this->faker->sentence(),
                    'jugador_id' => Jugador::inRandomOrder()->first()->id ?? Jugador::factory()
                ]);
            }

            // Acta de final del partido (Incidencia ID 14)
            Acta::factory()->create([
                'partido_id' => $partido->id,
                'incidencia_id' => 14,
                'minuto' => 20,
                'comentario' => 'Final del partido'
            ]);
        });
    }
}
