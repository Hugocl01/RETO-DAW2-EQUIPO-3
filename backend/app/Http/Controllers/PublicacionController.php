<?php

namespace App\Http\Controllers;

use App\Http\Requests\PublicacionRequest;
use App\Http\Resources\PublicacionResource;
use App\Models\Publicacion;

class PublicacionController extends Controller
{

    public function index()
    {
        // Ejemplo: seleccionar algunos campos y cargar relaciones necesarias
        $publicaciones = Publicacion::select('id', 'titulo', 'portada', 'contenido', 'publicacionable_id', 'publicacionable_type')
            ->with('publicacionable') // si necesitas la entidad (Equipo, Jugador, etc.)
            // ->with('imagenes') // si quieres incluir imágenes, etc.
            ->get();

        if ($publicaciones->isEmpty()) {
            return response()->json([
                'status'  => 'error',
                'message' => 'No hay publicaciones registradas.'
            ], 404);
        }

        return response()->json([
            'status'       => 'success',
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
        // Validación de datos
        $validatedData = $request->validated();

        // Crear la publicación
        $publicacion = Publicacion::create([
            'titulo'               => $validatedData['titulo'],
            'contenido'            => $validatedData['contenido'] ?? null,
            'publicacionable_type' => $validatedData['publicacionable_type'],
            'publicacionable_id'   => $validatedData['publicacionable_id'],
            'ruta_video'           => $validatedData['ruta_video'] ?? null,
            'ruta_audio'           => $validatedData['ruta_audio'] ?? null,
            'portada'              => $validatedData['portada'] ?? false,
        ]);

        // Procesar el array de imágenes si existen
        if ($request->hasFile('imagenes')) {
            foreach ($request->file('imagenes') as $imagen) {
                // Almacenar la imagen en la carpeta 'public/publicaciones/imagenes'
                // Se asume que el disco 'public' está configurado en config/filesystems.php
                $ruta = $imagen->store('publicaciones/imagenes', 'public');

                // Crear el registro de imagen asociado mediante la relación polimórfica
                $publicacion->imagenes()->create([
                    'ruta' => $ruta,
                    // Aquí podrías agregar otros campos si tu modelo Imagen los requiere (por ejemplo, 'nombre')
                ]);
            }
        }

        // Retornar la respuesta (podrías usar un Resource para formatear la salida)
        return response()->json([
            'status'      => 'success',
            'publicacion' => $publicacion,
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
