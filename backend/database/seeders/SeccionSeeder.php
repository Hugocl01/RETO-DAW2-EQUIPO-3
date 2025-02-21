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
            ['nombre' => 'Publicaciones', 'descripcion' => 'Publicaciones sobre las diferentes partes del Torneo Benéfico'],
            ['nombre' => 'Actas', 'descripcion' => 'Registro de incidencias ocurridas durante los partidos.'],
            ['nombre' => 'Usuarios', 'descripcion' => 'Gestión de usuarios y sus roles en la aplicación.'],
            ['nombre' => 'Retos', 'descripcion' => 'Información de los retos de los centros educativos.'],
            ['nombre' => 'Imágenes', 'descripcion' => 'Gestión de imágenes asociadas a las entidades.'],
            ['nombre' => 'Pabellones', 'descripcion' => 'Información sobre los pabellones donde se juegan los partidos.'],
            ['nombre' => 'Familias', 'descripcion' => 'Familias profesionales de FP que participan en los retos.'],
            ['nombre' => 'Ciclos', 'descripcion' => 'Ciclos de FP que participan en los retos.'],
            ['nombre' => 'Centros', 'descripcion' => 'Centros educativos que participan en el torneo.'],
            ['nombre' => 'Estudios', 'descripcion' => 'Cursos asociados a los centros que participan en los retos.'],
            ['nombre' => 'Inscripciones', 'descripcion' => 'Inscripciones de equipos para ser aprobadas o rechazadas.']
        ];

        foreach ($secciones as $seccion) {
            DB::table('secciones')->updateOrInsert(
                ['nombre' => $seccion['nombre']],
                [
                    'descripcion' => $seccion['descripcion'],
                    'created_at' => DB::raw('IFNULL(created_at, NOW())'),
                    'updated_at' => Carbon::now()
                ]
            );
        }
    }
}
