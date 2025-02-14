<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Incidencia;

class IncidenciaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $incidencias = [
            // ⚽ Goles
            "Gol",
            "Gol en propia puerta",

            // 🟨🟥 Tarjetas
            "Tarjeta amarilla",
            "Tarjeta roja",

            // 🔄 Cambios
            "Cambio (salida)",
            "Cambio (entrada)",

            // ❌ Faltas y sanciones
            "Falta cometida",
            "Falta recibida",
            "Penalti cometido",
            "Penalti recibido",


            // 🏃‍♂️ Jugadas importantes
            "Asistencia de gol",


            // 🏥 Lesiones y asistencias médicas
            "Jugador lesionado",

            // ⏱️ Tiempos y eventos de partido
            "Inicio del partido",
            "Final del partido",
        ];
        foreach ($incidencias as $value) {
            Incidencia::create([
                'tipo' => $value
            ]);
        }
    }
}
