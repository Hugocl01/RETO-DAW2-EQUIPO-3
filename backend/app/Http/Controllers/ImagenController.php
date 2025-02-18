<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImagenRequest;
use App\Models\Imagen;

class ImagenController extends Controller
{
    public function uploadFoto(ImagenRequest $request, $model, $id)
    {
        // Construir el nombre de la clase del modelo (ej. 'equipo' => App\Models\Equipo)
        $modelClass = "App\\Models\\" . ucfirst($model);

        // Verificar que la clase existe
        if (!class_exists($modelClass)) {
            return response()->json([
                'status'  => 'error',
                'message' => "El modelo {$model} no existe."
            ], 404);
        }

        // Buscar la entidad con el ID dado
        $entity = $modelClass::findOrFail($id);

        // Construir la ruta de la carpeta: uploads/{model}s/YYYY/MM/DD
        // Se convierte el nombre del modelo a minúsculas y se añade una 's' (puedes mejorar la pluralización si es necesario)
        $subcarpeta = strtolower($model) . 's';
        $fecha = date('Y/m/d');
        $rutaCarpeta = "uploads/{$subcarpeta}/{$fecha}";

        // Subir el archivo
        $imagenFile = $request->file('imagen');
        $rutaFichero = $imagenFile->store($rutaCarpeta, 'public');
        // Esto lo guarda en: storage/app/public/uploads/{model}s/YYYY/MM/DD

        // Guardar el registro de la imagen utilizando la relación polimórfica definida en el modelo
        $entity->imagenes()->create([
            'nombre'       => $imagenFile->getClientOriginalName(),
            'ruta_fichero' => $rutaFichero,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => "Foto de {$model} subida correctamente.",
            'ruta'    => $rutaFichero,
        ], 200);
    }

    public function getListaImagenModelos()
    {
        $modelos = Imagen::getLista();

        return response()->json([
            'modelos' => $modelos,
        ]);
    }
}
