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
        $ent1=Usuario::find(3)->id;
        $ent2=Usuario::find(4)->id;
        $ent3=Usuario::find(5)->id;
        $ent4=Usuario::find(6)->id;
        $ent5=Usuario::find(7)->id;
        $ent6=Usuario::find(8)->id;
        $ent7=Usuario::find(9)->id;
        $ent8=Usuario::find(10)->id;
        $ent9=Usuario::find(11)->id;
        $ent10=Usuario::find(12)->id;
        $c_besaya = Centro::find(1)->id;
        $c_zapa=Centro::find(3)->id;
        $c_miguel=Centro::find(2)->id;
        $c_todo=Centro::find(4)->id;

        if ($centros->isEmpty()) {
            throw new \Exception("No hay centros disponibles en la base de datos.");
        }

        $equiposGrupoA = [
            ['nombre' => 'Los Zapa-autómatas', 'slug' => Str::slug('Los Zapa-autómatas'), 'centro_id' => $c_zapa, 'grupo' => 'A', 'usuario_id' => $ent4],
            ['nombre' => 'Los Acoples FC', 'slug' => Str::slug('Los Acoples FC'), 'centro_id' => $c_zapa, 'grupo' => 'A','usuario_id' => $ent6],
            ['nombre' => 'Los Galácticos de Montepinar', 'slug' => Str::slug('Los Galácticos de Montepinar'), 'centro_id' => $c_miguel, 'grupo' => 'A', 'usuario_id' => $ent1],
            ['nombre' => 'Leones de Carrocería FC', 'slug' => Str::slug('Leones de Carrocería FC'), 'centro_id' => $c_miguel, 'grupo' => 'A', 'usuario_id' => $ent3],
            ['nombre' => 'Los Leones del Besaya', 'slug' => Str::slug('Los Leones del Besaya'), 'centro_id' => $c_besaya, 'grupo' => 'A', 'usuario_id' => $ent7],
        ];

        $equiposGrupoB = [
            ['nombre' => 'Grafcet FC', 'slug' => Str::slug('Grafcet FC'), 'centro_id' => $c_zapa, 'grupo' => 'B', 'usuario_id' => $ent5],
            ['nombre' => 'Oxido Cero', 'slug' => Str::slug('Oxido Cero'), 'centro_id' => $c_miguel, 'grupo' => 'B', 'usuario_id' => $ent2],
            ['nombre' => 'Xabineta', 'slug' => Str::slug('Xabineta'), 'centro_id' => $c_besaya, 'grupo' => 'B', 'usuario_id' => $ent9],
            ['nombre' => 'Te Miro y Te Integro', 'slug' => Str::slug('Te Miro y Te Integro'), 'centro_id' => $c_besaya, 'grupo' => 'B', 'usuario_id' => $ent8],
            ['nombre' => 'Equipo Olímpico', 'slug' => Str::slug('Equipo Olímpico'), 'centro_id' => $c_todo, 'grupo' => 'B', 'usuario_id' => $ent10],
        ];

        Equipo::insert(array_merge($equiposGrupoA, $equiposGrupoB));
        /* que no genere los participantes
        Equipo::all()->each(function ($equipo) {


            Jugador::factory()->count(10)->create([
                'equipo_id' => $equipo->id
            ]);
        });
        */
    }
}
