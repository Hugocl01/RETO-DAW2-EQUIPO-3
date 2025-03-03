<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PatrocinadorSeeder extends Seeder
{
    public function run()
    {
        DB::table('patrocinadores')->insert([
            ['nombre' => 'CEINOR',  'landing_page' => 'https://ceinor.com/', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'DISGARSA',  'landing_page' => 'https://www.disgarsa.com/', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Gimnasio Ubud Fitness Fight',  'landing_page' => 'https://www.instagram.com/ubudfitnessfight/', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'LIS Data Solutions',  'landing_page' => 'https://www.lisdatasolutions.com/es/', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'EMI Suite 4.0',  'landing_page' => 'https://emisuite.es/', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Escuela Cine & TV',  'landing_page' => 'https://www.escuelacineytv.com/', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Grupo PITMA',  'landing_page' => 'https://pitma.es/', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'BM SUPERMERCADOS',  'landing_page' => 'https://www.bmsupermercados.es/', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Café Dromedario',  'landing_page' => 'https://cafedromedario.com/', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Selcansa',  'landing_page' => 'https://www.grupoelektra.es/es/grupo-elektra/empresa/selcansa', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
