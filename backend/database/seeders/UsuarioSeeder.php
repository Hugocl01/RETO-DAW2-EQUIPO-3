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
            'email' => 'admin@admin.es',
            'password' => bcrypt('adminadmin'),
            'usuario_creador_id' => 1,
            'perfil_id' => 2,
        ]);

        Usuario::create([
            'nombre_completo' => 'Paula Rivero',
            'email' => 'admin2@admin.es',
            'password' => bcrypt('adminadmin'),
            'usuario_creador_id' => 1,
            'perfil_id' => 2,
        ]);
    }
}
