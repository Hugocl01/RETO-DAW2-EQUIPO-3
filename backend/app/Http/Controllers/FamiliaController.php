<?php

namespace App\Http\Controllers;

use App\Models\Familia;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\FamiliaRequest;
use App\Http\Resources\FamiliaResource;

namespace App\Http\Controllers;

use App\Models\Familia;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\FamiliaRequest;
use App\Http\Resources\FamiliaResource;

/**
 * @OA\Tag(
 *     name="Familias",
 *     description="Operaciones relacionadas con las familias"
 * )
 */
class FamiliaController extends Controller
{
    /**
     * Obtener todas las familias.
     *
     * @OA\Get(
     *     path="/api/familias",
     *     summary="Obtener todos los familias",
     *     tags={"Familias"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de familias",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="familias",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Familia")
     *             )
     *         )
     *     )
     * )
     */
    public function index(): JsonResponse
    {
        $familias = Familia::all();

        if ($familias->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No hay familias registradas.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'familias' => FamiliaResource::collection($familias)
        ], 200);
    }

    /**
     * Crear una nueva familia.
     *
     * @OA\Post(
     *     path="/api/familias",
     *     summary="Crear un nuevo familia",
     *     tags={"Familias"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Familia")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Familia creado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Familia creado correctamente"),
     *             @OA\Property(
     *                 property="familia",
     *                 ref="#/components/schemas/Familia"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en la validación de datos"
     *     )
     * )
     */
    public function store(FamiliaRequest $request): JsonResponse
    {
        $familia = Familia::create($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Familia creada correctamente.',
            'familia' => new FamiliaResource($familia)
        ], 201);
    }

    /**
     * Actualizar una familia existente.
     *
     * @OA\Put(
     *     path="/api/familias/{familia}",
     *     summary="Actualizar un familiass existente",
     *     tags={"Familias"},
     *     @OA\Parameter(
     *         name="familia",
     *         in="path",
     *         description="ID del familia",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Familia")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Familia actualizado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Familia actualizado correctamente"),
     *             @OA\Property(
     *                 property="familia",
     *                 ref="#/components/schemas/Familia"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en la validación de datos"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Familia no encontrado"
     *     )
     * )
     */
    public function update(FamiliaRequest $request, Familia $familia): JsonResponse
    {
        $familia->update($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Familia actualizada correctamente.',
            'familia' => new FamiliaResource($familia)
        ], 200);
    }

    /**
     * Eliminar una familia.
     *
     * @OA\Delete(
     *     path="/api/familias/{familia}",
     *     summary="Eliminar un familia",
     *     tags={"Familias"},
     *     @OA\Parameter(
     *         name="familia",
     *         in="path",
     *         description="ID del familia",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Familia eliminado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Familia eliminado correctamente")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Familia no encontrado"
     *     )
     * )
     */
    public function destroy(Familia $familia): JsonResponse
    {
        $familia->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Familia eliminada correctamente.'
        ], 200);
    }

    public function getListaFamilias()
    {
        $familias = Familia::getLista();
        return response()->json($familias);
    }
}
