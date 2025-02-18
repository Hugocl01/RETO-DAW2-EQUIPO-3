<?php

namespace Database\Seeders;

use App\Models\Publicacion;
use Illuminate\Database\Seeder;

class PublicacionSeeder extends Seeder
{
    public function run()
    {
        // Crear 5 publicaciones
        Publicacion::factory(5)->create()->each(function ($publicacion) {
            // Para cada publicación, crear 3 imágenes usando la relación polimórfica
            $publicacion->imagenes()->createMany(
                \App\Models\Imagen::factory(3)->make()->toArray()
            );
        });
    }
}
