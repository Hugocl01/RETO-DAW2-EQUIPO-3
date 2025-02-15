<?php

namespace App\Http\Controllers;

use App\Http\Resources\SeccionResource;
use App\Models\Seccion;
use Illuminate\Http\JsonResponse;


/**
 * @OA\Tag(
 *     name="Secciones",
 *     description="Operaciones relacionadas con los secciones"
 * )
 */
class SeccionController extends Controller
{
    /**
     * Obtener todas las secciones.
     *
     * @OA\Get(
     *     path="/api/secciones",
     *     summary="Obtener todos los secciones",
     *     tags={"Secciones"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de secciones",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="secciones",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Seccion")
     *             )
     *         )
     *     )
     * )
     */
    public function index(): JsonResponse
    {
        $secciones = Seccion::with('acciones')->get();

        if ($secciones->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No hay secciones registradas.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'secciones' => SeccionResource::collection($secciones),

        ], 200);
    }
}
