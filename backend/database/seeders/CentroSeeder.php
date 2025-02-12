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
            'nombre' => 'IES Zapatón',
            'landing_page' => 'https://www.ieszapaton.es/'
        ]);

        Centro::create([
            'nombre' => 'IES Miguel Herrero Pereda',
            'landing_page' => 'https://www.educantabria.es/centros/buscador-de-centros/39009456-ies-besaya'
        ]);

        Centro::create([
            'nombre' => 'IES Besaya',
            'landing_page' => 'https://www.educantabria.es/web/ies-miguel-herrero-pereda'
        ]);
    }
}
