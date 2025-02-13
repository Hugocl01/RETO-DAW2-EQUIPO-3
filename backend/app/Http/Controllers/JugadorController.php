<?php

namespace App\Http\Controllers;

use App\Models\Jugador;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\JugadorRequest;
use App\Http\Resources\JugadorResource;

class JugadorController extends Controller
{
    public function index(): JsonResponse
    {
        $jugadores = Jugador::select('id', 'equipo_id', 'nombre_completo', 'grupo', 'capitan', 'estudio_id', 'dni', 'email', 'telefono')->get();

        if ($jugadores->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No hay equipos registrados.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'equipos' => JugadorResource::collection($jugadores)
        ], 200);
    }

    public function show(Jugador $jugador): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'equipo' => new JugadorResource($jugador)
        ], 200);
    }

    public function update(JugadorRequest $request, Jugador $jugador): JsonResponse
    {
        $data = $request->only(['equipo_id', 'nombre_completo', 'grupo', 'capitan', 'estudio_id', 'dni', 'email', 'telefono']);

        if ($jugador->update($data)) {
            return response()->json([
                'status' => 'success',
                'message' => 'Equipo actualizado correctamente',
                'equipo' => new JugadorResource($jugador)
            ], 200);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'No se ha podido actualizar el equipo.'
        ], 400);
    }

    public function activar(Jugador $jugador): JsonResponse
    {
        $jugador->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Equipo eliminado correctamente'
        ], 200);
    }
}
