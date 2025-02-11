<?php

namespace App\Http\Controllers;

use App\Models\Ong;
use App\Http\Resources\OngResource;

class OngController extends Controller
{
    public function index()
    {
        $ongs = Ong::select('id', 'nombre', 'landing_page')->get();

        if ($ongs->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No hay ONGs registradas en el sistema.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'ongs' => OngResource::collection($ongs)
        ], 200);
    }
}
