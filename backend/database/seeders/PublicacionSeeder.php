<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Publicacion;

class PublicacionSeeder extends Seeder
{
    public function run()
    {
        Publicacion::factory(10)->create();
    }
}

