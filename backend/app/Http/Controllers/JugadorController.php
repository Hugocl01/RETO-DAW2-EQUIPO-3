<?php

namespace App\Http\Controllers;

use App\Models\Jugador;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\JugadorRequest;
use App\Http\Resources\JugadorResource;

/**
 * @OA\Tag(
 *     name="Jugadores",
 *     description="Operaciones relacionadas con los jugadores"
 * )
 */
class JugadorController extends Controller
{
    /**
     * Obtener todos los jugadores.
     *
     * @OA\Get(
     *     path="/api/jugadores",
     *     summary="Obtener todos los jugadores",
     *     tags={"Jugadores"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de jugadores",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="jugadores",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Jugador")
     *             )
     *         )
     *     )
     * )
     */
    public function index(): JsonResponse
    {
        $jugadores = Jugador::select('id', 'equipo_id', 'nombre_completo', 'capitan', 'estudio_id', 'dni', 'email', 'telefono', 'slug')->get();

        if ($jugadores->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No hay equipos registrados.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'jugadores' => JugadorResource::collection($jugadores)
        ], 200);
    }

    /**
     * Obtener un jugador por su ID.
     *
     * @OA\Get(
     *     path="/api/jugadores/{jugador}",
     *     summary="Obtener un jugador por su ID",
     *     tags={"Jugadores"},
     *     @OA\Parameter(
     *         name="jugador",
     *         in="path",
     *         description="ID del jugador",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Jugador encontrado",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="jugador",
     *                 ref="#/components/schemas/Jugador"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Jugador no encontrado"
     *     )
     * )
     */
    public function show(Jugador $jugadore): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'jugador' => new JugadorResource($jugadore)
        ], 200);
    }

    /**
     * Actualizar un jugador existente.
     *
     * @OA\Put(
     *     path="/api/jugadores/{jugador}",
     *     summary="Actualizar un jugador existente",
     *     tags={"Jugadores"},
     *     @OA\Parameter(
     *         name="jugador",
     *         in="path",
     *         description="ID del jugador",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Jugador")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Jugador actualizado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Jugador actualizado correctamente"),
     *             @OA\Property(
     *                 property="jugador",
     *                 ref="#/components/schemas/Jugador"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en la validación de datos"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Jugador no encontrado"
     *     )
     * )
     */
    public function update(JugadorRequest $request, Jugador $jugadore): JsonResponse
    {
        $data = $request->only(['equipo_id', 'nombre_completo', 'grupo', 'capitan', 'estudio_id', 'dni', 'email', 'telefono']);

        if ($jugadore->update($data)) {
            return response()->json([
                'status' => 'success',
                'message' => 'Equipo actualizado correctamente',
                'jugador' => new JugadorResource($jugadore)
            ], 200);
        }

        return response()->json([
            'status' => 'error',
            'jugador' => 'No se ha podido actualizar el equipo.'
        ], 400);
    }

    public function getListaJugadores()
    {
        $jugadores = Jugador::getLista();
        return response()->json($jugadores);
    }
}
