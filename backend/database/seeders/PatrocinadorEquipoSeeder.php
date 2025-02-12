<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PatrocinadorEquipo;

class PatrocinadorEquipoSeeder extends Seeder
{
    public function run()
    {
        PatrocinadorEquipo::factory()->count(10)->create();
    }
}
