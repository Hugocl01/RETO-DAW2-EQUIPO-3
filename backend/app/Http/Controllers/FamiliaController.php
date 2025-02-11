<?php

namespace App\Http\Controllers;

use App\Models\Familia;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\FamiliaRequest;
use App\Http\Resources\FamiliaResource;

class FamiliaController extends Controller
{
    public function index(): JsonResponse
    {
        $familias = Familia::all();

        if ($familias->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No hay familias registradas.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'familias' => FamiliaResource::collection($familias)
        ], 200);
    }

    public function store(FamiliaRequest $request): JsonResponse
    {
        $familia = Familia::create($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Familia creada correctamente.',
            'familia' => new FamiliaResource($familia)
        ], 201);
    }

    public function update(FamiliaRequest $request, Familia $familia): JsonResponse
    {
        $familia->update($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Familia actualizada correctamente.',
            'familia' => new FamiliaResource($familia)
        ], 200);
    }

    public function destroy(Familia $familia): JsonResponse
    {
        $familia->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Familia eliminada correctamente.'
        ], 200);
    }
}
