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
        $jugadores = Jugador::select('id', 'equipo_id', 'nombre_completo', 'capitan', 'estudio_id', 'dni', 'email', 'telefono')->get();

        if ($jugadores->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No hay equipos registrados.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'jugadores' => JugadorResource::collection($jugadores)
        ], 200);
    }

    public function show(Jugador $jugadore): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'jugador' => new JugadorResource($jugadore)
        ], 200);
    }

    public function update(JugadorRequest $request, Jugador $jugadore): JsonResponse
    {
        $data = $request->only(['equipo_id', 'nombre_completo', 'grupo', 'capitan', 'estudio_id', 'dni', 'email', 'telefono']);

        if ($jugadore->update($data)) {
            return response()->json([
                'status' => 'success',
                'message' => 'Equipo actualizado correctamente',
                'jugador' => new JugadorResource($jugadore)
            ], 200);
        }

        return response()->json([
            'status' => 'error',
            'jugador' => 'No se ha podido actualizar el equipo.'
        ], 400);
    }

    public function activar(Jugador $jugadore): JsonResponse
    {
        $jugadore->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Equipo eliminado correctamente'
        ], 200);
    }
}
