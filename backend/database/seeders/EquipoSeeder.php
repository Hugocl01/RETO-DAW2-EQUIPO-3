<?php

namespace Database\Seeders;

use App\Models\Equipo;
use App\Models\Centro;
use App\Models\Usuario;
use App\Models\Jugador;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class EquipoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $centros = Centro::all()->pluck('id');
        $usuarios = Usuario::all()->pluck('id');

        if ($centros->isEmpty()) {
            throw new \Exception("No hay centros disponibles en la base de datos.");
        }

        $equiposGrupoA = [
            ['nombre' => 'Equipo A1', 'slug' => Str::slug('Equipo A1'), 'centro_id' => $centros->random(), 'grupo' => 'A', 'usuario_id' => $usuarios->random()],
            ['nombre' => 'Equipo A2', 'slug' => Str::slug('Equipo A2'), 'centro_id' => $centros->random(), 'grupo' => 'A', 'usuario_id' => $usuarios->random()],
            ['nombre' => 'Equipo A3', 'slug' => Str::slug('Equipo A3'), 'centro_id' => $centros->random(), 'grupo' => 'A', 'usuario_id' => $usuarios->random()],
            ['nombre' => 'Equipo A4', 'slug' => Str::slug('Equipo A4'), 'centro_id' => $centros->random(), 'grupo' => 'A', 'usuario_id' => $usuarios->random()],
            ['nombre' => 'Equipo A5', 'slug' => Str::slug('Equipo A5'), 'centro_id' => $centros->random(), 'grupo' => 'A', 'usuario_id' => $usuarios->random()],
        ];

        $equiposGrupoB = [
            ['nombre' => 'Equipo B1', 'slug' => Str::slug('Equipo B1'), 'centro_id' => $centros->random(), 'grupo' => 'B', 'usuario_id' => $usuarios->random()],
            ['nombre' => 'Equipo B2', 'slug' => Str::slug('Equipo B2'), 'centro_id' => $centros->random(), 'grupo' => 'B', 'usuario_id' => $usuarios->random()],
            ['nombre' => 'Equipo B3', 'slug' => Str::slug('Equipo B3'), 'centro_id' => $centros->random(), 'grupo' => 'B', 'usuario_id' => $usuarios->random()],
            ['nombre' => 'Equipo B4', 'slug' => Str::slug('Equipo B4'), 'centro_id' => $centros->random(), 'grupo' => 'B', 'usuario_id' => $usuarios->random()],
            ['nombre' => 'Equipo B5', 'slug' => Str::slug('Equipo B5'), 'centro_id' => $centros->random(), 'grupo' => 'B', 'usuario_id' => $usuarios->random()],
        ];

        Equipo::insert(array_merge($equiposGrupoA, $equiposGrupoB));

        Equipo::all()->each(function ($equipo) {
            Jugador::factory()->count(10)->create([
                'equipo_id' => $equipo->id
            ]);
        });
    }
}
