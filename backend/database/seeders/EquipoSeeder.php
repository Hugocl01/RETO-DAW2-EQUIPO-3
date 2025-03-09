<?php

namespace Database\Seeders;

use App\Models\Equipo;
use App\Models\Centro;
use App\Models\Usuario;
use App\Models\Jugador;
use Illuminate\Database\Seeder;

class EquipoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Suponemos que tienes centros y usuarios previamente creados en tu base de datos
        // Puedes crear más centros y usuarios si es necesario

        $centros = Centro::all();

        if ($centros->isEmpty()) {
            throw new \Exception("No hay centros disponibles en la base de datos.");
        }

        // Obtener algunos centros y usuarios existentes
        $centros = Centro::all()->pluck('id');
        $usuarios = Usuario::all()->pluck('id');

        // Datos concretos para los equipos del grupo A
        $equiposGrupoA = [
            ['nombre' => 'Equipo A1', 'centro_id' => $centros->random(), 'grupo' => 'A', 'usuario_id' => $usuarios->random()],
            ['nombre' => 'Equipo A2', 'centro_id' => $centros->random(), 'grupo' => 'A', 'usuario_id' => $usuarios->random()],
            ['nombre' => 'Equipo A3', 'centro_id' => $centros->random(), 'grupo' => 'A', 'usuario_id' => $usuarios->random()],
            ['nombre' => 'Equipo A4', 'centro_id' => $centros->random(), 'grupo' => 'A', 'usuario_id' => $usuarios->random()],
            ['nombre' => 'Equipo A5', 'centro_id' => $centros->random(), 'grupo' => 'A', 'usuario_id' => $usuarios->random()],
        ];

        // Insertar los equipos del grupo A
        Equipo::insert($equiposGrupoA);

        // Datos concretos para los equipos del grupo B
        $equiposGrupoB = [
            ['nombre' => 'Equipo B1', 'centro_id' => $centros->random(), 'grupo' => 'B', 'usuario_id' => $usuarios->random()],
            ['nombre' => 'Equipo B2', 'centro_id' => $centros->random(), 'grupo' => 'B', 'usuario_id' => $usuarios->random()],
            ['nombre' => 'Equipo B3', 'centro_id' => $centros->random(), 'grupo' => 'B', 'usuario_id' => $usuarios->random()],
            ['nombre' => 'Equipo B4', 'centro_id' => $centros->random(), 'grupo' => 'B', 'usuario_id' => $usuarios->random()],
            ['nombre' => 'Equipo B5', 'centro_id' => $centros->random(), 'grupo' => 'B', 'usuario_id' => $usuarios->random()],
        ];

        // Insertar los equipos del grupo B
        Equipo::insert($equiposGrupoB);

        // Crear jugadores para cada equipo
        Equipo::all()->each(function ($equipo) {
            Jugador::factory()->count(10)->create([
                'equipo_id' => $equipo->id
            ]);
        });
    }
}
