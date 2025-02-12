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
                'message' => 'No se han encontrado perfiles registrados.'
            ], 404);
        }

        return response()->json([
            'status'   => 'success',
            'perfiles' => PerfilResource::collection($perfiles)
        ], 200);
    }

    public function store(PerfilRequest $request)
    {
        $data = $request->validated();

        $perfil = Perfil::create([
            'tipo' => $data['tipo']
        ]);

        // Si se incluyen secciones en el request, las sincronizamos
        if (isset($data['secciones'])) {
            $perfil->secciones()->sync($data['secciones']);
        }

        // Recargamos la relación para incluirla en la respuesta
        $perfil->load('secciones');

        return response()->json([
            'status'  => 'success',
            'message' => 'Perfil creado correctamente',
            'perfil'  => new PerfilResource($perfil)
        ], 201);
    }


    public function update(PerfilRequest $request, Perfil $perfile)
    {
        $data = $request->validated();

        $perfile->update([
            'tipo' => $data['tipo'],
        ]);

        // Sincroniza las secciones si vienen en el request
        if (isset($data['secciones'])) {
            // Usamos directamente el array de enteros
            $perfile->secciones()->sync($data['secciones']);
        }


        // Volvemos a cargar la relación para que el recurso la incluya actualizada
        $perfile->load('secciones');

        return response()->json([
            'status'  => 'success',
            'message' => 'Perfil actualizado correctamente',
            'perfil'  => new PerfilResource($perfile)
        ], 200);
    }

    public function destroy(Perfil $perfile)
    {
        // Opcional: Desasocia las secciones relacionadas si es necesario
        $perfile->secciones()->detach();

        if ($perfile->delete()) {
            return response()->json([
                'status'  => 'success',
                'message' => 'Perfil eliminado correctamente'
            ], 200);
        }

        return response()->json([
            'status'  => 'error',
            'message' => 'No se ha podido eliminar el perfil.'
        ], 400);
    }
}
