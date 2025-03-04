<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImagenRequest;
use App\Http\Resources\ImagenResource;
use App\Models\Imagen;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class ImagenController extends Controller
{
    public function index()
    {
        $imagenes = Imagen::all();

        return response()->json([
            'status' => 'success',
            'imagenes' => ImagenResource::collection($imagenes) // Corrección aquí
        ], 200);
    }

    public function uploadFoto(ImagenRequest $request, $model, $id)
    {
        $modelClass = "App\\Models\\" . ucfirst($model);

        if (!class_exists($modelClass)) {
            return response()->json([
                'status'  => 'error',
                'message' => "El modelo {$model} no existe."
            ], 404);
        }

        $entity = $modelClass::find($id);

        if (!$entity) {
            return response()->json([
                'status'  => 'error',
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
            'ruta'   => $rutaFichero,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => "Foto de {$model} subida correctamente.",
            'ruta'    => $rutaFichero,
            'imagen'  => new ImagenResource($imagen),
        ], 201);
    }

    public function destroy(Imagen $imagen) // Corrección del nombre de variable
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

    public function getListaImagenModelos()
    {
        if (!method_exists(Imagen::class, 'getLista')) {
            return response()->json([
                'status' => 'error',
                'message' => 'El método getLista no está definido en el modelo Imagen.'
            ], 500);
        }

        $modelos = Imagen::getLista();

        return response()->json([
            'status' => 'success',
            'modelos' => $modelos,
        ]);
    }
}
