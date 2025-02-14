<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SeccionSeeder extends Seeder
{
    public function run(): void
    {
        // Array de secciones
        $secciones = [
            ['nombre' => 'Equipos', 'descripcion' => 'Gestión de los equipos participantes en el torneo.'],
            ['nombre' => 'Patrocinadores', 'descripcion' => 'Información sobre los patrocinadores del torneo.'],
            ['nombre' => 'Partidos', 'descripcion' => 'Registro de los partidos, horarios y resultados.'],
            ['nombre' => 'Actas', 'descripcion' => 'Registro de incidencias ocurridas durante los partidos.'],
            ['nombre' => 'Usuarios', 'descripcion' => 'Gestión de usuarios y sus roles en la aplicación.'],
            ['nombre' => 'Retos', 'descripcion' => 'Información de los retos de los centros educativos.'],
            ['nombre' => 'Publicaciones', 'descripcion' => 'Noticias y publicidad relacionada con el torneo.'],
            ['nombre' => 'Imágenes', 'descripcion' => 'Gestión de imágenes asociadas a las entidades.'],
            ['nombre' => 'Donaciones', 'descripcion' => 'Registro de donaciones de comida y dinero.'],
            ['nombre' => 'Pabellones', 'descripcion' => 'Información sobre los pabellones donde se juegan los partidos.'],
            ['nombre' => 'Familias', 'descripcion' => 'Familias profesionales de FP que participan en los retos.'],
            ['nombre' => 'Ciclos', 'descripcion' => 'Ciclos de FP que participan en los retos.'],
            ['nombre' => 'Centros', 'descripcion' => 'Centros educativos que participan en el torneo.'],
            ['nombre' => 'Estudios', 'descripcion' => 'Cursos asociados a los centros que participan en los retos.'],
            ['nombre' => 'Inscripciones', 'descripcion' => 'Inscripciones de equipos para ser aprobadas o rechazadas']
        ];

        // Acciones CRUD por defecto (o las que uses habitualmente)
        $accionesDefault = ['index', 'store', 'show', 'update', 'destroy'];

        // Acciones especiales SOLO para "Usuarios"
        $accionesUsuarios = ['index', 'store', 'update', 'updateActivo'];

        // Acciones especiales SOLO para "Usuarios"
        // $accionesEquipo = ['index', 'store', 'update', 'updateActivo'];

        foreach ($secciones as $seccion) {
            // Insertar la sección y obtener su ID
            $seccionId = DB::table('secciones')->insertGetId([
                'nombre' => $seccion['nombre'],
                'descripcion' => $seccion['descripcion'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);

            // Si es la sección "Usuarios", insertamos las acciones especiales
            if ($seccion['nombre'] === 'Usuarios') {
                foreach ($accionesUsuarios as $accion) {
                    DB::table('acciones')->insert([
                        'nombre' => $accion,
                        'seccion_id' => $seccionId,
                        'created_at' => Carbon::now(),
                        'updated_at' => Carbon::now(),
                    ]);
                }
            }
            else if ($seccion['nombre'] === 'Usuarios') {


            } else {
                // En caso contrario, las acciones por defecto
                foreach ($accionesDefault as $accion) {
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
}
