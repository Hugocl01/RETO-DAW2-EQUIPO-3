<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\PatrocinadorRequest;
use App\Http\Resources\PatrocinadorResource;
use App\Models\Patrocinador;

/**
 * @OA\Tag(
 *     name="Patrocinadores",
 *     description="Operaciones relacionadas con los patrocinadores"
 * )
 */
class PatrocinadorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @OA\Get(
     *     path="/api/patrocinadores",
     *     summary="Obtener todos los patrocinadores",
     *     tags={"Patrocinadores"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de patrocinadores",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="patrocinadores",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Patrocinador")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Error en el servidor"
     *     )
     * )
     */
    public function index()
    {
        // Cargamos los patrocinadores con sus imágenes asociadas de manera anticipada
        $patrocinadores = Patrocinador::with('imagen')->get();

        return response()->json([
            'status' => 'success',
            'patrocinadores' => PatrocinadorResource::collection($patrocinadores)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @OA\Post(
     *     path="/api/patrocinadores",
     *     summary="Crear un nuevo patrocinador",
     *     tags={"Patrocinadores"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Patrocinador")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Patrocinador creado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Patrocinador creado Correctamente"),
     *             @OA\Property(
     *                 property="patrocinador",
     *                 ref="#/components/schemas/Patrocinador"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en la validación de los datos"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Error en el servidor"
     *     )
     * )
     */
    public function store(PatrocinadorRequest $request)
    {
        $patrocinador = Patrocinador::create($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Patrocinador creado Correctamente',
            'patrocinador' => new PatrocinadorResource($patrocinador),
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @OA\Put(
     *     path="/api/patrocinadores/{patrocinador}",
     *     summary="Actualizar un patrocinador",
     *     tags={"Patrocinadores"},
     *     @OA\Parameter(
     *         name="patrocinador",
     *         in="path",
     *         description="ID del patrocinador",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Patrocinador")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Patrocinador actualizado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Patrocinador actualizado correctamente"),
     *             @OA\Property(
     *                 property="patrocinador",
     *                 ref="#/components/schemas/Patrocinador"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en la validación de los datos"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Patrocinador no encontrado"
     *     )
     * )
     */
    public function update(PatrocinadorRequest $request, Patrocinador $patrocinador)
    {
        $patrocinador->update($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Patrocinador actualizado correctamente',
            'patrocinador' => new PatrocinadorResource($patrocinador)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @OA\Delete(
     *     path="/api/patrocinadores/{patrocinador}",
     *     summary="Eliminar un patrocinador",
     *     tags={"Patrocinadores"},
     *     @OA\Parameter(
     *         name="patrocinador",
     *         in="path",
     *         description="ID del patrocinador",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Patrocinador eliminado correctamente"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Patrocinador no encontrado"
     *     )
     * )
     */
    public function destroy(Patrocinador $patrocinador)
    {
        $patrocinador->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Patrocinador eliminado exitosamente'
        ]);
    }

    /**
     * Obtener todos los patrocinadores, pero solo los valores necesarios para el front.
     *
     * @OA\Get(
     *     path="/api/lista/patrocinadores",
     *     summary="Obtener todos los patrocinadores con los valores necesarios para el front",
     *     tags={"Patrocinadores"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de patrocinadores",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="patrocinadores",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Patrocinador")
     *             )
     *         )
     *     )
     * )
     */
    public function getListaPatrocinadores()
    {
        $patrocinadores = Patrocinador::getLista();
        return response()->json([
            'status' => 'success',
            'patrocinadores' => $patrocinadores
        ]);
    }
}
