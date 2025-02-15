<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use Illuminate\Support\Facades\Mail;
use App\Mail\EquipoInscripcionMail;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\EquipoRequest;
use App\Http\Resources\EquipoResource;

/**
 * @OA\Tag(
 *     name="Equipos",
 *     description="Operaciones relacionadas con los equipos"
 * )
 */
class EquipoController extends Controller
{
    /**
     * Obtener todos los equipos.
     *
     * @OA\Get(
     *     path="/api/equipos",
     *     summary="Obtener todos los equipos",
     *     tags={"Equipos"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de equipos",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="equipos",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Equipo")
     *             )
     *         )
     *     )
     * )
     */
    public function index(): JsonResponse
    {
        $equipos = Equipo::with(['centro', 'usuario', 'jugadores'])
            ->select('id', 'nombre', 'centro_id', 'grupo', 'usuario_id')
            ->get();

        if ($equipos->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No hay equipos registrados.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'equipos' => EquipoResource::collection($equipos)
        ], 200);
    }

    /**
     * Obtener un centro por su ID.
     *
     * @OA\Get(
     *     path="/api/equipos/{equipo}",
     *     summary="Obtener un equipo por su ID",
     *     tags={"Equipos"},
     *     @OA\Parameter(
     *         name="equipo",
     *         in="path",
     *         description="ID del equipo",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Equipo encontrado",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="equipo",
     *                 ref="#/components/schemas/Equipo"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Equipo no encontrado"
     *     )
     * )
     */
    public function show(Equipo $equipo): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'equipo' => new EquipoResource($equipo)
        ], 200);
    }

    /**
     * Crear un nuevo centro.
     *
     * @OA\Post(
     *     path="/api/equipos",
     *     summary="Crear un nuevo equipo",
     *     tags={"Equipos"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Equipo")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Equipo creado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Equipo creado correctamente"),
     *             @OA\Property(
     *                 property="equipo",
     *                 ref="#/components/schemas/Equipo"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en la validación de datos"
     *     )
     * )
     */
    public function store(EquipoRequest $request): JsonResponse
    {
        $data = $request->validated();

        // Crear el equipo con los datos correspondientes
        $equipo = Equipo::create([
            'nombre'     => $data['nombre'],
            'centro_id'  => $data['centro_id'],
        ]);

        // Crear los jugadores asociados al equipo
        if (isset($data['jugadores'])) {
            foreach ($data['jugadores'] as $jugadorData) {
                $jugadorData['equipo_id'] = $equipo->id;
                $equipo->jugadores()->create($jugadorData);
            }
        }

        // Crear la inscripción asociada al equipo
        if ($equipo) {
            $equipo->inscripcion()->create([
                'comentarios' => 'Primera Entrada',
                'estado_id'   => 1,
            ]);

            $equipo->usuario()->create([
                'nombre_completo' => $data['entrenador_nombre_completo'],
                'email'           => $data['entrenador_email'],
                'perfil'          => 2,
                'activo'          => 0
            ]);

            // Enviar correo al administrador (o a quien corresponda)
            Mail::to('eloycuesta@hotmail.es')->send(new EquipoInscripcionMail($equipo));
        }

        // Recargar la relación jugadores para incluirla en la respuesta
        $equipo->load('jugadores');

        return response()->json([
            'status'  => 'success',
            'message' => 'Equipo creado correctamente',
            'equipo'  => new EquipoResource($equipo)
        ], 201);
    }

/**
     * Actualizar un equipo existente.
     *
     * @OA\Put(
     *     path="/api/equipos/{equipo}",
     *     summary="Actualizar un equipo existente",
     *     tags={"Equipos"},
     *     @OA\Parameter(
     *         name="equipo",
     *         in="path",
     *         description="ID del equipo",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Equipo")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Equipo actualizado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Equipo actualizado correctamente"),
     *             @OA\Property(
     *                 property="equipo",
     *                 ref="#/components/schemas/Equipo"
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

    public function update(EquipoRequest $request, Equipo $equipo): JsonResponse
    {
        $data = $request->only(['nombre', 'centro_id', 'grupo', 'usuario_id']);

        if ($equipo->update($data)) {
            return response()->json([
                'status' => 'success',
                'message' => 'Equipo actualizado correctamente',
                'equipo' => new EquipoResource($equipo)
            ], 200);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'No se ha podido actualizar el equipo.'
        ], 400);
    }

    /**
     * Eliminar un equipo.
     *
     * @OA\Delete(
     *     path="/api/equipos/{equipo}",
     *     summary="Eliminar un equipo",
     *     tags={"Equipos"},
     *     @OA\Parameter(
     *         name="equipo",
     *         in="path",
     *         description="ID del equipo",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Equipo eliminado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Equipo eliminado correctamente")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Equipo no encontrado"
     *     )
     * )
     */
    public function destroy(Equipo $equipo): JsonResponse
    {
        $equipo->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Equipo eliminado correctamente'
        ], 200);
    }
}
