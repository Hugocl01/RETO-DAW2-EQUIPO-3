<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\PatrocinadorEquipo;
use App\Models\Patrocinador;
use App\Models\Equipo;

class PatrocinadorEquipoFactory extends Factory
{
    protected $model = PatrocinadorEquipo::class;

    public function definition()
    {
        return [
            'patrocinador_id' => Patrocinador::inRandomOrder()->first()->id ?? Patrocinador::factory(),  // Obtiene un patrocinador aleatorio
            'equipo_id' => Equipo::inRandomOrder()->first()->id ?? Equipo::factory(),  // Obtiene un equipo aleatorio
            'usuario_creador_id' => 1
        ];
    }
}
