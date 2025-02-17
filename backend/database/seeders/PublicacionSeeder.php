<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Publicacion;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PublicacionSeeder extends Seeder
{
    public function run()
    {
        Publicacion::factory(10)->create();
    }
}

