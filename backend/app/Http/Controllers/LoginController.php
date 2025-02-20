<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UsuarioResource;
use Illuminate\Http\Request;

/**
 * @OA\Info(title="API Logueo", version="1.0",description="Endpoints para gestión de logueo",
 * @OA\Server(url="http://localhost:8000"),
 * @OA\Contact(email="email@gmail.com")),
 * @OA\Tag(
 *     name="Login",
 *     description="Operaciones relacionadas con el logueo"
 * )
 */
class LoginController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/login",
     *     summary="Login",
     *     description="Login del usuario y generación de token",
     *     operationId="login",
     *     tags={"Login"},
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
     *                 @OA\Property(property="id", type="integer", example=1),
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
     *             @OA\Property(property="message", type="string", example="Credenciales incorrectas")
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
        $credentials = $request->only('email', 'password');
        $user = usuario::where('email', $credentials['email'])->first();
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'messaje' => 'Credenciales incorrectas',
            ], 401);
        }
        $user->tokens()->delete();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Inicio sesion',
            'usuario' => new UsuarioResource($user),
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Cierre de Sesión con Éxito.'
        ]);
    }
}
