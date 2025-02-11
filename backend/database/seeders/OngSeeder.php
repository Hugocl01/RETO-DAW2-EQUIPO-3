<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Ong;

class OngSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Ong::create([
            'nombre' => 'Cruz Roja',
            'landingPage' => 'https://www.cruzroja.es/portal/page?_pageid=565,12299371&_dad=portal30&_schema=PORTAL30&P_CENT=14459',
            'usuario_creador_id' => 1,
        ]);
    }
}
