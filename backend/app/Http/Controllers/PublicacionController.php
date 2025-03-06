<?php

namespace App\Http\Controllers;

use App\Http\Requests\PublicacionRequest;
use App\Http\Resources\PublicacionResource;
use App\Models\Publicacion;

class PublicacionController extends Controller
{

    public function index()
    {
        $publicaciones = Publicacion::select(
            'id',
            'titulo',
            'portada',
            'contenido',
            'publicacionable_id',
            'publicacionable_type'
        )->get();

        if ($publicaciones->isEmpty()) {
            return response()->json([
                'status'  => 'error',
                'message' => 'No hay publicaciones registradas.'
            ], 404);
        }

        return response()->json([
            'status'        => 'success',
            'publicaciones' => PublicacionResource::collection($publicaciones)
        ], 200);
    }


    public function show($publicacion)
    {
        return response()->json([
            'status'      => 'success',
            'publicacion' => new PublicacionResource($publicacion),
        ]);
    }

    public function store(PublicacionRequest $request)
    {
        $validatedData = $request->validated();

        // Tipos permitidos
        $tiposValidos = ['Equipo', 'Partido', 'Patrocinador', 'Jugador', 'Reto', 'Ong', 'Pabellon'];

        if (!in_array($validatedData['publicacionable_type'], $tiposValidos)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Tipo de entidad no válido.',
            ], 400);
        }

        $modelClass = "App\\Models\\" . $validatedData['publicacionable_type'];

        if (!class_exists($modelClass)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Modelo no encontrado.',
            ], 404);
        }

        $publicacionable = $modelClass::find($validatedData['publicacionable_id']);

        if (!$publicacionable) {
            return response()->json([
                'status' => 'error',
                'message' => 'Entidad asociada no encontrada.',
            ], 404);
        }

        // Crear la publicación
        $publicacion = Publicacion::create([
            'titulo' => $validatedData['titulo'],
            'contenido' => $validatedData['contenido'] ?? null,
            'publicacionable_type' => $modelClass,
            'publicacionable_id' => $validatedData['publicacionable_id'],
            'portada' => $validatedData['portada'] ?? false,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Publicación creada correctamente.',
            'publicacion' => new PublicacionResource($publicacion),
        ], 201);
    }


    public function destroy(Publicacion $publicacion)
    {
        $publicacion->delete();
        return response()->json(null, 204);
    }

    public function getListaPublicacionModelos()
    {
        $modelos = Publicacion::getLista();

        return response()->json([
            'modelos' => $modelos,
        ]);
    }
}
