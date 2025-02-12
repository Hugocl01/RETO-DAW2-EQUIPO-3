<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\EstadoInscripcion;

class EstadoInscripcionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EstadoInscripcion::create([
            'estado' => 'pendiente'
        ]);
        EstadoInscripcion::create([
            'estado' => 'aprobada'
        ]);
        EstadoInscripcion::create([
            'estado' => 'rechazada'
        ]);
    }
}
