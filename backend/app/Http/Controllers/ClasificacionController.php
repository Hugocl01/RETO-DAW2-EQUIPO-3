<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ClasificacionGrupoA;
use App\Models\ClasificacionGrupoB;

/**
 * @OA\Tag(
 *     name="Clasificaciones",
 *     description="Operaciones relacionadas con los clasificaciones"
 * )
 */
class ClasificacionController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/clasificacion/grupo-a",
     *     summary="Retorna la clasificación del Grupo A",
     *     description="Obtiene la clasificación completa del Grupo A de un torneo.",
     *     operationId="grupoA",
     *     tags={"Clasificaciones"},
     *     @OA\Response(
     *         response=200,
     *         description="Clasificación del Grupo A obtenida correctamente",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/ClasificacionA")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Error interno del servidor"
     *     )
     * )
     */
    public function grupoA()
    {
        return response()->json(ClasificacionGrupoA::all());
    }

    /**
     * @OA\Get(
     *     path="/api/clasificacion/grupo-b",
     *     summary="Retorna la clasificación del Grupo B",
     *     description="Obtiene la clasificación completa del Grupo B de un torneo.",
     *     operationId="grupoB",
     *     tags={"Clasificaciones"},
     *     @OA\Response(
     *         response=200,
     *         description="Clasificación del Grupo B obtenida correctamente",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/ClasificacionB")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Error interno del servidor"
     *     )
     * )
     */
    public function grupoB()
    {
        return response()->json(ClasificacionGrupoB::all());
    }
}
