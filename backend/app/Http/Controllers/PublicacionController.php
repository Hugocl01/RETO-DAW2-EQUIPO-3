<?php

namespace App\Http\Controllers;

use App\Http\Requests\PublicacionRequest;
use App\Http\Resources\PublicacionResource;
use App\Models\Publicacion;

/**
 * @OA\Tag(
 *     name="Publicaciones",
 *     description="Operaciones relacionadas con las publicaciones"
 * )
 */
class PublicacionController extends Controller
{
    /**
     * Obtener todas las publicaciones.
     *
     * @OA\Get(
     *     path="/api/publicaciones",
     *     summary="Obtener todas las publicaciones",
     *     tags={"Publicaciones"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de publicaciones",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="publicaciones",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Publicacion")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No hay publicaciones registradas"
     *     )
     * )
     */
    public function index()
    {
        $publicaciones = Publicacion::select(
            'id',
            'titulo',
            'portada',
            'contenido',
            'publicacionable_id',
            'publicacionable_type'
        )
            ->with('imagenes')  // Cargamos la relación 'imagenes'
            ->get();

        if ($publicaciones->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No hay publicaciones registradas.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'publicaciones' => PublicacionResource::collection($publicaciones)
        ], 200);
    }

    /**
     * Obtener una publicación por su ID.
     *
     * @OA\Get(
     *     path="/api/publicaciones/{publicacion}",
     *     summary="Obtener una publicación por su ID",
     *     tags={"Publicaciones"},
     *     @OA\Parameter(
     *         name="publicacion",
     *         in="path",
     *         description="ID de la publicación",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Publicación encontrada",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="publicacion",
     *                 ref="#/components/schemas/Publicacion"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Publicación no encontrada"
     *     )
     * )
     */
    public function show($publicacion)
    {
        $publicacion = Publicacion::with('imagenes')->findOrFail($publicacion);

        return response()->json([
            'status' => 'success',
            'publicacion' => new PublicacionResource($publicacion),
        ]);
    }

    /**
     * Crear una nueva publicación.
     *
     * @OA\Post(
     *     path="/api/publicaciones",
     *     summary="Crear una nueva publicación",
     *     tags={"Publicaciones"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Publicacion")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Publicación creada correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Publicación creada correctamente"),
     *             @OA\Property(
     *                 property="publicacion",
     *                 ref="#/components/schemas/Publicacion"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en la validación de datos"
     *     )
     * )
     */
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

    /**
     * Eliminar una publicación.
     *
     * @OA\Delete(
     *     path="/api/publicaciones/{publicacion}",
     *     summary="Eliminar una publicación",
     *     tags={"Publicaciones"},
     *     @OA\Parameter(
     *         name="publicacion",
     *         in="path",
     *         description="ID de la publicación",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Publicación eliminada correctamente"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Publicación no encontrada"
     *     )
     * )
     */
    public function destroy(Publicacion $publicacion)
    {
        $publicacion->delete();
        return response()->json(null, 204);
    }

    /**
     * Obtener los modelos asociados a las publicaciones.
     *
     * @OA\Get(
     *     path="/api/publicaciones/modelos",
     *     summary="Obtener los modelos asociados a las publicaciones",
     *     tags={"Publicaciones"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de modelos",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="modelos",
     *                 type="array",
     *                 @OA\Items(type="string")
     *             )
     *         )
     *     )
     * )
     */
    public function getListaPublicacionModelos()
    {
        $modelos = Publicacion::getLista();

        return response()->json([
            'modelos' => $modelos,
        ]);
    }
}
