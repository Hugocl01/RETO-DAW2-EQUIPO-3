<?php

namespace App\Http\Controllers;

use App\Models\Reto;
use App\Http\Requests\RetoRequest;
use App\Http\Resources\RetoResource;

class RetoController extends Controller
{
    public function index()
    {
        $retos = Reto::select('id', 'titulo', 'texto', 'estudio_id')
                    ->with('estudio')
                    ->get();

        if ($retos->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No hay retos registrados.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'retos' => RetoResource::collection($retos)
        ], 200);
    }

    public function show(Reto $reto)
    {
        return response()->json([
            'status' => 'success',
            'reto' => new RetoResource($reto->load('estudio'))
        ], 200);
    }

    public function store(RetoRequest $request)
    {
        $data = $request->only(['titulo', 'texto', 'estudio_id']);

        $reto = Reto::create($data);

        if ($reto) {
            return response()->json([
                'status' => 'success',
                'message' => 'Reto creado correctamente',
                'reto' => new RetoResource($reto)
            ], 201);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'No se ha podido crear el reto.'
        ], 400);
    }

    public function update(RetoRequest $request, Reto $reto)
    {
        $data = $request->only(['titulo', 'texto', 'estudio_id']);

        if ($reto->update($data)) {
            return response()->json([
                'status' => 'success',
                'message' => 'Reto actualizado correctamente',
                'reto' => new RetoResource($reto)
            ], 200);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'No se ha podido actualizar el reto.'
        ], 400);
    }

    public function destroy(Reto $reto)
    {
        if ($reto->delete()) {
            return response()->json([
                'status' => 'success',
                'message' => 'Reto eliminado correctamente'
            ], 200);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'No se ha podido eliminar el reto.'
        ], 400);
    }
}
