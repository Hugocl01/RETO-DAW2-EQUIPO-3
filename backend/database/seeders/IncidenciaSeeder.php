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
            "Gol anulado por fuera de juego",
            "Gol anulado por falta",
            "Penal anotado",
            "Penal fallado",
            
            // 🟨🟥 Tarjetas
            "Tarjeta amarilla",
            "Tarjeta roja",
            "Doble amarilla y expulsión",
            
            // 🔄 Cambios
            "Cambio de jugador (entra un suplente)",
            "Cambio por lesión",
            "Cambio táctico",
            
            // ❌ Faltas y sanciones
            "Falta cometida",
            "Falta recibida",
            "Mano",
            "Juego peligroso",
            "Protesta al árbitro",
            "Retraso en la reanudación del juego",
            
            // 🏃‍♂️ Jugadas importantes
            "Asistencia de gol",
            "Tiro al palo",
            "Tiro atajado por el portero",
            "Remate desviado",
            "Corner concedido",
            "Corner rechazado",
            "Fuera de juego",
            "Balón despejado",
            "Pase clave",
            
            // 🏥 Lesiones y asistencias médicas
            "Jugador lesionado",
            "Jugador atendido por el médico",
            "Jugador sale por lesión",
            "Jugador regresa tras atención médica",
            
            // 🎥 VAR y decisiones arbitrales
            "Revisión VAR - Posible gol",
            "Revisión VAR - Posible penal",
            "Revisión VAR - Posible tarjeta roja",
            "Revisión VAR - Gol anulado",
            "Revisión VAR - Penal confirmado",
            
            // ⏱️ Tiempos y eventos de partido
            "Inicio del partido",
            "Final del primer tiempo",
            "Inicio del segundo tiempo",
            "Tiempo añadido",
            "Final del partido",
            
            // 🚀 Otros eventos destacados
            "Pelota fuera del estadio",
            "Afición invade el campo",
            "Retraso por problemas técnicos",
            "Interrupción por mal clima",
            "Interrupción por disturbios en la grada",
        ];
        foreach ($incidencias as $value) {
            Incidencia::create([
                'tipo'=>$value
            ]);
        }
    }
}
