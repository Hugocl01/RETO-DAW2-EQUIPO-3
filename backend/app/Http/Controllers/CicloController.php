<?php

namespace App\Http\Controllers;

use App\Models\Ciclo;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\CicloRequest;
use App\Http\Resources\CicloResource;

/**
 * @OA\Tag(
 *     name="Ciclos",
 *     description="Operaciones relacionadas con los ciclos"
 * )
 */
class CicloController extends Controller
{
    /**
     * Obtener todos los centros.
     *
     * @OA\Get(
     *     path="/api/ciclos",
     *     summary="Obtener todos los ciclos",
     *     tags={"Ciclos"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de ciclos",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="ciclos",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Ciclo")
     *             )
     *         )
     *     )
     * )
     */

    public function index(): JsonResponse
    {
        $ciclos = Ciclo::with('familia')
            ->select('id', 'nombre', 'familia_id')
            ->get();

        if ($ciclos->isEmpty()) {
            return response()->json([
                'status'  => 'error',
                'message' => 'No se han encontrado ciclos.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'ciclos' => CicloResource::collection($ciclos)
        ]);
    }

    /**
     * Obtener un centro por su ID.
     *
     * @OA\Get(
     *     path="/api/ciclos/{ciclo}",
     *     summary="Obtener un ciclo por su ID",
     *     tags={"Ciclos"},
     *     @OA\Parameter(
     *         name="ciclo",
     *         in="path",
     *         description="ID del ciclo",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Ciclo encontrado",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="ciclo",
     *                 ref="#/components/schemas/Ciclo"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Ciclo no encontrado"
     *     )
     * )
     */
    public function show(Ciclo $ciclo): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'ciclo' => new CicloResource($ciclo)
        ]);
    }
    /**
     * Crear un nuevo centro.
     *
     * @OA\Post(
     *     path="/api/ciclos",
     *     summary="Crear un nuevo ciclo",
     *     tags={"Ciclos"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Ciclo")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Ciclo creado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Ciclo creado correctamente"),
     *             @OA\Property(
     *                 property="ciclo",
     *                 ref="#/components/schemas/Ciclo"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en la validación de datos"
     *     )
     * )
     */
    public function store(CicloRequest $request): JsonResponse
    {
        $ciclo = Ciclo::create($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Ciclo creado correctamente',
            'ciclo' => new CicloResource($ciclo)
        ], 201);
    }

    /**
     * Actualizar un ciclo existente.
     *
     * @OA\Put(
     *     path="/api/ciclos/{ciclo}",
     *     summary="Actualizar un ciclo existente",
     *     tags={"Ciclos"},
     *     @OA\Parameter(
     *         name="ciclo",
     *         in="path",
     *         description="ID del ciclo",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Ciclo")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Ciclo actualizado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Ciclo actualizado correctamente"),
     *             @OA\Property(
     *                 property="ciclo",
     *                 ref="#/components/schemas/Ciclo"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en la validación de datos"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Ciclo no encontrado"
     *     )
     * )
     */
    public function update(CicloRequest $request, Ciclo $ciclo): JsonResponse
    {
        $ciclo->update($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Ciclo actualizado correctamente',
            'ciclo' => new CicloResource($ciclo)
        ]);
    }

    /**
     * Eliminar un ciclo.
     *
     * @OA\Delete(
     *     path="/api/ciclos/{ciclo}",
     *     summary="Eliminar un ciclo",
     *     tags={"Ciclos"},
     *     @OA\Parameter(
     *         name="ciclo",
     *         in="path",
     *         description="ID del ciclo",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Ciclo eliminado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Ciclo eliminado correctamente")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Ciclo no encontrado"
     *     )
     * )
     */
    public function destroy(Ciclo $ciclo): JsonResponse
    {
        $ciclo->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Ciclo eliminado correctamente'
        ]);
    }

    public function getListaCiclos(): JsonResponse
    {
        $ciclos = Ciclo::getLista();
        return response()->json($ciclos);
    }
}
