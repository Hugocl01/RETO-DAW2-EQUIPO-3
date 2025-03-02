<?php

namespace App\Http\Controllers;

use App\Models\Ong;
use App\Http\Resources\OngResource;

/**
 * OA\Tag(
 *     name="Ong",
 *     description="Operaciones relacionadas con las ongs"
 * )
 */
class OngController extends Controller
{
    /**
     * Obtener todas las ongs.
     *
     * OA\Get(
     *     path="/api/ongs",
     *     summary="Obtener todas las ongs",
     *     tags={"Ongs"},
     *     OA\Response(
     *         response=200,
     *         description="Lista de ongs",
     *         OA\JsonContent(
     *             type="object",
     *             OA\Property(property="status", type="string", example="success"),
     *             OA\Property(
     *                 property="ongs",
     *                 type="array",
     *                 OA\Items(ref="#/components/schemas/Ong")
     *             )
     *         )
     *     )
     * )
     */
    public function index()
    {
        $ongs = Ong::select('id', 'nombre', 'landing_page')->get();

        if ($ongs->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No hay ONGs registradas en el sistema.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'ongs' => OngResource::collection($ongs)
        ], 200);
    }

    /**
     * Obtener todas las ongs.
     *
     * OA\Get(
     *     path="/api/lista/ongs",
     *     summary="Obtener todos las ongs, pero solo los valores necesarios para el front",
     *     tags={"Ongs"},
     *     OA\Response(
     *         response=200,
     *         description="Lista de ongs",
     *         OA\JsonContent(
     *             type="object",
     *             OA\Property(property="status", type="string", example="success"),
     *             OA\Property(
     *                 property="ongs",
     *                 type="array",
     *                 OA\Items(ref="#/components/schemas/Ong")
     *             )
     *         )
     *     )
     * )
     */
    public function getListaOngs()
    {
        $ong = Ong::getLista();
        return response()->json($ong);
    }
}
