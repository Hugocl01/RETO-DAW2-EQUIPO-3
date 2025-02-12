<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Partido;
use App\Models\Equipo;
use App\Models\Pabellon;

class PartidoFactory extends Factory
{
    protected $model = Partido::class;

    public function definition()
    {
        return [
            'equipo_local_id' => Equipo::inRandomOrder()->first()->id, 
            'equipo_visitante_id' => Equipo::inRandomOrder()->first()->id, 
            'fecha' => $this->faker->date(), 
            'hora' => $this->faker->time(),  
            'goles_local' => $this->faker->numberBetween(0, 5),  // 
            'goles_visitante' => $this->faker->numberBetween(0, 5),  
            'pabellon_id' => Pabellon::inRandomOrder()->first()->id, 
            'usuario_creador_id' => 1
        ];
    }
}

