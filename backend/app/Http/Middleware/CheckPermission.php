<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckPermission
{
    public function handle(Request $request, Closure $next, $seccion, $accion)
    {
        $user = $request->user(); // Usa el helper de Laravel Sanctum

        if (!$user) {
            return response()->json(['message' => 'No autenticado'], 401);
        }

        // Formato esperado: "seccion.accion" (Ej: "equipos.index")
        $requiredScope = "{$seccion}.{$accion}";

        // Verificar si el token tiene el permiso requerido
        if (!$user->tokenCan($requiredScope)) {
            return response()->json(['message' => 'Acceso denegado'], 403);
        }

        return $next($request);
    }
}
