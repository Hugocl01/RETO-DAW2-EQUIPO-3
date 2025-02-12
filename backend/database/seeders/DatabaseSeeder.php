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
        DB::table('incidencias')->truncate();
        DB::table('inscripciones')->truncate();
        DB::table('retos')->truncate();
        DB::table('patrocinadores')->truncate();
        DB::table('patrocinadores_equipos')->truncate();
        DB::table('jugadores')->truncate();
        DB::table('pabellones')->truncate();
        DB::table('partidos')->truncate();
        DB::table('actas')->truncate();
        DB::table('publicaciones')->truncate();
        DB::table('imagenes')->truncate();

        // Volvemos a habilitar las restricciones de clave foránea
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Llamar a los Seeders en el orden correcto
        $this->call(PerfilSeeder::class);
        $this->call(UsuarioSeeder::class);
        $this->call(OngSeeder::class);
        $this->call(DonacionesSeeder::class);
        $this->call(FamiliaSeeder::class);
        $this->call(CicloSeeder::class);
        $this->call(CentroSeeder::class);
        $this->call(EstudioSeeder::class);
        $this->call(EquipoSeeder::class);
        $this->call(EstadoInscripcionSeeder::class);
        $this->call(IncidenciaSeeder::class);      
        $this->call(InscripcionSeeder::class);     
        $this->call(RetoSeeder::class); 
        $this->call(PatrocinadorSeeder::class); 
        $this->call(PatrocinadorEquipoSeeder::class);
        $this->call(JugadorSeeder::class);  
        $this->call(PabellonSeeder::class);  
        $this->call(PartidoSeeder::class);
        $this->call(ActaSeeder::class);  
        $this->call(PublicacionSeeder::class); 
        $this->call(ImagenSeeder::class); 
    }
}
