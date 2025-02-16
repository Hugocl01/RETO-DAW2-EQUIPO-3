<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SeccionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $secciones = [
            ['nombre' => 'Equipos', 'descripcion' => 'Gestión de los equipos participantes en el torneo.'],
            ['nombre' => 'Jugadores', 'descripcion' => 'Gestión de los jugadores y roles dentro de los equipos.'],
            ['nombre' => 'Partidos', 'descripcion' => 'Registro de los partidos, horarios y resultados.'],
            ['nombre' => 'Actas', 'descripcion' => 'Registro de incidencias ocurridas durante los partidos.'],
            ['nombre' => 'Usuarios', 'descripcion' => 'Gestión de usuarios y sus roles en la aplicación.'],
            ['nombre' => 'Retos', 'descripcion' => 'Información de los retos de los centros educativos.'],
            ['nombre' => 'Publicaciones', 'descripcion' => 'Noticias y publicidad relacionada con el torneo.'],
            ['nombre' => 'Imágenes', 'descripcion' => 'Gestión de imágenes asociadas a las entidades.'],
            ['nombre' => 'Pabellones', 'descripcion' => 'Información sobre los pabellones donde se juegan los partidos.'],
            ['nombre' => 'Familias', 'descripcion' => 'Familias profesionales de FP que participan en los retos.'],
            ['nombre' => 'Ciclos', 'descripcion' => 'Ciclos de FP que participan en los retos.'],
            ['nombre' => 'Centros', 'descripcion' => 'Centros educativos que participan en el torneo.'],
            ['nombre' => 'Estudios', 'descripcion' => 'Cursos asociados a los centros que participan en los retos.'],
            ['nombre' => 'Inscripciones', 'descripcion' => 'Inscripciones de equipos para ser aprobadas o rechazadas.']
        ];

        // Definir acciones por secciones según el mapa de controladores
        $acciones_por_seccion = [
            'Centros' => ['index', 'show', 'store', 'update', 'destroy'],
            'Ciclos' => ['index', 'show', 'store', 'update', 'destroy'],
            'Equipos' => ['index', 'show', 'store', 'update', 'destroy'],
            'Estudios' => ['index', 'store', 'destroy'],
            'Familias' => ['index', 'store', 'update', 'destroy'],
            'Inscripciones' => ['index', 'cambiarEstado'],
            'Jugadores' => ['index', 'show', 'update'],
            'Perfiles' => ['index', 'show', 'store', 'update', 'destroy'],
            'Retos' => ['index', 'show', 'store', 'update', 'destroy'],
            'Secciones' => ['index'],
            'Usuarios' => ['index', 'update', 'store'],
        ];

        foreach ($secciones as $seccion) {
            // Insertar la sección y obtener su ID
            $seccionId = DB::table('secciones')->insertGetId([
                'nombre' => $seccion['nombre'],
                'descripcion' => $seccion['descripcion'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);

            // Obtener las acciones correctas para la sección
            $acciones_asignadas = $acciones_por_seccion[$seccion['nombre']] ?? ['index'];

            // Insertar acciones
            foreach ($acciones_asignadas as $accion) {
                DB::table('acciones')->insert([
                    'nombre' => $accion,
                    'seccion_id' => $seccionId,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ]);
            }
        }
    }
}
