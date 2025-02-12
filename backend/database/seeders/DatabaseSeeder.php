<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('usuarios')->delete();
        DB::table('perfiles')->delete();
        DB::table('ongs')->delete();
        DB::table('donaciones')->delete();
        DB::table('estudios')->delete();
        DB::table('equipos')->delete();
        DB::table('ciclos')->delete();
        DB::table('familias')->delete();
        DB::table('centros')->delete();


        $this->call(PerfilSeeder::class);
        $this->call(UsuarioSeeder::class);
        $this->call(OngSeeder::class);
        $this->call(DonacionesSeeder::class);
        $this->call(FamiliaSeeder::class);
        $this->call(CicloSeeder::class);
        $this->call(CentroSeeder::class);
        $this->call(EstudioSeeder::class);
        $this->call(EquipoSeeder::class);
    }
}
