<?php

namespace App\Http\Controllers;

use App\Enums\TipoPartido;
use App\Models\Equipo;
use App\Models\Partido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TorneoController extends Controller
{
    public static function comienzoTorneo(Request $request)
    {
        $partidos = Partido::all();
        $partidosFuturos = $partidos->filter(function ($partido) {
            return \Carbon\Carbon::parse($partido->fecha)->isFuture();
        });
        if ($partidosFuturos->isEmpty()) {
            Equipo::asignarGruposAleatoriamente();

            $equipos = Equipo::whereHas('inscripcion', function ($query) {
                $query->where('estado_id', 3);
            })->get();

            // Obtener la fecha desde el request
            $fecha = $request->input('fecha');

            // Validar que la fecha no sea nula
            if (!$fecha) {
                return response()->json(['error' => 'Fecha requerida'], 400);
            }
            
            Partido::generarPartidosGrupos($fecha, $equipos);

            return response()->json(['message' => 'Torneo iniciado con éxito', 'fecha' => $fecha], 200);
        }

        return response()->json(['message' => 'El torneo ya estaba iniciado'], 400);
    }

    public function reinicioTorneo(Request $request)
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('partidos')
            ->where('fecha', '>', date('Y-m-d'))
            ->delete();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Obtener la fecha desde el request
        $fecha = $request->input('fecha');

        if (!$fecha) {
            return response()->json(['error' => 'Fecha requerida'], 400);
        }

        if ($this->comienzoTorneo($request)) {
            return response()->json(['message' => 'Torneo reiniciado con éxito', 'fecha' => $fecha], 200);
        }

        return response()->json(['message'=>'Error al reiniciar el torneo'],500);
    }
}
