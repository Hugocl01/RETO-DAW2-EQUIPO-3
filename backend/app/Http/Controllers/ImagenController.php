<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImagenRequest;
use App\Http\Resources\ImagenResource;
use App\Models\Imagen;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

/**
 * @OA\Tag(
 *     name="Imágenes",
 *     description="Operaciones relacionadas con imágenes"
 * )
 */
class ImagenController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/imagenes",
     *     summary="Obtener todas las imágenes",
     *     description="Devuelve una lista de todas las imágenes almacenadas en la base de datos.",
     *     operationId="indexImagenes",
     *     tags={"Imágenes"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de imágenes",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Imagen")
     *         )
     *     )
     * )
     */
    public function index()
    {
        $imagenes = Imagen::all();

        return response()->json([
            'status' => 'success',
            'imagenes' => ImagenResource::collection($imagenes)
        ], 200);
    }

    /**
     * @OA\Post(
     *     path="/api/imagenes/{model}/{id}",
     *     summary="Subir una imagen a un modelo específico",
     *     description="Sube una imagen y la asocia a un modelo como `Patrocinador`, `Equipo`, etc.",
     *     operationId="uploadFoto",
     *     tags={"Imágenes"},
     *     @OA\Parameter(
     *         name="model",
     *         in="path",
     *         required=true,
     *         description="Nombre del modelo al que se le asociará la imagen (Ejemplo: 'Patrocinador')",
     *         @OA\Schema(type="string", example="Patrocinador")
     *     ),
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la entidad del modelo",
     *         @OA\Schema(type="integer", example=5)
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"imagen"},
     *                 @OA\Property(property="imagen", type="string", format="binary")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Imagen subida exitosamente",
     *         @OA\JsonContent(ref="#/components/schemas/Imagen")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Modelo o entidad no encontrada"
     *     )
     * )
     */
    public function uploadFoto(ImagenRequest $request, $model, $id)
    {
        $modelClass = "App\\Models\\" . ucfirst($model);

        if (!class_exists($modelClass)) {
            return response()->json([
                'status' => 'error',
                'message' => "El modelo {$model} no existe."
            ], 404);
        }

        $entity = $modelClass::find($id);

        if (!$entity) {
            return response()->json([
                'status' => 'error',
                'message' => "No se encontró la entidad con ID {$id}."
            ], 404);
        }

        $subcarpeta = strtolower($model) . 's';
        $fecha = date('Y/m/d');
        $rutaCarpeta = "uploads/{$subcarpeta}/{$fecha}";

        $imagenFile = $request->file('imagen');
        $rutaFichero = $imagenFile->store($rutaCarpeta, 'public');

        $imagen = $entity->imagenes()->create([
            'nombre' => $imagenFile->getClientOriginalName(),
            'ruta' => $rutaFichero,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => "Foto de {$model} subida correctamente.",
            'ruta' => $rutaFichero,
            'imagen' => new ImagenResource($imagen),
        ], 201);
    }

    /**
     * @OA\Delete(
     *     path="/api/imagenes/{id}",
     *     summary="Eliminar una imagen",
     *     description="Elimina una imagen de la base de datos y del almacenamiento.",
     *     operationId="deleteImagen",
     *     tags={"Imágenes"},
     *     security={{"BearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la imagen a eliminar",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Imagen eliminada correctamente"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Imagen no encontrada"
     *     )
     * )
     */
    public function destroy(Imagen $imagen)
    {
        // Eliminar el archivo del almacenamiento
        Storage::disk('public')->delete($imagen->ruta);

        // Eliminar la imagen de la base de datos
        $imagen->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Imagen eliminada correctamente'
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/imagenes/{modelo}",
     *     summary="Obtener imágenes por tipo de modelo",
     *     description="Devuelve una lista de imágenes asociadas a un modelo específico.",
     *     tags={"Imágenes"},
     *     @OA\Parameter(
     *         name="modelo",
     *         in="path",
     *         required=true,
     *         description="Nombre del modelo (ejemplo: Reto)",
     *         @OA\Schema(type="string", example="Reto")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de imágenes obtenida exitosamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="imagenes", type="array",
     *                 @OA\Items(ref="#/components/schemas/ImagenResource")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No se encontraron imágenes para este imagenable_type",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="No se encontraron imágenes para este imagenable_type")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Modelo no encontrado",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="El modelo especificado no existe.")
     *         )
     *     )
     * )
     */
    public function obtenerImagenesPorModelo($modelo)
    {
        // Completa el nombre del modelo con el namespace 'App\Models\'
        $imagenable_type = 'App\Models\\' . $modelo;

        // Verifica si el modelo existe
        if (!class_exists($imagenable_type)) {
            return response()->json([
                'status' => 'error',
                'message' => 'El modelo especificado no existe.'
            ], 400);
        }

        $imagenes = Imagen::where('imagenable_type', $imagenable_type)->get();

        if ($imagenes->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No se encontraron imágenes para este imagenable_type'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'imagenes' => ImagenResource::collection($imagenes)
        ], 200);
    }

}
