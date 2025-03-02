<?php

namespace App\Http\Controllers;

use App\Models\Incidencia;


class IncidenciaController extends Controller
{
    /**
     * Obtener lista de incidencias.
     *
     * @OA\Get(
     *     path="/api/lista/incidencias",
     *     summary="Obtener lista de incidencias, pero solo los atributos necesarios",
     *     tags={"Incidencias"},
     *     security={{"BearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de incidencias",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="incidencias",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Incidencia")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="No autorizado, token inválido o no proporcionado",
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Error del servidor",
     *     )
     * )
     */
    public function getListaIncidencias()
    {
        $incidencias = Incidencia::getLista();  // Obtiene la lista de incidencias
        return response()->json($incidencias);  // Retorna la respuesta en formato JSON
    }
}
