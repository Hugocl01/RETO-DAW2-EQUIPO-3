<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use App\Http\Resources\UsuarioResource;
use App\Http\Requests\UsuarioRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Usuarios",
 *     description="Endpoints para gestión de usuarios"
 * )
 */
class UsuarioController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/usuarios",
     *     summary="Listar usuarios",
     *     tags={"Usuarios"},
     *     security={{"sanctum":{}}},
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
        $usuarios = Usuario::select('id', 'nombre_completo', 'email', 'perfil_id')
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
     * @OA\Post(
     *     path="/api/usuarios",
     *     summary="Crear un usuario",
     *     tags={"Usuarios"},
     *     security={{"sanctum":{}}},
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
        $data = $request->only(['nombre_completo', 'email', 'perfil_id', 'password']);
        $data['password'] = Hash::make($data['password']);

        $usuario = Usuario::create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Usuario creado correctamente',
            'usuario' => new UsuarioResource($usuario)
        ], 201);
    }

    /**
     * @OA\Put(
     *     path="/api/usuarios/{id}",
     *     summary="Actualizar un usuario",
     *     tags={"Usuarios"},
     *     security={{"sanctum":{}}},
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
        $data = $request->only(['nombre_completo', 'email', 'password', 'perfil_id']);
        $usuario->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Usuario actualizado correctamente',
            'usuario' => new UsuarioResource($usuario)
        ], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/usuarios/{id}",
     *     summary="Eliminar un usuario",
     *     tags={"Usuarios"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del usuario",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Usuario eliminado correctamente"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Usuario no encontrado"
     *     )
     * )
     */
    public function destroy(Usuario $usuario)
    {
        $usuario->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Estudio eliminado correctamente'
        ], 200);
    }

    /**
     * @OA\Post(
     *     path="/api/set-password/{id}/{token}",
     *     summary="Establecer una nueva contraseña con un token",
     *     tags={"Usuarios"},
     *     security={{"BearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del usuario",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="token",
     *         in="path",
     *         required=true,
     *         description="Token de restablecimiento de contraseña",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"password", "password_confirmation"},
     *             @OA\Property(property="password", type="string", format="password", example="password123"),
     *             @OA\Property(property="password_confirmation", type="string", format="password", example="password123")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Contraseña establecida correctamente"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Token inválido o ya utilizado"
     *     )
     * )
     */
    public function setPassword(Request $request, $id, $token)
    {
        $request->validate([
            'password' => 'required|min:8|confirmed',
        ]);

        $usuario = Usuario::find($id);

        if (!$usuario) {
            return response()->json([
                'message' => 'Usuario no encontrado',
                'status'  => 'error'
            ], 404);
        }

        if ($usuario->remember_token !== $token) {
            return response()->json([
                'message' => 'Token inválido o ya utilizado',
                'status'  => 'error'
            ], 403);
        }

        $usuario->password = Hash::make($request->password);

        $usuario->remember_token = null;
        $usuario->save();

        return response()->json([
            'message' => 'Contraseña establecida correctamente',
            'status'  => 'success'
        ]);
    }
}
