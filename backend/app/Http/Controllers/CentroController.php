<?php

namespace App\Http\Controllers;

use App\Models\Centro;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\CentroRequest;
use App\Http\Resources\CentroResource;

class CentroController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'centros' => CentroResource::collection(Centro::all())
        ]);
    }

    public function show(Centro $centro): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'centro' => new CentroResource($centro)
        ]);
    }

    public function store(CentroRequest $request): JsonResponse
    {
        $centro = Centro::create($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Centro creado correctamente',
            'centro' => new CentroResource($centro)
        ], 201);
    }

    public function update(CentroRequest $request, Centro $centro): JsonResponse
    {
        $centro->update($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Centro actualizado correctamente',
            'centro' => new CentroResource($centro)
        ]);
    }

    public function destroy(Centro $centro): JsonResponse
    {
        $centro->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Centro eliminado correctamente'
        ]);
    }
}
