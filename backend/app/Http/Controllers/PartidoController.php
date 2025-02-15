<?php

namespace App\Http\Controllers;

use App\Models\Partido;
use App\Models\Equipo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Tag(
 *     name="Partidos",
 *     description="Operaciones relacionadas con los partidos"
 * )
 */
class PartidoController extends Controller
{
    /**
     * Obtener todos los centros.
     *
     * @OA\Get(
     *     path="/api/partidos",
     *     summary="Obtener todos los partidos",
     *     tags={"Partidos"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de partidos",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="partidos",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Partido")
     *             )
     *         )
     *     )
     * )
     */
    public function index()
    {
        $partidos = Partido::with(['equipoLocal', 'equipoVisitante'])->get();
        return response()->json($partidos);
    }

    /**
     * Obtener un centro por su ID.
     *
     * @OA\Get(
     *     path="/api/partidos/{partido}",
     *     summary="Obtener un partido por su ID",
     *     tags={"Partidos"},
     *     @OA\Parameter(
     *         name="partido",
     *         in="path",
     *         description="ID del partido",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Partido encontrado",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="partido",
     *                 ref="#/components/schemas/Partido"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Partido no encontrado"
     *     )
     * )
     */
    public function show($id)
    {
        $partido = Partido::with(['equipoLocal', 'equipoVisitante'])->findOrFail($id);
        return response()->json($partido);
    }

    /**
     * Crear un nuevo centro.
     *
     * @OA\Post(
     *     path="/api/partidos",
     *     summary="Crear un nuevo partido",
     *     tags={"Partidos"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Partido")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Partido creado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Partido creado correctamente"),
     *             @OA\Property(
     *                 property="partido",
     *                 ref="#/components/schemas/Partido"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en la validación de datos"
     *     )
     * )
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'equipo_local_id' => 'required|exists:equipos,id',
            'equipo_visitante_id' => 'required|exists:equipos,id',
            'fecha' => 'required|date',
            'tiempo' => 'required',
            'goles_local' => 'nullable|integer|min:0',
            'goles_visitante' => 'nullable|integer|min:0',
            'estado' => 'required|in:programado,en_curso,finalizado'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $partido = Partido::create($request->all());
        return response()->json($partido, 201);
    }

    /**
     * Actualizar un partido existente.
     *
     * @OA\Put(
     *     path="/api/partidos/{partido}",
     *     summary="Actualizar un partido existente",
     *     tags={"Partidos"},
     *     @OA\Parameter(
     *         name="partido",
     *         in="path",
     *         description="ID del partido",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Partido")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Partido actualizado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Partido actualizado correctamente"),
     *             @OA\Property(
     *                 property="partido",
     *                 ref="#/components/schemas/Partido"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en la validación de datos"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Partido no encontrado"
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        $partido = Partido::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'equipo_local_id' => 'exists:equipos,id',
            'equipo_visitante_id' => 'exists:equipos,id',
            'fecha' => 'date',
            'tiempo' => 'string',
            'goles_local' => 'nullable|integer|min:0',
            'goles_visitante' => 'nullable|integer|min:0',
            'estado' => 'in:programado,en_curso,finalizado'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $partido->update($request->all());
        return response()->json($partido);
    }

    /**
     * Eliminar un partido.
     *
     * @OA\Delete(
     *     path="/api/partidos/{partido}",
     *     summary="Eliminar un partido",
     *     tags={"Partidos"},
     *     @OA\Parameter(
     *         name="partido",
     *         in="path",
     *         description="ID del partido",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Partido eliminado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Partido eliminado correctamente")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Partido no encontrado"
     *     )
     * )
     */
    public function destroy($id)
    {
        $partido = Partido::findOrFail($id);
        $partido->delete();
        return response()->json(null, 204);
    }
}
