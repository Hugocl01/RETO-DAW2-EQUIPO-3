<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Imagen;

class ImagenSeeder extends Seeder
{
    public function run()
    {
        Imagen::factory(10)->create();
    }
}
