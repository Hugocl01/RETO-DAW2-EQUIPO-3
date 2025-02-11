<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Centro;

class CentroSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Centro::create([
            'nombre' => 'IES Zapatón'
        ]);

        Centro::create([
            'nombre' => 'IES Miguel Herrero Pereda'
        ]);

        Centro::create([
            'nombre' => 'IES Besaya'
        ]);
    }
}
