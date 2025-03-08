<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ActaRequest;
use App\Http\Resources\ActaResource;
use App\Models\Acta;

/**
 * @OA\Tag(
 *     name="Actas",
 *     description="Operaciones relacionadas con las actas"
 * )
 */
class ActaController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/actas",
     *     summary="Crear una nueva acta",
     *     description="Crea una nueva acta y la almacena en la base de datos.",
     *     operationId="storeActa",
     *     tags={"Actas"},
     *     security={{"BearerAuth": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"partido_id", "jugador_id", "incidencia_id", "minuto", "comentario"},
     *             @OA\Property(property="partido_id", type="integer", example=10),
     *             @OA\Property(property="jugador_id", type="integer", example=5),
     *             @OA\Property(property="incidencia_id", type="integer", example=2),
     *             @OA\Property(property="minuto", type="integer", example=45),
     *             @OA\Property(property="comentario", type="string", example="Gol de cabeza después de un córner")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Acta creada correctamente",
     *         @OA\JsonContent(ref="#/components/schemas/Acta")
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Error de validación"
     *     )
     * )
     */
    public function store(ActaRequest $request)
    {
        $acta = Acta::create($request->validated());

        return response()->json([
            'status'  => 'success',
            'message' => 'Acta creada correctamente',
            'acta'    => new ActaResource($acta),
        ], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/actas/{id}",
     *     summary="Obtener detalles de un acta",
     *     description="Obtiene la información detallada de un acta específica.",
     *     operationId="showActa",
     *     tags={"Actas"},
     *     security={{"BearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del acta",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Detalle del acta",
     *         @OA\JsonContent(ref="#/components/schemas/Acta")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Acta no encontrada"
     *     )
     * )
     */
    public function show(Acta $acta)
    {
        return response()->json([
            'status'  => 'success',
            'message' => 'Detalle del Acta',
            'acta'    => new ActaResource($acta),
        ], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/actas/{id}",
     *     summary="Eliminar un acta",
     *     description="Elimina un acta de la base de datos.",
     *     operationId="deleteActa",
     *     tags={"Actas"},
     *     security={{"BearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del acta a eliminar",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Acta eliminada exitosamente"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Acta no encontrada"
     *     )
     * )
     */
    public function destroy(Acta $acta)
    {
        $acta->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Acta eliminada exitosamente'
        ]);
    }
}
