<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Familia;

class FamiliaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Familia::create([
            'nombre' => 'Imagen Personal'
        ]);

        Familia::create([
            'nombre' => 'Imagen y Sonido'
        ]);

        Familia::create([
            'nombre' => 'Electricidad y Electronica'
        ]);

        Familia::create([
            'nombre' => 'Informatica y Comunicaciones'
        ]);

        Familia::create([
            'nombre' => 'Transporte y Matenimiento de Vehiculos'
        ]);

        Familia::create([
            'nombre' => 'Textil, Confeccion y Piel'
        ]);

        Familia::create([
            'nombre' => 'Hosteleria y turismo'
        ]);

        Familia::create([
            'nombre' => 'Comercio y marketing'
        ]);

        Familia::create([
            'nombre' => 'Servicios Socioculturales a la comunidad'
        ]);
    }
}
