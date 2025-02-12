<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Acta;

class ActaSeeder extends Seeder
{
    public function run()
    {
        Acta::factory(10)->create();
    }
}

