<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Jugador;

class JugadorSeeder extends Seeder
{
    public function run()
    {
        Jugador::factory()->count(10)->create();
    }
}
