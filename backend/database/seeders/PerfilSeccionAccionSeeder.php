<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class PerfilSeccionAccionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        try {
            DB::table('perfil_seccion_accion')->truncate(); // Limpiar la tabla

            $perfiles = DB::table('perfiles')->pluck('id', 'tipo')->toArray();
            $secciones = DB::table('secciones')->pluck('id', 'nombre')->toArray();
            $acciones = DB::table('acciones')->select('id', 'seccion_id')->get()->groupBy('seccion_id');

            $permisos_por_perfil = [
                'administrador' => ['Equipos', 'Jugadores', 'Usuarios', 'Patrocinadores', 'Retos', 'Centros', 'Perfiles', 'Ciclos', 'Estudios', 'Familias', 'Inscripciones', 'Incidencias', 'Partidos', 'Torneo', 'Publicaciones', 'Imagenes'],
                'entrenador'    => ['Equipos', 'Jugadores'],
                'periodista'    => ['Publicaciones', 'Imagenes', 'Partidos'],
                'director'      => ['Torneo', 'Usuarios', 'Retos', 'Centros', 'Familias', 'Estudios'],
            ];

            $dataInsertar = [];

            foreach ($permisos_por_perfil as $perfil => $seccionesPermitidas) {
                if (!isset($perfiles[$perfil])) {
                    continue;
                }

                $perfilId = $perfiles[$perfil];

                foreach ($seccionesPermitidas as $seccionNombre) {
                    if (!isset($secciones[$seccionNombre])) {
                        continue;
                    }

                    $seccionId = $secciones[$seccionNombre];

                    if (!isset($acciones[$seccionId])) {
                        continue;
                    }

                    foreach ($acciones[$seccionId] as $accion) {
                        $dataInsertar["{$perfilId}_{$seccionId}_{$accion->id}"] = [
                            'perfil_id' => $perfilId,
                            'seccion_id' => $seccionId,
                            'accion_id' => $accion->id,
                            'fecha_creacion' => Carbon::now(),
                        ];
                    }
                }
            }

            // Inserción masiva optimizada sin duplicados
            DB::table('perfil_seccion_accion')->insertOrIgnore(array_values($dataInsertar));

            $this->command->info('PerfilSeccionAccionSeeder ejecutado correctamente.');
        } catch (\Exception $e) {
            Log::error("Error en PerfilSeccionAccionSeeder: " . $e->getMessage());
            $this->command->error('Se produjo un error al ejecutar el seeder. Revisa el log para más detalles.');
        }
    }
}
