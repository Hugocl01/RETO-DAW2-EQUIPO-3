<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pabellon;

class PabellonSeeder extends Seeder
{
    public function run()
    {
        $pabellon = new Pabellon();
        $pabellon->nombre = "Pabellón Municipal Habana Vieja";
        $pabellon->direccion = "Calle Pintor Varela,Torrelavega";
        $pabellon->save();
        $this->command->info('tabla pabellones inicializada');
    }
}
