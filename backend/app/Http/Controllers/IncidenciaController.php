<?php

namespace App\Http\Controllers;

use App\Models\Incidencia;

class IncidenciaController extends Controller
{
    public function getListaIncidencias()
    {
        $incidencias = Incidencia::getLista();
        return response()->json($incidencias);
    }
}
