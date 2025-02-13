<?php

namespace Database\Factories;

use App\Models\Acta;
use App\Models\Partido;
use App\Models\Jugador;
use App\Models\Incidencia;
use Illuminate\Database\Eloquent\Factories\Factory;

class ActaFactory extends Factory
{
    protected $model = Acta::class;

    public function definition()
    {
        return [
            'partido_id' => Partido::inRandomOrder()->first()->id ?? Partido::factory(),  // Usamos un factory de Partido para asociar un partido aleatorio
            'jugador_id' => Jugador::inRandomOrder()->first()->id ?? Jugador::factory(),  // Usamos un factory de Jugador para asociar un jugador aleatorio
            'incidencia_id' => Incidencia::inRandomOrder()->first()->id ?? Incidencia::factory(),  // Usamos un factory de Incidencia para asociar una incidencia aleatoria
            'tiempo' => $this->faker->numberBetween(0, 20),
            'comentario' => $this->faker->sentence(),
            'usuario_creador_id' => 1
        ];
    }
}
