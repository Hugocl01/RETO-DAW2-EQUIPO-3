<?php

namespace App\Http\Controllers;

use App\Models\Estudio;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\EstudioRequest;
use App\Http\Resources\EstudioResource;

class EstudioController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'estudios' => EstudioResource::collection(Estudio::all())
        ]);
    }

    public function store(EstudioRequest $request): JsonResponse
    {
        $estudio = Estudio::create($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Estudio creado correctamente',
            'estudio' => new EstudioResource($estudio)
        ], 201);
    }

    public function destroy(Estudio $estudio): JsonResponse
    {
        $estudio->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Estudio eliminado correctamente'
        ], 200);
    }
}
