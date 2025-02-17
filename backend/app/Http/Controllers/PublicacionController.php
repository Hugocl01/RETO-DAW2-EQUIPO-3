<?php

namespace App\Http\Controllers;

use App\Http\Requests\PublicacionRequest;
use App\Http\Resources\PublicacionResource;
use App\Models\Publicacion;

class PublicacionController extends Controller
{

    public function index()
    {
        // Ejemplo: seleccionar algunos campos y cargar relaciones necesarias
        $publicaciones = Publicacion::select('id', 'titulo', 'portada', 'publicacionable_id', 'publicacionable_type')
            ->with('publicacionable') // si necesitas la entidad (Equipo, Jugador, etc.)
            // ->with('imagenes') // si quieres incluir imágenes, etc.
            ->get();

        if ($publicaciones->isEmpty()) {
            return response()->json([
                'status'  => 'error',
                'message' => 'No hay publicaciones registradas.'
            ], 404);
        }

        return response()->json([
            'status'       => 'success',
            'publicaciones' => PublicacionResource::collection($publicaciones)
        ], 200);
    }

    public function show($publicacion)
    {
        return response()->json([
            'status'      => 'success',
            'publicacion' => new PublicacionResource($publicacion),
        ]);
    }

    public function store(PublicacionRequest $request)
    {
        // La validación ya se realizó automáticamente.
        // Recogemos los datos:
        $data = $request->validated();

        // Creamos la publicación
        $publicacion = Publicacion::create([
            'titulo'    => $data['titulo'],
            'contenido' => $data['contenido'] ?? null,

            'publicacionable_id'   => $data['publicacionable_id'] ?? null,
            'publicacionable_type' => $data['publicacionable_type'] ?? null,

        ]);

        // Subir y asociar imágenes (si se enviaron)
        if (!empty($data['imagenes'])) {
            foreach ($data['imagenes'] as $imagenFile) {
                $ruta = $imagenFile->store('uploads', 'public');
                $publicacion->imagenes()->create([
                    'nombre'       => $imagenFile->getClientOriginalName(),
                    'ruta_fichero' => $ruta,
                ]);
            }
        }

        return redirect()->route('publicaciones.index')
            ->with('success', 'Publicación creada correctamente.');
    }

    public function listaModelos()
    {
        $modelos = Publicacion::getListaDeModelos();

        return response()->json([
            'modelos' => $modelos,
        ]);
    }
}
