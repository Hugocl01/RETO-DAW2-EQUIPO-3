<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Jugador;
use App\Models\Equipo;
use App\Models\Estudio;

class JugadorFactory extends Factory
{
    protected $model = Jugador::class;

    public function definition()
    {
        return [
            'equipo_id' => Equipo::inRandomOrder()->first()->id ?? Equipo::factory(),  
            'nombre_completo' => $this->faker->name(), 
            'capitan' => $this->faker->numberBetween(0, 1),  
            'estudio_id' => Estudio::inRandomOrder()->first()->id ?? Estudio::factory(), 
            'dni' => $this->faker->regexify('[0-9]{8}[A-Z]{1}') ,  
            'email' => $this->faker->unique()->safeEmail(), 
            'telefono' => $this->faker->phoneNumber(),  
            'usuario_creador_id' => 1
        ];
    }
}
