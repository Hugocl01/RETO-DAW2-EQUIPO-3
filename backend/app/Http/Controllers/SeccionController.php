<?php

namespace App\Http\Controllers;

use App\Http\Resources\SeccionResource;
use App\Models\Seccion;
use Illuminate\Http\JsonResponse;

class SeccionController extends Controller
{
    /**
     * Muestra todas las secciones.
     */
    public function index(): JsonResponse
    {
        $secciones = Seccion::all();

        return response()->json([
            'status' => 'success',
            'secciones' => SeccionResource::collection($secciones)
        ], 200);
    }
}
