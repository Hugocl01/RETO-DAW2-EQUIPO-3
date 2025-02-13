<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use App\Models\Inscripcion;
use App\Models\Equipo;

class InscripcionController extends Controller
{
    public function cambiarEstado(Request $request, Inscripcion $inscripcion)
    {
        $request->validate([
            'estado_id' => 'required|integer|in:1,2,3', // Solo permite valores válidos
        ]);

        $inscripcion->estado_id = $request->input('estado_id');
        $inscripcion->save();

        // Si la inscripción es aprobada, activar el equipo
        if ($inscripcion->estado_id == 2) { // Estado "Aprobado"
            $equipo = Equipo::findOrFail($inscripcion->equipo_id);
            $equipo->activo = true;
            $equipo->save();
        } elseif ($inscripcion->estado_id == 3) { // Estado "Rechazado"
            $equipo = Equipo::findOrFail($inscripcion->equipo_id);
            $equipo->activo = false; // Asegurarse de que no quede activo
            $equipo->save();
        }

        return response()->json([
            'message' => 'Estado de inscripción actualizado',
            'inscripcion' => $inscripcion
        ]);
    }
}
