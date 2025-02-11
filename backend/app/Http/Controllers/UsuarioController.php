<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UsuarioRequest;

class UsuarioController extends Controller
{
    public function index()
    {
        $usuarios = Usuario::all();

        if (empty($usuarios)) {
            return response()->json([
                'status' => 'error',
                'message' => 'No se ha encontrado usuarios.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'usuarios' => $usuarios->map(function ($usuario) {
                return [
                    'id' => $usuario->id,
                    'nombre_completo' => $usuario->nombre_completo,
                    'email' => $usuario->email,
                    'perfil_id' => $usuario->perfil_id,
                    'activo' => $usuario->activo,
                ];
            })
        ], 200);
    }

    public function edit(UsuarioRequest $request, Usuario $u)
    {
        $data = $request->only(['nombre_completo', 'email', 'perfil_id', 'activo']);

        if (empty($u)) {
            return response()->json([
                'status' => 'error',
                'message' => 'No se ha podido encontrar el usuario.'
            ], 401);
        }

        if ($u->update($data)) {
            return response()->json([
                'message' => 'Usuario actualizado correctamente',
                'usuario' => $u
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
        // Encriptamos la contraseña
        $data['password'] = Hash::make($data['password']);

        // Crea el usuario de forma masiva
        $u = Usuario::create($data);

        if ($u) {
            return response()->json([
                'message' => 'Usuario creado correctamente',
                'usuario' => $u
            ], 201);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'No se ha podido crear el usuario.'
        ], 400);
    }

    public function updateActivo(UsuarioRequest $request, Usuario $u)
    {
        $data = $request->only(['activo']);

        // Buscar el usuario o lanzar un error 404 si no existe
        if (empty($u)) {
            return response()->json([
                'status' => 'error',
                'message' => 'No se ha podido encontrar el usuario.'
            ], 401);
        }

        // Asignar el valor recibido
        $u->activo = $data['activo'];

        $msg = ($u->activo) ? 'El estado del usuario ha sido activado' : 'El estado del usuario ha sido desactivado';
        if ($u->save()) {
            return response()->json([
                'message' => $msg,
                'usuario' => $u
            ], 200);
        }

        return response()->json([
            'error' => 'No se pudo actualizar el estado del usuario.'
        ], 500);
    }
}
