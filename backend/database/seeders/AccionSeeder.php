<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AccionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Mapeo de secciones con sus acciones
        $acciones_por_seccion = [
            'Centros' => ['index', 'show', 'store', 'update', 'destroy'],
            'Ciclos' => ['index', 'show', 'store', 'update', 'destroy'],
            'Equipos' => ['index', 'show', 'store', 'update', 'destroy'],
            'Publicaciones' => ['index', 'store'],
            'Estudios' => ['index', 'store', 'destroy'],
            'Familias' => ['index', 'store', 'update', 'destroy'],
            'Inscripciones' => ['index', 'cambiarEstado'],
            'Jugadores' => ['index', 'show', 'update'],
            'Partidos' => ['index', 'show', 'store', 'update', 'destroy'],
            'Usuarios' => ['index', 'update', 'store'],
            'Retos' => ['index', 'show', 'store', 'update', 'destroy'],
            'Actas' => ['index', 'store', 'update'],
            'Pabellones' => ['index', 'show'],
            'Imágenes' => ['index', 'store', 'destroy']
        ];

        // Obtener los IDs de las secciones existentes
        $secciones = DB::table('secciones')->pluck('id', 'nombre')->toArray();

        foreach ($acciones_por_seccion as $seccionNombre => $acciones) {
            if (!isset($secciones[$seccionNombre])) {
                continue;
            }

            $seccionId = $secciones[$seccionNombre];

            foreach ($acciones as $accion) {
                DB::table('acciones')->updateOrInsert(
                    ['nombre' => $accion, 'seccion_id' => $seccionId],
                    ['created_at' => Carbon::now(), 'updated_at' => Carbon::now()]
                );
            }
        }
    }
}
