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
            'Equipos' => [
                'index'
            ],
            'Jugadores' => [
                'index'
            ],
            'Torneo' => [
                'comienzoTorneo',
                'reinicioTorneo'
            ],
            'Centros' => [
                'show',
                'store',
                'update',
                'destroy',
                'getListaCentros'
            ],
            'Ciclos' => [
                'show',
                'store',
                'update',
                'destroy',
                'getListaCiclos'
            ],
            'Publicaciones' => [
                'store',
                'update',
                'getListaPublicacionModelos'
            ],
            'Patrocinadores' => [
                'store',
                'update',
                'destroy'
            ],
            'Estudios' => [
                'index',
                'store',
                'destroy',
                'getListaEstudios'
            ],
            'Familias' => [
                'index',
                'store',
                'update',
                'destroy',
                'getListaFamilias'
            ],
            'Inscripciones' => [
                'index',
                'cambiarEstado',
            ],
            'Incidencias' => [
                'getListaIncidencias',
            ],
            'Perfiles' => [
                'getListaPerfiles',
                'show'
            ],
            'Partidos' => [
                'destroy',
                'getListaTipoPartido',
                'getListaJugadores'
            ],
            'Usuarios' => [
                'index',
                'update',
                'store',
                'destroy'
            ],
            'Retos' => [
                'index',
                'store',
                'update',
                'destroy'
            ],
            'Actas' => [
                'index',
                'store',
                'update'
            ],
            'Pabellones' => [
                'index',
                'show'
            ],
            'Imágenes' => [
                'index',
                'store',
                'destroy',
                'uploadFoto',
                'getListaImagenModelos'
            ],
            'Secciones' => [
                'getListaSecciones'
            ]
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
