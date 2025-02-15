<?php

namespace App\Http\Controllers;

use App\Models\Donacion;
use App\Http\Resources\DonacionResource;

/**
 * @OA\Tag(
 *     name="Donaciones",
 *     description="Operaciones relacionadas con las donaciones"
 * )
 */
class DonacionController extends Controller
{
    /**
     * Obtener todas las donaciones.
     *
     * @OA\Get(
     *     path="/api/donaciones",
     *     summary="Obtener todos los donaciones",
     *     tags={"Donaciones"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de donaciones",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="donaciones",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Donacion")
     *             )
     *         )
     *     )
     * )
     */
    public function index()
    {
        $donaciones = Donacion::with('ong')
            ->select('id','ong_id','kilos','importe')
            ->get();

        if ($donaciones->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No hay Donaciones registradas en el sistema.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'donaciones' => DonacionResource::collection($donaciones)
        ], 200);
    }
}
