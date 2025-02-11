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

        $this->call(PerfilSeeder::class);
        $this->call(UsuarioSeeder::class);
        $this->call(OngSeeder::class);
        $this->call(DonacionesSeeder::class);
    }
}
