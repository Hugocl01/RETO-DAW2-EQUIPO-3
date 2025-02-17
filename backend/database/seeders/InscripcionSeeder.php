<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Equipo;

class InscripcionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Obtener todos los equipos
        $equipos = Equipo::all();

        foreach ($equipos as $equipo) {
            // Crear una nueva inscripción para cada equipo
            DB::table('inscripciones')->insert([
                'comentarios' => 'Comentario random: ' . Str::random(10),
                'equipo_id' => $equipo->id,
                'estado_id' => 3,
                'confirmado_capitan' => false,
                'token_confirmacion_capitan' => null,
                'confirmado_entrenador' => false,
                'token_confirmacion_entrenador' => null,
            ]);
        }
    }
}
