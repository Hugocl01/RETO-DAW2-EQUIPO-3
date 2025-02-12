<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pabellon;

class PabellonSeeder extends Seeder
{
    public function run()
    {
        Pabellon::factory()->count(10)->create();
    }
}

