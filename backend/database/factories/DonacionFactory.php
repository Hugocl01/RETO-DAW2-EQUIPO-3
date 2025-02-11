<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Donacion;

class DonacionFactory extends Factory
{
    protected $model = Donacion::class;

    public function definition()
    {
        return [
            'ong_id' => 1,
            'kilos' => $this->faker->randomFloat(2, 1, 100),
            'importe' => $this->faker->randomFloat(2, 10, 500),
            'usuario_creador_id' => 1,
        ];
    }
}
