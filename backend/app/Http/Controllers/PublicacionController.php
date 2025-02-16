<?php

namespace App\Http\Controllers;

use App\Http\Requests\PublicacionRequest;
use App\Models\Publicacion;

class PublicacionController extends Controller
{
    public function store(PublicacionRequest $request)
    {
        // La validación ya se realizó automáticamente.
        // Recogemos los datos:
        $data = $request->validated();

        // Creamos la publicación
        $publicacion = Publicacion::create([
            'titulo'    => $data['titulo'],
            'contenido' => $data['contenido'] ?? null,

            // polimórfico
            'publicacionable_id'   => $data['publicacionable_id'] ?? null,
            'publicacionable_type' => $data['publicacionable_type'] ?? null,

            // ...
        ]);

        // Subir y asociar imágenes (si se enviaron)
        if(!empty($data['imagenes'])) {
            foreach($data['imagenes'] as $imagenFile) {
                $ruta = $imagenFile->store('uploads','public');
                $publicacion->imagenes()->create([
                    'nombre'       => $imagenFile->getClientOriginalName(),
                    'ruta_fichero' => $ruta,
                ]);
            }
        }

        return redirect()->route('publicaciones.index')
                         ->with('success','Publicación creada correctamente.');
    }
}
