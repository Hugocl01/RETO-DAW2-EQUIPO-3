<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SeccionesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $secciones = [
            ['nombre' => 'Equipos', 'descripcion' => 'Gestión de los equipos participantes en el torneo.'],
            ['nombre' => 'Patrocinadores', 'descripcion' => 'Información sobre los patrocinadores del torneo.'],
            ['nombre' => 'Jugadores', 'descripcion' => 'Gestión de los jugadores y roles dentro de los equipos.'],
            ['nombre' => 'Partidos', 'descripcion' => 'Registro de los partidos, horarios y resultados.'],
            ['nombre' => 'Actas', 'descripcion' => 'Registro de incidencias ocurridas durante los partidos.'],
            ['nombre' => 'Usuarios', 'descripcion' => 'Gestión de usuarios y sus roles en la aplicación.'],
            ['nombre' => 'Retos', 'descripcion' => 'Información de los retos de los centros educativos.'],
            ['nombre' => 'Publicaciones', 'descripcion' => 'Noticias y publicidad relacionada con el torneo.'],
            ['nombre' => 'Imágenes', 'descripcion' => 'Gestión de imágenes asociadas a las entidades.'],
            ['nombre' => 'ONGs', 'descripcion' => 'Asociación con Cruz Roja y actividades solidarias.'],
            ['nombre' => 'Donaciones', 'descripcion' => 'Registro de donaciones de comida y dinero.'],
            ['nombre' => 'Pabellones', 'descripcion' => 'Información sobre los pabellones donde se juegan los partidos.'],
            ['nombre' => 'Familias', 'descripcion' => 'Familias profesionales de FP que participan en los retos.'],
            ['nombre' => 'Ciclos', 'descripcion' => 'Ciclos de FP que participan en los retos.'],
            ['nombre' => 'Centros', 'descripcion' => 'Centros educativos que participan en el torneo.'],
            ['nombre' => 'Estudios', 'descripcion' => 'Cursos asociados a los centros que participan en los retos.'],
        ];

        DB::table('secciones')->insert(array_map(function ($seccion) {
            return [
                'nombre' => $seccion['nombre'],
                'descripcion' => $seccion['descripcion'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        }, $secciones));
    }
}
