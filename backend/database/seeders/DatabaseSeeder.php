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

        $this->call(PerfilSeeder::class);
        $this->call(UsuarioSeeder::class);
    }
}
