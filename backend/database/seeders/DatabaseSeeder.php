<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Deshabilitamos temporalmente las restricciones de clave foránea
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Limpiar tablas y reiniciar IDs
        DB::table('usuarios')->truncate();
        DB::table('perfiles')->truncate();
        DB::table('ongs')->truncate();
        DB::table('donaciones')->truncate();
        DB::table('estudios')->truncate();
        DB::table('equipos')->truncate();
        DB::table('ciclos')->truncate();
        DB::table('familias')->truncate();
        DB::table('centros')->truncate();
        DB::table('estado_inscripciones')->truncate();
        DB::table('secciones')->truncate(); // Añadimos secciones
        DB::table('perfiles_secciones')->truncate(); // Relación de perfiles con secciones

        // Volvemos a habilitar las restricciones de clave foránea
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Llamar a los Seeders en el orden correcto
        $this->call([
            PerfilSeeder::class,
            UsuarioSeeder::class,
            OngSeeder::class,
            DonacionesSeeder::class,
            FamiliaSeeder::class,
            CicloSeeder::class,
            CentroSeeder::class,
            EstudioSeeder::class,
            EquipoSeeder::class,
            EstadoInscripcionSeeder::class,
            SeccionesSeeder::class, // Añadimos el seeder de secciones
            PerfilSeccionSeeder::class, // Añadimos el seeder que vincula perfiles con secciones
        ]);
    }
}
