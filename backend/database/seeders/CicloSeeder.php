<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CicloSeeder extends Seeder
{
    public function run()
    {
        $ciclos = [
            // ZAPATON
            ['nombre' => 'AUTOMATIZACIÓN Y ROBÓTICA INDUSTRIAL', 'familia_id' => 1],
            ['nombre' => 'Mantenimiento Electrónico', 'familia_id' => 1],
            ['nombre' => 'Estética Integral y Bienestar', 'familia_id' => 2],
            ['nombre' => 'VideoDJ', 'familia_id' => 3],
            ['nombre' => 'Sonido para Audiovisuales y Espectáculos', 'familia_id' => 3],

            // MIGUEL EL HERRERO
            ['nombre' => 'Sistemas Microinformáticos y Redes', 'familia_id' => 4],
            ['nombre' => 'Desarrollo de Aplicaciones Web', 'familia_id' => 4],
            ['nombre' => 'Administración de Sistemas Informáticos en Red', 'familia_id' => 4],

            ['nombre' => 'Grado Medio en Carrocería', 'familia_id' => 5],

            ['nombre' => 'Gestión Administrativa', 'familia_id' => 6],

            // BESAYA
            ['nombre' => 'Tapicería y Cortinaje', 'familia_id' => 7],
            ['nombre' => 'Cocina y Restauracion', 'familia_id' => 8],
            ['nombre' => 'Servicios de Restauracion', 'familia_id' => 8],
            ['nombre' => 'Integración Social', 'familia_id' => 9],
        ];

        foreach ($ciclos as $ciclo) {
            DB::table('ciclos')->insert([
                'nombre' => $ciclo['nombre'],
                'familia_id' => $ciclo['familia_id'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
