<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CentroSeeder extends Seeder
{
    public function run()
    {
        DB::table('centros')->insert([
            ['nombre' => 'IES Besaya', 'landing_page' => 'https://www.educantabria.es/web/ies-besaya', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'IES Miguel Herrero Pereda', 'landing_page' => 'https://www.educantabria.es/web/ies-miguel-herrero-pereda', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'IES Zapatón', 'landing_page' => 'https://www.ieszapaton.es/', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'IES Todos', 'landing_page' => '', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
