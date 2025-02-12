<?php

namespace App\Http\Controllers;

use App\Models\Estudio;
use App\Http\Requests\EstudioRequest;
use App\Http\Resources\EstudioResource;

class EstudioController extends Controller
{
    public function index()
    {

        $estudios = Estudio::with('ciclo', 'centro')
            ->select('id', 'curso', 'centro_id', 'ciclo_id')
            ->get();

        if ($estudios->isEmpty()) {
            return response()->json([
                'status'  => 'error',
                'message' => 'No se han encontrado estudios registrados.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'estudios' => EstudioResource::collection($estudios)
        ]);
    }

    public function store(EstudioRequest $request)
    {
        $estudio = Estudio::create($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Estudio creado correctamente',
            'estudio' => new EstudioResource($estudio)
        ], 201);
    }

    public function destroy(Estudio $estudio)
    {
        $estudio->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Estudio eliminado correctamente'
        ], 200);
    }
}
