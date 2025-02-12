<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UsuarioRequest;
use App\Http\Resources\UsuarioResource;

use function PHPUnit\Framework\isNull;
use function PHPUnit\Framework\isTrue;

class UsuarioController extends Controller
{
    public function index()
    {
        $usuarios = Usuario::select('id', 'nombre_completo', 'email', 'perfil_id', 'activo')->get();

        if ($usuarios->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No hay usuarios registrados.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'usuarios' => UsuarioResource::collection($usuarios)
        ], 200);
    }

    public function update(UsuarioRequest $request, Usuario $usuario)
    {
        $data = $request->only(['nombre_completo', 'email', 'perfil_id', 'activo']);

        if ($usuario->update($data)) {
            return response()->json([
                'status' => 'success',
                'message' => 'Usuario actualizado correctamente',
                'usuario' => new UsuarioResource($usuario)
            ], 200);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'No se ha podido actualizar el usuario.'
        ], 400);
    }

    public function store(UsuarioRequest $request)
    {
        $data = $request->only(['nombre_completo', 'email', 'perfil_id', 'activo', 'password']);
        $data['password'] = Hash::make($data['password']);

        $u = Usuario::create($data);

        if ($u) {
            return response()->json([
                'status' => 'success',
                'message' => 'Usuario creado correctamente',
                'usuario' => new UsuarioResource($u)
            ], 201);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'No se ha podido crear el usuario.'
        ], 400);
    }

    public function updateActivo(Usuario $usuario)
    {

        $nuevoEstado = !$usuario->activo;

        // Actualiza el campo 'activo' con el nuevo estado.
        $usuario->update([
            'activo' => $nuevoEstado,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => $nuevoEstado ? 'El usuario ha sido activado' : 'El usuario ha sido desactivado'
        ], 200);
    }
}
