<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PerfilSeccionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // IDs de los perfiles
        $perfil_admin_id = 1;
        $perfil_entenador_id = 2;
        $perfil_periodista_id = 3;
        $perfil_director_id = 4;

        // Obtener todas las secciones para el administrador
        $secciones_admin = DB::table('secciones')->pluck('id')->toArray();

        // Para Entrenador (perfil_id = 2)
        $secciones_entrenador = [
            DB::table('secciones')->where('nombre', 'Equipos')->value('id'),
            DB::table('secciones')->where('nombre', 'Jugadores')->value('id')
        ];

        // Para Periodista (perfil_id = 3)
        $secciones_periodista = [
            DB::table('secciones')->where('nombre', 'Publicaciones')->value('id'),
            DB::table('secciones')->where('nombre', 'Imágenes')->value('id'),
        ];

        // Para Director (perfil_id = 4)
        $secciones_director = [
            DB::table('secciones')->where('nombre', 'Partidos')->value('id'),
            DB::table('secciones')->where('nombre', 'Actas')->value('id'),
            DB::table('secciones')->where('nombre', 'Pabellones')->value('id'),
            DB::table('secciones')->where('nombre', 'Equipos')->value('id'),
            DB::table('secciones')->where('nombre', 'Jugadores')->value('id'),
        ];


        // Insertar todas las secciones para el Administrador
        foreach ($secciones_admin as $seccion_id) {
            DB::table('perfiles_secciones')->updateOrInsert(
                ['perfil_id' => $perfil_admin_id, 'seccion_id' => $seccion_id],
            );
        }

        // Insertar solo la sección "entrenadores" para el perfil con id 2
        foreach ($secciones_entrenador as $seccion_id) {
            DB::table('perfiles_secciones')->updateOrInsert(
                ['perfil_id' => $perfil_entenador_id, 'seccion_id' => $seccion_id],
            );
        }

        // Insertar solo la sección "periodistas" para el perfil con id 2
        foreach ($secciones_periodista as $seccion_id) {
            DB::table('perfiles_secciones')->updateOrInsert(
                ['perfil_id' => $perfil_periodista_id, 'seccion_id' => $seccion_id],
            );
        }

        // Insertar solo la sección "directores" para el perfil con id 2
        foreach ($secciones_director as $seccion_id) {
            DB::table('perfiles_secciones')->updateOrInsert(
                ['perfil_id' => $perfil_director_id, 'seccion_id' => $seccion_id],
            );
        }
    }
}
