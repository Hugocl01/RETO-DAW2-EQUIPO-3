<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
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

    public function getListaPatrocinadores()
    {
        $patrocinador = Patrocinador::getLista();
        return response()->json($patrocinador);
    }
}
