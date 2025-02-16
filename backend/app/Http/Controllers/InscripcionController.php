<?php

namespace App\Http\Controllers;

use App\Models\Inscripcion;
use App\Models\Usuario;
use Illuminate\Support\Facades\Mail;
use App\Mail\TuNotificacionMail; // Asegúrate de crear este Mailable
use App\Http\Resources\InscripcionResource;
use App\Mail\EquipoInscripcionMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Request;

/**
 * @OA\Tag(
 *     name="Inscripciones",
 *     description="Operaciones relacionadas con las inscripciones"
 * )
 */
class InscripcionController extends Controller
{
    /**
     * Obtener todas las centros.
     *
     * @OA\Get(
     *     path="/api/inscripciones",
     *     summary="Obtener todas las inscripciones",
     *     tags={"Inscripciones"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de inscripciones",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(
     *                 property="inscripciones",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Inscripcion")
     *             )
     *         )
     *     )
     * )
     */
    public function index(): JsonResponse
    {
        $inscripciones = Inscripcion::with(['equipo', 'estado'])
            ->select('id', 'comentarios', 'equipo_id', 'estado_id')
            ->get();

        if ($inscripciones->isEmpty()) {
            return response()->json([
                'status'  => 'error',
                'message' => 'No hay inscripciones registradas.'
            ], 404);
        }

        return response()->json([
            'status'         => 'success',
            'inscripciones'  => InscripcionResource::collection($inscripciones)
        ], 200);
    }

    public function cambiarEstado(Request $request, Inscripcion $inscripcion)
    {
        // Asignar el nuevo estado
        $inscripcion->estado_id = $request->input('estado');

        // Guardar cambios
        $inscripcion->save();
    }

    public function confirmarInscripcion($inscripcion, $rol, $token)
    {
        $inscripcion = Inscripcion::findOrFail($inscripcion);

        if ($rol === 'Capitán') {
            $inscripcion->confirmado_capitan = ($token == $inscripcion->token_confirmacion_capitan)
                ? true : false;
        } elseif ($rol === 'Entrenador') {
            $inscripcion->confirmado_entrenador = ($token == $inscripcion->token_confirmacion_entrenador)
                ? true : false;
        }
        $inscripcion->save();

        // Verificar si ambos han confirmado para cambiar el estado de la inscripción
        if ($inscripcion->confirmado_capitan && $inscripcion->confirmado_entrenador) {
            $inscripcion->estado_id = 2; // 2 = "activa"
            $inscripcion->save();

            $usuarios = Usuario::where('perfil_id', [1,4])->get();
            $equipo = $inscripcion->equipo;

            foreach ($usuarios as $usuario) {
                Mail::to($usuario->email)->send(new EquipoInscripcionMail($equipo));
            }
        }

        return redirect()->away("http://localhost:5173/?inscripcion-status=success");
    }
}
