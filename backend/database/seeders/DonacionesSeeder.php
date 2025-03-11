<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Donacion;

class DonacionesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $donacion = new Donacion();
        $donacion->ong_id = 1;
        $donacion->kilos = 0;
        $donacion->importe = 0;
        $donacion->save();
        $this->command->info('tabla donaciones inicializada');
    }
}
