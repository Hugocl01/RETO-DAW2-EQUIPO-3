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
        return response()->json([
            'status' => 'success',
            'equipos' => EquipoResource::collection(Equipo::all())
        ]);
    }

    public function show(Equipo $equipo): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'equipo' => new EquipoResource($equipo)
        ]);
    }

    public function store(EquipoRequest $request): JsonResponse
    {
        $equipo = Equipo::create($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Equipo creado correctamente',
            'equipo' => new EquipoResource($equipo)
        ], 201);
    }

    public function destroy(Equipo $equipo): JsonResponse
    {
        $equipo->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Equipo eliminado correctamente'
        ]);
    }
}
