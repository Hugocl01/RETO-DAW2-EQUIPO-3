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

        if ($secciones->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No hay secciones registradas.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'secciones' => SeccionResource::collection($secciones)
        ], 200);
    }
}
