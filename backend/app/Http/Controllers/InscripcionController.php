<?php

namespace App\Http\Controllers;

use App\Models\Inscripcion;
use App\Http\Resources\InscripcionResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Request;

class InscripcionController extends Controller
{
    /**
     * Muestra todas las inscripciones con sus relaciones.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $inscripciones = Inscripcion::with(['equipo', 'estado'])
            ->select('id', 'comentarios', 'equipo_id', 'estado_id')
            ->get();

        if ($inscripciones->isEmpty()) {
            return response()->json([
                'status'  => 'error',
                'message' => 'No hay inscripciones registradas.'
            ], 404);
        }

        return response()->json([
            'status'         => 'success',
            'inscripciones'  => InscripcionResource::collection($inscripciones)
        ], 200);
    }

    public function updateActivo(Request $request, Inscripcion $inscripcion): JsonResponse
    {
        // Validar que se envíe el estado con los valores permitidos
        $validated = $request->validate([
            'estado'      => 'required|in:0,1,2',
            'comentarios' => 'nullable|string'
        ]);

        // Actualizar la inscripción con el nuevo estado y comentarios (si se envían)
        $inscripcion->update([
            'estado_id'   => $validated['estado'],
            'comentarios' => $validated['comentarios'] ?? $inscripcion->comentarios,
        ]);

        // Obtener el equipo asociado a la inscripción
        $equipo = $inscripcion->equipo;

        if ($equipo) {
            // Si la inscripción se aprueba (estado 1), marcar el equipo como activo.
            // Si se rechaza (estado 2), marcar el equipo como inactivo.
            // Si está pendiente (estado 0), no se modifica el campo "activo".
            if ($validated['estado'] == 1) {
                $equipo->update(['activo' => 1]);
            } elseif ($validated['estado'] == 2) {
                $equipo->update(['activo' => 0]);
            }
        }

        // Recargar relaciones para la respuesta
        $inscripcion->load(['equipo', 'estado']);

        return response()->json([
            'status'       => 'success',
            'message'      => 'La inscripción y el estado del equipo han sido actualizados.',
            'inscripcion'  => new InscripcionResource($inscripcion)
        ], 200);
    }
}
