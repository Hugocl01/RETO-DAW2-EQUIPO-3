<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Usuario;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Usuario::create([
            'nombre_completo' => 'Eloy Cuesta Lahera',
            'email' => 'eloycuesta@hotmail.es',
            'password' => bcrypt('adminadmin'),
            'usuario_creador_id' => 1,
            'perfil_id' => 1,
        ]);

        Usuario::create([
            'nombre_completo' => 'Hugo Cayon',
            'email' => 'hugo@hotmail.es',
            'password' => bcrypt('adminadmin'),
            'usuario_creador_id' => 1,
            'perfil_id' => 2,
        ]);

        Usuario::create([
            'nombre_completo' => 'Paula Rivero',
            'email' => 'paula@hotmail.es',
            'password' => bcrypt('adminadmin'),
            'usuario_creador_id' => 1,
            'perfil_id' => 3,
        ]);

        Usuario::create([
            'nombre_completo' => 'Adrian Tresgallo',
            'email' => 'adrian@hotmail.es',
            'password' => bcrypt('adminadmin'),
            'usuario_creador_id' => 1,
            'perfil_id' => 4,
        ]);

        // Entrenadores de los equipos
        Usuario::create([
            'nombre_completo' => 'Entrenador ejemplo',
            'email' => 'entrenador@hotmail.es',
            'password' => bcrypt('adminadmin'),
            'usuario_creador_id' => 1,
            'perfil_id' => 2, // !IMPORTANTE es el tipo de usuario para que sea entrenador = 2
        ]);
    }
}
