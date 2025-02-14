<?php

namespace Database\Factories;

use App\Models\Accion;
use App\Models\Seccion;
use Illuminate\Database\Eloquent\Factories\Factory;

class AccionFactory extends Factory
{
    protected $model = Accion::class;

    public function definition()
    {
        return [
            'nombre' => $this->faker->word, // Genera un nombre aleatorio para otras acciones
            'seccion_id' => Seccion::inRandomOrder()->first()->id ?? Seccion::factory()->create()->id,
        ];
    }

    public function index()
    {
        return $this->state([
            'nombre' => 'index',
        ]);
    }
}
