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
        DB::table('estado_inscripciones')->delete();
        DB::table('incidencias')->delete();
        DB::table('inscripciones')->delete();
        DB::table('retos')->delete();
        DB::table('patrocinadores')->delete();
        DB::table('patrocinadores_equipos')->delete();
        DB::table('jugadores')->delete();
        DB::table('pabellones')->delete();
        DB::table('partidos')->delete();
        DB::table('actas')->delete();
        DB::table('publicaciones')->delete();
        DB::table('imagenes')->delete();

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
