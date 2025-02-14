<?php

namespace Database\Seeders;

use App\Models\Equipo;
use Illuminate\Database\Seeder;

class EquipoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear 5 equipos para el grupo A
        Equipo::factory()->count(5)->create([
            'grupo' => 'A'
        ]);

        // Crear 5 equipos para el grupo B
        Equipo::factory()->count(5)->create([
            'grupo' => 'B'
        ]);
    }
}
