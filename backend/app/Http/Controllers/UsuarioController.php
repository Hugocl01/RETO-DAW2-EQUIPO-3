<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use App\Http\Resources\UsuarioResource;
use App\Http\Requests\UsuarioRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * @OA\Tag(name="Usuarios", description="Endpoints para gestión de usuarios")
 */
class UsuarioController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/usuarios",
     *     summary="Listar usuarios",
     *     tags={"Usuarios"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de usuarios obtenida correctamente",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Usuario"))
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No hay usuarios registrados"
     *     )
     * )
     */
    public function index()
    {
        dd(Auth::user());
        $usuarios = Usuario::select('id', 'nombre_completo', 'email', 'perfil_id', 'activo')
            ->with('perfil.secciones')
            ->get();

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

    /**
     * @OA\Put(
     *     path="/api/usuarios/{id}",
     *     summary="Actualizar un usuario",
     *     tags={"Usuarios"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del usuario",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Usuario")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Usuario actualizado correctamente"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error al actualizar el usuario"
     *     )
     * )
     */
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

    /**
     * @OA\Post(
     *     path="/api/usuarios",
     *     summary="Crear un usuario",
     *     tags={"Usuarios"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Usuario")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Usuario creado correctamente"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="No se ha podido crear el usuario"
     *     )
     * )
     */
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

    public function setPassword(Request $request, $id, $token)
    {
        $request->validate([
            'password' => 'required|min:8|confirmed',
        ]);

        $usuario = Usuario::where('id', $id)->where('remember_token', $token)->first();

        if (!$usuario) {
            return response()->json([
                'message' => 'Token inválido o usuario no encontrado',
                'status'  => 'error'
            ], 403);
        }

        $usuario->password = bcrypt($request->password);
        $usuario->save();

        return response()->json([
            'message' => 'Contraseña establecida correctamente',
            'status'  => 'success'
        ]);
    }
}
