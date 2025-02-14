<?php

namespace Database\Factories;

use App\Models\Equipo;
use App\Models\Jugador;
use Illuminate\Database\Eloquent\Factories\Factory;

class EquipoFactory extends Factory
{
    protected $model = Equipo::class;

    public function definition()
    {
        return [
            'nombre' => $this->faker->word(),
            'centro_id' => 2,
            'grupo' => $this->faker->randomElement(['A', 'B']),
            'usuario_id' => 2
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Equipo $equipo) {
            Jugador::factory()->count(10)->create([
                'equipo_id' => $equipo->id
            ]);
        });
    }
}
