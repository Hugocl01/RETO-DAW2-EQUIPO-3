<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use App\Models\Usuario;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\EquipoRequest;
use App\Http\Resources\EquipoResource;
use Illuminate\Support\Facades\DB;
use App\Mail\EquipoConfirmacionMail;

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
        return DB::transaction(function () use ($request) {
            $data = $request->validated();

            // Crear el equipo
            $equipo = Equipo::create([
                'nombre'    => $data['nombre'],
                'centro_id' => $data['centro_id'],
            ]);

            // Variable para almacenar el email del capitán
            $capitanEmail = null;

            if (isset($data['jugadores'])) {
                foreach ($data['jugadores'] as $jugadorData) {
                    $jugadorData['equipo_id'] = $equipo->id;
                    $jugador = $equipo->jugadores()->create($jugadorData);

                    // Si este jugador es el capitán, guardar su email
                    if (!empty($jugadorData['es_capitan']) && $jugadorData['es_capitan']) {
                        $capitanEmail = $jugador->email;
                    }
                }
            }

            // Tokens entrenador y Capitan
            $token_capitan = Str::random(40);
            $token_entrenador = Str::random(40);

            // Crear la inscripción
            $equipo->inscripcion()->create([
                'comentarios'                   => 'Primera Entrada',
                'estado_id'                     => 1,
                'token_confirmacion_capitan'    => $token_capitan,
                'token_confirmacion_entrenador' => $token_entrenador
            ]);

            // Crear el usuario entrenador
            $equipo->usuario()->create([
                'nombre_completo' => $data['entrenador_nombre_completo'],
                'email'           => $data['entrenador_email'],
                'password'        => null,
                'perfil_id'          => 2,
            ]);

            // Enviar correo al entrenador
            if (!empty($data['entrenador_email'])) {
                Mail::to($data['entrenador_email'])->send(
                    new EquipoConfirmacionMail($equipo, 'Entrenador', $token_entrenador, $data['entrenador_email'])
                );
            }

            // Enviar correo al capitán (si existe)
            if (!empty($capitanEmail)) {
                Mail::to($capitanEmail)->send(
                    new EquipoConfirmacionMail($equipo, 'Capitán', $token_capitan, $capitanEmail)
                );
            }

            // Recargar la relación jugadores
            $equipo->load('jugadores');

            return response()->json([
                'status'  => 'success',
                'message' => 'Equipo creado correctamente',
                'equipo'  => new EquipoResource($equipo)
            ], 201);
        });
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
