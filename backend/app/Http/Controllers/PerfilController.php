<?php

namespace App\Http\Controllers;

use App\Http\Requests\PerfilRequest;
use App\Models\Perfil;
use App\Http\Resources\PerfilResource;


/**
 * @OA\Tag(
 *     name="Perfiles",
 *     description="Operaciones relacionadas con los perfiles"
 * )
 */
class PerfilController extends Controller
{
    /**
     * Obtener todos los centros.
     *
     * @OA\Get(
     *     path="/api/perfiles",
     *     summary="Obtener todos los perfiles",
     *     tags={"Perfiles"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de perfiles",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="perfiles",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Perfil")
     *             )
     *         )
     *     )
     * )
     */
    public function index()
    {
        $perfiles = Perfil::with('secciones')->select('id', 'tipo')->get();

        if ($perfiles->isEmpty()) {
            return response()->json([
                'status'  => 'error',
                'message' => 'No se han encontrado perfiles registrados.'
            ], 404);
        }

        return response()->json([
            'status'   => 'success',
            'perfiles' => PerfilResource::collection($perfiles)
        ], 200);
    }

    /**
     * Obtener un perfil por su ID.
     *
     * @OA\Get(
     *     path="/api/perfiles/{perfil}",
     *     summary="Obtener un perfil por su ID",
     *     tags={"Perfiles"},
     *     @OA\Parameter(
     *         name="perfil",
     *         in="path",
     *         description="ID del perfil",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Perfil encontrado",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="perfil",
     *                 ref="#/components/schemas/Perfil"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Perfil no encontrado"
     *     )
     * )
     */
    public function show(Perfil $perfile)
    {
        $perfile = Perfil::with('secciones')
            ->select('id', 'tipo')
            ->findOrFail($perfile->id);
        return response()->json([
            'status'   => 'success',
            'perfiles' => new PerfilResource($perfile)
        ], 200);
    }

    /**
     * Crear un nuevo perfil.
     *
     * @OA\Post(
     *     path="/api/perfiles",
     *     summary="Crear un nuevo perfil",
     *     tags={"Perfiles"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Perfil")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Perfil creado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Perfil creado correctamente"),
     *             @OA\Property(
     *                 property="perfil",
     *                 ref="#/components/schemas/Perfil"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en la validación de datos"
     *     )
     * )
     */
    public function store(PerfilRequest $request)
    {
        $data = $request->validated();

        $perfil = Perfil::create([
            'tipo' => $data['tipo']
        ]);

        // Si se incluyen secciones en el request, las sincronizamos
        if (isset($data['secciones'])) {
            $perfil->secciones()->sync($data['secciones']);
        }

        // Recargamos la relación para incluirla en la respuesta
        $perfil->load('secciones');

        return response()->json([
            'status'  => 'success',
            'message' => 'Perfil creado correctamente',
            'perfil'  => new PerfilResource($perfil)
        ], 201);
    }

    /**
     * Actualizar un perfil existente.
     *
     * @OA\Put(
     *     path="/api/perfiles/{perfil}",
     *     summary="Actualizar un perfil existente",
     *     tags={"Perfiles"},
     *     @OA\Parameter(
     *         name="perfil",
     *         in="path",
     *         description="ID del perfil",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Perfil")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Perfil actualizado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Perfil actualizado correctamente"),
     *             @OA\Property(
     *                 property="perfil",
     *                 ref="#/components/schemas/Perfil"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en la validación de datos"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Perfil no encontrado"
     *     )
     * )
     */
    public function update(PerfilRequest $request, Perfil $perfile)
    {
        $data = $request->validated();

        $perfile->update([
            'tipo' => $data['tipo'],
        ]);

        // Sincroniza las secciones si vienen en el request
        if (isset($data['secciones'])) {
            // Usamos directamente el array de enteros
            $perfile->secciones()->sync($data['secciones']);
        }


        // Volvemos a cargar la relación para que el recurso la incluya actualizada
        $perfile->load('secciones');

        return response()->json([
            'status'  => 'success',
            'message' => 'Perfil actualizado correctamente',
            'perfil'  => new PerfilResource($perfile)
        ], 200);
    }

    /**
     * Eliminar un perfil.
     *
     * @OA\Delete(
     *     path="/api/perfiles/{perfil}",
     *     summary="Eliminar un perfil",
     *     tags={"Perfiles"},
     *     @OA\Parameter(
     *         name="perfil",
     *         in="path",
     *         description="ID del perfil",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Perfil eliminado correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Perfil eliminado correctamente")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Perfil no encontrado"
     *     )
     * )
     */
    public function destroy(Perfil $perfile)
    {
        // Opcional: Desasocia las secciones relacionadas si es necesario
        $perfile->secciones()->detach();

        if ($perfile->delete()) {
            return response()->json([
                'status'  => 'success',
                'message' => 'Perfil eliminado correctamente'
            ], 200);
        }

        return response()->json([
            'status'  => 'error',
            'message' => 'No se ha podido eliminar el perfil.'
        ], 400);
    }
}
