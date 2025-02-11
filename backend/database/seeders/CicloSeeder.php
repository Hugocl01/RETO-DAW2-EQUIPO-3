<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Ciclo;

class CicloSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Ciclo::create([
            'nombre' => 'CFGS Estética Integral y Bienestar',
            'familia_id' => 1
        ]);

        Ciclo::create([
            'nombre' => 'CFGS Sonido para audiovisuales y espectáculos',
            'familia_id' => 2
        ]);

        Ciclo::create([
            'nombre' => 'CFGM video DJ y sonido',
            'familia_id' => 2
        ]);

        Ciclo::create([
            'nombre' => 'CFGS Mantenimiento Electrónico',
            'familia_id' => 3
        ]);

        Ciclo::create([
            'nombre' => 'CFGS Automatización y Robótica Industrial',
            'familia_id' => 3
        ]);

        Ciclo::create([
            'nombre' => 'CFGS Administración de Sistemas Informáticos en Red',
            'familia_id' => 4
        ]);

        Ciclo::create([
            'nombre' => 'CFGM Sistemas microinformáticos y Redes',
            'familia_id' => 4
        ]);

        Ciclo::create([
            'nombre' => 'CFGS Desarrollo de Aplicaciones Web',
            'familia_id' => 4
        ]);

        Ciclo::create([
            'nombre' => 'CFGM Gestión Administrativa',
            'familia_id' => 4
        ]);

        Ciclo::create([
            'nombre' => 'CFGM de Carrocería',
            'familia_id' => 5
        ]);

        Ciclo::create([
            'nombre' => 'CFGB de Tapicería y Cortinaje',
            'familia_id' => 6
        ]);

        Ciclo::create([
            'nombre' => 'GM servicios de restauración y PFB Cocina y restauración',
            'familia_id' => 7
        ]);

        Ciclo::create([
            'nombre' => 'CFGM Comercialización de productos alimentarios',
            'familia_id' => 8
        ]);

        Ciclo::create([
            'nombre' => 'CGSFP Integración Social',
            'familia_id' => 9
        ]);
    }
}
