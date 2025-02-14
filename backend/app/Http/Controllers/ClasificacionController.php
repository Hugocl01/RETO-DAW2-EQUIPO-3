<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ClasificacionGrupoA;
use App\Models\ClasificacionGrupoB;

class ClasificacionController extends Controller
{
    /**
     * Retorna la clasificación del Grupo A.
     */
    public function grupoA()
    {
        return response()->json(ClasificacionGrupoA::all());
    }

    /**
     * Retorna la clasificación del Grupo B.
     */
    public function grupoB()
    {
        return response()->json(ClasificacionGrupoB::all());
    }
}
