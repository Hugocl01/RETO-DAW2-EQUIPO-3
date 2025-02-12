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
        // ID del perfil de Administrador (Asegúrate de que existe en la tabla 'perfiles')
        $perfil_administrador_id = DB::table('perfiles')->where('tipo', 'administrador')->value('id');

        // Secciones a las que tendrá acceso el Administrador (Asegúrate de que existen en 'secciones')
        $secciones = DB::table('secciones')->pluck('id')->toArray();

        // Insertar relaciones en perfiles_secciones
        foreach ($secciones as $seccion_id) {
            DB::table('perfiles_secciones')->insert([
                'perfil_id' => $perfil_administrador_id,
                'seccion_id' => $seccion_id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
