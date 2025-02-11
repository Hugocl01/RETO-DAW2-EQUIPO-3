<?php

namespace App\Http\Controllers;

use App\Models\Donacion;
use App\Http\Resources\DonacionResource;

class DonacionController extends Controller
{
    public function index()
    {
        $donaciones = Donacion::select('id','ong_id','kilos','importe')->get();

        if ($donaciones->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No hay Donaciones registradas en el sistema.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'donaciones' => DonacionResource::collection($donaciones)
        ], 200);
    }
}
