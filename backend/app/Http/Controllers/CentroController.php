<?php

namespace App\Http\Controllers;

use App\Models\Centro;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\CentroRequest;
use App\Http\Resources\CentroResource;

/**
 * @OA\Tag(
 *     name="Centros",
 *     description="Operaciones relacionadas con los centros"
 * )
 */
class CentroController extends Controller
{
    /**
     * Obtener todos los centros.
     *
     * @OA\Get(
     *     path="/api/centros",
     *     summary="Obtener todos los centros",
     *     tags={"Centros"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de centros",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="centros",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Centro")
     *             )
     *         )
     *     )
     * )
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'centros' => CentroResource::collection(Centro::all())
        ]);
    }

    /**
     * Obtener un centro por su ID.
     *
     * @OA\Get(
     *     path="/api/centros/{centro}",
     *     summary="Obtener un centro por su ID",
     *     tags={"Centros"},
     *     @OA\Parameter(
     *         name="centro",
     *         in="path",
     *         description="ID del centro",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Centro encontrado",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="centro",
     *                 ref="#/components/schemas/Centro"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Centro no encontrado"
     *     )
     * )
     */
    public function show(Centro $centro): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'centro' => new CentroResource($centro)
        ]);
    }

    /**
     * Crear un nuevo centro.
     *
     * @OA\Post(
     *     path="/api/centros",
     *     summary="Crear un nuevo centro",
     *     tags={"Centros"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Centro")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Centro creado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Centro creado correctamente"),
     *             @OA\Property(
     *                 property="centro",
     *                 ref="#/components/schemas/Centro"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en la validación de datos"
     *     )
     * )
     */
    public function store(CentroRequest $request): JsonResponse
    {
        $centro = Centro::create($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Centro creado correctamente',
            'centro' => new CentroResource($centro)
        ], 201);
    }

    /**
     * Actualizar un centro existente.
     *
     * @OA\Put(
     *     path="/api/centros/{centro}",
     *     summary="Actualizar un centro existente",
     *     tags={"Centros"},
     *     @OA\Parameter(
     *         name="centro",
     *         in="path",
     *         description="ID del centro",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Centro")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Centro actualizado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Centro actualizado correctamente"),
     *             @OA\Property(
     *                 property="centro",
     *                 ref="#/components/schemas/Centro"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en la validación de datos"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Centro no encontrado"
     *     )
     * )
     */
    public function update(CentroRequest $request, Centro $centro): JsonResponse
    {
        $centro->update($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Centro actualizado correctamente',
            'centro' => new CentroResource($centro)
        ]);
    }

    /**
     * Eliminar un centro.
     *
     * @OA\Delete(
     *     path="/api/centros/{centro}",
     *     summary="Eliminar un centro",
     *     tags={"Centros"},
     *     @OA\Parameter(
     *         name="centro",
     *         in="path",
     *         description="ID del centro",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Centro eliminado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Centro eliminado correctamente")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Centro no encontrado"
     *     )
     * )
     */
    public function destroy(Centro $centro): JsonResponse
    {
        $centro->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Centro eliminado correctamente'
        ]);
    }

    public function getListaCentros(): JsonResponse
    {
        $centros = Centro::getLista();
        return response()->json($centros);
    }
}
