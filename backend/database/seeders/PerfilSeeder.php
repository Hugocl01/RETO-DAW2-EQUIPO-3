<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Perfil;

class PerfilSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Perfil::create([
            'tipo' => 'administrador',
            'usuario_creador_id' => 1,
        ]);

        Perfil::create([
            'tipo' => 'entrenador',
            'usuario_creador_id' => 1,
        ]);

        Perfil::create([
            'tipo' => 'periodista',
            'usuario_creador_id' => 1,
        ]);

        Perfil::create([
            'tipo' => 'director',
            'usuario_creador_id' => 1,
        ]);
    }
}
