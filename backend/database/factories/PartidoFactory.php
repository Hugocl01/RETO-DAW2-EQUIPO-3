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
            'pabellon_id' => 1,
            'fecha' => $this->faker->date(),
            'duracion' => $this->faker->numberBetween(0, 20),
            'goles_local' => $this->faker->numberBetween(0, 5),
            'goles_visitante' => $this->faker->numberBetween(0, 5),
            'usuario_creador_id' => 1
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Partido $partido) {
            // (1) Crear acta de inicio
            Acta::factory()->create([
                'jugador_id'    =>null,
                'partido_id'    => $partido->id,
                'incidencia_id' => 13, // ejemplo de ID para "Inicio"
                'minuto'        => 0,
                'comentario'    => 'Inicio del partido'
            ]);

            // (2) Obtener jugadores de ambos equipos
            $jugadoresLocal = $partido->equipoLocal->jugadores;
            $jugadoresVisitante = $partido->equipoVisitante->jugadores;

            // Mezclar en una sola colección
            $jugadoresPartido = $jugadoresLocal->merge($jugadoresVisitante);

            // (3) Generar varias actas "random"
            for ($i = 0; $i < 8; $i++) {
                // Incidencia aleatoria (1 = gol, 2 = amarilla, etc.)
                $incidenciaId = $this->faker->numberBetween(1, 4);

                // Jugador aleatorio del partido
                $jugador = $jugadoresPartido->random();

                // Crear el acta
                Acta::factory()->create([
                    'partido_id'    => $partido->id,
                    'incidencia_id' => $incidenciaId,
                    'minuto'        => $this->faker->numberBetween(1, $partido->duracion - 1),
                    'comentario'    => $this->faker->sentence(),
                    'jugador_id'    => $jugador->id,
                ]);

                // (4) Si la incidencia es "gol", actualizar goles_local o goles_visitante
                if ($incidenciaId === 1) { // 1 => gol
                    if ($jugadoresLocal->contains($jugador)) {
                        $partido->increment('goles_local');
                    } else {
                        $partido->increment('goles_visitante');
                    }
                }
            }

            // (5) Crear acta de final
            Acta::factory()->create([
                'jugador_id'    =>null,
                'partido_id'    => $partido->id,
                'incidencia_id' => 14, // ejemplo de ID para "Fin"
                'minuto'        => $partido->duracion,
                'comentario'    => 'Final del partido'
            ]);
        });
    }
}
