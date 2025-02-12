<?php

namespace App\Http\Controllers;

use App\Http\Requests\PerfilRequest;
use App\Models\Perfil;
use App\Http\Resources\PerfilResource;

class PerfilController extends Controller
{
    public function index()
    {
        $perfiles = Perfil::with('secciones')->select('id', 'tipo')->get();

        if ($perfiles->isEmpty()) {
            return response()->json([
                'status'  => 'error',
                'message' => 'No se han encontrado perfiles.'
            ], 404);
        }

        return response()->json([
            'status'   => 'success',
            'perfiles' => PerfilResource::collection($perfiles)
        ], 200);
    }



    public function edit(PerfilRequest $request, Perfil $perfil)
    {
        $data = $request->only(['tipo']);

        if ($perfil->update($data)) {
            return response()->json([
                'status'  => 'success',
                'message' => 'Perfil actualizado correctamente',
                'perfil'  => new PerfilResource($perfil)
            ], 200);
        }

        return response()->json([
            'status'  => 'error',
            'message' => 'No se ha podido actualizar el perfil.'
        ], 400);
    }

    public function store(PerfilRequest $request)
    {
        $data = $request->only(['tipo']);
        $p = Perfil::create($data);

        if ($p) {
            return response()->json([
                'status'  => 'success',
                'message' => 'Perfil creado correctamente',
                'perfil'  => new PerfilResource($p)
            ], 201);
        }

        return response()->json([
            'status'  => 'error',
            'message' => 'No se ha podido crear el perfil.'
        ], 400);
    }

    public function destroy(Perfil $perfil)
    {
        if ($perfil->delete()) {
            return response()->json([
                'status'  => 'success',
                'message' => 'Perfil eliminado correctamente.'
            ], 200);
        }

        return response()->json([
            'status'  => 'error',
            'message' => 'No se ha podido eliminar el perfil.'
        ], 400);
    }
}
