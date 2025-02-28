<?php

namespace App\Http\Controllers;

use App\Enums\TipoPartido;
use App\Models\Equipo;
use App\Models\Partido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TorneoController extends Controller
{
    public static function comienzoTorneo()
    {
        $partidos = Partido::all();

        if ($partidos->isEmpty()) {
            Equipo::asignarGruposAleatoriamente();

            $equipos = Equipo::whereHas('inscripcion', function ($query) {
                $query->where('estado_id', 3);
            })->get();
            $fecha = now();

            Partido::generarPartidosGrupos($fecha, $equipos);

            return true;
        }

        return false;
    }

    public function reinicioTorneo()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('partidos')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        if (TorneoController::comienzoTorneo()) {
            return response()->json(['message' => 'Torneo reiniciado con éxito'], 200);
        }

        return response()->json(['message'=>'Error al reiniciar el torneo'],500);

    }
}
