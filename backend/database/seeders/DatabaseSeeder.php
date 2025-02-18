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
        // Mostrar mensaje en la consola
        $this->command->info('Desactivando restricciones de clave foránea...');
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Truncar tablas para reiniciar IDs
        $tables = [
            'usuarios', 'perfiles', 'ongs', 'donaciones', 'estudios', 'equipos',
            'ciclos', 'familias', 'centros', 'estado_inscripciones', 'incidencias',
            'inscripciones', 'retos', 'patrocinadores', 'patrocinadores_equipos',
            'jugadores', 'pabellones', 'partidos', 'actas', 'publicaciones', 'imagenes'
        ];

        foreach ($tables as $table) {
            DB::table($table)->truncate();
        }

        // Volver a activar restricciones de clave foránea
        $this->command->info('Activando restricciones de clave foránea...');
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Ejecutar los seeders en el orden adecuado
        $this->call([
            PerfilSeeder::class,
            SeccionSeeder::class,
            PerfilSeccionSeeder::class,
            UsuarioSeeder::class,
            OngSeeder::class,
            DonacionesSeeder::class,
            FamiliaSeeder::class,
            CicloSeeder::class,
            CentroSeeder::class,
            EstudioSeeder::class,
            EquipoSeeder::class,
            EstadoInscripcionSeeder::class,
            IncidenciaSeeder::class,
            InscripcionSeeder::class,
            RetoSeeder::class,
            PatrocinadorSeeder::class,
            PatrocinadorEquipoSeeder::class,
            PabellonSeeder::class,
            PartidoSeeder::class,

            // Semi y Final
            SemifinalFinalSeeder::class,
            PublicacionSeeder::class,
        ]);
    }
}
