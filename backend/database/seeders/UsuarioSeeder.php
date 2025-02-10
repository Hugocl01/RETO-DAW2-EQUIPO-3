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
            'email' => 'eloycusta@hotmail.es',
            'password' => bcrypt('admin'),
            'usuario_creador_id' => 1,
            'perfil_id' => 1,
        ]);
    }
}
