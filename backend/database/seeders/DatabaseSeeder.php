<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Desactivar restricciones de clave foránea antes de truncar
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Truncar tablas en orden correcto para evitar errores de FK
        $tables = [
            'perfil_seccion_accion', 'imagenes', 'publicaciones', 'actas', 'partidos',
            'pabellones', 'jugadores', 'patrocinadores_equipos', 'patrocinadores',
            'retos', 'inscripciones', 'incidencias', 'estado_inscripciones', 'equipos',
            'estudios', 'ciclos', 'familias', 'centros', 'donaciones', 'ongs',
            'usuarios', 'perfiles'
        ];

        foreach ($tables as $table) {
            if (Schema::hasTable($table)) { // Verifica si la tabla existe antes de truncar
                DB::table($table)->truncate();
            }
        }

        // Reactivar restricciones de clave foránea
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Ejecutar seeders en el orden correcto
        $this->call([
            PerfilSeeder::class,
            SeccionSeeder::class,
            AccionSeeder::class,
            UsuarioSeeder::class,
            OngSeeder::class,
            DonacionesSeeder::class,
            FamiliaSeeder::class,  // Primero se insertan las familias
            CicloSeeder::class,    // Luego los ciclos, ya que dependen de las familias
            CentroSeeder::class,   // Después los centros
            EstudioSeeder::class,  // Luego los estudios, ya que dependen de los ciclos y centros
            EquipoSeeder::class,
            EstadoInscripcionSeeder::class,
            IncidenciaSeeder::class,
            InscripcionSeeder::class,
            RetoSeeder::class,     // Ahora se ejecuta después de EstudioSeeder
            PatrocinadorSeeder::class,
            PatrocinadorEquipoSeeder::class,
            PabellonSeeder::class,
            PartidoSeeder::class,
            PerfilSeccionAccionSeeder::class,
            SemifinalFinalSeeder::class,
            PublicacionSeeder::class,
        ]);
    }
}
