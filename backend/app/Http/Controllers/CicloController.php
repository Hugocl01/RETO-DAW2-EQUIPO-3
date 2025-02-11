<?php

namespace App\Http\Controllers;

use App\Models\Ciclo;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\CicloRequest;
use App\Http\Resources\CicloResource;

class CicloController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'ciclos' => CicloResource::collection(Ciclo::all())
        ]);
    }

    public function show(Ciclo $ciclo): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'ciclo' => new CicloResource($ciclo)
        ]);
    }

    public function store(CicloRequest $request): JsonResponse
    {
        $ciclo = Ciclo::create($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Ciclo creado correctamente',
            'ciclo' => new CicloResource($ciclo)
        ], 201);
    }

    public function update(CicloRequest $request, Ciclo $ciclo): JsonResponse
    {
        $ciclo->update($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Ciclo actualizado correctamente',
            'ciclo' => new CicloResource($ciclo)
        ]);
    }

    public function destroy(Ciclo $ciclo): JsonResponse
    {
        $ciclo->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Ciclo eliminado correctamente'
        ]);
    }
}
