<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EstudioSeeder extends Seeder
{
    public function run()
    {
        $estudios = [
            // ZAPATON
            ['centro_id' => 3, 'ciclo_id' => 1, 'curso' => 1],
            ['centro_id' => 3, 'ciclo_id' => 1, 'curso' => 2],
            ['centro_id' => 3, 'ciclo_id' => 2, 'curso' => 1],

            ['centro_id' => 3, 'ciclo_id' => 3, 'curso' => 1],
            ['centro_id' => 3, 'ciclo_id' => 3, 'curso' => 1],
            ['centro_id' => 3, 'ciclo_id' => 3, 'curso' => 1],

            ['centro_id' => 3, 'ciclo_id' => 4, 'curso' => 1],
            ['centro_id' => 3, 'ciclo_id' => 5, 'curso' => 1],

            // Miguel El Herrero
            ['centro_id' => 2, 'ciclo_id' => 6, 'curso' => 1],
            ['centro_id' => 2, 'ciclo_id' => 7, 'curso' => 2],
            ['centro_id' => 2, 'ciclo_id' => 8, 'curso' => 1],

            ['centro_id' => 2, 'ciclo_id' => 9, 'curso' => 2],
            ['centro_id' => 2, 'ciclo_id' => 10,'curso' => 1],

            // BESAYA
            ['centro_id' => 3, 'ciclo_id' => 11, 'curso' => 2],
            ['centro_id' => 3, 'ciclo_id' => 12, 'curso' => 2],
            ['centro_id' => 3, 'ciclo_id' => 13, 'curso' => 2],
            ['centro_id' => 3, 'ciclo_id' => 14, 'curso' => 2],
        ];

        foreach ($estudios as $estudio) {
            DB::table('estudios')->insert([
                'centro_id' => $estudio['centro_id'],
                'ciclo_id' => $estudio['ciclo_id'],
                'curso' => $estudio['curso'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
