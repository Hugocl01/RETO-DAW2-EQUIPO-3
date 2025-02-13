<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use App\Models\Jugador;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\EquipoRequest;
use App\Http\Resources\EquipoResource;

class EquipoController extends Controller
{
    public function index(): JsonResponse
    {
        $equipos = Equipo::with(['centro', 'usuario', 'jugadores'])
            ->select('id', 'nombre', 'centro_id', 'grupo', 'usuario_id')
            ->get();

        if ($equipos->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No hay equipos registrados.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'equipos' => EquipoResource::collection($equipos)
        ], 200);
    }

    public function show(Equipo $equipo): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'equipo' => new EquipoResource($equipo)
        ], 200);
    }

    public function store(EquipoRequest $request): JsonResponse
    {
        $data = $request->validated();

        // Crear el equipo con los datos correspondientes
        $equipo = Equipo::create([
            'nombre'     => $data['nombre'],
            'centro_id'  => $data['centro_id'],
            'usuario_id' => $data['usuario_id']
        ]);

        // Crear los jugadores asociados al equipo
        if (isset($data['jugadores'])) {
            foreach ($data['jugadores'] as $jugadorData) {
                $jugadorData['equipo_id'] = $equipo->id;
                $equipo->jugadores()->create($jugadorData);
            }
        }

        if ($equipo) {
            $equipo->inscripcion()->create([
                'comentarios' => 'Primera Entrada',
                'equipo_id' => $equipo->id,
                'estado_id' => 1,
            ]);
        }

        // Recargar la relación jugadores para incluirla en la respuesta
        $equipo->load('jugadores');

        return response()->json([
            'status'  => 'success',
            'message' => 'Equipo creado correctamente',
            'equipo'  => new EquipoResource($equipo)
        ], 201);
    }


    public function update(EquipoRequest $request, Equipo $equipo): JsonResponse
    {
        $data = $request->only(['nombre', 'centro_id', 'grupo', 'usuario_id']);

        if ($equipo->update($data)) {
            return response()->json([
                'status' => 'success',
                'message' => 'Equipo actualizado correctamente',
                'equipo' => new EquipoResource($equipo)
            ], 200);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'No se ha podido actualizar el equipo.'
        ], 400);
    }

    public function destroy(Equipo $equipo): JsonResponse
    {
        $equipo->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Equipo eliminado correctamente'
        ], 200);
    }
}
