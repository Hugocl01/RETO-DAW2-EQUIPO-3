<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Pabellon;

class PabellonFactory extends Factory
{
    protected $model = Pabellon::class;

    public function definition()
    {
        return [
            'nombre' => $this->faker->word(),
            'direccion' => $this->faker->lexify(str_repeat('?', 45)),  // Limita la dirección a 45 caracteres
            'usuario_creador_id' => $this->faker->randomDigitNotNull(),
            'fecha_creacion' => now(),
            'usuario_modificador_id' => $this->faker->randomDigitNotNull(),
            'fecha_modificacion' => now(),
        ];
    }
}
