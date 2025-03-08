<?php

namespace App\Http\Controllers;

use App\Models\Reto;
use App\Http\Requests\RetoRequest;
use App\Http\Resources\RetoResource;

/**
 * @OA\Tag(
 *     name="Retos",
 *     description="Operaciones relacionadas con los retos"
 * )
 */
class RetoController extends Controller
{
    /**
     * Obtener todos los retos.
     *
     * @OA\Get(
     *     path="/api/retos",
     *     summary="Obtener todos los retos",
     *     tags={"Retos"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de retos",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="retos",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Reto")
     *             )
     *         )
     *     )
     * )
     */
    public function index()
    {
        // Cargar los retos junto con las relaciones 'estudio' e 'imagenes'
        $retos = Reto::select('id', 'titulo', 'texto', 'estudio_id')
            ->with('estudio', 'imagenes')  // Cargar tanto 'estudio' como 'imagenes'
            ->get();

        // Verificar si no hay retos
        if ($retos->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No hay retos registrados.'
            ], 404);
        }

        // Devolver la respuesta con los retos cargados y sus relaciones
        return response()->json([
            'status' => 'success',
            'retos' => RetoResource::collection($retos)
        ], 200);
    }

    /**
     * Obtener un reto por su ID.
     *
     * @OA\Get(
     *     path="/api/retos/{reto}",
     *     summary="Obtener un reto por su ID",
     *     tags={"Retos"},
     *     @OA\Parameter(
     *         name="reto",
     *         in="path",
     *         description="ID del reto",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Reto encontrado",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="reto",
     *                 ref="#/components/schemas/Reto"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Reto no encontrado"
     *     )
     * )
     */
    public function show(Reto $reto)
    {
        // Cargar las relaciones 'estudio' e 'imagenes' del reto
        $reto->load('estudio', 'imagenes');

        // Devolver la respuesta con el recurso
        return response()->json([
            'status' => 'success',
            'reto' => new RetoResource($reto)
        ], 200);
    }

    /**
     * Crear un nuevo centro.
     *
     * @OA\Post(
     *     path="/api/retos",
     *     summary="Crear un nuevo reto",
     *     tags={"Retos"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Reto")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Reto creado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Reto creado correctamente"),
     *             @OA\Property(
     *                 property="reto",
     *                 ref="#/components/schemas/Reto"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en la validación de datos"
     *     )
     * )
     */
    public function store(RetoRequest $request)
    {
        $data = $request->only(['titulo', 'texto', 'estudio_id']);

        $reto = Reto::create($data);

        if ($reto) {
            return response()->json([
                'status' => 'success',
                'message' => 'Reto creado correctamente',
                'reto' => new RetoResource($reto)
            ], 201);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'No se ha podido crear el reto.'
        ], 400);
    }

    /**
     * Actualizar un reto existente.
     *
     * @OA\Put(
     *     path="/api/retos/{reto}",
     *     summary="Actualizar un reto existente",
     *     tags={"Retos"},
     *     @OA\Parameter(
     *         name="reto",
     *         in="path",
     *         description="ID del reto",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Reto")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Reto actualizado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Reto actualizado correctamente"),
     *             @OA\Property(
     *                 property="reto",
     *                 ref="#/components/schemas/Reto"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en la validación de datos"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Reto no encontrado"
     *     )
     * )
     */
    public function update(RetoRequest $request, Reto $reto)
    {
        $data = $request->only(['titulo', 'texto', 'estudio_id']);

        if ($reto->update($data)) {
            return response()->json([
                'status' => 'success',
                'message' => 'Reto actualizado correctamente',
                'reto' => new RetoResource($reto)
            ], 200);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'No se ha podido actualizar el reto.'
        ], 400);
    }

    /**
     * Eliminar un reto.
     *
     * @OA\Delete(
     *     path="/api/retos/{reto}",
     *     summary="Eliminar un reto",
     *     tags={"Retos"},
     *     @OA\Parameter(
     *         name="reto",
     *         in="path",
     *         description="ID del reto",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Reto eliminado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Reto eliminado correctamente")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Reto no encontrado"
     *     )
     * )
     */
    public function destroy(Reto $reto)
    {
        if ($reto->delete()) {
            return response()->json([
                'status' => 'success',
                'message' => 'Reto eliminado correctamente'
            ], 200);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'No se ha podido eliminar el reto.'
        ], 400);
    }

    /**
     * Obtener todos los retos.
     *
     * @OA\Get(
     *     path="/api/lista/retos",
     *     summary="Obtener todos los retos, pero solo los valores necesarios para el front",
     *     tags={"Retos"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de retos",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="retos",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Reto")
     *             )
     *         )
     *     )
     * )
     */
    public function getListaRetos()
    {
        $reto = Reto::getLista();
        return response()->json($reto);
    }
}
