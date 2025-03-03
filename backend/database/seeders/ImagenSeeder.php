<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Models\Imagen;
use App\Models\Equipo;
use App\Models\Usuario;
use App\Models\Patrocinador;
use App\Models\Reto;

class ImagenSeeder extends Seeder
{
    public function run()
    {
        // Obtener todas las rutas de imágenes de patrocinadores
        $imagenesPatrocinador = Storage::disk('public')->files('imagenes/patrocinadores');

        // Obtener el número total de patrocinadores en la base de datos
        $patrocinadores = Patrocinador::all();

        // Asegurarse de que hay suficientes imágenes para asignar
        $totalImagenes = count($imagenesPatrocinador);
        $totalPatrocinadores = count($patrocinadores);

        // Asociar imágenes con patrocinadores en orden
        for ($i = 0; $i < min($totalImagenes, $totalPatrocinadores); $i++) {
            $ruta = $imagenesPatrocinador[$i];
            $nombreArchivo = basename($ruta);
            $patrocinador = $patrocinadores[$i];

            Imagen::create([
                'nombre' => $nombreArchivo,
                'ruta' => $ruta,
                'imagenable_id' => $patrocinador->id,
                'imagenable_type' => Patrocinador::class,
            ]);
        }
    }
}
