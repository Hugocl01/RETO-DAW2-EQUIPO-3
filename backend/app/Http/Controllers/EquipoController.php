<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\EquipoRequest;
use App\Http\Resources\EquipoResource;

class EquipoController extends Controller
{
    public function index(): JsonResponse
    {
        $equipos = Equipo::select('id', 'nombre', 'centro_id', 'grupo')->get();

        if ($equipos->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No hay equipos registrados.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'equipos' => EquipoResource::collection($equipos)
        ], 200);
    }

    public function show(Equipo $equipo): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'equipo' => new EquipoResource($equipo)
        ], 200);
    }




    public function update(EquipoRequest $request, Equipo $equipo): JsonResponse
    {
        $data = $request->only(['nombre', 'centro_id', 'grupo']);

        // Validación adicional para asegurar que 'grupo' sea 'A' o 'B'
        if (!in_array($data['grupo'], ['A', 'B'])) {
            return response()->json([
                'status' => 'error',
                'message' => 'Grupo debe ser A o B.'
            ], 400);
        }

        if ($equipo->update($data)) {
            return response()->json([
                'status' => 'success',
                'message' => 'Equipo actualizado correctamente',
                'equipo' => new EquipoResource($equipo)
            ], 200);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'No se ha podido actualizar el equipo.'
        ], 400);
    }

    public function store(EquipoRequest $request): JsonResponse
    {
        $data = $request->only(['nombre', 'centro_id', 'grupo']);

        $e = Equipo::create($data);

        if ($e) {
            return response()->json([
                'status' => 'success',
                'message' => 'Equipo creado correctamente',
                'equipo' => new EquipoResource($e)
            ], 201);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'No se ha podido crear el equipo.'
        ], 400);
    }

    public function destroy(Equipo $equipo): JsonResponse
    {
        $equipo->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Equipo eliminado correctamente'
        ], 200);
    }
}
