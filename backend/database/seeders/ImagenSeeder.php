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
use App\Models\Publicacion;

class ImagenSeeder extends Seeder
{
    public function run()
    {
        // IMPORTANTE: Estar seguro de que en 'patrocinadores' el orden (ID) es el mismo en que se seedearon
        // O que la referencia al 'nombre' coincide con el que pusiste en tu PatrocinadorSeeder.

        // 1) Mapeo manual: 'nombrePatrocinador' => 'nombreDelArchivo'

        $imagenesPorPatrocinador = [
            'CEINOR' => 'ceinor-20.png',
            'DISGARSA' => 'disgarsa logo.png',
            'Gimnasio Ubud Fitness Fight' => 'Gimnasio-Ubud-Fitness-Fight.png',
            'LIS Data Solutions' => 'lis (1).png',
            'EMI Suite 4.0' => 'Logo EMI_hc (1).png',
            'Escuela Cine & TV' => 'LOGO ESCUELA ROJO.png',
            'Grupo PITMA' => 'LOGO-PITMA-30-ANIV.png',
            'BM SUPERMERCADOS' => 'LOGOTIPO-BM_Negro.png',
            'Café Dromedario' => 'LOGOTIPO-CAFÉ-DROMEDARIO-vectorizado.png',
            'Selcansa' => 'selcansa-LOGO-removebg-preview.png',
        ];

        foreach ($imagenesPorPatrocinador as $nombrePatro => $archivoImagen) {
            // 2) Buscamos el patrocinador por su nombre
            $patrocinador = Patrocinador::where('nombre', $nombrePatro)->first();

            // 3) Creamos el registro en la tabla 'imagens' (o como se llame)
            if ($patrocinador) {
                Imagen::create([
                    'nombre' => $archivoImagen,
                    'ruta' => "imagenes/patrocinadores/$archivoImagen", // la carpeta en public/storage
                    'imagenable_id' => $patrocinador->id,
                    'imagenable_type' => Patrocinador::class,
                ]);
            }
        }


        // Imagenes de los retos
        // Los estudio_id estan en RetoSeeder.php
        // estudio_id => 'archivo'
        $imagenesRetos = [
            '17' => '17-OCA.jpeg',
            '15' => 'foodtruck1.jpeg',
            '1'=>'entrenamiento1.jpg',
            '5'=>'jabones.jpg',
            '10'=>'web1.jpg',
            '12'=>'vehiculo.jpg'

        ];

        foreach ($imagenesRetos as $reto_estudio_id => $archivoImagen) {
            $reto = Reto::where('estudio_id', $reto_estudio_id)->first();

            if ($reto) {
                Imagen::create([
                    'nombre' => $archivoImagen,
                    'ruta' => "imagenes/retos/$archivoImagen", // la carpeta en public/storage
                    'imagenable_id' => $reto->id,
                    'imagenable_type' => Reto::class,
                ]);
            }
        }
        // Imagenes de publicaciones
        // Los estudio_id estan en RetoSeeder.
        // estudio_id => 'archivo'
        $imagenesPu = [
            '1' => 'anuncio2.jpg',
            '2' => '17-OCA.jpeg',
            '3' =>'jabon.jpg'

        ];

        foreach ($imagenesPu as $publi_id => $archivoImagen) {
            $publi = Publicacion::where('id', $publi_id)->first();

            if ($publi) {
                Imagen::create([
                    'nombre' => $archivoImagen,
                    'ruta' => "imagenes/publicaciones/$archivoImagen", // la carpeta en public/storage
                    'imagenable_id' => $publi->id,
                    'imagenable_type' => Publicacion::class,
                ]);
            }
        }
    }
}
