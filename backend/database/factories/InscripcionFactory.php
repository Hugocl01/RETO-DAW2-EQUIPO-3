<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Inscripcion;
use App\Models\Equipo;
use App\Models\EstadoInscripcion;

class InscripcionFactory extends Factory
{
    protected $model = Inscripcion::class;

    public function definition()
    {
        return [
            'comentarios' => $this->faker->sentence(),
            'equipo_id' => Equipo::inRandomOrder()->first()->id ?? Equipo::factory(),
            'estado_id' => EstadoInscripcion::inRandomOrder()->first()->id ?? EstadoInscripcion::factory(),
            'usuario_creador_id' => 1
        ];
    }
}

