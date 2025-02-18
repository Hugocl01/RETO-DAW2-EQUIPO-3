<?php

namespace App\Http\Controllers;

use App\Models\Estudio;
use App\Http\Requests\EstudioRequest;
use App\Http\Resources\EstudioResource;

/**
 * @OA\Tag(
 *     name="Estudios",
 *     description="Operaciones relacionadas con los estudios"
 * )
 */
class EstudioController extends Controller
{
    /**
     * Obtener todos los estudios.
     *
     * @OA\Get(
     *     path="/api/estudios",
     *     summary="Obtener todos los estudios",
     *     tags={"Estudios"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de estudios",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="estudios",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Estudio")
     *             )
     *         )
     *     )
     * )
     */
    public function index()
    {

        $estudios = Estudio::with('ciclo', 'centro')
            ->select('id', 'curso', 'centro_id', 'ciclo_id')
            ->get();

        if ($estudios->isEmpty()) {
            return response()->json([
                'status'  => 'error',
                'message' => 'No se han encontrado estudios registrados.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'estudios' => EstudioResource::collection($estudios)
        ]);
    }

    /**
     * Crear un nuevo estudio.
     *
     * @OA\Post(
     *     path="/api/estudios",
     *     summary="Crear un nuevo estudio",
     *     tags={"Estudios"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Estudio")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Estudio creado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Estudio creado correctamente"),
     *             @OA\Property(
     *                 property="estudio",
     *                 ref="#/components/schemas/Estudio"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en la validación de datos"
     *     )
     * )
     */
    public function store(EstudioRequest $request)
    {
        $estudio = Estudio::create($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Estudio creado correctamente',
            'estudio' => new EstudioResource($estudio)
        ], 201);
    }

    /**
     * Eliminar un estudio.
     *
     * @OA\Delete(
     *     path="/api/estudios/{estudio}",
     *     summary="Eliminar un estudio",
     *     tags={"Estudios"},
     *     @OA\Parameter(
     *         name="estudio",
     *         in="path",
     *         description="ID del estudio",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Estudio eliminado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Estudio eliminado correctamente")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Estudio no encontrado"
     *     )
     * )
     */
    public function destroy(Estudio $estudio)
    {
        $estudio->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Estudio eliminado correctamente'
        ], 200);
    }

    public function getListaEstudios()
    {
        $estudios = Estudio::getLista();
        return response()->json($estudios);
    }
}
