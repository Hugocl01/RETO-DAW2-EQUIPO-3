<?php

namespace App\Http\Controllers;

use App\Http\Requests\PerfilRequest;
use App\Models\Perfil;

class PerfilController extends Controller
{
    public function index()
    {
        $perfiles = Perfil::all();

        if ($perfiles->isEmpty()) {
            return response()->json([
                'status'  => 'error',
                'message' => 'No se han encontrado perfiles.'
            ], 404);
        }

        return response()->json([
            'status'   => 'success',
            'perfiles' => $perfiles->map(function ($perfil) {
                return [
                    'id'   => $perfil->id,
                    'tipo' => $perfil->tipo,
                ];
            }),
        ], 200);
    }

    public function edit(PerfilRequest $request, Perfil $p)
    {
        $data = $request->only(['tipo']);
        $p->tipo = $data['tipo'];

        if ($p->save()) {
            return response()->json([
                'message' => 'Se ha modificado el perfil',
                'perfil'  => $p
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
                'message' => 'Perfil creado correctamente',
                'perfil'  => $p
            ], 201);
        }

        return response()->json([
            'status'  => 'error',
            'message' => 'No se ha podido crear el perfil.'
        ], 400);
    }

    public function destroy(Perfil $p)
    {
        if ($p->delete()) {
            return response()->json([
                'message' => 'Perfil eliminado correctamente.'
            ], 200);
        }

        return response()->json([
            'status'  => 'error',
            'message' => 'No se ha podido eliminar el perfil.'
        ], 400);
    }
}
