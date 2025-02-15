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
        // Datos base con centro_id y ciclo_id
        $estudiosData = [
            ['centro_id' => 1, 'ciclo_id' => 1],
            ['centro_id' => 1, 'ciclo_id' => 2],
            ['centro_id' => 1, 'ciclo_id' => 3],
            ['centro_id' => 1, 'ciclo_id' => 4],
            ['centro_id' => 1, 'ciclo_id' => 5],
            ['centro_id' => 2, 'ciclo_id' => 6],
            ['centro_id' => 2, 'ciclo_id' => 7],
            ['centro_id' => 2, 'ciclo_id' => 8],
            ['centro_id' => 2, 'ciclo_id' => 9],
            ['centro_id' => 2, 'ciclo_id' => 10],
            ['centro_id' => 3, 'ciclo_id' => 11],
            ['centro_id' => 3, 'ciclo_id' => 12],
            ['centro_id' => 3, 'ciclo_id' => 13],
            ['centro_id' => 3, 'ciclo_id' => 14],
        ];

        // Para cada entrada, se crea un registro para curso 1 y otro para curso 2
        foreach ($estudiosData as $data) {
            foreach ([1, 2] as $curso) {
                Estudio::create([
                    'centro_id' => $data['centro_id'],
                    'ciclo_id'  => $data['ciclo_id'],
                    'curso'     => $curso,
                ]);
            }
        }
    }
}
