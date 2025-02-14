<?php

namespace App\Http\Controllers;

use App\Models\Partido;
use App\Models\Equipo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PartidoController extends Controller
{
    public function index()
    {
        $partidos = Partido::with(['equipoLocal', 'equipoVisitante'])->get();
        return response()->json($partidos);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'equipo_local_id' => 'required|exists:equipos,id',
            'equipo_visitante_id' => 'required|exists:equipos,id',
            'fecha' => 'required|date',
            'hora' => 'required',
            'goles_local' => 'nullable|integer|min:0',
            'goles_visitante' => 'nullable|integer|min:0',
            'estado' => 'required|in:programado,en_curso,finalizado'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $partido = Partido::create($request->all());
        return response()->json($partido, 201);
    }

    public function show($id)
    {
        $partido = Partido::with(['equipoLocal', 'equipoVisitante'])->findOrFail($id);
        return response()->json($partido);
    }

    public function update(Request $request, $id)
    {
        $partido = Partido::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'equipo_local_id' => 'exists:equipos,id',
            'equipo_visitante_id' => 'exists:equipos,id',
            'fecha' => 'date',
            'hora' => 'string',
            'goles_local' => 'nullable|integer|min:0',
            'goles_visitante' => 'nullable|integer|min:0',
            'estado' => 'in:programado,en_curso,finalizado'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $partido->update($request->all());
        return response()->json($partido);
    }

    public function destroy($id)
    {
        $partido = Partido::findOrFail($id);
        $partido->delete();
        return response()->json(null, 204);
    }
}
