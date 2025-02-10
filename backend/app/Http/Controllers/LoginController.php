<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/login",
     *     summary="Login",
     *     description="Login del usuario y generación de token",
     *     operationId="login",
     *     tags={"login"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Datos del usuario para autenticación",
     *         @OA\JsonContent(
     *             required={"email","password"},
     *             @OA\Property(property="email", type="string", format="email", example="prueba@prueba.es"),
     *             @OA\Property(property="password", type="string", format="password", example="12345678")
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Login correcto y token generado",
     *         @OA\JsonContent(
     *             @OA\Property(property="Usuario", type="object",
     *                 @OA\Property(property="name", type="string", example="Juan Pérez"),
     *                 @OA\Property(property="email", type="string", example="prueba@prueba.es")
     *             ),
     *             @OA\Property(property="token", type="string", example="1|abcdefghijklmnopqrstuvxyz123456789")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="No autorizado",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="No autorizado")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Datos inválidos",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="El email y la contraseña son obligatorios"),
     *             @OA\Property(property="errors", type="object",
     *                 @OA\Property(property="email", type="array", @OA\Items(type="string", example="El campo email es requerido")),
     *                 @OA\Property(property="password", type="array", @OA\Items(type="string", example="El campo password es requerido"))
     *             )
     *         )
     *     )
     * )
     */
    public function __invoke(LoginRequest $request)
    {
        $usuario = Usuario::where('email', $request->email)->first();

        if (!$usuario || !Hash::check($request->password, $usuario->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Credenciales incorrectas'
            ], 401);
        }

        // Eliminar y Generar el token
        $usuario->tokens()->delete();
        $token = $usuario->createToken('acceso_api')->plainTextToken;

        // Guardar el token en cada Login
        $usuario->update([
            'token' => $token
        ]);

        return response()->json([
            'status' => 'success',
            'Usuario' => [
                'id' => $usuario->id,
                'name' => $usuario->name,
                'email' => $usuario->email,
            ],
            'token' => $token
        ]);
    }
}
