<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\http\Requests\PatrocinadorRequest;
use App\Http\Resources\PatrocinadorResource;
use App\Models\Patrocinador; // Asegúrate de importar el modelo

class PatrocinadorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'status' => 'success',
            'patrocinadores' => PatrocinadorResource::collection(Patrocinador::all())
        ]);
    }

    public function store(PatrocinadorRequest $request)
    {
        $patrocinador = Patrocinador::create($request->validate());

        return response()->json([
            'status'  => 'success',
            'message' => 'Patrocinador creado Correctamente',
            'patrocinador' => new PatrocinadorResource($patrocinador),
        ], 201);
    }

    public function update(PatrocinadorRequest $request, Patrocinador $patrocinadore)
    {
        $patrocinadore->update($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Patrocinador actualizado correctamente',
            'patrocinador' => new PatrocinadorResource($patrocinadore)
        ]);
    }

    public function destroy(Patrocinador $patrocinadore)
    {
        $patrocinadore->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Patrocinador eliminado exitosamente'
        ]);
    }

    /**
     * Obtener todos los patrocinadores.
     *
     * @OA\Get(
     *     path="/api/lista/patrocinadores",
     *     summary="Obtener todos los patrocinadores, pero solo los valores necesarios para el front",
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
        $patrocinador = Patrocinador::getLista();
        return response()->json($patrocinador);
    }
}
