<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FamiliaSeeder extends Seeder
{
    public function run()
    {
        DB::table('familias')->insert([
            // ZAPATON
            ['nombre' => 'ELECTRICIDAD-ELECTRÓNICA', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Imagen personal', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Imagen y sonido', 'created_at' => now(), 'updated_at' => now()],

            //MIGUEL EL HERRERO
            ['nombre' => 'Informática y Comunicaciones', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Transporte y Mantenimiento de Vehículos', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Administración y Gestión', 'created_at' => now(), 'updated_at' => now()],

            // BESAYA
            ['nombre' => 'Textil, Confección y Piel', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Hostelería y Turismo', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Servicios Socioculturales', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
