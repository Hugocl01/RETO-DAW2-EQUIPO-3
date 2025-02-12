<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Patrocinador;

class PatrocinadorSeeder extends Seeder
{
    public function run()
    {
        Patrocinador::factory()->count(10)->create();
    }
}
