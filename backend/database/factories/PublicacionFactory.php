<?php

namespace Database\Factories;

use App\Models\Publicacion;
use Illuminate\Database\Eloquent\Factories\Factory;

class PublicacionFactory extends Factory
{
    protected $model = Publicacion::class;

    public function definition()
    {
        return [
            'titulo'                => $this->faker->sentence,
            'contenido'             => $this->faker->paragraph,
            // Para este ejemplo, se asume que la publicación está relacionada con un Equipo
            'publicacionable_type'  => 'App\\Models\\Equipo',
            // Se asigna un ID aleatorio; en un caso real podrías relacionarlo con registros existentes
            'publicacionable_id'    => $this->faker->numberBetween(1, 10),
            'ruta_video'            => null,
            'ruta_audio'            => null,
            'portada'               => $this->faker->boolean,
        ];
    }
}
