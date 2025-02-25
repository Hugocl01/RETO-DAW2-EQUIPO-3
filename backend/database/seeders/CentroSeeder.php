<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CentroSeeder extends Seeder
{
    public function run()
    {
        DB::table('centros')->insert([
            ['nombre' => 'IES Besaya', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'IES Miguel Herrero Pereda', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'IES Zapatón', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
