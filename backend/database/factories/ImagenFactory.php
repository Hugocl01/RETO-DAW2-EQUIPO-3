<?php

namespace Database\Factories;

use App\Models\Imagen;
use Illuminate\Database\Eloquent\Factories\Factory;

class ImagenFactory extends Factory
{
    protected $model = Imagen::class;

    public function definition()
    {
        return [
            'nombre' => $this->faker->word . '.jpg',
            // Se genera una ruta ficticia; la carpeta y nombre se pueden ajustar
            'ruta'   => 'uploads/' . $this->faker->word . '/' . $this->faker->date('Y/m/d') . '/' . $this->faker->word . '.jpg',
            // Los campos de la relación polimórfica (imagenable_id e imagenable_type)
            // se asignarán automáticamente al usar la relación en el seeder.
            // Campos de auditoría (usuario_creador_id, fecha_creacion, etc.) se dejan con valores por defecto.
            'usuario_creador_id' => null,
            'fecha_creacion'      => now(),
            'usuario_modificador_id' => null,
            'fecha_modificacion' => null,
        ];
    }
}
