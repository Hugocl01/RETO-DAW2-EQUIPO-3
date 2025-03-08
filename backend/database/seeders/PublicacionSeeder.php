<?php

namespace Database\Seeders;

use App\Models\Publicacion;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PublicacionSeeder extends Seeder
{
    public function run()
    {
        // Crear 5 publicaciones
        /*
        Publicacion::factory(5)->create()->each(function ($publicacion) {
            // Para cada publicación, crear 3 imágenes usando la relación polimórfica
            $publicacion->imagenes()->createMany(
                \App\Models\Imagen::factory(3)->make()->toArray()
            );
        });
        */

        DB::table('publicaciones')->insert([
            'titulo' => 'Publicación 1',
            'contenido' => '<p>Contenido de la publicación 1. Puede incluir HTML.</p>',
            'publicacionable_id' => 1,  // Se introsuce el id del objeto relacionado
            'publicacionable_type' => 'App\\Models\\Jugador', // Cambia 'App\\Models\\(Nombre del modelo relacionado)'
            // {Equipo, Partido, Patrocinador, Jugador, Ong, Pabellon, Reto}
            'portada' => true,
            'usuario_creador_id' => 1, // Suponiendo que el creador es el usuario con ID 1
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('publicaciones')->insert([
            'titulo' => 'Publicación 3',
            'contenido' => '<p>Contenido de la publicación 3. Puede incluir HTML.</p>',
            'publicacionable_id' => 3, // Otro ID de entidad relacionada
            'publicacionable_type' => 'App\\Models\\Jugador', // Tipo de modelo relacionado
            'portada' => true,
            'usuario_creador_id' => 2,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('publicaciones')->insert([
            'titulo' => 'Publicación 4',
            'contenido' => '<p>Contenido de la publicación 4. Puede incluir HTML.</p>',
            'publicacionable_id' => 3, // Otro ID de entidad relacionada
            'publicacionable_type' => 'App\\Models\\Partido', // Tipo de modelo relacionado
            'portada' => false,
            'usuario_creador_id' => 2,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('publicaciones')->insert([
            'titulo' => 'Publicación 5',
            'contenido' => '<p>Contenido de la publicación 5. Puede incluir HTML.</p>',
            'publicacionable_id' => 2, // Otro ID de entidad relacionada
            'publicacionable_type' => 'App\\Models\\Patrocinador', // Tipo de modelo relacionado
            'portada' => true,
            'usuario_creador_id' => 2,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('publicaciones')->insert([
            'titulo' => 'Publicación 6',
            'contenido' => '<p>Contenido de la publicación 6. Puede incluir HTML.</p>',
            'publicacionable_id' => 5, // Otro ID de entidad relacionada
            'publicacionable_type' => 'App\\Models\\Partido', // Tipo de modelo relacionado
            'portada' => true,
            'usuario_creador_id' => 2,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
