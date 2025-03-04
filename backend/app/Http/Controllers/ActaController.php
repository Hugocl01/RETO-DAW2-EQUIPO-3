<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ActaRequest;
use App\Http\Resources\ActaResource;
use App\Models\Acta;

class ActaController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(ActaRequest $request)
    {
        $acta = Acta::create($request->validated());

        return response()->json([
            'status'  => 'success',
            'message' => 'Acta creada correctamente',
            'acta' => new ActaResource($acta),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Acta $acta)
    {
        return response()->json([
            'status'  => 'success',
            'message' => 'Detalle del Acta',
            'acta' => new ActaResource($acta),
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Acta $acta)
    {
        $acta->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Acta eliminada exitosamente'
        ]);
    }
}
