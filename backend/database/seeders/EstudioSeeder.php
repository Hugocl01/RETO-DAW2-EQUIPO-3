<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Estudio;

class EstudioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Estudio::create([
            'centro_id' => 1,
            'ciclo_id' => 1,
            'curso' => 1
        ]);

        Estudio::create([
            'centro_id' => 1,
            'ciclo_id' => 2,
            'curso' => 1
        ]);

        Estudio::create([
            'centro_id' => 1,
            'ciclo_id' => 3,
            'curso' => 1
        ]);

        Estudio::create([
            'centro_id' => 1,
            'ciclo_id' => 4,
            'curso' => 1
        ]);

        Estudio::create([
            'centro_id' => 1,
            'ciclo_id' => 5,
            'curso' => 1
        ]);

        Estudio::create([
            'centro_id' => 2,
            'ciclo_id' => 6,
            'curso' => 1
        ]);

        Estudio::create([
            'centro_id' => 2,
            'ciclo_id' => 7,
            'curso' => 1
        ]);

        Estudio::create([
            'centro_id' => 2,
            'ciclo_id' => 8,
            'curso' => 1
        ]);

        Estudio::create([
            'centro_id' => 2,
            'ciclo_id' => 9,
            'curso' => 1
        ]);

        Estudio::create([
            'centro_id' => 2,
            'ciclo_id' => 10,
            'curso' => 1
        ]);


        Estudio::create([
            'centro_id' => 3,
            'ciclo_id' => 11,
            'curso' => 1
        ]);


        Estudio::create([
            'centro_id' => 3,
            'ciclo_id' => 12,
            'curso' => 1
        ]);


        Estudio::create([
            'centro_id' => 3,
            'ciclo_id' => 13,
            'curso' => 1
        ]);


        Estudio::create([
            'centro_id' => 3,
            'ciclo_id' => 14,
            'curso' => 1
        ]);


    }
}
