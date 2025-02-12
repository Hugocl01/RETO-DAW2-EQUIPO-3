<?php

namespace Database\Factories;

use App\Models\Equipo;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Equipo>
 */
class EquipoFactory extends Factory
{
    protected $model = Equipo::class; // Asocia el Factory con el modelo Equipo

    public function definition()
    {
        return [
            'nombre' => $this->faker->word(), // Genera un nombre aleatorio
            'centro_id' => 2, // Asigna un centro_id aleatorio (asumiendo que hay un modelo Centro)
            'grupo' => $this->faker->randomElement(['A', 'B']), // Selecciona una letra aleatoria para grupo
            'usuario_id' => 2
        ];
    }
}
